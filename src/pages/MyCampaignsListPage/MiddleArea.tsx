import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MyCampaignsList } from "./MyCampaignsList";
import { getMyCreateCampaignsList } from "../../actions/campaignAction";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsListGet = useSelector((state: any) => state.myCreateCampaignsListGet);
  const {
    loading: loadingCampaignsList,
    error: errorCampaignsList,
    data: campaignsList
  } = myCreateCampaignsListGet;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getMyCreateCampaignsList({id: userInfo?._id}))
  },[dispatch, navigate, userInfo]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      {userInfo && userInfo?.isBrand ? (
        <MyCampaignsList campaignsList={campaignsList} />
      ) : (
        <div className="">
          <h1 className="text-2xl font-bold">
            No Campaigns Found
          </h1>
          <p className="text-md">
            Please contact support or create a new user with {"Campaign Manager"} role!!!
          </p>
        </div>
      )}
    </div>
  );
};
