import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  title?: string;
  rounded?: string;
  action?: any;
  width?: any;
  height?: any;
}

export const PrimaryButton = ({width, height, title, action, rounded}: PrimaryButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <button
        title="plan_campaign"
        type="submit"
        onClick={action}
        className={`
          ${width ? width : "w-[180px]"} flex items-center justify-center
          ${height ? height : "h-[48px]"} bg-primaryButton
          ${rounded} text-[16px] text-white font-semibold
          hover:bg-transparent hover:border-primaryButton
          hover:border-2 hover:text-primaryButton 
          transition-colors duration-300
        `}
      >
        {title}
      </button>
    </div>
  )
}