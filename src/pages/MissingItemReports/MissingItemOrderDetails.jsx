import { formatDate } from "../../utils/formatDate";

const MissingItemOrderDetails = ({ data }) => {
  return (
    <div className="w-full relative">
      {/* order ID */}
      <div className="w-full flex items-center justify-between">
        <p className="text-sm lg:text-base leading-none">Order ID</p>
        <p className="text-sm lg:text-base leading-none">{data?.orderNumber}</p>
      </div>

      {/* order placed date */}
      <div className="w-full border my-4" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm lg:text-base leading-none">Order Placed</p>
        <p className="text-sm lg:text-base leading-none">
          {formatDate(data?.order?.createdAt)}
        </p>
      </div>

      {/* order status */}
      <div className="w-full border my-4" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm lg:text-base leading-none">Order Status</p>
        <p
          className={`font-medium ${
            data?.overallStatus == "in_progress"
              ? "text-[var(--progress)]"
              : data?.overallStatus == "completed"
              ? "text-[var(--success)]"
              : data?.overallStatus === "ready"
              ? "text-[var(--rating-yellow)]"
              : data?.overallStatus === "cancelled"
              ? "text-[var(--cancelled)]"
              : "text-[var(--secondary-bg)]"
          }`}
        >
          {data?.overallStatus
            ?.replace(/[_-]/g, " ")
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase())}
        </p>
      </div>

      {/* order delivery type */}
      <div className="w-full border my-4" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm lg:text-base leading-none">Delivery Type</p>
        <p className="text-sm lg:text-base leading-none">
          {data?.deliveryMethod === "delivery" ? (
            "Community Pickup"
          ) : (
            <>
              {data?.deliveryMethod.charAt(0).toUpperCase() +
                data?.deliveryMethod.slice(1)}
            </>
          )}
        </p>
      </div>

      {/* report status */}
      <div className="w-full border my-4" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm lg:text-base leading-none">Report Status</p>
        <p
          className={`text-sm lg:text-base leading-none font-medium ${
            data?.report?.status === "resolved"
              ? "text-[var(--success)]"
              : data?.report?.status === "rejected"
              ? "text-red-500"
              : "text-[var(--progress)]"
          }`}
        >
          {data?.report?.status.charAt(0).toUpperCase() +
            data?.report?.status.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default MissingItemOrderDetails;
