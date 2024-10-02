import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  CohortComparisonDetails,
  CreativeUploadDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  TriggerDetails,
  ViewFinalPlanPODetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import { getScreensAudiencesData, getScreensCostData } from "../../actions/screenAction";
import {
  getAllLocalStorageData,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";

export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState<any>(1);

  const screensAudiencesDataGet = useSelector(
    (state: any) => state.screensAudiencesDataGet
  );
  const {
    loading: loading,
    error: error,
    data: screensAudiences,
  } = screensAudiencesDataGet;

  const screensCostDataGet = useSelector(
    (state: any) => state.screensCostDataGet
  );
  const {
    loading: loadingCost,
    error: errorCost,
    data: screensCost,
  } = screensCostDataGet;

  useEffect(() => {
    dispatch(getScreensAudiencesData({ markets: [] }));
    dispatch(getScreensCostData({
      cohorts: [],
      touchPoints: [],
      gender: "both",
      duration: 30,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (screensAudiences) {
      saveDataOnLocalStorage(`audienceData`, screensAudiences);
    }

    if (screensCost) {
      saveDataOnLocalStorage(`totalScreenCostData`, screensCost);
    }
  }, [screensAudiences, screensCost]);
  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider step={currentStep} setStep={setCurrentStep} steps={9} />
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {currentStep === 1 ? (
          <EnterCampaignBasicDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignType={location?.state?.campaignType}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loading}
            error={error}
          />
        ) : currentStep === 3 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 4 ? (
          <CohortComparisonDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 5 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 6 ? (
          <TriggerDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 7 ? (
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
};
