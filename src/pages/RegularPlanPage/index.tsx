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
  CampaignDashboardDetails,
} from "../../components/planner";
import { useDispatch, useSelector } from "react-redux";
import {
  getScreenDataForAdvanceFilters,
  getScreensAudiencesData,
  getScreensCostData,
} from "../../actions/screenAction";
import {
  getAllLocalStorageData,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation, useParams } from "react-router-dom";
import {
  ADVANCE_FILTER_SCREENS_MAP_DATA,
  AUDIENCE_DATA,
  TOTAL_SCREEN_COST_DATA,
} from "../../constants/localStorageConstants";

export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState<any>(getDataFromLocalStorage("currentStep") || 1);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

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

  const screensDataAdvanceFilterGet = useSelector(
    (state: any) => state.screensDataAdvanceFilterGet
  );
  const {
    loading: loadingAdvanceFilterScreens,
    error: errorAdvanceFilterScreens,
    data: advanceFilterScreens,
  } = screensDataAdvanceFilterGet;


  useEffect(() => {
    dispatch(getScreensAudiencesData({ markets: [] }));
    dispatch(
      getScreensCostData({
        cohorts: [],
        touchPoints: [],
        gender: "both",
        duration: 30,
      })
    );
    // dispatch(
    //   getScreenDataForAdvanceFilters({
    //     touchPoints: [
    //       "Arterial Route",
    //       "CBD- SOHO",
    //       "Feeder route",
    //       "Golf course",
    //       "Premium High Street",
    //     ],
    //   })
    // );
  }, [dispatch]);

  useEffect(() => {
    if (screensAudiences) {
      saveDataOnLocalStorage(AUDIENCE_DATA, screensAudiences);
    }

    if (screensCost) {
      saveDataOnLocalStorage(TOTAL_SCREEN_COST_DATA, screensCost);
    }

    if (advanceFilterScreens) {
      saveDataOnLocalStorage(
        ADVANCE_FILTER_SCREENS_MAP_DATA,
        advanceFilterScreens
      );
    }

 
    saveDataOnLocalStorage("currentStep", currentStep);

  }, [screensAudiences, screensCost, advanceFilterScreens, currentStep]);

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
            userInfo={userInfo}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loading || loadingCost}
            error={error || errorCost}
          />
        ) : currentStep === 3 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loadingAdvanceFilterScreens}
            error={errorAdvanceFilterScreens}
          />
        ) : currentStep === 4 ? (
          <RegularCohortComparisonDetails
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
        ) : currentStep === 8 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : currentStep === 9 ? (
          <VendorConfirmationDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <CampaignDashboardDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
};
