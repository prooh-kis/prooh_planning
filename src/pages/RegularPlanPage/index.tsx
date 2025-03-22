import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  RegularCohortComparisonDetails,
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  TriggerDetails,
  ViewFinalPlanPODetails,
  VendorConfirmationDetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  CAMPAIGN_PLAN_TYPE_REGULAR,
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { regularPlanData } from "../../data";

export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 9;
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const campaignId: any = pathname.split("/")[2] || null;
  const campaignTo: any = pathname.split("/")[3] || null;

  const [pageSuccess, setPageSuccess] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] || 1 : 1
  );

  const { userInfo } = useSelector((state: any) => state.auth);
  const { success, data: campaignDetails } = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );

  // Fix: Ensure campaignId is always a string when used as an object key
  useEffect(() => {
    if (success && campaignDetails) {
      const newStep = pathname.split("/").includes("view") && location?.state?.from === VIEW_CAMPAIGN ? 1 :
        pathname.split("/").includes("edit") && location?.state?.from === EDIT_CAMPAIGN ? 1 :
        (regularPlanData.find(
          (page: any) => page.value === campaignDetails.currentPage
        )?.id || 0);

      setCurrentStep(newStep >= steps ? newStep : newStep + 1);
      const currStep = {
        [campaignId]: newStep >= steps ? newStep : newStep + 1,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [success, campaignDetails, campaignId, location, pathname, dispatch]);

  useEffect(() => {
    navigate(location.pathname, { replace: true, state: {} });
    if (campaignId) dispatch(addDetailsToCreateCampaign({ id: campaignId }));
  }, [navigate, dispatch, campaignId]);

  const stepComponents: Record<number, React.FC<any>> = {
    1: EnterCampaignBasicDetails,
    2: AudienceTouchPointsDetails,
    3: AdvanceFiltersDetails,
    4: RegularCohortComparisonDetails,
    5: ScreenSummaryDetails,
    6: TriggerDetails,
    7: ViewFinalPlanPODetails,
    8: CreativeUploadDetails,
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
          setPageSuccess={setPageSuccess}
          steps={steps}
        />
      </div>
      <div className="w-full h-[75vh] p-4">
        {StepComponent && (
          <StepComponent
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
            userInfo={userInfo}
            successAddCampaignDetails={success}
            campaignType={CAMPAIGN_PLAN_TYPE_REGULAR}
            path="regularplan"
            setPageSuccess={setPageSuccess}
            pageSuccess={pageSuccess}
          />
        )}
      </div>
    </div>
  );
};
