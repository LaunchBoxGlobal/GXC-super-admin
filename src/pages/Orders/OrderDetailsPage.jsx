import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";

const OrderDetailsPage = () => {
  useEffect(() => {
    document.title = "Order Details - GiveXChange";
  }, []);
  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] p-5">
      <PageTitle title={`Order Details`} />

      <div className="w-full mt-7 flex flex-col-reverse lg:flex-row items-start justify-between gap-2">
        <div className="bg-white p-5 lg:p-8 w-full lg:w-[70%] rounded-[10px] lg:rounded-[18px]">
          <div className="w-full flex items-center justify-between">
            <p className="text-lg leading-none">Order ID</p>
            <p className="text-lg leading-none">26413</p>
          </div>
          <div className="w-full border my-4" />
          <div className="w-full flex items-center justify-between">
            <p className="text-lg leading-none">Order Placed</p>
            <p className="text-lg leading-none">21 Jan, 2024</p>
          </div>
          <div className="w-full border my-4" />
          <div className="w-full flex items-center justify-between">
            <p className="text-lg leading-none">Order Status</p>
            <p className="text-lg leading-none">In Progress</p>
          </div>
          <div className="w-full border my-4" />
          <div className="w-full flex items-center justify-between">
            <p className="text-lg leading-none">Delivery Type</p>
            <p className="text-lg leading-none">Delivery At home</p>
          </div>
          <div className="w-full border my-4" />
          <div className="w-full">
            <p className="font-semibold leading-none">Delivery Address</p>
            <div className="flex items-center gap-2 mt-4">
              <SlLocationPin className="text-lg" />
              <p className="text-sm leading-[1.3]">
                Unit 500, Montford Court, Montford Street, Salford, M50 2QP -
                123456
              </p>
            </div>
          </div>
          <div className="w-full border my-4" />

          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/stats-card-icon-placeholder.png"
                alt=""
                className="w-[75px] h-[80px] object-contain"
              />
              <p className="text-lg font-semibold">Product Name</p>
            </div>
            <Link
              to={`/order-management`}
              className="button max-w-[140px] flex items-center justify-center"
            >
              View Details
            </Link>
          </div>
          <div className="w-full border my-4" />
          <div className="w-full">
            <p className="font-semibold tracking-tight">Seller Details</p>
            <div className="w-full flex items-center justify-between gap-4 mt-3">
              <div className="flex items-center gap-3">
                <img
                  src="/profile-icon.png"
                  alt=""
                  className="w-[80px] h-[80px] object-contain"
                />
                <div className="">
                  <p className="text-lg font-semibold">Jaccob Smith</p>
                  <p className="text-sm text-[#18181899] font-normal">
                    +1 234 5678 5433
                  </p>
                </div>
              </div>
              <Link
                to={`/users/details/459603928272`}
                className="button max-w-[140px] flex items-center justify-center"
              >
                View Details
              </Link>
            </div>
          </div>
          <div className="w-full border my-4" />
          <div className="w-full">
            <p className="font-semibold tracking-tight">Buyer Details</p>
            <div className="w-full flex items-center justify-between gap-4 mt-3">
              <div className="flex items-center gap-3">
                <img
                  src="/profile-icon.png"
                  alt=""
                  className="w-[80px] h-[80px] object-contain"
                />
                <div className="">
                  <p className="text-lg font-semibold">Jason Cruz</p>
                  <p className="text-sm text-[#18181899] font-normal">
                    +1 234 5678 5433
                  </p>
                </div>
              </div>
              <Link
                to={`/users/details/459603928272`}
                className="button max-w-[140px] flex items-center justify-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 lg:p-8 w-full lg:w-[29%] rounded-[10px] lg:rounded-[18px]">
          <p className="text-[24px] font-semibold leading-none tracking-tight">
            Order Summary
          </p>

          <div className="w-full mt-8 flex items-center justify-between gap-4">
            <p className="text-[#000000B2] font-medium leading-none">
              Subtotal (3 items)
            </p>
            <p className="text-[#000000B2] font-medium leading-none">$848.00</p>
          </div>

          <div className="w-full border my-5"></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-[#000] font-semibold leading-none">Total</p>
            <p className="text-[#000] font-semibold leading-none">$948.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
