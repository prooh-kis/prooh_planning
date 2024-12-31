
import { CampaignDashboardTable } from '../../components/tables/CampaignDashboardTable';
import React, { useEffect, useState } from 'react';
import { DashboardLinearStatus } from '../../components/segments/DashboardLinearStatus';
import { DashboardFilters } from '../../components/segments/DashboardFilters';
import { convertDataTimeToLocale, getNumberOfDaysBetweenTwoDates } from '../../utils/dateAndTimeUtils';
import { LinearBar } from '../../components/molecules/linearbar';
import { MultiColorLinearBar2 } from '../../components/molecules/MultiColorLinearBar2';
import { CalendarScaleSlider } from '../../components/molecules/CalenderScaleSlider';
import { DashboardImpressionDetailsTable } from '../../components/tables/DashboardImpressionDetailsTable';
import { DashboardBarChart } from '../../components/segments/DashboardBarGraph';

export const CampaignDashboard = ({campaignDetails, screenLevelData}: any) => {

  const [clicked, setClicked] = useState<any>("1");

  const getScreenPerformanceData = () => {
    const datesArray = screenLevelData["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.date);
    const countsArray = screenLevelData["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.screenPerformance);
    return { datesArray, countsArray };

  }

  const getPromisedScreenPerformanceData = () => {
    const datesArray = screenLevelData["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.date);
    const countsArray = screenLevelData["totalData"]?.screenPerformanceDateWise?.map((slot: any) => 100);
    return { datesArray, countsArray };

  }

  const getSpotDeliveryData = () => {
    const datesArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.count);
    return { datesArray, countsArray };
  }

  const getPromisedSpotDeliveryData = () => {
    const datesArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.countPromised);
    return { datesArray, countsArray };
  }

  const getCostData = () => {
    const totalPerSlotCost = campaignDetails?.screenWiseSlotDetails.reduce((acc: any, { pricePerSlot }: any) => acc + pricePerSlot, 0);
    const avgPerSlotCost = totalPerSlotCost / campaignDetails?.screenWiseSlotDetails.length;

    const datesArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.count * 10);
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

  console.log(screenLevelData?.totalData?.impressionsDelivered?.toFixed(0));
  return (
    <div className="w-full h-full pt-10 flex flex-col gap-2">
      <div className="bg-white p-2 rounded-[12px] flex justify-between">
        <div className="px-2 w-1/2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo">
              <h1 className="text-[24px] font-bold text-white">G</h1>
            </div>
            <div className="w-full">
              <h1 className="text-[14px] font-semibold">{campaignDetails?.name}</h1>
              <p className="text-[12px]">{campaignDetails?.brandName}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-1/2 gap-2">
          <DashboardFilters campaignDetails={campaignDetails} /> 
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1 border border-gray-100 rounded-[8px] p-2">
              <i className="fi fi-br-pencil tex-[12px] flex items-center justify-center"></i>
            </div>
            <div className="col-span-1 border border-gray-100 rounded-[8px] p-2">
              <i className="fi fi-rr-newspaper text-[16px] flex items-center justify-center"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <div
          className={`col-span-1 bg-white p-4 border ${clicked === "1" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("1");
          }}  
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-violetbg p-2">
              <i className="fi fi-rr-calendar text-violet lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Campaign Duration</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-400">
              <span className="text-gray-900">
                {getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date())}
              </span> / {campaignDetails?.duration}
            </h1>
          </div>
          <div className="p-2">
            <LinearBar
              value={getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date())}
              colors={["#F3F3F3", "#7AB3A2"]}
              highest={campaignDetails?.duration}
              percent={false}
            />
          </div>
          
        </div>

        <div
          className={`col-span-1 bg-white p-4 border ${clicked === "2" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("2");
          }}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-bluebg p-2">
              <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Audience Impressions</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">{screenLevelData?.totalData?.impressionsDelivered?.toFixed(0)}</h1>
          </div>
          <div className="p-2">
            <MultiColorLinearBar2
              delivered={screenLevelData?.totalData?.impressionsDelivered?.toFixed(0)}
              expected={screenLevelData?.totalData?.impressionsPromised?.toFixed(0) * getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date()) / campaignDetails?.duration}
              total={screenLevelData?.totalData?.impressionsPromised?.toFixed(0)}
            />
          </div>
        </div>

        <div
          className={`col-span-1 bg-white p-4 border ${clicked === "3" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("3");
          }}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-purple-100 p-2">
              <i className="fi fi-rs-dashboard text-purple-500 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Screen Performance</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">{screenLevelData?.totalData?.screenPerformance?.toFixed(0)}%</h1>
          </div>
          <div className="p-2">
            <LinearBar
              value={screenLevelData?.totalData?.screenPerformance?.toFixed(0)}
              colors={["#F3F3F3", "#7AB3A2"]}
              highest={100}
            />
          </div>
        </div>

        <div 
          className={`col-span-1 bg-white p-4 border ${clicked === "4" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("4");
          }}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-indigobg p-2">
              <i className="fi fi-rs-selling text-indigo lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Spot Delivery</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">{screenLevelData?.totalData?.slotsDelivered?.toFixed(0)}</h1>
          </div>
          <div className="p-2">
            <MultiColorLinearBar2
              delivered={screenLevelData?.totalData?.slotsDelivered?.toFixed(0)}
              expected={screenLevelData?.totalData?.slotsPromised?.toFixed(0) * getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date()) / campaignDetails?.duration}
              total={screenLevelData?.totalData?.slotsPromised?.toFixed(0)}
            />
          </div>
          
        </div>

        <div
          className={`col-span-1 bg-white p-4 border ${clicked === "5" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("5");
          }}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-greenbg p-2">
              <i className="fi fi-br-sack text-green lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Cost Consumed</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">{screenLevelData?.totalData?.costConsumed?.toFixed(0)}</h1>
          </div>
          <div className="p-2">
            <LinearBar
              percent={false}
              value={screenLevelData?.totalData?.costConsumed?.toFixed(0)}
              colors={["#F3F3F3", "#7AB3A2"]}
              highest={screenLevelData?.totalData?.costTaken?.toFixed(0)}
            />
          </div>
          
        </div>
      </div>
      {clicked === "1" ? (
        <div className="bg-white py-4 rounded-[12px] border border-gray-100">
          <div className="flex items-center gap-2 px-4">
            <div className="rounded-full bg-violetbg p-2">
              <i className="fi fi-rr-calendar text-violet lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Campaign Duration</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="pt-8 pb-4 px-2">
            <CalendarScaleSlider
              days={getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, campaignDetails?.endDate)}
              daysPlayed={getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date())}
            />
          </div>
        </div>
      ) : clicked === "2" ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Audience Impressions</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="col-span-3 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Audience Type Wise Impressions</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardImpressionDetailsTable screenLevelData={screenLevelData} />
            </div>
          </div>
        </div>
      ) : clicked === "3" ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-white py-4 rounded-[12px] border border-gray-100">
          
          </div>
          <div className="col-span-3 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Day Wise Screen Performance</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardBarChart total={"100 %"} label={"Screen Performance"} targetData={getPromisedScreenPerformanceData().countsArray} currentData={getScreenPerformanceData().countsArray} labels={getScreenPerformanceData().datesArray} />
            </div>
          </div>
        </div>
      ) : clicked === "4" ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-white py-4 rounded-[12px] border border-gray-100">

          </div>
          <div className="col-span-3 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Day Wise Spot Delivered</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardBarChart total={`${screenLevelData?.totalData?.slotsDelivered?.toFixed(0)}/${screenLevelData?.totalData?.slotsPromised?.toFixed(0)}`} label={"Spot Delivery"} targetData={getPromisedSpotDeliveryData().countsArray} currentData={getSpotDeliveryData().countsArray} labels={getSpotDeliveryData().datesArray} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-white py-4 rounded-[12px] border border-gray-100"></div>
          <div className="col-span-3 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Day Wise Cost Consumed</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardBarChart bgColor="rgba(75, 192, 192, 0.5)" color="rgba(75, 192, 192, 1)" total={`${screenLevelData?.totalData?.costConsumed?.toFixed(0)}/${screenLevelData?.totalData?.costTaken?.toFixed(0)}`} label={"Cost Consumed"} currentData={getCostData().countsArray} labels={getCostData().datesArray} />
            </div>
          </div>
        </div>
      )}
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
