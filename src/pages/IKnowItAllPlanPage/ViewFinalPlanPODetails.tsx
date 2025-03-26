import { useCallback, useEffect, useRef, useState } from "react";
import { Divider, message } from "antd";
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
import {
  applyCouponForCampaign,
  getCouponList,
  removeCouponForCampaign,
} from "../../actions/couponAction";
import { APPLY_COUPON_RESET } from "../../constants/couponConstants";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { ViewFinalPlanTable } from "../../components/tables/ViewFinalPlanTable";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface ViewFinalPlanPODetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  campaignDetails?: any;
}

export const ViewFinalPlanPODetails = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails,
}: ViewFinalPlanPODetailsProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const [skipEmailConfirmation, setSkipEmailConfirmation] = useState<any>(false);

  const [confirmationImageFiles, setConfirmationImageFiles] = useState<any>([]);
  const [toEmail, setToEmail] = useState<any>("");
  const [cc, setCC] = useState<any>(userInfo?.email);
  const [loadingEmailReady, setLoadingEmailReady] = useState<any>(false);

  const [pdfDownload, setPdfDownload] = useState<any>({});
  const [summaryChecked, setSummaryChecked] = useState<any>(false);
  const [picturesChecked, setPicturesChecked] = useState<any>(false);

  const [poInput, setPoInput] = useState<any>({
    pageName: "View Final Plan Page",
    id: campaignId,
    name: campaignDetails?.name,
    brandName: campaignDetails?.brandName,
    clientName: campaignDetails?.clientName,
    campaignType: campaignDetails?.campaignType,
    startDate: campaignDetails?.startData,
    endDate: campaignDetails?.endDate,
    duration: campaignDetails?.duration,
    selectedType: campaignDetails?.selectedType,
    gender: campaignDetails?.gender,
    screenIds: campaignDetails?.screenIds,
    totalImpression: campaignDetails?.totalImpression,
    totalReach: campaignDetails?.totalReach,
    totalCpm: campaignDetails?.totalCpm,
    triggers: campaignDetails?.selectedTriggers,
    totalCampaignBudget: campaignDetails?.totalCampaignBudget,
    cohorts: campaignDetails?.cohorts,
  });
  const [confirmToProceed, setConfirmToProceed] = useState<any>(false);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;


  const couponList = useSelector((state: any) => state.couponList);
  const { data: coupons } = couponList;

  const couponApplyForCampaign = useSelector(
    (state: any) => state.couponApplyForCampaign
  );
  const {
    data: couponApply,
    success: couponApplySuccess,
    error: errorApply,
  } = couponApplyForCampaign;

  const couponRemoveForCampaign = useSelector(
    (state: any) => state.couponRemoveForCampaign
  );
  const {
    data: couponRemove,
    success: couponRemoveSuccess,
    error: errorRemove,
  } = couponRemoveForCampaign;

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

  const screenSummaryPlanTableDataGet = useSelector(
    (state: any) => state.screenSummaryPlanTableDataGet
  );
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;

  const [currentCoupon, setCurrentCoupon] = useState<string>(
    poTableData?.couponId || ""
  );

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
    if (!pathname.split("/").includes("view")) {
      if (!skipEmailConfirmation) {
        message.info("Please skip the email confirmation or upload an email confirmation screenshot to continue")
      } else {
        let imageArr: string[] = [];
        for (let data of confirmationImageFiles) {
          if (data.awsURL) {
            imageArr.push(data.awsURL);
            console.log("no need to save again");
          } else {
            let url = await getAWSUrl(data);
            imageArr.push(url);
          }
        }

        setConfirmToProceed(true);

        dispatch(
          addDetailsToCreateCampaign({
            pageName: "View Final Plan Page",
            id: campaignId,
            clientApprovalImgs: imageArr,
          })
        );
      }

    } else {
      setCurrentStep(step + 1);
    }
  };

  const countScreensByResolutionAndCity = (data: any) => {
    const result: any = {};

    data.forEach((screen: any) => {
      const { city } = screen.location;
      const { screenResolution } = screen;
      if (!result[city]) {
        result[city] = {};
      }
      if (!result[city][screenResolution]) {
        result[city][screenResolution] = 0;
      }
      result[city][screenResolution]++;
    });

    return result;
  };

  const handleApplyCoupon = useCallback(
    (couponId: any) => {
      if (poTableData?.couponId) {
        message.warning("Discount coupon applied...");
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

  const handleRemoveCoupon = () => {
    dispatch(
      removeCouponForCampaign({
        campaignCreationId: campaignId,
      })
    );
  };

  useEffect(() => {
    if (errorApply) {
      message.error(
        "Something went wrong applying this discount. Please try again."
      );
    }
    if (errorRemove) {
      message.error(
        "Something went wrong removing this discount. Please try again."
      );
    }
  }, [errorApply, errorRemove]);

  useEffect(() => {
    if (couponApplySuccess) {
      setSummaryChecked(false);
      setPicturesChecked(false);
      setCurrentCoupon("");
      setConfirmToProceed(false);
      dispatch({ type: APPLY_COUPON_RESET });
      dispatch(getFinalPlanPOTableData(poInput));
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
    if (couponRemoveSuccess) {
      setSummaryChecked(false);
      setPicturesChecked(false);
      setCurrentCoupon("");
      setConfirmToProceed(false);
      dispatch({ type: APPLY_COUPON_RESET });
      dispatch(getFinalPlanPOTableData(poInput));
      dispatch(addDetailsToCreateCampaign({ id: campaignId }));
    }
  }, [couponRemoveSuccess, couponApplySuccess, dispatch, campaignId, poInput]);

  useEffect(() => {
    if (userInfo) {
      setCC(userInfo?.email);
      setLoadingEmailReady(loadingSendEmail);
      dispatch(getCouponList());
      const images = campaignDetails?.clientApprovalImgs;

      setConfirmationImageFiles(
        images?.map((image: string) => {
          return {
            file: null,
            url: image,
            fileType: "",
            fileSize: "",
            awsURL: image,
          };
        })
      );
    }
  }, [userInfo, dispatch, campaignDetails, loadingSendEmail]);

  useEffect(() => {
    if (successSendEmail) {
      message.success("Email sent successfully!");
      setToEmail("");
      setCC("");
      setConfirmationImageFiles([]);
      dispatch({ type: SEND_EMAIL_FOR_CONFIRMATION_RESET });
    }
  },[successSendEmail, dispatch]);

  useEffect(() => {
    if (!campaignDetails) return;
    dispatch(getFinalPlanPOTableData(poInput));
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds: poInput.screenIds,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "View Final Plan Page",
      })
    );
  }, [dispatch, campaignDetails, poInput, campaignId]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      if (confirmToProceed) {
        setCurrentStep(step+1);
      }
    }
  },[successAddDetails, step, setCurrentStep, confirmToProceed, dispatch]);

  return (
    <div className="w-full">
      <div>
        <h1 className="text-2xl font-semibold">View Final Plan & Share</h1>
        <h1 className="text-sm text-gray-500 ">
          Any specific route you want to cover in this campaign
        </h1>
      </div>
      {loadingPOData ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4 pb-20 mt-4">
            <div
              ref={pageRef}
              className="col-span-1 p-4 border border-1 border-#C3C3C3 rounded-2xl w-full"
            >
              <ViewFinalPlanTable
                poTableData={poTableData}
                currentCoupon={currentCoupon}
                setCurrentCoupon={setCurrentCoupon}
                handleApplyCoupon={handleApplyCoupon}
                handleRemoveCoupon={handleRemoveCoupon}
                coupons={coupons}
                campaignId={campaignId}
              />
            </div>
            <div
              ref={pageRef}
              className="col-span-1 p-4 border border-1 border-#C3C3C3 rounded-2xl w-full"
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
                    checked={summaryChecked}
                    disabled={loadingPOData}
                    onChange={(e) => {
                      setSummaryChecked(e.target.checked);

                      const pdfToDownload = pdfDownload;
                      if (e.target.checked) {
                        pdfToDownload["summary"] = {
                          heading: "CAMPAIGN SUMMARY",
                          pdfData: {
                            approach: [campaignDetails],
                            costSummary: [screenSummaryPlanTableData],
                            creativeRatio: countScreensByResolutionAndCity(campaignDetails?.screenWiseSlotDetails),
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
                    checked={picturesChecked}
                    disabled={loadingPOData}
                    onChange={(e) => {
                      setPicturesChecked(e.target.checked);
                      const pdfToDownload = pdfDownload;

                      if (e.target.checked) {
                        pdfToDownload["screen-pictures"] = {
                          heading: "SCREEN PICTURES",
                          pdfData: campaignDetails?.screenWiseSlotDetails?.filter(
                              (s: any) =>
                                campaignDetails?.screenIds.includes(s.screenId)
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
              <div className="flex gap-2 pb-4">
                <i className="fi fi-sr-lightbulb-on flex items-top justify-center text-primaryButton"></i>
                <h1 className="text-[12px] text-primaryButton">
                  Check the document that you wish to see, Campaign Summary
                  contains Campaign Details, Plan Summary and Creative Ratios,
                  while Screen Pictures have all the inventory pictures for your
                  references...
                </h1>
              </div>
              <button
                type="submit"
                disabled={loadingPOData}
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
                        generatePPT({
                          download: true,
                          data: pdfDownload[pdf].pdfData,
                          fileName: pdfDownload[pdf].fileName,
                        });
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
                  loading={loadingEmailReady || loadingPOData}
                />
              </div>

              <Divider />
              <EmailConfirmationImage
                files={confirmationImageFiles}
                handleAddNewFile={handleAddNewFile}
                removeImage={removeImage}
                setSkipEmailConfirmation={(e: any) => {
                  setConfirmToProceed(true);
                  setSkipEmailConfirmation(e);
                }}
                skipEmailConfirmation={skipEmailConfirmation}
              />
            </div>
          </div>
          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              mainTitle={!skipEmailConfirmation ? "Confirm to Continue" : "Continue"}
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={handleSaveAndContinue}
              campaignId={campaignId}
              pageName="View Final Plan Page"
              loadingCost={loadingAddDetails}
              successCampaignDetails={successAddDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};
