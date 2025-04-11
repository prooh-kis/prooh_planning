import React, { useEffect, useState, useCallback } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
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

interface FilterState {
  audience: string[];
  screenPerformance: string[];
  spotDelivery: string[];
  costConsumption: string[];
  siteLevel: string[];
}

export const NewDashBoard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId = pathname.split("/").pop() || "";
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // State for filters
  const [filters, setFilters] = useState<{
    cities: FilterState;
    touchPoints: FilterState;
    screenTypes: FilterState;
  }>({
    cities: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    touchPoints: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    screenTypes: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
  });

  // Selectors for Redux state
  const {
    loading: loadingCampaignDetails,
    error: errorCampaignDetails,
    data: campaignDetails,
  } = useSelector((state: any) => state.detailsToCreateCampaignAdd);

  const {
    loading: loadingDashboard,
    error: errorDashboard,
    data: dashboardData,
  } = useSelector((state: any) => state.basicDataForPlannerDashboard);

  const { loading: loadingAudienceData, data: audienceData } = useSelector(
    (state: any) => state.audienceDataForPlannerDashboard
  );

  const {
    loading: loadingHardwarePerformanceData,
    data: hardwarePerformanceData,
  } = useSelector(
    (state: any) => state.hardwarePerformanceDataForPlannerDashboard
  );

  const { loading: loadingSpotData, data: spotData } = useSelector(
    (state: any) => state.spotDeliveryDataForPlannerDashboard
  );

  const { loading: loadingCostData, data: costData } = useSelector(
    (state: any) => state.costDataForPlannerDashboard
  );

  const { loading: loadingSiteLevel, data: siteLevelData } = useSelector(
    (state: any) => state.siteLevelPerformanceForPlannerDashboard
  );

  const { loading: loadingSitesDataMapView, data: sitesDataMapViewData } =
    useSelector((state: any) => state.sitesDataMapViewForPlannerDashboard);

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(() => {
    if (isPopupOpen) return; // Don't refresh if popup is open

    const commonParams = { id: campaignId };

    dispatch(addDetailsToCreateCampaign(commonParams));
    dispatch(getBasicDataForPlannerDashboard(commonParams));

    dispatch(
      getAudienceDataForPlannerDashboard({
        ...commonParams,
        cities: filters.cities.audience,
        touchPoints: filters.touchPoints.audience,
        screenTypes: filters.screenTypes.audience,
      })
    );

    dispatch(
      getHardwarePerformanceDataForPlannerDashboard({
        ...commonParams,
        cities: filters.cities.screenPerformance,
        touchPoints: filters.touchPoints.screenPerformance,
        screenTypes: filters.screenTypes.screenPerformance,
      })
    );

    dispatch(
      getSpotDeliveryDataForPlannerDashboard({
        ...commonParams,
        cities: filters.cities.spotDelivery,
        touchPoints: filters.touchPoints.spotDelivery,
        screenTypes: filters.screenTypes.spotDelivery,
      })
    );

    dispatch(
      getCostDataForPlannerDashboard({
        ...commonParams,
        cities: filters.cities.costConsumption,
        touchPoints: filters.touchPoints.costConsumption,
        screenTypes: filters.screenTypes.costConsumption,
      })
    );

    dispatch(
      getSiteLevelPerformanceForPlannerDashboard({
        ...commonParams,
        cities: filters.cities.siteLevel,
        touchPoints: filters.touchPoints.siteLevel,
        screenTypes: filters.screenTypes.siteLevel,
      })
    );

    dispatch(getSiteMonitoringPicsPercentage(commonParams));
    dispatch(getSitesDataMapViewForPlannerDashboard(commonParams));
    console.log("fetch call completed", new Date());
  }, [campaignId, dispatch, filters, isPopupOpen]);

  // Initialize filters based on spot data
  useEffect(() => {
    if (spotData && !filters.cities.spotDelivery.length) {
      setFilters((prev) => ({
        ...prev,
        cities: {
          ...prev.cities,
          spotDelivery: Object.keys(spotData.cityWiseData),
        },
        touchPoints: {
          ...prev.touchPoints,
          spotDelivery: Object.keys(spotData.touchPointWiseData),
        },
        screenTypes: {
          ...prev.screenTypes,
          spotDelivery: Object.keys(spotData.screenTypeWiseData),
        },
      }));
    }
  }, [spotData, filters.cities.spotDelivery.length]);

  // Set up initial data fetch and refresh interval
  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 300000); // 10 minutes

    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const handlePopupToggle = (isOpen: boolean) => {
    setIsPopupOpen(isOpen);
  };

  const isLoading = loadingCampaignDetails || loadingDashboard;
  const hasError = errorCampaignDetails || errorDashboard;

  if (isLoading) {
    return (
      <div className="w-full h-full space-y-2">
        <div className="h-[10vh] w-full border rounded-[12px] mt-10">
          <SkeletonLoader />
        </div>
        <div className="h-[20vh] w-full border rounded-[12px]">
          <SkeletonLoader />
        </div>
        <div className="h-[40vh] w-full border rounded-[12px]">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="h-[20vh] w-full border rounded-[12px] mt-10">
        <p>{errorCampaignDetails || errorDashboard}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <CampaignDashboard
        loading={isLoading}
        campaignDetails={campaignDetails}
        screenLevelData={dashboardData}
        siteLevelData={siteLevelData}
        audienceData={audienceData}
        hardwarePerformanceData={hardwarePerformanceData}
        spotData={spotData}
        costData={costData}
        cities={filters.cities}
        setCities={(type: string, values: string) =>
          setFilters((prev) => ({
            ...prev,
            cities: { ...prev.cities, [type]: values },
          }))
        }
        touchPoints={filters.touchPoints}
        setTouchPoints={(type: string, values: string) =>
          setFilters((prev) => ({
            ...prev,
            touchPoints: { ...prev.touchPoints, [type]: values },
          }))
        }
        screenTypes={filters.screenTypes}
        setScreenTypes={(type: string, values: string) =>
          setFilters((prev) => ({
            ...prev,
            screenTypes: { ...prev.screenTypes, [type]: values },
          }))
        }
        sitesDataMapViewData={sitesDataMapViewData}
        onPopupToggle={handlePopupToggle}
      />
    </div>
  );
};
