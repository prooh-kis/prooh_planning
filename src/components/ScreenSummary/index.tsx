import { TabWithoutIcon } from "../TabWithoutIcon";
import { TabWithIcon } from "../TabWithIcon";
import React, { useState } from "react";
import {
  screenSummaryData,
  screenSummaryTabData,
} from "../../utils/hardCoddedData";
import { ScreenSummaryTable } from "../ScreenSummaryTable";
import { ViewPlanPic } from "../ViewPlanPic";
import { PlainSummary } from "../PlainSummary";

interface TabInterface {
  icon: any;
  label: string;
  id: string;
}

const tabData = [
  {
    label: "Delhi",
    id: "1",
  },
  {
    label: "Guru gram",
    id: "2",
  },
  {
    label: "Noida",
    id: "3",
  },
];

export function ScreenSummary() {
  const [currentTab, setCurrentTab] = useState<string>("1");

  return (
    <div className="">
      <h1 className="text-3xl ">
        screens summary as per “cohort plan” selected{" "}
      </h1>
      <h1 className="text-sm text-gray-500 ">
        you can further optimized your plan by deselecting locations in the
        screen summary
      </h1>
      <div className="mt-4">
        <TabWithIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={screenSummaryTabData}
        />
      </div>

      <div className="mt-4">
        {currentTab == "1" ? (
          <ScreenSummaryTable
            data={screenSummaryData}
            allScreen={[]}
            handleSetFilteredScreens={() => {}}
            handleMultipleFilteredScreen={() => {}}
            isScreenSelected={() => {
              return true;
            }}
          />
        ) : currentTab == "2" ? (
          <ViewPlanPic />
        ) : (
          <PlainSummary />
        )}
      </div>
    </div>
  );
}
