import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Link to={`/products/4589848457874`}>
      <div className="w-full bg-white rounded-[20px] p-3">
        <div className="w-full relative">
          <div className="w-full h-[189px] bg-[#EAEAEA] rounded-[15px] flex items-center justify-center">
            <img
              src="/image-placeholder.png"
              alt="image placeholder"
              className="w-[52px] h-[54px]"
            />
          </div>

          <div className="flex items-center gap-1.5 absolute top-4 right-5 z-10">
            <IoIosStar className="text-[#FFD700] text-lg" />
            <p className="font-medium">4.5</p>
          </div>
        </div>

        <div className="w-full mt-4">
          <h3 className="text-[20px] font-semibold leading-none tracking-tight">
            Denim Jacket
          </h3>

          <div className="w-full flex items-center justify-between my-2">
            <p className="text-[#9D9D9DDD] text-[15px] font-normal">
              pick/delivery
            </p>
            <p className="text-[18px] font-semibold leading-none tracking-tight">
              $203.00
            </p>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="/profile-icon.png"
              alt="user profile"
              className="w-[37px] h-[37px]"
            />

            <p className="text-sm font-medium">John Doe</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
