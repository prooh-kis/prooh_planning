import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CampaignTemplates, HomePageLayout } from "../components";

import {
  ForgetPassword,
  PageNotFound,
  RegularPlanPage,
  UpdatePassword,
  VerifyEmail,
  MyCampaignsListPage,
  SpecialDayPlanPage,
  TriggerBasedPlanPage,
  IKnowItAllPlanPage,
  StoreBasedPlanPage,
  SignIn,
  SignUp,
  MyUsers,
  LandingPage,
  MyPlansListPage,
} from "../pages";

import {
  AUTH,
  FORGET_PASSWORD,
  HOME,
  MY_CAMPAIGNS_LIST,
  PLAY_LIVE_URL,
  SIGN_UP,
  UPDATE_PASSWORD,
  USERS,
  VERIFY_EMAIL,
  NEW_DASHBOARD,
  BRAND_AGENCY_PAGE,
  ROUTE,
  MY_PLANS_LIST,
  CAMPAIGN_DETAILS_PAGE,
} from "./routes";
import { PowerPointGenerator } from "../pages/PowerPointGenerator";

import { PlayLiveUrl } from "../pages/PageNotFound/PlayLiveUrl";
import { NewDashBoard } from "../pages/NewDashBoard";
import Engagement from "../pages/Engagement";
import { BrandAgencyPage } from "../pages/PageNotFound/BrandAgency";
import { EditCampaignFlow } from "../pages/EditCampaignFlow";
import { PublicLayout } from "../components/layout/PublicLayout";
import { AppDashBoardLayout } from "../components/layout/AppDashBoardLayout";
import { PrivateLayout } from "../components/layout/PrivateLayout";
import { CampaignDetailsPage } from "../pages/CampaignDetailsPage";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AUTH}
          element={
            <PublicLayout>
              <SignIn />
            </PublicLayout>
          }
        />

        <Route
          path={SIGN_UP}
          element={
            <PublicLayout>
              <SignUp />
            </PublicLayout>
          }
        />

        <Route
          path={VERIFY_EMAIL}
          element={
            <PublicLayout>
              <VerifyEmail />
            </PublicLayout>
          }
        />
        <Route
          path={FORGET_PASSWORD}
          element={
            <PublicLayout>
              <ForgetPassword />
            </PublicLayout>
          }
        />
        <Route
          path={UPDATE_PASSWORD}
          element={
            <PublicLayout>
              <UpdatePassword />
            </PublicLayout>
          }
        />

        <Route
          path={USERS}
          element={
            <AppDashBoardLayout value="Users">
              <MyUsers />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={HOME}
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />

        <Route
          path={ROUTE}
          element={
            <AppDashBoardLayout value="New Plan">
              <CampaignTemplates />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={MY_CAMPAIGNS_LIST}
          element={
            <AppDashBoardLayout value="Campaigns">
              <MyCampaignsListPage />
            </AppDashBoardLayout>
          }
        />

        <Route
          path={MY_PLANS_LIST}
          element={
            <AppDashBoardLayout value="Drafts">
              <MyPlansListPage />
            </AppDashBoardLayout>
          }
        />
        <Route
          path={NEW_DASHBOARD}
          element={
            <PublicLayout>
              <NewDashBoard />
            </PublicLayout>
          }
        />
        <Route
          path={"/editCampaign/:id?"}
          element={
            <PrivateLayout>
              <EditCampaignFlow />
            </PrivateLayout>
          }
        />
        <Route
          path={"/regularplan/:id?/:type?"}
          element={
            <PrivateLayout>
              <RegularPlanPage />
            </PrivateLayout>
          }
        />

        <Route
          path={CAMPAIGN_DETAILS_PAGE}
          element={
            <PrivateLayout padding="pt-0">
              <CampaignDetailsPage />
            </PrivateLayout>
          }
        />
        <Route
          path={"/specialdayplan/:id?/:type?"}
          element={
            <PrivateLayout>
              <SpecialDayPlanPage />
            </PrivateLayout>
          }
        />
        <Route
          path={"/triggerbasedplan/:id?/:type?"}
          element={
            <PrivateLayout>
              <TriggerBasedPlanPage />
            </PrivateLayout>
          }
        />
        <Route
          path={"/storebasedplan/:id?/:type?"}
          element={
            <PrivateLayout>
              <StoreBasedPlanPage />
            </PrivateLayout>
          }
        />
        <Route
          path={"/iknowitallplan/:id?/:type?"}
          element={
            <PrivateLayout>
              <IKnowItAllPlanPage />
            </PrivateLayout>
          }
        />
        <Route
          path={"/ppt"}
          element={
            <PublicLayout layout={HomePageLayout}>
              <PowerPointGenerator />
            </PublicLayout>
          }
        />
        <Route
          path={"/engagement"}
          element={
            <PublicLayout>
              <Engagement />
            </PublicLayout>
          }
        />
        <Route
          path={PLAY_LIVE_URL}
          element={
            <PublicLayout>
              <PlayLiveUrl />
            </PublicLayout>
          }
        />
        <Route
          path={BRAND_AGENCY_PAGE}
          element={
            <PublicLayout>
              <BrandAgencyPage />
            </PublicLayout>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
