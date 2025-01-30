import React from "react";

export const DropdownInput = ({
  height = "h-[40px]",
  width = "w-full",
  placeHolder,
  selectedOption,
  setSelectedOption,
  options,
}: any) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={`relative ${width}`}>
      <select
        title="dropdown"
        className={`truncate ${height} ${width} text-[14px] border px-3 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-blue-100 transition-colors appearance-none rounded-md`}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options?.map((opt: any, index: any) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};
