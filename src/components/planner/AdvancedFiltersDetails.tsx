import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton"
import { PrimaryInput } from "../atoms/PrimaryInput"
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { AudienceCohortTable, CostSummaryTable1, LocationTable, TouchpointTable } from "../../components/tables";
import { audienceCohortData, touchpointData } from "../../data";
import { ExcelImport } from "../../components/molecules/ExcelImport";
import { validateGioData } from "../../utils/excelUtils";
import { RadioInput } from "../../components/atoms/RadioInput";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { StoreProximity } from "../../components/segments/StoreProximity";
import { RouteProximity } from "../../components/segments/RouteProximity";
import { storeProximityData } from "../../data";
import { MapWithGeometry } from "../../components/molecules/MapWithGeometry";

export const AdvanceFiltersDetails = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<any>(1);
  const [selectedStoreOption, setSelectedStoreOption] = useState('');

  const [data, setData] = useState<any[]>([]);
  const handleGetExcelData = (data: any) => {
    if (validateGioData(data)) setData(data);
    else alert("Something wentwrong, please send us correct data");
  };

  useEffect(() => {
  },[]);

  const handleSetStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  }
  const handleStoreSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStoreOption(e.target.value);
  };

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Advance Filters
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose you desired location to target your audiences
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 py-2">
          <div className="grid grid-cols-2 py-1">
            <div className={
                `flex items-center gap-2 py-1 border-b ${step === 1 ? "border-[#52A2FF]" : ""}`
                } onClick={handleSetStep}>
              <i 
                className={`i fi-rs-store-buyer flex items-center ${step === 1 ? "text-[#52A2FF]" : ""}`
                }></i>
              <h1
                className={`text-[16px] ${step === 1 ? "text-[#52A2FF]" : ""}`
                }
              >
                Location Proximity
              </h1>
            </div>
            <div className={
                `flex items-center gap-2 border-b ${step === 2 ? "border-[#52A2FF]" : ""}`
                } onClick={handleSetStep}>
              <i
                className={`fi fi-tr-radar-monitoring-track flex items-center ${step === 2 ? "text-[#52A2FF]" : ""}`
              }></i>
              <h1 className={`text-[16px] ${step === 2 ? "text-[#52A2FF]" : ""}`
                }
              >
                POI Proximity
              </h1>
            </div>
          </div>
          {step === 1 && (
            <div className="py-2">
              <StoreProximity data={storeProximityData} />
              <RouteProximity />
              <div className="flex items-center gap-2">
                <CheckboxInput />
                <p className="text-[14px]">{`Confirm and take
                    "20 Sites Out of 27 Sites"
                    for my plan`}</p>
              </div>
              <div className="flex justify-start">
                <PrimaryButton rounded="rounded-[48px]" title="" />
              </div>
            </div>
          )}
        </div>
        <div className="col-span-1">
          {/* <MapWithGeometry
            // handleRouteData={handleRouteData}
            // circleRadius={circleRadius}
            // screenMarkers={filteredScreens}
            // unSelectedScreens={unSelectedScreens}
            // routes={routes}
            // data={circleData}
          /> */}
        </div>
      </div>
    </div>
  )
}