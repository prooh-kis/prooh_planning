import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Header,
  VendorConfirmationScreensLevelCreativeTable,
} from "./Helper";
import { VendorConfirmationBasicTable } from "../../components/tables";
import ButtonInput from "../../components/atoms/ButtonInput";
import { message } from "antd";
import {
  CAMPAIGN_CREATION_FINAL_APPROVE_CAMPAIGN_CMS,
  CAMPAIGN_CREATION_GET_FINAL_APPROVAL_REQUEST_DETAILS_VENDOR_CMS,
  CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_ACCEPTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_REJECTED,
} from "../../constants/userConstants";
import {
  approveCampaignFinallyProohAdmin,
  getCampaignRequestFinalApprovalDetailsForProohAdmin,
} from "../../actions/campaignAction";
import {
  APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_RESET,
  GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_RESET,
} from "../../constants/campaignConstants";

interface ScreenItem {
  screenId: string;
  screenName: string;
  address: string;
  cost: number;
  slotAvailable: number;
  status?: "Approved" | "Rejected" | null;
  creatives?: any;
}

export const ShowCampaignRequestDetailsForAdmin = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const index = pathname.split("/")[3];

  const [openShowMediaPopup, setOpenShowMediaPopup] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<any>({
    screenName: "",
    screenId: "",
    creatives: [],
  });

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const campaignId = pathname.split("/")[2] || "";
  const [screenList, setScreenList] = useState<ScreenItem[]>([]);

  const approveCampaignFinally = useSelector(
    (state: any) => state.approveCampaignFinally
  );
  const {
    loading: loadingApproveCampaignCreative,
    error: errorApproveCampaignCreative,
    data: approveCampaignCreative,
    success: successCampaignCreative,
  } = approveCampaignFinally;

  const campaignRequestFinalApprovalDetails = useSelector(
    (state: any) => state.campaignRequestFinalApprovalDetails
  );
  const {
    loading: loadingCreativeDetails,
    error: errorCampaignDetails,
    data: campaignDetails,
  } = campaignRequestFinalApprovalDetails;

  useEffect(() => {
    if (errorApproveCampaignCreative) {
      message.error(errorApproveCampaignCreative);
      dispatch({ type: APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_RESET });
    }
    if (successCampaignCreative) {
      message.success("Successfully approved final campaign screen wise");
      dispatch({ type: APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_RESET });
      navigate(-1);
    }
  }, [errorApproveCampaignCreative, successCampaignCreative]);

  useEffect(() => {
    if (errorCampaignDetails) {
      message.error(errorCampaignDetails);
      dispatch({
        type: GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_RESET,
      });
    }
    if (campaignDetails && campaignDetails?.screenWiseSlotDetails?.length > 0) {
      console.log("campaignDetails : ", campaignDetails?.screenWiseSlotDetails);
      setScreenList(
        campaignDetails?.screenWiseSlotDetails?.map((data: any) => {
          return {
            ...data,
            status: "Approved",
          };
        })
      );
    }
  }, [errorCampaignDetails, campaignDetails]);

  const getRequestBody = () => {
    let requestBody: any = [];

    requestBody = screenList.map((screen: ScreenItem) => ({
      screenId: screen.screenId,
      campaignStatus:
        screen.status === "Approved"
          ? CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_ACCEPTED
          : CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_REJECTED, // default to Approved if undefined
    }));

    return requestBody;
  };

  const handleApprovedClicked = () => {
    let data: any = getRequestBody();

    if (
      window.confirm(
        "Do you want to approve creative for this campaign screen wise?"
      )
    )
      dispatch(
        approveCampaignFinallyProohAdmin({
          id: campaignId,
          data,
          event: CAMPAIGN_CREATION_FINAL_APPROVE_CAMPAIGN_CMS,
        })
      );
  };

  useEffect(() => {
    dispatch(
      getCampaignRequestFinalApprovalDetailsForProohAdmin({
        id: campaignId,
        event: CAMPAIGN_CREATION_GET_FINAL_APPROVAL_REQUEST_DETAILS_VENDOR_CMS,
      })
    );
  }, []);

  return (
    <div className="w-full h-auto">
      {/* <ShowMediaPopup
        showDelete={false}
        openShowMedia={openShowMediaPopup}
        onClose={() => {
          setOpenShowMediaPopup(false);
          setCurrentScreen({ screenName: "", screenId: "", creatives: [] });
        }}
        screenName={currentScreen?.screenName}
        media={[
          ...(currentScreen?.creatives.standardDayTimeCreatives || []),
          ...(currentScreen?.creatives.standardNightTimeCreatives || []),
          ...(currentScreen?.creatives.triggerCreatives || []),
        ]}
      /> */}
      <div className="flex flex-row justify-between rounded p-4 mb-1 w-full bg-white">
        <div className="flex gap-4 items-center">
          <i
            className="fi fi-br-arrow-left flex items-center justify-center text-[#8B5CF680]"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-[16px] font-semibold">
            {index === "1"
              ? `Campaign Budget Request`
              : `Campaign Creative Request`}
          </h1>
        </div>
      </div>

      <Header campaignDetails={campaignDetails} />
      <VendorConfirmationBasicTable vendorConfirmationData={campaignDetails} />
      <VendorConfirmationScreensLevelCreativeTable
        screenList={screenList}
        setScreenList={setScreenList}
        handleOpenCreationModel={(data: any) => {
          console.log("data  ", data);
          setOpenShowMediaPopup((pre: boolean) => !pre);
          setCurrentScreen(data);
        }}
      />
      <div className="flex flex-row justify-end gap-4 rounded p-4  w-full bg-white">
        <ButtonInput
          variant="outline"
          onClick={handleApprovedClicked}
          loading={loadingApproveCampaignCreative}
        >
          Approve
        </ButtonInput>
      </div>
    </div>
  );
};
