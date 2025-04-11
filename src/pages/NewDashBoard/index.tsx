import React, { useEffect, useState } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import {
  getAudienceDataForPlannerDashboard,
  getBasicDataForPlannerDashboard,
  getCostDataForPlannerDashboard,
  getHardwarePerformanceDataForPlannerDashboard,
  getSiteLevelPerformanceForPlannerDashboard,
  getSpotDeliveryDataForPlannerDashboard,
  getSiteMonitoringPicsPercentage,
  getSitesDataMapViewForPlannerDashboard,
} from "../../actions/dashboardAction";

export const NewDashBoard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId = pathname?.split("/")?.splice(-1)[0];

  const [cities, setCities] = useState<any>({
    "audience":[],
    "screenPerformance": [],
    "spotDelivery": [],
    "costConsumption": [],
    "siteLevel": [],
  });
  const [touchPoints, setTouchponints] = useState<any>({
    "audience":[],
    "screenPerformance": [],
    "spotDelivery": [],
    "costConsumption": [],
    "siteLevel": [],
  });
  const [screenTypes, setScreenTypes] = useState<any>({
    "audience":[],
    "screenPerformance": [],
    "spotDelivery": [],
    "costConsumption": [],
    "siteLevel": [],
  });


  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading,
    error,
    success,
    data: campaignDetails,
  } = detailsToCreateCampaignAdd;

  const basicDataForPlannerDashboard = useSelector(
    (state: any) => state.basicDataForPlannerDashboard
  );
  const {
    loading: loadingDashboard,
    error: errorDashboard,
    data: dashboardData,
  } = basicDataForPlannerDashboard;

  const audienceDataForPlannerDashboard = useSelector(
    (state: any) => state.audienceDataForPlannerDashboard
  );
  const {
    loading: loadingAudienceData,
    error: errorAudienceData,
    data: audienceData,
  } = audienceDataForPlannerDashboard;

  const hardwarePerformanceDataForPlannerDashboard = useSelector(
    (state: any) => state.hardwarePerformanceDataForPlannerDashboard
  );
  const {
    loading: loadingHardwarePerformanceData,
    error: errorHardwarePerformanceData,
    data: hardwarePerformanceData,
  } = hardwarePerformanceDataForPlannerDashboard;

  const spotDeliveryDataForPlannerDashboard = useSelector(
    (state: any) => state.spotDeliveryDataForPlannerDashboard
  );
  const {
    loading: loadingSpotData,
    error: errorSpotData,
    data: spotData,
  } = spotDeliveryDataForPlannerDashboard;

  const costDataForPlannerDashboard = useSelector(
    (state: any) => state.costDataForPlannerDashboard
  );
  const {
    loading: loadingCostData,
    error: errorCostData,
    data: costData,
  } = costDataForPlannerDashboard;

  const siteLevelPerformanceForPlannerDashboard = useSelector(
    (state: any) => state.siteLevelPerformanceForPlannerDashboard
  );
  const {
    loading: loadingSiteLevel,
    error: errorSiteLevel,
    data: siteLevelData,
  } = siteLevelPerformanceForPlannerDashboard;

  const sitesDataMapViewForPlannerDashboard = useSelector(
    (state: any) => state.sitesDataMapViewForPlannerDashboard
  );
  const {
    loading: loadingSitesDataMapView,
    error: errorSitesDataMapView,
    data: sitesDataMapViewData,
  } = sitesDataMapViewForPlannerDashboard;

  console.log("sitesDataMapViewData : ", sitesDataMapViewData);

  useEffect(() => {
    removeAllKeyFromLocalStorage();
    dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    dispatch(getBasicDataForPlannerDashboard({ id: campaignId }));
    dispatch(
      getAudienceDataForPlannerDashboard({
        id: campaignId,
        cities: cities["audience"],
        touchPoints: touchPoints["audience"], 
        screenTypes: screenTypes["audience"]
      })
    );
    dispatch(
      getHardwarePerformanceDataForPlannerDashboard({
        id: campaignId,
        cities: cities["screenPerformance"],
        touchPoints: touchPoints["screenPerformance"], 
        screenTypes: screenTypes["screenPerformance"]
      })
    );
    dispatch(
      getSpotDeliveryDataForPlannerDashboard({
        id: campaignId,
        cities: cities["spotDelivery"],
        touchPoints: touchPoints["spotDelivery"], 
        screenTypes: screenTypes["spotDelivery"]
      })
    );
    dispatch(
      getCostDataForPlannerDashboard({
        id: campaignId,
        cities: cities["costConsumption"],
        touchPoints: touchPoints["costConsumption"], 
        screenTypes: screenTypes["costConsumption"]
      })
    );
    dispatch(
      getSiteLevelPerformanceForPlannerDashboard({
        id: campaignId,
        cities: cities["siteLevel"],
        touchPoints: touchPoints["siteLevel"],
        screenTypes: screenTypes["siteLevel"],
      })
    );
    dispatch(getSiteMonitoringPicsPercentage({ id: campaignId }));
    dispatch(getSitesDataMapViewForPlannerDashboard({ id: campaignId }));
    const interval = setInterval(() => {
      dispatch(getBasicDataForPlannerDashboard({ id: campaignId })); // Refresh data every 5 seconds
      dispatch(
        getAudienceDataForPlannerDashboard({
          id: campaignId,
          cities: cities["audience"],
          touchPoints: touchPoints["audience"], 
          screenTypes: screenTypes["audience"]
        })
      );
      dispatch(
        getHardwarePerformanceDataForPlannerDashboard({
          id: campaignId,
          cities: cities["screenPerformance"],
          touchPoints: touchPoints["screenPerformance"], 
          screenTypes: screenTypes["screenPerformance"]
        })
      );
      dispatch(
        getSpotDeliveryDataForPlannerDashboard({
          id: campaignId,
          cities: cities["spotDelivery"],
          touchPoints: touchPoints["spotDelivery"], 
          screenTypes: screenTypes["spotDelivery"]
        })
      );
      dispatch(
        getCostDataForPlannerDashboard({
          id: campaignId,
          cities: cities["costConsumption"],
          touchPoints: touchPoints["costConsumption"], 
          screenTypes: screenTypes["costConsumption"]
        })
      );
      dispatch(
        getSiteLevelPerformanceForPlannerDashboard({
          id: campaignId,
          cities: cities["siteLevel"],
          touchPoints: touchPoints["siteLevel"],
          screenTypes: screenTypes["siteLevel"],
        })
      );
      getSiteMonitoringPicsPercentage({ id: campaignId });
      getSitesDataMapViewForPlannerDashboard({ id: campaignId });
    }, 600000);

    return () => clearInterval(interval);
  }, [dispatch, campaignId, cities, touchPoints, screenTypes]);

  useEffect(() => {
    if (spotData && (cities["spotDelivery"].length == 0 || touchPoints["spotDelivery"].length == 0 || screenTypes["spotDelivery"].length == 0)) {
      setCities((pre: any) => {
        return {
          ...pre,
          "spotDelivery": Object.keys(spotData.cityWiseData)
        }
      });
      setTouchponints((pre: any) => {
        return {
          ...pre,
          "spotDelivery": Object.keys(spotData.touchPointWiseData)
        }
      });
      setScreenTypes((pre: any) => {
        return {
          ...pre,
          "spotDelivery": Object.keys(spotData.screenTypeWiseData),
        }
      });
    }

  },[cities, screenTypes, setCities, setScreenTypes, setTouchponints, spotData, touchPoints]);

  return (
    <div className="w-full h-full">
      {loading || loadingDashboard ? (
        <div>
          <div className="h-[10vh] w-full border rounded-[12px] mt-10">
            <SkeletonLoader />
          </div>
          <div className="h-[20vh] w-full border rounded-[12px] mt-2">
            <SkeletonLoader />
          </div>
          <div className="h-[40vh] w-full border rounded-[12px] mt-2">
            <SkeletonLoader />
          </div>
        </div>
      ) : error || errorDashboard ? (
        <div className="h-[20vh] w-full border rounded-[12px] mt-10">
          <p>{error}</p>
        </div>
      ) : (
        <CampaignDashboard
          loading={loading || loadingDashboard}
          campaignDetails={campaignDetails}
          screenLevelData={dashboardData}
          siteLevelData={siteLevelData}
          audienceData={audienceData}
          hardwarePerformanceData={hardwarePerformanceData}
          spotData={spotData}
          costData={costData}
          cities={cities}
          setCities={setCities}
          touchPoints={touchPoints}
          setTouchponints={setTouchponints}
          screenTypes={screenTypes}
          setScreenTypes={setScreenTypes}
        />
      )}
    </div>
  );
};
