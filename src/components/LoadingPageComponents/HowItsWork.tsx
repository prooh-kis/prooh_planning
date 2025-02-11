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

export const HowItsWork = () => {
  const secondDivRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentAdvertiserTab, setCurrentAdvertiserTab] = useState<any>("1");
  const [currentMediaOwnerTab, setCurrentMediaOwnerTab] = useState<any>("1");
  const [currentDataHeroTab, setCurrentDataHeroTab] = useState<any>("1");

  const CampaignStep = ({ step, image, title, description }: any) => (
    <div>
      {step === "Step 1" ? (
        <div className=" gap-4 py-4 w-full bg-primaryButton grid grid-cols-12">
          <div className="col-span-7">
            <div className="flex items-center gap-2">

            </div>
          </div>
          <div className="col-span-5"></div>
        </div>
      ) : (
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
      )}
    </div>

  );

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
            onClick={() => setCurrentTab(tab.id)}
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
