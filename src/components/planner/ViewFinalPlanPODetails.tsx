import { useEffect, useState } from "react";
import { FileUploadButton } from "../FileUploadButton";
import { ImageViewCloseButton } from "../molecules/ImageViewCloseButton";
import { Divider } from "antd";
import { Footer } from "../../components/footer";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { useDispatch, useSelector } from "react-redux";
import { getFinalPlanPOTableData } from "../../actions/screenAction";
import { useLocation } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { CAMPAIGN, SCREEN_SUMMARY_TABLE_DATA, SELECTED_AUDIENCE_TOUCHPOINTS, SELECTED_SCREENS_ID, SELECTED_TRIGGER } from "../../constants/localStorageConstants";
import { formatNumber } from "../../utils/formatValue";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";

interface ViewFinalPlanPODetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
}

function MyDiv({ left, right }: any) {
  return (
    <div className="flex font-normal text-[#2B2B2B]">
      <h1 className="text-left text-[14px] basis-1/2">{left}</h1>
      <h1 className="text-left text-[14px] basis-1/2">{right}</h1>
    </div>
  );
}

export const ViewFinalPlanPODetails = ({
  setCurrentStep,
  step,
}: ViewFinalPlanPODetailsProps) => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [files, setFiles] = useState<any>([]);
  const [poInput, setPoInput] = useState<any>({
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
    gender: getDataFromLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS).gender,
    totalImpression: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalImpression,
    totalReach: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalReach,
    screenIds: getDataFromLocalStorage(SELECTED_SCREENS_ID),
    totalCpm: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalCpm,
    triggers: getDataFromLocalStorage(SELECTED_TRIGGER),
    totalCampaignBudget: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalCampaignBudget,
    cohorts: getDataFromLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS).cohorts,
  });

  const finalPlanPOTableDataGet = useSelector((state: any) => state.finalPlanPOTableDataGet);
  const {
    loading: loadingPOData,
    error: errorPOData,
    data: poTableData
  } = finalPlanPOTableDataGet;

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
    dispatch(getFinalPlanPOTableData(poInput));
  },[dispatch, poInput]);

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-2xl font-semibold">View Final Plan & Share</h1>
        <h1 className="text-sm text-gray-500 ">
          Any specific route you want to cover in this campaign
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 mt-4 px-8 py-4 border border-1 border-#C3C3C3 rounded-2xl w-full">
          <h1 className="font-semibold py-2	">Client Information</h1>
          <MyDiv left={"Client Name"} right={poTableData?.clientName} />
          <MyDiv left={"Brand Name"} right={poTableData?.brandName} />
          <Divider />
          <h1 className="font-semibold py-2	">Campaign Details</h1>
          <MyDiv left={"Campaign Name"} right={poTableData?.name} />
          <MyDiv left={"Campaign Type"} right={`${poTableData?.campaignType} Campaign`} />
          <MyDiv left={"Start Date"} right={new Date(poTableData?.startDate).toUTCString()} />
          <MyDiv left={"End Date"} right={new Date(poTableData?.endDate).toUTCString()} />
          <MyDiv left={"Duration"} right={`${poTableData?.duration} Days`}/>
          <Divider />
          <h1 className="font-semibold py-2	">Performance Metrics</h1>
          <MyDiv left={"audience impression"} right={Number(poTableData?.totalImpression).toFixed(0)} />
          <MyDiv left={"Total screens"} right={poTableData?.screens} />
          <MyDiv left={"Reach"} right={Number(poTableData?.totalReach).toFixed(0)} />
          <MyDiv left={"TG%"} right={`${Number(poTableData?.tgPercent).toFixed(1)} %`} />
          <MyDiv left={"CPM"} right={`${String.fromCharCode(8377)} ${Number(poTableData?.totalCpm).toFixed(2)}`} />
          <MyDiv left={"Selected Triggers"} right={
            poTableData?.trigger === "weatherTriggers" ? "Weather Trigger" : 
            poTableData?.trigger === "sportsTriggers" ? "Sports Trigger" :
            poTableData?.trigger === "vacantSlots" ? "Fill Vacancy" : "None"
            } />
          <Divider />
          <div className="flex font-semibold ">
            <h1 className="text-left basis-1/2">Total Cost</h1>
            <h1 className="text-left basis-1/2">&#8377; {formatNumber(Number(poTableData?.totalCampaignBudget))}</h1>
          </div>
        </div>
        <div className="col-span-1 mt-4 p-8 border border-1 border-#C3C3C3 rounded-2xl w-full">
          <h1 className="font-semibold text-lg">
            1.Download or share your campaign plan{" "}
          </h1>
          <div className="flex gap-4 py-4">
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Approach</h1>
              <input title="approach" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Plan summary</h1>
              <input title="plan-summary" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Screen Picture</h1>
              <input title="screen-pictures" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Creative ratio</h1>
              <input title="creative-ratio" type="checkbox" />
            </div>
          </div>
          <button type="submit" className="px-8 py-2 border border-1 border-[#52ACFF] text-[#0094FF] rounded-full text-gray-500 text-sm">
            Download
          </button>
          <Divider />
          <EmailSendBox />
          <Divider />
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
          handleSave={() => {
            dispatch(addDetailsToCreateCampaign({
              pageName: "Vendor Confirmation Page",
              id: pathname.split("/").splice(-1)[0],
              vendorApprovalImgs: [],
            }));
            setCurrentStep(step + 1);
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};
