import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Landing } from "./Landing";
import { CAMPAIGN_PLANNER } from "../../../constants/userConstants";
import { PLAY_CAMPAIGN } from "../../../routes/routes";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (userInfo && userInfo?.userRole === CAMPAIGN_PLANNER)
      navigate(PLAY_CAMPAIGN);
  }, [userInfo]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Landing />
    </div>
  );
};
