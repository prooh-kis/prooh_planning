import {
  getAllLocalStorageData,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { ScreenSummaryModel } from "../../components/popup/ScreenSummaryModel";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { Loading } from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getPlanningPageFooterData } from "../../actions/screenAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import {
  FOOTER_DATA,
  FULL_CAMPAIGN_PLAN,
  SELECTED_AUDIENCE_TOUCHPOINTS,
  TOTAL_SCREEN_COST_DATA,
} from "../../constants/localStorageConstants";

export const Footer = ({
  handleSave,
  handleBack,
  isDisabled = false,
  campaignId,
  loadingCost,
  screensCost,
  pageName,
  successAddCampaignDetails,
}: any) => {
  const dispatch = useDispatch<any>();

  // console.log(pageName)
  const [footerData, setFooterData] = useState(() => {
    const localStorageData = getDataFromLocalStorage(FOOTER_DATA)?.finalSummaryStepWise || [];
    const filteredData = localStorageData.filter((data: any) => data.step === pageName);
  
    if (filteredData.length > 0) {
      return filteredData[filteredData?.length - 1];
    }
  
    if (localStorageData.length > 0) {
      return localStorageData[localStorageData?.length - 1];
    }
  
    // Default fallback object
    return {
      totalScreens: 0,
      totalTouchPoints: 0,
      totalImpression: 0,
      totalCampaignBudget: 0,
      totalCpm: 0,
      pricePerSlot: 0,
      totalCities: 0,
    };
  });
  
  const planningPageFooterDataGet = useSelector(
    (state: any) => state.planningPageFooterDataGet
  );
  const { loading, error, data: totalScreensData } = planningPageFooterDataGet;

  // console.log("totalScreensData : ", getDataFromLocalStorage(FOOTER_DATA)?.finalSummaryStepWise?.filter(
  //   (data: any) => data.step === pageName
  // ));

  useEffect(() => {
    if (successAddCampaignDetails) {
      dispatch(getPlanningPageFooterData({
        id: campaignId,
        pageName: pageName,
      }));
    }
  },[dispatch, campaignId, pageName, successAddCampaignDetails]);
  // console.log(footerData);
  return (
    <div className="py-4 z-10 flex justify-between">
      <div className="flex w-full justify-start items-center gap-4">
        {totalScreensData && (
          <div className="flex">
            <ScreenSummaryModel
              pageName={pageName}
              loadingCost={loadingCost}
              totalScreensData={totalScreensData?.finalSummaryStepWise}
            />
          </div>
        )}

        {loading ? (
          <div className="animate-pulse flex w-full justify-start">
            <div className="w-full">
              <p className="text-[14px] font-semibold">
                Please wait while we calculate the cost of your desired plan...
              </p>
            </div>
            <div className="w-full">
              <SkeletonLoader />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Cities</h1>
              <h1 className="text-[14px] font-semibold">
                {footerData?.totalCities}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Screens</h1>
              <h1 className="text-[14px] font-semibold">
                {footerData?.totalScreens}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Touchpoints</h1>
              <h1 className="text-[14px] font-semibold">
                {footerData?.totalTouchPoints}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Impressions</h1>
              <h1 className="text-[14px] font-semibold">
                {formatNumber(footerData?.totalImpression || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Budget</h1>
              <h1 className="text-[14px] font-semibold">
                {" "}
                &#8377;
                {formatNumber(footerData?.totalCampaignBudget || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">CPM</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;{footerData?.totalCpm?.toFixed(2) || 0}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Price Per Slot</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;{footerData?.pricePerSlot?.toFixed(0) || 0}
              </h1>
            </div>
          </div>
        )}
      </div>
      {!loading && !error && (
        <div className="flex w-full justify-end items-center gap-4">
          <button
            type="submit"
            className="border border-1 bg-[#D7D7D7] py-2 px-4 text-[14px] rounded-md hover:bg-[#00A0FA] hover:text-[#FFFFFF]"
            title="Go back"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="border border-1 py-2 px-4 text-[14px] rounded-md bg-[#00A0FA] text-[#FFFFFF] hover:bg-[#D7D7D7] hover:text-black truncate"
            title="Save and go next"
            onClick={handleSave}
            disabled={isDisabled}
          >
            {loading ? "Saving data...." : "Save and Continue"}
          </button>
        </div>
      )}
    </div>
  );
};
