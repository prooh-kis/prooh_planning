import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  campaignLogsByCampaignIdAction,
  changeCampaignStatusAction,
  editAllSubCampaignsAction,
  getCampaignCreatedScreensDetailsAction,
  getCampaignDetailsAction,
} from "../../actions/campaignAction";
import { confirmData } from "../../utils/champaignStatusUtils";
import {
  CAMPAIGN_STATUS_CHANGE_RESET,
  EDIT_ALL_SUB_CAMPAIGNS_RESET,
} from "../../constants/campaignConstants";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import {
  EditCampaignCreationAndItsSubCampaigns,
  EditCreativeEndDatePopup,
} from "../../components";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import {
  CAMPAIGN_CREATION_EDIT_END_DATE_PLANNING_PAGE,
  CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
} from "../../constants/userConstants";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import { GET_CAMPAIGN_DASHBOARD_DATA_RESET } from "../../constants/screenConstants";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import {
  getRegularVsCohortPriceData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import { generateCampaignSummaryPdfFromJSON } from "../../utils/generatePdf";
import { generatePPT } from "../../utils/generatePPT";
import { PlanDetails } from "./PlanDetails";
import { getCampaignBasicDetails } from "./helperFunction";
import CampaignDetailsHeader from "./CampaignDetailsHeader";
import ScreenListForCampaignDetails from "./ScreenListForCampaignDetails";

export const CampaignDetailsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState<string>(
    "standardDayTimeCreatives"
  );
  const [currentTab1, setCurrentTab1] = useState<string>("1");

  const [campaign, setCampaign] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState<any>("");

  const [openCreativeEndDateChangePopup, setOpenCreativeEndDateChangePopup] =
    useState<any>(false);
  const [
    openCreateCampaignEndDateChangePopup,
    setOpenCreateCampaignEndDateChangePopup,
  ] = useState<any>(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const campaignId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // Redux selectors
  const {
    loading,
    error,
    data: campaignCreated,
  } = useSelector((state: any) => state.campaignDetailsGet);

  const {
    loading: loadingScreens,
    error: errorScreens,
    data: screens,
  } = useSelector((state: any) => state.campaignCreatedScreensDetailsGet);

  const {
    loading: loadingStatusChange,
    error: errorStatusChange,
    success: successStatusChange,
  } = useSelector((state: any) => state.campaignStatusChange);

  const {
    loading: loadingEditAllSubCampaigns,
    error: errorEditAllSubCampaigns,
    data: successEditAllSubCampaigns,
  } = useSelector((state: any) => state.editAllSubCampaigns);

  const {
    loading: loadingChange,
    error: errorChange,
    success: successChange,
  } = useSelector((state: any) => state.changeCampaignCreativeEndDate);

  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = useSelector((state: any) => state.screenSummaryPlanTableDataGet);

  // Filtered campaigns
  const campaigns =
    screens?.length > 0
      ? campaignCreated?.campaigns
          ?.filter((camp: any) =>
            campaignCreated?.screenIds?.includes(camp.screenId.toString())
          )
          ?.filter((camp: any) =>
            camp?.screenName
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase())
          )
      : [];

  // Data fetching and initialization
  useEffect(() => {
    removeAllKeyFromLocalStorage();
    dispatch({ type: GET_CAMPAIGN_DASHBOARD_DATA_RESET });
    dispatch(
      getCampaignDetailsAction({
        campaignId: campaignId,
        event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
      })
    );
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [campaignId, dispatch, userInfo]);

  useEffect(() => {
    if (campaignCreated) {
      dispatch(
        getScreenSummaryPlanTableData({
          id: campaignCreated?._id,
          screenIds: campaignCreated?.screenIds,
        })
      );
      dispatch(
        getRegularVsCohortPriceData({
          id: campaignCreated?._id,
          screenIds: campaignCreated?.screenIds,
          cohorts: campaignCreated?.cohorts,
          gender: campaignCreated?.gender,
          duration: campaignCreated?.duration,
        })
      );
      dispatch(
        getCampaignCreatedScreensDetailsAction({
          screenIds: campaignCreated.screenIds,
        })
      );
    }
  }, [campaignCreated, dispatch]);

  // Success/error handlers
  useEffect(() => {
    if (successEditAllSubCampaigns) {
      message.success("Campaign updated successfully!");
      dispatch({ type: EDIT_ALL_SUB_CAMPAIGNS_RESET });
      setOpenCreateCampaignEndDateChangePopup(false);
      dispatch(
        getCampaignDetailsAction({
          campaignId: campaignId,
          event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
        })
      );
    }
    if (errorEditAllSubCampaigns) message.error(errorEditAllSubCampaigns);
  }, [
    successEditAllSubCampaigns,
    errorEditAllSubCampaigns,
    dispatch,
    campaignId,
  ]);

  useEffect(() => {
    if (successStatusChange) {
      message.success("Campaign Status Changed");
      dispatch({ type: CAMPAIGN_STATUS_CHANGE_RESET });
      dispatch(
        getCampaignDetailsAction({
          campaignId: campaignId,
          event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
        })
      );
    }
    if (errorStatusChange) message.error(errorStatusChange);
  }, [successStatusChange, errorStatusChange, dispatch, campaignId]);

  // Helper functions

  const handelSelectScreen = (campaignId: string) => {
    const data = campaignCreated?.campaigns?.find(
      (data: any) => data?._id === campaignId
    );
    setCampaign(data);
  };

  const handleSetCurrentScreen = (screenId: string) => {
    const screen = screens?.find(
      (screen: any) => screen?.screenId === screenId
    );
    setCurrentScreen(screen);
  };

  const getCampaignIdsToChangeStatus = () => {
    return campaignCreated?.campaigns?.map((campaign: any) => campaign._id);
  };

  const handleChangeStatusAll = (status: string, event: string) => {
    if (confirm(confirmData[status])) {
      const data = getCampaignIdsToChangeStatus();
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
            event: event,
          })
        );
      } else {
        message.error("No Campaign found to change status");
      }
    }
  };

  const handleEditAllSubCampaigns = (
    campaignCreationId: string,
    endDate: any
  ) => {
    dispatch(
      editAllSubCampaignsAction({
        campaignCreationId,
        endDate,
        campaignCreationIds: [campaignCreationId],
        event: CAMPAIGN_CREATION_EDIT_END_DATE_PLANNING_PAGE,
      })
    );
  };

  const handleChangeCampaignStatus = (
    status: string,
    campaignId: string,
    event: string
  ) => {
    if (confirm(confirmData[status])) {
      const data = campaignCreated?.campaigns
        ?.filter((campaign: any) => campaign?._id === campaignId)
        ?.map((campaign: any) => campaign?._id);
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
            event: event,
          })
        );
      } else {
        message.error("No Campaign found to change status");
      }
    }
  };

  const handleShowLogReport = (campaignId: string) => {
    if (campaignId) {
      dispatch(campaignLogsByCampaignIdAction(campaignId));
    } else {
      message.error("No creative added!");
    }
  };

  const openCampaignDashboard = () => {
    navigate(`/campaignDashboard/${campaignId}`);
  };

  const countScreensByResolutionAndCity = (data: any) => {
    const result: any = {};
    data?.forEach((screen: any) => {
      const { city } = screen.location;
      const { screenResolution } = screen;
      if (!result[city]) result[city] = {};
      result[city][screenResolution] =
        (result[city][screenResolution] || 0) + 1;
    });
    return result;
  };

  const downloadSummary = () => {
    const pdfDownload = {
      summary: {
        heading: "CAMPAIGN SUMMARY",
        pdfData: {
          approach: [campaignCreated],
          costSummary: [screenSummaryPlanTableData],
          creativeRatio: countScreensByResolutionAndCity(
            campaignCreated?.screenWiseSlotDetails
          ),
        },
        fileName: `${campaignCreated?.brandName} Campaign Summary`,
      },
      "screen-pictures": {
        heading: "SCREEN PICTURES",
        pdfData: campaignCreated?.screenWiseSlotDetails
          ?.filter((s: any) => campaignCreated?.screenIds.includes(s.screenId))
          ?.map((screen: any) => screen),
        fileName: `${campaignCreated?.brandName} Campaign Screen Pictures`,
      },
    };

    generateCampaignSummaryPdfFromJSON({
      preview: false,
      download: true,
      jsonData: pdfDownload.summary.pdfData,
      fileName: pdfDownload.summary.fileName,
      heading: pdfDownload.summary.heading,
    });
    message.success("Downloading Summary...");
    generatePPT({
      download: true,
      data: pdfDownload["screen-pictures"].pdfData,
      fileName: pdfDownload["screen-pictures"].fileName,
    });
  };

  return (
    <div className="w-full font-custom">
      {/* Modals */}
      {openCreativeEndDateChangePopup && (
        <EditCreativeEndDatePopup
          onClose={() => setOpenCreativeEndDateChangePopup(false)}
          selectedScreens={screens}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          campaign={campaign}
          screenData={currentScreen}
        />
      )}
      {openCreateCampaignEndDateChangePopup && (
        <EditCampaignCreationAndItsSubCampaigns
          onClose={() => setOpenCreateCampaignEndDateChangePopup(false)}
          openShowMedia={openCreateCampaignEndDateChangePopup}
          campaignCreation={campaignCreated}
          isLoading={loadingEditAllSubCampaigns}
          handleNext={handleEditAllSubCampaigns}
        />
      )}

      {/* Header */}

      <CampaignDetailsHeader
        campaignCreated={campaignCreated}
        loadingStatusChange={loadingStatusChange}
        setOpenCreateCampaignEndDateChangePopup={
          setOpenCreateCampaignEndDateChangePopup
        }
        openCampaignDashboard={openCampaignDashboard}
        currentTab1={currentTab1}
        setCurrentTab1={setCurrentTab1}
      />
      {/* Main Content */}
      {currentTab1 === "1" ? (
        <ScreenListForCampaignDetails
          campaignCreated={campaignCreated}
          loadingStatusChange={loadingStatusChange || loadingScreens}
          handleChangeStatusAll={handleChangeStatusAll}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          campaigns={campaigns}
          campaign={campaign}
          handelSelectScreen={handelSelectScreen}
          handleSetCurrentScreen={handleSetCurrentScreen}
          handleChangeCampaignStatus={handleChangeCampaignStatus}
          setOpenCreativeEndDateChangePopup={setOpenCreativeEndDateChangePopup}
          screens={screens}
          handleShowLogReport={handleShowLogReport}
          currentScreen={currentScreen}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      ) : (
        <PlanDetails
          downloadSummary={downloadSummary}
          basicDetails={getCampaignBasicDetails(campaignCreated)?.basicDetails}
          durationDetails={
            getCampaignBasicDetails(campaignCreated)?.durationDetails
          }
          performanceMatrix={
            getCampaignBasicDetails(campaignCreated)?.performanceMatrix
          }
          campaignCost={getCampaignBasicDetails(campaignCreated)?.campaignCost}
        />
      )}
    </div>
  );
};
