import { GoogleMapWithGeometry } from "../../components/map/GoogleMapWithGeometry";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { message, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { LocationProximity } from "../../components/segments/LocationProximity";
import { Footer } from "../../components/footer";
import {
  getPlanningPageFooterData,
  getScreenDataForAdvanceFilters,
} from "../../actions/screenAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { getUniqueScreens } from "../../utils/screenRanking";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface AdvanceFiltersDetailsProps {
  step?: any;
  setCurrentStep?: any;
  loading?: boolean;
  error?: any;
  campaignId?: any;
  campaignDetails?: any;
}

export const AdvanceFiltersDetails = ({
  step,
  setCurrentStep,
  campaignId,
  campaignDetails,
}: AdvanceFiltersDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  // const campaignId = campaignId ? campaignId : pathname?.split("/")?.splice(-1)[0];

  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [allScreens, setAllScreens] = useState<any>([]);
  const [finalSelectedScreens, setFinalSelectedScreens] = useState<any>([]);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [excelFilteredScreens, setExcelFilteredScreens] = useState<any>([]);
  const [routeFilteredScreens, setRouteFilteredScreens] = useState<any>([]);
  const [polygonFilteredScreens, setPolygonFilteredScreens] = useState<any>([]);

  const [dataBrand, setDataBrand] = useState<any[]>(
    campaignDetails?.advanceFilterData?.stores?.[0]?.brands || []
  );
  const [dataComp, setDataComp] = useState<any[]>(
    campaignDetails?.advanceFilterData?.stores?.[0]?.comp || []
  );
  const [circleRadius, setCircleRadius] = useState<any>(
    campaignDetails?.advanceFilterData?.stores?.[0]?.radius || 1000 // in meters
  );
  const [circleData, setCircleData] = useState<any>({});
  const [routes, setRoutes] = useState<any[]>(
    JSON.parse(JSON.stringify(campaignDetails?.advanceFilterData?.routes || []))
  );
  const [routeOrigin, setRouteOrigin] = useState<any>([]);
  const [routeDestination, setRouteDestination] = useState<any>([]);
  const [routeRadius, setRouteRadius] = useState<any>(1000); // in meteres

  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const screensDataAdvanceFilterGet = useSelector(
    (state: any) => state.screensDataAdvanceFilterGet
  );
  const {
    loading: loadingAdvanceFilterData,
    error: errorAdvanceFilterData,
    data: advanceFilterData,
  } = screensDataAdvanceFilterGet;

  const handleFinalSelectedScreens = ({ type, screens }: any) => {
    if (type === "add") {
      screens = [
        ...excelFilteredScreens,
        ...routeFilteredScreens,
        ...polygonFilteredScreens,
        ...screens,
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

  const handleConfirmScreensSelections = ({ checked, screens }: any) => {
    setIsDisabled(!checked);
    if (checked) {
      handleFinalSelectedScreens({
        type: "add",
        screens: screens,
      });
    }
  };

  const handleReload = () => {
    dispatch(
      getScreenDataForAdvanceFilters({
        id: campaignId,
        touchPoints: campaignDetails?.touchPoints,
      })
    );
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

  const handleSaveAndContinue = () => {
    if (!pathname.split("/").includes("view")) {
      if (isDisabled) {
        message.error("Please  confirm screen selection");
        return;
      }
      dispatch(
        addDetailsToCreateCampaign({
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
            routes: routes.map((route: any) => ({
              ...route,
              selectedScreens: [...(route.selectedScreens || [])], // Ensure a new array
            })),
            poiLists: [],
            // polygons: polygons.map((poly: any) => ({
            //   ...poly,
            //   screens: [...(poly.screens || [])],
            // })),
            polygons: [],
          },
        })
      );
    }
  };

  return (
    <div className="w-full h-full">
      {loadingAdvanceFilterData ? (
        <LoadingScreen />
      ) : (
        <div className="w-full">
          <div className="w-full h-full grid grid-cols-2 gap-4 pb-16">
            <div className="col-span-1 h-full pr-4">
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
                  setCircleRadius={setCircleRadius}
                  circleRadius={circleRadius}
                  setRouteRadius={setRouteRadius}
                  routeRadius={routeRadius}
                  userLocation={userLocation}
                  setUserLocation={setUserLocation}
                  allScreens={allScreens}
                  finalSelectedScreens={finalSelectedScreens}
                  handleFinalSelectedScreens={handleFinalSelectedScreens}
                  setDataBrand={setDataBrand}
                  setDataComp={setDataComp}
                  dataBrand={dataBrand}
                  dataComp={dataComp}
                  setCircleData={setCircleData}
                  setExcelFilteredScreens={setExcelFilteredScreens}
                  excelFilteredScreens={excelFilteredScreens}
                  routes={routes}
                  routeOrigin={routeOrigin}
                  setRouteOrigin={setRouteOrigin}
                  routeDestination={routeDestination}
                  setRouteDestination={setRouteDestination}
                  setRoutes={setRoutes}
                  setRouteFilteredScreens={setRouteFilteredScreens}
                  routeFilteredScreens={routeFilteredScreens}
                  polygons={polygons}
                  setPolygons={setPolygons}
                  polygonFilteredScreens={polygonFilteredScreens}
                  handleConfirmScreensSelections={
                    handleConfirmScreensSelections
                  }
                />
              )}
            </div>

            <div className="col-span-1 w-full py-2">
              {!loadingAdvanceFilterData && allScreens?.length > 0 && (
                <GoogleMapWithGeometry
                  userLocation={userLocation}
                  setUserLocation={setUserLocation}
                  allScreens={allScreens}
                  filteredScreens={finalSelectedScreens}
                  heatmap={advanceFilterData?.heatmap}
                  data={circleData}
                  circleRadius={circleRadius}
                  routeRadius={routeRadius}
                  routes={routes}
                  setRoutes={setRoutes}
                  routeFilteredScreens={routeFilteredScreens}
                  setRouteFilteredScreens={setRouteFilteredScreens}
                  handleFinalSelectedScreens={handleFinalSelectedScreens}
                  setPolygons={setPolygons}
                  polygons={polygons}
                  setPolygonFilteredScreens={setPolygonFilteredScreens}
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
