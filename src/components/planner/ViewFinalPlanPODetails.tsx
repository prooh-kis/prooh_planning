import { useEffect, useRef, useState } from "react";
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
import {
  CAMPAIGN,
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_TABLE_DATA,
  SELECTED_AUDIENCE_TOUCHPOINTS,
  SELECTED_SCREENS_ID,
  SELECTED_TRIGGER,
} from "../../constants/localStorageConstants";
import { formatNumber } from "../../utils/formatValue";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  generatePdfFromJSON,
  generatePdfFromWebPage,
} from "../../utils/generatePdf";

interface ViewFinalPlanPODetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  marketRef?: any;
  audienceRef?: any;
  touchpointRef?: any;
  locationProximityRef?: any;
  poiProximityRef?: any;
  mapViewRef?: any;
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
  marketRef,
  audienceRef,
  touchpointRef,
  locationProximityRef,
  poiProximityRef,
  mapViewRef,
}: ViewFinalPlanPODetailsProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const [files, setFiles] = useState<any>([]);
  const [toEmail, setToEmail] = useState<any>("");
  const [cc, setCC] = useState<any>(userInfo?.email);

  const [pageRefs, setPageRefs] = useState<any>([]);

  const [pdfDownload, setPdfDownload] = useState<any>({});

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
    selectedType:
      getDataFromLocalStorage(CAMPAIGN).basicDetails.regularVsCohort,
    gender: getDataFromLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS).gender,
    totalImpression:
      getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.["total"]
        ?.totalImpression ||
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN).totalImpression,
    totalReach:
      getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.["total"]
        ?.totalReach || getDataFromLocalStorage(FULL_CAMPAIGN_PLAN).totalReach,
    screenIds:
      getDataFromLocalStorage(SELECTED_SCREENS_ID) ||
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN).screenIds,
    totalCpm:
      getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.["total"]?.totalCpm ||
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN).totalCpm,
    triggers:
      getDataFromLocalStorage(SELECTED_TRIGGER) ||
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN).selectedTriggers,
    totalCampaignBudget:
      getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.["total"]
        ?.totalCampaignBudget ||
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN).totalCampaignBudget,
    cohorts:
      getDataFromLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS)?.cohorts ||
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN).cohorts,
  });

  const finalPlanPOTableDataGet = useSelector(
    (state: any) => state.finalPlanPOTableDataGet
  );
  const {
    loading: loadingPOData,
    error: errorPOData,
    data: poTableData,
  } = finalPlanPOTableDataGet;

  const sendEmail = () => {};

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

  const handleSaveAndContinue = () => {
    dispatch(
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "View Final Plan Page",
          id: pathname.split("/").splice(-1)[0],
          clientApprovalImgs: [],
        })
      )
    );

    setCurrentStep(step + 1);
  };

  useEffect(() => {
    dispatch(getFinalPlanPOTableData(poInput));
  }, [dispatch, poInput]);

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-2xl font-semibold">View Final Plan & Share</h1>
        <h1 className="text-sm text-gray-500 ">
          Any specific route you want to cover in this campaign
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div
          ref={pageRef}
          className="col-span-1 mt-4 px-8 py-4 border border-1 border-#C3C3C3 rounded-2xl w-full"
        >
          <h1 className="font-semibold py-2	">Client Information</h1>
          <MyDiv left={"Client Name"} right={poTableData?.clientName} />
          <MyDiv left={"Brand Name"} right={poTableData?.brandName} />
          <Divider />
          <h1 className="font-semibold py-2	">Campaign Details</h1>
          <MyDiv left={"Campaign Name"} right={poTableData?.name} />
          <MyDiv
            left={"Campaign Type"}
            right={`${poTableData?.campaignType} Campaign`}
          />
          <MyDiv
            left={"Start Date"}
            right={new Date(poTableData?.startDate).toUTCString()}
          />
          <MyDiv
            left={"End Date"}
            right={new Date(poTableData?.endDate).toUTCString()}
          />
          <MyDiv left={"Duration"} right={`${poTableData?.duration} Days`} />
          <Divider />
          <h1 className="font-semibold py-2	">Performance Metrics</h1>
          <MyDiv
            left={"audience impression"}
            right={Number(poTableData?.totalImpression).toFixed(0)}
          />
          <MyDiv left={"Total screens"} right={poTableData?.screens} />
          <MyDiv
            left={"Reach"}
            right={Number(poTableData?.totalReach).toFixed(0)}
          />
          <MyDiv
            left={"TG%"}
            right={`${Number(poTableData?.tgPercent).toFixed(1)} %`}
          />
          <MyDiv
            left={"CPM"}
            right={`${String.fromCharCode(8377)} ${Number(
              poTableData?.totalCpm
            ).toFixed(2)}`}
          />
          <MyDiv
            left={"Selected Triggers"}
            right={
              poTableData?.trigger === "weatherTriggers"
                ? "Weather Trigger"
                : poTableData?.trigger === "sportsTriggers"
                ? "Sports Trigger"
                : poTableData?.trigger === "vacantSlots"
                ? "Fill Vacancy"
                : "None"
            }
          />
          <Divider />
          <div className="flex font-semibold ">
            <h1 className="text-left basis-1/2">Total Cost</h1>
            <h1 className="text-left basis-1/2">
              &#8377; {formatNumber(Number(poTableData?.totalCampaignBudget))}
            </h1>
          </div>
        </div>
        <div
          ref={pageRef}
          className="col-span-1 mt-4 p-8 border border-1 border-#C3C3C3 rounded-2xl w-full"
        >
          <h1 className="font-semibold text-lg">
            1.Download or share your campaign plan{" "}
          </h1>
          <div className="flex gap-6 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-[14px] truncate">Approach</h1>
              <input
                title="approach"
                type="checkbox"
                onChange={() => {
                  const pdfToDownload = pdfDownload;
                  pdfToDownload["approach"] = {
                    heading: "PLAN APPROACH",
                    pageRefs: [
                      marketRef,
                      audienceRef,
                      touchpointRef,
                      locationProximityRef,
                      poiProximityRef,
                      mapViewRef,
                    ],
                    fileName: `${poInput?.name}_Approach`,
                  };
                  setPdfDownload(pdfToDownload);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[14px] truncate">Plan summary</h1>
              <input
                title="plan-summary"
                type="checkbox"
                onChange={() => {
                  const pdfToDownload = pdfDownload;
                  pdfToDownload["plan-summary"] = {
                    heading: "PLAN SUMMARY",
                    pageRefs: [],
                    fileName: `${poInput?.name}_Plan_Summary`,
                  };
                  setPdfDownload(pdfToDownload);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[14px] truncate">Screen Picture</h1>
              <input
                title="screen-pictures"
                type="checkbox"
                onChange={() => {
                  const pdfToDownload = pdfDownload;
                  pdfToDownload["screen-pictures"] = {
                    heading: "SCREEN PICTURES",
                    pageRefs: [],
                    fileName: `${poInput?.name}_Screen_Pictures`,
                  };
                  setPdfDownload(pdfToDownload);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[14px] truncate">Creative ratio</h1>
              <input
                title="creative-ratio"
                type="checkbox"
                onChange={() => {
                  const pdfToDownload = pdfDownload;
                  pdfToDownload["creative-ratio"] = {
                    heading: "CREATIVE RATIO",
                    pageRefs: [],
                    fileName: `${poInput?.name}_Creative_Ratio`,
                  };
                  setPdfDownload(pdfToDownload);
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-8 py-2 border border-1 border-[#52ACFF] text-[#0094FF] rounded-full text-gray-500 text-sm"
            onClick={() => {
              Object.keys(pdfDownload)?.map(async (pdf: any) => {
                console.log(pdf);
                console.log(pdfDownload);
                console.log(pdfDownload[pdf]);
                //   generatePdfFromJSON({ jsonData: pdfDownload[pdf].jsonData , fileName: pdfDownload[pdf].fileName });
                await generatePdfFromWebPage({
                  pageRefs: pdfDownload[pdf]?.pageRefs,
                  fileName: pdfDownload[pdf].fileName,
                  heading: pdfDownload[pdf].heading,
                });
              });
            }}
          >
            Download
          </button>
          <Divider />
          <EmailSendBox
            toEmail={toEmail}
            setToEmail={setToEmail}
            sendEmail={sendEmail}
          />
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
          handleSave={handleSaveAndContinue}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};
