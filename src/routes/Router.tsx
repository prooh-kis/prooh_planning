import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePageLayout } from "../components";

import {
  AuthPage,
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
} from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import { AUTH, CAMPAIGN_DETAILS_PAGE, FORGET_PASSWORD, HOME, MY_CAMPAIGNS_LIST, MY_PLANS_LIST, MY_REQUESTS_LIST, REGULARPLAN, UPDATE_PASSWORD, VERIFY_EMAIL } from "./routes";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AUTH}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <AuthPage />
            </PrivateRoute>
          }
        />
        <Route
          path={VERIFY_EMAIL}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <VerifyEmail />
            </PrivateRoute>
          }
        />
        <Route
          path={FORGET_PASSWORD}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <ForgetPassword />
            </PrivateRoute>
          }
        />
            <Route
          path={UPDATE_PASSWORD}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route
          path={HOME}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <LandingPage />
            </PrivateRoute>
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
            <PrivateRoute layout={HomePageLayout}>
              <CampaignDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          // path={REGULARPLAN}
          path={"/regularplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <RegularPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          // path={REGULARPLAN}
          path={"/specialdayplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <SpecialDayPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          // path={REGULARPLAN}
          path={"/triggerbasedplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <TriggerBasedPlanPage />
            </PrivateRoute>
          }
        />
        <Route
          // path={REGULARPLAN}
          path={"/iknowitallplan/:id?"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <IKnowItAllPlanPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
