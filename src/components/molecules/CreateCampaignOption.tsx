import { useNavigate } from "react-router-dom";
import { image9 } from "../../assets";

export const CreateCampaignOption = () => {
  const navigate = useNavigate();
  return (
    <div className="border border-black w-full p-8 sm:px-40 bg-[#129BFF] flex flex-col sm:flex-row justify-between mt-4 lg:mt-8">
      <div>
        <h1 className="text-white text-[30px] sm:text-[49px] font-bold w-full sm:w-[593px] leading-[57.2px] tracking-[-0.01em]">
          {` Ready to build your team's dream Campaign`}
        </h1>
        <button className="bg-white text-black px-[20px] sm:px-[58px] py-[10px] sm:py-[20px] rounded-[9px] text-[14px] sm:text-[16px] font-bold mt-8 hover:bg-black hover:text-white hover:text-[18px]"
          onClick={() => navigate("/auth")}
        >
          Create Campaign
        </button>
      </div>
      <div className="w-full sm:w-auto mt-8 sm:mt-0">
        <img src={image9} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};
