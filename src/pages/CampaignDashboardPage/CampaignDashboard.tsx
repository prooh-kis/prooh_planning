import { CampaignDashboardTable } from "../../components/tables/CampaignDashboardTable";
import React, { useState } from "react";
import { DashboardFilters } from "../../components/segments/DashboardFilters";
import {
  calculateDaysPlayed,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import { CalendarScaleSlider } from "../../components/molecules/CalenderScaleSlider";
import { DashboardImpressionDetailsTable } from "../../components/tables/DashboardImpressionDetailsTable";
import { DashboardBarChart } from "../../components/segments/DashboardBarGraph";
import { DashboardPieChart } from "../../components/segments/DashboardPieChart";
import { DashboardGrid } from "../../components/molecules/DashboardGrid";
import { useNavigate } from "react-router-dom";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";
import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { BillingAndInvoice } from "./BillingAndInvoice";

export const CampaignDashboard = ({
  campaignDetails,
  screenLevelData,
}: any) => {
  const [clicked, setClicked] = useState<any>("1");
  const navigate = useNavigate();

  const [openInvoice, setOpenInvoice] = useState<any>(false);
  const [poNumber, setPoNumber] = useState<any>("");
  const [clientAgencyName, setClientAgencyName] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [stateName, setStateName] = useState<any>("");
  const [country, setCountry] = useState<any>("");
  const [zipCode, setZipCode] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [website, setWebsite] = useState<any>("");
  const [gst, setGst] = useState<any>("");
  const [pan, setPan] = useState<any>("");
  const [pocName, setPocName] = useState<any>("");
  const [pocContact, setPocContact] = useState<any>("");
  const [pocEmail, setPocEmail] = useState<any>("");
  const [pocDesignation, setPocDesignation] = useState<any>("");


  const getScreenPerformanceData = () => {
    const datesArray = screenLevelData?.result[
      "totalData"
    ]?.screenPerformanceDateWise?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result[
      "totalData"
    ]?.screenPerformanceDateWise?.map((slot: any) => slot.screenPerformance);

    return { datesArray, countsArray };
  };

  const getPromisedScreenPerformanceData = () => {
    const datesArray = screenLevelData?.result[
      "totalData"
    ]?.screenPerformanceDateWise?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result[
      "totalData"
    ]?.screenPerformanceDateWise?.map((slot: any) => 100);
    return { datesArray, countsArray };
  };

  const getSpotDeliveryData = () => {
    const datesArray = screenLevelData?.result[
      "totalData"
    ]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result[
      "totalData"
    ]?.slotsPlayedPerDay?.map((slot: any) => slot.count);
    return { datesArray, countsArray };
  };

  const getPromisedSpotDeliveryData = () => {
    const datesArray = screenLevelData?.result[
      "totalData"
    ]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result[
      "totalData"
    ]?.slotsPlayedPerDay?.map((slot: any) => slot.countPromised);
    return { datesArray, countsArray };
  };

  const getCostData = () => {
    const totalPerSlotCost = campaignDetails?.screenWiseSlotDetails.reduce(
      (acc: any, { pricePerSlot }: any) => acc + pricePerSlot,
      0
    );
    const avgPerSlotCost =
      totalPerSlotCost / campaignDetails?.screenWiseSlotDetails.length;

    const datesArray = screenLevelData?.result[
      "totalData"
    ]?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = screenLevelData?.result[
      "totalData"
    ]?.slotsPlayedPerDay?.map(
      (slot: any) =>
        slot.count *
        (screenLevelData?.result["totalData"]?.costConsumed /
          screenLevelData?.result["totalData"]?.slotsDelivered)
    );
    return { datesArray, countsArray };
  };

  const gridItems = [
    {
      id: "1",
      type: "duration",
      data: campaignDetails,
      label: "campaignDetails",
    },
    {
      id: "2",
      type: "audience",
      data: screenLevelData,
      label: "screenLevelData",
    },
    {
      id: "3",
      type: "screen",
      data: screenLevelData,
      label: "screenLevelData",
    },
    { id: "4", type: "spot", data: screenLevelData, label: "screenLevelData" },
    { id: "5", type: "cost", data: screenLevelData, label: "screenLevelData" },
  ];

  const commonClasses = "col-span-1 bg-white p-4 border rounded-[12px]";

  return (
    <div className="w-full h-full pt-10 flex flex-col gap-2">
      <BillingAndInvoice
        open={openInvoice}
        onClose={() => setOpenInvoice(false)}
        invoiceBill={campaignDetails}  
        // loading={loadingBillInvoice}
        poNumber={poNumber}
        setPoNumber={setPoNumber}
        clientAgencyName={clientAgencyName}
        setClientAgencyName={setClientAgencyName}
        setAddress={setAddress}
        address={address}
        city={city}
        setCity={setCity}
        setStateName={setStateName}
        stateName={stateName}
        setCountry={setCountry}
        country={country}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        website={website}
        setWebsite={setWebsite}
        zipCode={zipCode}
        setZipCode={setZipCode}
        gst={gst}
        setGst={setGst}
        pan={pan}
        setPan={setPan}
        pocName={pocName}
        setPocName={setPocName}
        pocEmail={pocEmail}
        setPocEmail={setPocEmail}
        pocContact={pocContact}
        setPocContact={setPocContact}
        setPocDesignation={setPocDesignation}
        pocDesignation={pocDesignation}
      />
      <div className="bg-[#FFFFFF] p-2 rounded-[12px] flex justify-between">
        <div className="px-2 w-1/2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-12 w-36 flex items-center justify-center rounded-md bg-gray-300">
              <h1 className="text-[24px] font-bold text-[#FFFFFF]">
                {campaignDetails?.name?.[0]}
              </h1>
            </div>
            <div className="w-full">
              <h1 className="text-[14px] font-semibold">
                {campaignDetails?.name}
              </h1>
              <p className="text-[12px]">{campaignDetails?.brandName}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-1/2 gap-2">
          <DashboardFilters campaignDetails={campaignDetails} />
          <div className="grid grid-cols-2 gap-2">
            <button
              id="asd"
              title="edit campaign"
              type="button"
              className="col-span-1 border border-gray-100 rounded-[8px] p-2"
              // onClick={() => setOpenEdit(true)}
              onClick={() =>
                navigate(
                  `/${getCampaignPageNameFromCampaignType(
                    campaignDetails?.campaignType
                  )}/${campaignDetails._id}`
                )
              }
            >
              <i className="fi fi-tr-file-edit text-[12px] flex items-center justify-center"></i>
            </button>
            <button
              id="asd"
              title="edit campaign"
              type="button"
              className="col-span-1 border border-gray-100 rounded-[8px] p-2"
              onClick={() => setOpenInvoice(true)}
            >
              <i className="fi fi-tr-point-of-sale-bill text-[12px] flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className={`${commonClasses} ${
              clicked === item.id ? "border-blue" : "border-gray-100"
            }`}
            onClick={() => setClicked(item.id)}
          >
            <DashboardGrid type={item.type} {...{ [item.label]: item.data }} />
          </div>
        ))}
      </div>

      {clicked === "1" ? (
        <div className="bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
          <div className="flex items-center gap-2 px-4">
            <div className="rounded-full bg-violetbg p-2">
              <i className="fi fi-rr-calendar text-violet lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
              Campaign Duration
            </h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="pt-8 pb-4 px-2">
            <CalendarScaleSlider
              days={getNumberOfDaysBetweenTwoDates(
                campaignDetails?.startDate,
                campaignDetails?.endDate
              )}
              daysPlayed={calculateDaysPlayed(
                campaignDetails?.startDate,
                campaignDetails?.endDate
              ) === 0 ? 1 : calculateDaysPlayed(
                campaignDetails?.startDate,
                campaignDetails?.endDate
              )}
            />
          </div>
        </div>
      ) : clicked === "2" ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                Audience Impressions
              </h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <DashboardPieChart
                  type="city"
                  data={screenLevelData?.audiencePerformanceData?.cityWise}
                />
              </div>
              <div className="col-span-1">
                <DashboardPieChart
                  type="touchpoint"
                  data={
                    screenLevelData?.audiencePerformanceData?.touchPointWise
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                Audience Type Wise Impressions
              </h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardImpressionDetailsTable
                screenLevelData={screenLevelData?.result}
              />
            </div>
          </div>
        </div>
      ) : clicked === "3" ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                Screen Performance
              </h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
              <div className="col-span-1">
                <DashboardPieChart
                  type="city"
                  data={screenLevelData?.screenPerformanceData?.cityWise}
                />
              </div>
              <div className="col-span-1">
                <DashboardPieChart
                  type="touchpoint"
                  data={screenLevelData?.screenPerformanceData?.touchPointWise}
                />
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                Day Wise Screen Performance
              </h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardBarChart
                total={"100 %"}
                label={"Screen Performance"}
                targetData={getPromisedScreenPerformanceData().countsArray}
                currentData={getScreenPerformanceData().countsArray}
                labels={getScreenPerformanceData().datesArray}
              />
            </div>
          </div>
        </div>
      ) : clicked === "4" ? (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                Spot Delivery
              </h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
              <div className="col-span-1">
                <DashboardPieChart
                  type="city"
                  data={screenLevelData?.spotDeliveryData?.cityWise}
                />
              </div>
              <div className="col-span-1">
                <DashboardPieChart
                  type="touchpoint"
                  data={screenLevelData?.spotDeliveryData?.touchPointWise}
                />
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 px-4 py-1">
                <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                  Day Wise Spot Delivered
                </h1>
                <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <div className="flex items-center gap-2 px-4 py-1">
                <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                  Expected :{" "}
                  {(
                    getPromisedSpotDeliveryData().countsArray?.reduce(
                      (a: number, c: number) => a + c,
                      0
                    ) / getPromisedSpotDeliveryData().countsArray?.length
                  ).toFixed(0)}
                </h1>
                <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                  Actual :{" "}
                  {(
                    getSpotDeliveryData().countsArray?.reduce(
                      (a: number, c: number) => a + c,
                      0
                    ) / getSpotDeliveryData().countsArray?.length
                  ).toFixed(0)}
                </h1>
              </div>
            </div>
            <div className="p-2">
              <DashBoardSlotGraph
                total={`${screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(
                  0
                )}/${screenLevelData?.result?.totalData?.slotsPromised?.toFixed(
                  0
                )}`}
                label={"Spot Delivery"}
                targetData={getPromisedSpotDeliveryData().countsArray}
                currentData={getSpotDeliveryData().countsArray}
                labels={getSpotDeliveryData().datesArray}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4">
              <div className="rounded-full bg-bluebg p-2">
                <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
              </div>
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                Spot Delivery
              </h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="grid grid-cols-2 p-2">
              <div className="col-span-1">
                <DashboardPieChart
                  type="city"
                  data={screenLevelData?.costConsumedData?.cityWise}
                />
              </div>
              <div className="col-span-1">
                <DashboardPieChart
                  type="touchpoint"
                  data={screenLevelData?.costConsumedData?.touchPointWise}
                />
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-1">
              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                Day Wise Cost Consumed
              </h1>
              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <div className="p-2">
              <DashboardBarChart
                percent={false}
                bgColor="rgba(75, 192, 192, 0.7)"
                color="rgba(75, 192, 192, 1)"
                total={`${screenLevelData?.result?.totalData?.costConsumed?.toFixed(
                  0
                )}/${screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(
                  0
                )}`}
                label={"Cost Consumed"}
                currentData={getCostData().countsArray}
                labels={getCostData().datesArray}
              />
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#FFFFFF] px-0 w-full border border-gray-100 rounded-[12px] flex justify-between px-2">
        <div className="w-full">
          {/* ICON */}
          <h1 className="text-[16px] p-2 font-semibold">
            Site Level Performance
          </h1>
          <CampaignDashboardTable
            campaignDetails={campaignDetails}
            screenLevelData={screenLevelData?.result}
          />
        </div>
      </div>
    </div>
  );
};
