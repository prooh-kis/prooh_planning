import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { BillingAndInvoiceEnterDetails } from "./BillAndInvoiceEnterDetails";
import { FileUploadButton, PrimaryButton } from "../../components";
import { createBillInvoice, getBillInvoiceDetails, getQueueJobStatusAction, handleInvoicePdfGenerationAction, takeDashboardScreenShotAction } from "../../actions/billInvoiceAction";
import { getClientAgencyDetails } from "../../actions/clientAgencyAction";
import { BillAndInvoiceSteppers } from "./BillAndInvoiceSteppers";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { message, Tooltip } from "antd";
import { CREATE_BILL_INVOICE_RESET } from "../../constants/billInvoiceConstant";
import {
  getAWSUrlToUploadFile,
  saveFileOnAWS,
} from "../../utils/awsUtils";
import ButtonInput from "../../components/atoms/ButtonInput";
import { BillAndInvoiceMonitoringPicsSegment } from "./BillAndInvoiceMonitoringPicsSegment";
import { generateImageFromPdf } from "../../utils/generatePdf";
import { io, Socket } from 'socket.io-client';

// Define types for job status
type JobStatus = 'stuck' | 'waiting' | 'active' | 'completed' | 'failed' | 'error' | 'not_found' | 'no_job' ;

interface StatusUpdate {
  jobId: string;
  status: JobStatus;
  progress: number;
  result?: string; // URL or base64 image when completed
  error?: string;
}

const dashboardScreenshotName = [{id: 5, label: "Cost Consumption"}, {id: 4, label: "Daily Impression"}, {id: 3, label: "Hardware Performance"}, {id: 2, label: "Audience Impression"}, {id: 1, label: "Campaign Duration"}]

export const BillingAndInvoice = (props: any) => {
  const dispatch = useDispatch<any>();

  const { loading, onClose, campaignDetails, siteLevelData, pathname } = props;




  const [magnifiedImageView, setMagnifiedImageView] = useState<boolean>(false);
  const [magnifiedImage, setMagnifiedImage] = useState<any>(null);

  const [billingStep, setBillingStep] = useState<number>(0);

  const [poFiles, setPOFiles] = useState<any[]>([]);
  const [dashboardScreenshots, setDashboardScreenshots] = useState<any>([]);
  const [ssLoading, setSSLoading] = useState<boolean>(false);

  const [disabledGenerate, setDisabledGenerate] = useState<boolean>(true);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<StatusUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [jobId, setJobId] = useState<any>(null);
  const [jobType, setJobType] = useState<any>(null);
  // const [socketUrl, setSocketUrl] = useState<any>("http://localhost:4444");
  const [socketUrl, setSocketUrl] = useState<any>("wss://servermonad.vinciis.in");

  const todayDate = moment(new Date())?.format("YYYY-MM-DD hh:mm:ss");

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

  const billInvoiceDetailsGet = useSelector((state: any) => state.billInvoiceDetailsGet);
  const {
    loading: loadingBillInvoiceDetails,
    error: errorBillInvoiceDetails,
    data: billInvoiceDetailsData,
  } = billInvoiceDetailsGet;

  const {
    loading: loadingScreenshot,
    error: errorScreenshot,
    data: screenshots
  } = useSelector((state: any) => state.takeDashboardScreenShot)

  const {
    loading: loadingInvoicePdf,
    error: errorInvoicePdf,
    data: invoicePdf
  } = useSelector((state: any) => state.handleInvoicePdfGeneration);

  const {
    loading: loadingJobStatus,
    error: errorJobStatus,
    data: jobStatus
  } = useSelector((state: any) => state.getQueueJobStatus);
  
  
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
    let poImage;
    if (billInvoiceDetailsData?.uploadedPO) {
      poImage = await generateImageFromPdf(billInvoiceDetailsData?.uploadedPO);
    }

    dispatch(handleInvoicePdfGenerationAction({
      fileName: `INVOICE_${campaignDetails?.brandName}_${campaignDetails?.name}`,
      billInvoiceDetailsData,
      campaignDetails,
      clientAgencyDetailsData,
      siteLevelData,
      poImage,
      newInvoice: false,
    }));
  }, [billInvoiceDetailsData, dispatch, campaignDetails, clientAgencyDetailsData, siteLevelData]);
  
  const saveClientAgencyDetails = () => {
    setBillingStep(billingStep + 1);
    if (billingStep === 1) {
      dispatch(createBillInvoice({
        campaignCreationId: campaignDetails?._id,
        uploadedPO: billingStep === 1 && poFiles.length > 0 ? poFiles[poFiles.length - 1].awsURL : undefined,
      }))
    }
  };
  

  const takeScreenShot = () => {
    setSSLoading(true);
    dispatch(takeDashboardScreenShotAction({
      campaignId: campaignDetails?._id,
      // url: `${window.location.origin}/campaignDashboard/${campaignDetails?._id}`,
      url: `https://developmentplanning.vercel.app/campaignDashboard/${campaignDetails?._id}`,
      // url: `http://localhost:3000/campaignDashboard/${campaignDetails?._id}`,
      tabs: ["1", "2", "3", "4", "5"]
      // tabs: ["1"]
    }))
  }

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
    }

    if (successBillInvoiceCreation) {
      if (billingStep == 2 && dashboardScreenshots?.length === 0) {
        message.info("Your dashboard screen is not captured, please capture it first...");
      } else if (billingStep == 2 && dashboardScreenshots?.length === 1 && dashboardScreenshots[0].status == "active") {
        message.info("Your dashboard screen is processing, please wait...");
      } else {
      }
    }

  },[dispatch, successBillInvoiceCreation, billingStep, dashboardScreenshots]);

  
  //  useEffect(() => {

   
  // },[billInvoiceDetailsData, dashboardScreenshots]);
    
  useEffect(() => {
  
    if (campaignDetails) {
      dispatch(getBillInvoiceDetails({
        campaignCreationId: campaignDetails?._id,
        invoiceId: campaignDetails?.invoiceId
      }));

      if (!clientAgencyDetailsData) {
        dispatch(getClientAgencyDetails({
          clientAgencyName: campaignDetails?.clientName?.toUpperCase()
        }));
      }
    }

  },[campaignDetails, clientAgencyDetailsData, dispatch]);


  useEffect(() => {
    if (billingStep === 2) {
      setJobType("screenshot");
    }
    if (billingStep === 3) {
      setJobType("invoice");
      setDisabledGenerate(false);
    }

    // if (screenshots?.length > 0) {
    //   setDashboardScreenshots((prev: any) => 
    //     JSON.stringify(prev) !== JSON.stringify(screenshots) 
    //       ? [...screenshots] 
    //       : prev
    //   );
    // }

    if (billInvoiceDetailsData) {
      setPOFiles([billInvoiceDetailsData.uploadedPO]);
      if (dashboardScreenshots.length === 0 && billInvoiceDetailsData?.dashboardScreenshots?.length > 0) {
        const screenshots: any = billInvoiceDetailsData.dashboardScreenshots[billInvoiceDetailsData.dashboardScreenshots?.length - 1]?.screenshots;
        setDashboardScreenshots(screenshots);
      }
    }

    if (screenshots) {
      setJobId(screenshots.jobId)
    }

  },[dispatch, billingStep, screenshots, billInvoiceDetailsData, dashboardScreenshots]);

  useEffect(() => {
    if (invoicePdf && invoicePdf?.jobId) {
      message.info("Invoice in being generated, will be made available in a moment...");
      dispatch(getQueueJobStatusAction({
        type: "invoice",
        campaignCreationId: campaignDetails?._id, 
        apiUrl: invoicePdf?.statusUrl,
        jobId: invoicePdf?.jobId,
      }));
    }
  },[campaignDetails?._id, dispatch, invoicePdf]);

  useEffect(() => {
   
    // const interval = setTimeout(() => {
        if (jobStatus && jobStatus.status === "completed") {
          message.info("Invoice generation completed...")
        }
      // }, 10000);
  
      // return () => {
      //   clearInterval(interval);
      // }
  },[invoicePdf, jobStatus]);

  useEffect(() => {
    if (jobId !== null || jobId !== undefined || jobId !== "") {
      console.log(jobId);
      // Establish connection
      const newSocket = io(socketUrl, {
        transports: ['websocket'],
        secure: true,
        rejectUnauthorized: false, // Only for development with self-signed certs
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000
      });
      console.log("newSocket", newSocket);
    
    // Connection event handlers
    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server', newSocket);
      
      // Subscribe to job status
      if (jobType === "screenshot") {
        newSocket.emit('subscribeToScreenshotJob', jobId);
      }
      if (jobType === "invoice") {
        newSocket.emit('subscribeToInvoiceJob', jobId);
      }
    });

    // Status update handler
    newSocket.on('screenshotJobStatus', (update: StatusUpdate) => {
      console.log('Job status update:', update);
      setStatus(update);
      if (update.status === "completed" && update.result) {
        const newScreenshots: any = update?.result;
         setDashboardScreenshots(newScreenshots.screenshots)
         setSSLoading(false);
      }

      if (update.status === "active") {
        setSSLoading(true);
      }

      if (update.status === "stuck")  {
        // dispatch(getScreen)
      }
      if (update.status === "not_found") {
        setSSLoading(false);
        message.info("Screenshot capture failed, please retry again after reloading...")
      }
    });

    // Disconnect handler
    newSocket.on('disconnect', (reason) => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server: ', reason);
      if (reason === 'io server disconnect') {
        // The disconnection was initiated by the server, you need to reconnect manually
        newSocket.connect();
      }
    });

    // Add error handlers
    newSocket.on('connect_error', (error: any) => {
      console.error('Connection Error:', error);
      console.error('Error details:', {
        message: error.message,
        description: error.description,
        context: error.context
      });
    });
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log('Cleaning up WebSocket connection');
      newSocket.disconnect();
    };
  }
  }, [jobId, socketUrl, jobType]);


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
                    action={saveClientAgencyDetails}
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
                {loadingJobStatus ? (
                  <div className="flex items-center justify-center">
                    <i className="fi fi-br-spinner text-[#22C55E] flex items-center animate-spin"></i>
                  </div>
                ) : (
                  <div>
                    {billInvoiceDetailsData?.invoiceDocs.length === 0 && jobStatus && jobStatus.status && (
                      <div className="flex items-center gap-2 cursor-pointer">
                        {
                          jobStatus?.status === "active" || ssLoading && (
                            <div className="border-b-2 border-[#22C55E] rounded-[2px]">
                              <i className="fi fi-sr-arrow-small-down text-[#22C55E] flex items-center justify-center animate-bounce"></i>
                            </div>
                          )
                        }
                        {jobStatus.status === "completed" && billInvoiceDetailsData?.invoiceDocs.length > 0 && (
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
                )}

                {billInvoiceDetailsData?.invoiceDocs.length > 0 && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.open(billInvoiceDetailsData?.invoiceDocs[billInvoiceDetailsData?.invoiceDocs.length - 1].url, "_blank")}>
                      <h1 className="text-[12px] text-[#22C55E]">Already generated, click to download...</h1>
                      <div className="border-b-2 border-[#22C55E] rounded-[2px]">
                        <i className="fi fi-sr-arrow-small-down text-[#22C55E] flex items-center justify-center animate-bounce"></i>
                      </div>
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
            <div className="py-4 px-1">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-[14px] font-semibold pt-2">Screenshot Of Campaign Dashboard Summary</h1>
                  <p className="text-[12px] text-[#6F7F8E]">A verified proof of client approval showcasing our commitment to transparency</p>
                </div>
                <div className="px-4">
                  <Tooltip title="Refresh Dashboard Screenshot Data">
                    <i 
                      className="fi fi-br-rotate-right flex items-center justify-center text-gray-500"
                      onClick={() => {
                        takeScreenShot();
                      }}
                    ></i>
                  </Tooltip>
                </div>
              </div>
              {loadingScreenshot || ssLoading && (
                <LoadingScreen />
              )}
              {dashboardScreenshots?.length === 0 && (
                <div className="flex flex-col gap-2 items-center justify-center h-[50vh]">
                  <p className="text-[12px]">Take snapshots of your campaign summary for future proof of references...</p>
                  <ButtonInput
                    onClick={takeScreenShot}
                  >
                    Take Snapshots
                  </ButtonInput>
                </div>
              )}
              {dashboardScreenshots?.length > 0 && (
                <div className="grid grid-cols-2 gap-4 rounded-[12px]">
                  {dashboardScreenshots?.reverse()?.map((image: any, i: number) => (
                    <div key={i} className="col-span-1 py-4">
                      <img 
                        onClick={() => {
                          setMagnifiedImage(image);
                          setMagnifiedImageView(!magnifiedImageView);
                        }} 
                        className="h-full border border-gray-100 rounded-[12px] shadow-md"
                        src={image?.split("/").includes("https:") ? image : `data:image/png;base64,${image}`}
                        alt="image"
                      />
                      <h1 className="p-1 text-[12px] truncate">{dashboardScreenshotName?.find((ds: any) => ds.id === Number(image?.match(/_([0-9]+)\.png$/)?.[1]))?.label}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : billingStep === 3 ? (
            <div className="py-4 px-1">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-[14px] font-semibold pt-2">Monitoring Pics & Logs</h1>
                  <p className="text-[12px] text-[#6F7F8E]">A verified proof of monitoring pictures and logs, showcasing our commitment to transparency</p>
                </div>
                <div className="px-4">
                  <Tooltip title="Refresh Dashboard Screenshot Data">
                    <i 
                      className="fi fi-br-rotate-right flex items-center justify-center text-gray-500"
                      onClick={() => {
                        // takeScreenShot();
                      }}
                    ></i>
                  </Tooltip>
                </div>
              </div>
              <BillAndInvoiceMonitoringPicsSegment
                campaignDetails={campaignDetails}
                currentDate={todayDate}
                siteLevelData={siteLevelData}
              />

            </div>
          ) : null}
        </div>
      )}

    </div>
  );
};
