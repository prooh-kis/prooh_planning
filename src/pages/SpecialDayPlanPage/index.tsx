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
import { SpecialDay } from "../../components/planner/SpecialDay";

const pages = [
  {
    id: 1,
    value: "Topical Day Page",
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
    value: "View Final Plan Page",
  },
  {
    id: 7,
    value: "Upload Creative Page",
  },
  {
    id: 8,
    value: "Vendor Confirmation Page",
  },

  {},
];

export const SpecialDayPlanPage: React.FC = () => {
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
          )[0]?.id || 0
        ) + 1
      );
      // dispatch(
      //   getScreensAudiencesData({
      //     id: campDetails?._id,
      //     markets: campDetails?.markets,
      //   })
      // );
      // dispatch(
      //   getScreensCostData({
      //     id: campDetails?._id,
      //     cohorts: campDetails?.cohorts,
      //     touchPoints: campDetails?.touchPoints,
      //     gender: campDetails?.gender,
      //     duration: campDetails?.duration,
      //   })
      // );
      // dispatch(
      //   getScreenSummaryPlanTableData({
      //     id: campaignId,
      //     screenIds: campDetails?.screenIds,
      //   })
      // );
      const curr =
        Number(
          pages.filter(
            (page: any) => page.value === campDetails?.currentPage
          )[0]?.id || 0
        ) + 1;
      const currStep = {
        [campaignId]: curr,
      };
      saveDataOnLocalStorage(CURRENT_STEP, currStep);
    } else {
      // dispatch(getScreensAudiencesData({ id: "", markets: [] }));
      // dispatch(
      //   getScreensCostData({
      //     id: "",
      //     cohorts: [],
      //     touchPoints: [],
      //     gender: "both",
      //     duration: 30,
      //   })
      // );
    }
  }, [success, campaignDetails, campaignId]);

  useEffect(() => {
    if (campaignId !== null || undefined) {
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
  }, [dispatch, campaignId]);

  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider
          step={currentStep}
          setStep={setCurrentStep}
          steps={pathname?.split("/").includes("specialdayplan") ? 8 : 9}
        />
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {currentStep === 1 ? (
          <SpecialDay
            setCurrentStep={setCurrentStep}
            step={currentStep}
            userInfo={userInfo}
            pathname={pathname}
            campaignId={campaignId}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 3 ? (
          <AdvanceFiltersDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
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
          <ViewFinalPlanPODetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 7 ? (
          <CreativeUploadDetails
            step={currentStep}
            setCurrentStep={setCurrentStep}
            campaignId={campaignId}
          />
        ) : currentStep === 8 ? (
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
