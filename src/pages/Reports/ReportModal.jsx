import { IoClose } from "react-icons/io5";

const ReportModal = ({ showPopup, togglePopup }) => {
  return (
    showPopup && (
      <div className="w-full h-screen flex items-center justify-center px-6 fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white w-full max-w-[461px] p-5 lg:p-7 rounded-[16px]">
          <div className="w-full flex items-center justify-between">
            <h2 className="font-bold text-[24px] leading-none tracking-tight">
              User Report
            </h2>
            <button type="button" onClick={togglePopup}>
              <IoClose className="text-2xl text-gray-600" />
            </button>
          </div>

          <div className="w-full mt-5 flex items-center justify-start gap-x-14 gap-4">
            <div className="w-1/2 border-r">
              <p className="text-sm text-[var(--secondary-color)]">Reporter</p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src="/profile-icon.png"
                  alt="user profile picture"
                  className="w-[35px] h-[35px] object-cover"
                />
                <span className="text-sm font-normal">John Doe</span>
              </div>
            </div>
            <div className="w-1/2">
              <p className="text-sm text-[var(--secondary-color)]">
                Reported Date
              </p>

              <p className="text-lg font-normal mt-2">11/11/2023</p>
            </div>
          </div>

          <div className="w-full border mb-3 mt-5" />

          <div className="w-full">
            <p className="text-base font-normal mt-2">Description</p>
            <p className="text-base font-normal leading-[1.2] mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          <div className="w-full border mb-3 mt-5" />

          <div className="w-full flex items-center justify-between">
            <div className="">
              <p className="font-normal">Reported User</p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src="/profile-icon.png"
                  alt="user profile picture"
                  className="w-[35px] h-[35px] object-cover"
                />
                <span className="text-lg font-semibold">John Doe</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <label
                htmlFor="disable"
                className="font-semibold text-[#202224] text-sm"
              >
                Disable
              </label>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ReportModal;
