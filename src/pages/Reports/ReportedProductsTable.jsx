import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import Pagination from "../Users/Pagination";
import { formatDate } from "../../utils/formatDate";
import ReportedProductDetailsModal from "./ReportedProductDetailsModal";
import { useGetReportedProductsQuery } from "../../services/reportsApi/reportsApi";

const ReportedProductsTable = () => {
  const LIMIT = 10;
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false);
  const [reportDetails, setReportDetails] = useState(null);

  const handleToggleReportDetailsModal = (report) => {
    setShowReportDetailsModal((prev) => !prev);
    setReportDetails(report);
  };

  const { data, isLoading, isError, error } = useGetReportedProductsQuery({
    page,
    limit: LIMIT,
    search: searchValue,
  });

  const reports = data?.data || [];
  const pagination = data?.pagination || null;

  useEffect(() => {
    document.title = "Product Reports - giveXchange";
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
    <div className="w-full bg-[#fff] min-h-screen">
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {reports && reports.length > 0 ? (
            <div className="w-full overflow-x-auto relative bg-white custom-shadow rounded-[10px] p-3 mt-5 min-h-screen">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-gray-700 light-green-bg whitespace-nowrap rounded-r-lg">
                  <tr>
                    <th className="px-6 py-4 font-medium rounded-l-lg">
                      Product
                    </th>
                    <th className="px-6 py-4 font-medium">Reporter</th>
                    <th className="px-6 py-4 font-medium">Seller</th>
                    <th className="px-6 py-4 font-medium">Reason</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium rounded-r-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      className="bg-white border-b border-gray-200 whitespace-nowrap"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={report?.product?.image || "/profile-icon.png"}
                            className="min-w-[43px] h-[43px] rounded-full object-cover"
                          />
                          <p>{report?.product?.title}</p>
                        </div>
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              report?.reporter?.profilePictureUrl ||
                              "/profile-icon.png"
                            }
                            className="min-w-[43px] h-[43px] rounded-full object-cover"
                          />
                          <p>{report?.reporter?.name}</p>
                        </div>
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              report?.seller?.profilePictureUrl ||
                              "/profile-icon.png"
                            }
                            className="min-w-[43px] h-[43px] rounded-full object-cover"
                          />
                          <p>{report?.seller?.name}</p>
                        </div>
                      </td>

                      <td className="px-6 py-3">{report?.title}</td>

                      <td className={`px-6 py-3`}>
                        <span
                          className={`px-2 py-1 rounded-full font-medium text-xs ${
                            report?.status === "pending"
                              ? "text-[#FF7700] bg-orange-100"
                              : report?.status === "resolved"
                              ? "text-green-500 bg-green-100"
                              : report?.status === "rejected"
                              ? "text-red-500 bg-red-100"
                              : "text-gray-500 bg-gray-100"
                          }`}
                        >
                          {report?.status.charAt(0).toUpperCase() +
                            report?.status.slice(1)}
                        </span>
                      </td>

                      <td className="px-6 py-3">
                        {formatDate(report?.createdAt)}
                      </td>

                      <td className="px-6 py-3">
                        <button
                          type="button"
                          onClick={() => handleToggleReportDetailsModal(report)}
                          className="text-xs lg:text-sm underline font-medium text-[var(--primary-color)]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full min-h-[80vh] flex items-center justify-center">
              <p className="text-sm font-medium text-gray-500">
                No reports found.
              </p>
            </div>
          )}
        </>
      )}

      {showReportDetailsModal && (
        <ReportedProductDetailsModal
          setShowReportDetailsModal={setShowReportDetailsModal}
          reportDetails={reportDetails}
          handleToggleReportDetailsModal={handleToggleReportDetailsModal}
        />
      )}

      <Pagination pagination={pagination} page={page} />
    </div>
  );
};

export default ReportedProductsTable;
