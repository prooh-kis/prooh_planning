import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  SetAdsPlayTime,
  AdvanceFiltersDetails,
  StoreBaseScreenSummaryDetails,
  StoreBasedPlanSummaryTable,
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
  CAMPAIGN_PLAN_TYPE_STORE,
} from "../../constants/campaignConstants";
import { storeBasePlanData } from "../../data";

export const StoreBasedPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 8;
  const { pathname, state } = useLocation();
  const campaignId: any = pathname.split("/")[2] || null;
  const [pageSuccess, setPageSuccess] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] ?? 1 : 1
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  const {
    loading,
    success,
    data: campaignDetails,
  } = useSelector((state: any) => state.detailsToCreateCampaignAdd);

  // Fix: Ensure campaignId is always a string when used as an object key
  useEffect(() => {
    if (success && campaignDetails) {
      const newStep = state?.from === "dashboard" ? 1 :
        pathname.split("/").includes("view") ? 1 :
        pathname.split("/").includes("edit") ? 1 :
        storeBasePlanData.find(
          (page: any) => page.value === campaignDetails.currentPage
        )?.id || 0;
      setCurrentStep(newStep == steps - 1 ? newStep : newStep + 1);
      const currStep = {
        [campaignId]: newStep == steps - 1 ? newStep : newStep + 1,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [success, campaignDetails, campaignId, state, pathname, dispatch]);

  useEffect(() => {
    if (campaignId) dispatch(addDetailsToCreateCampaign({ id: campaignId }));
  }, [dispatch, campaignId]);

  const stepComponents: { [key: number]: React.ReactNode } = {
    1: (
      <EnterCampaignBasicDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        userInfo={userInfo}
        campaignId={campaignId}
        campaignType={CAMPAIGN_PLAN_TYPE_STORE}
        path="storebasedplan"
      />
    ),
    2: (
      <AdvanceFiltersDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    3: (
      <StoreBaseScreenSummaryDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    4: (
      <SetAdsPlayTime
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
        loading={loading}
      />
    ),
    5: (
      <StoreBasedPlanSummaryTable
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    6: (
      <ViewFinalPlanPODetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    7: (
      <CreativeUploadDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    8: (
      <VendorConfirmationDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        userInfo={userInfo}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Stepper Slider */}
      <div className="w-full">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          setPageSuccess={setPageSuccess}
          steps={steps}
        />
      </div>
      {/* Step Content */}
      <div className="w-full h-full flex justify-center items-top">
        {stepComponents[currentStep] || null}
      </div>
    </div>
  );
};
