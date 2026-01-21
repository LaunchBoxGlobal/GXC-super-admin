import React from "react";

const CategoryAddedSuccessModal = ({
  categoryAdded,
  setCategoryAdded,
  isEditable,
  // fetchCategories,
}) => {
  return (
    categoryAdded && (
      <div className="w-full h-screen bg-[rgba(0,0,0,0.5)] fixed inset-0 z-50 flex items-center justify-center px-5">
        <div className="bg-white w-full max-w-[471px] rounded-[18px] p-8 flex flex-col items-center justify-center relative">
          <button
            type="button"
            className="absolute right-7 top-8"
            onClick={() => {
              // fetchCategories();
              setCategoryAdded(false);
            }}
          >
            <img
              src="/close-icon.png"
              alt="check icon"
              width={20}
              height={20}
            />
          </button>
          <div className="w-[102px] h-[102px] rounded-full bg-[var(--button-bg)] flex items-center justify-center">
            <img
              src="/check-icon.png"
              alt="check-icon"
              width={31}
              height={23}
            />
          </div>
          <h2 className="font-semibold text-[24px] leading-none mt-4">
            Category{" "}
            {isEditable ? "updated successfully" : "successfully added"}
          </h2>
          <p className="tetx-[#565656] text-center leading-[1.2] mt-3">
            {isEditable
              ? "The category has been updated successfully. You can now assign products or services under this category to keep your listings well organized."
              : "The new category has been successfully added to your system. You can now assign products or services under this category to keep your listings well organized."}
          </p>
        </div>
      </div>
    )
  );
};

export default CategoryAddedSuccessModal;
