import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import { ScreenSummaryModel } from "../../components/popup/ScreenSummaryModel";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";

export const Footer = ({
  handleSave,
  handleBack,
  totalScreensData,
  isDisabled = false,
}: any) => {
  return (
    <div className="py-4 flex justify-between">
      <div className="flex justify-between items-center gap-4">
        <ScreenSummaryModel totalScreensData={totalScreensData} />
        <div className="flex gap-2">
          <h1>Total screens</h1>
          <h1 className="font-semibold">
            {totalScreensData?.screensSelectedCount}/
            {totalScreensData?.screensTotalCount}
          </h1>
        </div>
        <div className="flex gap-2">
          <h1>Total impression</h1>
          <h1 className="font-semibold">
            {formatNumber(totalScreensData?.impressionSelectedCount || 0)}
          </h1>
        </div>
        <div className="flex gap-2">
          <h1>Total Budget</h1>
          <h1 className="font-semibold">
            {" "}
            &#8377;{formatNumber(totalScreensData?.budgetSelected || 0)}
          </h1>
        </div>
        <div className="flex gap-2">
          <h1>CPM</h1>
          <h1 className="font-semibold">
            &#8377;{totalScreensData?.cpmSelected?.toFixed(2) || 0}
          </h1>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <button
          className="border border-1 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
          title="Go back"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="border border-1 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          title="Save and go next"
          onClick={handleSave}
          disabled={isDisabled}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};
