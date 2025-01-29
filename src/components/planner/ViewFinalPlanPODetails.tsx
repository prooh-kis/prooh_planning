import { useCallback, useEffect, useRef, useState } from "react";
import { Divider, message, Tooltip } from "antd";
import { Footer } from "../../components/footer";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getFinalPlanPOTableData,
  getPlanningPageFooterData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import { useLocation } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import {
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_TABLE_DATA,
} from "../../constants/localStorageConstants";
import { formatNumber } from "../../utils/formatValue";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";

import {
  getAWSUrlToUploadFile,
  getDocUrlToSaveOnAWS,
  sanitizeUrlForS3,
  saveFileOnAWS,
} from "../../utils/awsUtils";
import { generateCampaignSummaryPdfFromJSON } from "../../utils/generatePdf";
import { sendEmailForConfirmation } from "../../actions/userAction";
import { SEND_EMAIL_FOR_CONFIRMATION_RESET } from "../../constants/userConstants";
import { generatePPT } from "../../utils/generatePPT";
import { convertIntoDateAndTime } from "../../utils/dateAndTimeUtils";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import {
  applyCouponForCampaign,
  getCouponList,
  removeCouponForCampaign,
} from "../../actions/couponAction";
import { APPLY_COUPON_RESET } from "../../constants/couponConstants";

interface ViewFinalPlanPODetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  successAddCampaignDetails?: any;
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
  successAddCampaignDetails,
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

  const couponList = useSelector((state: any) => state.couponList);
  const { data: coupons } = couponList;

  const couponApplyForCampaign = useSelector(
    (state: any) => state.couponApplyForCampaign
  );
  const { data: couponApply, error: errorApply } = couponApplyForCampaign;

  const couponRemoveForCampaign = useSelector(
    (state: any) => state.couponRemoveForCampaign
  );
  const { data: couponRemove, error: errorRemove } = couponRemoveForCampaign;

  const finalPlanPOTableDataGet = useSelector(
    (state: any) => state.finalPlanPOTableDataGet
  );
  const {
    loading: loadingPOData,
    error: errorPOData,
    data: poTableData,
  } = finalPlanPOTableDataGet;

  const [currentCoupon, setCurrentCoupon] = useState<string>(
    poTableData?.couponId || ""
  );

  useEffect(() => {
    if (errorApply) {
      message.error(
        "Something went wrong applying this discount. Please try again."
      );
    } else if (couponApply) {
      dispatch(getFinalPlanPOTableData(poInput));
    }

    if (errorRemove) {
      message.error(
        "Something went wrong applying this discount. Please try again."
      );
    } else if (couponRemove) {
      dispatch(getFinalPlanPOTableData(poInput));
    }
  }, [couponApply, errorApply, dispatch, poInput, errorRemove, couponRemove]);

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
    formData.append(
      "message",
      `Please find the files at the following links:\n${fileLinks}`
    );

    dispatch(sendEmailForConfirmation(formData));
  };

  const handleBlob = async (pdf: any) => {
    let newBlob: any = null;
    if (pdf === "summary") {
      newBlob = generateCampaignSummaryPdfFromJSON({
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
      const blobPromises = Object.keys(pdfDownload).map((pdf) =>
        handleBlob(pdf)
      );
      const attachments: any = (await Promise.all(blobPromises)).filter(
        Boolean
      ); // Wait for all blobs to resolve
      // Step 2: Upload each file to S3
      const uploadPromises = attachments.map(
        async ({ fileName, newBlob }: any) => {
          try {
            if (!(newBlob instanceof Blob)) {
              throw new Error(`Invalid blob for file: ${fileName}`);
            }

            // Step 2.1: Get S3 pre-signed URL for upload
            const aws = await getDocUrlToSaveOnAWS(fileName, newBlob.type); // Assume fileName is passed to include in S3 key
            if (!aws?.url) {
              throw new Error(
                `Failed to retrieve pre-signed URL for: ${fileName}`
              );
            }

            // Step 2.2: Upload file to S3 using pre-signed URL
            const response = await fetch(aws.url, {
              method: "PUT",
              headers: {
                "Content-Type": newBlob.type,
              },
              body: newBlob,
            });

            if (!response.ok) {
              throw new Error(`Failed to upload file: ${fileName}`);
            }
            return { fileName, fileUrl: aws.awsURL };
          } catch (err) {
            console.error(`Error uploading file ${fileName}:`, err);
            return null; // Skip invalid files
          }
        }
      );

      // Step 3: Wait for all uploads to complete
      const uploadedFiles = (await Promise.all(uploadPromises)).filter(Boolean);

      if (uploadedFiles.length === 0) {
        console.error("No files were uploaded to S3.");
        return;
      }

      // Step 4: Prepare email content with file URLs
      const fileLinks = uploadedFiles
        .map(
          ({ fileName, fileUrl }: any) =>
            `Campaign Summary :<br><br/><a href="${sanitizeUrlForS3(
              fileUrl
            )}" target="_blank">${fileName?.replace(/_/g, " ")}</a><br></br>`
        )
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
    setConfirmationImageFiles(
      confirmationImageFiles.filter(
        (singleFile: any) => singleFile.url !== file.url
      )
    );
  };

  const getAWSUrl = async (data: any) => {
    try {
      const aws = await getAWSUrlToUploadFile(
        data.fileType,
        data?.file?.name?.split(".")[0]
      );
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

  const handleApplyCoupon = useCallback(
    (couponId: any) => {
      console.log("handleApplyCoupon : ", campaignId, currentCoupon);
      if (poTableData?.couponId) {
        message.warning(
          "You have already applied discount! Replacing the applied discount"
        );
      }
      dispatch(
        applyCouponForCampaign({
          campaignCreationId: campaignId,
          couponId: couponId || currentCoupon,
        })
      );
    },
    [campaignId, currentCoupon, poTableData, dispatch]
  );

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
    dispatch(getCouponList());
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "View Final Plan Page",
      })
    );

    if (userInfo) {
      setCC(userInfo?.email);
      setLoadingEmailReady(loadingSendEmail);
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
      <div className="grid grid-cols-2 gap-4 pb-20">
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
          <div className="flex font-normal text-[#2B2B2B] mt-4">
            <h1 className="text-left text-[14px] basis-1/2">Apply Discount%</h1>
            <div className="flex gap-4">
              <DropdownInput
                border="border-gray-100"
                height="h-8"
                width="w-auto"
                placeHolder="-----Select coupon-----"
                selectedOption={currentCoupon}
                setSelectedOption={(e: any) => {
                  setCurrentCoupon(e);
                  handleApplyCoupon(e);
                }}
                options={coupons?.map((coupon: any) => {
                  return {
                    label: `${coupon?.couponCode} ${coupon?.discountPercent}% discount`,
                    value: coupon?._id,
                  };
                })}
              />
            </div>
          </div>
          <Divider />
          <div className="flex font-semibold ">
            <div className="basis-1/2 flex items-center justify-start gap-2">
              <h1 className="text-left">Total Cost</h1>
              <Tooltip
                title={`${
                  poTableData?.trigger !== "None"
                    ? "*Additional trigger cost also included in the total campaign budget"
                    : "Total expected campaign budget."
                }`}
              >
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <div className="flex  basis-1/2 gap-8">
              {poTableData?.couponId && poTableData?.couponId !== "NA" && (
                <h1 className="text-left ">
                  &#8377;{" "}
                  {formatNumber(Number(poTableData?.finalCampaignBudget))}*
                </h1>
              )}
              <h1
                className={`text-left  ${
                  poTableData?.couponId && poTableData?.couponId !== "NA"
                    ? "line-through text-gray-400 "
                    : ""
                }`}
              >
                &#8377; {formatNumber(Number(poTableData?.totalCampaignBudget))}
                *
              </h1>

              {poTableData?.couponId && poTableData?.couponId !== "NA" && (
                <h1 className="text-left text-[#388e3c]">
                  {
                    coupons?.find((c: any) => c._id == poTableData?.couponId)
                      ?.discountPercent
                  }
                  % off
                </h1>
              )}
            </div>
          </div>
          {poTableData?.couponId && poTableData?.couponId !== "NA" && (
            <>
              <div className="flex font-semibold ">
                <h1 className="text-left text-[#388e3c] text-sm">
                  You saved &#8377;{" "}
                  {formatNumber(Number(poTableData?.totalDiscount))}*
                </h1>
              </div>
              <div className="flex font-semibold items-center gap-4">
                <h1 className="text-left text-sm">
                  Discount Applied:{" "}
                  <span className="text-[#129BFF]">
                    {
                      coupons?.find((c: any) => c._id == poTableData?.couponId)
                        ?.couponCode
                    }
                  </span>
                </h1>
                <i
                  className="fi fi-sr-trash flex items-center lg:text-[14px] text-[12px] text-[#EF4444]"
                  onClick={() => {
                    dispatch(
                      removeCouponForCampaign({
                        campaignCreationId: campaignId,
                      })
                    );
                  }}
                ></i>
              </div>
            </>
          )}
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
              <h1 className="text-[14px] truncate">Campaign Summary</h1>
              <input
                title="summary"
                type="checkbox"
                onChange={(e) => {
                  const pdfToDownload = pdfDownload;
                  if (e.target.checked) {
                    pdfToDownload["summary"] = {
                      heading: "CAMPAIGN SUMMARY",
                      pdfData: {
                        approach: [
                          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                            campaignId
                          ],
                        ],
                        costSummary: [
                          getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[
                            campaignId
                          ],
                        ],
                        creativeRatio: countScreensByResolutionAndCity(
                          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                            campaignId
                          ]?.screenWiseSlotDetails
                        ),
                      },
                      fileName: `${poInput?.brandName} Campaign Summary`,
                    };
                  } else {
                    delete pdfToDownload["summary"];
                  }
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
                onChange={(e) => {
                  const pdfToDownload = pdfDownload;

                  if (e.target.checked) {
                    pdfToDownload["screen-pictures"] = {
                      heading: "SCREEN PICTURES",
                      pdfData: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)
                        ?.[campaignId]?.screenWiseSlotDetails?.filter(
                          (s: any) =>
                            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                              campaignId
                            ]?.screenIds.includes(s.screenId)
                        )
                        ?.map((screen: any) => {
                          return screen;
                        }),
                      fileName: `${poInput?.brandName} Campaign Screen Pictures`,
                    };
                  } else {
                    delete pdfToDownload["screen-pictures"];
                  }

                  setPdfDownload(pdfToDownload);
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-8 py-2 bg-[#3B82F6] text-white rounded-full text-gray-500 text-sm"
            onClick={() => {
              Object.keys(pdfDownload)?.map(async (pdf: any) => {
                if (pdf === "summary") {
                  generateCampaignSummaryPdfFromJSON({
                    preview: false,
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
      <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={handleSaveAndContinue}
          campaignId={campaignId}
          pageName="View Final Plan Page"
          successAddCampaignDetails={successAddCampaignDetails}
        />
      </div>
    </div>
  );
};
