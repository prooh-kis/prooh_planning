import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import { ScreenSummaryModel } from "../../components/popup/ScreenSummaryModel";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";

export const Footer = ({
  loading, error,
  handleSave,
  handleBack,
  totalScreensData,
  isDisabled = false,
}: any) => {
  // console.log(totalScreensData)
  return (
    <div className="py-4 z-10 flex justify-between">
 
      <div className="flex justify-between items-center gap-4">
        <ScreenSummaryModel totalScreensData={totalScreensData} />
        {loading || Object.keys(totalScreensData).length < 1 ? (
          <h1>Loading...</h1>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">Total screens</h1>
              <h1 className="text-[14px] font-semibold">
                {totalScreensData?.screensSelectedCount}/
                {totalScreensData?.screensTotalCount}
              </h1>
            </div>
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">Total impression</h1>
              <h1 className="text-[14px] font-semibold">
                {formatNumber(totalScreensData?.impressionSelectedCount || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">Total Budget</h1>
              <h1 className="text-[14px] font-semibold">
                {" "}
                &#8377;{formatNumber(totalScreensData?.budgetSelected || 0)}
              </h1>
            </div>
            <div className="flex gap-2 truncate">
              <h1 className="text-[14px] truncate">CPM</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;{totalScreensData?.cpmSelected?.toFixed(2) || 0}
              </h1>
            </div>
          </div>
        )}

      </div>
      {!loading && !error && (
        <div className="flex justify-between items-center gap-4">
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
