import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { message, Tooltip } from "antd";
import { SearchableSelect } from "../../components/atoms/SearchableSelect";
import { addClientAgencyDetails, getAllClientAgencyNames, getClientAgencyDetails } from "../../actions/clientAgencyAction";
import { createBillInvoice, getBillInvoiceDetails } from "../../actions/billInvoiceAction";
import { CalendarInput } from "../../components/atoms/CalendarInput";
import moment from "moment";
import { ADD_CLIENT_AGENCY_DETAILS_RESET } from "../../constants/clientAgencyConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";


export const BillingAndInvoiceEnterDetails = (props: any) => {
  const dispatch = useDispatch<any>();
  const { 
    campaignDetails,
    clientAgencyDetailsData,
    billInvoiceDetailsData,
    poFiles,
  } = props;
    const todayDate = moment(new Date())?.format("YYYY-MM-DD hh:mm:ss");

    const [open, setOpen] = useState<any>({
      1: false,
      2: false,
      3: false,
    })
    
    // po data
    const [poNumber, setPoNumber] = useState<string>("");
    const [poDate, setPoDate] = useState<string>("");
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

  const allClientAgencyNamesListGet = useSelector((state: any) => state.allClientAgencyNamesListGet);
  const {
    loading: loadingClientAgencyNames,
    error: errorClientAgencyNames,
    data: clientAgencyNamesList,
  } = allClientAgencyNamesListGet;

  const {
    loading: loadingAddClientAgencyDetails,
    error: errorAddClientAgencyDetails,
    success: successAddClientAgencyDetails,
  } = useSelector((state: any) => state.clientAgencyDetailsAdd);


  useEffect(() => {

    if (billInvoiceDetailsData) {
      setPoNumber(billInvoiceDetailsData?.poNumber);
      setPoDate(billInvoiceDetailsData?.poDate);
      setInvoiceDescription(billInvoiceDetailsData?.tableContent?.[0]?.description);
      setInvoiceCurrency(billInvoiceDetailsData?.currency);
      setInvoiceQuantity(billInvoiceDetailsData?.tableContent?.[0]?.quantity);
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
  },[billInvoiceDetailsData, clientAgencyDetailsData]);
    
  useEffect(() => {
      if (campaignDetails) {
        setInvoiceAmount(() => {
          return campaignDetails?.discount === 0 || campaignDetails?.discount === undefined
          ? Number(campaignDetails?.totalCampaignBudget)
          : Number(campaignDetails?.finalCampaignBudget)
        });
      }

    },[campaignDetails]);
    
  useEffect(() => {
    if (errorAddClientAgencyDetails) {
    message.error("Error in adding client/agency details...")
    }
    if (successAddClientAgencyDetails) {
      message.success("Client/Agency Details Added Successfully...");

      dispatch({
        type: ADD_CLIENT_AGENCY_DETAILS_RESET
      });
      dispatch(getClientAgencyDetails({
        clientAgencyName: campaignDetails?.clientName?.toUpperCase()
      }));
    }
  },[dispatch, errorAddClientAgencyDetails, campaignDetails, successAddClientAgencyDetails]);

  useEffect(() => {
    dispatch(getAllClientAgencyNames());
  }, [dispatch]);

  const saveClickHandlerClientDetails = () => {
    if (!poNumber) {
      message.info("You have not entered PO Number for this invoice, please take a look...");
      return;
    }

    dispatch(addClientAgencyDetails({
      _id: clientAgencyDetailsData?._id,
      clientAgencyName,
      pocName,
      pocEmail,
      pocContact,
      pocDesignation,
      officeAddress: {
        address,
        city,
        state: stateName,
        country,
        phone,
        email,
        website,
        zipCode,
        gst,
        pan,
      },
      poRecieved: poNumber && !clientAgencyDetailsData?.poRecieved?.map((po: any) => po.poNumber)?.includes(poNumber) 
        ? [...(clientAgencyDetailsData?.poRecieved || []), {
            campaignCreationId: campaignDetails?._id,
            poNumber: poNumber,
            poDate: poDate,
            uploadedPO: poFiles?.length > 0 ? poFiles[poFiles?.length - 1].awsURL : "",
          }]
        : clientAgencyDetailsData?.poRecieved
    }));
  };

  const saveClickHandlerInvoiceDetails = () => {
    if (!poNumber) {
      message.info("You have not entered PO Number for this invoice, please take a look...");
      return;
    }
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
    }));
  };

  return (
    <div className="py-4 px-1">
      {loadingAddClientAgencyDetails || loadingClientAgencyNames && (
        <LoadingScreen />
      ) }
      {clientAgencyNamesList && (
        <div className="p-2">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-[14px] font-semibold pt-2">Enter Invoice Details</h1>
              <i className="fi fi-br-check text-[#22C55E] flex items-center justify-center cursor-pointer" onClick={saveClickHandlerInvoiceDetails}></i>
            </div>
            <div>
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
                    placeholder={poNumber || "Enter PO Number"}
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
                    placeholder={poDate || "PO Date"}
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
                    placeholder={invoiceDescription || "Enter Description"}
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
                    placeholder={invoiceQuantity || "Enter Quantity"}
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
                    placeHolder={invoiceCurrency || "Enter Currency"}
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
            </div>
          </div>
          <div className="pb-2 mt-2 border-t">
            <div className="flex items-center justify-between">
              <h1 className="text-[14px] font-semibold pt-4 pb-2">Enter Client/Agency Details</h1>
              <i className="fi fi-br-check text-[#22C55E] flex items-center justify-center cursor-pointer" onClick={saveClickHandlerClientDetails}></i>
            </div>
            <div>
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
                  placeholder={clientAgencyName || "Search by Client/Agency Name"}
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
                    placeholder={"Enter GST Number"}
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
                    placeholder={pan || "Enter PAN Number"}
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
                  placeholder={address || "Enter Office Address"}
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
                    placeholder={city || "Enter City Name"}
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
                    placeholder={stateName || "Enter State Name"}
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
                    placeholder={country || "Enter Country Name"}
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
                    placeholder={zipCode || "Enter ZIP/Postal Code"}
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
                    placeholder={phone || "Enter Phone Number"}
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
                    placeholder={email || "Enter Email Address"}
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
                    placeholder={website || "Enter Website"}
                    value={website}
                    action={setWebsite}
                  />
                </div>
              </div> 
            </div>
          </div>

          <div className="py-2 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-[14px] font-semibold pt-4">Enter Client/Agency POC Details</h1>
              <i className="fi fi-br-check text-[#22C55E] flex items-center justify-center cursor-pointer" onClick={saveClickHandlerClientDetails}></i>
            </div>
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
                  placeholder={"Enter POC name"}
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
                  placeholder={"Enter POC Designation"}
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
                  placeholder={"Enter Phone Number"}
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
                  placeholder={"Enter email address"}
                  value={pocEmail}
                  action={setPocEmail}
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
