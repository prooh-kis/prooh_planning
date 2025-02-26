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
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import {
  VendorConfirmationBasicTable,
  VendorConfirmationStatusTable,
} from "../../components/tables";
import { Footer } from "../../components/footer";
import { message } from "antd";
import {
  addDetailsToCreateCampaign,
  changeCampaignStatusAfterVendorApproval,
} from "../../actions/campaignAction";
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
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
} from "../../constants/campaignConstants";
import { convertDateIntoDateMonthYear } from "../../utils/dateAndTimeUtils";
import { StatusPopup } from "../../components/popup/StatusPopup";
import { ShowMediaTypePopup } from "../../components/popup/ShowMediaTypePopup";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";

interface VendorConfirmationDetailsProps {
  setCurrentStep: any;
  step: any;
  campaignId?: any;
  userInfo?: any;
  successAddCampaignDetails?: any;
}

export const VendorConfirmationDetails = ({
  setCurrentStep,
  step,
  campaignId,
  userInfo,
  successAddCampaignDetails,
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

  const [vendorInput, setVendorInput] = useState<any>({
    pageName: "View Final Plan Page",
    id: pathname.split("/").splice(-1)[0],
    name: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.name || "",
    brandName:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.brandName ||
      "",
    clientName:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.clientName ||
      "",
    campaignType:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.campaignType ||
      "",
    startDate:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.startData ||
      "",
    endDate:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.endDate || "",
    duration:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || 30,
    selectedType:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType ||
      "",
    screenIds:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds ||
      [],
    triggers:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.triggers || [],
    // totalCampaignBudget: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalCampaignBudget,
  });

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

  const campaignStatusChangeAfterVendorApproval = useSelector(
    (state: any) => state.campaignStatusChangeAfterVendorApproval
  );
  const {
    loading: loadingVendorApproval,
    error: errorVendorApproval,
    data: vendorApprovalStatus,
  } = campaignStatusChangeAfterVendorApproval;

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading,
    error,
    success,
    data: campaignDetails,
  } = detailsToCreateCampaignAdd;

  const sendEmail = () => {
    const formData = new FormData();
    formData.append("toEmail", toEmail);
    formData.append("cc", cc);
    formData.append(
      "message",
      `
      <div style='max-width: 720px; margin: auto; padding: 16px; background-color: white; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px;'>
          <a href={https://plan.prooh.ai/campaignDetails/${campaignId}}>View Dashboard</a>
        </div>
      `
    );

    dispatch(sendEmailForConfirmation(formData));
  };

  const sendEmailToAll = () => {
    const screenOwnerEmails = Array.from(
      new Set(statusTableData?.map((s: any) => s.screenVendorEmail))
    );

    screenOwnerEmails?.forEach((email: any) => {
      const approvalIds = statusTableData
        ?.filter((s: any) => s.screenVendorEmail === email)
        ?.map((c: any) => c.campaignId)
        .join(",");
      const approvalUrl = `https://prooh.vinciis.in/api/v2/campaigns/approveCampaignScreenVendor?ids=${encodeURIComponent(
        approvalIds
      )}`;

      const emailContent = `
        <div style='max-width: 600px; margin: auto; padding: 16px; background-color: white; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px;'>
          <table style='width: 100%; border-collapse: collapse; margin-bottom: 16px;'>
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
                ?.map((d: any) => {
                  return {
                    screenName: d.screenName,
                    touchPoint: d.touchPoint,
                    startDate: convertDateIntoDateMonthYear(d.startDate),
                    endDate: convertDateIntoDateMonthYear(d.endDate),
                    cost: `${"\u20B9"}${d.cost.toFixed(0)}`,
                  };
                })
                ?.map(
                  (c: any, i: any) =>
                    `<tr key=${i} style='background-color: #F8F9FA;'>
                  <td style='padding: 8px; border: 1px solid #E0E0E0;'>${
                    c.screenName
                  }</td>
                  <td style='padding: 8px; border: 1px solid #E0E0E0;'>${
                    c.touchPoint
                  }</td>
                  <td style='padding: 8px; border: 1px solid #E0E0E0;'>${convertDateIntoDateMonthYear(
                    c.startDate
                  )}</td>
                  <td style='padding: 8px; border: 1px solid #E0E0E0;'>${convertDateIntoDateMonthYear(
                    c.endDate
                  )}</td>
                  <td style='padding: 8px; border: 1px solid #E0E0E0;'>${
                    c.cost
                  }</td>
                </tr>`
                )}
            </tbody>
          </table>
          <div>
            <a href='${approvalUrl}'
              style='display: inline-block; background-color: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;'>
              See Details
            </a>
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
          emailContent: JSON.stringify(emailContent),
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
    }
  };

  const handleSaveAndContinue = async () => {
    if (isDisabled) {
      message.error(
        "You will be redirected to campaign dashboard, once the campaign has started. Please wait..."
      );
    } else {
      let imageArr: string[] = [];
      for (let data of files) {
        let url = await getAWSUrl(data);
        imageArr.push(url);
      }
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Vendor Confirmation Page",
          id: campaignId,
          vendorApprovalImgs: imageArr, // return url array
        })
      );
      // setCurrentStep(step + 1);
      navigate(
        `${CAMPAIGN_DETAILS_PAGE}/${pathname?.split("/").splice(-1)[0]}`
      );
    }
  };

  useEffect(() => {
    dispatch(getVendorConfirmationDetails(vendorInput));
    // if (successAddCampaignDetails) {
    //   dispatch({
    //     type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
    //   });
    // }

    dispatch(
      getVendorConfirmationStatusTableDetails({
        id: campaignId,
      })
    );

    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Vendor Confirmation Page",
      })
    );
  }, [dispatch, vendorInput, campaignId, successAddCampaignDetails]);

  const handleOpenStatusModel = () => {
    setOpen((pre: boolean) => !open);
  };
  const handleOpenMediaModel = () => {
    setOpenMedia((pre: boolean) => !pre);
  };

  const myData = {
    Approved: {
      Connected:
        statusTableData?.filter(
          (c: any) =>
            [
              CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED,
              "Completed",
              "Pending",
              "Hold",
              "Active",
              "Pause",
              "Deleted",
            ].includes(c.status)

          // c.status === "Pending"
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
          // c.status !== "Pending"
        )?.length || 0,
      "Third Party": 0,
    },
  };

  const mediaTypeData = {
    Connected: statusTableData?.length || 0,
    "Third Party": 0,
  };

  return (
    <div className="w-full pt-3">
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
        <CountdownTimer createdAt={vendorConfirmationData?.createdAt} />
      </div>
      <VendorConfirmationBasicTable
        vendorConfirmationData={vendorConfirmationData}
      />

      <div className="py-4 w-full">
        <div className="flex justify-between">
          <div className="flex gap-8">
            <div className="flex">
              <h1 className="text-[14px]">
                Approved (
                {myData?.Approved?.Connected +
                  myData?.Approved?.["Third Party"]}
                )
              </h1>
            </div>
            <div className="flex">
              <h1 className="text-[14px]">
                Pending (
                {myData?.Pending?.Connected + myData?.Pending?.["Third Party"]})
              </h1>
            </div>
            <div className="flex">
              <h1 className="text-[14px]">
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
                  // c.status !== "Pending"
                )
                ?.filter(
                  (c: any) =>
                    c.status !==
                    CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED
                  // c.status !== "Pending"
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
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={handleSaveAndContinue}
          campaignId={campaignId}
          pageName="Vendor Confirmation Page"
          successAddCampaignDetails={successAddCampaignDetails}
        />
      </div>
    </div>
  );
};
