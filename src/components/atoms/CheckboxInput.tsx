import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";

interface CheckboxProps {
  label?: any;
  checked?: boolean;
  textSize?: string;
  color?: string;
  small?: any;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;  // Added disabled prop to be more specific
  icon?: any;
  showIcon?: any;
}

export const CheckboxInput: React.FC<CheckboxProps> = ({ showIcon, icon, small, disabled, color, textSize, label, checked, onChange }) => {
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
    <label className="border grid grid-cols-12 flex items-center space-x-2 cursor-pointer truncate p-1">
      <input
        type="checkbox"
        className={`col-span-1 form-checkbox h-4 w-4 text-[#52A2FF]`}
        checked={checked}
        disabled={disabled}
        onChange={(checked: any) => onChange?.(checked)}
      />

      {showIcon ? (
        <span className={`col-span-11`}>
          <Tooltip
            title={label}
          >
            <i className={`${icon} flex justify-center items-center text-[${color ? color : "#21394F"}] text-[${textSize ? textSize : "12px"}]`}></i>
          </Tooltip>
        </span>
      ) : (
        <span className={`col-span-11 flex justify-start text-[${color ? color : "#21394F"}] text-[${textSize ? textSize : "12px"}] truncate`}>
          {label}
        </span>
      )}

    </label>
  );
};
