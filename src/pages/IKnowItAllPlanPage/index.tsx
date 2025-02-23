import React, { useEffect, useRef, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
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
import { CURRENT_STEP, FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { CAMPAIGN_PLAN_TYPE_KNOW } from "../../constants/campaignConstants";
import { IKnowItAllPlanSummaryTable } from "../../components/planner/IKnowItAllPlanSummaryTable";
import { IKnowItAllScreenSummaryDetails } from "../../components/planner/IKnowItAllScreenSummaryDetails";

const pages = [
  {
    id: 1,
    value: "Basic Details Page",
  },
  {
    id: 2,
    value: "Select Screens Page",
  },
  {
    id: 3,
    value: "Set Ad Play time Page",
  },
  {
    id: 4,
    value: "Screen Summary Page",
  },
  {
    id: 5,
    value: "View Final Plan Page",
  },
  {
    id: 6,
    value: "Upload Creative Page",
  },
  {
    id: 7,
    value: "Vendor Confirmation Page",
  },
];

export const IKnowItAllPlanPage: React.FC = () => {
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
      const curr =
        Number(
          pages.filter(
            (page: any) => page.value === campaignDetails?.currentPage
          )[0]?.id || 0
        ) + 1;
      setCurrentStep(curr);
      const currStep = {
        [campaignId]: curr,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [success]);

  useEffect(() => {
    if (campaignId !== null || undefined || pages?.filter((page: any) => page.label === getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.currentPage)[0]?.id !== currentStep) {
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
  }, [dispatch, campaignId]);

  return (
    <div className="w-full h-full px-8 py-2">
      <div className="w-full pt-[60px]">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={pathname?.split("/").includes("iknowitallplan") ? 7 : 9}
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
            campaignType={CAMPAIGN_PLAN_TYPE_KNOW}
            path={"iknowitallplan"}
          />
        ) : currentStep === 2 ? (
          <IKnowItAllScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            success={success}
          />
        ) : currentStep === 3 ? (
          <SetAdsPlayTime
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            success={success}
            loading={loading}
          />
        ) : currentStep === 4 ? (
          <IKnowItAllPlanSummaryTable
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            success={success}
          />
        ) : currentStep === 5 ? (
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 6 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 7 ? (
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
