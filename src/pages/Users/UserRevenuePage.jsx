import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import TransactionHistory from "./TransactionHistory";
import { useSearchParams } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import Pagination from "./Pagination";
import { useGetTransactionsQuery } from "../../services/transactionHistoryApi/transactionHistoryApi";

const UserRevenuePage = () => {
  const [searchParams] = useSearchParams();
  const LIMIT = 10;
  const searchValue = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, error } = useGetTransactionsQuery(
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
  const pagination = data?.pagination;

  useEffect(() => {
    document.title = "Transaction History - giveXchange";
  }, []);

  return (
    <div className="w-full bg-[#fff] min-h-screen custom-shadow rounded-[10px] p-5">
      <div className="w-full flex justify-between flex-wrap gap-5">
        <PageTitle title={`Transaction History`} />
        <SearchField placeholder={`Search`} />
      </div>

      <div className="w-full bg-white custom-shadow px-3 pt-3 rounded-[12px] mt-5">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            {data && products?.length > 0 ? (
              <TransactionHistory transactions={products} />
            ) : (
              <div className="w-full flex justify-center text-center pt-40 min-h-[80vh]">
                <p className="text-sm text-gray-500 font-medium">
                  No transactions found!
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

export default UserRevenuePage;
