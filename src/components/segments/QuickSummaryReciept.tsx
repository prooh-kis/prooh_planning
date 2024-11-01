import { useState } from "react";
import { RadioInput } from "../../components/atoms/RadioInput";

interface QuickSummaryRecieptProps {
  selectedTrigger?: any;
  campaignDuration?: any;
}
export const QuickSummaryReciept = ({selectedTrigger, campaignDuration}: QuickSummaryRecieptProps) => {

  return (
    <div className="border rounded h-full">
      <div className="p-3">
        <h1 className="text-[16px]">Trigger Selection - {selectedTrigger}</h1>
        <p className="text-[12px] text-[#737373]">Your final bill will include the cost of all the additional slots</p>
      </div>
    </div>
  )}