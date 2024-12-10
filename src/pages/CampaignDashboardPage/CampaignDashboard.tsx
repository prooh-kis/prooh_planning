
import { CampaignDashboardTable } from '../../components/tables/CampaignDashboardTable';
import React, { useEffect, useState } from 'react';
import { DashboardLinearStatus } from '../../components/segments/DashboardLinearStatus';
import { DashboardFilters } from '../../components/segments/DashboardFilters';
import { convertDataTimeToLocale } from '../../utils/dateAndTimeUtils';

export const CampaignDashboard = ({campaignDetails, screenLevelData}: any) => {

  const getScreenPerformanceData = () => {
    const datesArray = screenLevelData["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.date);
    const countsArray = screenLevelData["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.screenPerformance * 100);
    return { datesArray, countsArray };

  }

  const getSpotDeliveryData = () => {
    const datesArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.count);
    return { datesArray, countsArray };
  }

  const [show, setShow] = useState<any>({
    "audience": false,
    "screen": false,
    "spot": false,
  });

  const handleShow = (input: any) => {
    setShow((prev: any) => ({
      ...prev,
      [input]: !prev[input],
  }));
    console.log(show);
    
  }

  return (
    <div className="w-full h-full pt-10 flex flex-col gap-2">
      <div className="bg-white p-2 border rounded-[12px] flex justify-between">
        <div className="px-2 w-1/2 flex justify-between items-center">
          <div>
            <h1 className="text-[14px] font-semibold">{campaignDetails?.name}</h1>
            <p className="text-[12px]">{campaignDetails?.brandName}</p>
          </div>
          <div>
            <h1 className="text-[14px] font-semibold">
              {convertDataTimeToLocale(campaignDetails?.startDate)}
            </h1>
            <p className="text-[12px]">Start Date</p>

          </div>
          <div>
            <h1 className="text-[14px] font-semibold">
              {convertDataTimeToLocale(campaignDetails?.endDate)}
            </h1>
            <p className="text-[12px]">End Date</p>

          </div>
        </div>
        <DashboardFilters /> 
      </div>
      <div className="bg-white p-2 rounded-[12px] border">
       <DashboardLinearStatus
        show={show}
        handleShow={handleShow}
        campaignDetails={campaignDetails}
        screenLevelData={screenLevelData}
        screenPerformance={getScreenPerformanceData}
        spotDelivery={getSpotDeliveryData}
      />
      </div>
      <div className="bg-white px-0 w-full border rounded-[12px] flex justify-between">
        <div className="w-full">
          {/* ICON */}
          <h1 className="text-[16px] p-2 font-semibold">Site Level Performance</h1>
          <CampaignDashboardTable campaignDetails={campaignDetails} screenLevelData={screenLevelData} />
        </div>
      </div>
    </div>
  );
};
