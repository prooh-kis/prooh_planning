import React from "react";
import { ScreenSummaryModel } from "./popup/ScreenSummaryModel";

export function CampaignPlaningFooter({ handleBack, handleSave }: any) {
  return (
    <div className="py-8 flex justify-between">
      <div className="flex justify-between items-center gap-4">
        <ScreenSummaryModel />
        <div className="flex gap-2">
          <h1>Total screens</h1>
          <h1 className="font-semibold">27/73</h1>
        </div>
        <div className="flex gap-2">
          <h1>Total impression</h1>
          <h1 className="font-semibold">100k</h1>
        </div>
        <div className="flex gap-2">
          <h1>Total Budget</h1>
          <h1 className="font-semibold">200 Lkh</h1>
        </div>
        <div className="flex gap-2">
          <h1>CPM</h1>
          <h1 className="font-semibold">34</h1>
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
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
