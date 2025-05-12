import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { BillingAndInvoiceEnterDetails } from "./BillAndInvoiceEnterDetails";
import { PrimaryButton } from "../../components";
import { createBillInvoice } from "../../actions/billInvoiceAction";
import { addClientAgencyDetails } from "../../actions/clientAgencyAction";
import { generateBillAndInvoicePdf } from "../../utils/generatePdf";
import { BillAndInvoiceSteppers } from "./BillAndInvoiceSteppers";
import { takeDashboardScreenShotAction } from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";


export const BillingAndInvoice = (props: any) => {
  const dispatch = useDispatch<any>();
  const { 
    clientAgencyName,
    setClientAgencyName,
    setAddress,
    address,
    city,
    setCity,
    setStateName,
    stateName,
    setCountry,
    country,
    phone,
    setPhone,
    email,
    setEmail,
    website,
    setWebsite,
    zipCode,
    setZipCode,
    gst,
    setGst,
    pan,
    setPan,
    pocName,
    setPocName,
    pocEmail,
    setPocEmail,
    pocContact,
    setPocContact,
    pocDesignation,
    setPocDesignation,
    poNumber,
    setPoNumber,
    poDate,
    setPoDate,
    loading,
    onClose,
    jsonDataForInvoice, 
    setJsonDataForInvoice,
    campaignDetails,
    invoiceDescription,
    setInvoiceDescription,
    invoiceQuantity,
    setInvoiceQuantity,
    invoiceCurrency,
    setInvoiceCurrency,
    setInvoiceAmount,
    invoiceAmount
  } = props;

    const [billingStep, setBillingStep] = useState<any>(0);

    const todayDate = moment(new Date())?.format("YYYY-MM-DD hh:mm:ss");
  
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
      data: screenshot
    } = useSelector((state: any) => state.takeDashboardScreenShot)
  

    const generateBillInvoice = useCallback(() => {
      generateBillAndInvoicePdf({download: true, fileName: `INVOICE_${campaignDetails?.brandName}_${campaignDetails?.name}`, jsonData: jsonDataForInvoice });
    },[jsonDataForInvoice])

    const saveClientAgencyDetails = () => {
      
      dispatch(addClientAgencyDetails({
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
        poRecieved: poNumber && !clientAgencyDetailsData?.poRecieved?.map((po: any) => po.poNumber)?.includes(poNumber) ? clientAgencyDetailsData?.poRecieved.push({
          poNumber: poNumber,
          poDoc: ""
        }) : clientAgencyDetailsData?.poRecieved
      }));
  
      dispatch(createBillInvoice({
        campaignCreationId: campaignDetails?._id,
        invoiceNumber: `PROOH/${campaignDetails?._id}`,
        invoiceDate: todayDate,
        internalSoNumber: `PROOH/${campaignDetails?._id}/SO`,
        clientConfirmation: campaignDetails?.clientApprovalImgs?.length > 0 ? "Mail Confirmation" : "mail confirmation",
        clientOrderDate: poDate,
        poRecieved: {
          poNumber: poNumber,
          poDoc: "",
          poDate: poDate
        },
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
      }));
    }
  
  useEffect(() => {
    if (billInvoiceDetailsData) {
      generateBillInvoice();
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

  const takeScreenShot = () => {
    dispatch(takeDashboardScreenShotAction({
      url: `https://developmentplanning.vercel.app/campaignDashboard/${campaignDetails?._id}`,
      tabs: ["1", "2", "3", "4", "5"]
    }))
  }

  return (
    <div className="font-custom fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full overflow-auto max-h-auto "
        style={{ height: "90vh", width: "90vw" }}
      >
        <div className="flex justify-between items-center px-2">
          <h1 className="text-[16px] font-bold">Generate Invoice</h1>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-4">
              <PrimaryButton
                title="Save"
                action={saveClientAgencyDetails}
                height="h-8"
                width="w-20"
                textSize="text-[12px]"
                rounded="rounded"
              />
              <PrimaryButton
                title="Generate"
                action={generateBillInvoice}
                height="h-8"
                width="w-20"
                textSize="text-[12px]"
                rounded="rounded"
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
              if (e == 2) {
                takeScreenShot()
              }
              setBillingStep(e)
            }}
            steps={4}
            step={billingStep}
          />
        </div>
        {billingStep == 0 ? (
          <BillingAndInvoiceEnterDetails
            todayDate={todayDate}
            clientAgencyDetailsData={clientAgencyDetailsData}
            invoiceBill={campaignDetails}
            jsonDataForInvoice={jsonDataForInvoice}
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
            setJsonDataForInvoice={setJsonDataForInvoice}
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
        ) : billingStep === 1 ? (
          <div className="py-4 px-1">
            <div className="p-2">
              <h1 className="text-[14px] font-semibold pt-2">Screenshot Of Client Confirmation</h1>
              <p className="text-[12px] text-[#6F7F8E]">A verified proof of client approval showcasing our commitment to transparency</p>
              <div className="grid grid-cols-4 gap-2 py-4">
                {campaignDetails?.clientApprovalImgs?.map((img: any, i: number) => (
                  <div key={i} className="col-span-1 border border-gray-200 rounded-[12px] flex items-center justify-center">
                    <img className="rounded-[12px]" src={img} alt="Approved" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : billingStep === 2 ? (
          <div className="py-4 px-1">
            {/* <button

              type="button"
              onClick={takeScreenShot}
            >
              take screenshot
            </button> */}
            {loadingScreenshot && (
              <LoadingScreen />
            )}

            {screenshot && (
              <div className="grid grid-cols-3 gap-2 rounded-[12px] py-8">
                {screenshot.images?.map((image: any, i: number) => (
                  <img className="col-span-1 border rounded-[12px]" key={i} src={`data:image/png;base64,${image}`} alt="image" />
                ))}
              </div>
            )}
          </div>
        ) : billingStep === 3 ? (
          <div></div>
        ) : null}
        
      </div>
    </div>
  );
};
