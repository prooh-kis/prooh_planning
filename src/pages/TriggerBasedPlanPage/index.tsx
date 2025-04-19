import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
// import { TriggerDetails } from "./TriggerDetails";
import { RegularCohortComparisonDetails } from "./RegularCohortComparisonDetails";
import { ScreenSummaryDetails } from "./ScreenSummaryDetails";
import {
  EnterCampaignBasicDetails,
  NewCreativeUpload,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  TriggerDetails
} from "../../components/planner";

import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { getCampaignCreationsDetails } from "../../actions/campaignAction";
import {
  CAMPAIGN_PLAN_TYPE_TRIGGER,
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { triggerBasePlanData } from "../../data";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const TriggerBasedPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const steps = 9;
  const { pathname, state } = useLocation();
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
      setCampaingDetails(campaignData);
    }
  }, [campaignData]);

  useEffect(() => {
    if (campaignId && campaignDetails) {
      const newStep =
        pathname.split("/").includes("view") && state?.from === VIEW_CAMPAIGN
          ? 1
          : pathname.split("/").includes("edit") &&
            state?.from === EDIT_CAMPAIGN
          ? 1
          : triggerBasePlanData.find(
              (page: any) => page.value === campaignDetails.currentPage
            )?.id || 0;

      setCurrentStep(
        newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep + 1
      );
      const currStep = {
        [campaignId]:
          newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep + 1,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [campaignDetails, campaignId, state, pathname, dispatch]);

  useEffect(() => {
    navigate(pathname, { replace: true, state: {} });
    if (campaignId) {
      dispatch(getCampaignCreationsDetails({ id: campaignId }));
    }
  }, [dispatch, campaignId, navigate, pathname]);

  const stepComponents: Record<number, React.FC<any>> = {
    1: EnterCampaignBasicDetails,
    2: TriggerDetails,
    3: AudienceTouchPointsDetails,
    4: AdvanceFiltersDetails,
    5: RegularCohortComparisonDetails,
    6: ScreenSummaryDetails,
    7: ViewFinalPlanPODetails,
    8: NewCreativeUpload,
    9: VendorConfirmationDetails,
  };
  
  const StepComponent = stepComponents[currentStep] || (() => <div>Invalid step</div>);

  return (
    <div className="w-full">
      {/* Stepper Slider */}
      <div className="w-full h-auto">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={9}
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
            campaignType={CAMPAIGN_PLAN_TYPE_TRIGGER}
            path="triggerbasedplan"
            campaignDetails={campaignDetails}
          />
        </div>
      )}
    </div>
  );
};
