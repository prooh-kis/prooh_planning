import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  AdvanceFiltersDetails,
  TriggerDetails,
  AudienceTouchPointsDetails,
  RegularCohortComparisonDetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  CAMPAIGN_PLAN_TYPE_TRIGGER,
} from "../../constants/campaignConstants";
import { triggerBasePlanData } from "../../data";

export const TriggerBasedPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId: any = pathname.split("/")[2] || null;

  const [currentStep, setCurrentStep] = useState<number>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] ?? 1 : 1
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  const { success, data: campaignDetails } = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );

  useEffect(() => {
    if (success && campaignDetails) {
      const newStep =
        (triggerBasePlanData.find(
          (page) => page.value === campaignDetails.currentPage
        )?.id || 0) + 1;

      setCurrentStep(newStep);
      saveDataOnLocalStorage(CURRENT_STEP, { [campaignId ?? ""]: newStep });
    }
  }, [success, campaignDetails, campaignId]);

  useEffect(() => {
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });

    if (campaignId) {
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
  }, [dispatch, campaignId]);

  const stepComponents: { [key: number]: React.ReactNode } = {
    1: (
      <EnterCampaignBasicDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        userInfo={userInfo}
        pathname={pathname}
        campaignId={campaignId}
        campaignType={CAMPAIGN_PLAN_TYPE_TRIGGER}
        path="triggerbasedplan"
      />
    ),
    2: (
      <TriggerDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
      />
    ),
    3: (
      <AudienceTouchPointsDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
      />
    ),
    4: (
      <AdvanceFiltersDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    5: (
      <RegularCohortComparisonDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    6: (
      <ScreenSummaryDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    7: (
      <ViewFinalPlanPODetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    8: (
      <CreativeUploadDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    9: (
      <VendorConfirmationDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        userInfo={userInfo}
        successAddCampaignDetails={success}
      />
    ),
  };

  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={9}
        />
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {stepComponents[currentStep] || null}
      </div>
    </div>
  );
};
