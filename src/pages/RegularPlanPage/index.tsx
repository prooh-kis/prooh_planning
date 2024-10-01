import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  CohortComparisonDetails,
  EnterCampaignBasicDetails,
  ScreenSummaryDetails,
  TriggerDetails,
  ViewFinalPlanAndShare,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import { getScreenDataByAudiences } from "../../actions/screenAction";
import {
  getAllLocalStorageData,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";

export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState<any>(1);

  const allScreenDataByAudiencesGet = useSelector(
    (state: any) => state.allScreenDataByAudiencesGet
  );
  const {
    loading: loadingASDBAG,
    error: errorASDBAG,
    data: dataASDBAG,
  } = allScreenDataByAudiencesGet;

  useEffect(() => {
    dispatch(getScreenDataByAudiences({ screenIds: [] }));
  }, [dispatch]);

  useEffect(() => {
    if (dataASDBAG) {
      console.log("gdfege")
      saveDataOnLocalStorage(`screen_audience_data_1`, dataASDBAG);
    }
  }, [dataASDBAG]);
  console.log(location);
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
            data={dataASDBAG}
            loading={loadingASDBAG}
            error={errorASDBAG}
          />
        ) : currentStep === 3 ? (
          <AdvanceFiltersDetails />
        ) : currentStep === 4 ? (
          <CohortComparisonDetails />
        ) : currentStep === 5 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 6 ? (
          <TriggerDetails />
        ) : (
          <ViewFinalPlanAndShare
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        )}
      </div>
    </div>
  );
};
