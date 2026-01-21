import React from "react";
import { LuSearch } from "react-icons/lu";

const SearchUsers = ({ searchValue, setSearchValue }) => {
  return (
    <div className="w-full h-[41px] rounded-[8px] max-w-[252px] bg-white custom-shadow flex items-center gap-2 px-3">
      <LuSearch className="text-xl text-[var(--secondary-color)]" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        className="w-full bg-white placeholder:text-[var(--secondary-color)] text-[var(--secondary-color)] text-sm outline-none"
      />
    </div>
  );
};

export default SearchUsers;
