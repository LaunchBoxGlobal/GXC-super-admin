import React from "react";

const CommunityInfo = ({
  community,
  enableDisableCommunity,
  enableDisableLoading,
}) => {
  return (
    <div className="w-full bg-white custom-shadow p-5 rounded-[15px] flex items-center justify-between gap-5 flex-wrap mt-5">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full lg:w-[60%]">
        <div>
          <h2 className="font-semibold text-[32px] leading-none">
            {community?.community?.name}
          </h2>
          <div className="mt-3 flex flex-col items-start gap-2">
            <p className="font-normal text-base leading-[1.3] text-[var(--secondary-color)]">
              <span className="text-black font-medium">Slug: </span>
              {community?.community?.slug}
            </p>
            <p className="font-normal text-base leading-[1.3] text-[var(--secondary-color)]">
              <span className="text-black font-medium">Description: </span>{" "}
              {community?.community?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-auto flex items-center gap-10">
        <div className="text-center">
          <p className="font-normal text-base leading-[1.3] text-[var(--secondary-color)]">
            Members
          </p>
          <p className="font-semibold text-[24px] leading-[1.3] text-[#000]">
            {community?.community?.memberCount}
          </p>
        </div>
        <div className="text-center">
          <p className="font-normal text-base leading-[1.3] text-[var(--secondary-color)]">
            Products
          </p>
          <p className="font-semibold text-[24px] leading-[1.3] text-[#000]">
            {community?.community?.productCount}
          </p>
        </div>
        <div className="pt-1.5 text-center">
          <p className="font-normal text-base leading-[1.3] text-[var(--secondary-color)]">
            {community && !community.community.isDeactivatedByAdmin
              ? "Suspend"
              : "Unsuspend"}
          </p>
          <label className="inline-flex items-center cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={!community?.community?.isDeactivatedByAdmin}
              disabled={enableDisableLoading}
              onChange={enableDisableCommunity}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--button-bg)]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfo;
