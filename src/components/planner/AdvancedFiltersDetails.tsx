import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton"
import { useNavigate } from "react-router-dom";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { StoreProximity } from "../../components/segments/StoreProximity";
import { RouteProximity } from "../../components/segments/RouteProximity";
import { MapWithGeometry } from "../../components/molecules/MapWithGeometry";
import * as turf from "@turf/turf";

type Coordinate = [number, number];

export const AdvanceFiltersDetails = (props: any) => {
  const navigate = useNavigate();

  const [step, setStep] = useState<any>(1);
  const [selectedStoreOption, setSelectedStoreOption] = useState("brandStore");

  const [circleRadius, setCircleRadius] = useState<any>(1);
  const [routes, setRoutes] = useState<any[]>([]);

  const [unSelectedScreens, setUnSelectedScreens] = useState<any>([]);
  const [circleData, setCircleData] = useState<any>({});

  const [filteredScreens, setFilteredScreens] = useState<any>([]);

  const [dataBrand, setDataBrand] = useState<any[]>([]);
  const [dataComp, setDataComp] = useState<any[]>([]);
  

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
    console.log(e.target.value);
    setSelectedStoreOption(e.target.value);
  };

  const handleRouteData = (routeData: any, id: any) => {
    const radiusInMeters = 100; // 100 meters radius

    const filteredRecords = props?.allScreens?.filter((point: any) => {
      let x: Coordinate = [point.longitude, point.latitude];
      return routeData?.coordinates.some((coord: Coordinate) => {
        const from = turf.point([Number(coord[0]), Number(coord[1])]);
        const to = turf.point(x);
        const distance = turf.distance(from, to, { units: "meters" });
        return distance <= radiusInMeters; // Convert meters to kilometers
      });
    });

    let arr = routes;
    for (let data of arr) {
      if (data?.id == id) {
        data.selectedScreens = filteredRecords;
      }
    }
    setRoutes(arr);
    // handleSetFIlter4(arr);
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
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 py-2 pr-8">
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
              <StoreProximity
                selectedStoreOption={selectedStoreOption}
                setSelectedStoreOption={setSelectedStoreOption}
                handleStoreSelection={handleStoreSelection}
                dataBrand={dataBrand}
                setDataBrand={setDataBrand}
                dataComp={dataComp}
                setDataComp={setDataComp}
              />
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
          <MapWithGeometry
            handleRouteData={handleRouteData}
            circleRadius={circleRadius}
            screenMarkers={filteredScreens}
            unSelectedScreens={unSelectedScreens}
            routes={routes}
            data={circleData}
          />
        </div>
      </div>
    </div>
  )
}