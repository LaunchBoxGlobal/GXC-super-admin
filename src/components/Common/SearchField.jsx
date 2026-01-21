import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

const SearchField = ({ placeholder }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setValue(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) params.set("search", value.trim());
      else params.delete("search");

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

  return (
    <div className="w-full h-[41px] rounded-[8px] min-w-[252px] lg:max-w-[252px] bg-white custom-shadow flex items-center justify-start gap-2 px-3">
      <LuSearch className="text-xl text-[var(--secondary-color)]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-white placeholder:text-[var(--secondary-color)] text-[var(--secondary-color)] text-sm outline-none"
      />
    </div>
  );
};

export default SearchField;
