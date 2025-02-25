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
  screenSummaryDataIKnowItAllGetReducer,
  poiBasedAudienceDataAdvanceFilterGetReducer,
} from "../reducers/screenReducers";
import {
  emailSendForConfirmationReducer,
  emailSendForVendorConfirmationReducer,
  userAddNewUserReducer,
  userDeleteReducer,
  userEmailVerificationReducer,
  userListReducer,
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
  campaignLogsGetReducer,
  campaignMonitoringPicsGetReducer,
  myCreateCampaignsListForPlanGetReducer,
} from "../reducers/campaignReducers";
import {
  cricketMatchesListGetReducer,
  playersListGetReducer,
} from "../reducers/externalApiReducers";
import {
  getCalendarListDataReducer,
  getIndustryCategoryReducer,
} from "../reducers/calenderReducers";
import {
  applyCouponForCampaignReducer,
  getCouponListReducer,
  removeCouponForCampaignReducer,
} from "../reducers/couponReducers";
import { billInvoiceCreationReducer, billInvoiceDetailsGetReducer } from "../reducers/billInvoiceReducers";
import { allClientAgencyNamesListGetReducer, clientAgencyDetailsAddGetReducer, clientAgencyDetailsGetReducer } from "../reducers/clientAgencyReducers";

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
    poiBasedAudienceDataAdvanceFilterGet: poiBasedAudienceDataAdvanceFilterGetReducer,
    regularVsCohortPriceDataGet: regularVsCohortPriceDataGetReducer,
    screenSummaryDataGet: screenSummaryDataGetReducer,
    screenSummaryDataIKnowItAllGet : screenSummaryDataIKnowItAllGetReducer,
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
    myCreateCampaignsListForPlanGet: myCreateCampaignsListForPlanGetReducer,
    myCreateCampaignsManagerRequestsListGet:
      myCreateCampaignsManagerRequestsListGetReducer,
    myCreateCampaignsVendorRequestsListGet:
      myCreateCampaignsVendorRequestsListGetReducer,
    campaignStatusChangeAfterCreativeUpload:
      campaignStatusChangeAfterCreativeUploadReducer,
    campaignStatusChangeAfterVendorApproval:
      campaignStatusChangeAfterVendorApprovalReducer,
    updateCampaignDuration: campaignDurationChangeReducer,
    campaignLogsGet: campaignLogsGetReducer,
    campaignMonitoringPicsGet: campaignMonitoringPicsGetReducer,

    // external apis
    cricketMatchesListGet: cricketMatchesListGetReducer,
    playersListGet: playersListGetReducer,

    // auth
    auth: authReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userAddNewUser : userAddNewUserReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    emailVerify: userEmailVerificationReducer,
    userSendEmailToResetPassword: userSendEmailToResetPasswordReducer,
    emailSendForConfirmation: emailSendForConfirmationReducer,
    emailSendForVendorConfirmation: emailSendForVendorConfirmationReducer,

    //
    industryCategory: getIndustryCategoryReducer,
    calendarListData: getCalendarListDataReducer,

    // COUPONS
    couponList: getCouponListReducer,
    couponApplyForCampaign: applyCouponForCampaignReducer,
    couponRemoveForCampaign: removeCouponForCampaignReducer,

    // Client/Agency
    allClientAgencyNamesListGet: allClientAgencyNamesListGetReducer,
    clientAgencyDetailsGet: clientAgencyDetailsGetReducer,
    clientAgencyDetailsAdd: clientAgencyDetailsAddGetReducer,

    // Bill Invoice
    billInvoiceCreation: billInvoiceCreationReducer,
    billInvoiceDetailsGet: billInvoiceDetailsGetReducer,
    //USER
    userList: userListReducer,
    userDelete: userDeleteReducer,
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
