import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  // AdvanceFiltersDetails,
  // AudienceTouchPointsDetails,
  // RegularCohortComparisonDetails,
  // CreativeUploadDetails,
  // EnterCampaignBasicDetails,
  // ScreenSummaryDetails,
  // TriggerDetails,
  // ViewFinalPlanPODetails,
  VendorConfirmationDetails,
} from "../../components/planner";

import {
  EnterCampaignBasicDetails,
} from "./EnterCampaignBasicDetails";
import { AudienceTouchPointsDetails } from "./AudienceTouchPointsDetails";
import { AdvanceFiltersDetails } from "./AdvancedFiltersDetails";
import { RegularCohortComparisonDetails } from "./RegularCohortComparisonDetails";
import { ScreenSummaryDetails } from "./ScreenSummaryDetails";
import { TriggerDetails } from "./TriggerDetails";
import { ViewFinalPlanPODetails } from "./ViewFinalPlanPODetails";
import { CreativeUpload } from "./CreativeUpload";

import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { getCampaignCreationsDetails } from "../../actions/campaignAction";
import {
  CAMPAIGN_PLAN_TYPE_REGULAR,
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { regularPlanData } from "../../data";

import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 9;
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const campaignId: any = pathname.split("/")[2] || null;


  const [currentStep, setCurrentStep] = useState<number>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] || 1 : 1
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  
  const { loading: loadingCampaignDetails, data: campaignDetails } = useSelector(
    (state: any) => state.campaignCreationsDetailsGet
  );
  // Fix: Ensure campaignId is always a string when used as an object key
  useEffect(() => {
    if (campaignDetails) {
      const newStep = location.pathname.split("/").includes("view") && location?.state?.from === VIEW_CAMPAIGN ? 1 :
        location.pathname.split("/").includes("edit") && location?.state?.from === EDIT_CAMPAIGN ? 1 :
        (regularPlanData.find(
          (page: any) => page.value === campaignDetails.currentPage
        )?.id || 0);

      setCurrentStep(newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep);
      const currStep = {
        [campaignId]: newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }

  }, [campaignDetails, campaignId, dispatch, location.pathname, location?.state?.from]);

  useEffect(() => {
    navigate(location.pathname, { replace: true, state: {} });

    if (campaignId) dispatch(getCampaignCreationsDetails({ id: campaignId }));
  }, [navigate, location.pathname, dispatch, campaignId]);

  const stepComponents: Record<number, React.FC<any>> = {
    1: EnterCampaignBasicDetails,
    2: AudienceTouchPointsDetails,
    3: AdvanceFiltersDetails,
    4: RegularCohortComparisonDetails,
    5: ScreenSummaryDetails,
    6: TriggerDetails,
    7: ViewFinalPlanPODetails,
    8: CreativeUpload,
    9: VendorConfirmationDetails,
  };

  const StepComponent = stepComponents[currentStep] || null;

  return (
    <div className="w-full font-custom">
      <div className="w-full h-auto">
        <StepperSlider
          campaignId={campaignId}
          step={currentStep}
          setStep={setCurrentStep}
          steps={steps}
        />
      </div>
      {loadingCampaignDetails ? (
        <LoadingScreen />
      ) : (
        <div className="w-full h-[75vh] p-4">
          {StepComponent && campaignDetails && (
            <StepComponent
              setCurrentStep={setCurrentStep}
              step={currentStep}
              campaignId={campaignId}
              userInfo={userInfo}
              campaignType={CAMPAIGN_PLAN_TYPE_REGULAR}
              path="regularplan"
              campaignDetails={campaignDetails}
            />
          )}
        </div>
      )}
    </div>
  );
};
