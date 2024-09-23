import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  title: string;
  action: any;
}

export const PrimaryButton = ({title, action}: PrimaryButtonProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center pt-2">
      <button
        title="plan_campaign"
        type="submit"
        onClick={() => {
          console.log("clicked", action);
          if (action === 0) {
            navigate("/regularplan");
          } else if (action === 1) {
            navigate("/specialdayplan");
          } else if (action === 2) {
            navigate("/triggerbasedplan");
          }
        }}
        className="
          p-2 w-[180px] h-[48px] bg-primaryButton
          rounded-[30px] text-[16px] text-white font-semibold
          hover:bg-transparent hover:border-primaryButton
          hover:border-2 hover:text-primaryButton 
          transition-colors duration-300
          "
      >
        {title}
      </button>
    </div>
  )
}