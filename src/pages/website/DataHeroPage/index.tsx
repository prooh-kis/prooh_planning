import { PageFooter } from "../../../components/PageFooter";
import React from "react";
import Helper from "./Helper";

export const DataHeroPage = () => {
  return (
    <div className="w-screen h-full pt-12 absolute">
      <div className="relative">
        <Helper />
      </div>

      <div className="relative">
        <PageFooter />
      </div>
    </div>
  );
};
