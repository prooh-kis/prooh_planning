import { useNavigate } from "react-router-dom";

interface PrimaryInputProps {
  placeholder?: string;
  value?: string;
  inputType?: string;  // Updated inputType to be more specific
  action: (value: string) => void;  // Updated action type to be more specific
  prefix?: any;
  suffix?: any;

}

export const PrimaryInput = ({prefix, suffix, value, action, inputType }: PrimaryInputProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {prefix}
      <input
        title="input_box"
        type={inputType}
        value={value}
        onChange={(e) => action(e.target.value)}
        className="h-[48px] w-full border rounded-lg pl-5 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-blue-100 transition-colors"
      />
      {suffix}
    </div>
  );
};
