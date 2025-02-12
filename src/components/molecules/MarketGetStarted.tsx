import { marketImage } from "../../assets";

export const MarketGetStarted = () => {
  return (
    <div className="bg-[#129BFF] h-[270px] sm:h-[400px] lg:h-[460px] w-full px-20 py-10 mt-10 rounded-[19px]">
      <div className="flex justify-between">
        <div className="flex flex-col w-[500px]">
          <h1 className="text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] mt-8 font-medium  leading-[24px] tracking-[0.21em]">
            <span>
              <i className="fi fi-sr-sparkles text-[#FFFFFF] text-[20px]"></i>
            </span>{" "}
            offer for advertiser
          </h1>
          <h1 className="text-[#FFFFFF] text-sm sm:text-base lg:text-[48px] mt-8 font-semibold  leading-[51.84px] tracking-[-0.02em]">
            Plan Your Campaign In Just A Few Clicks
          </h1>{" "}
          <h1 className="text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] my-8 font-normal  leading-[24px] tracking-[-0.02em]">
            Our platform helps your business in managing expenses. These are
            some of the reasons why you should use our platform in
          </h1>
          <button className="bg-[#FFFFFF] text-[#129BFF] rounded-[87px] text-[14px] sm:text-[16px] font-bold hover:bg-black hover:text-[#FFFFFF] hover:text-[18px] w-[163px] h-[50px]">
            Get Started
          </button>
        </div>
        <div className="w-[421px] h-[400px]">
          <img src={marketImage} alt="dff" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};
