import React, { useCallback, useEffect, useRef, useState } from "react";
import { DashboardGrid } from "../../components/molecules/DashboardGrid";
import { useNavigate } from "react-router-dom";
import { BillingAndInvoice } from "./BillingAndInvoice";
import { GET_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { useDispatch } from "react-redux";
import { DashBoardMenu } from "./DashBoardMenu";
import { FirstCharForBrandName } from "../../components/molecules/FirstCharForBrandName";
import { SiteLevelPerformance } from "./SiteLevelPerformance";
import { SlotSegment } from "./SlotSegment";
import { CostSegment } from "./CostSegment";
import { AudienceSegment } from "./AudienceSegment";
import { DurationSegment } from "./DurationSegment";
import { HardwarePerformanceSegment } from "./HardwarePerformanceSegment";
import { SiteMonitoringPic } from "./SiteMonitoringPic";

interface GridItem {
  id: string;
  type: "duration" | "audience" | "screen" | "spot" | "cost";
  campaignDetails?: {
    startDate: string;
    endDate: string;
  };
  screenLevelData?: any; // You should replace 'any' with a proper interface
}

export const CampaignDashboard = ({
  loading,
  campaignDetails,
  screenLevelData,
  siteLevelData,
  audienceData,
  hardwarePerformanceData,
  spotData,
  costData,
  cities,
  setCities,
  touchPoints,
  setTouchponints,
  screenTypes,
  setScreenTypes,
  sitesDataMapViewData,
}: any) => {
  const dropdownRef = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [clicked, setClicked] = useState<any>("1");
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

  const [calendarData, setCalendarData] = useState<any>({});
  const [currentWeek, setCurrentWeek] = useState<any>(1);
  const [currentDay, setCurrentDay] = useState<any>(1);
  const [currentDate, setCurrentDate] = useState<any>(
    new Date().toISOString().split("T")[0]
  );

  const [showPercent, setShowPercent] = useState<any>({
    1: false,
    2: false,
    3: false,
  });

  const gridItems: GridItem[] = [
    {
      id: "1",
      type: "duration",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
    {
      id: "2",
      type: "audience",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
    {
      id: "3",
      type: "screen",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
    {
      id: "4",
      type: "spot",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
    {
      id: "5",
      type: "cost",
      campaignDetails: screenLevelData?.campaignCreation,
      screenLevelData: screenLevelData?.data,
    },
  ];

  const commonClasses =
    "cursor-pointer rounded-[21px] shadow-sm col-span-1 bg-white p-4 rounded-[12px] h-auto ";

  useEffect(() => {
    setCalendarData(screenLevelData?.slotDataDateWiseArray);
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
  }, [screenLevelData?.slotDataDateWiseArray, setCalendarData]);

  const handleToggleMenu = useCallback(() => {
    setShowMenu((pre: boolean) => !pre);
  }, []);

  const getAllDates = ({ startDate, endDate }: any) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      // dates.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      dates.push({
        value: currentDate.toISOString().split("T")[0],
        label: currentDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }),
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }

    return dates;
  };

  const allDates: any = getAllDates({
    startDate: campaignDetails?.startDate,
    endDate: campaignDetails?.endDate,
  });

  return (
    <div className="absolute w-full h-full mt-12 flex flex-col gap-2 bg-[] font-custom">
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
      <div className="bg-[#FFFFFF] p-2 py-4 px-2  pr-14 flex justify-between mt-4 fixed z-10 shadow-sm w-full">
        <div className="px-2 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex gap-4 items-center">
              <i
                className="fi fi-br-arrow-left text-[#6f7f8e]"
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
                    !showMenu ? "fi fi-br-angle-down" : "fi fi-br-angle-up"
                  } text-[#6f7f8e] cursor-pointer`}
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
            className="border border-gray-300 rounded-lg flex justify-center items-center h-[38px] w-[38px] cursor-pointer"
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
      <div className="px-10 max-h-[360px] mt-32">
        {/* campaign dashboard grid view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className={`${commonClasses}
              ${
                clicked === item.id
                  ? "border border-[#129BFF] border-2"
                  : "border border-gray-100 "
              }
              `}
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
            <DurationSegment
              screenLevelData={screenLevelData}
              calendarData={calendarData}
              setCurrentWeek={setCurrentWeek}
              currentWeek={currentWeek}
              setCurrentDay={setCurrentDay}
              currentDay={currentDay}
              setCurrentDate={setCurrentDate}
              currentDate={currentDate}
              allDates={allDates}
              loading={loading}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
            />
          ) : clicked === "2" ? (
            <AudienceSegment
              screenLevelData={screenLevelData}
              audienceData={audienceData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              cities={cities}
              setCities={setCities}
              touchPoints={touchPoints}
              setTouchponints={setTouchponints}
              screenTypes={screenTypes}
              setScreenTypes={setScreenTypes}
            />
          ) : clicked === "3" ? (
            <HardwarePerformanceSegment
              screenLevelData={screenLevelData}
              hardwarePerformanceData={hardwarePerformanceData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              cities={cities}
              setCities={setCities}
              touchPoints={touchPoints}
              setTouchponints={setTouchponints}
              screenTypes={screenTypes}
              setScreenTypes={setScreenTypes}
            />
          ) : clicked === "4" && spotData ? (
            <SlotSegment
              screenLevelData={screenLevelData}
              spotData={spotData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              cities={cities}
              setCities={setCities}
              touchPoints={touchPoints}
              setTouchponints={setTouchponints}
              screenTypes={screenTypes}
              setScreenTypes={setScreenTypes}
            />
          ) : clicked === "5" && costData ? (
            <CostSegment
              screenLevelData={screenLevelData}
              costData={costData}
              showPercent={showPercent}
              setShowPercent={setShowPercent}
              cities={cities}
              setCities={setCities}
              touchPoints={touchPoints}
              setTouchponints={setTouchponints}
              screenTypes={screenTypes}
              setScreenTypes={setScreenTypes}
            />
          ): null}
        </div>
        <SiteMonitoringPic sitesDataMapViewData={sitesDataMapViewData} />
        <SiteLevelPerformance
          siteLevelData={siteLevelData}
          campaignDetails={campaignDetails}
        />
      </div>
    </div>
  );
};
