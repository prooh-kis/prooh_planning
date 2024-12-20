import React, { useEffect, useState } from "react";

interface CheckboxProps {
  label?: any;
  checked?: boolean;
  textSize?: string;
  color?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;  // Added disabled prop to be more specific
}

export const CheckboxInput: React.FC<CheckboxProps> = ({ disabled, color, textSize, label, checked, onChange }) => {
  // const [isChecked, setIsChecked] = useState(false);

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked: checkedStatus } = event.target;
  //   setIsChecked(checkedStatus);
  //   onChange?.(checkedStatus);
  // };

  // useEffect(() => {
  //   console.log("CheckboxInput: Prop `checked` changed to", checked);
  //   // if (checked) {
  //   //   setIsChecked(checked || false);
  //   // }
  // },[]);
  // console.log("CheckboxInput: `isChecked` state is", isChecked);

  return (
    <label className="flex items-center space-x-2 cursor-pointer truncate">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-[#52A2FF]"
        checked={checked}
        disabled={disabled}
        onChange={(checked: any) => onChange?.(checked)}
      />
      <span className={`text-[${color ? color : "#21394F"}] text-[${textSize ? textSize : "14px"}] lg:text-[14px] md:text-[12px] sm:text-[10px] truncate`}>
        {label}
        </span>
    </label>
  );
};
