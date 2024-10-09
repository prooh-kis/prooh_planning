import React, { useState } from 'react';

export const DropdownInput = ({placeHolder, selectedOption, setSelectedOption, options }: any) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  console.log(options);
  return (
    <div className="relative w-full">
      <select
        title="dropdown"
        className="h-[40px] w-full border rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-blue-100 transition-colors appearance-none"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">{placeHolder}</option>  {/* Default option */}
        {options?.map((opt: any, index: any) => (
          <option key={index} value={opt.value} >{opt.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500"
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

