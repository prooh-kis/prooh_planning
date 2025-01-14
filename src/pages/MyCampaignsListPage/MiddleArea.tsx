import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { MyCampaignsList } from "./MyCampaignsList";
import { getMyCreateCampaignsList, getMyCreateCampaignsManagerRequestsList, getMyCreateCampaignsVendorRequestsList } from "../../actions/campaignAction";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");

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

  const myCreateCampaignsManagerRequestsListGet = useSelector((state: any) => state.myCreateCampaignsManagerRequestsListGet);
  const {
    loading: loadingManagerRequestsList,
    error: errorManagerRequestsList,
    data: clientRequestsList
  } = myCreateCampaignsManagerRequestsListGet;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.isBrand && userInfo?.userRole === "secondary") {
      if (currentTab === "1") {
        dispatch(getMyCreateCampaignsList({id: userInfo?._id, type: "complete"}));
      }
      if (currentTab === "2") {
        dispatch(getMyCreateCampaignsList({id: userInfo?._id, type: "incomplete"}));
      }
    }
    if (userInfo?.isMaster) {
      dispatch(getMyCreateCampaignsVendorRequestsList({id: userInfo?._id, status: "Active"}))
    }
    if (userInfo?.isBrand && userInfo?.userRole === "primary") {
      dispatch(getMyCreateCampaignsManagerRequestsList({id: userInfo?._id, type: "complete"}))
    }
  },[dispatch, navigate, currentTab, userInfo]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center">
      {userInfo ? (
        <MyCampaignsList
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          campaignsList={
            userInfo?.isBrand && userInfo?.userRole === "secondary" ? campaignsList :
            userInfo?.isBrand && userInfo?.userRole === "primary" ? clientRequestsList :
            userInfo?.isMaster ? vendorCampaignsList?.campaigns : []
          }
        />
      ) : (
        <div className="">
          <h1 className="text-2xl font-bold">
            No Campaigns Found
          </h1>
          <p className="text-md">
            Please contact support !!!
          </p>
        </div>
      )}
    </div>
  );
};
