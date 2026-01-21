const CancellationReason = ({ data }) => {
  return (
    <div className="bg-white custom-shadow p-5 lg:p-8 w-full rounded-[10px] lg:rounded-[18px] mt-5">
      <p className="text-[24px] font-semibold leading-none tracking-tight">
        Cancellation Reason
      </p>
      <div className="w-full border my-5"></div>
      <p className="">
        {data?.cancellationReason ? data?.cancellationReason : "N/A"}
      </p>
    </div>
  );
};

export default CancellationReason;
