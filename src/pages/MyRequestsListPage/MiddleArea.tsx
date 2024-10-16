import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getMyCreateCampaignsManagerRequestsList, getMyCreateCampaignsVendorRequestsList } from "../../actions/campaignAction";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { ClientsRequestsList } from "./ClientRequestsList";
import { VendorsRequestsList } from "./VendorRequestsList";


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
  console.log(managerRequestsList);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <div className="flex justify-between border-b py-2">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-megaphone flex items-center text-[#129BFF]"></i>
          <h1 className="text-[18px] text-primaryText font-semibold">
            My Requests List
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <PrimaryInput
            height="h-10"
            inputType="text"
            rounded="rounded-[12px]"
            placeholder="Type to search"
            value={""}
            action={() => {}}
          />
          <PrimaryButton
            reverse={true}
            height="h-10"
            width="w-[120px]"
            rounded="rounded-full"
            title="Search"
            action={() => {}}
          />
        </div>
      </div>
      {userInfo && userInfo?.isBrand ? (
        <ClientsRequestsList requestsList={
          managerRequestsList?.filter((campaign: any) => campaign.campaignManagerEmail === userInfo?.email)
          } 
        />
      ) : userInfo && userInfo?.isMaster ? (
        <VendorsRequestsList requestsList={
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
