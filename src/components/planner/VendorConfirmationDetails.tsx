import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { useEffect, useState } from "react";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getVendorConfirmationDetails,
  getVendorConfirmationStatusTableDetails,
} from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import {
  VendorConfirmationBasicTable,
  VendorConfirmationStatusTable,
} from "../../components/tables";
import { Footer } from "../../components/footer";
import { message } from "antd";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";

interface VendorConfirmationDetailsProps {
  setCurrentStep: any;
  step: any;
  campaignId?: any;
  userInfo?: any;
}

export const VendorConfirmationDetails = ({
  setCurrentStep,
  step,
  campaignId,
  userInfo,
}: VendorConfirmationDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [files, setFiles] = useState<any>([]);
  const [isDisabled, setIsDisabled] = useState<any>(true);

  const [selectedCampaignIds, setSelectedCampaignIds] = useState<any>([]);

  const [vendorInput, setVendorInput] = useState<any>({
    pageName: "View Final Plan Page",
    id: pathname.split("/").splice(-1)[0],
    name: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].name,
    brandName:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].brandName,
    clientName:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].clientName,
    campaignType:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].campaignType,
    startDate:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].startData,
    endDate: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].endDate,
    duration:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].duration,
    selectedType:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].selectedType,
    screenIds:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].screenIds,
    triggers:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId].triggers,
    // totalCampaignBudget: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalCampaignBudget,
  });

  const vendorConfirmationDetailsGet = useSelector(
    (state: any) => state.vendorConfirmationDetailsGet
  );
  const {
    loading: loadingVendorConfirmationData,
    error: errorVendorConfirmationData,
    data: vendorConfirmationData,
  } = vendorConfirmationDetailsGet;

  const vendorConfirmationStatusTableDetailsGet = useSelector(
    (state: any) => state.vendorConfirmationStatusTableDetailsGet
  );
  const {
    loading: loadingStatusTableData,
    error: errorStatusTableData,
    data: statusTableData,
  } = vendorConfirmationStatusTableDetailsGet;

  const campaignStatusChangeAfterVendorApproval = useSelector(
    (state: any) => state.campaignStatusChangeAfterVendorApproval
  );
  const {
    loading: loadingVendorApproval,
    error: errorVendorApproval,
    data: vendorApprovalStatus,
  } = campaignStatusChangeAfterVendorApproval;

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
    dispatch(
      getVendorConfirmationStatusTableDetails({
        id: pathname.split("/").splice(-1)[0],
      })
    );
  }, [dispatch, vendorInput, pathname]);

  const getAWSUrl = async (data: any) => {
    try {
      const aws = await getAWSUrlToUploadFile(data.fileType);
      const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
      data.awsURL = aws?.awsURL;
      return aws?.awsURL;
    } catch (error: any) {
      message.error(error);
    }
  };

  const handleSaveAndContinue = async () => {
    if (isDisabled) {
      message.error("Please confirm budget for your selected trigger");
    } else {
      let imageArr: string[] = [];
      for (let data of files) {
        let url = await getAWSUrl(data);
        imageArr.push(url);
      }
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Vendor Confirmation Page",
          id: pathname.split("/").splice(-1)[0],
          vendorApprovalImgs: imageArr, // return url array
        })
      );
      setCurrentStep(step + 1);
    }
  };

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
          <MultiColorLinearBar values={[2, 3, 4]} colors={[]} totalValue={9} />
        </div>
        <VendorConfirmationStatusTable
          selectedCampaignIds={selectedCampaignIds}
          setSelectedCampaignIds={setSelectedCampaignIds}
          campaignId={campaignId}
          userInfo={userInfo}
          statusTableData={statusTableData}
        />
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
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={handleSaveAndContinue}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};
