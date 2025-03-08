import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  getMyCreateCampaignsManagerRequestsList,
  getMyCreateCampaignsVendorRequestsList,
} from "../../actions/campaignAction";
import { ClientsRequestsList } from "./ClientRequestsList";
import { VendorsRequestsList } from "./VendorRequestsList";
import { CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT } from "../../constants/campaignConstants";
import { SearchInputField } from "../../components/index";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const MyRequestsListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsManagerRequestsListGet = useSelector(
    (state: any) => state.myCreateCampaignsManagerRequestsListGet
  );
  const {
    loading: loadingManagerRequestsList,
    error: errorManagerRequestsList,
    data: clientRequestsList,
  } = myCreateCampaignsManagerRequestsListGet;

  const myCreateCampaignsVendorRequestsListGet = useSelector(
    (state: any) => state.myCreateCampaignsVendorRequestsListGet
  );
  const {
    loading: loadingVendorRequestsList,
    error: errorVendorRequestsList,
    data: vendorRequestsList,
  } = myCreateCampaignsVendorRequestsListGet;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.isMaster) {
      dispatch(
        getMyCreateCampaignsVendorRequestsList({
          id: userInfo?._id,
          status: CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
        })
      );
    }

    if (userInfo?.isBrand) {
      dispatch(
        getMyCreateCampaignsManagerRequestsList({
          id: userInfo?._id,
          type: "incomplete",
        })
      );
    }
  }, [dispatch, navigate, userInfo]);

  const data1 = vendorRequestsList?.campaignCreations?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6 w-full h-full">
      <div className="flex justify-between border-b py-2">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-megaphone flex items-center text-[#129BFF]"></i>
          <h1 className="text-[18px] text-primaryText font-semibold">
            My Requests List
          </h1>
        </div>
        <div className="w-64">
          <SearchInputField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Campaign by campaign name or brand"
          />
        </div>
      </div>
      {loadingManagerRequestsList || loadingVendorRequestsList ? (
        <LoadingScreen />
      ) : (
        <div>
          {userInfo && userInfo?.isBrand ? (
            <ClientsRequestsList
              requestsList={clientRequestsList?.filter(
                (campaign: any) =>
                  campaign.campaignManagerEmail === userInfo?.email
              )}
            />
          ) : userInfo && userInfo?.isMaster ? (
            <VendorsRequestsList
              userInfo={userInfo}
              requestsList={data1}
              campaignsList={vendorRequestsList?.campaigns}
            />
          ) : (
            <div className="">
              <h1 className="text-2xl font-bold">No Campaigns Found</h1>
              <p className="text-md">Please contact support !!!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
