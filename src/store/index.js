import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk"
import authReducer from "./authSlice";
import {
  screensAudiencesDataGetReducer,
  screensCostDataGetReducer,
  screensDataAdvanceFilterGetReducer,
} from "../reducers/screenReducers";
import {
  userEmailVerificationReducer,
  userSendEmailToResetPasswordReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdatePasswordReducer } from "../reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const store = configureStore({
  initialState,
  reducer: {
    //screen
    screensAudiencesDataGet: screensAudiencesDataGetReducer,
    screensCostDataGet: screensCostDataGetReducer,
    screensDataAdvanceFilterGet : screensDataAdvanceFilterGetReducer,
    // auth
    auth: authReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    emailVerify: userEmailVerificationReducer,
    userSendEmailToResetPassword: userSendEmailToResetPasswordReducer,

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
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ userInfo: state.auth.userInfo })
    );
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
  }
});

export default store;
