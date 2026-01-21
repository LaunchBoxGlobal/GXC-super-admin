import { useSearchParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import ProductCard from "../../components/Common/ProductCard";
import SearchField from "../../components/Common/SearchField";
import PageLoader from "../../components/Loader/PageLoader";
import Pagination from "../Users/Pagination";
import { useGetCommunityProductsQuery } from "../../services/communityApi/communityApi";

const CommunityProductList = ({ communityId }) => {
  const LIMIT = 10;
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, error } = useGetCommunityProductsQuery(
    {
      communityId,
      page,
      limit: LIMIT,
      search: searchValue,
      status: "active",
    },
    {
      skip: !communityId,
      refetchOnMountOrArgChange: true,
    }
  );

  const products = data?.data?.products || [];
  const pagination = data?.data?.pagination || null;

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex items-center justify-center px-5 mt-10">
        <p className="text-sm font-medium text-gray-500">
          {error?.data?.message || error?.error || "Something went wrong."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fff] rounded-[10px] mt-5 lg:mt-7 min-h-[50vh]">
      {products.length > 0 && (
        <div className="w-full flex justify-between">
          <PageTitle title={`Products (${products.length})`} />
          <SearchField placeholder="Search" />
        </div>
      )}

      <div className="w-full relative">
        {products.length > 0 ? (
          <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center h-[50vh] flex items-center justify-center px-4">
            <p className="text-sm font-medium text-gray-500">
              No Products found
            </p>
          </div>
        )}
      </div>

      <div className="w-full relative overflow-hidden">
        <Pagination pagination={pagination} page={page} />
      </div>
    </div>
  );
};

export default CommunityProductList;
