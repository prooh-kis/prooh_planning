import { useEffect, useState } from "react";
import { RadioInput } from "../../components/atoms/RadioInput";
import { CalendarScaleSlider } from "../../components/molecules/CalenderScaleSlider";
import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { formatNumber } from "../../utils/formatValue";
import { Divider } from "antd";
import { LinearBar } from "../../components/molecules/linearbar";
import { DashboardImpressionDetailsTable } from "../../components/tables/DashboardImpressionDetailsTable";

interface DashboardLinearStatusProps {
 campaignDetails?: any;
 screenLevelData?: any;
 show?: any;
 handleShow?: any;
 screenPerformance?: any;
 spotDelivery?: any;
}
export const DashboardLinearStatus = ({screenPerformance, spotDelivery, handleShow, show, campaignDetails, screenLevelData}: DashboardLinearStatusProps) => {
  return (
    <div className="">
       <div className="grid grid-cols-12 gap-4 py-2">
          <div className="col-span-3 flex items-center gap-2 px-2">
            <i className="fi fi-sr-daily-calendar flex items-center text-[14px] text-[#129BFF]"></i>
            <h1 className="text-[14px]">Campaign Duration</h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </div>
          <div className="col-span-8 pt-2">
            <CalendarScaleSlider
              days={screenLevelData?.["totalData"]?.durationPromised || 30}
              daysPlayed={screenLevelData?.["totalData"]?.durationDelivered || 2}
            />
          </div>
          <div className="col-span-1 pt-1">
            <p className="text-[12px] text-gray-400">
              {campaignDetails?.duration} Days
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 py-2">
          <div className="col-span-3 flex items-center gap-2 px-2">
            <i className="fi fi-br-target-audience flex items-center text-[14px] text-[#129BFF]"></i>
            <h1 className="text-[14px]">Audience Impressions</h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </div>
          <div className="col-span-8 pt-2 px-4">
            <MultiColorLinearBar
              showPercentage={false}
              values={[
                formatNumber(screenLevelData?.["totalData"]?.impressionsDelivered?.toFixed(0) || 0),
                0
              ]}
              colors={["","#129BFF"]}
              totalValue={screenLevelData?.["totalData"]?.impressionsPromised?.toFixed(0)}
            />
          </div>
          <div
            className="col-span-1 pt-1" 
            onClick={() => handleShow("audience")}          
          >
            <div className="flex gap-4 justify-between items-center pr-2">
              <p className="text-[12px] text-gray-400">
                {formatNumber(screenLevelData?.["totalData"]?.impressionsPromised?.toFixed(0) || 0)}
              </p>
              <i className="fi fi-ss-angle-down flex items-center text-gray-400 text-[12px]"></i>
            </div>
          </div>
        </div>
        {show["audience"] && (
          <div className="">
            <Divider />
            <div className="w-full">
              <div className="py-1 flex gap-2">
                <h1 className="text-[14px] font-semibold">Audience Impression Detailed View - </h1>
                <p className="text-[14px] text-[#129BFF]">{screenLevelData?.["totalData"]?.durationDelivered?.toFixed(0) || 1}</p>
              </div>
              <DashboardImpressionDetailsTable screenLevelData={screenLevelData} />
            </div>
            <Divider />
          </div>
        )}
        <div className="grid grid-cols-12 gap-4 py-2">
          <div className="col-span-3 flex items-center gap-2 px-2">
            <i className="fi fi-sr-dashboard flex items-center text-[14px] text-[#129BFF]"></i>
            <h1 className="text-[14px]">Screen Performance</h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </div>
          <div className="col-span-8 pt-2 px-4">
            <MultiColorLinearBar
              showPercentage={true}
              values={[
                screenLevelData?.["totalData"]?.screenPerformance?.toFixed(0),
                0
              ]}
              colors={["","#129BFF"]}
              totalValue={
                100
              }
            />
          </div>
          <div
            className="col-span-1 pt-1"
            onClick={() => handleShow("screen")}
          >
            <div className="flex gap-4 justify-between items-center pr-2">
              <p className="text-[12px] text-gray-400">
                100 %
                {/* {screenLevelData?.["totalData"]?.impressionsPromised.toFixed(0)} % */}
              </p>
              <i className="fi fi-ss-angle-down flex items-center text-gray-400 text-[12px]"></i>
            </div>
          </div>
        </div>
        {show["screen"] && (
          <div className="">
            <Divider />
            <div className="w-full">
              <div className="py-1 flex gap-2">
                <h1 className="text-[14px] font-semibold">Screen Performance Detailed View </h1>
                {/* <p className="text-[14px] text-[#129BFF]">{screenLevelData?.["totalData"]?.durationDelivered?.toFixed(0) || 1}</p> */}
              </div>
              {/* <DashboardBarChart label={"Screen Performance"}data={screenPerformance().countsArray} labels={screenPerformance().datesArray}/> */}
            </div>
            <Divider />
          </div>
        )}
        <div className="grid grid-cols-12 gap-4 py-2">
          <div className="col-span-3 flex items-center gap-2 px-2">
            <i className="fi fi-sr-computer flex items-center text-[14px] text-[#129BFF]" ></i>
            <h1 className="text-[14px]">Spot Delivery</h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </div>
          <div className="col-span-8 pt-2 px-4">
            <MultiColorLinearBar
              showPercentage={false}
              values={[
                screenLevelData?.["totalData"]?.slotsDelivered?.toFixed(0),
                0
              ]}
              colors={["","#129BFF"]}
              totalValue={screenLevelData?.["totalData"]?.slotsPromised?.toFixed(0)}
            />
          </div>
          <div
            className="col-span-1 pt-1"
            onClick={() => handleShow("spot")}
          >
            <div className="flex gap-4 justify-between items-center pr-2">
              <p className="text-[12px] text-gray-400">
                {formatNumber(screenLevelData?.["totalData"]?.slotsPromised?.toFixed(0) || 0)}
              </p>
              <i className="fi fi-ss-angle-down flex items-center text-gray-400 text-[12px]"></i>
            </div>
          </div>
        </div>
        {show["spot"] && (
          <div className="">
            <Divider />
            <div className="w-full">
              <div className="py-1 flex gap-2 ">
                <h1 className="text-[14px] font-semibold">Spot Delivery Detailed View </h1>
                {/* <p className="text-[14px] text-[#129BFF]">{screenLevelData?.["totalData"]?.durationDelivered?.toFixed(0) || 1}</p> */}
              </div>
              {/* <DashboardBarChart label={"Spot Delivery"} data={spotDelivery().countsArray} labels={spotDelivery().datesArray}/> */}
            </div>
            <Divider />
          </div>
        )}
        <div className="grid grid-cols-12 gap-4 py-2">
          <div className="col-span-3 flex items-center gap-2 px-2">
            <i className="fi fi-sr-sack flex items-center text-[14px] text-[#129BFF]"></i>
            <h1 className="text-[14px]">Cost Consumed</h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </div>
          <div className="col-span-8 pt-2 px-4">
            <MultiColorLinearBar
              showPercentage={false}
              values={[
                screenLevelData?.["totalData"]?.costConsumed?.toFixed(0)
              ]}
              colors={["","#129BFF"]}
              totalValue={screenLevelData?.["totalData"]?.costTaken?.toFixed(0)}
            />
          </div>
          <div className="col-span-1 pt-1">
            <p className="text-[12px] text-gray-400">
              &#8377;{formatNumber(screenLevelData?.["totalData"]?.costTaken?.toFixed(0) || 0)}
            </p>
          </div>
        </div>
      
    </div>
  )}