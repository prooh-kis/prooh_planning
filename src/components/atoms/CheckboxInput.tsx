import React, { useState } from "react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  textSize?: string;
  color?: string;
  onChange?: (checked: boolean) => void;
}

export const CheckboxInput: React.FC<CheckboxProps> = ({ color, textSize, label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-[#52A2FF]"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className={`text-[${color ? color : "#21394F"}] text-[${textSize ? textSize : "14px"}]`}>{label}</span>
    </label>
  );
};
