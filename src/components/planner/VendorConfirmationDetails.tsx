import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { useEffect, useState } from "react";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPlanningPageFooterData,
  getVendorConfirmationDetails,
  getVendorConfirmationStatusTableDetails,
} from "../../actions/screenAction";
import {
  VendorConfirmationBasicTable,
  VendorConfirmationStatusTable,
} from "../../components/tables";
import { Footer } from "../../components/footer";
import { message } from "antd";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { CAMPAIGN_DETAILS_PAGE } from "../../routes/routes";
import { CountdownTimer } from "../../components/molecules/CountdownTimer";
import {
  sendEmailForConfirmation,
  sendEmailForVendorConfirmation,
} from "../../actions/userAction";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED,
} from "../../constants/campaignConstants";
import { convertDateIntoDateMonthYear } from "../../utils/dateAndTimeUtils";
import { StatusPopup } from "../../components/popup/StatusPopup";
import { ShowMediaTypePopup } from "../../components/popup/ShowMediaTypePopup";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

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

  const [toEmail, setToEmail] = useState<any>("");
  const [cc, setCC] = useState<any>(["itisvinciis@gmail.com"]);
  const [open, setOpen] = useState<boolean>(false);
  const [openMedia, setOpenMedia] = useState<boolean>(false);

  const [files, setFiles] = useState<any>([]);
  const [isDisabled, setIsDisabled] = useState<any>(true);

  const [selectedCampaignIds, setSelectedCampaignIds] = useState<any>([]);
  const [skipEmailConfirmation, setSkipEmailConfirmation] =
    useState<any>(false);
  const [confirmToProceed, setConfirmToProceed] = useState<any>(false);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const vendorConfirmationDetailsGet = useSelector(
    (state: any) => state.vendorConfirmationDetailsGet
  );
  const {
    loading: loadingVendorConfirmationData,
    error: errorVendorConfirmationData,
    data: vendorConfirmationData,
  } = vendorConfirmationDetailsGet;

  const vendorConfirmationStatusTableDetailsGet = useSelector(
    (state: any) => state.vendorConfirmationStatusTableDetailsGet
  );
  const {
    loading: loadingStatusTableData,
    error: errorStatusTableData,
    data: statusTableData,
  } = vendorConfirmationStatusTableDetailsGet;

  const sendEmail = () => {
    const formData = new FormData();
    formData.append("toEmail", toEmail);
    formData.append("cc", cc);
    formData.append(
      "message",
      `
        <div style='max-width: 720px; margin: auto; padding: 16px; background-color: white; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px;'>
          <a href="https://plan.prooh.ai/campaignDetails/${campaignId}">View Dashboard</a>
        </div>
      `
    );

    dispatch(sendEmailForConfirmation(formData));
  };

  const sendEmailToAll = () => {
    if (!statusTableData) {
      console.error("statusTableData is not available");
      return;
    }

    const screenOwnerEmails = Array.from(
      new Set(statusTableData.map((s: any) => s.screenVendorEmail))
    );

    screenOwnerEmails?.forEach((email: any) => {
      const approvalIds = statusTableData
        ?.filter((s: any) => s.screenVendorEmail === email)
        ?.map((c: any) => c.campaignId)
        .join(",");
      const approvalUrl = `https://prooh.vinciis.in/api/v2/campaigns/approveCampaignScreenVendor?ids=${encodeURIComponent(
        approvalIds
      )}`;
      const viewUrl = `https://plan.prooh.ai/myPlansList`;
      const emailContent = `
        <div style='max-width: 600px; margin: auto; padding: 16px; background-color: white; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);'>
          <h1 style='font-size: 40px; font-weight: bold; text-align: center;'>Congratulations!!!</h1>
          <h1 style='font-size: 20px; font-weight: regular; text-align: left;'>Now approve campaigns for your screens, increase your revenue and relax...</h1>
          <table style='width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 4px; overflow: hidden;'>
            <thead>
              <tr style='background-color: #007BFF; color: white;'>
                <th style='padding: 8px; text-align: left;'>Screen Name</th>
                <th style='padding: 8px; text-align: left;'>Touchpoint</th>
                <th style='padding: 8px; text-align: left;'>Start Date</th>
                <th style='padding: 8px; text-align: left;'>End Date</th>
                <th style='padding: 8px; text-align: left;'>Cost</th>
              </tr>
            </thead>
            <tbody>
              ${statusTableData
                ?.filter((s: any) => s.screenVendorEmail === email)
                ?.map(
                  (d: any, i: any) => `
                    <tr key=${i} style='background-color: #F8F9FA;'>
                      <td style='padding: 8px; border: 1px solid #E0E0E0;'>${d.screenName}</td>
                      <td style='padding: 8px; border: 1px solid #E0E0E0;'>${d.touchPoint}</td>
                      <td style='padding: 8px; border: 1px solid #E0E0E0;'>${convertDateIntoDateMonthYear(d.startDate)}</td>
                      <td style='padding: 8px; border: 1px solid #E0E0E0;'>${convertDateIntoDateMonthYear(d.endDate)}</td>
                      <td style='padding: 8px; border: 1px solid #E0E0E0;'>₹${d.cost.toFixed(0)}</td>
                    </tr>
                  `
                )}
            </tbody>
          </table>
          <div style='display: flex; gap: 8px; justify-content: center;'>
            <div style='margin: 0 8px 0 0'>
              <a href='${viewUrl}'
                style='display: inline-block; background-color: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;'>
                See Details
              </a>
            </div>
            <div style='margin: 0 0 0 8px'>
              <a href='${approvalUrl}'
                style='display: inline-block; background-color: #D7D7D760; color: black; padding: 12px 24px; text-decoration: none; border-radius: 4px;'>
                Approve All
              </a>
            </div>
          </div>
        </div>
      `;
      if (!emailContent) {
        console.error("Failed to generate email content");
        return;
      }

      dispatch(
        sendEmailForVendorConfirmation({
          toEmail: email,
          cc: cc,
          emailContent: emailContent,
        })
      );
    });
  };

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

  const handleSaveAndContinue = async () => {
   

    if (isDisabled) {
      message.error(
        "You will be redirected to campaign dashboard, once the campaign has started. Please wait..."
      );
    } else {
      // let imageArr: any[] = [];
      // for (let data of files) {
      //   let url = await getAWSUrl(data);
      //   imageArr.push(url);
      // }
      const imageArr = await Promise.all(files.map(getAWSUrl));
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Vendor Confirmation Page",
          id: campaignDetails?._id,
          vendorApprovalImgs: imageArr, // return url array
        })
      );
      navigate(`${CAMPAIGN_DETAILS_PAGE}/${campaignDetails?._id}`);
    }
  };

  useEffect(() => {
    if (!campaignDetails) return;
    // Fetch data even if pageSuccess is false initially
    if (
      errorVendorConfirmationData ||
      errorStatusTableData ||
      errorAddDetails
    ) {
      message.error("Something went wrong, please contact tech support...");
    }
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
  }, [campaignDetails, campaignId, dispatch, errorAddDetails, errorStatusTableData, errorVendorConfirmationData]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      setCurrentStep(step + 1);
    }
  }, [successAddDetails, step, setCurrentStep, dispatch]);

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
          [
            CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED,
            "Completed",
            "Pending",
            "Hold",
            "Active",
            "Pause",
            "Deleted",
          ].includes(c.status)
        ).length || 0,
      "Third Party": 0,
    },
    Rejected: {
      Connected:
        statusTableData?.filter(
          (c: any) =>
            c.status === CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED
        ).length || 0,
      "Third Party": 0,
    },
    Pending: {
      Connected:
        statusTableData?.filter(
          (c: any) =>
            ![
              CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED,
              CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED,
              "Completed",
              "Pending",
              "Hold",
              "Active",
              "Pause",
              "Deleted",
            ].includes(c.status)
        )?.length || 0,
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
        pageName: "Vendor Confirmation Page",
        id: campaignDetails?._id,
        vendorApprovalImgs: [], // return url array
      })
    );
    navigate(`${CAMPAIGN_DETAILS_PAGE}/${campaignDetails?._id}`);
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

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[24px] text-primaryText font-semibold">
                Vendor Confirmation Status
              </h1>
              <p className="text-[14px] text-secondaryText">
                Check and confirm media availability for your campaign plan
              </p>
            </div>
            <CountdownTimer createdAt={vendorConfirmationData?.createdAt || new Date().toISOString()} />
          </div>
          <VendorConfirmationBasicTable
            vendorConfirmationData={vendorConfirmationData}
          />

          <div className="py-4 w-full">
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
            <div className="pb-4">
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
          <div className="pb-20">
            {!loadingStatusTableData && !errorStatusTableData && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 border rounded-[12px] p-2">
                  <EmailSendBox
                    type="vendor"
                    toEmail={toEmail}
                    setToEmail={setToEmail}
                    cc={cc}
                    sendEmail={sendEmail}
                    sendEmailToAll={sendEmailToAll}
                  />
                </div>
                <div className="col-span-1 border rounded-[12px] p-2">
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

          <div
            className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]"
            onDoubleClick={() => setIsDisabled(!isDisabled)}
          >
            <Footer
              mainTitle="See Dashboard"
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
