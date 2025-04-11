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

  const { loading: loadingSiteLevel, data: siteLevelData } = useSelector(
    (state: any) => state.siteLevelPerformanceForPlannerDashboard
  );

  const { loading: loadingSitesDataMapView, data: sitesDataMapViewData } =
    useSelector((state: any) => state.sitesDataMapViewForPlannerDashboard);

  // Set up initial data fetch and refresh interval
  useEffect(() => {
    // fetchDashboardData();

    dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    dispatch(getBasicDataForPlannerDashboard({ id: campaignId }));

    dispatch(getSiteMonitoringPicsPercentage({ id: campaignId }));
    dispatch(getSitesDataMapViewForPlannerDashboard({ id: campaignId }));
    // const interval = setInterval(fetchDashboardData, 300000); // 10 minutes

    // return () => clearInterval(interval);
  }, [dispatch, campaignId]);

  const handlePopupToggle = (isOpen: boolean) => {
    setIsPopupOpen(isOpen);
  };

  const isLoading = loadingCampaignDetails || loadingDashboard;
  const hasError = errorCampaignDetails || errorDashboard;

  if (loadingCampaignDetails) {
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
        // audienceData={audienceData}
        // hardwarePerformanceData={hardwarePerformanceData}
        // spotData={spotData}
        // costData={costData}
        filters={filters}
        setFilters={setFilters}
        // cities={filters.cities}
        // setCities={(type: string, values: string) =>
        //   setFilters((prev) => ({
        //     ...prev,
        //     cities: { ...prev.cities, [type]: values },
        //   }))
        // }
        // touchPoints={filters.touchPoints}
        // setTouchPoints={(type: string, values: string) =>
        //   setFilters((prev) => ({
        //     ...prev,
        //     touchPoints: { ...prev.touchPoints, [type]: values },
        //   }))
        // }
        // screenTypes={filters.screenTypes}
        // setScreenTypes={(type: string, values: string) =>
        //   setFilters((prev) => ({
        //     ...prev,
        //     screenTypes: { ...prev.screenTypes, [type]: values },
        //   }))
        // }
        sitesDataMapViewData={sitesDataMapViewData}
        onPopupToggle={handlePopupToggle}
      />
    </div>
  );
};
