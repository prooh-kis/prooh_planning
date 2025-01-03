import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import * as turf from "@turf/turf";
import { getAllLocalStorageData, getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { LocationProximity } from "../../components/segments/LocationProximity";
import { POIProximity } from "../../components/segments/POIProximity";
import { Footer } from "../../components/footer";
import { SelectManuallyScreensCheckBox } from "../../components/segments/SelectManuallyScreensCheckBox";
import { message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getRegularVsCohortPriceData, getScreenDataForAdvanceFilters } from "../../actions/screenAction";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { ADVANCE_FILTER_SCREENS_MAP_DATA, COST_SUMMARY, FULL_CAMPAIGN_PLAN, REGULAR_VS_COHORT_PRICE_DATA, SELECTED_AUDIENCE_TOUCHPOINTS, SELECTED_SCREENS_ID } from "../../constants/localStorageConstants";
import { ALL_TOUCHPOINTS } from "../../constants/helperConstants";
import { MapWithGeometry } from "../../components/map/MapWithGeometry";
import { getUniqueScreens } from "../../utils/screenRanking";
// import { MapWithGeometry } from "../../components/molecules/MapWithGeometry";

type Coordinate = [number, number];

interface AdvanceFiltersDetailsProps {
  step?: any;
  setCurrentStep?: any;
  mapData?: any;
  loading?: boolean;
  error?: any;
  campaignId?: string
}

export const AdvanceFiltersDetails = ({
  mapData,
  step,
  setCurrentStep,
  loading,
  error,
  campaignId
}: AdvanceFiltersDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campId = campaignId ? campaignId : pathname.split("/").splice(-1)[0]

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

  const [polygons, setPolygons] = useState([]);

  const [selectedScreensFromMap, setSelectedScreensFromMap] = useState<any>([]);

  const [circleData, setCircleData] = useState<any>({});
  const [finalSelectedScreens, setFinalSelectedScreens] = useState<any>([]);

  const screensDataAdvanceFilterGet = useSelector((state: any) => state.screensDataAdvanceFilterGet);
  const {
    loading: loadingAdvanceFilterData,
    error: errorAdvanceFilterData,
    data: advanceFilterData
  } = screensDataAdvanceFilterGet;

  // Handle Final screen selection
  const handleFinalSelectedScreens =({ type, screens }: any) => {

    if (type === "add") {
      screens = [
        ...excelFilteredScreens,
        ...routeFilteredScreens,
        ...screens,
        ...poiFilteredScreens,
        ...selectedScreensFromMap,
      ];
      const uniqueScreens = getUniqueScreens([{ screens }]);
      setFinalSelectedScreens(uniqueScreens);
      saveDataOnLocalStorage(SELECTED_SCREENS_ID, {[campId]: uniqueScreens});
    } else if (type === "remove") {
      const uniqueScreens = getUniqueScreens([{ screens }]);

      setFinalSelectedScreens(
        finalSelectedScreens.filter(
          (fs: any) => !uniqueScreens.map((s: any) => s._id).includes(fs._id)
        )
      );
      saveDataOnLocalStorage(SELECTED_SCREENS_ID, {[campId]: finalSelectedScreens.filter(
          (fs: any) => !uniqueScreens.map((s: any) => s._id).includes(fs._id)
        )});
    }
  };

  // Brand comp store latlong data for map
  const getMapData = useCallback(
    (myData: any) => {
      setAllScreens(myData?.screens);
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

  // Remove screens from selection after removing routes
  const handleRemoveRoute = (id: any) => {
    let arr = routes;
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
          screens: data?.selectedScreens,
        });
      }
    }
    arr = arr.filter((data: any) => data?.id != id);
    setRoutes(arr);
  };

  // Add screens for selection after adding routes
  const handleRouteData = (routeData: any, id: any) => {
    const radiusInMeters = 1000; // 1000 meters radius
    const line = turf.lineString(routeData.coordinates); // Create a LineString from route coordinates
    const bufferedArea: any = turf.buffer(line, radiusInMeters / 1000, { units: "kilometers" }); // Buffer area around the route
  
    const filteredRecords = allScreens?.filter((point: any) => {
      const screenPoint = turf.point([
        point.location.geographicalLocation.longitude,
        point.location.geographicalLocation.latitude,
      ]);
      return turf.booleanPointInPolygon(screenPoint, bufferedArea); // Check if screen is within the buffer
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
      screens: filteredRecords || [],
    });
  };

  // Add/remove routes to select screens
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

  // Add screens mannually from the map
  const handleAddManualSelectedScreenIntoFinalSelectedScreens = (checked: any, screen: any) => {
    if (checked) {
      handleFinalSelectedScreens({
        type: "add",
        screens: finalSelectedScreens || [],
        // screens: [],
      });
    } else {
      // console.log("sdadasa", finalSelectedScreens?.filter((sc: any) => sc._id !== screen._id))
      handleFinalSelectedScreens({
        type: "remove",
        screens: [screen],
      });
    }
  }

  // Select all from map mannually
  const handleSelectFromMap = (checked: any, screenData: any) => {
    console.log(screenData, "age")
    setSelectedScreensFromMap((pre: any) => {
      if (pre.find((screen: any) => screen?._id == screenData?._id)) {
        return pre;
      } else {
        return [...pre, screenData];
      }
    });

    setFinalSelectedScreens((pre: any) => {
      if (pre.find((screen: any) => screen?._id == screenData?._id)) {
        return pre;
      } else {
        return [...pre, screenData];
      }
    });
    
    handleFinalSelectedScreens({
      type: checked ? "add" : "remove",
      screens: [screenData],
    });
  };

  // Confirm all screens selection
  const handleConfirmScreensSelections = ({checked, screens}: any) => {
    setIsDisabled(!checked);
    if (checked) {
      handleFinalSelectedScreens({
        type: "add",
        screens: screens,
      });
    } else {
      // handleFinalSelectedScreens({
      //   type: "remove",
      //   screens: screens,
      // });
    }
    // saveDataOnLocalStorage(SELECTED_SCREENS_ID, getUniqueScreens([{screens: selectedScreenIds}]));
  };


  useEffect(() => {
    if (advanceFilterData?.screens.length > 0) {
      getMapData(advanceFilterData || {});
      setPOIs(advanceFilterData.poiList || []);
      setSelectedPOIs(advanceFilterData.poiList || []);
      
      if (
        excelFilteredScreens.length === 0 &&
        routeFilteredScreens.length === 0 &&
        selectedScreensFromMap.length === 0 &&
        poiFilteredScreens.length === 0
      ) {
        setFinalSelectedScreens(advanceFilterData?.screens)
        handleFinalSelectedScreens({
          type: "add",
          screens: advanceFilterData?.screens,
        });
      }
    }
    
  }, [advanceFilterData, getMapData, excelFilteredScreens, routeFilteredScreens]);

  useEffect(() => {
    dispatch(
      getScreenDataForAdvanceFilters({
        id: campId,
        touchPoints: pathname?.split("/").includes("storebasedplan") ? ALL_TOUCHPOINTS : getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campId].touchPoints,
      })
    );
    saveDataOnLocalStorage(REGULAR_VS_COHORT_PRICE_DATA, {[campId]: {}});
  }, [dispatch, campId]);

  return (
    <div className="w-full">
      <div className="h-full w-full py-3 grid grid-cols-2 gap-4">
        <div className="col-span-1 h-full py-2 pr-4">
          {storeFilter ? (
            <div className="h-auto">
              <div className="flex justify-between">
                <div className="truncate w-full flex items-center">
                  <h1 className="lg:text-[24px] md:text-[18px] text-primaryText font-semibold truncate">
                    Store & Route Proximity
                  </h1>
                </div>

                <div className="flex mt-3 items-top justify-end gap-2">
                  <Tooltip
                    title="Click to refresh the map data"
                  >
                    <i className="fi fi-br-rotate-right text-[12px] flex items-center cursor-pointer" onClick={() => window.location.reload()}></i>
                  </Tooltip>
                  <Tooltip
                    title="Click to skip the advance filters"
                  >
                    <i
                      className="fi fi-br-ban text-[12px] text-red-500 flex items-center cursor-pointer"
                      onClick={() => {
                        if (isDisabled) {
                          message.error("Please  confirm screen selection");
                        } else {
                          dispatch(addDetailsToCreateCampaign({
                            pageName: "Advance Filter Page",
                            id: pathname.split("/").splice(-1)[0],
                            screenIds: finalSelectedScreens.map((s: any) => s._id)
                          }));
                          setCurrentStep(step + 1);
                        };
                      }}
                    >
                    </i>
                  </Tooltip>
                  <Tooltip
                    title="Click to filter using POIs proximity"
                  >
                    <i className="fi fi-br-angle-right text-[12px] text-green-500 cursor-pointer flex items-center" onClick={() => setStoreFilter(!storeFilter)}></i>
                  </Tooltip>
                </div>
              </div>

              <LocationProximity
                routeFilteredScreens={routeFilteredScreens}
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
                polygons={polygons}
                setPolygons={setPolygons}
              />
            </div>
          ) : (
            <div className="h-auto">
              <div className="flex w-full justify-between">
                <div className="truncate w-full flex items-center">

                  <h1 className="lg:text-[24px] md:text-[18px] text-primaryText font-semibold truncate">
                    POI Proximity
                  </h1>
                </div>
                <div className="flex mt-3 items-top justify-end gap-2">
                  <Tooltip
                    title="Click to filter using location proximity"
                  >
                    <i className="fi fi-br-angle-left text-[14px] text-green-500 cursor-pointer flex items-center" onClick={() => setStoreFilter(!storeFilter)}></i>
                  </Tooltip>
                  <Tooltip
                    title="Click to refresh the map data"
                  >
                    <i className="fi fi-br-rotate-right text-[12px] flex items-center cursor-pointer" onClick={() => window.location.reload()}></i>
                  </Tooltip>
                  <Tooltip
                    title="Click to filter using location proximity"
                  >
                    <i
                      className="fi fi-br-ban text-[12px] text-red-500 flex items-center cursor-pointer"
                      onClick={() => {
                        if (isDisabled) {
                          message.error("Please  confirm screen selection");
                        } else {
                          dispatch(addDetailsToCreateCampaign({
                            pageName: "Advance Filter Page",
                            id: pathname.split("/").splice(-1)[0],
                            screenIds: finalSelectedScreens.map((s: any) => s._id)
                          }));
                          setCurrentStep(step + 1);
                        };
                      }}
                    >
                    </i>
                  </Tooltip>
                </div>
              </div>
              <POIProximity
                pois={pois}
                selectedPOIs={selectedPOIs}
                setSelectedPOIs={setSelectedPOIs}
                setPOIFilteredScreens={setPOIFilteredScreens}
                allScreens={allScreens}
                finalSelectedScreens={finalSelectedScreens}
                selectedScreensFromMap={selectedScreensFromMap}
                handleSelectFromMap={handleSelectFromMap}
                handleConfirmScreensSelections={handleConfirmScreensSelections}
              />
            </div>
          )}
          <div className="flex items-center mx-[-1px] mb-20 mt-4">
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
              onChange={(e) => {
                handleConfirmScreensSelections({checked: e, screens: finalSelectedScreens});
                if (getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)) {
                  dispatch(
                    getRegularVsCohortPriceData({
                      id: campId,
                      screenIds: getDataFromLocalStorage(SELECTED_SCREENS_ID),
                      cohorts: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campId].cohorts,
                      gender: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campId].gender,
                      duration: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campId].duration,
                    })
                  );
                }
              }}
            />
          </div>
        </div>

        <div className="col-span-1 w-full h-full py-2">
          {allScreens?.length > 0 && (
            <MapWithGeometry
              handleRouteData={handleRouteData}
              circleRadius={circleRadius}
              filteredScreens={finalSelectedScreens}
              allScreens={allScreens}
              routes={routes}
              data={circleData}
              handleSelectFromMap={handleSelectFromMap}
              handleAddManualSelection={handleAddManualSelectedScreenIntoFinalSelectedScreens}
              onPolygonComplete={(screens: any) => handleFinalSelectedScreens({ type: 'add', screens })}
              setPolygons={setPolygons}
              polygons={polygons}
            />
          )}

        </div>
      </div>
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white z-10">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            if (isDisabled) {
              message.error("Please  confirm screen selection");
            } else {
              dispatch(addDetailsToCreateCampaign({
                pageName: "Advance Filter Page",
                id: pathname.split("/").splice(-1)[0],
                screenIds: finalSelectedScreens.map((s: any) => s._id)
              }));
              setCurrentStep(step + 1);
            };
          }}
          campaignId={campaignId}
        />
      </div>
    </div>
  );
};
