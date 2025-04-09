import React, { useEffect, useState } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import {
  getBasicDataForPlannerDashboard,
  getCostDataForPlannerDashboard,
  getSiteLevelPerformanceForPlannerDashboard,
  getSpotDeliveryDataForPlannerDashboard,
} from "../../actions/dashboardAction";

export const NewDashBoard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId = pathname?.split("/")?.splice(-1)[0];

  const [cities, setCities] = useState<any>([]);
  const [touchPoints, setTouchponints] = useState<any>([]);
  const [screenTypes, setScreenTypes] = useState<any>([]);


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

  const spotDeliveryDataForPlannerDashboard = useSelector((state: any) => state.spotDeliveryDataForPlannerDashboard);
  const {
    loading: loadingSpotData,
    error: errorSpotData,
    data: spotData,
  } = spotDeliveryDataForPlannerDashboard;

  const costDataForPlannerDashboard = useSelector((state: any) => state.costDataForPlannerDashboard);
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

  useEffect(() => {
    removeAllKeyFromLocalStorage();
    dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    dispatch(getBasicDataForPlannerDashboard({ id: campaignId }));
    dispatch(
      getSpotDeliveryDataForPlannerDashboard({
        id: campaignId,
        cities: cities,
        touchPoints: touchPoints, 
        screenTypes: screenTypes
      })
    );
    dispatch(
      getCostDataForPlannerDashboard({
        id: campaignId,
        cities: cities,
        touchPoints: touchPoints, 
        screenTypes: screenTypes
      })
    );
    dispatch(
      getSiteLevelPerformanceForPlannerDashboard({
        id: campaignId,
        cities: cities,
        touchPoints: touchPoints,
        screenTypes: screenTypes,
      })
    );

    const interval = setInterval(() => {
      dispatch(getBasicDataForPlannerDashboard({ id: campaignId })); // Refresh data every 5 seconds
      // dispatch(getSpotDeliveryDataForPlannerDashboard({
      //   id: campaignId,
      //   cities: cities,
      //   touchPoints: touchPoints, 
      //   screenTypes: screenTypes
      // }));
      dispatch(
        getSiteLevelPerformanceForPlannerDashboard({
          id: campaignId,
          cities: cities,
          touchPoints: touchPoints,
          screenTypes: screenTypes,
        })
      );
    }, 600000);

    return () => clearInterval(interval);
  }, [dispatch, campaignId, cities, touchPoints, screenTypes]);

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
          spotData={spotData}
          costData={costData}
        />
      )}
    </div>
  );
};
