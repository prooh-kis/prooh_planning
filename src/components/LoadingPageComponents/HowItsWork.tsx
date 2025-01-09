import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { advertisersSteps, steps, tabData } from "../../data/LandingPageData";
import React, { useRef, useState } from "react";

export const HowItsWork = () => {
  const secondDivRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentAdvertiserTab, setCurrentAdvertiserTab] = useState<any>("1");

  const CampaignStep = ({ step, image, title, description }: any) => (
    <div className="grid grid-cols-12 gap-4 py-4 w-full">
      <div className="col-span-7 flex items-center justify-center">
        <div className="rounded-[12px] shadow-lg m-1">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="col-span-4 p-4 flex flex-col gap-4">
        <p className="lg:text-[14px] text-[12px] font-bold text-[#B5B5B5]">
          {step}
        </p>
        <h1 className="lg:text-[24px] text-[18px] text-[#254354] font-semibold text-wrap tracking-[0.04em]">
          {title}
        </h1>
        <p className="lg:text-[20px] text-[16px] text-[#6D8596] tracking-[0.02em]">
          {description}
        </p>
      </div>
    </div>
  );

  const CampaignSteps = ({
    currentAdvertiserTab,
  }: {
    currentAdvertiserTab: string;
  }) => {
    const step = steps.find((s) => s.id === currentAdvertiserTab) || steps[0];
    return <CampaignStep {...step} />;
  };

  return (
    <div ref={secondDivRef} className="px-16 mt-16">
      <h1 className="px-8  text-[16px] leading-[24px] font-normal tracking-[0.21em] text-left ">
        {`HOW IT'S WORK`}
      </h1>
      <div className="border-b my-4 ml-8 inline-flex items-center gap-2 w-fit">
        <TabWithoutIcon
          tabData={tabData}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      <div className="px-8 py-4">
        {currentTab === "1" ? (
          <div className="pb-4">
            <h1 className="text-[32px] leading-[24px] font-semibold tracking-[0.01em] text-left">
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
            <CampaignSteps currentAdvertiserTab={currentAdvertiserTab} />
          </div>
        ) : currentTab === "2" ? (
          <div className="pb-4"></div>
        ) : (
          <div className="pb-4"></div>
        )}
      </div>
    </div>
  );
};
