import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MapWithGeometry } from "../../components/molecules/MapWithGeometry";
import * as turf from "@turf/turf";
import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import { LocationProximity } from "../../components/segments/LocationProximity";
import { POIProximity } from "../../components/segments/POIProximity";
import { Footer } from "../../components/footer";
import { SelectManuallyScreensCheckBox } from "../../components/segments/SelectManuallyScreensCheckBox";
import { message } from "antd";

type Coordinate = [number, number];

interface AdvanceFiltersDetailsProps {
  step?: any;
  setCurrentStep?: any;
  mapData?: any;
  loading?: boolean;
  error?: any;
}

export const AdvanceFiltersDetails = ({
  mapData,
  step,
  setCurrentStep,
  loading,
  error,
}: AdvanceFiltersDetailsProps) => {
  const navigate = useNavigate();

  const [storeFilter, setStoreFilter] = useState<any>(true);

  const [circleRadius, setCircleRadius] = useState<any>(1);
  const [routes, setRoutes] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<any>(true);

  const [dataBrand, setDataBrand] = useState<any[]>([]);
  const [dataComp, setDataComp] = useState<any[]>([]);
  const [routeOrigin, setRouteOrigin] = useState<any>([]);
  const [routeDestination, setRouteDestination] = useState<any>([]);
  const [pois, setPOIs] = useState<any[]>([]);
  const [selectedPOIs, setSelectedPOIs] = useState<any[]>([]);

  const [allScreens, setAllScreens] = useState<any>([]);
  const [excelFilteredScreens, setExcelFilteredScreens] = useState<any>([]);
  const [routeFilteredScreens, setRouteFilteredScreens] = useState<any>([]);
  const [poiFilteredScreens, setPOIFilteredScreens] = useState<any>([]);

  const [selectedScreensFromMap, setSelectedScreensFromMap] = useState<any>([]);

  const [circleData, setCircleData] = useState<any>({});
  const [finalSelectedScreens, setFinalSelectedScreens] = useState<any>([]);

  const getUniqueScreens = (data: any) => {
    const uniqueScreens = new Set();
    data.forEach((location: any) => {
      location.screens.forEach((screen: any) => {
        uniqueScreens.add(screen);
      });
    });
    let result = Array.from(uniqueScreens);

    return result;
  };

  const handlePOIScreens = (myPOIs: any) => {
    console.log(allScreens.filter((s: any) => s.location.pointOfInterest));
    console.log(selectedPOIs);
  };

  const getMapData = useCallback(
    (myData: any) => {
      setAllScreens(myData.screens);
      const data: any = {
        brand: [],
        comp: [],
      };
      data["brand"].push(dataBrand);
      data["comp"].push(dataComp);
      setCircleData(data);
    },
    [dataBrand, dataComp]
  );

  const handleFinalSelectedScreens = ({ type, screens }: any) => {
    if (type === "add") {
      screens = [
        ...excelFilteredScreens,
        ...routeFilteredScreens,
        ...screens,
        ...poiFilteredScreens,
      ];
      const uniqueScreens = getUniqueScreens([{ screens }]);
      setFinalSelectedScreens(uniqueScreens);
    } else if (type === "remove") {
      const uniqueScreens = getUniqueScreens([{ screens }]);
      setFinalSelectedScreens(
        finalSelectedScreens.filter(
          (fs: any) => !uniqueScreens.map((s: any) => s._id).includes(fs._id)
        )
      );
    }
  };

  useEffect(() => {
    if (getAllLocalStorageData()) {
      getMapData(
        JSON.parse(getAllLocalStorageData()["advanceFilterScreensMapData"])
      );
      setPOIs(
        JSON.parse(getAllLocalStorageData()["advanceFilterScreensMapData"])
          .poiList
      );
      setSelectedPOIs(
        JSON.parse(getAllLocalStorageData()["advanceFilterScreensMapData"])
          .poiList
      );
    }
  }, [getMapData]);

  useEffect(() => {
    if (
      excelFilteredScreens.length === 0 &&
      routeFilteredScreens.length === 0
    ) {
      handleFinalSelectedScreens({
        type: "add",
        screens: JSON.parse(
          getAllLocalStorageData()["advanceFilterScreensMapData"]
        ).screens,
      });
    }
  }, []);

  const handleRemoveRoute = (id: any) => {
    let arr = routes;
    console.log(arr);
    for (let data of arr) {
      if (data?.id === id) {
        setRouteFilteredScreens(
          routeFilteredScreens?.filter(
            (rf: any) =>
              !data.selectedScreens.map((s: any) => s._id).includes(rf._id)
          )
        );
        handleFinalSelectedScreens({
          type: "remove",
          screens: data.selectedScreens,
        });
      }
    }
    arr = arr.filter((data: any) => data?.id != id);
    setRoutes(arr);
  };

  const handleRouteSetup = async (originData: any, destinationData: any) => {
    let route: any = {};

    route["origin"] = originData[0];
    route["destination"] = destinationData[0];
    route["selectedScreens"] = [];
    route["id"] = routes?.length + 1;

    if (routes.includes(route)) {
    } else {
      routes.push(route);
    }

    setRoutes([...routes]);
  };

  const handleRouteData = (routeData: any, id: any) => {
    const radiusInMeters = 1000; // 1000 meters radius
    const filteredRecords = allScreens?.filter((point: any) => {
      let x: Coordinate = [
        point.location.geographicalLocation.longitude,
        point.location.geographicalLocation.latitude,
      ];
      return routeData?.coordinates.some((coord: Coordinate) => {
        const from = turf.point([Number(coord[0]), Number(coord[1])]);
        const to = turf.point(x);
        const distance = turf.distance(from, to, { units: "meters" });
        return distance <= radiusInMeters; // Convert meters to kilometers
      });
    });
    let arr = routes;
    const screens: any = routeFilteredScreens;
    for (let data of arr) {
      if (data?.id === id) {
        data.selectedScreens = filteredRecords;
        filteredRecords.map((f: any) => {
          if (!screens.map((s: any) => s._id).includes(f._id)) {
            screens.push(f);
          }
        });
      }
    }
    setRouteFilteredScreens(screens);
    setRoutes(arr);
    handleFinalSelectedScreens({
      type: "add",
      screens: filteredRecords,
    });

    // handleSetFIlter4(arr);
  };

  const handleAddManualSelectedScreenIntoFinalSelectedScreens = (
    checked: any
  ) => {
    if (checked) {
      handleFinalSelectedScreens({
        type: "add",
        screens: selectedScreensFromMap,
      });
    } else {
      handleFinalSelectedScreens({
        type: "remove",
        screens: selectedScreensFromMap,
      });
    }
  };

  const handleSelectFromMap = (screenData: any) => {
    setSelectedScreensFromMap((pre: any) => {
      if (pre.find((screen: any) => screen?._id == screenData?._id)) {
        return pre;
      } else {
        return [...pre, screenData];
      }
    });
  };

  const handleConfirmScreensSelections = (checked: boolean) => {
    setIsDisabled(!checked);
  };

  return (
    <div>
      <div className="h-[640px] w-full py-3 grid grid-cols-2 gap-4">
        <div className="col-span-1 py-2 pr-4">
          {storeFilter ? (
            <div className="">
              <div className="flex justify-between">
                <div className="truncate">
                  <h1 className="text-[24px] text-primaryText font-semibold truncate">
                    Store & Route Proximity
                  </h1>
                  <p className="text-[14px] text-secondaryText">
                    Viewing Store & Competitor Matches
                  </p>
                </div>
                <div
                  className="flex items-center justify-end"
                  onClick={() => setStoreFilter(!storeFilter)}
                >
                  <p className="text-[14px] text-[#9f9f9f]">Next</p>
                </div>
              </div>

              <LocationProximity
                routes={routes}
                routeOrigin={routeOrigin}
                setRouteOrigin={setRouteOrigin}
                routeDestination={routeDestination}
                setRouteDestination={setRouteDestination}
                setDataBrand={setDataBrand}
                setDataComp={setDataComp}
                allScreens={allScreens}
                finalSelectedScreens={finalSelectedScreens}
                setExcelFilteredScreens={setExcelFilteredScreens}
                excelFilteredScreens={excelFilteredScreens}
                circleRadius={circleRadius}
                handleRouteSetup={handleRouteSetup}
                handleRemoveRoute={handleRemoveRoute}
                handleFinalSelectedScreens={handleFinalSelectedScreens}
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between">
                <div className="truncate">
                  <h1 className="text-[24px] text-primaryText font-semibold truncate">
                    POI Proximity
                  </h1>
                  <p className="text-[14px] text-secondaryText">
                    Select your desired POIs for filtering screens
                  </p>
                </div>
                <div
                  className="flex items-center justify-end"
                  onClick={() => setStoreFilter(!storeFilter)}
                >
                  <p className="text-[14px] text-[#9f9f9f]">Back</p>
                </div>
              </div>
              <POIProximity
                pois={pois}
                selectedPOIs={selectedPOIs}
                setSelectedPOIs={setSelectedPOIs}
                setPOIFilteredScreens={setPOIFilteredScreens}
                allScreens={allScreens}
                finalSelectedScreens={finalSelectedScreens}
                handlePOIScreens={handlePOIScreens}
                manuallySelected={selectedScreensFromMap}
                handleAddManualSelectedScreenIntoFinalSelectedScreens={
                  handleAddManualSelectedScreenIntoFinalSelectedScreens
                }
                handleConfirmScreensSelections={handleConfirmScreensSelections}
              />
            </div>
          )}
          <SelectManuallyScreensCheckBox
            manuallySelected={selectedScreensFromMap?.length}
            unselectedScreen={allScreens?.length - finalSelectedScreens?.length}
            handleCheck={handleAddManualSelectedScreenIntoFinalSelectedScreens}
          />
          <div className="flex items-center pt-2">
            <CheckboxInput
              label={
                <>
                  Confirm and take{" "}
                  <span className=" font-bold">
                    {`${finalSelectedScreens.length} Sites Out of ${allScreens.length} Sites `}
                  </span>
                  for my plan
                </>
              }
              onChange={handleConfirmScreensSelections}
            />
          </div>
        </div>

        <div className="col-span-1 w-full flex items-center justify-center">
          <MapWithGeometry
            handleRouteData={handleRouteData}
            circleRadius={circleRadius}
            filteredScreens={finalSelectedScreens || []}
            allScreens={allScreens}
            routes={routes}
            data={circleData}
            setSelectedScreensFromMap={handleSelectFromMap}
          />
        </div>
      </div>
      <div className="pt-4">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            if (isDisabled) {
              message.error("Please  confirm screen selection");
            } else setCurrentStep(step + 1);
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};
