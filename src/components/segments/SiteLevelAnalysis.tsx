import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import React, { useState } from "react";

const SiteLevelAnalysis = ({ screenData }: any) => {
  const [currentTab, setCurrentTab] = useState<string>("1");
  const tabData = [
    { id: "1", label: "Campaign Duration" },
    { id: "2", label: "Audience Impression" },
    { id: "3", label: "Hardware Performance" },
    { id: "4", label: "Slot delivery" },
    { id: "5", label: "Cost consumption" },
  ];
  return (
    <div className="w-full h-full">
      <h1 className="text-[20px] font-semibold font-inter text-[#0E212E] pb-2">
        {screenData?.screenName}
      </h1>
      <TabWithoutIcon
        tabData={tabData}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        text="text-[14px]"
      />
      <div className="mt-2">{currentTab === "1" ? "" : ""}</div>
    </div>
  );
};

export default SiteLevelAnalysis;
