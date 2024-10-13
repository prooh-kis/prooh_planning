import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MyCampaignsList } from "./MyCampaignsList";
import { getMyCreateCampaignsList, getMyCreateCampaignsVendorRequestsList } from "../../actions/campaignAction";


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

  const myCreateCampaignsVendorRequestsListGet = useSelector((state: any) => state.myCreateCampaignsVendorRequestsListGet);
  const {
    loading: loadingVendorList,
    error: errorVendorList,
    data: vendorCampaignsList
  } = myCreateCampaignsVendorRequestsListGet;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.isBrand) {
      dispatch(getMyCreateCampaignsList({id: userInfo?._id}));
    }

    if (userInfo?.isMaster) {
      dispatch(getMyCreateCampaignsVendorRequestsList({id: userInfo?._id}));
    }
  },[dispatch, navigate, userInfo]);
  console.log(vendorCampaignsList?.campaigns?.filter((camp: any) => camp.status === "Active"))
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      {userInfo && userInfo?.isBrand ? (
        <MyCampaignsList campaignsList={campaignsList} />
      ) : userInfo && userInfo?.isMaster? (
        <MyCampaignsList campaignsList={vendorCampaignsList?.campaigns?.filter((camp: any) => camp.status === "Active") || []} />
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
