import React, { useEffect, useState } from "react";
import {
  VendorConfirmationDetails,
  CreativeUploadV4,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCampaignCreationsDetails } from "../../actions/campaignAction";
import {
  CAMPAIGN_PLAN_TYPE_KNOW,
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { EditStepperSlider } from "../../components/molecules/EditStepperSlider";
import { EditCreativeData } from "../../data/allPlanerData";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { CURRENT_STEP } from "../../constants/localStorageConstants";

export const EditCampaignFlow: React.FC = () => {
  const dispatch = useDispatch<any>();
  const steps = 2;
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const [campaignDetails, setCampaignDetails] = useState<any>(null);
  const campaignId: any = pathname.split("/")[2] || null;
  const [currentStep, setCurrentStep] = useState<any>(1);

  const { userInfo } = useSelector((state: any) => state.auth);
  const { loading: loadingCampaignDetails, data: campaignData } = useSelector(
    (state: any) => state.campaignCreationsDetailsGet
  );

  useEffect(() => {
    if (campaignData) {
      setCampaignDetails(campaignData);
      const newStep =
        pathname.split("/").includes("view") && state?.from === VIEW_CAMPAIGN
          ? 1
          : location.pathname.split("/").includes("edit") &&
            state?.from === EDIT_CAMPAIGN
          ? 1
          : EditCreativeData.find(
              (page: any) => page.value === campaignData.currentPage
            )?.id || 0;
      if (state.changeCreative) {
        setCurrentStep(1);
        saveDataOnLocalStorage(CURRENT_STEP, 1);
        return;
      }
      setCurrentStep(
        newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep + 1
      );
      const currStep = {
        [campaignId]:
          newStep >= steps ? newStep : newStep == 1 ? newStep + 1 : newStep + 1,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    }
  }, [campaignData, campaignId, pathname, state?.from]);

  useEffect(() => {
    if (campaignId) {
      dispatch(getCampaignCreationsDetails({ id: campaignId }));
    }
  }, [dispatch, navigate, pathname, campaignId]);

  const stepComponents: Record<number, React.FC<any>> = {
    1: CreativeUploadV4,
    2: VendorConfirmationDetails,
  };

  const StepComponent =
    stepComponents[currentStep] || (() => <div>Invalid step</div>);

  return (
    <div className="w-full">
      {/* Stepper Slider */}
      <div className="w-full h-auto">
        <EditStepperSlider
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
            path={state?.path || "iknowitallplan"}
            campaignDetails={campaignDetails}
          />
        </div>
      )}
    </div>
  );
};
