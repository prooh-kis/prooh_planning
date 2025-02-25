import React, { useEffect } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignDashboardData } from "../../actions/screenAction";
import { useLocation } from "react-router-dom";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";

export const CampaignDashboardPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId = pathname?.split("/")?.splice(-1)[0];

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading,
    error,
    success,
    data: campaignDetails,
  } = detailsToCreateCampaignAdd;

  const campaignDashboardDataGet = useSelector(
    (state: any) => state.campaignDashboardDataGet
  );
  const {
    loading: loadingDashboard,
    error: errorDashboard,
    data: dashboardData,
  } = campaignDashboardDataGet;

  useEffect(() => {
    dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    dispatch(getCampaignDashboardData({ id: campaignId }));

    const interval = setInterval(() => {
      dispatch(getCampaignDashboardData({ id: campaignId })); // Refresh data every 5 seconds
    }, 60000);
  
    return () => clearInterval(interval); 
  }, [dispatch, campaignId]);
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
          campaignDetails={campaignDetails}
          screenLevelData={dashboardData}
        />
      )}
    </div>
  );
};
