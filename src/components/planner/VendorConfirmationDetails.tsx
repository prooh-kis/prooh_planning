import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { useEffect, useState } from "react";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
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
import { addDetailsToCreateCampaign, changeCampaignStatusAfterVendorApproval } from "../../actions/campaignAction";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { CAMPAIGN_DETAILS_PAGE } from "../../routes/routes";
import { CountdownTimer } from "../../components/molecules/CountdownTimer";
import { sendEmailForConfirmation, sendEmailForVendorConfirmation } from "../../actions/userAction";
import { VendorMailTemplate } from "../../components/segments/VendorMailTemplate";
import ReactDOMServer from "react-dom/server";
import {
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
} from "../../constants/campaignConstants";

interface VendorConfirmationDetailsProps {
  setCurrentStep: any;
  step: any;
  campaignId?: any;
  userInfo?: any;
}

export const VendorConfirmationDetails = ({
  setCurrentStep,
  step,
  campaignId,
  userInfo,
}: VendorConfirmationDetailsProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [toEmail, setToEmail] = useState<any>("");
  const [cc, setCC] = useState<any>(userInfo?.email);

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
    // const emailContent = ReactDOMServer.renderToString(
    //   <VendorMailTemplate
    //     tableData={[]}
    //     buttonText="Approve"
    //     onButtonClick={() => {}}
    //   />
    // );
    // dispatch(sendEmailForConfirmation(emailContent));
  };

  const sendEmailToAll = () => {
    const screenOwnerEmails = Array.from(
      new Set(statusTableData?.map((s: any) => s.screenVendorEmail))
    );
    
    const plannerEmail = userInfo?.email;
    const managerEmail = userInfo?.primaryUserEmail;
    screenOwnerEmails?.forEach((email: any) => {
      const emailContent = ReactDOMServer.renderToString(
        <VendorMailTemplate
          tableData={
            statusTableData?.filter((s: any) => s.screenVendorEmail === email)?.map((d: any) => {
              return {
                screenName: d.screenName,
                touchPoint: d.touchPoint,
                startDate: new Date(d.startDate).toLocaleDateString(),
                endDate: new Date(d.endDate).toLocaleDateString(),
                cost: `${'\u20B9'}${d.cost.toFixed(0)}`
              }
            })
          }
          buttonText="See Details"
          onButtonClick={() => {
            dispatch(changeCampaignStatusAfterVendorApproval({
              ids: statusTableData?.filter((s: any) => s.screenVendorEmail === email) 
            }));
          }}
        />
      );
      dispatch(sendEmailForVendorConfirmation({
        toEmail: email,
        cc: [plannerEmail, managerEmail],
        emailContent: JSON.stringify(emailContent),
      }))

    })
    
  }

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
      const aws = await getAWSUrlToUploadFile(data.fileType);
      const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
      data.awsURL = aws?.awsURL;
      return aws?.awsURL;
    } catch (error: any) {
      message.error(error);
    }
  };

  const handleSaveAndContinue = async () => {
    if (isDisabled) {
      message.error("Please confirm budget for your selected trigger");
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
    if (campaignDetails) {
      dispatch(getVendorConfirmationDetails(vendorInput));
      dispatch(
        getVendorConfirmationStatusTableDetails({
          id: campaignId,
        })
      );
    }
  }, [dispatch, vendorInput, campaignDetails]);

  return (
    <div className="w-full pt-3">
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
        <div className="flex gap-4">
          <div className="flex">
            <h1 className="text-[14px]">
              Approved (
              {
                statusTableData?.filter(
                  (c: any) =>
                    c.status ===
                      CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED ||
                    c.status === "Pending"
                ).length
              }
              )
            </h1>
          </div>
          <div className="flex">
            <h1 className="text-[14px]">
              Pending (
              {
                statusTableData?.filter(
                  (c: any) =>
                    c.status ===
                    CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT
                ).length
              }
              )
            </h1>
          </div>
          <div className="flex">
            <h1 className="text-[14px]">
              Rejected (
              {
                statusTableData?.filter(
                  (c: any) =>
                    c.status ===
                    CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED
                ).length
              }
              )
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
                    CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED ||
                  c.status === "Pending"
              ).length,
              statusTableData?.filter(
                (c: any) =>
                  c.status === CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT
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
        />
      </div>
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

      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={handleSaveAndContinue}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};
