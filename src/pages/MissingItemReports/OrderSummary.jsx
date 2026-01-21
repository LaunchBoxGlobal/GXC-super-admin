import React from "react";
import MarkItemResolvedRejected from "./MarkItemResolvedRejected";

const OrderSummary = ({ data, fetchOrder }) => {
  return (
    <div className="bg-white custom-shadow p-5 lg:p-8 w-full rounded-[10px] lg:rounded-[18px]">
      <p className="text-[24px] font-semibold leading-none tracking-tight">
        Order Summary
      </p>

      <div className="w-full mt-8 flex items-center justify-between gap-4">
        <p className="text-[#000000B2] font-medium leading-none">
          Admin{" "}
          <span className="text-sm">
            {`(${data?.transaction?.admin?.percentage}%)`}
          </span>
        </p>
        <p className="text-[#000000B2] font-medium leading-none">
          ${data?.transaction?.admin?.amount.toFixed(2)}
        </p>
      </div>

      <div className="w-full border my-5"></div>

      <div className="w-full flex items-center justify-between gap-4">
        <p className="text-[#000000B2] font-medium leading-none">
          Community Owner{" "}
          <span className="text-sm">
            {`(${data?.transaction?.communityOwner?.percentage}%)`}
          </span>
        </p>
        <p className="text-[#000000B2] font-medium leading-none">
          ${data?.transaction?.communityOwner?.amount.toFixed(2)}
        </p>
      </div>

      <div className="w-full border my-5"></div>

      <div className="w-full flex items-center justify-between gap-4">
        <p className="text-[#000000B2] font-medium leading-none">
          Seller{" "}
          <span className="text-sm">
            {`(${data?.transaction?.seller?.percentage}%)`}
          </span>
        </p>
        <p className="text-[#000000B2] font-medium leading-none">
          ${data?.transaction?.seller?.amount.toFixed(2)}
        </p>
      </div>

      <div className="w-full border my-5"></div>
      <div className="w-full flex items-center justify-between gap-4">
        <p className="text-[#000000B2] font-medium leading-none">Stripe Fee</p>
        <p className="text-[#000000B2] font-medium leading-none">
          ${data?.transaction?.stripe?.amount.toFixed(2)}
        </p>
      </div>

      <div className="w-full border my-5"></div>

      <div className="w-full flex items-center justify-between">
        <p className="text-[#000] font-semibold leading-none">Total</p>
        <p className="text-[#000] font-semibold leading-none">
          ${data?.price.toFixed(2)}
        </p>
      </div>

      {data?.report?.status === "pending" && (
        <>
          <div className="w-full border my-5"></div>
          <MarkItemResolvedRejected data={data} fetchOrder={fetchOrder} />
        </>
      )}
    </div>
  );
};

export default OrderSummary;
