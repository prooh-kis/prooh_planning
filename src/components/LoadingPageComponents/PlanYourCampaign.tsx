import React from "react";

export const PlanYourCampaign = () => {
  return (
    <div className="px-4 w-full">
      <div className="relative ">
        <div className="relative z-10 mx-28 text-white bg-primaryButton rounded-[16px] px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <i className="fi fi-sr-time-fast text-[28px]"></i>
            <div>
              <h1 className="lg:text-[40px] text-[32px] font-bold tracking-[0.02em]">
                Plan Your Campaign Now
              </h1>
              <div className="pb-2">
                <p className="lg:text-[14px] text-[12px]">
                  <span className="font-bold">+40</span> Advertisers Have
                  Already Planned
                </p>
              </div>
            </div>
          </div>
          <div className="px-4">
            <button className="text-[#183246] text-[20px] font-bold h-[60pz] w-[181px] bg-white rounded-[72px] px-[3px] py-[20px] hover:bg-white hover:text-[#183246]">
              Request Demo
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 w-full bg-gradient-to-b from-[#13202A] to-[#072E4A] rounded-[26px]">
          <div className="grid grid-cols-12 text-white gap-2 mt-16">
            <div className="col-span-6 p-32">
              <div className="flex items-center gap-2">
                <i className="fi fi-ss-sparkles"></i>
                <h1 className="lg:text-[20px] text-[16px] tracking-[0.21em]">
                  WHAT WE DO
                </h1>
              </div>
              <h1 className="lg:text-[48px] text-[40px]  font-bold mt-8 hover:bg-white hover:text-[#129BFF} w-[320px] leading-[48.96px] tracking-[-0.05em] h-[147px]">
                Simplify & Optimize Your Advertising
              </h1>
              <p className="lg:text-[20px] text-[16px] text-[#88A8BF] text-wrap mt-8 hover:bg-white hover:text-[#129BFF} leading-[30px] tracking-[-0.02em]">
                Our platform helps your business in managing expenses. These are
                some of the reasons why you should use our platform in
              </p>
              <button className="text-[#FFFFFF] text-[20px] font-bold h-[50pz] w-[153px] bg-[#129BFF] rounded-[12px] px-[31px] py-[7px] mt-8 hover:bg-white hover:text-[#129BFF]">
                Plan Now
              </button>
            </div>
            <div className="col-span-1 flex justify-center items-center p-10">
              <div className="rounded-full bg-[#1E3241] w-4 h-2/4 flex items-center">
                <div className="rounded-full bg-primaryButton w-full h-1/5"></div>
              </div>
            </div>
            <div className="col-span-4 px-6 py-32 flex justify-start items-center w-full">
              <div className="">
                <div className="flex justify-start">
                  <div className="bg-[#1E3E53] rounded-[20px] p-5 h-[86px] w-[86px] flex justify-center items-center">
                    <i className="fi fi-sr-display-chart-up text-[37px]"></i>
                  </div>
                </div>

                <h1 className="lg:text-[32px] text-[24px] text-[#FFFFFF]  font-[800] text-wrap mt-8 leading-[40.96px] tracking-[-0.04em] w-[541px] h-[82px]">
                  We Sell OOH & PDOOH On Impressions Only. No Fixed Rental
                </h1>
                <p className="lg:text-[20px] text-[14px] text-[#FFFFFF]  font-normal text-wrap mt-8 leading-[30px] tracking-[-0.02em]">
                  {`PROOH'S Media Planning Tool Uses Geospatial Data, POI Data, Govt. Traffic Data amongst other data to determine total audience impressions delivered at any specific locations.`}
                  {/* <span className="text-primaryButton font-semibold underline">See More</span> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
