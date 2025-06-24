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

  const {
    setInvoiceAmount,
    invoiceAmount,
    setInvoiceDescription,
    invoiceDescription,
    setInvoiceQuantity,
    invoiceQuantity,
    setInvoiceCurrency,
    invoiceCurrency,
    setPoDate,
    poDate,
    setPoNumber,
    poNumber,
  } = props;

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


  },[billInvoiceDetailsData, setInvoiceCurrency, setInvoiceDescription, setInvoiceQuantity, setPoDate, setPoNumber]);
    
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

  const saveClickHandlerInvoiceDetails = () => {

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
              <div className="w-full py-2">
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
              <div className="grid grid-cols-4 gap-4 py-2">
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
        </div>
      )}

    </div>
  );
};
