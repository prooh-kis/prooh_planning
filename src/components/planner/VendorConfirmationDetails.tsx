import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { useEffect, useState } from "react";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPlanningPageFooterData,
  getVendorConfirmationDetails,
  getVendorConfirmationStatusTableDetails,
  sendCampaignForFinalApprovalVendorConfirmationPage,
  sendCampaignStatusReportToClient,
  sendRequestToVendorForCreativeApprovalVendorConfirmationPage,
} from "../../actions/screenAction";
import {
  VendorConfirmationBasicTable,
  VendorConfirmationStatusTable,
} from "../../components/tables";
import { Footer } from "../../components/footer";
import { message } from "antd";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { CountdownTimer } from "../../components/molecules/CountdownTimer";

import { isValidEmail } from "../../utils/valueValidate";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED,
} from "../../constants/campaignConstants";
import { StatusPopup } from "../../components/popup/StatusPopup";
import { ShowMediaTypePopup } from "../../components/popup/ShowMediaTypePopup";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import ButtonInput from "../../components/atoms/ButtonInput";
import { AddContactDetailsForCampaignAlerts } from "../../components/segments/AddContactDetailsForCampaignAlerts";
import { FinalConfirmationPopup } from "../../components/popup/FinalConfirmationPopup";
import { SendEmailPopup } from "../../components/popup/SendEmailPopup";
import {
  SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_RESET,
  SEND_CAMPAIGN_STATUS_REPORT_TO_CLIENT_RESET,
  SEND_CAMPAIGN_FINAL_CONFIRMATION_RESET,
} from "../../constants/screenConstants";
import { getRequestNameFromStatus } from "../../utils/campaignUtils";

interface VendorConfirmationDetailsProps {
  setCurrentStep: any;
  step: any;
  campaignId?: any;
  userInfo?: any;
  campaignDetails?: any;
}

export const VendorConfirmationDetails = ({
  setCurrentStep,
  step,
  campaignId,
  userInfo,
  campaignDetails,
}: VendorConfirmationDetailsProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [toEmail, setToEmail] = useState<any>(
    campaignDetails?.campaignManagerEmail || ""
  );
  const [cc, setCC] = useState<any>([
    campaignDetails?.campaignPlannerEmail,
    "tech@prooh.ai",
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const [openMedia, setOpenMedia] = useState<boolean>(false);

  const [files, setFiles] = useState<any>([]);
  const [isDisabled, setIsDisabled] = useState<any>(true);

  const [selectedCampaignIds, setSelectedCampaignIds] = useState<any>([]);
  const [skipEmailConfirmation, setSkipEmailConfirmation] =
    useState<any>(false);
  const [confirmToProceed, setConfirmToProceed] = useState<any>(false);
  const [openFinalConfirmationPopup, setOpenFinalConfirmationPopup] =
    useState<any>(false);
  const [savedContacts, setSavedContacts] = useState<any[]>(
    campaignDetails?.stakeHolders || []
  );

  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const {
    loading: loadingVendorConfirmationData,
    error: errorVendorConfirmationData,
    data: vendorConfirmationData,
  } = useSelector((state: any) => state.vendorConfirmationDetailsGet);

  const {
    loading: loadingStatusTableData,
    error: errorStatusTableData,
    data: statusTableData,
  } = useSelector(
    (state: any) => state.vendorConfirmationStatusTableDetailsGet
  );

  const {
    loading: loadingVendorCreativeApprovalSent,
    error: errorVendorCreativeApprovalSent,
    success: successVendorCreativeApprovalSent,
  } = useSelector(
    (state: any) =>
      state.sendRequestToVendorForCreativeApprovalVendorConfirmationPage
  );

  const {
    loading: loadingSendCampaignStatusReportToClient,
    error: errorSendCampaignStatusReportToClient,
    success: successSendCampaignStatusReportToClient,
  } = useSelector((state: any) => state.campaignStatusReportToClientSend);

  const {
    loading: loadingSendFinalApproval,
    error: errorSendFinalApproval,
    success: successSendFinalApproval,
  } = useSelector(
    (state: any) => state.campaignForFinalApprovalSendVendorConfirmationPage
  );

  const handleAddNewFile = async (file: File) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);

      setFiles((pre: any) => [
        ...pre,
        {
          file: file,
          url: fileURL,
          fileType: file.type,
          fileSize: file.size,
          awsURL: "",
        },
      ]);
    }
  };

  const removeImage = (file: any) => {
    setFiles(files.filter((singleFile: any) => singleFile.url !== file.url));
  };

  const getAWSUrl = async (data: any) => {
    try {
      const aws = await getAWSUrlToUploadFile(
        data.fileType,
        data?.file?.name?.split(".")[0]
      );
      const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
      data.awsURL = aws?.awsURL;
      return aws?.awsURL;
    } catch (error: any) {
      message.error(error);
      throw new Error("Failed to get AWS URL");
    }
  };

  const sendForVendorConfirmation = () => {
    message.info("Sending for approval to all the vendor...");
    dispatch(
      sendRequestToVendorForCreativeApprovalVendorConfirmationPage({
        id: campaignDetails?._id,
      })
    );
  };

  const sendEmailToClient = () => {
    message.info("Sending campaign status report...");
    dispatch(
      sendCampaignStatusReportToClient({
        toEmail,
        cc,
        id: campaignDetails?._id,
      })
    );
  };

  const handleSaveAndContinue = async () => {
    let imageArr = await Promise.all(files.map(getAWSUrl));
    dispatch(
      addDetailsToCreateCampaign({
        event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
        pageName: "Vendor Confirmation Page",
        id: campaignDetails?._id,
        vendorApprovalImgs: imageArr, // return url array
        stakeHolders: savedContacts,
      })
    );
    // navigate(`${CAMPAIGN_DETAILS_PAGE}/${campaignDetails?._id}`);
  };

  const handleSendForFinalApproval = () => {
    message.info("Sending for final approval...");
    dispatch(
      sendCampaignForFinalApprovalVendorConfirmationPage({
        id: campaignDetails?._id,
      })
    );
  };

  useEffect(() => {
    if (
      errorVendorConfirmationData ||
      errorStatusTableData ||
      errorAddDetails ||
      errorSendCampaignStatusReportToClient ||
      errorSendFinalApproval ||
      errorVendorCreativeApprovalSent
    ) {
      message.error("Something went wrong, please contact tech support...");
    }
  }, [
    errorAddDetails,
    errorStatusTableData,
    errorVendorConfirmationData,
    errorSendCampaignStatusReportToClient,
    errorSendFinalApproval,
    errorVendorCreativeApprovalSent,
  ]);

  useEffect(() => {
    if (!campaignDetails) return;
    // Fetch data even if pageSuccess is false initially

    dispatch(
      getVendorConfirmationStatusTableDetails({
        id: campaignDetails?._id,
      })
    );
    dispatch(
      getVendorConfirmationDetails({
        pageName: "View Final Plan Page",
        id: campaignId,
        name: campaignDetails?.name,
        brandName: campaignDetails?.brandName,
        clientName: campaignDetails?.clientName,
        campaignType: campaignDetails?.campaignType,
        startDate: campaignDetails?.startDate,
        endDate: campaignDetails?.endDate,
        duration: campaignDetails?.duration,
        selectedType: campaignDetails?.selectedType,
        screenIds: campaignDetails?.screenIds,
        triggers: campaignDetails?.triggers,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignDetails?._id,
        pageName: "Vendor Confirmation Page",
      })
    );
  }, [campaignDetails, campaignId, dispatch]);

  useEffect(() => {
    if (successVendorCreativeApprovalSent) {
      message.success(
        "Vendor creative approval sent successfully to all vendors..."
      );
      dispatch({
        type: SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_RESET,
      });
    }
    if (successSendCampaignStatusReportToClient) {
      message.success("Campaign status report sent successfully...");
      dispatch({
        type: SEND_CAMPAIGN_STATUS_REPORT_TO_CLIENT_RESET,
      });
    }
    if (successSendFinalApproval) {
      message.success("Campaign sent for final approval...");
      dispatch({
        type: SEND_CAMPAIGN_FINAL_CONFIRMATION_RESET,
      });
      setOpenFinalConfirmationPopup(false);
    }
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      message.success("Your campaign has been successfully planned...");
      setOpenFinalConfirmationPopup(true);
    }
  }, [
    successAddDetails,
    step,
    setCurrentStep,
    dispatch,
    successSendCampaignStatusReportToClient,
    successVendorCreativeApprovalSent,
    successSendFinalApproval,
  ]);

  const handleOpenStatusModel = () => {
    setOpen(!open);
  };
  const handleOpenMediaModel = () => {
    setOpenMedia((pre: boolean) => !pre);
  };

  const myData = {
    Approved: {
      Connected:
        statusTableData?.filter((c: any) =>
          getRequestNameFromStatus(c.status).includes("Approved")
        ).length || 0,
      "Third Party": 0,
    },
    Rejected: {
      Connected:
        statusTableData?.filter((c: any) =>
          getRequestNameFromStatus(c.status).includes("Rejected")
        ).length || 0,
      "Third Party": 0,
    },
    Pending: {
      Connected:
        statusTableData?.filter((c: any) =>
          getRequestNameFromStatus(c.status).includes("Pending")
        ).length || 0,
      "Third Party": 0,
    },
  };

  const mediaTypeData = {
    Connected: statusTableData?.length || 0,
    "Third Party": 0,
  };

  const skipFunction = () => {
    dispatch(
      addDetailsToCreateCampaign({
        event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
        pageName: "Vendor Confirmation Page",
        id: campaignDetails?._id,
        vendorApprovalImgs: [], // return url array
        stakeHolders: savedContacts,
      })
    );
    setOpenFinalConfirmationPopup(true);
    // navigate(`${CAMPAIGN_DETAILS_PAGE}/${campaignDetails?._id}`);
  };

  return (
    <div className="w-full">
      {loadingStatusTableData || loadingVendorConfirmationData ? (
        <LoadingScreen />
      ) : (
        <div className="w-full h-full">
          <StatusPopup
            open={open}
            onClose={handleOpenStatusModel}
            myData={myData}
          />
          <ShowMediaTypePopup
            open={openMedia}
            onClose={handleOpenMediaModel}
            mediaTypeData={mediaTypeData}
          />
          <FinalConfirmationPopup
            open={openFinalConfirmationPopup}
            onClose={() => setOpenFinalConfirmationPopup(false)}
            onPrimaryAction={() => handleSendForFinalApproval()}
            title="Campaign Planned Successfully!"
            message="Your campaign has been successfully planned. For executing the campaign, please send request to the admin"
            primaryButtonText="Send For Final Approval"
            loading={loadingSendFinalApproval}
          />
          <SendEmailPopup
            open={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            campaignDetails={campaignDetails}
            setToEmail={setToEmail}
            toEmail={toEmail}
            setCC={setCC}
            cc={cc}
            sendEmail={sendEmailToClient}
            loadingEmailReady={
              loadingSendCampaignStatusReportToClient ||
              loadingVendorCreativeApprovalSent
            }
          />

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[24px] text-primaryText font-semibold">
                Vendor Confirmation Status
              </h1>
              <p className="text-[14px] text-secondaryText">
                Check and confirm media availability for your campaign plan
              </p>
            </div>
            <CountdownTimer
              createdAt={
                vendorConfirmationData?.createdAt || new Date().toISOString()
              }
            />
          </div>
          <VendorConfirmationBasicTable
            vendorConfirmationData={vendorConfirmationData}
          />

          <div className="py-2 w-full">
            <div className="flex justify-between">
              <div className="flex gap-8">
                <div className="flex">
                  <h1 className="text-[14px] text-[#5FAC90]">
                    Approved (
                    {myData?.Approved?.Connected +
                      myData?.Approved?.["Third Party"]}
                    )
                  </h1>
                </div>
                <div className="flex">
                  <h1 className="text-[14px] text-[#F9B34B]">
                    Pending (
                    {myData?.Pending?.Connected +
                      myData?.Pending?.["Third Party"]}
                    )
                  </h1>
                </div>
                <div className="flex">
                  <h1 className="text-[14px] text-[#FF0808]">
                    Rejected (
                    {myData?.Rejected?.Connected +
                      myData?.Rejected?.["Third Party"]}
                    )
                  </h1>
                </div>
              </div>
              <div className="flex gap-4">
                <h1 className="text-[14px]">Total Screen</h1>
                <h1 className="text-[14px] font-semibold">
                  {statusTableData?.length}
                </h1>
              </div>
            </div>
            <div className="pb-2">
              <MultiColorLinearBar
                showPercentage={false}
                values={[
                  statusTableData?.filter(
                    (c: any) =>
                      c.status ===
                      CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED
                  ).length,
                  statusTableData
                    ?.filter(
                      (c: any) =>
                        c.status !==
                        CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED
                    )
                    ?.filter(
                      (c: any) =>
                        c.status !==
                        CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED
                    ).length,
                  statusTableData?.filter(
                    (c: any) =>
                      c.status ===
                      CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED
                  ).length,
                ]}
                colors={["#FF0808", "#5FAC90", "#F9B34B"]}
                totalValue={statusTableData?.length}
              />
            </div>

            <VendorConfirmationStatusTable
              selectedCampaignIds={selectedCampaignIds}
              setSelectedCampaignIds={setSelectedCampaignIds}
              campaignId={campaignId}
              userInfo={userInfo}
              statusTableData={statusTableData}
              handleOpenStatusModel={handleOpenStatusModel}
              handleOpenMediaModel={handleOpenMediaModel}
              campaignsList={[]}
            />
          </div>
          <div className="">
            {!loadingStatusTableData && !errorStatusTableData && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 border rounded-[8px] p-4">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => {
                      setIsShareModalOpen(true);
                    }}
                  >
                    <h1 className="font-semibold text-lg">Share this plan</h1>
                    <i className="fi fi-ss-paper-plane flex items-center text-[#129BFF] text-[12px]"></i>
                  </div>
                  <div className="grid grid-cols-6 gap-2 pt-4">
                    <div className="col-span-4">
                      <PrimaryInput
                        placeholder="Enter Email"
                        value={toEmail}
                        inputType="text"
                        height="h-[40px]"
                        action={setToEmail}
                        rounded="rounded-[8px]"
                      />
                    </div>
                    <div className="col-span-2">
                      <ButtonInput
                        variant="primary"
                        className="h-[40px]"
                        loadingText="Sending..."
                        loading={
                          loadingSendCampaignStatusReportToClient ||
                          loadingVendorConfirmationData
                        }
                        disabled={
                          loadingSendCampaignStatusReportToClient ||
                          loadingVendorConfirmationData
                        }
                        icon={
                          <i className="fi fi-sr-envelope flex items-center"></i>
                        }
                        onClick={() => {
                          if (isValidEmail(toEmail)) {
                            sendEmailToClient();
                          } else message.error("Please Enter valid email");
                        }}
                      >
                        Send
                      </ButtonInput>
                    </div>
                  </div>
                  <div className="flex items-center p-1">
                    <h1 className="text-[12px] text-[#6F7F8E]">
                      Enter email and share your plan
                    </h1>
                  </div>
                  <div
                    className="p-1 cursor-pointer"
                    onClick={sendForVendorConfirmation}
                  >
                    <h1 className="text-[12px] text-primaryButton">
                      Click here to send reminder to all vendor for creative
                      approval
                    </h1>
                  </div>
                </div>
                <div className="col-span-1 border rounded-[8px] p-2">
                  <EmailConfirmationImage
                    files={files}
                    handleAddNewFile={handleAddNewFile}
                    removeImage={removeImage}
                    setSkipEmailConfirmation={(e: any) => {
                      setConfirmToProceed(true);
                      setSkipEmailConfirmation(e);
                    }}
                    skipFunction={skipFunction}
                    skipEmailConfirmation={skipEmailConfirmation}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pb-20 mt-2">
            <AddContactDetailsForCampaignAlerts
              savedContacts={savedContacts}
              setSavedContacts={setSavedContacts}
            />
          </div>
          <div
            className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]"
            onDoubleClick={() => setIsDisabled(!isDisabled)}
          >
            <Footer
              mainTitle="Save"
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={handleSaveAndContinue}
              campaignId={campaignId}
              pageName="Vendor Confirmation Page"
              loadingCost={
                loadingAddDetails ||
                loadingStatusTableData ||
                loadingVendorConfirmationData
              }
              successCampaignDetails={successAddDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};
