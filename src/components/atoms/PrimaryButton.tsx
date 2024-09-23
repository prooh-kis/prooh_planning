import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  title: string;
  rounded: string;
  action: any;
}

export const PrimaryButton = ({title, action, rounded}: PrimaryButtonProps) => {

  return (
    <div className="flex justify-center items-center pt-2">
      <button
        title="plan_campaign"
        type="submit"
        onClick={action}
        className={`
          p-2 w-[180px] h-[48px] bg-primaryButton
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