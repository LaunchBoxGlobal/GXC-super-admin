import React from "react";

const MembersList = () => {
  return (
    <div className="w-full bg-white px-5 py-1 rounded-[8px] mt-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]?.map((_, i) => {
        return (
          <div
            key={i}
            className={`w-full py-4 flex items-center justify-between ${
              i !== 9 && "border-b"
            }`}
          >
            <div className="flex items-center gap-2">
              <img
                src="/profile-icon.png"
                alt="user profile placeholder"
                className="w-[37px] h-[37px] object-cover"
              />
              <div className="">
                <p className="font-semibold leading-none">John Alex</p>
                <p className="font-normal text-sm text-[var(--secondary-color)] leading-none mt-1">
                  john.alex@gmail.com
                </p>
              </div>
            </div>
            <div className="">
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MembersList;
