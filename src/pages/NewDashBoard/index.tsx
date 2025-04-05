import React, { useEffect } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { getBasicDataForPlannerDashboard } from "../../actions/dashboardAction";

export const NewDashBoard: React.FC = () => {
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

  const basicDataForPlannerDashboard = useSelector(
    (state: any) => state.basicDataForPlannerDashboard
  );
  const {
    loading: loadingDashboard,
    error: errorDashboard,
    data: dashboardData,
  } = basicDataForPlannerDashboard;

  console.log("dashboardData : ", dashboardData);

  useEffect(() => {
    removeAllKeyFromLocalStorage();
    dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    dispatch(getBasicDataForPlannerDashboard({ id: campaignId }));

    const interval = setInterval(() => {
      dispatch(getBasicDataForPlannerDashboard({ id: campaignId })); // Refresh data every 5 seconds
    }, 600000);

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
