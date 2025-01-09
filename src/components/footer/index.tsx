import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import { ScreenSummaryModel } from "../../components/popup/ScreenSummaryModel";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { Loading } from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getPlanningPageFooterData } from "../../actions/screenAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";

export const Footer = ({
  handleSave,
  handleBack,
  isDisabled = false,
  campaignId,
}: any) => {
  const dispatch = useDispatch<any>();

  const planningPageFooterDataGet = useSelector(
    (state: any) => state.planningPageFooterDataGet
  );
  const { loading, error, data: totalScreensData } = planningPageFooterDataGet;

  return (
    <div className="py-4 z-10 flex justify-between">
      <div className="flex w-full justify-start items-center gap-4">
        {totalScreensData && (
          <div className="flex">
            <ScreenSummaryModel loadingCost={loading} totalScreensData={totalScreensData}/>
          </div>
        )}

        {loading ? (
          <div className="animate-pulse flex w-full justify-start">
            <div className="w-full">
              <p className="text-[14px] font-semibold">
                Please wait while we calculate the cost of your desired plan...
              </p>
            </div>
            <div className="w-fulll">
              <SkeletonLoader />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Screens</h1>
              <h1 className="text-[14px] font-semibold">
                {totalScreensData?.totalScreens}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Touchpoints</h1>
              <h1 className="text-[14px] font-semibold">
                {totalScreensData?.totalTouchPoints}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Impressions</h1>
              <h1 className="text-[14px] font-semibold">
                {formatNumber(totalScreensData?.totalImpression || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Budget</h1>
              <h1 className="text-[14px] font-semibold">
                {" "}
                &#8377;
                {formatNumber(totalScreensData?.totalCampaignBudget || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">CPM</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;{totalScreensData?.totalCpm?.toFixed(2) || 0}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Price Per Slot</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;{totalScreensData?.pricePerSlot?.toFixed(0) || 0}
              </h1>
            </div>
          </div>
        )}
      </div>
      {!loading && !error && (
        <div className="flex w-full justify-end items-center gap-4">
          <button
            type="submit"
            className="border border-1 py-2 px-4 text-[14px] rounded-md hover:bg-[#00A0FA] hover:text-white"
            title="Go back"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="border border-1 py-2 px-4 text-[14px] rounded-md bg-[#00A0FA] text-white hover:bg-[#D7D7D7] hover:text-black truncate"
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
