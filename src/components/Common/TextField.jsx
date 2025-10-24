import React from "react";

const TextField = ({
  name,
  value,
  onChange,
  onBlur,
  type,
  placeholder,
  error,
  touched,
  label,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full border h-[49px] px-[15px] py-[14px] rounded-[8px] outline-none bg-[#F5F5F5]
          ${error && touched ? "border-red-500" : "border-[#F5F5F5]"}`}
      />
      {error && touched && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextField;
