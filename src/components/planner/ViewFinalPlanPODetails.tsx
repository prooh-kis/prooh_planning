import { useEffect, useRef, useState } from "react";
import { Divider, message } from "antd";
import { Footer } from "../../components/footer";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getFinalPlanPOTableData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import { useLocation } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import {
  COST_SUMMARY,
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_TABLE_DATA,
} from "../../constants/localStorageConstants";
import { formatNumber } from "../../utils/formatValue";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";

import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import {
  generateCreativeRatioPdfFromJSON,
  generatePlanApproachPdfFromJSON,
  generatePlanSummaryPdfFromJSON,
  generateScreenPicturesPptFromJSON,
} from "../../utils/generatePdf";
import { sendEmailForConfirmation } from "../../actions/userAction";

interface ViewFinalPlanPODetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
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
  campaignId,
}: ViewFinalPlanPODetailsProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const [files, setFiles] = useState<any>([]);
  const [toEmail, setToEmail] = useState<any>("");
  const [cc, setCC] = useState<any>(userInfo?.email);
  const [blobData, setBlobData] = useState<any>([]);

  const [pageRefs, setPageRefs] = useState<any>([]);

  const [pdfDownload, setPdfDownload] = useState<any>({});

  const [poInput, setPoInput] = useState<any>({
    pageName: "View Final Plan Page",
    id: pathname.split("/").splice(-1)[0],
    name: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.name,
    brandName:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.brandName,
    clientName:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.clientName,
    campaignType:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.campaignType,
    startDate:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.startData,
    endDate: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.endDate,
    duration:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
    selectedType:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType,
    gender: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender,
    screenIds:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds,

    totalImpression:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
        ?.totalImpression,
    totalReach:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.totalReach,
    totalCpm:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.totalCpm,
    triggers:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
        ?.selectedTriggers,
    totalCampaignBudget:
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
        ?.totalCampaignBudget,
    cohorts: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts,
  });

  const finalPlanPOTableDataGet = useSelector(
    (state: any) => state.finalPlanPOTableDataGet
  );
  const {
    loading: loadingPOData,
    error: errorPOData,
    data: poTableData,
  } = finalPlanPOTableDataGet;

  const emailSendForConfirmation = useSelector(
    (state: any) => state.emailSendForConfirmation
  );
  const {
    loading: loadingSendEmail,
    error: errorSendEmail,
    data: sendEmailData,
  } = emailSendForConfirmation;

  const sendEmail = () => {
    const formData = new FormData();
    blobData.forEach(({ newBlob, fileName }: any) => {
      if (newBlob instanceof Blob) {
        // Ensure blob is a valid Blob
        formData.append("files", newBlob, fileName); // Append each blob with its name
      } else {
        console.error("Invalid blob for file:", fileName);
      }
    });
    formData.append("toEmail", toEmail);
    formData.append("cc", cc);

    dispatch(sendEmailForConfirmation(formData));
  };

  const handleBlob = (pdf: any) => {
    let newBlob: any = null;
    // Generate the blob based on the pdf type
    if (pdf === "approach") {
      newBlob = generatePlanApproachPdfFromJSON({
        download: false,
        jsonData: pdfDownload[pdf].pdfData,
        fileName: pdfDownload[pdf].fileName,
        heading: pdfDownload[pdf].heading,
      });
    }
    if (pdf === "plan-summary") {
      newBlob = generatePlanSummaryPdfFromJSON({
        download: false,
        jsonData: pdfDownload[pdf].pdfData,
        fileName: pdfDownload[pdf].fileName,
        heading: pdfDownload[pdf].heading,
      });
    }
    if (pdf === "screen-pictures") {
      newBlob = generateScreenPicturesPptFromJSON({
        download: false,
        jsonData: pdfDownload[pdf].pdfData,
        fileName: pdfDownload[pdf].fileName,
        heading: pdfDownload[pdf].heading,
      });
    }
    if (pdf === "creative-ratio") {
      newBlob = generateCreativeRatioPdfFromJSON({
        download: false,
        jsonData: pdfDownload[pdf].pdfData,
        fileName: pdfDownload[pdf].fileName,
        heading: pdfDownload[pdf].heading,
      });
    }
    // uniqueFileName = pdfDownload[pdf].fileName + ".pdf";

    if (newBlob instanceof Blob) {
      const uniqueFileName = pdfDownload[pdf].fileName + ".pdf";
      setBlobData((prev: any) => {
        const existingFileNames = new Set(
          prev.map((blob: any) => blob.fileName)
        );
        if (!existingFileNames.has(uniqueFileName)) {
          return [...prev, { fileName: uniqueFileName, newBlob }];
        }
        return prev; // Return previous state if the blob is not unique
      });
    } else {
      console.error("Generated value is not a Blob:", newBlob);
    }
  };

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
    let imageArr: string[] = [];
    for (let data of files) {
      let url = await getAWSUrl(data);
      imageArr.push(url);
    }

    dispatch(
      addDetailsToCreateCampaign({
        pageName: "View Final Plan Page",
        id: pathname.split("/").splice(-1)[0],
        clientApprovalImgs: imageArr,
      })
    );
    setCurrentStep(step + 1);
  };

  const countScreensByResolutionAndCity = (data: any) => {
    const result: any = {};

    data.forEach((screen: any) => {
      const { city } = screen.location;
      const { screenResolution } = screen;

      // Initialize city and resolution group if not already present
      if (!result[city]) {
        result[city] = {};
      }
      if (!result[city][screenResolution]) {
        result[city][screenResolution] = 0;
      }

      // Increment the count for the screen resolution in that city
      result[city][screenResolution]++;
    });

    return result;
  };

  useEffect(() => {
    dispatch(getFinalPlanPOTableData(poInput));
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds,
      })
    );

    if (userInfo) {
      setCC(userInfo?.email);
    }
  }, [dispatch, poInput, campaignId]);

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
                    pdfData: [
                      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId],
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
                    pdfData: [
                      getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA),
                    ],
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
                disabled
                onChange={() => {
                  const pdfToDownload = pdfDownload;
                  pdfToDownload["screen-pictures"] = {
                    heading: "SCREEN PICTURES",
                    pdfData: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                      campaignId
                    ]?.screenWiseSlotDetails?.map((screen: any) => {
                      return {
                        screenId: screen._id,
                        name: screen.screenName,
                        images: screen.images,
                        location: screen.location,
                      };
                    }),
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
                    pdfData: countScreensByResolutionAndCity(
                      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
                        ?.screenWiseSlotDetails
                    ),
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
                if (pdf === "approach") {
                  generatePlanApproachPdfFromJSON({
                    download: true,
                    jsonData: pdfDownload[pdf].pdfData,
                    fileName: pdfDownload[pdf].fileName,
                    heading: pdfDownload[pdf].heading,
                  });
                }
                if (pdf === "plan-summary") {
                  generatePlanSummaryPdfFromJSON({
                    download: true,
                    jsonData: pdfDownload[pdf].pdfData,
                    fileName: pdfDownload[pdf].fileName,
                    heading: pdfDownload[pdf].heading,
                  });
                }

                if (pdf === "screen-pictures") {
                  generateScreenPicturesPptFromJSON({
                    download: true,
                    jsonData: pdfDownload[pdf].pdfData,
                    fileName: pdfDownload[pdf].fileName,
                    heading: pdfDownload[pdf].heading,
                  });
                }

                if (pdf === "creative-ratio") {
                  generateCreativeRatioPdfFromJSON({
                    download: true,
                    jsonData: pdfDownload[pdf].pdfData,
                    fileName: pdfDownload[pdf].fileName,
                    heading: pdfDownload[pdf].heading,
                  });
                }
              });
            }}
          >
            Download
          </button>
          <Divider />
          <div
            onClick={() => {
              Object.keys(pdfDownload).map((pdf: any) => {
                handleBlob(pdf);
              });
            }}
          >
            <EmailSendBox
              toEmail={toEmail}
              setToEmail={setToEmail}
              cc={cc}
              sendEmail={sendEmail}
            />
          </div>

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
          totalScreensData={getDataFromLocalStorage(COST_SUMMARY)[0] || []}
        />
      </div>
    </div>
  );
};
