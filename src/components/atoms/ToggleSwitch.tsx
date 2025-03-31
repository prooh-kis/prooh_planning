import { FC } from "react";

interface ToggleSwitchProps {
  value: boolean;
  action: () => void;
}
export const ToggleSwitch: FC<ToggleSwitchProps>  = ({value, action}) => {

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        title="toggle"
        type="checkbox"
        className="sr-only"
        checked={value}
        onChange={action}
      />
      <div
        className={`w-16 h-5 flex items-center rounded-full p-1 transition-colors 
          ${value ? "bg-[#22C55E]" : "bg-gray-400"}`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform 
            ${value ? "translate-x-10" : "translate-x-0"}`}
        />
      </div>
    </label>
  );
};

