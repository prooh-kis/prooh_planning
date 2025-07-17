import React from "react";

export const SearchInputField = ({ value, onChange, placeholder, className }: any) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className={`${className ? className : "h-[40px] text-[14px] py-2"} rounded-md pl-10 pr-4 border focus:outline-none focus:ring-2 focus:ring-[#129BFF] w-full`}
      />
      <div className="absolute left-3 top-1 bottom-1 flex items-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16.5 10.5A6 6 0 1110.5 4.5 6 6 0 0116.5 10.5z"
          />
        </svg>
      </div>
      <div className="absolute right-3 top-1 cursor-pointer">
        {value && (
          <i className="fi fi-rs-circle-xmark flex items-center" onClick={() => onChange("")}></i>
        )}
      </div>
    </div>
  );
};

export default SearchInputField;
