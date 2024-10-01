import React, { useState } from 'react';

export const DropdownInput = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="relative w-64">
      <select
        title="dropdown"
        className="h-[40px] w-full border rounded-lg pl-10 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-blue-100 transition-colors"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">Select</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
    </div>
  );
};

