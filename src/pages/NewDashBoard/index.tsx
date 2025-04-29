import React, { useEffect, useState, useCallback } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCampaignCreationsDetails } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import {
  getBasicDataForPlannerDashboard,
  getSiteMonitoringPicsPercentage,
  getSitesDataMapViewForPlannerDashboard,
} from "../../actions/dashboardAction";
import { BillingAndInvoice } from "./BillingAndInvoice";
import { GET_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface FilterState {
  audience: string[];
  screenPerformance: string[];
  spotDelivery: string[];
  costConsumption: string[];
  siteLevel: string[];
}

export const NewDashBoard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId = pathname.split("/").pop() || "";

  const [aiInsight, setAiInsight] = useState<string>("");
  const [isAnalyzing, setIsAnalysing] = useState<boolean>(false);

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
  const [invoiceAmount, setInvoiceAmount] = useState<any>(0);

  const [jsonDataForInvoice, setJsonDataForInvoice] = useState<any>({});

  // State for filters
  const [filters, setFilters] = useState<{
    cities: FilterState;
    touchPoints: FilterState;
    screenTypes: FilterState;
    dayTypes: FilterState;
    timezones: FilterState;
  }>({
    cities: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    touchPoints: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    screenTypes: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    dayTypes: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    timezones: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
  });

  // Selectors for Redux state
  const {
    loading: loadingCampaignDetails,
    error: errorCampaignDetails,
    data: campaignDetails,
  } = useSelector((state: any) => state.campaignCreationsDetailsGet);

  const {
    loading: loadingDashboard,
    error: errorDashboard,
    data: dashboardData,
  } = useSelector((state: any) => state.basicDataForPlannerDashboard);

  const { loading: loadingSiteLevel, data: siteLevelData } = useSelector(
    (state: any) => state.siteLevelPerformanceForPlannerDashboard
  );

  const { loading: loadingSitesDataMapView, data: sitesDataMapViewData } =
    useSelector((state: any) => state.sitesDataMapViewForPlannerDashboard);


  // Set up initial data fetch and refresh interval
  useEffect(() => {
    // fetchDashboardData();

    dispatch(getCampaignCreationsDetails({ id: campaignId }));
    dispatch(getBasicDataForPlannerDashboard({ id: campaignId }));

    dispatch(getSiteMonitoringPicsPercentage({ id: campaignId }));
    dispatch(getSitesDataMapViewForPlannerDashboard({ id: campaignId }));
    // const interval = setInterval(fetchDashboardData, 300000); // 10 minutes

    // return () => clearInterval(interval);
  }, [dispatch, campaignId]);

  const isLoading = loadingCampaignDetails || loadingDashboard;
  const hasError = errorCampaignDetails || errorDashboard;

  if (isLoading) {
    return (
      <div className="w-full h-full space-y-2">
        <div className="h-[10vh] w-full border rounded-[12px] mt-10">
          <SkeletonLoader />
        </div>
        <div className="h-[20vh] w-full border rounded-[12px]">
          <SkeletonLoader />
        </div>
        <div className="h-[40vh] w-full border rounded-[12px]">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="h-[20vh] w-full border rounded-[12px] mt-10">
        <p>{errorCampaignDetails?.data?.message || errorDashboard?.data.message}</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
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
      {!loadingCampaignDetails && campaignDetails ? (
        <CampaignDashboard
          loading={isLoading}
          campaignDetails={campaignDetails}
          screenLevelData={dashboardData}
          filters={filters}
          setFilters={setFilters}
          sitesDataMapViewData={sitesDataMapViewData}
          siteLevelData={siteLevelData}
          loadingSiteLevel={loadingSiteLevel}
          setOpenInvoice={setOpenInvoice}
          openInvoice={openInvoice}
        />
      ) : (
        <LoadingScreen />
      )}
      
    </div>
  );
};
