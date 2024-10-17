import { CampaignTemplates } from "../../components/index";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      {userInfo && userInfo?.isBrand && userInfo?.userRole === "secondary" ? (
        <CampaignTemplates />
      ) : (
        <div className="">
          <h1 className="text-2xl font-bold">
            Only Campaign managers can access this feature...
          </h1>
          <p className="text-md">
            Please contact support or create a new user with {"Campaign Manager"} role!!!
          </p>
        </div>
      )}
    </div>
  );
};
