import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import OrdersTable from "./OrdersTable";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import Pagination from "../Users/Pagination";
import { useGetOrdersQuery } from "../../services/ordersApi/ordersApi";

const OrdersPage = () => {
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get("status") || "";

  const LIMIT = 10;
  const page = Number(searchParams.get("page")) || 1;
  const searchValue = searchParams.get("search") || "";

  const { data, isLoading, isError, error } = useGetOrdersQuery({
    page,
    limit: LIMIT,
    search: searchValue,
    status: orderType,
  });

  const orders = data?.data || [];
  const pagination = data?.pagination || null;

  useEffect(() => {
    document.title = "Order Management - giveXchange";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isError) {
    return (
      <PageError
        errorMessage={
          error?.data?.message ||
          error?.error ||
          "Something went wrong. Try again."
        }
      />
    );
  }

  return (
    <div className="w-full bg-[#ffff] custom-shadow rounded-[10px] p-5 min-h-screen">
      <div className="w-full flex justify-between flex-wrap gap-5">
        <PageTitle title="Order Management" />
        <SearchField placeholder="Search" />
      </div>

      {isLoading ? <PageLoader /> : <OrdersTable orders={orders} />}

      <Pagination page={page} pagination={pagination} />
    </div>
  );
};

export default OrdersPage;
