import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const SellerDetails = ({ data }) => {
  return (
    <>
      <div className="w-full border my-4" />
      <div className="w-full">
        <p className="font-semibold tracking-tight">Seller Details</p>
        <div className="w-full flex items-center justify-between gap-4 mt-3 flex-wrap">
          <div className="flex items-center gap-3">
            <LazyLoadImage
              src={
                data?.seller?.profilePictureUrl
                  ? data?.seller?.profilePictureUrl
                  : "/profile-icon.png"
              }
              effect="blur"
              alt="user profile picture"
              className="min-w-[75px] max-w-[75px] max-h-[75px] min-h-[75px] object-cover rounded-full"
            />
            <div className="">
              <p className="text-lg font-semibold">{data?.seller?.name}</p>
              <p className="text-sm text-[#18181899] font-normal">
                {data?.seller?.phone}
              </p>
            </div>
          </div>
          <Link
            to={`/users/details/${data?.seller?.name}/${data?.seller?.id}`}
            className="button max-w-[140px] flex items-center justify-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default SellerDetails;
