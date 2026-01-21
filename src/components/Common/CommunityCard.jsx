import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

const CommunityCard = ({ community }) => {
  return (
    <>
      {community?.status && (
        <Link
          to={`/community-owners/details/community/${community?.slug}/${community?.id}`}
        >
          <div className="w-full bg-white custom-shadow p-5 rounded-[20px] min-h-[290px] flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="space-y-2">
                  <p className="text-lg font-semibold leading-none">
                    {community?.name}
                  </p>
                  <p className="text-sm text-[#717182] leading-none">
                    {community?.slug}
                  </p>
                </div>
              </div>
              {/* <div>
                <button type="button">
                  <HiOutlineDotsVertical className="text-2xl" />
                </button>
              </div> */}
            </div>

            <div className="w-full my-5 min-h-[90px]">
              <p className="text-sm leading-[1.2] text-[var(--secondary-color)]">
                {community?.description?.length > 100
                  ? `${community?.description?.slice(0, 100)}...`
                  : community?.description}
              </p>
            </div>

            <div className="w-full">
              <div className="w-full border my-3" />

              <div className="w-full flex items-center justify-between">
                <p className="text-sm font-normal text-[#202020]">Members</p>
                <p className="text-sm font-semibold text-[var(--button-bg)]">
                  {community?.member_count}
                </p>
              </div>

              <div className="w-full border my-3" />

              <div className="w-full flex items-center justify-between">
                <p className="text-sm font-normal text-[#202020]">
                  Total Products
                </p>
                <p className="text-sm font-semibold text-[var(--button-bg)]">
                  {community?.product_count}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CommunityCard;
