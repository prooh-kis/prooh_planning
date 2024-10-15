import React, { useEffect } from 'react';
import { CampaignDashboard } from './CampaignDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaignDashboardData } from '../../actions/screenAction';
import { useLocation } from 'react-router-dom';
import { addDetailsToCreateCampaign } from '../../actions/campaignAction';

export const CampaignDashboardPage: React.FC = () => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation(); 
  const campaignId = pathname?.split("/")?.splice(-1)[0];

  const detailsToCreateCampaignAdd = useSelector((state: any) => state.detailsToCreateCampaignAdd);
  const {
    loading, error, success, data: campaignDetails
  } = detailsToCreateCampaignAdd;

  const campaignDashboardDataGet = useSelector((state: any) => state.campaignDashboardDataGet);
  const {
    loading: loadingDashboard,
    error: errorDashboard,
    data: dashboardData,
  } = campaignDashboardDataGet;

  useEffect(() => {
    dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    dispatch(getCampaignDashboardData({ id: campaignId }));
  },[dispatch]);
  return (
    <div className="w-full h-full">
      {loading || loadingDashboard ? (
        <h1>Loading...</h1>
      ) : error || errorDashboard ? (
        <p>{error}</p>
      ) : (
        <CampaignDashboard campaignDetails={campaignDetails} screenLevelData={dashboardData}/>
      )}
    </div>
  );
};
