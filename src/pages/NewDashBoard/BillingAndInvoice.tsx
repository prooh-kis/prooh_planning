import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { BillingAndInvoiceEnterDetails } from "./BillAndInvoiceEnterDetails";
import { FileUploadButton, PrimaryButton } from "../../components";
import { createBillInvoice, getBillInvoiceDetails, handleInvoicePdfGenerationAction, takeDashboardScreenShotAction } from "../../actions/billInvoiceAction";
import { getClientAgencyDetails } from "../../actions/clientAgencyAction";
import { BillAndInvoiceSteppers } from "./BillAndInvoiceSteppers";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { message, Tooltip } from "antd";
import { CREATE_BILL_INVOICE_RESET, TAKE_DASHBOARD_SCREENSHOT_RESET } from "../../constants/billInvoiceConstant";
import {
  getAWSUrlToUploadFile,
  saveFileOnAWS,
} from "../../utils/awsUtils";
import ButtonInput from "../../components/atoms/ButtonInput";
import { BillAndInvoiceMonitoringPicsSegment } from "../../components/segments/BillAndInvoiceMonitoringPicsSegment";
import { generateImageFromPdf, sensitiseUrlByEncoding } from "../../utils/fileUtils";
import { CampaignDashboardScreenshots } from "../../components/segments/CampaignDashboardScreenshots";
import { formatDateForLogs } from "../../utils/dateAndTimeUtils";

// Define types for job status
type JobStatus = 'stuck' | 'waiting' | 'active' | 'completed' | 'failed' | 'error' | 'not_found' | 'no_job' ;

interface StatusUpdate {
  jobId: string;
  status: JobStatus;
  progress: number;
  result?: string; // URL or base64 image when completed
  error?: string;
  stack?: any;
}

const dashboardScreenshotName = [{id: 5, label: "Cost Consumption"}, {id: 4, label: "Daily Impression"}, {id: 3, label: "Hardware Performance"}, {id: 2, label: "Audience Impression"}, {id: 1, label: "Campaign Duration"}]

export const BillingAndInvoice = (props: any) => {
  const dispatch = useDispatch<any>();

  const { takeScreenShot, billInvoiceDetailsData, loadingBillInvoiceDetails, onClose, campaignDetails, siteLevelData, pathname } = props;

  // po data
  const [poNumber, setPoNumber] = useState<string>("");
  const [poDate, setPoDate] = useState<string>("");

  // invoice data
  const [invoiceDescription, setInvoiceDescription] = useState<string>("");
  const [invoiceQuantity, setInvoiceQuantity] = useState<string>("");
  const [invoiceCurrency, setInvoiceCurrency] = useState<string>("INR");
  const [invoiceAmount, setInvoiceAmount] = useState<number>(0);
  
  const [magnifiedImageView, setMagnifiedImageView] = useState<boolean>(false);
  const [magnifiedImage, setMagnifiedImage] = useState<any>(null);

  const [billingStep, setBillingStep] = useState<number>(0);

  const [poFiles, setPOFiles] = useState<any[]>([]);
  const [dashboardScreenshots, setDashboardScreenshots] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [disabledGenerate, setDisabledGenerate] = useState<boolean>(true);

  const [socketUpdateStatus, setSocketUpdateStatus] = useState<StatusUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [jobId, setJobId] = useState<any>(null);
  const [jobType, setJobType] = useState<any>(null);


  const todayDate = campaignDetails?.endDate 
    ? moment(Math.min(moment(new Date()).valueOf(), moment(campaignDetails.endDate).valueOf())).format("YYYY-MM-DD hh:mm:ss")
    : moment(new Date())?.format("YYYY-MM-DD hh:mm:ss");

  const {
    loading: loadingBillInvoiceCreation,
    error: errorBillInvoiceCreation,
    success: successBillInvoiceCreation,
  } = useSelector((state: any) => state.billInvoiceCreation);


  const clientAgencyDetailsGet = useSelector((state: any) => state.clientAgencyDetailsGet);
  const {
    loading: loadingClientAgencyDetails,
    error: errorClientAgencyDetails,
    data: clientAgencyDetailsData,
  } = clientAgencyDetailsGet;

  const {
    loading: loadingScreenshot,
    error: errorScreenshot,
    data: dashboardSS
  } = useSelector((state: any) => state.takeDashboardScreenShot)

  const {
    loading: loadingInvoicePdf,
    error: errorInvoicePdf,
    data: invoicePdf
  } = useSelector((state: any) => state.handleInvoicePdfGeneration);

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

  const generateBillInvoice = useCallback(async () => {
    let poImageBase64: any = null;
      
    if (billInvoiceDetailsData?.uploadedPO) {
      poImageBase64 = await generateImageFromPdf(billInvoiceDetailsData.uploadedPO);
    }
    setSocketUpdateStatus(null);
    setLoading(true);
    dispatch(handleInvoicePdfGenerationAction({
      fileName: `INVOICE_${campaignDetails?.brandName}_${campaignDetails?.name}`,
      billInvoiceDetailsData,
      campaignDetails,
      clientAgencyDetailsData,
      siteLevelData,
      poImage: poImageBase64,
      newInvoice: false,
    }));
  }, [billInvoiceDetailsData, dispatch, campaignDetails, clientAgencyDetailsData, siteLevelData]);
  
  const handleSaveClick = () => {
    if (!billInvoiceDetailsData?.poNumber || !billInvoiceDetailsData?.poDate) {
      message.info("You have not entered PO Number for this invoice, please take a look...");
      return;
    }
    if (billingStep === 1) {
      dispatch(createBillInvoice({
        campaignCreationId: campaignDetails?._id,
        campaignName: campaignDetails?.name,
        clientAgencyName: campaignDetails?.clientName,
        invoiceNumber: `PROOH/${campaignDetails?._id}`,
        invoiceDate: todayDate,
        invoiceCurrency: invoiceCurrency,
        clientConfirmation: campaignDetails?.clientApprovalImgs?.length > 0 ? "Mail Confirmation" : "mail confirmation",
        clientOrderDate: poDate,
        poNumber: poNumber,
        poDate: poDate,
        tableContent: [{
          description: invoiceDescription,
          quantity: invoiceQuantity,
          amount: invoiceAmount,
          rate: invoiceAmount,
          hsnsac: ""
        }],
        subTotalAmount: invoiceAmount,
        outPutGstPercent: 18,
        outPutGstAmount: invoiceAmount * 0.18,
        totalAmount: invoiceAmount * 1.18,
        currency: "INR",
        uploadedPO: billingStep === 1 && poFiles.length > 0 ? poFiles[poFiles.length - 1].awsURL : undefined,
      }))
    }
    setBillingStep(billingStep + 1);
  };

  const handleAddNewFile = async (file: File) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);

      const awsURL = await getAWSUrl({
        name: file.name,
        file: file,
        url: fileURL,
        fileType: file.type,
        fileSize: file.size,
      });

      setPOFiles((pre: any) => [
        {
          name: file.name,
          file: file,
          url: fileURL,
          fileType: file.type,
          fileSize: file.size,
          awsURL: awsURL,
        },
      ]);
    }
  };

  const removeImage = (file: File) => {
    setPOFiles((pre: any) => {
      return pre?.filter((p: any ) => p.name !== file.name)
    })
  };

  useEffect(() => {

   if (errorBillInvoiceCreation) {
    message.error("Error in adding invoice details...")
   }

  },[errorBillInvoiceCreation]);

  useEffect(() => {

    if (successBillInvoiceCreation) {
      message.success("Invoice Details Added Successfully...");
      dispatch({
        type: CREATE_BILL_INVOICE_RESET
      });
      dispatch(getBillInvoiceDetails({ campaignCreationId: campaignDetails._id }));
    }

    if (successBillInvoiceCreation) {
      if (billingStep == 2 && dashboardScreenshots?.length === 0) {
        message.info("Your dashboard screen is not captured, please capture it first...");
      } else if (billingStep == 2 && dashboardScreenshots?.length === 1 && dashboardScreenshots[0].status == "active") {
        message.info("Your dashboard screen is processing, please wait...");
      } else {
      }
    }

  },[dispatch, successBillInvoiceCreation, billingStep, campaignDetails, dashboardScreenshots]);
    
  useEffect(() => {
    if (campaignDetails) {
      dispatch(getClientAgencyDetails({
        clientAgencyName: campaignDetails?.clientName?.toUpperCase()
      }));
    }
  },[campaignDetails, dispatch]);


  useEffect(() => {
    if (billingStep === 2) {
      setJobType("screenshot");
    }
    if (billingStep === 3) {
      setJobType("invoice");
      setDisabledGenerate(false);
    }
    if (billInvoiceDetailsData) {
      setPOFiles([billInvoiceDetailsData.uploadedPO]);
      if (dashboardScreenshots?.length === 0 && billInvoiceDetailsData?.dashboardScreenshots?.length > 0) {
        const lastScreenshotSet = billInvoiceDetailsData.dashboardScreenshots?.map((ss: any) => ss.url);
        // Create a new array with the screenshots
        setDashboardScreenshots(lastScreenshotSet);
      }
    }
  },[billInvoiceDetailsData, billingStep, dashboardSS, dashboardScreenshots?.length]);

  useEffect(() => {
    if (invoicePdf && invoicePdf?.invoiceJob) {
      message.info("Invoice in being generated, will be made available in a moment...");
      setJobId(invoicePdf?.invoiceJob.jobId);
    }
    if (dashboardSS && dashboardSS?.screenshotjob) {
      message.info("Dashboard screenshot in being generated, will be made available in a moment...");
      setJobId(dashboardSS.screenshotjob.jobId)
    }
  },[dashboardSS, invoicePdf]);


  useEffect(() => {
    if (props?.open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.open]);

  if (!props?.open) {
    return null;
  }

  return (
    <div className="font-custom fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {magnifiedImageView ? (
        <div
          className="bg-[#FFFFFF] p-2 rounded-lg shadow-lg w-full max-w-full overflow-auto max-h-auto "
          style={{ height: "100vh", width: "100vw" }}
          onClick={() => {
            setMagnifiedImage(null);
            setMagnifiedImageView(!magnifiedImageView);
          }} 
        >
          <div className="w-full p-1">
            <i className="fi fi-br-cross text-[12px] cursor-pointer flex justify-end " />
          </div>
          <img
            className="w-full h-full border border-gray-100 rounded-[12px]"
            src={magnifiedImage?.split("/").includes("https:") ? magnifiedImage : `data:image/png;base64,${magnifiedImage}`}
            alt="image"
          />
        </div>
      ) : (
        <div
          className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full overflow-auto max-h-auto "
          style={{ height: "90vh", width: "95vw" }}
        >
          <div className="flex justify-between items-center px-2">
            <h1 className="text-[16px] font-bold">Generate Invoice</h1>

            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-4">
                {loadingBillInvoiceCreation && (
                  <div className="flex items-center justify-center">
                    <i className="fi fi-br-spinner text-gray-500 flex items-center animate-spin"></i>
                  </div>
                )}
                {billingStep !== 3 && (
                  <PrimaryButton
                    title="Save"
                    action={handleSaveClick}
                    height="h-8"
                    width="w-20"
                    textSize="text-[12px]"
                    rounded="rounded"
                  />
                )}
                {loadingInvoicePdf ? (
                  <div className="flex items-center justify-center">
                    <i className="fi fi-br-spinner text-gray-500 flex items-center animate-spin"></i>
                  </div>
                ) : (
                  <PrimaryButton
                  title="Generate"
                  action={generateBillInvoice}
                  height="h-8"
                  width="w-20"
                  textSize="text-[12px]"
                  rounded="rounded"
                  disabled={disabledGenerate}
                />
                )}
              </div>
              <i
                className="fi fi-br-cross text-[14px] cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-1/2">
              <BillAndInvoiceSteppers
                setStep={(e: any) => {
                
                  setBillingStep(e)
                }}
                steps={4}
                step={billingStep}
              />
            </div>
            {loadingBillInvoiceCreation ? (
              <div>
                <LoadingScreen />
              </div>
            ) : (
              <div>
                <div>
                  {billInvoiceDetailsData?.invoiceDocs.length === 0 && dashboardSS && dashboardSS.status && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      {
                        dashboardSS?.status === "active" || loading && (
                          <div className="border-b-2 border-[#22C55E] rounded-[2px]">
                            <i className="fi fi-sr-arrow-small-down text-[#22C55E] flex items-center justify-center animate-bounce"></i>
                          </div>
                        )
                      }
                      {dashboardSS.status === "completed" && billInvoiceDetailsData?.invoiceDocs.length > 0 && (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => (window.location as any).reload()}>
                            <h1 className="text-[12px] text-[#22C55E]">Invoice generated, please reload to donwload...</h1>
                            <div className="border-b-2 border-[#22C55E] rounded-[2px]">
                              <i className="fi fi-sr-arrow-small-down text-[#22C55E] flex items-center justify-center animate-bounce"></i>
                            </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {billInvoiceDetailsData?.invoiceDocs.length > 0 && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => !loading && window.open(billInvoiceDetailsData?.invoiceDocs[billInvoiceDetailsData?.invoiceDocs.length - 1].url, "_blank")}>
                    <Tooltip title={`Generated on ${billInvoiceDetailsData?.invoiceDocs[billInvoiceDetailsData?.invoiceDocs.length - 1].date}`}>
                      <h1 className="text-[12px] text-[#22C55E]">Click to download...</h1>
                    </Tooltip>
                      {loading ? (
                        <div className="flex items-center justify-center gap-1">
                          <h1 className="text-[12px] text-[#22C55E]">{socketUpdateStatus?.progress}%</h1>
                          <i className="fi fi-br-spinner text-[#22C55E] flex items-center animate-spin"></i>
                        </div>
                      ) : (
                        <div className="border-b-2 border-[#22C55E] rounded-[2px]">
                          <i className="fi fi-sr-arrow-small-down text-[#22C55E] flex items-center justify-center animate-bounce"></i>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
            

          </div>
          {billingStep == 0 ? (
            <div>
              {loadingClientAgencyDetails || loadingBillInvoiceDetails && (
                <LoadingScreen />
              )}
              {clientAgencyDetailsData && (
                <BillingAndInvoiceEnterDetails
                  todayDate={todayDate}
                  campaignDetails={campaignDetails}
                  clientAgencyDetailsData={clientAgencyDetailsData}
                  billInvoiceDetailsData={billInvoiceDetailsData}
                  setInvoiceAmount={setInvoiceAmount}
                  invoiceAmount={invoiceAmount}
                  setInvoiceDescription={setInvoiceDescription}
                  invoiceDescription={invoiceDescription}
                  setInvoiceQuantity={setInvoiceQuantity}
                  invoiceQuantity={invoiceQuantity}
                  setInvoiceCurrency={setInvoiceCurrency}
                  invoiceCurrency={invoiceCurrency}
                  setPoDate={setPoDate}
                  poDate={poDate}
                  setPoNumber={setPoNumber}
                  poNumber={poNumber}
                />
              )}
            </div>

          ) : billingStep === 1 ? (
            <div className="py-4 px-1">
              <div className="p-2">
                <h1 className="text-[14px] font-semibold pt-2">Screenshot Of Client Confirmation</h1>
                <p className="text-[12px] text-[#6F7F8E]">A verified proof of client approval showcasing our commitment to transparency</p>
                <div className="grid grid-cols-4 gap-2 py-4">
                  {campaignDetails?.clientApprovalImgs?.length === 0 && (
                    <div className="col-span-1 flex items-center">
                      {[1]?.map((_: any, i: any) => (
                        <div key={i} className="w-full relative inline-block">
                          <div
                            className="w-20 h-20 object-cover rounded-lg shadow-md flex items-center justify-center">
                            <i className="fi fi-rr-picture flex items-center text-[36px] text-[#D7D7D7]"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {campaignDetails?.clientApprovalImgs?.map((img: any, i: number) => (
                    <div key={i} className="col-span-1 border border-gray-200 rounded-[12px] flex items-center justify-center shadow-md">
                      <img className="rounded-[12px]" src={img} alt="Approved" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2">
                <h1 className="text-[14px] font-semibold pt-2">Screenshot Of Purchase Order (PO)</h1>
                <p className="text-[12px] text-[#6F7F8E]">A verified proof of client approval showcasing our commitment to transparency</p>
                <div className="flex items-center py-4">
                  <FileUploadButton
                    handleFile={handleAddNewFile}
                    width=""
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 py-4">
                  {poFiles?.length === 0 || poFiles.includes("") ? (
                    <div className="col-span-1 flex items-center">
                      {[1]?.map((_: any, i: any) => (
                        <div key={i} className="w-full relative inline-block">
                          <div
                            className="w-20 h-20 object-cover rounded-lg shadow-md flex items-center justify-center">
                            <i className="fi fi-rr-file-pdf flex items-center text-[36px] text-[#D7D7D7]"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : poFiles?.map((file: any, k: any) => (
                    <div key={k} className="relative inline-block col-span-1 border border-gray-200 rounded-[12px] flex items-center justify-center shadow-md">
                      <iframe
                        src={file.url ? file.url : file}
                        className="rounded-[12px] no-scrollbar"
                        width={"100%"}
                        title="PDF Viewer"
                      />
                      <i
                        onClick={() => removeImage(file)}
                        className="fi fi-sr-cross-circle flex items-center justify-center absolute top-0 right-0 focus:outline-none hover:bg-red-700 text-[#FF0808]"
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : billingStep === 2 ? (
            <CampaignDashboardScreenshots
              loading={loadingScreenshot || loading}
              takeScreenShot={takeScreenShot}
              setSocketUpdateStatus={setSocketUpdateStatus}
              socketUpdateStatus={socketUpdateStatus}
              setDashboardScreenshots={setDashboardScreenshots}
              dashboardScreenshots={dashboardScreenshots}
              setMagnifiedImageView={setMagnifiedImageView}
              setMagnifiedImage={setMagnifiedImage}
              magnifiedImageView={magnifiedImageView}
              dashboardScreenshotName={dashboardScreenshotName}
              dashboardSS={dashboardSS}
              jobId={jobId}
              setJobId={setJobId}
              setLoading={setLoading}
              
            />
          ) : billingStep === 3 ? (
            <div className="py-4 px-1">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-[14px] font-semibold pt-2">Monitoring Pics & Logs</h1>
                  <p className="text-[12px] text-[#6F7F8E]">A verified proof of monitoring pictures and logs, showcasing our commitment to transparency</p>
                </div>
              </div>
              <BillAndInvoiceMonitoringPicsSegment
                campaignDetails={campaignDetails}
                currentDate={todayDate}
                siteLevelData={siteLevelData}
                jobId={jobId}
                invoicePdf={invoicePdf}
                setSocketUpdateStatus={setSocketUpdateStatus}
                setLoading={setLoading}
                setJobId={setJobId}
                socketUpdateStatus={socketUpdateStatus}
                loading={loading}
              />
            </div>
          ) : null}
        </div>
      )}

    </div>
  );
};
