import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton"
import { PrimaryInput } from "../atoms/PrimaryInput"
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { AudienceCohortTable, CostSummaryTable1, LocationTable, TouchpointTable } from "../../components/tables";

export const AudienceTouchpointDetails = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
  },[]);



  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Select Target Audiences and Touchpoints
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose the audiences you want to target at your desired touchpoints
        </p>
      </div>
      <div className="grid grid-cols-8 gap-1 pt-4">
        <div className="col-span-2 flex justify-center">
          <LocationTable />
        </div>
        <div className="col-span-3 flex justify-center">
          <AudienceCohortTable />
        </div>
        <div className="col-span-3 flex justify-center">
          <TouchpointTable />
        </div>
      </div>
      <div className="py-2">
        <CostSummaryTable1 />
      </div>
      <div className="flex py-4">
        <PrimaryButton rounded="rounded-[6px]" title="Continue" action={() => {
          
          }} />
      </div>
    </div>
  )
}