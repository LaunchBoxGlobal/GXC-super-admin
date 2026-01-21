import { enqueueSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../utils/handleApiError";
import { useUpdateMissingItemReportStatusMutation } from "../../services/reportsApi/reportsApi";

const MarkItemResolvedRejected = ({ data }) => {
  const navigate = useNavigate();

  const [updateStatus, { isLoading }] =
    useUpdateMissingItemReportStatusMutation();

  const handleUpdateStatus = async (status) => {
    try {
      await updateStatus({
        reportId: data?.report?.id,
        status,
      }).unwrap();

      enqueueSnackbar("Order status updated.", {
        variant: "success",
      });
    } catch (error) {
      // handleApiError(error, navigate);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => handleUpdateStatus("resolved")}
        disabled={isLoading}
        className="w-full bg-[var(--primary-color)] text-white rounded-lg h-[44px] text-sm font-medium"
      >
        {isLoading ? <Loader /> : "Mark Resolved"}
      </button>
    </div>
  );
};

export default MarkItemResolvedRejected;
