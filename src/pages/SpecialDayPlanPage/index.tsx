import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import { SpecialDay } from "./SpecialDay";
import { RegularCohortComparisonDetails } from "./RegularCohortComparisonDetails";
import { ScreenSummaryDetails } from "./ScreenSummaryDetails";
import {
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  CreativeUploadV4,
} from "../../components/planner";

import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { specialDayPlanData } from "../../data";
import {
  CAMPAIGN_PLAN_TYPE_TOPICAL,
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";

export const SpecialDayPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 8;
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
          : specialDayPlanData.find(
              (page: any) => page.value === campaignDetails.currentPage
            )?.id || 0;
      setCurrentStep(newStep >= steps ? newStep : newStep + 1);
      const currStep = {
        [campaignId]: newStep >= steps ? newStep : newStep + 1,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [campaignDetails, campaignId, state, pathname, dispatch]);

  useEffect(() => {
    if (campaignId)
      dispatch(
        addDetailsToCreateCampaign({
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
          id: campaignId,
        })
      );
  }, [dispatch, campaignId]);

  const stepComponents: Record<number, React.FC<any>> = {
    1: SpecialDay,
    2: AudienceTouchPointsDetails,
    3: AdvanceFiltersDetails,
    4: RegularCohortComparisonDetails,
    5: ScreenSummaryDetails,
    6: ViewFinalPlanPODetails,
    7: CreativeUploadV4,
    8: VendorConfirmationDetails,
  };

  const StepComponent =
    stepComponents[currentStep] || (() => <div>Invalid step</div>);

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
            campaignType={CAMPAIGN_PLAN_TYPE_TOPICAL}
            path="specialdayplan"
            campaignDetails={campaignDetails}
          />
        </div>
      )}
    </div>
  );
};
