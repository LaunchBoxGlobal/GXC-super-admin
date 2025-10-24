import React from "react";

const CommunityInfo = () => {
  return (
    <div className="w-full bg-white p-5 rounded-[15px] flex items-center justify-between gap-5 flex-wrap mt-5">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full lg:w-[60%]">
        <img
          src="/stats-card-icon-placeholder.png"
          alt="user profile picture"
          className="w-[116px]"
        />
        <div>
          <h2 className="font-semibold text-[32px] leading-none">
            Community 01
          </h2>
          <div className="mt-3 flex flex-col items-start gap-2">
            <p className="font-normal text-base leading-[1.3] text-[var(--secondary-color)]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ad
              facere sint officiis repellat commodi dicta hic molestias sed
              dolores.
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
            1250
          </p>
        </div>
        <div className="text-center">
          <p className="font-normal text-base leading-[1.3] text-[var(--secondary-color)]">
            Products
          </p>
          <p className="font-semibold text-[24px] leading-[1.3] text-[#000]">
            1250
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfo;
