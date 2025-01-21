import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MyPlansList } from "./MyPlansList";
import { getMyCreateCampaignsList } from "../../actions/campaignAction";
import { Loading } from "../../components/Loading";
import { message } from "antd";
import { NoDataView } from "../../components/molecules/NoDataView";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsListGet = useSelector(
    (state: any) => state.myCreateCampaignsListGet
  );
  const {
    loading: loadingCampaignsList,
    error: errorCampaignsList,
    data: campaignsList,
  } = myCreateCampaignsListGet;

  useEffect(() => {
    if (!userInfo) {
      navigate("/auth");
    }
    if (!userInfo?.isBrand) {
      message.error("You have no access to this page");
      navigate("/auth");
    }

    if (userInfo?.isBrand) {
      dispatch(
        getMyCreateCampaignsList({ id: userInfo?._id, type: "incomplete" })
      );
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center">
      {loadingCampaignsList ? (
        <div className="w-full">
          <h1>Loading Data....., please wait</h1>
          <Loading />
        </div>
      ) : campaignsList?.length > 0 ? (
        <MyPlansList plansList={campaignsList} />
      ) : (
        <NoDataView />
      )}
    </div>
  );
};
