import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton"
import { PrimaryInput } from "../atoms/PrimaryInput"
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { AudienceCohortTable, CostSummaryTable1, LocationTable, TouchpointTable } from "../../components/tables";
import { audienceCohortData, touchpointData } from "../../data";

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
          <AudienceCohortTable audienceCohortData={audienceCohortData} />
        </div>
        <div className="col-span-3 flex justify-center">
          <TouchpointTable touchpointData={touchpointData} />
        </div>
      </div>
      <div className="py-2">
        <CostSummaryTable1 />
      </div>
      <div className="flex justify-start items-center gap-2 py-2">
        <i className="fi fi-sr-lightbulb-on text-[#FFB904]"></i>
        <h1 className="text-[14px] text-[#178967]">
          Prooh Tip:- select target audience and select select target audience and location target audience and location location
        </h1>
      </div>
    </div>
  )
}