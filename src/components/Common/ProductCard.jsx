import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({ product }) => {
  return (
    <Link key={product?.id} to={`/products/${product?.id}`}>
      <div className="w-full bg-white custom-shadow rounded-[20px] p-3">
        <div className="w-full relative">
          <div className="w-full h-[266px] bg-white rounded-[15px] overflow-hidden relative [&>*]:h-full [&>*]:w-full">
            <LazyLoadImage
              src={product?.images[0]?.imageUrl}
              effect="blur"
              alt="product"
              className="w-full min-h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <h3 className="text-[20px] font-semibold leading-none tracking-tight">
            {product?.title}
          </h3>

          <div className="w-full flex items-center justify-between my-2">
            <p className="text-[#9D9D9DDD] text-[15px] font-normal">
              {product?.deliveryMethod == "pickup"
                ? "Pickup"
                : product?.deliveryMethod == "delivery"
                ? "Delivery"
                : product?.deliveryMethod == "both"
                ? "Pickup / Delivery"
                : ""}
            </p>
            <p className="text-[18px] font-semibold leading-none tracking-tight">
              ${product?.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
