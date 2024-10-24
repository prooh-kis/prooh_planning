import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import { ScreenSummaryModel } from "../../components/popup/ScreenSummaryModel";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { Loading } from "../../components/Loading";

export const Footer = ({
  loading, error,
  handleSave,
  handleBack,
  totalScreensData,
  isDisabled = false,
}: any) => {
  const avgPricePerSlot = (data: any) => {
    const screenWiseSlotDetails = data.screenWiseSlotDetails;

    // Calculate total price per slot and count of screens
    let totalPricePerSlot = 0;
    let totalScreens = screenWiseSlotDetails.length;

    screenWiseSlotDetails.forEach((screen: any) => {
        totalPricePerSlot += screen.pricePerSlot;
    });

    // Calculate average price per slot
    const averagePricePerSlot = totalPricePerSlot / totalScreens;
    return averagePricePerSlot || 0;
  }
  return (
    <div className="py-4 z-10 flex justify-between">
 
      <div className="flex w-full justify-start items-center gap-4">
        <div className="flex">
          <ScreenSummaryModel totalScreensData={totalScreensData} />
        </div>
        {loading || Object.keys(totalScreensData).length < 1 ? (
          <div className="flex w-full justify-start">
            <div className="w-full">
              <p className="text-[14px] font-semibold">Please wait while we calculate the cost of your desired plan...</p>
            </div>
            <div className="">
              <Loading height={20} width={100} />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">Total screens</h1>
              <h1 className="text-[14px] font-semibold">
                {totalScreensData?.totalScreens}
                
              </h1>
            </div>
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">Total impression</h1>
              <h1 className="text-[14px] font-semibold">
                {formatNumber(totalScreensData?.totalImpression || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">Total Budget</h1>
              <h1 className="text-[14px] font-semibold">
                {" "}
                &#8377;{formatNumber(totalScreensData?.totalCampaignBudget || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">CPM</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;{totalScreensData?.totalCpm?.toFixed(2) || 0}
              </h1>
            </div>
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">Price Per Slot</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;{avgPricePerSlot(totalScreensData)?.toFixed(2) || 0}
              </h1>
            </div>
          </div>
        )}

      </div>
      {!loading && !error && (
        <div className="flex w-full justify-end items-center gap-4">
          <button
            type="submit"
            className="border border-1 py-2 px-4 text-[14px] rounded-md hover:bg-blue-500 hover:text-white"
            title="Go back"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="border border-1 py-2 px-4 text-[14px] rounded-md bg-blue-500 text-white hover:bg-blue-600"
            title="Save and go next"
            onClick={handleSave}
            disabled={isDisabled}
          >
            Save and Continue
          </button>
        </div>
      )}

    </div>
  );
};
