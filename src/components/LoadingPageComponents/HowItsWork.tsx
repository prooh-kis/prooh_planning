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
import { MediaOwnerGetStarted } from "../../components/molecules/MediaOwnerGetStarted";
import { MarketGetStarted } from "../../components/molecules/MarketGetStarted";

export const HowItsWork = () => {
  const secondDivRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentAdvertiserTab, setCurrentAdvertiserTab] = useState<any>("0");
  const [currentMediaOwnerTab, setCurrentMediaOwnerTab] = useState<any>("0");
  const [currentDataHeroTab, setCurrentDataHeroTab] = useState<any>("0");

  const CampaignStep = ({ step, image, title, description }: any) => {
    return (
      <div className="relative">
        {(currentTab === "1" && Number(currentAdvertiserTab) > 1) ||
        (currentTab === "2" && Number(currentMediaOwnerTab) > 1) ||
        (currentTab === "3" && Number(currentDataHeroTab) > 1) ? (
          <button
            title="left"
            type="button"
            onClick={() => {
              if (currentTab === "1") {
                setCurrentAdvertiserTab(
                  String(Number(currentAdvertiserTab) - 1)
                );
              }

              if (currentTab === "2") {
                setCurrentMediaOwnerTab(
                  String(Number(currentMediaOwnerTab) - 1)
                );
              }

              if (currentTab === "3") {
                setCurrentDataHeroTab(String(Number(currentDataHeroTab) - 1));
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50"
          >
            <i className="fi fi-br-angle-left"></i>
          </button>
        ) : null}

        {!["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"]?.includes(step) ? (
          <div className="h-auto">
            {currentTab === "1" ? (
              <MarketGetStarted />
            ) : currentTab === "2" ? (
              <MediaOwnerGetStarted />
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
                <img
                  src={image}
                  alt={title}
                  className="shadow-lg rounded-[12px]"
                />
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
        {(currentTab === "1" && Number(currentAdvertiserTab) < 6) ||
        (currentTab === "2" && Number(currentMediaOwnerTab) < 4) ||
        (currentTab === "3" && Number(currentDataHeroTab) < 3) ? (
          <button
            title="right"
            type="button"
            onClick={() => {
              if (currentTab === "1") {
                setCurrentAdvertiserTab(
                  String(Number(currentAdvertiserTab) + 1)
                );
              }

              if (currentTab === "2") {
                setCurrentMediaOwnerTab(
                  String(Number(currentMediaOwnerTab) + 1)
                );
              }

              if (currentTab === "3") {
                setCurrentDataHeroTab(String(Number(currentDataHeroTab) + 1));
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50"
          >
            <i className="fi fi-br-angle-right"></i>
          </button>
        ) : null}
      </div>
    );
  };

  const CampaignSteps = ({ currentSubTab }: { currentSubTab: string }) => {
    const step =
      tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label ===
      "Are You An Advertiser?"
        ? advertisersStepsDetails.find((s) => s.id === currentSubTab) ||
          {}
        : tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label ===
          "Are You A Media Owner?"
        ? mediaOwnersStepsDetails.find((s) => s.id === currentSubTab) ||
          {}
        : tabData?.filter((tab: any) => tab.id === currentTab)[0]?.label ===
          "Become A Data Hero"
        ? dataHeroStepsDetails.find((s) => s.id === currentSubTab) ||
          {}
        : [];

    return <CampaignStep {...step} />;
  };

  return (
    <div ref={secondDivRef} className="px-6 lg:px-16 mt-16">
      <div className="flex items-center justify-center">
        <code className="font-custom text-[12px] leading-[18px] tracking-[0.24em] font-normal text-center text-[#667D8C]">
          {`ENGAGE WITH US`}
        </code>
      </div>

      <h1 className="text-[#1E376E] text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
        From Collective Thinking To <br/> Breakthrough <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">Solutions</span>
      </h1>

      {/* Tabs */}
      <div className="my-8 flex justify-center items-center">
        {tabData?.map((tab: any, i: any) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCurrentTab(tab.id);
              setCurrentAdvertiserTab("0");
              setCurrentMediaOwnerTab("0");
              setCurrentDataHeroTab("0");
            }}
            className={`${
              tab.id === currentTab
                ? "bg-primaryButton text-white font-semibold"
                : "bg-[#F6F6F6] text-gray-700"
            } w-full border border-[#D7D7D7] py-2 px-8 ${i == 0 ? "clip-trapezium-right" : i == tabData.length-1 ? "clip-trapezium-left" : "clip-trapezium-both"}`}
          >
            <span className="text-[12px]">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Stepper Section */}
      <div className="py-4">
        <div className="pt-4 flex items-center gap-4">
          <StepperSliderHomePage
            campaignId={
              currentTab === "1"
                ? "advertisersSteps"
                : currentTab === "2"
                ? "mediaOwnersSteps"
                : "dataHeroSteps"
            }
            step={
              currentTab === "1"
                ? Number(currentAdvertiserTab)
                : currentTab === "2"
                ? Number(currentMediaOwnerTab)
                : Number(currentDataHeroTab)
            }
            setStep={
              currentTab === "1"
                ? setCurrentAdvertiserTab
                : currentTab === "2"
                ? setCurrentMediaOwnerTab
                : setCurrentDataHeroTab
            }
            steps={
              currentTab === "1"
                ? advertisersSteps?.length
                : currentTab === "2"
                ? mediaOwnersSteps?.length
                : dataHeroSteps?.length
            }
          />
        </div>
        <CampaignSteps
          currentSubTab={
            currentTab === "1"
              ? currentAdvertiserTab
              : currentTab === "2"
              ? currentMediaOwnerTab
              : currentDataHeroTab
          }
        />
      </div>
    </div>
  );
};
