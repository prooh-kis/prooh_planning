import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";

interface CheckboxProps {
  label?: any;
  checked?: boolean;
  textSize?: string;
  color?: string;
  emailText?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean; // Added disabled prop to be more specific
  icon?: any;
  showIcon?: any;
}

export const CheckboxInput: React.FC<CheckboxProps> = ({
  showIcon,
  icon,
  emailText,
  disabled,
  color,
  textSize,
  label,
  checked,
  onChange,
}) => {
  const handleLabelClick = (e: React.MouseEvent) => {
    // Prevent the default behavior to avoid double-triggering
    e.preventDefault();
    // Toggle the checked state
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <label 
      className="grid grid-cols-12 flex items-center space-x-2 cursor-pointer truncate p-1"
      onClick={handleLabelClick}
    >
      <input
        type="checkbox"
        className={`col-span-1 form-checkbox h-4 w-4 text-[#52A2FF]`}
        checked={checked}
        disabled={disabled}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event.target.checked)}
      />

      <Tooltip title={<h1 className="text-[10px]">{label ? label : "Checkbox"}</h1>}>
        {showIcon ? (
          <span className={`col-span-11 truncate v`}>
            <i
              className={`${icon} pl-2 flex justify-start items-center text-[${
                color ? color : "#21394F"
              }] text-[${textSize ? textSize : "12px"}]`}
            ></i>
          </span>
        ) : (
          <span
            className={`pl-2 col-span-11 flex justify-start text-[${
              color ? color : "#21394F"
            }] text-[${textSize ? textSize : "12px"}] truncate whitespace-pre ${!emailText && "capitalize"}
            ${checked ? "text-[#21394F]" : "text-[#9CA3AF]"}
            `}
          >
            {typeof label === "string" ? label?.toLowerCase() : label}
          </span>
        )}
        </Tooltip>
    </label>
  );
};
