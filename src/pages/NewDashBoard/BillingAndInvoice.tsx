import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { BillingAndInvoiceEnterDetails } from "./BillAndInvoiceEnterDetails";
import { FileUploadButton, PrimaryButton } from "../../components";
import { createBillInvoice } from "../../actions/billInvoiceAction";
import { addClientAgencyDetails, getClientAgencyDetails } from "../../actions/clientAgencyAction";
import { generateBillAndInvoicePdf } from "../../utils/generatePdf";
import { BillAndInvoiceSteppers } from "./BillAndInvoiceSteppers";
import { takeDashboardScreenShotAction } from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { message, Tooltip } from "antd";
import { ADD_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { CREATE_BILL_INVOICE_RESET } from "../../constants/billInvoiceConstant";
import {
  getAWSUrlToUploadFile,
  saveFileOnAWS,
} from "../../utils/awsUtils";
import { handleBase64ImageUpload } from "../../utils/fileUtils";
import ButtonInput from "../../components/atoms/ButtonInput";
import { BillAndInvoiceMonitoringPicsSegment } from "./BillAndInvoiceMonitoringPicsSegment";

const dashboardScreenshotName = ["Cost Consumption", "Daily Impression", "Hardware Performance", "Audience Impression", "Campaign Duration"]
export const BillingAndInvoice = (props: any) => {
  const dispatch = useDispatch<any>();
  const { loading, onClose, campaignDetails, siteLevelData } = props;

  // po data
  const [poNumber, setPoNumber] = useState<string>("");
  const [poDate, setPoDate] = useState<string>("");
  const [poFiles, setPOFiles] = useState<any[]>([]);

  // client/agency data
  const [clientAgencyName, setClientAgencyName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [gst, setGst] = useState<string>("");
  const [pan, setPan] = useState<string>("");
  // poc data
  const [pocName, setPocName] = useState<string>("");
  const [pocContact, setPocContact] = useState<string>("");
  const [pocEmail, setPocEmail] = useState<string>("");
  const [pocDesignation, setPocDesignation] = useState<string>("");

  // invoice data
  const [invoiceDescription, setInvoiceDescription] = useState<string>("");
  const [invoiceQuantity, setInvoiceQuantity] = useState<string>("");
  const [invoiceCurrency, setInvoiceCurrency] = useState<string>("INR");
  const [invoiceAmount, setInvoiceAmount] = useState<number>(0);

  const [magnifiedImageView, setMagnifiedImageView] = useState<boolean>(false);
  const [magnifiedImage, setMagnifiedImage] = useState<any>(null);

  const [billingStep, setBillingStep] = useState<number>(0);
  const [dashboardScreenshots, setDashboardScreenshots] = useState<any>([]);
  const [updateScreenshots, setUpdateScreenshots] = useState<boolean>(false);

  const [previewSample, setPreviewSample] = useState<any>({});

  const [disabledGenerate, setDisabledGenerate] = useState<boolean>(true);

  const [billLoading, setBillLoading] = useState<any>(false);
  
  const todayDate = moment(new Date())?.format("YYYY-MM-DD hh:mm:ss");

  const {
    loading: loadingAddClientAgencyDetails,
    error: errorAddClientAgencyDetails,
    success: successClientAgencyDetails,
  } = useSelector((state: any) => state.clientAgencyDetailsAdd);

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

  const generateBillInvoice = useCallback(() => {
    generateBillAndInvoicePdf({
      download: true,
      fileName: `INVOICE_${campaignDetails?.brandName}_${campaignDetails?.name}`,
      jsonData: {
        planner: campaignDetails?.campaignPlannerName,
        plannerEmail: campaignDetails?.campaignPlannerEmail,
        clientAgencyName: clientAgencyName,
        pan: pan,
        gst: gst,
        pocName: pocName,
        pocEmail: pocEmail,
        pocContact: pocContact,
        pocDesignation: pocDesignation,
        officeAddress: {
          address: address,
          city: city,
          state: stateName,
          country: country,
          phone: phone,
          email: email,
          website: website,
          zipCode: zipCode,
          gst: gst,
          pan: pan,
        },
        invoiceNumber: `PROOH/${String(new Date().getFullYear() - 1)}-${String(new Date().getFullYear())}/${clientAgencyDetailsData?.totalInvoiceNumber || 0}`,
        invoiceDate: todayDate,
        internalSoNumber: `PROOH/${String(new Date().getFullYear() - 1)}-${String(new Date().getFullYear())}/${clientAgencyDetailsData?.totalInvoiceNumber || 0}/SO`,
        clientConfirmation: campaignDetails?.clientApprovalImgs?.length > 0? "Mail Confirmation" : "mail confirmation",
        clientOrderDate: poDate,
        poNumber: poNumber,
        invoiceDescription: invoiceDescription,
        invoiceQuantity: invoiceQuantity,
        invoiceCurrency: invoiceCurrency,
        invoiceAmount: Number(invoiceAmount.toFixed(0)),
        subTotalAmount: Number(invoiceAmount.toFixed(0)) * 1.18,
        outPutGstPercent: 18,
        outPutGstAmount: Number(invoiceAmount.toFixed(0)) * 0.18,
        campaignName: `${campaignDetails?.name} (${campaignDetails?.brandName})`,
        startDate: moment(campaignDetails?.startDate).format("YYYY-MM-DD"),
        endDate: moment(campaignDetails?.endDate).format("YYYY-MM-DD"),
      },
      billInvoiceDetailsData: billInvoiceDetailsData,
      campaignDetails: campaignDetails,
      siteLevelData:siteLevelData,
      setBillLoading: setBillLoading,
    });

  },[address, billInvoiceDetailsData, siteLevelData, campaignDetails, city, clientAgencyDetailsData, clientAgencyName, country, email, gst, invoiceAmount, invoiceCurrency, invoiceDescription, invoiceQuantity, pan, phone, poDate, poNumber, pocContact, pocDesignation, pocEmail, pocName, stateName, todayDate, website, zipCode])

  const saveClientAgencyDetails = async () => {
    if (
      poNumber == "" || poNumber == undefined || poNumber == null
    ) {
      message.info("You have not entered PO Number for this invoice, please take a look...");
    } else {
      // setBillingStep(billingStep+1);
    }

    let shots: any = [];
    if (dashboardScreenshots.length > 0 && updateScreenshots) {
      // shots = [
      //   "https://store-files-in-s3.s3.ap-south-1.amazonaws.com/6826cdacbb7b693c3dfb117e_screenshot-1747373484137.png",
      //   "https://store-files-in-s3.s3.ap-south-1.amazonaws.com/6826cdacbb7b693c3dfb117f_screenshot-1747373484634.png",
      //   "https://store-files-in-s3.s3.ap-south-1.amazonaws.com/6826cdacbb7b693c3dfb1180_screenshot-1747373484875.png",
      //   "https://store-files-in-s3.s3.ap-south-1.amazonaws.com/6826cdadbb7b693c3dfb1181_screenshot-1747373485089.png",
      //   "https://store-files-in-s3.s3.ap-south-1.amazonaws.com/6826cdadbb7b693c3dfb1182_screenshot-1747373485214.png"
      // ];
      for (let image of screenshots.images) {
        const fileReady = await handleBase64ImageUpload(`${image}`);
        const awsurl = await getAWSUrl({
          name: fileReady.file.name,
          file: fileReady.file,
          url: fileReady.fileURL,
          fileType: fileReady.file.type,
          fileSize: fileReady.file.size,
        });
        shots.push(awsurl)
      }
    }

    dispatch(addClientAgencyDetails({
      _id: clientAgencyDetailsData?._id,
      clientAgencyName: clientAgencyName,
      pocName: pocName,
      pocEmail: pocEmail,
      pocContact: pocContact,
      pocDesignation: pocDesignation,
      officeAddress: {
        address: address,
        city: city,
        state: stateName,
        country: country,
        phone: phone,
        email: email,
        website: website,
        zipCode: zipCode,
        gst: gst,
        pan: pan,
      },
      poRecieved: poNumber && !clientAgencyDetailsData?.poRecieved?.map((po: any) => po.poNumber)?.includes(poNumber) ? 
        [...clientAgencyDetailsData?.poRecieved, {
          campaignCreationId: campaignDetails?._id,
          poNumber: poNumber,
          poDate: poDate,
          uploadedPO: poFiles.length > 0 ? poFiles[poFiles.length - 1].awsURL : "",
        }] : clientAgencyDetailsData?.poRecieved
    }));

    dispatch(createBillInvoice({
      campaignCreationId: campaignDetails?._id,
      campaignName: campaignDetails?.name,
      clientAgencyName: campaignDetails?.clientName,
      invoiceNumber: `PROOH/${campaignDetails?._id}`,
      invoiceDate: todayDate,
      clientConfirmation: campaignDetails?.clientApprovalImgs?.length > 0 ? "Mail Confirmation" : "mail confirmation",
      clientOrderDate: poDate,
      poNumber: poNumber,
      poDate: poDate,
      uploadedPO: billingStep === 1 && poFiles.length > 0 ? poFiles[poFiles.length - 1].awsURL : undefined,
      tableContent: {
        description: invoiceDescription,
        quantity: invoiceQuantity,
        amount: invoiceAmount,
        rate: invoiceAmount,
        hsnsac: ""
      },
      subTotalAmount: invoiceAmount,
      outPutGstPercent: 18,
      outPutGstAmount: invoiceAmount * 0.18,
      totalAmount: invoiceAmount * 1.18,
      currency: "INR",
      dashboardScreenshots: billingStep === 2 && updateScreenshots ? { [`${new Date().getTime()}`]: shots } : undefined
    }));
    setUpdateScreenshots(false);
  }

  const takeScreenShot = () => {
    setUpdateScreenshots(true);
    dispatch(takeDashboardScreenShotAction({
      url: `https://developmentplanning.vercel.app/campaignDashboard/${campaignDetails?._id}`,
      // url: `http://localhost:3000/campaignDashboard/${campaignDetails?._id}`,
      tabs: ["1", "2", "3", "4", "5"]
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
   if (errorAddClientAgencyDetails) {
    message.error("Error in adding client/agency details...")
   }
   if (errorBillInvoiceCreation) {
    message.error("Error in adding invoice details...")
   }
  },[errorAddClientAgencyDetails, errorBillInvoiceCreation]);

  useEffect(() => {
    if (successClientAgencyDetails) {
      message.success("Client/Agency Details Added Successfully...");
      dispatch({
        type: ADD_CLIENT_AGENCY_DETAILS_RESET
      });
    }
    if (successBillInvoiceCreation) {
      message.success("Invoice Details Added Successfully...");
      dispatch({
        type: CREATE_BILL_INVOICE_RESET
      });
    }

    if (successClientAgencyDetails && successClientAgencyDetails) {
      setBillingStep(billingStep + 1)
    }

    if (campaignDetails && !clientAgencyDetailsData) {
      dispatch(getClientAgencyDetails({clientAgencyName: campaignDetails?.clientName?.toUpperCase()}));
    }

    if (campaignDetails) {
      setInvoiceAmount(() => {
        return campaignDetails?.discount === 0 || campaignDetails?.discount === undefined
        ? Number(campaignDetails?.totalCampaignBudget)
        : Number(campaignDetails?.finalCampaignBudget)
      });
    }

    if (siteLevelData && siteLevelData.length > 0) {
      setPreviewSample(siteLevelData?.[0]);
    }
  },[dispatch, billingStep, campaignDetails, siteLevelData, clientAgencyDetailsData, successClientAgencyDetails, successBillInvoiceCreation]);
  
   useEffect(() => {

    if (billInvoiceDetailsData) {

      setPoNumber(billInvoiceDetailsData?.poNumber);
      setPoDate(billInvoiceDetailsData?.poDate);
      setInvoiceDescription(billInvoiceDetailsData.tableContent.description);
      setInvoiceCurrency(billInvoiceDetailsData.currency);
      setInvoiceQuantity(billInvoiceDetailsData.tableContent.quantity);
      setPOFiles([billInvoiceDetailsData.uploadedPO]);

      if (dashboardScreenshots.length === 0 && billInvoiceDetailsData?.dashboardScreenshots) {
        const screenshots: any = Object.entries({...billInvoiceDetailsData.dashboardScreenshots})?.[0]?.[1] || [];
        setDashboardScreenshots([...screenshots]);
      }
    }

    if (clientAgencyDetailsData) {
      setClientAgencyName(clientAgencyDetailsData?.clientAgencyName || "");
      setAddress(clientAgencyDetailsData?.officeAddress?.address || "");
      setCity(clientAgencyDetailsData?.officeAddress?.city || "");
      setStateName(clientAgencyDetailsData?.officeAddress?.state || "");
      setCountry(clientAgencyDetailsData?.officeAddress?.country || "");
      setPhone(clientAgencyDetailsData?.officeAddress?.phone || "");
      setEmail(clientAgencyDetailsData?.officeAddress?.email || "");
      setWebsite(clientAgencyDetailsData?.officeAddress?.website || "");
      setZipCode(clientAgencyDetailsData?.officeAddress?.zipCode || "");
      setGst(clientAgencyDetailsData?.officeAddress?.gst || "");
      setPan(clientAgencyDetailsData?.officeAddress?.pan || "");
      setPocName(clientAgencyDetailsData?.pocName || "");
      setPocEmail(clientAgencyDetailsData?.pocEmail || "");
      setPocContact(clientAgencyDetailsData?.pocContact || "");
      setPocDesignation(clientAgencyDetailsData?.pocDesignation || "");
    }
  },[billInvoiceDetailsData, clientAgencyDetailsData, dashboardScreenshots]);
    

  useEffect(() => {
    // if (billingStep === 2) {
    //   takeScreenShot();
    // }
    if (billingStep === 3) {
      setDisabledGenerate(false)
    }

    if (screenshots) {
      console.log("Snapshots taken...")
      setDashboardScreenshots([...screenshots.images])
    }

  },[dispatch, billingStep, screenshots]);
  useEffect(() => {
    if (billInvoiceDetailsData) {
      // message.info("Invoice generated, Download bill invoice...")
      // generateBillInvoice();
    }
  },[billInvoiceDetailsData, generateBillInvoice]);

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
                {billLoading && (
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
                <PrimaryButton
                  title="Generate"
                  action={generateBillInvoice}
                  height="h-8"
                  width="w-20"
                  textSize="text-[12px]"
                  rounded="rounded"
                  disabled={disabledGenerate}
                />
              </div>
              <i
                className="fi fi-br-cross text-[14px] cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
          <div className="w-1/2">
            <BillAndInvoiceSteppers
              setStep={(e: any) => {
              
                setBillingStep(e)
              }}
              steps={4}
              step={billingStep}
            />
          </div>
          {billingStep == 0 ? (
            <div>
              {loadingClientAgencyDetails || loadingBillInvoiceDetails && (
                <LoadingScreen />
              )}
              {clientAgencyDetailsData && (
                <BillingAndInvoiceEnterDetails
                  todayDate={todayDate}
                  poNumber={poNumber}
                  setPoNumber={setPoNumber}
                  clientAgencyName={clientAgencyName}
                  setClientAgencyName={setClientAgencyName}
                  setAddress={setAddress}
                  address={address}
                  city={city}
                  setCity={setCity}
                  setStateName={setStateName}
                  stateName={stateName}
                  setCountry={setCountry}
                  country={country}
                  phone={phone}
                  setPhone={setPhone}
                  email={email}
                  setEmail={setEmail}
                  website={website}
                  setWebsite={setWebsite}
                  zipCode={zipCode}
                  setZipCode={setZipCode}
                  gst={gst}
                  setGst={setGst}
                  pan={pan}
                  setPan={setPan}
                  pocName={pocName}
                  setPocName={setPocName}
                  pocEmail={pocEmail}
                  setPocEmail={setPocEmail}
                  pocContact={pocContact}
                  setPocContact={setPocContact}
                  setPocDesignation={setPocDesignation}
                  pocDesignation={pocDesignation}
                  campaignDetails={campaignDetails}
                  invoiceDescription={invoiceDescription}
                  setInvoiceDescription={setInvoiceDescription}
                  invoiceQuantity={invoiceQuantity}
                  setInvoiceQuantity={setInvoiceQuantity}
                  poDate={poDate}
                  setPoDate={setPoDate}
                  invoiceCurrency={invoiceCurrency}
                  setInvoiceCurrency={setInvoiceCurrency}
                  invoiceAmount={invoiceAmount}
                  setInvoiceAmount={setInvoiceAmount}
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
                  {poFiles?.length === 0 && (
                    <div className="col-span-1 flex items-center">
                      {[1]?.map((_: any, i: any) => (
                        <div key={i} className="w-full relative inline-block">
                          <div
                            className="w-20 h-20 object-cover rounded-lg shadow-md flex items-center justify-center">
                            <i className="fi fi-br-file-pdf flex items-center text-[36px] text-[#D7D7D7]"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {poFiles?.map((file: any, k: any) => (
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
              {loadingScreenshot && (
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
                          console.log(image?.split("/"));
                          setMagnifiedImage(image);
                          setMagnifiedImageView(!magnifiedImageView);
                        }} 
                        className="h-full border border-gray-100 rounded-[12px] shadow-md"
                        src={image?.split("/").includes("https:") ? image : `data:image/png;base64,${image}`}
                        alt="image"
                      />
                      <h1 className="p-1 text-[12px] truncate">{dashboardScreenshotName[i]}</h1>
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
              {Object.keys(previewSample).length > 0 && (
                <BillAndInvoiceMonitoringPicsSegment
                  previewSample={previewSample}
                  campaignDetails={campaignDetails}
                  currentDate={todayDate}
                />
              )}

            </div>
          ) : null}
        </div>
      )}

    </div>
  );
};
