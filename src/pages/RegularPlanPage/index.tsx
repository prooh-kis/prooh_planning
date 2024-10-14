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
  SELECTED_AUDIENCE_TOUCHPOINTS,
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

  const [currentStep, setCurrentStep] = useState<any>(
    getDataFromLocalStorage("currentStep") || 1
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const screensAudiencesDataGet = useSelector(
    (state: any) => state.screensAudiencesDataGet
  );
  const {
    loading: loading,
    error: error,
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

  useEffect(() => {
    if (location.state.campaign) {
      const campDetails = location.state.campaign;
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, campDetails);
      saveDataOnLocalStorage(CAMPAIGN, {
        basicDetails: {
          campaignType: campDetails.campaignType || "Regular",
          campaignName: campDetails.name || "campaign",
          brandName: campDetails.brandName || "brand",
          clientName: campDetails.clientName || "client",
          industry: campDetails.industry || "industry",
          startDate: campDetails.startDate || "1 Jan 1970",
          endDate: campDetails.endDate || "1 Feb 1970",
          duration: campDetails.duration || 30,
        },
      });

      saveDataOnLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS, {
        cohorts: campDetails.cohorts,
        touchPoints: campDetails.touchPoints,
        gender: campDetails.gender,
        duration: getDataFromLocalStorage(CAMPAIGN).basicDetails.duration || 30,
      });

      setCurrentStep(
        Number(
          pages.filter((page: any) => page.value === campDetails.currentPage)[0]
            .id
        ) + 1
      );
      dispatch(getScreensAudiencesData({ markets: campDetails.markets }));
      dispatch(
        getScreensCostData({
          cohorts: campDetails.cohorts,
          touchPoints: campDetails.touchPoints,
          gender: campDetails.gender,
          duration: campDetails.duration,
        })
      );
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
  }, [dispatch, location]);

  useEffect(() => {
    if (screensAudiences) {
      saveDataOnLocalStorage(AUDIENCE_DATA, screensAudiences);
    }

    if (screensCost) {
      saveDataOnLocalStorage(TOTAL_SCREEN_COST_DATA, screensCost);
    }

    if (advanceFilterScreens) {
      saveDataOnLocalStorage(
        ADVANCE_FILTER_SCREENS_MAP_DATA,
        advanceFilterScreens
      );
    }

    saveDataOnLocalStorage(CURRENT_STEP, currentStep);
  }, [screensAudiences, screensCost, advanceFilterScreens, currentStep]);

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
            campaignType={location?.state?.campaignType}
            userInfo={userInfo}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loading || loadingCost}
            error={error || errorCost}
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
          />
        ) : currentStep === 5 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 6 ? (
          <TriggerDetails setCurrentStep={setCurrentStep} step={currentStep} />
        ) : currentStep === 7 ? (
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 8 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : currentStep === 9 ? (
          <VendorConfirmationDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <CampaignDashboardDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
};
