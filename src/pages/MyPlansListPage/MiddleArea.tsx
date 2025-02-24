import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MyPlansList } from "./MyPlansList";
import { getMyCreateCampaignsList, getMyCreateCampaignsListForPlan } from "../../actions/campaignAction";
import { Loading } from "../../components/Loading";
import { message } from "antd";
import { NoDataView } from "../../components/molecules/NoDataView";
import { CAMPAIGN_PLANNER, SCREEN_OWNER } from "../../constants/userConstants";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsListForPlanGet = useSelector(
    (state: any) => state.myCreateCampaignsListForPlanGet
  );
  const {
    loading: loadingCampaignsListForPlan,
    error: errorCampaignsListForPlan,
    data: campaignsListForPlan,
  } = myCreateCampaignsListForPlanGet;

  useEffect(() => {
    if (!userInfo) {
      navigate("/auth");
    }
    if (userInfo?.userRole != CAMPAIGN_PLANNER && userInfo?.userRole != SCREEN_OWNER) {
      message.error("You have no access to this page");
      navigate("/auth");
    }

    if (userInfo?.userRole === CAMPAIGN_PLANNER ) {
      dispatch(
        getMyCreateCampaignsListForPlan({ id: userInfo?._id })
      );
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center">
      {loadingCampaignsListForPlan ? (
        <div className="w-full">
          {/* <h1>Loading Data....., please wait</h1> */}
          <Loading />
        </div>
      ) : campaignsListForPlan?.length > 0 ? (
        <MyPlansList plansList={campaignsListForPlan} />
      ) : (
        <NoDataView />
      )}
    </div>
  );
};
