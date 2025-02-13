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
import { GET_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { useDispatch } from "react-redux";
import { DashBoardMenu } from "./DashBoardMenu";

export const CampaignDashboard = ({
  campaignDetails,
  screenLevelData,
}: any) => {
  const [clicked, setClicked] = useState<any>("1");
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [openInvoice, setOpenInvoice] = useState<any>(false);
  const [poNumber, setPoNumber] = useState<any>("");
  const [poDate, setPoDate] = useState<any>("");
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
  const [invoiceDescription, setInvoiceDescription] = useState<any>("");
  const [invoiceQuantity, setInvoiceQuantity] = useState<any>("");
  const [invoiceCurrency, setInvoiceCurrency] = useState<any>("INR");
  const [invoiceAmount, setInvoiceAmount] = useState<any>(
    campaignDetails?.discount === 0 || campaignDetails?.discount === undefined
      ? Number(campaignDetails?.totalCampaignBudget)
      : Number(campaignDetails?.finalCampaignBudget)
  );

  const [jsonDataForInvoice, setJsonDataForInvoice] = useState<any>({});

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
      campaignDetails,
      screenLevelData,
    },
    {
      id: "2",
      type: "audience",
      campaignDetails,
      screenLevelData,
    },
    {
      id: "3",
      type: "screen",
      campaignDetails,
      screenLevelData,
    },
    { id: "4", type: "spot", campaignDetails, screenLevelData },
    { id: "5", type: "cost", campaignDetails, screenLevelData },
  ];

  const commonClasses = "col-span-1 bg-white p-4 rounded-[12px] h-[156px] ";

  return (
    <div className="w-full h-full pt-10 flex flex-col gap-2 bg-gray-100">
      <BillingAndInvoice
        open={openInvoice}
        onClose={() => {
          setOpenInvoice(false);
          dispatch({
            type: GET_CLIENT_AGENCY_DETAILS_RESET,
          });
        }}
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
        jsonDataForInvoice={jsonDataForInvoice}
        setJsonDataForInvoice={setJsonDataForInvoice}
        campaignDetails={campaignDetails}
        invoiceDescription={invoiceDescription}
        setInvoiceDescription={setInvoiceDescription}
        invoiceQuantity={invoiceQuantity}
        setInvoiceQuantity={setInvoiceQuantity}
        poDate={poDate}
        setPoDate={setPoDate}
        invoiceCurrency={invoiceCurrency}
        setInvoiceCurrency={setInvoiceCurrency}
        invoiceAmount={invoiceAmount}
        setInvoiceAmount={setInvoiceAmount}
      />
      <div className="bg-[#FFFFFF] p-2 px-10 flex justify-between mt-6">
        <div className="px-2 w-1/2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <i className="fi fi-br-arrow-left" onClick={() => navigate(-1)}></i>
            <div className="h-[39px] w-[39px] p-4 flex items-center justify-center rounded-full bg-[#4E952D]">
              <h1 className="text-[24px] font-bold text-white">
                {campaignDetails?.name?.charAt(0) || "?"}
              </h1>
            </div>
            <div className="w-full relative">
              <div className="flex items-center gap-4">
                <h1 className="text-[16px] font-semibold leading-[19.36px]">
                  {campaignDetails?.name}
                </h1>
                <i
                  className="fi fi-rr-angle-small-down text-[#5B7180] cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                ></i>
              </div>
              <p className="text-[14px] text-[#B0B0B0] leading-[16.94px]">
                {campaignDetails?.brandName}
              </p>
              {showMenu && <DashBoardMenu campaignDetails={campaignDetails} />}
            </div>
          </div>
        </div>
        <div className="flex items-center w-1/2 justify-end  gap-2">
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
      <div className="px-10 max-h-[340px] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className={`${commonClasses} ${
                clicked === item.id
                  ? "border-[#0094FF] border-2"
                  : "border-[#DCDCDC] border-[0.47px]"
              }`}
              onClick={() => setClicked(item.id)}
            >
              <DashboardGrid
                type={item.type}
                campaignDetails={item.campaignDetails}
                screenLevelData={item.screenLevelData}
              />
            </div>
          ))}
        </div>
        <div className="mt-2">
          {clicked === "1" ? (
            <div className="bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
              <div className="flex items-center gap-2 px-4">
                <div className="rounded-full bg-[#8079F910] p-2">
                  <i className="fi fi-rr-calendar text-[#8079F9] lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                </div>
                <h1 className="lg:text-[14px] md:text-[12px] leading-[16.96px]truncate">
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
                  daysPlayed={
                    calculateDaysPlayed(
                      campaignDetails?.startDate,
                      campaignDetails?.endDate
                    ) === 0
                      ? 1
                      : calculateDaysPlayed(
                          campaignDetails?.startDate,
                          campaignDetails?.endDate
                        )
                  }
                  // day={day}
                  // setDay={setDay}
                />
              </div>
            </div>
          ) : clicked === "2" ? (
            <div className="grid grid-cols-5 gap-2 ">
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
                <div className="grid grid-cols-2 gap-2 ">
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
              <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100 ">
                <div className="flex items-center gap-2 px-4 py-1">
                  <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                    Audience Type Wise Impressions
                  </h1>
                  <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                </div>
                <div className="p-2">
                  <DashboardImpressionDetailsTable
                    screenLevelData={screenLevelData?.result?.totalData}
                  />
                </div>
              </div>
            </div>
          ) : clicked === "3" ? (
            <div className="grid grid-cols-5 gap-2 ">
              <div className="col-span-2 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
                <div className="flex items-center gap-2 px-4">
                  <div className="rounded-full bg-[#B077FF10] p-2">
                    <i className="fi-rs-dashboard text-blue lg:text-[14px] text-[12px] text-[#B077FF] flex items-center justify-center"></i>
                  </div>
                  <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                    Screen Performance
                  </h1>
                  <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 ">
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="city"
                      data={screenLevelData?.screenPerformanceData?.cityWise}
                    />
                  </div>
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="touchpoint"
                      data={
                        screenLevelData?.screenPerformanceData?.touchPointWise
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 px-4 py-1">
                    <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                      Day Wise Screen Performance
                    </h1>
                    <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1">
                    <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                      Promised :{" "}
                      {(
                        getPromisedScreenPerformanceData().countsArray?.reduce(
                          (a: number, c: number) => a + c,
                          0
                        ) /
                        getPromisedScreenPerformanceData().countsArray?.length
                      ).toFixed(0)}
                      %
                    </h1>
                    <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                      Delivered :{" "}
                      {(
                        getScreenPerformanceData().countsArray?.reduce(
                          (a: number, c: number) => a + c,
                          0
                        ) / getScreenPerformanceData().countsArray?.length
                      ).toFixed(0)}
                      %
                    </h1>
                  </div>
                </div>
                <div className="p-2">
                  <DashboardBarChart
                    total={"100 %"}
                    label={"Screen Performance"}
                    targetData={getPromisedScreenPerformanceData().countsArray}
                    currentData={getScreenPerformanceData().countsArray}
                    labels={getScreenPerformanceData().datesArray}
                    color="#58A5FF"
                    bgColor="#58A5FF"
                    color2="#FFC955"
                    bgColor2="#FFC955"
                  />
                </div>
              </div>
            </div>
          ) : clicked === "4" ? (
            <div className="grid grid-cols-5 gap-2 ">
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
                      Promised :{" "}
                      {(
                        getPromisedSpotDeliveryData().countsArray?.reduce(
                          (a: number, c: number) => a + c,
                          0
                        ) / getPromisedSpotDeliveryData().countsArray?.length
                      ).toFixed(0)}{" "}
                    </h1>
                    <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                      Delivered :{" "}
                      {(
                        getSpotDeliveryData().countsArray?.reduce(
                          (a: number, c: number) => a + c,
                          0
                        ) / getSpotDeliveryData().countsArray?.length
                      ).toFixed(0)}{" "}
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
                    color="#77C1E3"
                    bgColor="#77C1E3"
                    color2="#FFC2A8"
                    bgColor2="#FFC2A8"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2 ">
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
                    total={`${screenLevelData?.result?.totalData?.costConsumed?.toFixed(
                      0
                    )}/${screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(
                      0
                    )}`}
                    label={"Cost Consumed"}
                    currentData={getCostData().countsArray}
                    labels={getCostData().datesArray}
                    color="#60B17E"
                    bgColor="#60B17E"
                    color2="#60B17E"
                    bgColor2="#60B17E"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-[#FFFFFF] px-0 w-full border border-gray-100 rounded-[12px] flex justify-between px-2 mt-2">
          <div className="w-full">
            {/* ICON */}
            <h1 className="text-[16px] py-4 px-2 font-normal leading-[19.36px] text[#0E212E]">
              Site Level Performance
            </h1>
            <CampaignDashboardTable
              campaignDetails={campaignDetails}
              screenLevelData={screenLevelData?.result}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
