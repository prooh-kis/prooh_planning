import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  // EnterCampaignBasicDetails,
  // ViewFinalPlanPODetails,
  // VendorConfirmationDetails,
  // SetAdsPlayTime,
  // AdvanceFiltersDetails,
  // StoreBaseScreenSummaryDetails,
  // StoreBasedPlanSummaryTable,
} from "../../components/planner";
import { EnterCampaignBasicDetails } from "./EnterCampaignBasicDetails";
import { AdvanceFiltersDetails } from "./AdvancedFiltersDetails";
import { StoreBasedScreenSummaryDetails } from "./StoreBasedScreenSummaryDetails";
import { SetAdsPlayTime } from "./SetAdsPlayTime";
import { StoreBasedPlanSummaryTable } from "./StoreBasedPlanSummaryTable";
import { ViewFinalPlanPODetails } from "./ViewFinalPlanPODetails";
import { CreativeUpload } from "./CreativeUpload";
import { VendorConfirmationDetails } from "./VendorConfirmationDetails";

import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { getCampaignCreationsDetails } from "../../actions/campaignAction";
import {
  CAMPAIGN_PLAN_TYPE_STORE,
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { storeBasePlanData } from "../../data";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const StoreBasedPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 8;
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const campaignId: any = pathname.split("/")[2] || null;

  const [campaignDetails, setCampaingDetails] = useState<any>(null);

  const [currentStep, setCurrentStep] = useState<number>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] ?? 1 : 1
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  const { loading: loadingCampaignDetails, data: campaignData } = useSelector(
    (state: any) => state.campaignCreationsDetailsGet
  );

  useEffect(() => {
    if (campaignData) {
      setCampaingDetails(campaignData)
    }
  },[campaignData]);

  // Fix: Ensure campaignId is always a string when used as an object key
  useEffect(() => {
    if (campaignId && campaignDetails) {
      const newStep = pathname.split("/").includes("view") && state?.from === VIEW_CAMPAIGN ? 1 :
      pathname.split("/").includes("edit") && state?.from === EDIT_CAMPAIGN ? 1 :
        storeBasePlanData.find(
          (page: any) => page.value === campaignDetails.currentPage
        )?.id || 0;
        setCurrentStep(newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep + 1);
      const currStep = {
        [campaignId]: newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep + 1,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [campaignDetails, campaignId, state, pathname, dispatch]);

  useEffect(() => {
    navigate(pathname, { replace: true, state: {} });
    if (campaignId) {
      dispatch(getCampaignCreationsDetails({ id: campaignId }));
    };
  }, [dispatch, campaignId, navigate, pathname]);


  const stepComponents: Record<number, React.FC<any>> = {
    1: EnterCampaignBasicDetails,
    2: AdvanceFiltersDetails,
    3: StoreBasedScreenSummaryDetails,
    4: SetAdsPlayTime,
    5: StoreBasedPlanSummaryTable,
    6: ViewFinalPlanPODetails,
    7: CreativeUpload,
    8: VendorConfirmationDetails,
  }

  const StepComponent = stepComponents[currentStep] || null;


  return (
    <div className="w-full">
      {/* Stepper Slider */}
      <div className="w-full h-auto">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={steps}
        />
      </div>
      {/* Step Content */}
      {loadingCampaignDetails ? (
        <LoadingScreen />
      ) : (
        <div className="w-full h-[75vh] p-4">
          <StepComponent
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            userInfo={userInfo}
            campaignType={CAMPAIGN_PLAN_TYPE_STORE}
            path="storebasedplan"
            campaignDetails={campaignDetails}
          />
        </div>
      )}
    </div>
  );
};
