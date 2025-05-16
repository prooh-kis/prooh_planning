import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { Tooltip } from "antd";
import { SearchableSelect } from "../../components/atoms/SearchableSelect";
import { getAllClientAgencyNames, getClientAgencyDetails } from "../../actions/clientAgencyAction";
import { getBillInvoiceDetails } from "../../actions/billInvoiceAction";
import { CalendarInput } from "../../components/atoms/CalendarInput";


export const BillingAndInvoiceEnterDetails = (props: any) => {
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
    campaignDetails,
    invoiceDescription,
    setInvoiceDescription,
    invoiceQuantity,
    setInvoiceQuantity,
    invoiceCurrency,
    setInvoiceCurrency,
  } = props;

  const allClientAgencyNamesListGet = useSelector((state: any) => state.allClientAgencyNamesListGet);
  const {
    loading: loadingClientAgencyNames,
    error: errorClientAgencyNames,
    data: clientAgencyNamesList,
  } = allClientAgencyNamesListGet;


  useEffect(() => {
    dispatch(getBillInvoiceDetails({campaignCreationId: campaignDetails?._id, invoiceId: campaignDetails?.invoiceId }))
    dispatch(getAllClientAgencyNames());
  }, [dispatch, campaignDetails]);

  return (
    <div className="py-4 px-1">
      {clientAgencyNamesList && (
        <div className="p-2">
          <h1 className="text-[14px] font-semibold pt-2">Enter Invoice Details</h1>
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
          
          <div className="py-2 border-b"/>
          <h1 className="text-[14px] font-semibold pt-4 pb-2">Enter Client/Agency Details</h1>
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
                console.log(value);
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
      )}

    </div>
  );
};
