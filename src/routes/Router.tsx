import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePageLayout } from "../components";

import {
  ForgetPassword,
  LandingPage,
  PageNotFound,
  RegularPlanPage,
  UpdatePassword,
  VerifyEmail,
  MyCampaignsListPage,
  MyRequestsListPage,
  CampaignDashboardPage,
  MyPlansListPage,
  SpecialDayPlanPage,
  TriggerBasedPlanPage,
  IKnowItAllPlanPage,
  StoreBasedPlanPage,
  MediaOwnerPage,
  MarketersPage,
  SignIn,
  SignUp,
  MyUsers,
} from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import {
  AUTH,
  CAMPAIGN_DETAILS_PAGE,
  FORGET_PASSWORD,
  HOME,
  MARKETS_PAGE,
  MEDIA_OWNER_PAGE,
  MY_CAMPAIGNS_LIST,
  MY_PLANS_LIST,
  MY_REQUESTS_LIST,
  REGULARPLAN,
  SIGN_UP,
  UPDATE_PASSWORD,
  USERS,
  VERIFY_EMAIL,
} from "./routes";
import { PowerPointGenerator } from "../pages/PowerPointGenerator";
import { PublicRoute } from "../layout/PublicRoute";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AUTH}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path={SIGN_UP}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path={VERIFY_EMAIL}
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />
        <Route
          path={FORGET_PASSWORD}
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          path={UPDATE_PASSWORD}
          element={
            <PublicRoute>
              <UpdatePassword />
            </PublicRoute>
          }
        />
        <Route
          path={USERS}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <MyUsers />
            </PrivateRoute>
          }
        />

        <Route
          path={HOME}
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path={MY_CAMPAIGNS_LIST}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <MyCampaignsListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={MY_REQUESTS_LIST}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <MyRequestsListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={MEDIA_OWNER_PAGE}
          element={
            <PublicRoute>
              <MediaOwnerPage />
            </PublicRoute>
          }
        />

        <Route
          path={MARKETS_PAGE}
          element={
            <PublicRoute>
              <MarketersPage />
            </PublicRoute>
          }
        />
        <Route
          path={MY_PLANS_LIST}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <MyPlansListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaignDetails/:id?"}
          element={
            <PublicRoute layout={HomePageLayout}>
              <CampaignDashboardPage />
            </PublicRoute>
          }
        />
        <Route
          path={"/regularplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <RegularPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/specialdayplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <SpecialDayPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/triggerbasedplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <TriggerBasedPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/storebasedplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <StoreBasedPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/iknowitallplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <IKnowItAllPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/ppt"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <PowerPointGenerator />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
