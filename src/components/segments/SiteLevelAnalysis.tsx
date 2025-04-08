import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import React, { useState } from "react";

const SiteLevelAnalysis = () => {
  const [currentTab, setCurrentTab] = useState<string>("1");
  return (
    <div className="w-full h-[]">
      <TabWithoutIcon
        tabData={[
          { id: "1", label: "Audience Impression" },
          { id: "2", label: "Slot delivery" },
          { id: "3", label: "Cost consumption" },
        ]}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
};

export default SiteLevelAnalysis;
