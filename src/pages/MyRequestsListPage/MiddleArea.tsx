import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MyRequestsList } from "./MyRequestsList";
import { getMyCreateCampaignsManagerRequestsList, getMyCreateCampaignsVendorRequestsList } from "../../actions/campaignAction";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsManagerRequestsListGet = useSelector((state: any) => state.myCreateCampaignsManagerRequestsListGet);
  const {
    loading: loadingManagerRequestsList,
    error: errorManagerRequestsList,
    data: managerRequestsList
  } = myCreateCampaignsManagerRequestsListGet;

  const myCreateCampaignsVendorRequestsListGet = useSelector((state: any) => state.myCreateCampaignsVendorRequestsListGet);
  const {
    loading: loadingVendorRequestsList,
    error: errorVendorRequestsList,
    data: vendorRequestsList
  } = myCreateCampaignsVendorRequestsListGet;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.isMaster) {
      dispatch(getMyCreateCampaignsVendorRequestsList({id: userInfo?._id}))

    }

    if (userInfo?.isBrand) {
      dispatch(getMyCreateCampaignsManagerRequestsList({id: userInfo?._id}))
    }
  },[dispatch, navigate, userInfo]);
  console.log(vendorRequestsList?.campaigns?.filter((campaign: any) => vendorRequestsList?.screenIds?.includes(campaign?.screenId)));
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      {userInfo && userInfo?.isBrand ? (
        <MyRequestsList requestsList={
          managerRequestsList?.filter((campaign: any) => campaign.currentPage === "Add Triggers Page" && campaign.campaignManagerEmail === userInfo?.email)
          } 
        />
      ) : userInfo && userInfo?.isMaster ? (
        <MyRequestsList requestsList={
          vendorRequestsList?.campaigns?.filter((campaign: any) => vendorRequestsList?.screenIds?.includes(campaign?.screenId) && campaign?.status === "PleaRequestScreenApprovalSent")
          } 
        />
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
