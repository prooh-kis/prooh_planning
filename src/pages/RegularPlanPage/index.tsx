import React, { useEffect, useRef, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  RegularCohortComparisonDetails,
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  TriggerDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  CampaignDashboardDetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getScreensAudiencesData,
  getScreensCostData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import {
  ADVANCE_FILTER_SCREENS_MAP_DATA,
  AUDIENCE_DATA,
  CAMPAIGN,
  CURRENT_STEP,
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_TABLE_DATA,
  SELECTED_AUDIENCE_TOUCHPOINTS,
  SELECTED_SCREENS_ID,
  SELECTED_TRIGGER,
  TOTAL_SCREEN_COST_DATA,
} from "../../constants/localStorageConstants";

const pages = [
  {
    id: 1,
    value: "Basic Details Page",
  },
  {
    id: 2,
    value: "Audience And TouchPoint Page",
  },
  {
    id: 3,
    value: "Advance Filter Page",
  },
  {
    id: 4,
    value: "Compare Plan Page",
  },
  {
    id: 5,
    value: "Screen Summary Page",
  },
  {
    id: 6,
    value: "Add Triggers Page",
  },
  {
    id: 7,
    value: "View Final Plan Page",
  },
  {
    id: 8,
    value: "Upload Creative Page",
  },
  {
    id: 9,
    value: "Vendor Confirmation Page",
  },
  {
    id: 10,
    value: "Campaign Dashboard Page",
  },
  {},
];

export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const { pathname } = location;
  const campaignId = pathname?.split("/")?.splice(-1)[0];

  const [currentStep, setCurrentStep] = useState<any>(getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] : 1);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const screensAudiencesDataGet = useSelector(
    (state: any) => state.screensAudiencesDataGet
  );
  const {
    loading: loadingAudiences,
    error: errorAudiences,
    data: screensAudiences,
  } = screensAudiencesDataGet;

  const screensCostDataGet = useSelector(
    (state: any) => state.screensCostDataGet
  );
  const {
    loading: loadingCost,
    error: errorCost,
    data: screensCost,
  } = screensCostDataGet;

  const screensDataAdvanceFilterGet = useSelector(
    (state: any) => state.screensDataAdvanceFilterGet
  );
  const {
    loading: loadingAdvanceFilterScreens,
    error: errorAdvanceFilterScreens,
    data: advanceFilterScreens,
  } = screensDataAdvanceFilterGet;

  const screenSummaryPlanTableDataGet = useSelector((state: any) => state.screenSummaryPlanTableDataGet);
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;

  const detailsToCreateCampaignAdd = useSelector((state: any) => state.detailsToCreateCampaignAdd);
  const {
    loading, error, success, data: campaignDetails
  } = detailsToCreateCampaignAdd;

  useEffect(() => {
   
    if (campaignDetails) {
      // const campDetails = location.state.campaign
      const campDetails = campaignDetails?.campaign
      console.log(campaignDetails);
    
      setCurrentStep(Number(pages.filter((page: any) => page.value === campDetails?.currentPage)[0].id) + 1);
      dispatch(getScreensAudiencesData({ markets: campDetails?.markets }));
      dispatch(
        getScreensCostData({
          cohorts: campDetails?.cohorts,
          touchPoints: campDetails?.touchPoints,
          gender: campDetails?.gender,
          duration: campDetails?.duration,
        })
      );
      dispatch(getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds: campDetails?.screenIds,
      }));
    } else {
      dispatch(getScreensAudiencesData({ markets: [] }));
      dispatch(
        getScreensCostData({
          cohorts: [],
          touchPoints: [],
          gender: "both",
          duration: 30,
        })
      );
    }

    
  }, [dispatch]);

  useEffect(() => {
    if (campaignId) {
      const campDetails = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      const curr = Number(pages.filter((page: any) => page.value === campDetails?.currentPage)[0].id) + 1;
      const currStep = {
        [campaignId]: curr
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [campaignId, currentStep]);

  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider step={currentStep} setStep={setCurrentStep} steps={9} />
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {currentStep === 1 ? (
          <EnterCampaignBasicDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            userInfo={userInfo}
            pathname={pathname}
            campaignId={campaignId}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loadingAudiences || loadingCost}
            error={errorAudiences || errorCost}
            campaignId={campaignId}
          />
        ) : currentStep === 3 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loadingAdvanceFilterScreens}
            error={errorAdvanceFilterScreens}
          />
        ) : currentStep === 4 ? (
          <RegularCohortComparisonDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 5 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 6 ? (
          <TriggerDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 7 ? (
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 8 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 9 ? (
          <VendorConfirmationDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
          />
        ) : (
          <CampaignDashboardDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
          />
        )}
      </div>
    </div>
  );
};
