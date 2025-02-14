import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import {
  advertisersSteps,
  dataHeroSteps,
  mediaOwnersSteps,
  advertisersStepsDetails,
  tabData,
  mediaOwnersStepsDetails,
  dataHeroStepsDetails,
} from "../../data/LandingPageData";
import React, { useRef, useState } from "react";
import { StepperSliderHomePage } from "../../components/molecules/StepperSliderHomePage";
import { marketImage, mediaImage, dataHeroImg } from "../../assets";

export const HowItsWork = () => {
  const secondDivRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentAdvertiserTab, setCurrentAdvertiserTab] = useState<any>("1");
  const [currentMediaOwnerTab, setCurrentMediaOwnerTab] = useState<any>("1");
  const [currentDataHeroTab, setCurrentDataHeroTab] = useState<any>("1");

  const CampaignStep = ({ step, image, title, description }: any) => {
    console.log(step);
    return (
      <div className="relative">
        {currentTab === "1" && Number(currentAdvertiserTab) > 1 || currentTab === "2" && Number(currentMediaOwnerTab) > 1 || currentTab === "3" && Number(currentDataHeroTab) > 1 ? (
          <button
            title="left"
            type="button"
            onClick={() => {
              if (currentTab === "1") {
                setCurrentAdvertiserTab(String(Number(currentAdvertiserTab) - 1))
              }

              if (currentTab === "2") {
                setCurrentMediaOwnerTab(String(Number(currentMediaOwnerTab) - 1))
              }

              if (currentTab === "3") {
                setCurrentDataHeroTab(String(Number(currentDataHeroTab) - 1))
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50"
          >
            <i className="fi fi-br-angle-left"></i>
          </button>
        ): null}

        {step === "Step 1" ? (
          <div className={`${currentTab === "1" ? "bg-[#129BFF]" : currentTab === "2" ? "bg-[#3A6ED0]" : currentTab === "3" ? "bg-[#3A6754]" : ""} h-[270px] sm:h-[400px] lg:h-[460px] w-full px-20 py-10 rounded-[19px]`}>
            {currentTab === "1" ? (
              <div className="flex justify-between">
                <div className="flex flex-col w-[500px]">
                  <h1 className="text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] mt-4 font-medium  leading-[24px] tracking-[0.21em]">
                    <span>
                      <i className="fi fi-sr-sparkles text-[#FFFFFF] text-[20px]"></i>
                    </span>{" "}
                    offer for advertiser
                  </h1>
                  <h1 className="text-[#FFFFFF] text-sm sm:text-[32px] lg:text-[48px] mt-4 font-semibold  leading-[51.84px] tracking-[-0.02em]">
                    Plan Your Campaign In Just A Few Clicks
                  </h1>{" "}
                  <h1 className="text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] my-8 font-normal  leading-[24px] tracking-[-0.02em]">
                    Our platform helps your business in managing expenses. These are
                    some of the reasons why you should use our platform in
                  </h1>
                  <button
                    id=""
                    title=""
                    type="button"

                    className="bg-[#FFFFFF] text-[#129BFF] rounded-[87px] text-[14px] sm:text-[16px] font-bold hover:bg-black hover:text-[#FFFFFF] hover:text-[18px] w-[163px] h-[50px]">
                    Get Started
                  </button>
                </div>
                <div className="w-[421px] h-[400px]">
                  <img src={marketImage} alt="dff" className="h-full w-full" />
                </div>
              </div>
            ) : currentTab === "2" ? (
              <div className="flex justify-between">
                <div className="flex flex-col w-[500px]">
                  <h1 className="text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] mt-4 font-medium  leading-[24px] tracking-[0.21em]">
                    <span>
                      <i className="fi fi-sr-sparkles text-[#FFFFFF] text-[20px]"></i>
                    </span>{" "}
                    Offer for <span className="font-bold">media owner</span>
                  </h1>
                  <h1 className="text-[#FFFFFF] text-sm sm:text-base lg:text-[48px] mt-4 font-semibold  leading-[51.84px] tracking-[-0.02em]">
                    Monetize Your unsold DOOH Inventory Today!
                  </h1>{" "}
                  <h1 className="truncate text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] my-8 font-normal  leading-[24px] tracking-[-0.02em]">
                    Unlock new revenue streams by listing your DOOH inventory with us.
                    Seamless onboarding, real-time insights, and maximized earnings!
                  </h1>
                  <button
                    
                    className="bg-[#FFFFFF] text-[#129BFF] rounded-[87px] text-[14px] sm:text-[16px] font-bold hover:bg-black hover:text-[#FFFFFF] hover:text-[18px] w-[163px] h-[50px]">
                    Get Started
                  </button>
                </div>
                <div className="w-[410px] h-[450px]">
                  <img src={mediaImage} alt="dff" className="h-full w-full" />
                </div>
              </div>
            ) : currentTab === "3" ? (
              <div>
                <img src={dataHeroImg} alt="dataheroimg" />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-16 w-full h-[270px] sm:h-[400px] lg:h-[460px]">
            <div className="md:col-span-5 flex items-center">
              <div className="rounded-[12px] lg:w-[576px] lg:h-[419px]">
                <img src={image} alt={title} className="shadow-lg rounded-[12px]" />
              </div>
            </div>
            <div className="md:col-span-5  p-1 md:p-4 flex flex-col gap-4">
              <p className="lg:text-[14px] text-[12px] font-bold text-[#B5B5B5]">
                {step}
              </p>
              <h1 className="lg:text-[24px] text-[18px] text-[#254354] font-semibold leading-[29.52px] text-wrap tracking-[-0.04em]">
                {title}
              </h1>
              <p className="lg:text-[20px] text-[14px] text-[#6D8596] leading-[30px] tracking-[-0.02em]">
                {description}
              </p>
            </div>
          </div>
        )}
        {currentTab === "1" && Number(currentAdvertiserTab) < 7 || currentTab === "2" && Number(currentMediaOwnerTab) < 5 || currentTab === "3" && Number(currentDataHeroTab) < 4 ? (
          <button
            title="right"
            type="button"
            onClick={() => {
              if (currentTab === "1") {
                setCurrentAdvertiserTab(String(Number(currentAdvertiserTab) + 1))
              }

              if (currentTab === "2") {
                setCurrentMediaOwnerTab(String(Number(currentMediaOwnerTab) + 1))
              }

              if (currentTab === "3") {
                setCurrentDataHeroTab(String(Number(currentDataHeroTab) + 1))
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50"
          >
            <i className="fi fi-br-angle-right"></i>
          </button>
        ): null}

      </div>

  )};

  const CampaignSteps = ({ currentSubTab }: { currentSubTab: string }) => {
    const step =
      tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label ===
      "Are You An Advertiser?"
        ? advertisersStepsDetails.find((s) => s.id === currentSubTab) ||
          advertisersStepsDetails[0]
        : tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label ===
          "Are You A Media Owner?"
        ? mediaOwnersStepsDetails.find((s) => s.id === currentSubTab) ||
          mediaOwnersStepsDetails[0]
        : tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label ===
          "Become A Data Hero"
        ? dataHeroStepsDetails.find((s) => s.id === currentSubTab) ||
          dataHeroStepsDetails[0]
        : [];

    return <CampaignStep {...step} />;
  };

  return (
    <div ref={secondDivRef} className="px-6 lg:px-16 mt-16">
      <div className="flex flex-cols items-center justify-center">
        <code className="text-[16px] leading-[24px] tracking-[0.21em] font-normal tracking-[0.21em] text-center">
          {`ENGAGE WITH US`}
        </code>
      </div>
      <h1 className="text-center font-custom text-[48px]">
        Where Collaboration Meets Innovation
      </h1>
      <div className="my-4 flex justify-center items-center gap-4 w-full">
        {tabData?.map((tab: any, i: any) => (
          <button
            title=""
            type="button"
            key={i}
            onClick={() => {
              setCurrentTab(tab.id);
              setCurrentAdvertiserTab("1");
              setCurrentMediaOwnerTab("1");
              setCurrentDataHeroTab("1");

            }}
            className={`${tab.id === currentTab ? "bg-primaryButton" : "bg-[#F6F6F6]"} rounded-[8px] py-1 px-2`}
          >
            <h1 className={`text-[12px] ${tab.id === currentTab ? "text-white font-semibold" : ""}`}>
              {tab.label}
            </h1>
          </button>
        ))}
      </div>
      <div className="py-4">
        {currentTab === "1" ? (
          <div className="pb-4">
            <div className="py-4 flex items-center gap-4">
              <StepperSliderHomePage
                campaignId={"advertisersSteps"}
                step={Number(currentAdvertiserTab)}
                setStep={setCurrentAdvertiserTab}
                steps={advertisersSteps?.length}
              />
            </div>
            <CampaignSteps currentSubTab={currentAdvertiserTab} />
          </div>
        ) : currentTab === "2" ? (
          <div className="pb-4">
            <div className="py-4 flex items-center gap-4">
              <StepperSliderHomePage
                campaignId={"mediaOwnersSteps"}
                step={Number(currentMediaOwnerTab)}
                setStep={setCurrentMediaOwnerTab}
                steps={mediaOwnersSteps?.length}
              />
            </div>
            <CampaignSteps currentSubTab={currentMediaOwnerTab} />
          </div>
        ) : (
          <div className="pb-4">
            <div className="py-4 flex items-center gap-4">
              <StepperSliderHomePage
                campaignId={"dataHeroSteps"}
                step={Number(currentDataHeroTab)}
                setStep={setCurrentDataHeroTab}
                steps={dataHeroSteps?.length}
              />
            </div>
            <CampaignSteps currentSubTab={currentDataHeroTab} />
          </div>
        )}
      </div>
    </div>
  );
};
