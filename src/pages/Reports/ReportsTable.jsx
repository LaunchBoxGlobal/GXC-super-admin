import { formatDate } from "../../utils/formatDate";
import ReportModal from "./ReportModal";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ReportsTable = ({ reports, userType, setUserType }) => {
  const [openDetailsPopup, setOpenDetailsPopup] = useState(false);
  const [report, setReport] = useState(null);

  const toggleDetailsPopup = () => {
    setOpenDetailsPopup((prev) => !prev);
  };

  function formatRole(text) {
    return text
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return (
    <>
      <div className="w-full overflow-x-auto relative bg-white custom-shadow rounded-[10px] p-3 mt-5 min-h-screen">
        <div class="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
            <thead className="text-gray-700 light-green-bg whitespace-nowrap">
              <tr>
                <th scope="col" className="px-6 py-4 text-sm font-medium">
                  Report ID
                </th>

                <th scope="col" className="px-6 py-4 text-sm font-medium">
                  Reporter
                </th>
                <th scope="col" className="px-6 py-4 text-sm font-medium">
                  Reported Reason
                </th>
                <th scope="col" className="px-6 py-4 text-sm font-medium">
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-sm font-medium rounded-r-[8px]"
                >
                  Action
                </th>
              </tr>
            </thead>
            {reports && reports.length > 0 ? (
              <tbody>
                {reports?.map((report, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b border-gray-400 whitespace-nowrap"
                  >
                    <td className="px-6 py-4 border-b text-sm">{report?.id}</td>
                    <td className="px-6 py-4 border-b text-sm whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <LazyLoadImage
                          src={
                            report?.reporter?.profilePicturUrl
                              ? report?.reporter?.profilePicturUrl
                              : "/profile-icon.png"
                          }
                          effect="blur"
                          alt="user profile picture"
                          className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                        />
                        <span className="text-sm font-normal">
                          {report?.reporter?.name}
                        </span>
                      </div>
                    </td>

                    <td className="pl-6 py-4 border-b text-sm">
                      <span className="max-w-[230px] block text-wrap">
                        {report?.description?.length > 30
                          ? `${report?.description?.slice(0, 30)}...`
                          : report?.description}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b text-sm">
                      {formatDate(report?.createdAt)}
                    </td>
                    <td className="px-6 py-4 border-b text-sm">
                      <button
                        type="button"
                        onClick={() => {
                          setReport(report);
                          toggleDetailsPopup();
                        }}
                        className="text-xs lg:text-sm underline font-medium text-[var(--primary-color)]"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className="w-full min-h-[80vh] flex items-center justify-center px-4">
                <p className="text-sm font-medium text-gray-500">
                  No reports found.
                </p>
              </div>
            )}
          </table>
        </div>
        <ReportModal
          showPopup={openDetailsPopup}
          togglePopup={toggleDetailsPopup}
          report={report}
        />
      </div>
    </>
  );
};

export default ReportsTable;
