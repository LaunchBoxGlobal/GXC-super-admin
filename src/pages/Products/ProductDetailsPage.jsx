import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/Common/PageTitle";
import Gallery from "./Gallery";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import { useGetProductByIdQuery } from "../../services/productsApi/productsApi";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(
    productId,
    {
      skip: !productId,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  const product = data?.data?.product;

  useEffect(() => {
    document.title = "Product Details - giveXchange";
  }, []);

  if (isError) {
    return (
      <PageError
        errorMessage={
          error?.data?.message || error?.error || "Something went wrong!"
        }
      />
    );
  }

  return (
    <div className="w-full bg-white custom-shadow rounded-[10px] p-5 min-h-screen">
      <PageTitle title="Product Details" />

      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="w-full bg-white custom-shadow rounded-[10px] p-7 mt-5">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="w-full">
              <Gallery images={product?.images} />
            </div>

            <div className="w-full">
              <div className="w-full flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="font-semibold text-[20px] leading-none tracking-tight">
                    {product?.title}
                  </p>
                  <p className="font-medium text-xs">
                    {product?.deliveryMethod === "delivery"
                      ? "Community Pickup"
                      : product?.deliveryMethod === "pickup"
                      ? "Pickup"
                      : "Pickup / Community Pickup"}
                  </p>
                </div>

                <p className="text-[24px] font-semibold leading-none">
                  ${product?.price}
                </p>
              </div>

              <div className="w-full border my-5" />

              <div className="w-full space-y-3">
                <p className="text-sm font-semibold">Description</p>
                <p className="text-sm font-normal leading-[1.3] break-words">
                  {product?.description}
                </p>
              </div>

              <div className="w-full border my-5" />

              <div className="w-full flex items-center justify-between gap-5">
                <div className="w-full space-y-3">
                  <p className="text-sm font-semibold">Seller Profile</p>
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        product?.seller?.profilePictureUrl ||
                        "/profile-icon.png"
                      }
                      alt="seller profile"
                      className="w-[32px] h-[32px] object-cover rounded-full"
                    />
                    <p className="text-sm font-normal leading-[1.3]">
                      {product?.seller?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
