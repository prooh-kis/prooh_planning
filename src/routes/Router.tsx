import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePageLayout, ScreenSummary } from "../components";

import { LandingPage, PageNotFound, RegularPlanPage } from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import { HOME, REGULARPLAN } from "./routes";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={HOME}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <LandingPage />
            </PrivateRoute>
          }
        />

        <Route
          path={REGULARPLAN}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <RegularPlanPage />
            </PrivateRoute>
          }
        />

        <Route
          path={"Screen summary"}
          element={
            <PrivateRoute layout={HomePageLayout}>
              <ScreenSummary />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
