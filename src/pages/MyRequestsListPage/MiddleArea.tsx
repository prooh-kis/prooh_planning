import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MyRequestsList } from "./MyRequestsList";
import { getMyCreateCampaignsManagerRequestsList } from "../../actions/campaignAction";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsManagerRequestsListGet = useSelector((state: any) => state.myCreateCampaignsManagerRequestsListGet);
  const {
    loading: loadingRequestsList,
    error: errorRequestsList,
    data: requestsList
  } = myCreateCampaignsManagerRequestsListGet;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getMyCreateCampaignsManagerRequestsList({id: userInfo?._id}))
  },[dispatch, navigate, userInfo]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      {userInfo && userInfo?.isBrand ? (
        <MyRequestsList requestsList={requestsList} />

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
