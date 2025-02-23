import React, { useEffect, useRef, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  AudienceTouchPointsDetails,
  RegularCohortComparisonDetails,
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  TriggerDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET, CAMPAIGN_PLAN_TYPE_REGULAR } from "../../constants/campaignConstants";
import { ALL_COHORTS, ALL_MARKETS, ALL_TOUCHPOINTS } from "../../constants/helperConstants";
import { AdvanceFiltersDetails } from "../../components/planner/AdvancedFiltersDetails copy";

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
          )[0]?.id
        ) + 1
      );
      const curr =
        Number(
          pages.filter(
            (page: any) => page.value === campDetails?.currentPage
          )[0].id
        ) + 1;
      const currStep = {
        [campaignId]: curr,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [success, campaignDetails, campaignId]);


  useEffect(() => {
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });

    if (campaignId !== null || undefined) {
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
  }, [dispatch, campaignId]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Stepper Slider */}
      <div className="w-full pt-[60px]">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={9}
        />
      </div>

      {/* Step Content */}
      <div className="w-full flex-grow flex justify-center items-start overflow-auto p-4">
        {currentStep === 1 ? (
          <EnterCampaignBasicDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            userInfo={userInfo}
            pathname={pathname}
            campaignId={campaignId}
            campaignType={CAMPAIGN_PLAN_TYPE_REGULAR}
            path={"regularplan"}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            successAddCampaignDetails={success}
          />
        ) : currentStep === 3 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            successAddCampaignDetails={success}
          />
        ) : currentStep === 4 ? (
          <RegularCohortComparisonDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            success={success}
          />
        ) : currentStep === 5 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            regularVsCohortSuccessStatus={success}
            success={success}
          />
        ) : currentStep === 6 ? (
          <TriggerDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            successAddCampaignDetails={success}
          />
        ) : currentStep === 7 ? (
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            successAddCampaignDetails={success}
          />
        ) : currentStep === 8 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
            successAddCampaignDetails={success}
          />
        ) : currentStep === 9 ? (
          <VendorConfirmationDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
            userInfo={userInfo}
            successAddCampaignDetails={success}
          />
        ) : null}
      </div>
    </div>
  );
};
