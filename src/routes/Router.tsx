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
  FORGET_PASSWORD,
  HOME,
  ADVERTISERS_PAGE,
  MEDIA_OWNER_PAGE,
  MY_CAMPAIGNS_LIST,
  MY_PLANS_LIST,
  PLAY_LIVE_URL,
  SIGN_UP,
  UPDATE_PASSWORD,
  USERS,
  VERIFY_EMAIL,
  MY_CREATIVES,
  NEW_DASHBOARD,
} from "./routes";
import { PowerPointGenerator } from "../pages/PowerPointGenerator";
import { PublicRoute } from "../layout/PublicRoute";
import { AppDashBoardLayout } from "../layout/AppDashBoardLayout";

import { PlayLiveUrl } from "../pages/PageNotFound/PlayLiveUrl";
import { MyCreativesPage } from "../pages/MyCreativesPage";
import { CampaignDetailsPage } from "../pages/CampaignDetailsPage";
import { NewDashBoard } from "../pages/NewDashBoard";

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
            <AppDashBoardLayout>
              <MyUsers />
            </AppDashBoardLayout>
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
          path={"/campaignDetails/:id?"}
          element={
            <AppDashBoardLayout className="bg-[#D3D3D310] pt-16">
              <CampaignDetailsPage />
            </AppDashBoardLayout>
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
          path={ADVERTISERS_PAGE}
          element={
            <PublicRoute>
              <MarketersPage />
            </PublicRoute>
          }
        />

        <Route
          path={MY_CAMPAIGNS_LIST}
          element={
            <AppDashBoardLayout className="bg-[#D1D1D110] pt-16">
              <MyCampaignsListPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={MY_PLANS_LIST}
          element={
            <AppDashBoardLayout className="bg-[#D1D1D110] pt-16">
              <MyPlansListPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={MY_CREATIVES}
          element={
            <AppDashBoardLayout className="bg-[#D1D1D110] pt-20">
              <MyCreativesPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={NEW_DASHBOARD}
          element={
            <PublicRoute layout={HomePageLayout}>
              <NewDashBoard />
            </PublicRoute>
          }
        />
        <Route
          path={"/campaignDashboard/:id?"}
          element={
            <PublicRoute layout={HomePageLayout}>
              <CampaignDashboardPage />
            </PublicRoute>
          }
        />
        <Route
          path={"/regularplan/:id?/:type?"}
          element={
            <AppDashBoardLayout>
              <RegularPlanPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={"/specialdayplan/:id?/:type?"}
          element={
            <AppDashBoardLayout>
              <SpecialDayPlanPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={"/triggerbasedplan/:id?/:type?"}
          element={
            <AppDashBoardLayout>
              <TriggerBasedPlanPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={"/storebasedplan/:id?/:type?"}
          element={
            <AppDashBoardLayout>
              <StoreBasedPlanPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={"/iknowitallplan/:id?/:type?"}
          element={
            <AppDashBoardLayout>
              <IKnowItAllPlanPage />
            </AppDashBoardLayout>
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
        <Route path={PLAY_LIVE_URL} element={<PlayLiveUrl />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
