import React, { useEffect, useRef, useState } from "react";
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
  getScreensAudiencesData,
  getScreensCostData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import {
  CURRENT_STEP,
  FULL_CAMPAIGN_PLAN,
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { CAMPAIGN_PLAN_TYPE_REGULAR } from "../../constants/campaignConstants";

const pages = [
  {
    id: 1,
    value: "Basic Details Page",
  },
  {
    id: 2,
    value: "Audience And TouchPoint Page",
  },
  {
    id: 3,
    value: "Advance Filter Page",
  },
  {
    id: 4,
    value: "Compare Plan Page",
  },
  {
    id: 5,
    value: "Screen Summary Page",
  },
  {
    id: 6,
    value: "Add Triggers Page",
  },
  {
    id: 7,
    value: "View Final Plan Page",
  },
  {
    id: 8,
    value: "Upload Creative Page",
  },
  {
    id: 9,
    value: "Vendor Confirmation Page",
  },
  {
    id: 10,
    value: "Campaign Dashboard Page",
  },
  {},
];

export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const { pathname } = location;
  const campaignId: any =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;
  // console.log(campaignId);

  const [currentStep, setCurrentStep] = useState<any>(
    campaignId ? getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] : 1
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const screensAudiencesDataGet = useSelector(
    (state: any) => state.screensAudiencesDataGet
  );
  const {
    loading: loadingAudiences,
    error: errorAudiences,
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

  const screenSummaryPlanTableDataGet = useSelector(
    (state: any) => state.screenSummaryPlanTableDataGet
  );
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading,
    error,
    success,
    data: campaignDetails,
  } = detailsToCreateCampaignAdd;

  useEffect(() => {
    if (campaignDetails) {
      // const campDetails = location.state.campaign
      const campDetails = campaignDetails;

      setCurrentStep(
        Number(
          pages.filter(
            (page: any) => page.value === campDetails?.currentPage
          )[0]?.id
        ) + 1
      );
      dispatch(getScreensAudiencesData({ markets: campDetails?.markets }));
      dispatch(
        getScreensCostData({
          cohorts: campDetails?.cohorts,
          touchPoints: campDetails?.touchPoints,
          gender: campDetails?.gender,
          duration: campDetails?.duration,
        })
      );
      dispatch(
        getScreenSummaryPlanTableData({
          id: campaignId,
          screenIds: campDetails?.screenIds,
        })
      );
      const curr =
        Number(
          pages.filter(
            (page: any) => page.value === campDetails?.currentPage
          )[0].id
        ) + 1;
      const currStep = {
        [campaignId]: curr,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
      console.log(currStep);
    } else {
      dispatch(getScreensAudiencesData({ markets: [] }));
      dispatch(
        getScreensCostData({
          cohorts: [],
          touchPoints: [],
          gender: "both",
          duration: 30,
        })
      );
    }
  }, [dispatch, campaignDetails]);

  useEffect(() => {
    console.log(campaignId);
    if (campaignId !== null || undefined) {
      console.log(campaignId);
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
      // const campDetails = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
    }
  }, [dispatch, campaignId]);

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
            userInfo={userInfo}
            pathname={pathname}
            campaignId={campaignId}
            campaignType={CAMPAIGN_PLAN_TYPE_REGULAR}
            path={"regularplan"}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loadingAudiences || loadingCost}
            error={errorAudiences || errorCost}
            campaignId={campaignId}
          />
        ) : currentStep === 3 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            loading={loadingAdvanceFilterScreens}
            error={errorAdvanceFilterScreens}
            campaignId={campaignId}
          />
        ) : currentStep === 4 ? (
          <RegularCohortComparisonDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 5 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 6 ? (
          <TriggerDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 7 ? (
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 8 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 9 ? (
          <VendorConfirmationDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
            userInfo={userInfo}
          />
        ) : null}
      </div>
    </div>
  );
};
