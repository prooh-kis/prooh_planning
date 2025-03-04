import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  SetAdsPlayTime,
  AdvanceFiltersDetails,
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
  CAMPAIGN_PLAN_TYPE_STORE,
} from "../../constants/campaignConstants";
import { storeBasePlanData } from "../../data";

export const StoreBasedPlanPage: React.FC = () => {
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
        (storeBasePlanData.find(
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
      />
    ),
    3: (
      <ScreenSummaryDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    4: (
      <SetAdsPlayTime
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    5: (
      <ScreenSummaryDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    6: (
      <ViewFinalPlanPODetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    7: (
      <CreativeUploadDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
      />
    ),
    8: (
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
          steps={pathname.includes("storebasedplan") ? 8 : 9}
        />
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {stepComponents[currentStep] || null}
      </div>
    </div>
  );
};
