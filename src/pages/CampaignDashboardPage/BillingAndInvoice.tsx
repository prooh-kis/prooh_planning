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
import { getAllClientAgencyNames, getClientAgencyDetails } from "../../actions/clientAgencyAction";


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
    loading,
    onClose,
    bill 

  } = props;

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

  useEffect(() => {
    dispatch(getAllClientAgencyNames());
  }, [dispatch])

  useEffect(() => {
    if (clientAgencyNamesList) {
      setClientAgencyName(clientAgencyNamesList.clientAgencyName);
    }
    if (clientAgencyDetailsData) {

    }
  },[clientAgencyNamesList, setClientAgencyName, clientAgencyDetailsData])
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
                  action={() => {}}
                  height="h-8"
                  width="w-20"
                  textSize="text-[12px]"
                  rounded="rounded"
                />
                <PrimaryButton
                  title="Generate"
                  action={() => {}}
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
              <div className="py-2">
                <div className="block flex justify-between gap-2 items-center mb-2">
                  <label className="block text-secondaryText text-[14px]">
                    Enter PO Number
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
              <div className="grid grid-cols-12 gap-4 py-2">
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Enter GST No.
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
                      Enter PAN No.
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
              
              <div className="py-2 border-b"/>

              <div className="py-2">
                <div className="block flex justify-between gap-2 items-center mb-2">
                  <label className="block text-secondaryText text-[14px]">
                    Enter Client/Agency Name
                  </label>
                  <Tooltip title="Enter Client/Agency name for the campaign">
                    <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
                  </Tooltip>
                </div>
                <SearchableSelect
                  onChange={(value: any) => {
                    setClientAgencyName(value?.toUpperCase())
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
              <div className="py-2">
                <div className="block flex justify-between gap-2 items-center mb-2">
                  <label className="block text-secondaryText text-[14px]">
                    Enter Address
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
                      Enter City
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
                      Enter State
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
                      Enter Country
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
                      Enter Zip Code
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
                      Enter Phone
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
                      Enter Email
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
                      Enter Website
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

              <div className="grid grid-cols-12 py-2 gap-4">
                <div className="col-span-6 py-2">
                  <div className="block flex justify-between gap-2 items-center mb-2">
                    <label className="block text-secondaryText text-[14px]">
                      Enter POC Name
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
                      Enter POC Designation
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
                      Enter POC Phone
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
                      Enter POC Email
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
