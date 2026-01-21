import { SlLocationPin } from "react-icons/sl";

const PickupAddress = ({ data }) => {
  return (
    <>
      <div className="w-full border my-4" />
      <div className="w-full">
        <p className="font-semibold leading-none">Pickup Address</p>
        <div className="flex items-center gap-2 mt-4">
          <SlLocationPin className="text-lg" />
          <p className="text-sm leading-[1.3]">
            {data?.deliveryMethod === "delivery" ? (
              <>
                {data?.product?.communityPickupAddress
                  ? data?.product?.communityPickupAddress?.address
                  : "N/A"}
              </>
            ) : (
              <>
                {data?.product?.pickupAddress
                  ? data?.product?.pickupAddress?.address
                  : "N/A"}
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default PickupAddress;
