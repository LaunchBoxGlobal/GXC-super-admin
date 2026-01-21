import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import { useSearchParams } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import Pagination from "../Users/Pagination";
import MissingItemReportsTable from "./MissingItemReportsTable";
import { useGetMissingItemReportsQuery } from "../../services/reportsApi/reportsApi";

const MissingItemReportsPage = () => {
  const [searchParams] = useSearchParams();
  const LIMIT = 10;
  const searchValue = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useGetMissingItemReportsQuery(
    {
      page,
      limit: LIMIT,
      search: searchValue,
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const products = data?.data || [];
  const pagination = data?.pagination || null;

  useEffect(() => {
    document.title = "Transaction History - giveXchange";
  }, []);

  return (
    <div className="w-full bg-[#fff] custom-shadow rounded-[10px] p-5">
      <div className="w-full flex justify-between flex-wrap gap-5">
        <PageTitle title={`Missing Item Reports`} />
        <SearchField placeholder={`Search`} />
      </div>

      <div className="w-full bg-white custom-shadow px-3 pt-3 rounded-[12px] mt-5 min-h-screen">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            {products && products?.length > 0 ? (
              <MissingItemReportsTable transactions={products} />
            ) : (
              <div className="w-full flex justify-center text-center pt-40 min-h-[80vh]">
                <p className="text-sm text-gray-500 font-medium">
                  No reports found!
                </p>
              </div>
            )}
          </>
        )}

        {error && (
          <div className="w-full flex justify-center text-center pt-40 min-h-[60vh]">
            <p className="text-sm text-gray-500 font-medium">{error}</p>
          </div>
        )}
      </div>
      <Pagination page={page} pagination={pagination} />
    </div>
  );
};

export default MissingItemReportsPage;
