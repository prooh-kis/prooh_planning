import React, { useEffect, useState } from "react";
import { PlanSummaryTable } from "../tables/PlanSummaryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanningPageFooterData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { Footer } from "../footer";
import {
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_SELECTION,
  SCREEN_SUMMARY_TABLE_DATA,
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface ScreenSummaryDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  regularVsCohortSuccessStatus?: any;
  successAddCampaignDetails?: any;
  pageSuccess?: boolean;
  setPageSuccess?: any;
}

export const StoreBasedPlanSummaryTable = ({
  setCurrentStep,
  step,
  campaignId,
  successAddCampaignDetails,
  pageSuccess,
  setPageSuccess,
}: ScreenSummaryDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const regularVsCohort =
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType;
  const [showSummary, setShowSummary] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const screensBuyingCount =
    getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] ?? {};

  const screenSummaryPlanTableDataGet = useSelector(
    (state: any) => state.screenSummaryPlanTableDataGet
  );
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;
  const getSelectedScreenIdsFromAllCities = (citiesData: any) => {
    let activeScreenIds: any = [];

    for (const city in citiesData) {
      const screens = citiesData[city];
      const activeScreens = Object.keys(screens).filter(
        (screenId) => screens[screenId].status === true
      );
      activeScreenIds = activeScreenIds.concat(activeScreens);
    }

    return activeScreenIds;
  };

  const handleSaveAndContinue = async () => {
    if (!pathname.split("/").includes("view")) {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Screen Summary Page",
          id: pathname.split("/").splice(-1)[0],
          totalScreens: getSelectedScreenIdsFromAllCities(screensBuyingCount),
          totalImpression: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[
            campaignId
          ]?.total?.totalImpression,
          totalReach: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[
            campaignId
          ]?.total?.totalReach,
          totalCampaignBudget: getDataFromLocalStorage(
            SCREEN_SUMMARY_TABLE_DATA
          )?.[campaignId]?.total?.totalCampaignBudget,
          totalCpm: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[
            campaignId
          ]?.total?.totalCpm,
          duration:
            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
        })
      );
    }
    setCurrentStep(step + 1);

  };

  useEffect(() => {
    if (screenSummaryPlanTableData) {
      setPageLoading(false);
    }
  }, [screenSummaryPlanTableData]);

  useEffect(() => {
    if (!successAddCampaignDetails) return;
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
    });
    setPageSuccess(true);
  }, [successAddCampaignDetails]);

  useEffect(() => {
    if (!pageSuccess) return;

    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Screen Summary Page",
      })
    );
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds,
      })
    );
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
    });
  }, [campaignId, dispatch, pageSuccess]);

  return (
    <div className="w-full">
      {pageLoading ? (
        <LoadingScreen />
      ) : errorScreenSummaryPlanTable ? (
        <div className="p-4 bg-red-300 text-[#FFFFFF] ">
          Something went wrong! please refresh the page...
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-3xl ">
            Screens summary as per “
            {regularVsCohort === "cohort" ? "COHORT" : "REGULAR"}” selection{" "}
          </h1>
          <h1 className="text-sm text-gray-500 ">
            You can further optimized your plan by deselecting locations in the
            screen summary
          </h1>

          <div className="pb-10">
            <div className="w-full">
              <PlanSummaryTable
                successAddCampaignDetails={successAddCampaignDetails}
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                regularVsCohort={regularVsCohort}
                loading={loadingScreenSummaryPlanTable}
                error={errorScreenSummaryPlanTable}
                data={screenSummaryPlanTableData}
                getSelectedScreenIdsFromAllCities={
                  getSelectedScreenIdsFromAllCities
                }
                campaignId={campaignId}
                screensBuyingCount={screensBuyingCount}
                pathname={pathname}
                setCurrentStep={setCurrentStep}
              />
            </div>
          </div>

          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              mainTitle="Continue"
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={() => {
                handleSaveAndContinue();
              }}
              campaignId={campaignId}
              pageName={`Screen Summary Page`}
              successAddCampaignDetails={successAddCampaignDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};
