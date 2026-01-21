import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const MissingItemDetails = ({ data }) => {
  return (
    <>
      <div className="w-full border my-4" />
      <div className="w-full">
        <p className="font-semibold tracking-tight">Product Details</p>
        <div className="w-full flex items-center justify-between gap-4 mt-3 flex-wrap">
          <div className="flex items-center gap-3">
            <LazyLoadImage
              src={
                data?.product?.image
                  ? data?.product?.image
                  : "/stats-card-icon-placeholder.png"
              }
              effect="blur"
              alt="user profile picture"
              className="min-w-[75px] max-w-[75px] max-h-[75px] min-h-[75px] object-cover rounded-full"
            />
            <p className="text-lg font-semibold">{data?.product?.title}</p>
          </div>
          <Link
            to={`/products/${data?.product?.id}`}
            className="button max-w-[140px] flex items-center justify-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default MissingItemDetails;
