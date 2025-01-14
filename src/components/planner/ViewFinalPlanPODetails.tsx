import { useCallback, useEffect, useRef, useState } from "react";
import { Divider, message, Tooltip } from "antd";
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

import { getAWSUrlToUploadFile, getDocUrlToSaveOnAWS, sanitizeUrlForS3, saveDocsOnAws, saveFileOnAWS } from "../../utils/awsUtils";
import {
  generateCreativeRatioPdfFromJSON,
  generatePlanApproachPdfFromJSON,
  generatePlanSummaryPdfFromJSON,
  generateScreenPicturesPptFromJSON,
} from "../../utils/generatePdf";
import { sendEmailForConfirmation } from "../../actions/userAction";
import { SEND_EMAIL_FOR_CONFIRMATION_RESET } from "../../constants/userConstants";
import { generatePPT } from "../../utils/generatePPT";
import { convertDataTimeToLocale, convertIntoDateAndTime } from "../../utils/dateAndTimeUtils";

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

  const [confirmationImageFiles, setConfirmationImageFiles] = useState<any>([]);
  const [toEmail, setToEmail] = useState<any>("");
  const [cc, setCC] = useState<any>(userInfo?.email);
  const [loadingEmailReady, setLoadingEmailReady] = useState<any>(false);

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
    success: successSendEmail,
    data: sendEmailData,
  } = emailSendForConfirmation;

  const sendEmail = (fileLinks: string) => {
    const formData = new FormData();
    formData.append("toEmail", toEmail);
    formData.append("cc", cc);
    formData.append("message", `Please find the files at the following links:\n${fileLinks}`)

    dispatch(sendEmailForConfirmation(formData));
  };


  const handleBlob = async (pdf: any) => {
    let newBlob: any = null;
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
      newBlob = await generatePPT({
        download: false,
        data: pdfDownload[pdf].pdfData,
        fileName: pdfDownload[pdf].fileName,
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
  
    if (newBlob instanceof Blob) {
      const uniqueFileName =
        pdf === "screen-pictures"
          ? pdfDownload[pdf].fileName + ".pptx"
          : pdfDownload[pdf].fileName + ".pdf";
  
      return { fileName: uniqueFileName, newBlob };
    } else {
      console.error("Generated value is not a Blob:", newBlob);
      return null;
    }
  };

  const sendMultipleAttachments = async () => {
    setLoadingEmailReady(true);
    try {
      // Step 1: Collect all Blobs
      const blobPromises = Object.keys(pdfDownload).map((pdf) => handleBlob(pdf));
      const attachments: any = (await Promise.all(blobPromises)).filter(Boolean); // Wait for all blobs to resolve
      // Step 2: Upload each file to S3
      const uploadPromises = attachments.map(async ({ fileName, newBlob }: any) => {
        try {
          if (!(newBlob instanceof Blob)) {
            throw new Error(`Invalid blob for file: ${fileName}`);
          }
  
          // Step 2.1: Get S3 pre-signed URL for upload
          const aws = await getDocUrlToSaveOnAWS(fileName, newBlob.type,); // Assume fileName is passed to include in S3 key
          if (!aws?.url) {
            throw new Error(`Failed to retrieve pre-signed URL for: ${fileName}`);
          }
  
          // Step 2.2: Upload file to S3 using pre-signed URL
          const response = await fetch(aws.url, {
            method: "PUT",
            headers: {
              "Content-Type": newBlob.type,
            },
            body: newBlob,
          })

          if (!response.ok) {
            throw new Error(`Failed to upload file: ${fileName}`);
          }
          return { fileName, fileUrl: aws.awsURL}
        } catch (err) {
          console.error(`Error uploading file ${fileName}:`, err);
          return null; // Skip invalid files
        }
      });
  
      // Step 3: Wait for all uploads to complete
      const uploadedFiles = (await Promise.all(uploadPromises)).filter(Boolean);
  
      if (uploadedFiles.length === 0) {
        console.error("No files were uploaded to S3.");
        return;
      }
  
      // Step 4: Prepare email content with file URLs
      const fileLinks = uploadedFiles
        .map(({fileName, fileUrl}: any) => `<br></br>${fileName?.replace(/_/g, " ")}:<br><br/> ${sanitizeUrlForS3(fileUrl)}<br></br>`)
        .join("\n");
  
  
      // Step 5: Send email with file links
      sendEmail(fileLinks);
    } catch (error) {
      console.error("Error while sending attachments:", error);
    }
    setLoadingEmailReady(true);
  };
  
  const handleAddNewFile = async (file: File) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);

      setConfirmationImageFiles((pre: any) => [
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
    setConfirmationImageFiles(confirmationImageFiles.filter((singleFile: any) => singleFile.url !== file.url));
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
    for (let data of confirmationImageFiles) {
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
    if (successSendEmail) {
      message.success("Email sent successfully!");
      setToEmail("");
      setCC("");
      setConfirmationImageFiles([]);
      dispatch({
        type: SEND_EMAIL_FOR_CONFIRMATION_RESET,
      });
    }
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
      setLoadingEmailReady(loadingSendEmail)
    }
  }, [dispatch, poInput, campaignId, successSendEmail]);

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
            right={convertIntoDateAndTime(poTableData?.startDate)}
          />
          <MyDiv
            left={"End Date"}
            right={convertIntoDateAndTime(poTableData?.endDate)}
          />
          <MyDiv left={"Duration"} right={`${poTableData?.duration} Days`} />
          <Divider />
          <h1 className="font-semibold py-2	">Performance Metrics</h1>
          <MyDiv
            left={"Audience Impression"}
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
            <div className="basis-1/2 flex items-center justify-start gap-2">
              <h1 className="text-left">Total Cost</h1>
              <Tooltip
                  title={`${poTableData?.trigger !== "None" ? "*Additional trigger cost also included in the total campaign budget" : "Total expected campaign budget."}`}
                >
                  <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <h1 className="text-left basis-1/2">
              &#8377; {formatNumber(Number(poTableData?.totalCampaignBudget))}*
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
          <div className="flex flex-wrap gap-6 py-4">
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
                    fileName: `${poInput?.brandName}_Campaign_Approach`,
                  };
                  setPdfDownload(pdfToDownload);
                  console.log(pdfToDownload["approach"])
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
                      getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId],
                    ],
                    fileName: `${poInput?.brandName}_Campaign_Plan_Summary`,
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
                // disabled={true}
                onChange={() => {
                  const pdfToDownload = pdfDownload;
                  pdfToDownload["screen-pictures"] = {
                    heading: "SCREEN PICTURES",
                    pdfData: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                      campaignId
                    ]?.screenWiseSlotDetails?.map((screen: any) => {
                      return {
                        title: screen.screenName,
                        imageUrl: screen.images,
                        content: screen.location,
                        resolution: screen.screenResolution,
                      };
                    }),
                    fileName: `${poInput?.brandName}_Campaign_Screen_Pictures`,
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
                    fileName: `${poInput?.brandName}_Campaign_Creative_Ratio`,
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
                  if (pdfDownload[pdf].pdfData?.length > 0) {
                    console.log("start");
                    generatePPT({
                      download: true,
                      data: pdfDownload[pdf].pdfData,
                      fileName: pdfDownload[pdf].fileName,
                    });
                    console.log("end");
                  } else {
                    message.error("No data found, to download!");
                  }
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
          <div>
            <EmailSendBox
              page="VendorApproval"
              toEmail={toEmail}
              setToEmail={setToEmail}
              cc={cc}
              sendEmail={() => {
                sendMultipleAttachments();
              }}
              type="po"
              loading={loadingEmailReady}
            />
          </div>

          <Divider />
          <EmailConfirmationImage
            files={confirmationImageFiles}
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
          campaignId={campaignId}
          pageName="View Final Plan Page"
        />
      </div>
    </div>
  );
};
