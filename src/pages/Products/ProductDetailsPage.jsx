import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import Gallery from "./Gallery";

const ProductDetailsPage = () => {
  useEffect(() => {
    document.title = "Product Details - GiveXChange";
  }, []);
  return (
    <div className="w-full bg-[var(--page-bg)] rounded-[10px] p-5">
      <PageTitle title={`Product Details`} />

      <div className="w-full bg-white rounded-[10px] p-7 mt-5">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="w-full">
            <Gallery />
          </div>
          <div className="w-full">
            <div className="w-full flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="font-semibold text-[20px] leading-none tracking-tight">
                  Denim Jacket
                </p>
                <p className="font-medium text-xs">Pickup/Delivery</p>
              </div>
              <p className="text-[24px] font-semibold leading-none">$199.00</p>
            </div>
            <div className="w-full border my-5" />

            <div className="w-full space-y-3">
              <p className="text-sm font-semibold">Description</p>
              <p className="text-sm font-normal leading-[1.3]">
                Xbox Series X is Microsoft's flagship gaming console, offering
                unparalleled performance and speed. With its powerful AMD Zen 2
                processor and RDNA 2 graphics architecture, it delivers stunning
                4K visuals and supports up to 120 frames per second. The Series
                X features a 1TB SSD for rapid load times and seamless gameplay,
                while its backward compatibility allows access.
              </p>
            </div>

            <div className="w-full border my-5" />

            <div className="w-full flex items-center justify-between gap-5">
              <div className="w-full space-y-3 lg:border-r">
                <p className="text-sm font-semibold">Quantity</p>
                <p className="text-sm font-normal leading-[1.3]">
                  50pcs Available
                </p>
              </div>

              <div className="w-full space-y-3">
                <p className="text-sm font-semibold">Seller Profile</p>
                <div className="flex items-center gap-2">
                  <img
                    src="/profile-icon.png"
                    alt="user profile placeholder"
                    className="w-[32px] h-[32px] object-cover"
                  />
                  <p className="text-sm font-normal leading-[1.3]">John Doe</p>
                </div>
              </div>
            </div>

            <div className="w-full border my-5" />

            <div className="w-full space-y-3">
              <p className="text-sm font-semibold">Communities</p>
              <p className="text-sm font-normal leading-[1.3]">
                Community 1, Community 2, Community 3
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
