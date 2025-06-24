import { useNavigate } from "react-router-dom";

interface PrimaryInputProps {
  placeholder?: string;
  value?: string;
  inputType?: string; // Updated inputType to be more specific
  action: (value: string) => void; // Updated action type to be more specific
  prefix?: any;
  suffix?: any;
  rounded?: any;
  height?: any;
  width?: any;
  disabled?: boolean;
  text?: any;
}

export const PrimaryInput = ({
  disabled,
  height,
  width,
  placeholder,
  rounded,
  prefix,
  suffix,
  value,
  action,
  inputType,
  text,
}: PrimaryInputProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      {prefix}
      <input
        disabled={disabled}
        title="input_box"
        type={inputType}
        value={value}
        placeholder={placeholder || "Type to input"}
        onChange={(e) => action(e.target.value)}
        onWheel={(e) => inputType === "number" && e.currentTarget.blur()}
        min={inputType === "number" ? 1 : undefined}
        className={`${text ? text : "text-[12px]"} ${height ? height : "h-[48px]"} ${
          width ? width : "w-full"
        } border ${
          rounded ? rounded : "rounded-lg"
        } pl-5 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-[#F4F9FF] transition-colors`}
      />
      {suffix}
    </div>
  );
};
