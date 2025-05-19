import React, { useEffect, useState } from "react";
import { PlanSummaryTable } from "./PlanSummaryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanningPageFooterData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer";
import { addDetailsToCreateCampaign, getCampaignCreationsDetails } from "../../actions/campaignAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { message } from "antd";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";

interface ScreenSummaryDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  regularVsCohortSuccessStatus?: any;
  campaignDetails?: any;
}

export const IKnowItAllPlanSummaryTable = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails
}: ScreenSummaryDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [dataToUse, setDataToUse] = useState<any>(null);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    data: addCampaignData,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;
  
  const screenSummaryPlanTableDataGet = useSelector(
    (state: any) => state.screenSummaryPlanTableDataGet
  );
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;


  const handleSaveAndContinue = async () => {
    if (!pathname.split("/").includes("view")) {
      dispatch(
        addDetailsToCreateCampaign({
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
          pageName: "Screen Summary Page",
          id: campaignDetails?._id,
          totalScreens: campaignDetails?.screenIds,
          totalImpression: dataToUse?.total?.totalImpression,
          totalReach: dataToUse?.total?.totalReach,
          totalCampaignBudget: dataToUse?.total?.totalCampaignBudget,
          totalCpm: dataToUse?.total?.totalCpm,
          duration: campaignDetails?.duration,
        })
      );
    }
  };

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      setCurrentStep(step+1);
    }
  },[successAddDetails, step, setCurrentStep, dispatch]);

  useEffect(() => {
    if (errorAddDetails) {
      message.error("Error in add campaign details...")
    }

    if (errorScreenSummaryPlanTable) {
      message.error("Error in getting plan table data...")
    }
  },[ errorAddDetails, errorScreenSummaryPlanTable]);

  useEffect(() => {
    if (!campaignDetails) return;
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds: campaignDetails?.screenIds,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Screen Summary Page",
      })
    );
  }, [campaignId, dispatch, campaignDetails]);

  useEffect(() => {
    if (screenSummaryPlanTableData) {
      setDataToUse(screenSummaryPlanTableData);
    }
  },[screenSummaryPlanTableData]);

  return (
    <div className="w-full">
      {loadingScreenSummaryPlanTable ? (
        <LoadingScreen />
      ) : errorScreenSummaryPlanTable ? (
        <div className="p-4 bg-red-300 text-[#FFFFFF] ">
          Something went wrong! please refresh the page...
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-3xl ">
            Plan Summary
          </h1>
          <h1 className="text-sm text-gray-500 ">
            You can further optimized your plan by deselecting locations in the
            screen summary
          </h1>

          <div className="pb-10">
            <div className="w-full">
              <PlanSummaryTable
                screenSummaryPlanTableData={dataToUse}
                loadingScreenSummaryPlanTable={loadingScreenSummaryPlanTable}
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
              loadingCost={loadingAddDetails || loadingScreenSummaryPlanTable}
              successCampaignDetails={successAddDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};
