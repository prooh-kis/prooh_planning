import { CampaignTemplates } from "../../components/index";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Landing } from "./Landing";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { CAMPAIGN_PLANNER } from "../../constants/userConstants";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
  }, [dispatch]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      {userInfo && userInfo?.userRole === CAMPAIGN_PLANNER ? (
        <CampaignTemplates />
      ) : (
        <Landing />
      )}
    </div>
  );
};
