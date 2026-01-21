import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const UserProductList = ({ products, searchTerm, setSearchTerm, loading }) => {
  return (
    <div className="w-full bg-white mt-8">
      <div className="w-full flex items-center justify-between gap-5">
        <h3 className="text-[24px] lg:text-[32px] font-semibold leading-none">
          Products {`(${products?.length})`}
        </h3>
      </div>

      <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => {
          return (
            <Link key={product?.id} to={`/products/${product?.id}`}>
              <div className="w-full bg-white custom-shadow rounded-[20px] p-3 relative overflow-hidden min-h-[350px]">
                <div className="w-full relative">
                  <div className="w-full aspect-[5/5] bg-[#fff] rounded-[15px] overflow-hidden">
                    <LazyLoadImage
                      src={
                        product?.imageUrl
                          ? product?.imageUrl
                          : "/image-placeholder.png"
                      }
                      effect="blur"
                      alt="product"
                      className="w-full h-full object-cover  rounded-[15px] "
                    />
                  </div>
                </div>

                <div className="w-full mt-4">
                  <div className="w-full flex items-center justify-between gap-3">
                    <h3 className="text-[20px] font-semibold leading-none tracking-tight w-full max-w-[80%]">
                      {product?.title}
                    </h3>
                    <p
                      className={`${
                        product?.status === "delisted"
                          ? "text-red-500"
                          : product?.status === "sold"
                          ? "text-red-500"
                          : product?.status === "active"
                          ? "text-green-500"
                          : "text-gray-500"
                      } font-medium`}
                    >
                      {product?.status.charAt(0).toUpperCase() +
                        product?.status.slice(1)}
                    </p>
                  </div>

                  <div className="w-full flex items-center justify-between my-2">
                    <p className="text-[#9D9D9DDD] text-[15px] font-normal">
                      {product?.delivery_method == "pickup"
                        ? "Pickup"
                        : product?.delivery_method == "delivery"
                        ? "Delivery"
                        : product?.delivery_method == "both"
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
        })}
      </div>
    </div>
  );
};

export default UserProductList;
