import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  RegularCohortComparisonDetails,
  CreativeUploadDetails,
  ScreenSummaryDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import {
  CURRENT_STEP,
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { SpecialDay } from "../../components/planner/SpecialDay";
import { specialDayPlanData } from "../../data";

export const SpecialDayPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 8;
  const { pathname, state } = useLocation();
  const campaignId: any = pathname.split("/")[2] || null;
  const [pageSuccess, setPageSuccess] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] ?? 1 : 1
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  const { success, data: campaignDetails } = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );

  // Fix: Ensure campaignId is always a string when used as an object key
  useEffect(() => {
    if (success && campaignDetails) {
      const newStep = state?.from === "dashboard" ? 1 :
        pathname.split("/").includes("view") ? 1 :
        pathname.split("/").includes("edit") ? 1 :
        specialDayPlanData.find(
          (page: any) => page.value === campaignDetails.currentPage
        )?.id || 0;
      setCurrentStep(newStep >= steps ? newStep : newStep + 1);
      const currStep = {
        [campaignId]: newStep >= steps ? newStep : newStep + 1,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [success, campaignDetails, campaignId, state, pathname, dispatch]);

  useEffect(() => {
    if (campaignId) dispatch(addDetailsToCreateCampaign({ id: campaignId }));
  }, [dispatch, campaignId]);

  const stepComponents: { [key: number]: React.ReactNode } = {
    1: (
      <SpecialDay
        setCurrentStep={setCurrentStep}
        step={currentStep}
        userInfo={userInfo}
        campaignId={campaignId}
      />
    ),
    2: (
      <AudienceTouchPointsDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    3: (
      <AdvanceFiltersDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    4: (
      <RegularCohortComparisonDetails
        setCurrentStep={setCurrentStep}
        step={currentStep}
        campaignId={campaignId}
        successAddCampaignDetails={success}
        setPageSuccess={setPageSuccess}
        pageSuccess={pageSuccess}
      />
    ),
    5: (
      <ScreenSummaryDetails
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
