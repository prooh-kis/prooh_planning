import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { advertisersSteps, dataHeroSteps, mediaOwnersSteps, advertisersStepsDetails, tabData, mediaOwnersStepsDetails, dataHeroStepsDetails } from "../../data/LandingPageData";
import React, { useRef, useState } from "react";
import { PlanYourCampaign } from "./PlanYourCampaign";

export const HowItsWork = () => {
  const secondDivRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentAdvertiserTab, setCurrentAdvertiserTab] = useState<any>("1");
  const [currentMediaOwnerTab, setCurrentMediaOwnerTab] = useState<any>("1");
  const [currentDataHeroTab, setCurrentDataHeroTab] = useState<any>("1");

  const CampaignStep = ({ step, image, title, description }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 w-full">
      <div className="md:col-span-5 flex items-center">
        <div className="rounded-[12px] lg:w-[576px] lg:h-[419px]">
          <img src={image} alt={title} className="shadow-lg" />
        </div>
      </div>
      <div className="md:col-span-5  p-1 md:p-4 flex flex-col gap-4">
        <p className="lg:text-[14px] text-[12px] font-bold text-[#B5B5B5]">
          {step}
        </p>
        <h1 className="lg:text-[24px] text-[18px] text-[#254354] font-semibold leading-[29.52px] text-wrap tracking-[-0.04em]">
          {title}
        </h1>
        <p className="lg:text-[20px] text-[16px] text-[#6D8596] leading-[30px] tracking-[-0.02em]">
          {description}
        </p>
      </div>
    </div>
  );

  const CampaignSteps = ({
    currentSubTab,

  }: {
    currentSubTab: string;
  }) => {
    const step = 
      tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label === "Advertiser" ? advertisersStepsDetails.find((s) => s.id === currentSubTab) || advertisersStepsDetails[0] :
      tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label === "Media Owner" ? mediaOwnersStepsDetails.find((s) => s.id === currentSubTab) || mediaOwnersStepsDetails[0] : 
      tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label === "Data Hero" ? dataHeroStepsDetails.find((s) => s.id === currentSubTab) || dataHeroStepsDetails[0] : 
      [] 
    ;
    return <CampaignStep {...step} />;
  };

  return (
    <div ref={secondDivRef} className="px-4 lg:px-16  mt-16">
      <h1 className="text-[16px] leading-[24px] tracking-[0.21em] font-normal tracking-[0.21em] text-left">
        {`HOW DOES IT WORK`}
      </h1>
      <div className="border-b my-4 inline-flex items-center gap-2 w-fit">
        <TabWithoutIcon
          tabData={tabData}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      <div className="py-4">
        {currentTab === "1" ? (
          <div className="pb-4">
            <h1 className="text-[20px] lg:text-[32px] leading-[36.48px] font-semibold tracking-[-0.04em] text-left">
              Plan Your Campaign In Just Few Clicks
            </h1>
            <div className="py-4 flex items-center gap-4">
              {advertisersSteps?.map((step: any, i: any) => (
                <button
                  key={i}
                  className={`${
                    step.id === currentAdvertiserTab
                      ? "bg-primaryButton"
                      : "bg-gray-100 border border-gray-200"
                  } rounded-[8px] px-4 py-2 truncate cursor-pointer`}
                  onClick={() => setCurrentAdvertiserTab(step.id)}
                >
                  <h1
                    className={`lg:text-[14px] text-[12px] ${
                      step.id === currentAdvertiserTab
                        ? "text-white font-semibold"
                        : "text-gray-600"
                    } truncate`}
                  >
                    {step.label}
                  </h1>
                </button>
              ))}
            </div>
            <div className="border-t w-4/5 mt-2" />
            <CampaignSteps currentSubTab={currentAdvertiserTab} />
          </div>
        ) : currentTab === "2" ? (
          <div className="pb-4">
            <h1 className="text-[24px] lg:text-[32px] leading-[24px] font-semibold tracking-[0.01em] text-left">
              {"Sell OOH Media like they're Web Ads"}
            </h1>
            <div className="py-4 flex items-center gap-4">
              {mediaOwnersSteps?.map((step: any, i: any) => (
                <button
                  key={i}
                  className={`${
                    step.id === currentMediaOwnerTab
                      ? "bg-primaryButton"
                      : "bg-gray-100 border border-gray-200"
                  } rounded-[8px] px-4 py-2 truncate cursor-pointer`}
                  onClick={() => setCurrentMediaOwnerTab(step.id)}
                >
                  <h1
                    className={`lg:text-[14px] text-[12px] ${
                      step.id === currentMediaOwnerTab
                        ? "text-white font-semibold"
                        : "text-gray-600"
                    } truncate`}
                  >
                    {step.label}
                  </h1>
                </button>
              ))}
            </div>
            <div className="border-t w-4/5 mt-2" />
            <CampaignSteps currentSubTab={currentMediaOwnerTab} />
          </div>
        ) : (
          <div className="pb-4">
            <h1 className="text-[24px] lg:text-[32px] leading-[24px] font-semibold tracking-[0.01em] text-left">
              Edit 50 Fields in 30 Minutes and Earn INR 5,000 Instantly
            </h1>
            <div className="py-4 flex items-center gap-4">
              {dataHeroSteps?.map((step: any, i: any) => (
                <button
                  key={i}
                  className={`${
                    step.id === currentDataHeroTab
                      ? "bg-primaryButton"
                      : "bg-gray-100 border border-gray-200"
                  } rounded-[8px] px-4 py-2 truncate cursor-pointer`}
                  onClick={() => setCurrentDataHeroTab(step.id)}
                >
                  <h1
                    className={`lg:text-[14px] text-[12px] ${
                      step.id === currentDataHeroTab
                        ? "text-white font-semibold"
                        : "text-gray-600"
                    } truncate`}
                  >
                    {step.label}
                  </h1>
                </button>
              ))}
            </div>
            <div className="border-t w-4/5 mt-2" />
            <CampaignSteps currentSubTab={currentDataHeroTab} />
          </div>
        )}
      </div>
      <PlanYourCampaign currentTabData={tabData?.filter((tab: any) => tab.id === currentTab)[0]} />

    </div>
  );
};
