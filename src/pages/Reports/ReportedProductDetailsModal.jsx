import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useGetReportedProductDetailsQuery } from "../../services/reportsApi/reportsApi";

const ReportedProductDetailsModal = ({
  handleToggleReportDetailsModal,
  reportDetails,
}) => {
  const { data, isLoading, isError, error } = useGetReportedProductDetailsQuery(
    reportDetails?.id,
    {
      skip: !reportDetails?.id,
    }
  );

  const report = data?.data || null;

  return (
    <div className="w-full h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center py-5 px-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white w-full max-w-[491px] p-5 rounded-[16px] relative">
          {isError ? (
            <div className="w-full px-5">
              <div className="w-full flex items-center justify-between">
                <h2 className="text-[24px] font-semibold leading-none">
                  Product Report
                </h2>
                <button type="button" onClick={handleToggleReportDetailsModal}>
                  <img
                    src="/close-icon.png"
                    alt="close"
                    width={19}
                    height={19}
                  />
                </button>
              </div>

              <div className="w-full min-h-[400px] flex items-center justify-center px-5">
                {error?.data?.message || "Something went wrong."}
              </div>
            </div>
          ) : (
            <>
              <div className="w-full flex items-center justify-between">
                <h2 className="text-[24px] font-semibold leading-none">
                  Product Report
                </h2>
                <button type="button" onClick={handleToggleReportDetailsModal}>
                  <img
                    src="/close-icon.png"
                    alt="close"
                    width={19}
                    height={19}
                  />
                </button>
              </div>

              <div className="w-full grid grid-cols-2">
                <div className="w-full mt-3 flex items-center gap-1.5">
                  <h4 className="font-medium text-sm">Reported Date:</h4>
                  <p className="text-[14px] font-medium">
                    {formatDate(report?.createdAt)}
                  </p>
                </div>

                <div className="w-full mt-3 flex justify-end gap-1.5">
                  <h4 className="font-medium text-sm">Report Status:</h4>
                  <p
                    className={`text-[14px] font-medium ${
                      report?.status === "pending"
                        ? "text-[#FF7700]"
                        : report?.status === "resolved"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {report?.status?.charAt(0).toUpperCase() +
                      report?.status?.slice(1)}
                  </p>
                </div>
              </div>

              <div className="w-full mt-3 flex gap-1.5">
                <h4 className="font-medium text-sm">Community:</h4>
                <p className="text-[14px] font-medium">
                  {report?.community?.name}
                </p>
              </div>

              <div className="w-full mt-5 grid grid-cols-2">
                <div className="w-full border-r">
                  <h4 className="font-medium">Reporter</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src={
                        report?.reporter?.profilePictureUrl ||
                        "/profile-icon.png"
                      }
                      width={35}
                      height={35}
                      className="rounded-full object-cover"
                      alt=""
                    />
                    <p className="text-[14px] font-medium">
                      {report?.reporter?.name}
                    </p>
                  </div>
                </div>

                <div className="w-full pl-4">
                  <h4 className="font-medium">Seller</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <img
                      src={
                        report?.seller?.profilePictureUrl || "/profile-icon.png"
                      }
                      width={35}
                      height={35}
                      className="rounded-full object-cover"
                      alt=""
                    />
                    <p className="text-[14px] font-medium">
                      {report?.seller?.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border mt-3" />

              <div className="w-full mt-4">
                <h4 className="font-medium">Title</h4>
                <p>{report?.title}</p>
              </div>

              <div className="w-full border mt-3" />

              <div className="w-full mt-4">
                <h4 className="font-medium">Description</h4>
                <div className="max-h-[220px] overflow-y-auto">
                  <p>{report?.description}</p>
                </div>
              </div>

              <div className="w-full border mt-3" />

              <div className="w-full mt-4">
                <h4 className="font-medium">Product</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <img
                    src={report?.product?.image || "/profile-icon.png"}
                    width={35}
                    height={35}
                    className="rounded-lg object-cover"
                    alt=""
                  />
                  <Link
                    to={`/products/${report?.product?.title}?productId=${report?.product?.id}`}
                    className="text-[17px] font-medium"
                  >
                    {report?.product?.title}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportedProductDetailsModal;
