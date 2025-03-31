import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import { EnterCampaignBasicDetails } from "./EnterCampaignBasicDetails";
import { IKnowItAllScreenSummaryDetails } from "./IKnowItAllScreenSummaryDetails";
import { SetAdsPlayTime } from "./SetAdsPlayTime";
import { IKnowItAllPlanSummaryTable } from "./IKnowItAllPlanSummaryTable";
import { ViewFinalPlanPODetails } from "./ViewFinalPlanPODetails";
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
  CAMPAIGN_PLAN_TYPE_KNOW,
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { iKnowItAllPlanData } from "../../data";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { NewCreativeUpload } from "../../components/planner/NewCreativeUpload";

export const IKnowItAllPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 7;
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const [campaignDetails, setCampaingDetails] = useState<any>(null);
  const campaignId: any = pathname.split("/")[2] || null;
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
    if (campaignDetails && campaignId) {
      const newStep =
        pathname.split("/").includes("view") && state?.from === VIEW_CAMPAIGN
          ? 1
          : pathname.split("/").includes("edit") &&
            state?.from === EDIT_CAMPAIGN
          ? 1
          : iKnowItAllPlanData.find(
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
  }, [dispatch, navigate, pathname, campaignId]);

  const stepComponents: Record<number, React.FC<any>> = {
    1: EnterCampaignBasicDetails,
    2: IKnowItAllScreenSummaryDetails,
    3: SetAdsPlayTime,
    4: IKnowItAllPlanSummaryTable,
    5: ViewFinalPlanPODetails,
    6: NewCreativeUpload,
    7: VendorConfirmationDetails,
  };

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
      {loadingCampaignDetails ? (
        <LoadingScreen />
      ) : (
        <div className="w-full h-[75vh] p-4">
          <StepComponent
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            userInfo={userInfo}
            campaignType={CAMPAIGN_PLAN_TYPE_KNOW}
            path="iknowitallplan"
            campaignDetails={campaignDetails}
          />
        </div>
      )}
    </div>
  );
};
