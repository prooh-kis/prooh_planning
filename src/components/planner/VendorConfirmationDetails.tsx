import { VendorConfirmationAdvancedTable } from "../../components/tables/VendorConfirmationAdvancedTable";
import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { VendorConfirmationBasicTable } from "../../components/tables/VendorConfirmationBasicTable";
import { useEffect, useState } from "react";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getVendorConfirmationDetails } from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { CAMPAIGN, SCREEN_SUMMARY_TABLE_DATA, SELECTED_AUDIENCE_TOUCHPOINTS, SELECTED_SCREENS_ID, SELECTED_TRIGGER } from "../../constants/localStorageConstants";
import { useSelector } from "react-redux";

interface VendorConfirmationDetailsProps {
  setCurrentStep: any;
  step: any;
}

export const VendorConfirmationDetails = ({
  setCurrentStep,
  step,
}: VendorConfirmationDetailsProps) => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [files, setFiles] = useState<any>([]);
  const [vendorInput, setVendorInput] = useState<any>({
    pageName: "View Final Plan Page",
    id: pathname.split("/").splice(-1)[0],
    name: getDataFromLocalStorage(CAMPAIGN).basicDetails.campaignName,
    brandName: getDataFromLocalStorage(CAMPAIGN).basicDetails.brandName,
    clientName: getDataFromLocalStorage(CAMPAIGN).basicDetails.clientName,
    campaignType: getDataFromLocalStorage(CAMPAIGN).basicDetails.campaignType,
    startDate: getDataFromLocalStorage(CAMPAIGN).basicDetails.startData,
    endDate: getDataFromLocalStorage(CAMPAIGN).basicDetails.endDate,
    duration: getDataFromLocalStorage(CAMPAIGN).basicDetails.duration,
    selectedType: getDataFromLocalStorage(CAMPAIGN).basicDetails.regularVsCohort,
    screenIds: getDataFromLocalStorage(SELECTED_SCREENS_ID),
    triggers: getDataFromLocalStorage(SELECTED_TRIGGER),
    totalCampaignBudget: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalCampaignBudget,
  });

  const vendorConfirmationDetailsGet = useSelector((state: any) => state.vendorConfirmationDetailsGet);
  const {
    loading: loadingVendorConfirmationData,
    error: errorVendorConfirmationData,
    data: vendorConfirmationData,
  } = vendorConfirmationDetailsGet;

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

  useEffect(() => {
    dispatch(getVendorConfirmationDetails(vendorInput));
  },[dispatch, vendorInput]);

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
        <div>
          <div className="flex gap-2 items-center justify-end text-red-500">
            <i className="fi fi-br-clock-three flex items-center"></i>
            <h1 className="text-[14px] font-semibold">00.30</h1>
          </div>
          <p className="text-[12px] text-gray-400">Time Remaining</p>

        </div>
      </div>
      
      <VendorConfirmationBasicTable 
        vendorConfirmationData={vendorConfirmationData}
      />

      <div className="py-4 w-full">
        <div className="flex gap-4">
          <div className="flex">
            <h1 className="text-[14px]">Approved (08)</h1>
          </div>
          <div className="flex">
            <h1 className="text-[14px]">Pending (08)</h1>
          </div>
          <div className="flex">
            <h1 className="text-[14px]">Rejected (08)</h1>
          </div>
        </div>
        <div className="pb-4">
          <MultiColorLinearBar
            values={[2, 3, 4]}
            colors={[]}
            totalValue={9}
          />
        </div>
        <VendorConfirmationAdvancedTable />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 border rounded-[12px] p-2">
          <EmailSendBox />
        </div>
        <div className="col-span-1 border rounded-[12px] p-2">
          <EmailConfirmationImage
            files={files}
            handleAddNewFile={handleAddNewFile}
            removeImage={removeImage}
          />
        </div>
      </div>
      
    </div>
  )
}