import { CampaignDashboardTable } from "../../components/tables/CampaignDashboardTable";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { calculateDaysPlayed } from "../../utils/dateAndTimeUtils";
import { CalendarScaleSlider } from "../../components/molecules/CalenderScaleSlider";
import { DashboardImpressionDetailsTable } from "../../components/tables/DashboardImpressionDetailsTable";
import { DashboardBarChart } from "../../components/segments/DashboardBarGraph";
import { DashboardPieChart } from "../../components/segments/DashboardPieChart";
import { DashboardGrid } from "../../components/molecules/DashboardGrid";
import { useNavigate } from "react-router-dom";
import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { BillingAndInvoice } from "./BillingAndInvoice";
import { GET_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { useDispatch } from "react-redux";
import { DashBoardMenu } from "./DashBoardMenu";
import { Tooltip } from "antd";
import { FirstCharForBrandName } from "../../components/molecules/FirstCharForBrandName";

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
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentTouchPoint, setCurrentTouchPoint] = useState<string>("");

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

  const dropdownRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectCity = (city: string) => {
    setCurrentCity(city);
  };

  const handleSelectTouchPoint = (touchPont: string) => {
    setCurrentTouchPoint(touchPont);
  };

  function extractAllTouchPoints() {
    let touchPointsArray: string[] = [];
    const data = screenLevelData?.result;
    for (const key in data || {}) {
      if (data[key].touchPoint) {
        if (!touchPointsArray.includes(data?.[key].touchPoint))
          touchPointsArray.push(data?.[key].touchPoint);
      }
    }
    return touchPointsArray;
  }

  function extractAllCity() {
    let cityArray: string[] = [];
    const data = screenLevelData?.result;
    for (const key in data || {}) {
      if (data[key].city) {
        if (!cityArray.includes(data?.[key].city))
          cityArray.push(data?.[key].city);
      }
    }
    return cityArray;
  }

  const getCostDataScreenWise = (data: any) => {
    const newData: any = {};
    const data1 = screenLevelData?.result;
    for (const key in data1 || {}) {
      newData[key] = data1[key].screenName;
    }
    const result: any = {};

    for (let key in data) {
      result[newData[key]] = data[key];
    }
    return result; // {"ScreenName" : value,....}
  };

  const handleToggleMenu = useCallback(() => {
    setShowMenu((pre: boolean) => !pre);
  }, [showMenu]);

  return (
    <div className="w-full h-full pt-10 flex flex-col gap-2 bg-[#D3D3D320] font-custom">
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
        jsonDataForInvoice={jsonDataForInvoice}
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
      {/* Dashboard header Section */}
      <div className="bg-[#FFFFFF] p-2 px-10 flex justify-between mt-6 fixed z-10 shadow-sm w-full">
        <div className="px-2 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex gap-4 items-center">
              <i
                className="fi fi-br-arrow-left"
                onClick={() => navigate(-1)}
              ></i>
              <FirstCharForBrandName brandName={campaignDetails?.brandName} />
            </div>
            <div className="w-full relative flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-[20px] font-semibold leading-[19.36px] text-[#0E212E]">
                  {campaignDetails?.name?.toUpperCase()}
                </h1>
                <i
                  className={`${
                    showMenu ? "fi fi-br-angle-down" : "fi fi-br-angle-up"
                  } text-[#5B7180] cursor-pointer`}
                  onClick={handleToggleMenu}
                ></i>
              </div>
              <p className="text-[14px] text-[#5B7180] leading-[100%]">
                {campaignDetails?.brandName}
              </p>
              <div className="relative w-full" ref={dropdownRef}>
                {showMenu && (
                  <DashBoardMenu campaignDetails={campaignDetails} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 ">
          <div
            className="border border-gray-300 rounded-lg flex justify-center items-center h-[38px] px-2 cursor-pointer"
            onClick={() => navigate(`/campaignDetails/${campaignDetails?._id}`)}
          >
            <i className="fi fi-sr-file-edit text-[14px] flex items-center justify-center text-[#129BFF]"></i>
          </div>
          <div
            className="px-4 border border-gray-300 rounded-lg flex justify-center gap-2 items-center h-[38px] cursor-pointer"
            onClick={() => setOpenInvoice(true)}
          >
            <i className="fi fi-rs-calculator-bill text-[14px] flex items-center justify-center text-[#129BFF]"></i>
            <p className="text-[16px] text-[#0E212E]">Invoice</p>
          </div>
        </div>
      </div>
      <div className="px-10 max-h-[340px] mt-28">
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
            <div className="relative bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
              <div className="flex items-center gap-2 px-4">
                <div className="rounded-full bg-[#8079F910] p-2">
                  <i className="fi fi-rr-calendar text-[#8079F9] lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                </div>
                <h1 className="lg:text-[14px] md:text-[12px] leading-[16.96px]truncate">
                  Campaign Duration
                </h1>
                <Tooltip title="Number of days campaign needs to run">
                  <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                </Tooltip>
              </div>
              <div className="relative pt-8 pb-4 px-2">
                <CalendarScaleSlider
                  days={campaignDetails?.duration}
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
                  <Tooltip title="Total audience impressions delivered">
                    <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                  </Tooltip>
                </div>
                <div className="">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <DashboardPieChart
                        type="City Wise"
                        data={
                          screenLevelData?.audiencePerformanceData?.cityWise
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <DashboardPieChart
                        type="Touchpoint Wise"
                        data={
                          screenLevelData?.audiencePerformanceData
                            ?.touchPointWise
                        }
                      />
                    </div>
                    <div className="col-span-1">
                      <DashboardPieChart
                        type="Screen Cost"
                        data={getCostDataScreenWise(
                          screenLevelData?.costConsumedData?.screenWise || {}
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 justify-around pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-[#FF6384]" />
                      <h1 className="text-[14px] font-semibold">Promised</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-[#36A2EB]" />
                      <h1 className="text-[14px] font-semibold">Delivered</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100 ">
                <div className="flex items-center gap-2 px-4 py-1">
                  <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                    Audience Type Wise Impressions
                  </h1>
                  <Tooltip title="Total audience impressions delivered category wise">
                    <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                  </Tooltip>
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
                  <Tooltip title="Screen perfomance delivered">
                    <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                  </Tooltip>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 ">
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="city Wise"
                      data={screenLevelData?.screenPerformanceData?.cityWise}
                    />
                  </div>

                  <div className="col-span-1">
                    <DashboardPieChart
                      type="Touchpoint Wise"
                      data={
                        screenLevelData?.screenPerformanceData?.touchPointWise
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="Screen Wise"
                      data={getCostDataScreenWise(
                        screenLevelData?.screenPerformanceData?.screenWise || {}
                      )}
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
                    <Tooltip title="Screen perfomance delivered day wise">
                      <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                    </Tooltip>
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
                  <Tooltip title="Number of spots delivered for the campaign">
                    <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                  </Tooltip>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2">
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="City Wise"
                      data={screenLevelData?.spotDeliveryData?.cityWise}
                    />
                  </div>
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="Touchpoint Wise"
                      data={screenLevelData?.spotDeliveryData?.touchPointWise}
                    />
                  </div>
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="Screen Wise"
                      data={getCostDataScreenWise(
                        screenLevelData?.spotDeliveryData?.screenWise || {}
                      )}
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
                    <Tooltip title="Day wise number of spots delivered for campaign">
                      <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                    </Tooltip>
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
                    Cost Consumed
                  </h1>
                  <Tooltip title="Total cost consumed for the delivery of campaign">
                    <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                  </Tooltip>
                </div>
                <div className="grid grid-cols-3 p-2">
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="City Wise"
                      data={screenLevelData?.costConsumedData?.cityWise}
                    />
                  </div>
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="Touchpoint Wise"
                      data={screenLevelData?.costConsumedData?.touchPointWise}
                    />
                  </div>
                  <div className="col-span-1">
                    <DashboardPieChart
                      type="Screen Wise"
                      data={getCostDataScreenWise(
                        screenLevelData?.costConsumedData?.screenWise || {}
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
                <div className="flex items-center gap-2 px-4 py-1">
                  <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                    Day Wise Cost Consumed
                  </h1>
                  <Tooltip title="Day wise total cost consumed ">
                    <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                  </Tooltip>
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
              city={currentCity}
              currentTouchPoint={currentTouchPoint}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
