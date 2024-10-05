import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { TabWithIcon } from "../molecules/TabWithIcon";
import React, { useEffect, useState } from "react";
import {
  // screenSummaryData,
  screenSummaryTabData,
} from "../../utils/hardCoddedData";
import { ScreenSummaryTable } from "../tables/ScreenSummaryTable";
import { ViewPlanPic } from "../segments/ViewPlanPic";
import { PlainSummary } from "../segments/PlainSummary";
import { useDispatch, useSelector } from "react-redux";
import { getScreenSummaryData } from "../../actions/screenAction";

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
}

export const ScreenSummaryDetails = ({
  setCurrentStep,
  step,
}: EnterCampaignBasicDetailsProps) => {
  const [currentTab, setCurrentTab] = useState<string>("1");
  const dispatch = useDispatch<any>();

  const screenSummaryDataGet = useSelector((state: any) => state.screenSummaryDataGet);
  const {
    loading: loadingScreenSummary,
    error: errorScreenSummary,
    data: screenSummaryData,
  } = screenSummaryDataGet;

  useEffect(() => {
    dispatch(getScreenSummaryData({
      screenIds: [
        "66f7bb44d2829e146ff82aeb"
      ],
      cohorts: [
        "Working Professionals-A"
      ],
      touchPointData: [
        {
          "touchPoint": "Premium High Street",
          "dayWiseData": {
              "weekdays": {
                  "morning": {
                      "percentage": 40,
                      "included": true
                  },
                  "afternoon": {
                      "percentage": 15.000000000000002,
                      "included": false
                  },
                  "evening": {
                      "percentage": 25,
                      "included": false
                  },
                  "night": {
                      "percentage": 20,
                      "included": false
                  }
              },
              "saturdays": {
                  "morning": {
                      "percentage": 20,
                      "included": false
                  },
                  "afternoon": {
                      "percentage": 15.000000000000002,
                      "included": false
                  },
                  "evening": {
                      "percentage": 25,
                      "included": false
                  },
                  "night": {
                      "percentage": 40,
                      "included": true
                  }
              },
              "sundays": {
                  "morning": {
                      "percentage": 20,
                      "included": false
                  },
                  "afternoon": {
                      "percentage": 15.000000000000002,
                      "included": false
                  },
                  "evening": {
                      "percentage": 35,
                      "included": true
                  },
                  "night": {
                      "percentage": 30,
                      "included": true
                  }
              }
          }
      }
      ],
      gender: "both"
    }))
  },[]);
  return (
    <div className="w-full py-3">
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
};
