import { image9 } from "../../assets";

export const CreateCampaignOption = () => {
  return (
    <div className="w-full p-8 sm:px-40 bg-[#129BFF] flex flex-col sm:flex-row justify-between mt-4 lg:mt-8">
      <div>
        <h1 className="text-white text-[30px] sm:text-[49px] font-bold w-full sm:w-[593px]">
          {` Ready to build your team's dream Campaign`}
        </h1>
        <button className="bg-white text-black px-[20px] sm:px-[58px] py-[10px] sm:py-[20px] rounded-[9px] text-[14px] sm:text-[16px] font-bold mt-8">
          Create Campaign
        </button>
      </div>
      <img src={image9} alt="" className="w-full sm:w-auto mt-8 sm:mt-0" />
    </div>
  );
};
