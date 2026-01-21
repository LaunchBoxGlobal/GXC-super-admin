import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import AppReportsPage from "./AppReportsPage";
import ReportedProductsTable from "./ReportedProductsTable";
import PageLoader from "../../components/Loader/PageLoader";
import { useGetBugReportsQuery } from "../../services/reportsApi/reportsApi";

const ReportsPage = () => {
  const LIMIT = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const user_type = searchParams.get("userType") || "regular_user";
  const report_type = searchParams.get("report_type") || "app_report";

  const [reportType, setReportType] = useState(
    report_type === "product_reports" ? "product_reports" : "app_reports"
  );

  const { data, isLoading, isError, error } = useGetBugReportsQuery(
    {
      page,
      limit: LIMIT,
      search: searchValue,
      type: user_type,
    },
    {
      skip: reportType !== "app_reports",
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const reports = data?.data?.reports || [];
  const pagination = data?.data?.pagination || null;

  useEffect(() => {
    document.title = "Reports - giveXchange";
  }, []);

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
    <div className="w-full bg-[#fff] custom-shadow rounded-[10px] p-5 min-h-screen">
      <div className="w-full flex justify-between flex-wrap gap-5">
        <PageTitle title="Reports" />

        <div className="flex items-center justify-end gap-3 flex-wrap">
          {/* Report Type Toggle */}
          <div className="w-full min-w-[300px] max-w-[350px] h-[41px] bg-white custom-shadow rounded-lg p-1 grid grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setReportType("app_reports");
                const params = new URLSearchParams(searchParams);
                params.set("report_type", "app_report");
                params.set("page", 1);
                setSearchParams(params);
              }}
              className={`${
                reportType === "app_reports"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } font-medium text-sm rounded-lg`}
            >
              App Reports
            </button>

            <button
              type="button"
              onClick={() => {
                setReportType("product_reports");
                const params = new URLSearchParams();
                params.set("report_type", "product_reports");
                params.set("page", 1);
                setSearchParams(params, { replace: true });
              }}
              className={`${
                reportType === "product_reports"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } font-medium text-sm rounded-lg`}
            >
              Product Reports
            </button>
          </div>

          <SearchField placeholder="Search" />
        </div>
      </div>

      {/* User Type Filter (Only for App Reports) */}
      {reportType === "app_reports" && (
        <div className="w-full mt-5 max-w-[200px] h-[41px] bg-white custom-shadow rounded-lg p-1 grid grid-cols-2">
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("userType", "regular_user");
              params.set("page", 1);
              setSearchParams(params);
            }}
            className={`${
              user_type === "regular_user"
                ? "bg-black text-white"
                : "bg-white text-black"
            } font-medium text-sm rounded-lg`}
          >
            Users
          </button>

          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("userType", "community_owner");
              params.set("page", 1);
              setSearchParams(params);
            }}
            className={`${
              user_type === "community_owner"
                ? "bg-black text-white"
                : "bg-white text-black"
            } font-medium text-sm rounded-lg`}
          >
            Owners
          </button>
        </div>
      )}

      {/* Content */}
      {isLoading && reportType === "app_reports" ? (
        <PageLoader />
      ) : reportType === "product_reports" ? (
        <ReportedProductsTable />
      ) : (
        <AppReportsPage
          reports={reports}
          pagination={pagination}
          page={page}
          userType={user_type}
        />
      )}
    </div>
  );
};

export default ReportsPage;
