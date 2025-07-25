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
import {
  getBillInvoiceDetails,
  takeDashboardScreenShotAction,
} from "../../actions/billInvoiceAction";
import { getUserRole } from "../../utils/campaignUtils";
import {
  CAMPAIGN_PLANNER,
  CLIENT_POC_USER,
} from "../../constants/userConstants";
import { createNoSubstitutionTemplateLiteral } from "typescript";

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
  const campaignId = pathname.split("/")[2] || "";

  const [userInfo, setUserInfo] = useState<any>({ userRole: CLIENT_POC_USER });
  const [openView, setOpenView] = useState<any>(CLIENT_POC_USER);

  const [openInvoice, setOpenInvoice] = useState<any>(false);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo: loggedInUser } = auth;

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

  const {
    loading: loadingBillInvoiceDetails,
    error: errorBillInvoiceDetails,
    data: billInvoiceDetailsData,
  } = useSelector((state: any) => state.billInvoiceDetailsGet);

  const takeScreenShot = ({
    tabs = ["1", "2", "3", "4", "5"],
  }: {
    tabs?: string[];
  }) => {
    dispatch(
      takeDashboardScreenShotAction({
        campaignId: campaignDetails?._id,
        // url: `${window.location.origin}/campaignDashboard/${campaignDetails?._id}`,
        url: `https://developmentplanning.vercel.app/campaignDashboard/${campaignDetails?._id}`,
        // url: `http://localhost:3000/campaignDashboard/${campaignDetails?._id}`,
        tabs: tabs,
        // tabs: ["1", "2"]
      })
    );
  };

  const [hasReceivedParentMessage, setHasReceivedParentMessage] =
    useState(false);

  useEffect(() => {
    if (
      loggedInUser &&
      campaignDetails?.campaignPlannerId === loggedInUser._id &&
      openView === userInfo?.userRole
    ) {
      setUserInfo(loggedInUser);
      setOpenView(loggedInUser.userRole);
    }

    // Notify parent that iframe is ready
    const notifyParent = () => {
      try {
        window.parent.postMessage("IFRAME_READY", "*");
        console.log("IFRAME_READY message sent to parent");
      } catch (error) {
        console.error("Failed to send IFRAME_READY message:", error);
      }
    };

    // Function to handle incoming messages
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:3001",
        "http://localhost:3000",
        "https://prooh-cms-beta.vercel.app",
        "https://prooh-cms.vercel.app",
        "https://cms.prooh.ai",
      ];

      // Only process messages from allowed origins
      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Message from untrusted origin:", event.origin);
        return;
      }

      // Handle the message based on its type
      if (event.data && event.data.type === "USERINFO_FOR_VENDOR_DASHBOARD") {
        // Handle the user info
        setUserInfo(event.data.data.userInfo);
        setOpenView(event.data.data.userInfo?.userRole);

        // Only send IFRAME_READY if we haven't already received a message
        if (!hasReceivedParentMessage) {
          setHasReceivedParentMessage(true);
          notifyParent();
        }
      }
    };

    // Add message listener
    window.addEventListener("message", handleMessage);

    // Clean up
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [
    loggedInUser,
    campaignDetails,
    hasReceivedParentMessage,
    openView,
    userInfo,
  ]);

  // Set up initial data fetch and refresh interval
  useEffect(() => {
    if (userInfo?.userRole === CAMPAIGN_PLANNER) {
      dispatch(getBillInvoiceDetails({ campaignCreationId: campaignId }));
    }

    dispatch(
      getCampaignCreationsDetails({
        id: campaignId,
      })
    );
    dispatch(
      getBasicDataForPlannerDashboard({
        id: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
      })
    );

    dispatch(
      getSiteMonitoringPicsPercentage({
        id: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
      })
    );
    dispatch(
      getSitesDataMapViewForPlannerDashboard({
        id: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
      })
    );
  }, [dispatch, campaignId, userInfo]);

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
      <div className="h-[20vh] w-full border rounded-[12px] p-4">
        <p className="text-[14px]">
          Stay tuned for the campaign dashboard...
          {/* {errorCampaignDetails?.data?.message || errorDashboard?.data.message} */}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full font-custom">
      <BillingAndInvoice
        open={openInvoice}
        onClose={() => {
          setOpenInvoice(false);
          dispatch({
            type: GET_CLIENT_AGENCY_DETAILS_RESET,
          });
        }}
        pathname={pathname}
        campaignDetails={campaignDetails}
        siteLevelData={siteLevelData}
        takeScreenShot={takeScreenShot}
        billInvoiceDetailsData={billInvoiceDetailsData}
        loadingBillInvoiceDetails={loadingBillInvoiceDetails}
      />
      {!loadingCampaignDetails && campaignDetails ? (
        <CampaignDashboard
          loggedInUser={loggedInUser}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          openView={openView}
          setOpenView={setOpenView}
          pathname={pathname}
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
          billInvoiceDetailsData={billInvoiceDetailsData}
        />
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};
