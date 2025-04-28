import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getScreenDataUploadCreativeData } from "../../actions/screenAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { TabWithoutIcon } from "../../components";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { Tooltip } from "antd";
import { SearchableSelect } from "../../components/atoms/SearchableSelect";
import { addClientAgencyDetails, getAllClientAgencyNames, getClientAgencyDetails } from "../../actions/clientAgencyAction";
import { generateBillAndInvoicePdf } from "../../utils/generatePdf";
import { createBillInvoice, getBillInvoiceDetails } from "../../actions/billInvoiceAction";
import { CalendarInput } from "../../components/atoms/CalendarInput";


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

  const todayDate = moment(new Date())?.format("YYYY-MM-DD hh:mm:ss");
  const allClientAgencyNamesListGet = useSelector((state: any) => state.allClientAgencyNamesListGet);
  const {
    loading: loadingClientAgencyNames,
    error: errorClientAgencyNames,
    data: clientAgencyNamesList,
  } = allClientAgencyNamesListGet;

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


  const generateBillInvoice = useCallback(() => {
    generateBillAndInvoicePdf({download: true, fileName: `INVOICE_${campaignDetails?.brandName}_${campaignDetails?.name}`, jsonData: jsonDataForInvoice });
  },[jsonDataForInvoice])

  useEffect(() => {
    if (poNumber) {
      dispatch(getBillInvoiceDetails({campaignCreationId: campaignDetails?._id}))
    }
    dispatch(getAllClientAgencyNames());
  }, [dispatch]);

  useEffect(() => {
    if (clientAgencyNamesList) {
      setClientAgencyName(clientAgencyNamesList.clientAgencyName);
    }
    if (clientAgencyDetailsData) {
      setClientAgencyName(clientAgencyDetailsData?.clientAgencyName);
      setAddress(clientAgencyDetailsData?.officeAddress?.address);
      setCity(clientAgencyDetailsData?.officeAddress?.city);
      setStateName(clientAgencyDetailsData?.officeAddress?.state);
      setCountry(clientAgencyDetailsData?.officeAddress?.country);
      setPhone(clientAgencyDetailsData?.officeAddress?.phone);
      setEmail(clientAgencyDetailsData?.officeAddress?.email);
      setWebsite(clientAgencyDetailsData?.officeAddress?.website);
      setZipCode(clientAgencyDetailsData?.officeAddress?.zipCode);
      setGst(clientAgencyDetailsData?.officeAddress?.gst);
      setPan(clientAgencyDetailsData?.officeAddress?.pan);
      setPocName(clientAgencyDetailsData?.pocName);
      setPocEmail(clientAgencyDetailsData?.pocEmail);
      setPocContact(clientAgencyDetailsData?.pocContact);
      setPocDesignation(clientAgencyDetailsData?.pocDesignation);
      setJsonDataForInvoice({
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
        poNumber: `${poNumber}`,
        invoiceDescription: invoiceDescription,
        invoiceQuantity: invoiceQuantity,
        invoiceCurrency: invoiceCurrency,
        invoiceAmount: Number(invoiceAmount.toFixed(0)),
        subTotalAmount: Number(invoiceAmount.toFixed(0)) * 1.18,
        outPutGstPercent: 18,
        outPutGstAmount: Number(invoiceAmount.toFixed(0)) * 0.18,
        campaignName: `${campaignDetails?.name}, ${campaignDetails?.brandName}`,
        startDate: moment(campaignDetails?.startDate).format("YYYY-MM-DD"),
        endDate: moment(campaignDetails?.endDate).format("YYYY-MM-DD"),

      });
      setInvoiceAmount(() => {
        return campaignDetails?.discount === 0 || campaignDetails?.discount === undefined
        ? Number(campaignDetails?.totalCampaignBudget)
        : Number(campaignDetails?.finalCampaignBudget)
      });
    }
  },[clientAgencyNamesList, setClientAgencyName, clientAgencyDetailsData, setAddress, setCity, setStateName, setCountry, setPhone, setEmail, setWebsite, setZipCode, setGst, setPan, setPocName, setPocEmail, setPocContact, setPocDesignation, setJsonDataForInvoice, clientAgencyName, pocName, pocEmail, pocContact, pocDesignation, address, city, stateName, country, phone, email, website, zipCode, gst, pan, poNumber, campaignDetails, invoiceQuantity, invoiceDescription]);

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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full overflow-auto max-h-auto "
        style={{ height: "90vh", width: "90vw" }}
      >
        {loading ? (
          <div>
            <SkeletonLoader />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center ">
                <h1 className="text-[14px] font-bold">Generate Invoice</h1>
              </div>
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
                <i
                  className="fi fi-br-circle-xmark"
                  onClick={onClose}
                ></i>
              </div>
            </div>
            <div className="p-2 overflow-scroll-y no-scrollbar">
              <div className="grid grid-cols-12 gap-4 py-2">
                <div className="col-span-8 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Purchase Order Number
                    </label>
                    <Tooltip title="Enter Purchase Order number for the campaign that you received from your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter PO Number"
                    value={poNumber}
                    action={setPoNumber}
                  />
                </div>
                <div className="col-span-4 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Purchase Order Date
                    </label>
                    <Tooltip title="Enter Purchase Order date for the campaign that you received from your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <CalendarInput
                    placeholder="PO Date"
                    value={poDate}
                    action={setPoDate}
                    disabled={false}
                    minDate={campaignDetails?.startDate}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-4 py-2">
                <div className="col-span-8">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Description
                    </label>
                    <Tooltip title="Enter description for the campaign">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Description"
                    value={invoiceDescription}
                    action={setInvoiceDescription}
                  />
                </div>
                <div className="col-span-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Quantity
                    </label>
                    <Tooltip title="Enter quantity of items for the campaign">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Quantity"
                    value={invoiceQuantity}
                    action={setInvoiceQuantity}
                  />
                </div>
                <div className="col-span-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Currency
                    </label>
                    <Tooltip title="Enter currency of payment for the campaign">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <DropdownInput
                    placeHolder="Enter Currency"
                    selectedOption={invoiceCurrency}
                    setSelectedOption={setInvoiceCurrency}
                    options={[{
                      label: "INR",
                      value: "INR"
                    },{
                      label: "USD",
                      value: "USD"
                    }]}
                    height="h-[48px]"
                  />
                </div>
              </div> 
              
              <div className="py-2 border-b"/>
              <h1 className="text-[14px] font-semibold pt-4">Enter Client/Agency Details</h1>
              <div className="py-2">
                <div className="block flex justify-between gap-2 items-center mb-2">
                  <label className="block text-secondaryText text-[14px]">
                    Client/Agency Name
                  </label>
                  <Tooltip title="Enter Client/Agency name for the campaign">
                    <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                  </Tooltip>
                </div>
                <SearchableSelect
                  onChange={(value: any) => {
                    setClientAgencyName(value?.toUpperCase());
                    dispatch(getClientAgencyDetails({clientAgencyName: value?.toUpperCase()}));
                  }}
                  options={clientAgencyNamesList?.map(
                    (value: any) => {
                      return { label: value.clientAgencyName, value: value.clientAgencyName };
                    }
                  )}
                  placeholder="Search by Client/Agency Name"
                  value={clientAgencyName}
                />
              </div>
              <div className="grid grid-cols-12 gap-4 py-2">
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      GST No.
                    </label>
                    <Tooltip title="Enter GST number of client/agency you recieved on purchase Order number for the campaign">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter GST Number"
                    value={gst}
                    action={setGst}
                  />
                </div>
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      PAN No.
                    </label>
                    <Tooltip title="Enter PAN number of client/agency you recieved on purchase Order number for the campaign">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter PAN Number"
                    value={pan}
                    action={setPan}
                  />
                </div>
              </div> 
              <div className="py-2">
                <div className="block flex justify-between gap-2 items-center mb-2">
                  <label className="block text-secondaryText text-[14px]">
                    Full Address
                  </label>
                  <Tooltip title="Enter office address for your client/agency">
                    <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                  </Tooltip>
                </div>
                <PrimaryInput
                  inputType="text"
                  placeholder="Enter Office Address"
                  value={address}
                  action={setAddress}
                />
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      City
                    </label>
                    <Tooltip title="Enter city of the office of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter City Name"
                    value={city}
                    action={setCity}
                  />
                </div>
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      State
                    </label>
                    <Tooltip title="Enter Purchase Order number for the campaign that you received from your client">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter State Name"
                    value={stateName}
                    action={setStateName}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Country
                    </label>
                    <Tooltip title="Enter country name of the office address of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Country Name"
                    value={country}
                    action={setCountry}
                  />
                </div>
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Postal/Zip Code
                    </label>
                    <Tooltip title="Enter postal/zip code for the office address of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter ZIP/Postal Code"
                    value={zipCode}
                    action={setZipCode}
                  />
                </div>
              </div>   
              <div className="grid grid-cols-12 gap-4 py-2">
                <div className="col-span-4 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Phone
                    </label>
                    <Tooltip title="Enter phone number of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    action={setPhone}
                  />
                </div>
                <div className="col-span-4 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Email
                    </label>
                    <Tooltip title="Enter email address of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Email Address"
                    value={email}
                    action={setEmail}
                  />
                </div>
                <div className="col-span-4 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Website
                    </label>
                    <Tooltip title="Enter Purchase Order number for the campaign that you received from your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Website"
                    value={website}
                    action={setWebsite}
                  />
                </div>
              </div> 

              <div className="py-2 border-b" />
              <h1 className="text-[14px] font-semibold pt-4">Enter Client/Agency POC Details</h1>
              <div className="grid grid-cols-12 py-2 gap-4">
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Name
                    </label>
                    <Tooltip title="Enter point of contact name of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter POC name"
                    value={pocName}
                    action={setPocName}
                  />
                </div>
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Designation
                    </label>
                    <Tooltip title="Enter Purchase Order number for the campaign that you received from your client">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter POC Designation"
                    value={pocDesignation}
                    action={setPocDesignation}
                  />
                </div>
              </div>   
              <div className="grid grid-cols-12 py-2 gap-4">
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Phone
                    </label>
                    <Tooltip title="Enter point of contact's contact details of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter Phone Number"
                    value={pocContact}
                    action={setPocContact}
                  />
                </div>
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Email
                    </label>
                    <Tooltip title="Enter point of contact's email address of your client/agency">
                      <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                    </Tooltip>
                  </div>
                  <PrimaryInput
                    inputType="text"
                    placeholder="Enter email address"
                    value={pocEmail}
                    action={setPocEmail}
                  />
                </div>
              </div>   
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
