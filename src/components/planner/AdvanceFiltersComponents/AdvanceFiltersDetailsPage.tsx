import { GoogleMapWithGeometry } from "./map/GoogleMapWithGeometry";
import { addDetailsToCreateCampaign } from "../../../actions/campaignAction";
import { message, Tooltip } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
// Type for polygon with custom ID
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { LocationProximity } from "./LocationProximity";
import { Footer } from "../../footer";
import {
  getPlanningPageFooterData,
  getScreenDataForAdvanceFilters,
} from "../../../actions/screenAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../../constants/campaignConstants";
import { getUniqueScreens } from "../../../utils/screenRanking";
import { LoadingScreen } from "../../molecules/LoadingScreen";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../../constants/userConstants";

interface AdvanceFiltersDetailsPageProps {
  step?: any;
  setCurrentStep?: any;
  loading?: boolean;
  error?: any;
  campaignId?: any;
  campaignDetails?: any;
}

export const AdvanceFiltersDetailsPage = ({
  step,
  setCurrentStep,
  campaignId,
  campaignDetails,
}: AdvanceFiltersDetailsPageProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [allScreens, setAllScreens] = useState<any>([]);
  const [finalSelectedScreens, setFinalSelectedScreens] = useState<any>([]);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [excelFilteredScreens, setExcelFilteredScreens] = useState<any>(
    (prev: any) => (prev && prev.length > 0 ? prev : [])
  );
  const [routeFilteredScreens, setRouteFilteredScreens] = useState<any>(
    (prev: any) => (prev && prev.length > 0 ? prev : [])
  );
  const [polygonFilteredScreens, setPolygonFilteredScreens] = useState<any>(
    (prev: any) => (prev && prev.length > 0 ? prev : [])
  );

  const [routeDataCache, setRouteDataCache] = useState<{ [key: string]: any }>(
    {}
  );

  const [excelData, setExcelData] = useState<any>(() => {
    return {
      brand: campaignDetails?.advanceFilterData?.stores?.[0]?.brands || [],
      comp: campaignDetails?.advanceFilterData?.stores?.[0]?.comp || [],
      radius: campaignDetails?.advanceFilterData?.stores?.[0]?.radius || 100,
    };
  });

  const [dataBrand, setDataBrand] = useState<any[]>(
    campaignDetails?.advanceFilterData?.stores?.[0]?.brands || []
  );
  const [dataComp, setDataComp] = useState<any[]>(
    campaignDetails?.advanceFilterData?.stores?.[0]?.comp || []
  );

  const [circleRadius, setCircleRadius] = useState<any>(
    campaignDetails?.advanceFilterData?.stores?.[0]?.radius || 100 // in meters
  );

  const [routes, setRoutes] = useState<any[]>(
    JSON.parse(JSON.stringify(campaignDetails?.advanceFilterData?.routes || []))
  );
  const [routeRadius, setRouteRadius] = useState<any>(300); // in meteres

  const [polygons, setPolygons] = useState<any[]>([]);
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = useSelector((state: any) => state.detailsToCreateCampaignAdd);

  const {
    loading: loadingAdvanceFilterData,
    error: errorAdvanceFilterData,
    data: advanceFilterData,
  } = useSelector((state: any) => state.screensDataAdvanceFilterGet);

  const handleReload = () => {
    dispatch(
      getScreenDataForAdvanceFilters({
        id: campaignId,
        touchPoints: campaignDetails?.touchPoints,
      })
    );
  };

  const handleFinalSelectedScreens = useCallback(
    ({ type, screens }: any) => {
      console.log(type, screens);

      setFinalSelectedScreens((prevScreens: any) => {
        if (type === "add") {
          const updatedScreens = [
            ...excelFilteredScreens,
            ...routeFilteredScreens,
            ...polygonFilteredScreens,
            ...screens,
          ];
          const uniqueScreens = getUniqueScreens([{ screens: updatedScreens }]);
          return uniqueScreens;
        } else if (type === "remove") {
          const screensToRemove = new Set(screens.map((s: any) => s._id));
          return prevScreens.filter(
            (screen: any) => !screensToRemove.has(screen._id)
          );
        }
        console.log(prevScreens);
        return prevScreens;
      });
    },
    [excelFilteredScreens, polygonFilteredScreens, routeFilteredScreens]
  );

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      setCurrentStep(step + 1);
    }
  }, [successAddDetails, step, setCurrentStep, dispatch]);

  useEffect(() => {
    if (advanceFilterData && finalSelectedScreens?.length === 0) {
      if (successAddDetails && advanceFilterData?.screens?.length == 0) {
        message.error(
          "You have got Zero screen, please change your previous selection"
        );
      } else {
        setAllScreens(advanceFilterData?.screens);
        setFinalSelectedScreens(advanceFilterData?.screens);
      }
    }
  }, [advanceFilterData, campaignId, finalSelectedScreens, successAddDetails]);

  useEffect(() => {
    if (!campaignDetails) return;
    if (errorAddDetails) {
      message.error("Error in saving campaigns details");
    }
    if (errorAdvanceFilterData) {
      alert("Your system is having some issue, please refresh the page...");
    }

    dispatch(
      getScreenDataForAdvanceFilters({
        id: campaignId,
        touchPoints: campaignDetails?.touchPoints,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Advance Filter Page",
      })
    );
  }, [
    dispatch,
    campaignId,
    pathname,
    campaignDetails,
    errorAddDetails,
    errorAdvanceFilterData,
  ]);

  const extractPolygonData = (polygons: any[]) => {
    return polygons.map((polygon) => {
      const paths = polygon.getPaths();
      const coordinates = [];

      // Get all the coordinates from the polygon paths
      for (let i = 0; i < paths.getLength(); i++) {
        const path = paths.getAt(i);
        const pathCoords = [];

        for (let j = 0; j < path.getLength(); j++) {
          const point = path.getAt(j);
          pathCoords.push({
            lat: point.lat(),
            lng: point.lng(),
          });
        }

        if (pathCoords.length > 0) {
          coordinates.push(pathCoords);
        }
      }

      return {
        id: polygon.id || Date.now().toString(),
        coordinates: coordinates,
      };
    });
  };

  const handleSaveAndContinue = () => {
    if (!pathname.split("/").includes("view")) {
      if (isDisabled) {
        message.error("Please  confirm screen selection");
        return;
      }

      if (finalSelectedScreens?.length > 0) {
        // Extract polygon data before saving
        const polygonData = extractPolygonData(polygons);

        dispatch(
          addDetailsToCreateCampaign({
            event:
              CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
            pageName: "Advance Filter Page",
            id: campaignId,
            screenIds: finalSelectedScreens.map((s: any) => s._id),
            advanceFilterData: {
              stores: [
                {
                  brands: [...dataBrand],
                  comp: [...dataComp],
                  radius: circleRadius,
                },
              ],
              routes: routes,
              poiLists: [],
              polygons: polygonData, // This is now a plain object that can be stringified
            },
          })
        );
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    handleFinalSelectedScreens({ type: "add", screens: [] });
  }, [handleFinalSelectedScreens]);

  const handleConfirmScreensSelections = ({ checked, screens }: any) => {
    setIsDisabled(!checked);
    if (checked) {
      handleFinalSelectedScreens({
        type: "add",
        screens: screens,
      });
    }
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col">
      {loadingAdvanceFilterData ? (
        <LoadingScreen />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <div className="w-1/2 p-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="lg:text-[24px] md:text-[18px] text-primaryText font-semibold truncate">
                    Store & Route Proximity
                  </h1>
                  <p className="text-[14px] text-secondaryText">
                    Apply filters to optimise your media plan
                  </p>
                </div>
                <div className="flex mt-3 items-top justify-end gap-2">
                  <Tooltip title="Click to refresh the map data">
                    <i
                      className="fi fi-br-rotate-right text-[12px] flex items-center cursor-pointer"
                      onClick={handleReload}
                    ></i>
                  </Tooltip>
                </div>
              </div>
              {allScreens?.length > 0 && (
                <LocationProximity
                  allScreens={allScreens}
                  finalSelectedScreens={finalSelectedScreens}
                  userLocation={userLocation}
                  excelFilteredScreens={excelFilteredScreens}
                  setExcelFilteredScreens={setExcelFilteredScreens}
                  setExcelData={setExcelData}
                  excelData={excelData}
                  setDataBrand={setDataBrand}
                  setDataComp={setDataComp}
                  circleRadius={circleRadius}
                  setCircleRadius={setCircleRadius}
                  routeFilteredScreens={routeFilteredScreens}
                  setRouteFilteredScreens={setRouteFilteredScreens}
                  setRouteDataCache={setRouteDataCache}
                  setRouteRadius={setRouteRadius}
                  routeRadius={routeRadius}
                  routes={routes}
                  setRoutes={setRoutes}
                  polygonFilteredScreens={polygonFilteredScreens}
                  polygons={polygons}
                  setPolygons={setPolygons}
                  handleConfirmScreensSelections={
                    handleConfirmScreensSelections
                  }
                  isDisabled={isDisabled}
                />
              )}
            </div>

            <div className="w-1/2 h-full overflow-hidden">
              {!loadingAdvanceFilterData && allScreens?.length > 0 && (
                <GoogleMapWithGeometry
                  campaignDetails={campaignDetails}
                  allScreens={allScreens}
                  finalSelectedScreens={finalSelectedScreens}
                  heatmap={advanceFilterData?.heatmap}
                  setPolygons={setPolygons}
                  polygons={polygons}
                  setPolygonFilteredScreens={setPolygonFilteredScreens}
                  circleRadius={circleRadius}
                  routeRadius={routeRadius}
                  routes={routes}
                  setRoutes={setRoutes}
                  routeDataCache={routeDataCache}
                  setRouteDataCache={setRouteDataCache}
                  setRouteFilteredScreens={setRouteFilteredScreens}
                  excelData={excelData}
                  userLocation={userLocation}
                  setUserLocation={setUserLocation}
                  handleFinalSelectedScreens={handleFinalSelectedScreens}
                />
              )}
            </div>
          </div>
          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF] z-10">
            <Footer
              mainTitle={isDisabled ? "Check to Confirm" : "Continue"}
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={handleSaveAndContinue}
              campaignId={campaignId}
              pageName="Advance Filter Page"
              loadingCost={loadingAdvanceFilterData || loadingAddDetails}
              successCampaignDetails={successAddDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};
