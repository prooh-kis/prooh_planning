import React from "react";

export const DropdownInput = ({
  height = "10",
  width = "full",
  placeHolder,
  selectedOption,
  setSelectedOption,
  options,
  border = "border-gray-200",
  rounded = false,
}: any) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  // Create dynamic classes for height and width
  const dropdownHeight = height ? height : "h-[40px]";
  const dropdownWidth = width ? width : "w-full";

  return (
    <div className={height ? "relative" : "relative w-full"}>
      <select
        title="dropdown"
        className={`truncate w-full ${dropdownHeight} ${dropdownWidth} text-[14px] border ${border} ${
          rounded ? "rounded-full" : "rounded-lg"
        } ${
          height ? "pr-4 pl-2" : "px-3"
        } py-1 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-[#F4F9FF] transition-colors appearance-none truncate`}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">{placeHolder}</option>
        {options?.map((opt: any, index: any) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg
          className={height ? "w-4 h-4" : "w-5 h-5 text-gray-500"}
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
