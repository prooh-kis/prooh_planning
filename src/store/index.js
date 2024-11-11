import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk"
import authReducer from "./authSlice";
import {
  campaignDashboardDataGetReducer,
  finalPlanPOTableDataGetReducer,
  tableDataForSelectTriggerPageGetReducer,
  tableDataForSelectTopicalDayPageGetReducer,
  landingPageDataGetReducer,
  planningPageFooterDataGetReducer,
  regularVsCohortPriceDataGetReducer,
  screenDataUploadCreativeReducer,
  screensAudiencesDataGetReducer,
  screensCostDataGetReducer,
  screensDataAdvanceFilterGetReducer,
  screenSummaryDataGetReducer,
  screenSummaryPlanTableDataGetReducer,
  tableDataScreenWiseAdPlayTimeGetReducer,
  vendorConfirmationDetailsGetReducer,
  vendorConfirmationStatusTableDetailsGetReducer,
  tableDataSetAdPlayTimeReducer,
} from "../reducers/screenReducers";
import {
  emailSendForConfirmationReducer,
  emailSendForVendorConfirmationReducer,
  userEmailVerificationReducer,
  userSendEmailToResetPasswordReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdatePasswordReducer,
} from "../reducers/userReducers";
import {
  detailsToCreateCampaignAddReducer,
  myCreateCampaignsManagerRequestsListGetReducer,
  myCreateCampaignsListGetReducer,
  myCreateCampaignsVendorRequestsListGetReducer,
  campaignStatusChangeAfterCreativeUploadReducer,
  campaignStatusChangeAfterVendorApprovalReducer,
  campaignDurationChangeReducer,
} from "../reducers/campaignReducers";
import {
  cricketMatchesListGetReducer,
  playersListGetReducer,
} from "../reducers/externalApiReducers";
import {
  getCalendarListDataReducer,
  getIndustryCategoryReducer,
} from "../reducers/calenderReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const store = configureStore({
  initialState,
  reducer: {
    landingPageDataGet: landingPageDataGetReducer,
    //screen
    screensAudiencesDataGet: screensAudiencesDataGetReducer,
    screensCostDataGet: screensCostDataGetReducer,
    screensDataAdvanceFilterGet: screensDataAdvanceFilterGetReducer,
    regularVsCohortPriceDataGet: regularVsCohortPriceDataGetReducer,
    screenSummaryDataGet: screenSummaryDataGetReducer,
    screenSummaryPlanTableDataGet: screenSummaryPlanTableDataGetReducer,
    finalPlanPOTableDataGet: finalPlanPOTableDataGetReducer,
    screenDataUploadCreative: screenDataUploadCreativeReducer,
    vendorConfirmationDetailsGet: vendorConfirmationDetailsGetReducer,
    vendorConfirmationStatusTableDetailsGet:
      vendorConfirmationStatusTableDetailsGetReducer,
    campaignDashboardDataGet: campaignDashboardDataGetReducer,

    planningPageFooterDataGet: planningPageFooterDataGetReducer,

    tableDataScreenWiseAdPlayTimeGet: tableDataScreenWiseAdPlayTimeGetReducer,

    tableDataForSelectTopicalDayPageGet:
      tableDataForSelectTopicalDayPageGetReducer,
    tableDataForSelectTriggerPageGet: tableDataForSelectTriggerPageGetReducer,
    tableDataSetAdPlayTimeStore: tableDataSetAdPlayTimeReducer,

    // campaign
    detailsToCreateCampaignAdd: detailsToCreateCampaignAddReducer,
    myCreateCampaignsListGet: myCreateCampaignsListGetReducer,
    myCreateCampaignsManagerRequestsListGet:
      myCreateCampaignsManagerRequestsListGetReducer,
    myCreateCampaignsVendorRequestsListGet:
      myCreateCampaignsVendorRequestsListGetReducer,
    campaignStatusChangeAfterCreativeUpload:
      campaignStatusChangeAfterCreativeUploadReducer,
    campaignStatusChangeAfterVendorApproval:
      campaignStatusChangeAfterVendorApprovalReducer,
    updateCampaignDuration: campaignDurationChangeReducer,

    // external apis
    cricketMatchesListGet: cricketMatchesListGetReducer,
    playersListGet: playersListGetReducer,

    // auth
    auth: authReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    emailVerify: userEmailVerificationReducer,
    userSendEmailToResetPassword: userSendEmailToResetPasswordReducer,
    emailSendForConfirmation: emailSendForConfirmationReducer,
    emailSendForVendorConfirmation: emailSendForVendorConfirmationReducer,

    //
    industryCategory: getIndustryCategoryReducer,
    calendarListData: getCalendarListDataReducer,
  },
  // middleware: thunk
  // devTools: process.env.NODE_ENV !== 'production'
});

store.subscribe(() => {
  const state = store.getState();
  if (state.auth.isLoggedIn) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        userInfo: state.auth.userInfo,
        loginTime: state.auth.loginTime,
      })
    );
    // localStorage.setItem(
    //   "userInfo",
    //   JSON.stringify({ userInfo: state.auth.userInfo })
    // );
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
  }
});

export default store;
