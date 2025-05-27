import React, { useEffect, useState, useCallback } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCampaignCreationsDetails } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import {
  getBasicDataForPlannerDashboard,
  getSiteMonitoringPicsPercentage,
  getSitesDataMapViewForPlannerDashboard,
} from "../../actions/dashboardAction";
import { BillingAndInvoice } from "./BillingAndInvoice";
import { GET_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

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
  const campaignId = pathname.split("/")[2] || "";

  const [aiInsight, setAiInsight] = useState<string>("");
  const [isAnalyzing, setIsAnalysing] = useState<boolean>(false);

  const [openInvoice, setOpenInvoice] = useState<any>(false);
  
  // State for filters
  const [filters, setFilters] = useState<{
    cities: FilterState;
    touchPoints: FilterState;
    screenTypes: FilterState;
    dayTypes: FilterState;
    timezones: FilterState;
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
    dayTypes: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    timezones: {
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
  } = useSelector((state: any) => state.campaignCreationsDetailsGet);

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

    dispatch(getCampaignCreationsDetails({ id: campaignId }));
    dispatch(getBasicDataForPlannerDashboard({ id: campaignId }));

    dispatch(getSiteMonitoringPicsPercentage({ id: campaignId }));
    dispatch(getSitesDataMapViewForPlannerDashboard({ id: campaignId }));
    // const interval = setInterval(fetchDashboardData, 300000); // 10 minutes

    // return () => clearInterval(interval);
  }, [dispatch, campaignId]);

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
        <p>{errorCampaignDetails?.data?.message || errorDashboard?.data.message}</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <BillingAndInvoice
        open={openInvoice}
        onClose={() => {
          setOpenInvoice(false);
          dispatch({
            type: GET_CLIENT_AGENCY_DETAILS_RESET,
          });
        }}
        pathname={pathname}
        campaignDetails={campaignDetails}
        siteLevelData={siteLevelData}
      />
      {!loadingCampaignDetails && campaignDetails ? (
        <CampaignDashboard
          pathname={pathname}
          loading={isLoading}
          campaignDetails={campaignDetails}
          screenLevelData={dashboardData}
          filters={filters}
          setFilters={setFilters}
          sitesDataMapViewData={sitesDataMapViewData}
          siteLevelData={siteLevelData}
          loadingSiteLevel={loadingSiteLevel}
          setOpenInvoice={setOpenInvoice}
          openInvoice={openInvoice}
        />
      ) : (
        <LoadingScreen />
      )}
      
    </div>
  );
};
