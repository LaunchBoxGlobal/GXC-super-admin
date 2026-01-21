import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import ProductsTable from "./ProductsTable";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import Pagination from "../Users/Pagination";
import { useGetProductsQuery } from "../../services/productsApi/productsApi";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const searchValue = searchParams.get("search") || "";
  const LIMIT = 10;

  const { data, isLoading, isError, error } = useGetProductsQuery(
    {
      page,
      limit: LIMIT,
      search: searchValue,
      status: "active",
    },
    {
      refetchOnReconnect: true,
    }
  );

  const products = data?.data?.products || [];
  const pagination = data?.pagination || null;

  useEffect(() => {
    document.title = "Product Management - giveXchange";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isError) {
    return (
      <PageError
        errorMessage={
          error?.error ||
          error?.data?.message ||
          "Something went wrong. Try again."
        }
      />
    );
  }

  return (
    <div className="w-full bg-[#fff] custom-shadow rounded-[10px] p-5 min-h-screen">
      <div className="w-full flex justify-between flex-wrap gap-4">
        <PageTitle title="Product Management" />
        <SearchField placeholder="Search" />
      </div>

      {isLoading ? (
        <PageLoader />
      ) : products.length > 0 ? (
        <ProductsTable products={products} />
      ) : (
        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <p className="text-sm font-medium text-gray-500">
            No products found!
          </p>
        </div>
      )}

      <Pagination page={page} pagination={pagination} />
    </div>
  );
};

export default ProductsPage;
