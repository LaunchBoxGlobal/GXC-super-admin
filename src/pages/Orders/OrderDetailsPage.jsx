import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import { SlLocationPin } from "react-icons/sl";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import { formatDate } from "../../utils/formatDate";
import { useGetOrderItemByIdQuery } from "../../services/ordersApi/ordersApi";
import OrderSummary from "./OrderSummary";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("itemId");

  const { data, isLoading, isError, error } = useGetOrderItemByIdQuery(itemId, {
    skip: !itemId,
    refetchOnMountOrArgChange: true,
  });

  const order = data?.data;

  useEffect(() => {
    document.title = "Order Details - giveXchange";
  }, []);

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
    <div className="w-full bg-[#fff] custom-shadow rounded-[10px] p-5">
      <PageTitle title={`Order Details`} />
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="w-full mt-7 flex flex-col lg:flex-row items-start justify-between gap-x-2 gap-y-5">
          <div className="bg-white custom-shadow p-5 lg:p-8 w-full lg:w-[70%] rounded-[10px] lg:rounded-[18px]">
            <div className="w-full flex items-center justify-between">
              <p className="text-sm lg:text-base leading-none">Order ID</p>
              <p className="text-sm lg:text-base leading-none">
                {order?.orderNumber}
              </p>
            </div>
            <div className="w-full border my-4" />
            <div className="w-full flex items-center justify-between">
              <p className="text-sm lg:text-base leading-none">Order Placed</p>
              <p className="text-sm lg:text-base leading-none">
                {formatDate(order?.order?.createdAt)}
              </p>
            </div>
            <div className="w-full border my-4" />
            <div className="w-full flex items-center justify-between">
              <p className="text-sm lg:text-base leading-none">Order Status</p>
              <p
                className={`font-medium ${
                  order?.overallStatus == "in_progress"
                    ? "text-[var(--progress)]"
                    : order?.overallStatus == "completed"
                    ? "text-[var(--success)]"
                    : order?.overallStatus === "ready"
                    ? "text-[var(--rating-yellow)]"
                    : order?.overallStatus === "cancelled"
                    ? "text-[var(--cancelled)]"
                    : "text-[var(--secondary-bg)]"
                }`}
              >
                {order?.overallStatus
                  ?.replace(/[_-]/g, " ")
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </p>
            </div>
            <div className="w-full border my-4" />
            <div className="w-full flex items-center justify-between">
              <p className="text-sm lg:text-base leading-none">Delivery Type</p>
              <p className="text-sm lg:text-base leading-none">
                {order?.deliveryMethod === "delivery" ? (
                  "Community Pickup"
                ) : (
                  <>
                    {order?.deliveryMethod?.charAt(0).toUpperCase() +
                      order?.deliveryMethod?.slice(1)}
                  </>
                )}
              </p>
            </div>
            <div className="w-full border my-4" />
            <div className="w-full">
              <p className="font-semibold leading-none">Pickup Address</p>
              <div className="flex items-center gap-2 mt-4">
                <SlLocationPin className="text-lg" />
                <p className="text-sm leading-[1.3]">
                  {order?.deliveryMethod === "delivery" ? (
                    <>
                      {order?.product?.communityPickupAddress
                        ? order?.product?.communityPickupAddress?.address
                        : "N/A"}
                    </>
                  ) : (
                    <>
                      {order?.product?.pickupAddress
                        ? order?.product?.pickupAddress?.address
                        : "N/A"}
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="w-full border my-4" />
            <div className="w-full">
              <p className="font-semibold tracking-tight">Product Details</p>
              <div className="w-full flex items-center justify-between flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      order?.product?.image
                        ? order?.product?.image
                        : "/stats-card-icon-placeholder.png"
                    }
                    alt=""
                    className="min-w-[75px] max-w-[75px] max-h-[75px] min-h-[75px] object-cover rounded-full"
                  />
                  <p className="text-lg font-semibold">
                    {order?.product?.title}
                  </p>
                </div>
                <Link
                  to={`/products/${order?.product?.id}`}
                  className="button max-w-[140px] flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="w-full border my-4" />
            <div className="w-full">
              <p className="font-semibold tracking-tight">Seller Details</p>
              <div className="w-full flex items-center justify-between gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      order?.seller?.profilePictureUrl
                        ? order?.seller?.profilePictureUrl
                        : "/profile-icon.png"
                    }
                    alt=""
                    className="min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] object-cover rounded-full"
                  />
                  <div className="">
                    <p className="text-lg font-semibold">
                      {order?.seller?.name}
                    </p>
                    <p className="text-sm text-[#18181899] font-normal">
                      {order?.seller?.phone}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/users/details/${order?.seller?.name}/${order?.seller?.id}`}
                  className="button max-w-[140px] flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </div>
            <div className="w-full border my-4" />
            <div className="w-full">
              <p className="font-semibold tracking-tight">Buyer Details</p>
              <div className="w-full flex items-center justify-between gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      order?.buyer?.profilePictureUrl
                        ? order?.buyer?.profilePictureUrl
                        : "/profile-icon.png"
                    }
                    alt=""
                    className="min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] object-cover rounded-full"
                  />
                  <div className="">
                    <p className="text-lg font-semibold">
                      {order?.buyer?.name}
                    </p>
                    <p className="text-sm text-[#18181899] font-normal">
                      {order?.buyer?.phone}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/users/details/${order?.buyer?.name}/${order?.buyer?.id}`}
                  className="button max-w-[140px] flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          {/* summary */}
          <OrderSummary data={order} />
        </div>
      )}

      {error && (
        <div className="w-full bg-[#fff] custom-shadow rounded-[10px] mt-5 p-5 min-h-[100vh] flex items-center justify-center">
          <p className="text-sm font-medium text-gray-500">{`error`}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
