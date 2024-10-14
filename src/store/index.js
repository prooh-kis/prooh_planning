import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk"
import authReducer from "./authSlice";
import {
  finalPlanPOTableDataGetReducer,
  regularVsCohortPriceDataGetReducer,
  screenDataUploadCreativeReducer,
  screensAudiencesDataGetReducer,
  screensCostDataGetReducer,
  screensDataAdvanceFilterGetReducer,
  screenSummaryDataGetReducer,
  screenSummaryPlanTableDataGetReducer,
  vendorConfirmationDetailsGetReducer,
  vendorConfirmationStatusTableDetailsGetReducer,
} from "../reducers/screenReducers";
import {
  emailSendForConfirmationReducer,
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
  
} from "../reducers/campaignReducers";
import {
  cricketMatchesListGetReducer,
  playersListGetReducer,
} from "../reducers/externalApiReducers";

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
    vendorConfirmationStatusTableDetailsGet: vendorConfirmationStatusTableDetailsGetReducer,

    // campaign
    detailsToCreateCampaignAdd: detailsToCreateCampaignAddReducer,
    myCreateCampaignsListGet: myCreateCampaignsListGetReducer,
    myCreateCampaignsManagerRequestsListGet: myCreateCampaignsManagerRequestsListGetReducer,
    myCreateCampaignsVendorRequestsListGet: myCreateCampaignsVendorRequestsListGetReducer,
    campaignStatusChangeAfterCreativeUpload: campaignStatusChangeAfterCreativeUploadReducer,
    campaignStatusChangeAfterVendorApproval: campaignStatusChangeAfterVendorApprovalReducer,

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
