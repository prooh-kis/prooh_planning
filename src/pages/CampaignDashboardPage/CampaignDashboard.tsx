
import { CampaignDashboardTable } from '../../components/tables/CampaignDashboardTable';
import React, { useEffect, useState } from 'react';
import { DashboardFilters } from '../../components/segments/DashboardFilters';
import { convertDataTimeToLocale, getNumberOfDaysBetweenTwoDates } from '../../utils/dateAndTimeUtils';
import { CalendarScaleSlider } from '../../components/molecules/CalenderScaleSlider';
import { DashboardImpressionDetailsTable } from '../../components/tables/DashboardImpressionDetailsTable';
import { DashboardBarChart } from '../../components/segments/DashboardBarGraph';
import { DashboardPieChart } from '../../components/segments/DashboardPieChart';
import { formatNumber } from '../../utils/formatValue';
import { DashboardGrid } from '../../components/molecules/DashboardGrid';
import { EditCreativesForCampaigns } from './EditCreativesForCampaigns';

export const CampaignDashboard = ({campaignDetails, screenLevelData}: any) => {

  const [clicked, setClicked] = useState<any>("1");

  // const [openEdit, setOpenEdit] = useState<any>(false);

  const getScreenPerformanceData = () => {
    const datesArray = screenLevelData?.result["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.screenPerformance);

    return { datesArray, countsArray };

  }

  const getPromisedScreenPerformanceData = () => {
    const datesArray = screenLevelData?.result["totalData"]?.screenPerformanceDateWise?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result["totalData"]?.screenPerformanceDateWise?.map((slot: any) => 100);
    return { datesArray, countsArray };

  }

  const getSpotDeliveryData = () => {
    const datesArray = screenLevelData?.result["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.count);
    return { datesArray, countsArray };
  }

  const getPromisedSpotDeliveryData = () => {
    const datesArray = screenLevelData?.result["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.countPromised);
    return { datesArray, countsArray };
  }

  const getCostData = () => {
    const totalPerSlotCost = campaignDetails?.screenWiseSlotDetails.reduce((acc: any, { pricePerSlot }: any) => acc + pricePerSlot, 0);
    const avgPerSlotCost = totalPerSlotCost / campaignDetails?.screenWiseSlotDetails.length;

    const datesArray = screenLevelData?.result["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result["totalData"]?.slotsPlayedPerDay?.map((slot: any) => slot.count * 10);
    return { datesArray, countsArray };
  }

  return (
    <div className="w-full h-full pt-10 flex flex-col gap-2">
      {/* <EditCreativesForCampaigns
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        campaignCreation={campaignDetails}  
      /> */}
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
            <button className="col-span-1 border border-gray-100 rounded-[8px] p-2"
              // onClick={() => setOpenEdit(true)}
              onClick={() => {
                // if (campaignDetails?.campaignType === )
              }}
            >
              <i className="fi fi-br-pencil tex-[12px] flex items-center justify-center"></i>
            </button>
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
          <DashboardGrid type={"duration"} campaignDetails={campaignDetails} />
        </div>

        <div
          className={`col-span-1 bg-white p-4 border ${clicked === "2" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("2");
          }}
        >
          <DashboardGrid type={"audience"} screenLevelData={screenLevelData} />
        </div>

        <div
          className={`col-span-1 bg-white p-4 border ${clicked === "3" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("3");
          }}
        >
          <DashboardGrid type={"screen"} screenLevelData={screenLevelData} />
        </div>

        <div 
          className={`col-span-1 bg-white p-4 border ${clicked === "4" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("4");
          }}
        >
          <DashboardGrid type={"spot"} screenLevelData={screenLevelData} />
        </div>

        <div
          className={`col-span-1 bg-white p-4 border ${clicked === "5" ? "border-blue" : "border-gray-100"} rounded-[12px]`}
          onClick={() => {
            setClicked("5");
          }}
        >
          <DashboardGrid type={"cost"} screenLevelData={screenLevelData} />
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
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <DashboardPieChart type="city" data={screenLevelData?.audiencePerformanceData?.cityWise}/>
              </div>
              <div className="col-span-1">
                <DashboardPieChart type="touchpoint" data={screenLevelData?.audiencePerformanceData?.touchPointWise}/>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Audience Type Wise Impressions</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardImpressionDetailsTable screenLevelData={screenLevelData?.result} />
            </div>
          </div>
        </div>
      ) : clicked === "3" ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Screen Performance</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
              <div className="col-span-1">
                <DashboardPieChart type="city" data={screenLevelData?.screenPerformanceData?.cityWise}/>
              </div>
              <div className="col-span-1">
                <DashboardPieChart type="touchpoint" data={screenLevelData?.screenPerformanceData?.touchPointWise}/>
              </div>
            </div>
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
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Spot Delivery</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
              <div className="col-span-1">
                <DashboardPieChart type="city" data={screenLevelData?.spotDeliveryData?.cityWise}/>
              </div>
              <div className="col-span-1">
                <DashboardPieChart type="touchpoint" data={screenLevelData?.spotDeliveryData?.touchPointWise}/>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Day Wise Spot Delivered</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardBarChart total={`${screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(0)}/${screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0)}`} label={"Spot Delivery"} targetData={getPromisedSpotDeliveryData().countsArray} currentData={getSpotDeliveryData().countsArray} labels={getSpotDeliveryData().datesArray} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Spot Delivery</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-2 p-2">
              <div className="col-span-1">
                <DashboardPieChart type="city" data={screenLevelData?.costConsumedData?.cityWise}/>
              </div>
              <div className="col-span-1">
                <DashboardPieChart type="touchpoint" data={screenLevelData?.costConsumedData?.touchPointWise}/>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Day Wise Cost Consumed</h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardBarChart percent={false} bgColor="rgba(75, 192, 192, 0.5)" color="rgba(75, 192, 192, 1)" total={`${screenLevelData?.result?.totalData?.costConsumed?.toFixed(0)}/${screenLevelData?.result?.totalData?.costTaken?.toFixed(0)}`} label={"Cost Consumed"} currentData={getCostData().countsArray} labels={getCostData().datesArray} />
            </div>
          </div>
        </div>
      )}
      <div className="bg-white px-0 w-full border border-gray-100 rounded-[12px] flex justify-between px-2">
        <div className="w-full">
          {/* ICON */}
          <h1 className="text-[16px] p-2 font-semibold">Site Level Performance</h1>
          <CampaignDashboardTable campaignDetails={campaignDetails} screenLevelData={screenLevelData?.result} />
        </div>
      </div>
    </div>
  );
};
