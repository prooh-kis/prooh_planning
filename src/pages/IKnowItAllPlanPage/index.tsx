import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  SetAdsPlayTime,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import {
  CURRENT_STEP,
  FULL_CAMPAIGN_PLAN,
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { CAMPAIGN_PLAN_TYPE_KNOW } from "../../constants/campaignConstants";
import { IKnowItAllPlanSummaryTable } from "../../components/planner/IKnowItAllPlanSummaryTable";
import { IKnowItAllScreenSummaryDetails } from "../../components/planner/IKnowItAllScreenSummaryDetails";
import { iKnowItAllPlanData } from "../../data";

export const IKnowItAllPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId: any = pathname.split("/")[2] || null;

  const [currentStep, setCurrentStep] = useState<number>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] ?? 1 : 1
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  const {
    loading,
    success,
    data: campaignDetails,
  } = useSelector((state: any) => state.detailsToCreateCampaignAdd);

  // Update the current step when campaign details are successfully loaded
  useEffect(() => {
    if (success && campaignDetails) {
      const newStep =
        (iKnowItAllPlanData.find(
          (page) => page.value === campaignDetails.currentPage
        )?.id || 0) + 1;
      setCurrentStep(newStep);
      saveDataOnLocalStorage(CURRENT_STEP, { [campaignId ?? ""]: newStep });
    }
  }, [success, campaignDetails, campaignId]);

  // Fetch campaign details when needed
  useEffect(() => {
    const storedPage =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.currentPage;
    const storedStep = iKnowItAllPlanData.find(
      (page) => page.value === storedPage
    )?.id;

    if (campaignId && storedStep !== currentStep) {
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
  }, [dispatch, campaignId, currentStep]);

  // Step components mapping to simplify rendering
  const stepComponents: { [key: number]: React.ReactNode } = {
    1: (
      <EnterCampaignBasicDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        userInfo={userInfo}
        pathname={pathname}
        campaignId={campaignId}
        campaignType={CAMPAIGN_PLAN_TYPE_KNOW}
        path="iknowitallplan"
      />
    ),
    2: (
      <IKnowItAllScreenSummaryDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    3: (
      <SetAdsPlayTime
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        loading={loading}
      />
    ),
    4: (
      <IKnowItAllPlanSummaryTable
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    5: (
      <ViewFinalPlanPODetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    6: (
      <CreativeUploadDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    7: (
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
    <div className="w-full h-full px-8 py-2">
      {/* Stepper Slider */}
      <div className="w-full pt-[60px]">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={pathname.includes("iknowitallplan") ? 7 : 9}
        />
      </div>

      {/* Step Content */}
      <div className="w-full h-full flex justify-center items-top">
        {stepComponents[currentStep] || null}
      </div>
    </div>
  );
};
