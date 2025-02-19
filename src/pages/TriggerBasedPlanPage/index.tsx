import React, { useEffect, useRef, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  SetAdsPlayTime,
  AdvanceFiltersDetails,
  TriggerDetails,
  AudienceTouchPointsDetails,
  RegularCohortComparisonDetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getScreensAudiencesData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  CAMPAIGN_PLAN_TYPE_KNOW,
  CAMPAIGN_PLAN_TYPE_STORE,
  CAMPAIGN_PLAN_TYPE_TRIGGER,
} from "../../constants/campaignConstants";
import { ALL_MARKETS } from "../../constants/helperConstants";

const pages = [
  {
    id: 1,
    value: "Basic Details Page",
  },
  {
    id: 2,
    value: "Add Triggers Page",
  },
  {
    id: 3,
    value: "Audience And TouchPoint Page",
  },
  {
    id: 4,
    value: "Advance Filter Page",
  },
  {
    id: 5,
    value: "Compare Plan Page",
  },
  {
    id: 6,
    value: "Screen Summary Page",
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
];

export const TriggerBasedPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const { pathname } = location;
  const campaignId: any =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;
  // console.log(campaignId);

  const [currentStep, setCurrentStep] = useState<any>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] : 1
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading,
    error,
    success,
    data: campaignDetails,
  } = detailsToCreateCampaignAdd;

  useEffect(() => {
    if (success) {
      // const campDetails = location.state.campaign
      const campDetails = campaignDetails;

      setCurrentStep(
        Number(
          pages.filter(
            (page: any) => page.value === campDetails?.currentPage
          )[0]?.id || 0
        ) + 1
      );

      const curr =
        Number(
          pages.filter(
            (page: any) => page.value === campDetails?.currentPage
          )[0]?.id || 0
        ) + 1;
      const currStep = {
        [campaignId]: curr,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [dispatch, campaignDetails]);

  useEffect(() => {
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
    if (campaignId !== null || undefined) {
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
    // dispatch(getScreensAudiencesData({ id: "", markets: ALL_MARKETS }));
  }, [dispatch, campaignId]);

  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={pathname?.split("/").includes("triggerbasedplan") ? 9 : 9}
        />
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {currentStep === 1 ? (
          <EnterCampaignBasicDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            userInfo={userInfo}
            pathname={pathname}
            campaignId={campaignId}
            campaignType={CAMPAIGN_PLAN_TYPE_TRIGGER}
            path={"triggerbasedplan"}
          />
        ) : currentStep === 2 ? (
          <TriggerDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 3 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            // loading={loadingAudiences || loadingCost}
            // error={errorAudiences || errorCost}
            campaignId={campaignId}
          />
        ) : currentStep === 4 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            // loading={loadingAdvanceFilterScreens}
            // error={errorAdvanceFilterScreens}
            campaignId={campaignId}
          />
        ) : currentStep === 5 ? (
          <RegularCohortComparisonDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 6 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
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
            userInfo={userInfo}
          />
        ) : null}
      </div>
    </div>
  );
};
