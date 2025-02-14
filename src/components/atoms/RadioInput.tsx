interface RadioInputProps {
  value?: string;
  title?: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void; // Updated action type to be more specific
  textSize?: any;
}

export const RadioInput = ({
  isChecked,
  title,
  value,
  onChange,
  textSize,
}: RadioInputProps) => {
  // console.log(option);
  // console.log(value);
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        value={value}
        // defaultChecked={option === value}
        checked={isChecked}
        onChange={(e: any) => onChange(e)}
        className="h-4 w-4 border border-[#D6D2D2] rounded-full checked:bg-green-600 checked:border-gray-600 transition duration-200"
      />
      <span
        className={`ml-2 hover:text-primaryButton ${
          isChecked ? "text-primaryButton" : "text-primaryText"
        } ${textSize ? textSize : "md:text-[16px] sm:text-[14px]"}`}
      >
        {title}
      </span>
    </label>
  );
};
