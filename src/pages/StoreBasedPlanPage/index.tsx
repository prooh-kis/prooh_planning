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
import { CAMPAIGN_PLAN_TYPE_KNOW, CAMPAIGN_PLAN_TYPE_STORE } from "../../constants/campaignConstants";

const pages = [
  {
    id: 1,
    value: "Basic Details Page",
  },
  {
    id: 2,
    value: "Advance Filter Page",
  },
  {
    id: 3,
    value: "Screen Summary Page",
  },
  {
    id: 4,
    value: "Set Ad Play time Page",
  },
  {
    id: 5,
    value: "Add Triggers Page",
  },
  {
    id: 6,
    value: "View Final Plan Page",
  },
  {
    id: 7,
    value: "Upload Creative Page",
  },
  {
    id: 8,
    value: "Vendor Confirmation Page",
  },
];

export const StoreBasedPlanPage: React.FC = () => {
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
    if (campaignId !== null || undefined) {
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
  }, [dispatch, campaignId]);

  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={
            pathname?.split("/").includes("storebasedplan") ? 8 :
             9
          }
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
            campaignType={CAMPAIGN_PLAN_TYPE_STORE}
            path={"storebasedplan"}
          />
        ) : currentStep === 2 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            // loading={loadingAdvanceFilterScreens}
            // error={errorAdvanceFilterScreens}
            campaignId={campaignId}
          />
        ) : currentStep === 3 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 4 ? (
          <SetAdsPlayTime
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 5 ? (
          <TriggerDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 6 ? (
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 7 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 8 ? (
          <VendorConfirmationDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
            userInfo={userInfo}
          />
        ):
        null}
      </div>
    </div>
  );
};
