import React from "react";
import { LuSearch } from "react-icons/lu";

const SearchField = ({ placeholder }) => {
  return (
    <div className="w-full h-[41px] rounded-[8px] max-w-[252px] bg-white flex items-center justify-start gap-2 px-3">
      <LuSearch className="text-xl text-[var(--secondary-color)]" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-white placeholder:text-[var(--secondary-color)] text-[var(--secondary-color)] text-sm outline-none"
      />
    </div>
  );
};

export default SearchField;
