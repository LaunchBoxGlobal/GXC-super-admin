import React from "react";

const DeleteCategoryModal = ({
  openDeleteCategoryModal,
  setOpenDeleteCategoryModal,
}) => {
  return (
    openDeleteCategoryModal && (
      <div className="w-full h-screen bg-[rgba(0,0,0,0.5)] fixed inset-0 z-50 flex items-center justify-center px-5">
        <div className="bg-white w-full max-w-[471px] rounded-[18px] p-8 flex flex-col items-center justify-center relative">
          <div className="w-[102px] h-[102px] rounded-full bg-[var(--button-bg)] flex items-center justify-center">
            <img
              src="/delete-category-modal-icon.png"
              alt="delete-category-modal-icon"
              width={67}
              height={57}
            />
          </div>
          <h2 className="font-semibold text-[24px] leading-none mt-4">
            Delete Category
          </h2>
          <p className="tetx-[#565656] text-center leading-[1.2] mt-3">
            Are you sure you want to delete this category?
          </p>

          <div className="w-full grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              className="w-full bg-[var(--secondary-bg)] text-black rounded-[12px] h-[48px] "
              onClick={() => setOpenDeleteCategoryModal(false)}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => setOpenDeleteCategoryModal(false)}
              className="w-full bg-[var(--button-bg)] text-white rounded-[12px] h-[48px] "
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteCategoryModal;
