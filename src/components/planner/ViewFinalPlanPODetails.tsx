import { useCallback, useEffect, useRef, useState } from "react";
import { message } from "antd";
import { Footer } from "../../components/footer";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { useDispatch, useSelector } from "react-redux";
import {
  getFinalPlanPOTableData,
  getPlanningPageFooterData,
  getRegularVsCohortPriceData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import { useLocation } from "react-router-dom";
import {
  addDetailsToCreateCampaign,
  downloadCampaignSummaryPPTAction,
} from "../../actions/campaignAction";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { sendEmailForConfirmation } from "../../actions/userAction";
import {
  CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
  SEND_EMAIL_FOR_CONFIRMATION_RESET,
} from "../../constants/userConstants";
import {
  applyCouponForCampaign,
  getCouponList,
  removeCouponForCampaign,
} from "../../actions/couponAction";
import {
  APPLY_COUPON_RESET,
  REMOVE_COUPON_RESET,
} from "../../constants/couponConstants";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET,
} from "../../constants/campaignConstants";
import { ViewFinalPlanTable } from "../../components/tables/ViewFinalPlanTable";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import ButtonInput from "../../components/atoms/ButtonInput";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { isValidEmail } from "../../utils/valueValidate";
import { calculateAspectRatio } from "../../utils/formatValue";
import { io } from "socket.io-client";
import { sensitiseUrlByEncoding } from "../../utils/fileUtils";
import { SendEmailPopup } from "../../components/popup/SendEmailPopup";
import { format } from "date-fns";
import { monitoringTypes } from "../../constants/helperConstants";
import { ChoseMonitoringTypeFive } from "../../components/segments/ChoseMonitoringTypeFive";
import { CostSummaryPopup } from "./CostSummaryPopup";

interface ViewFinalPlanPODetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  campaignDetails?: any;
}

interface MonitoringTypeData {
  dates: string[];
  monitoringType: any[];
}

interface InitialData {
  startDate: MonitoringTypeData;
  midDate: MonitoringTypeData;
  endDate: MonitoringTypeData;
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

  const [skipEmailConfirmation, setSkipEmailConfirmation] =
    useState<any>(false);

  const [confirmationImageFiles, setConfirmationImageFiles] = useState<any>([]);
  const [toEmail, setToEmail] = useState<any>(
    campaignDetails?.campaignManagerEmail
  );
  const [cc, setCC] = useState<any>([
    campaignDetails?.campaignPlannerEmail,
    "tech@prooh.ai",
  ]);
  const [loadingEmailReady, setLoadingEmailReady] = useState<any>(false);

  const [pdfDownload, setPdfDownload] = useState<any>({});
  const [summaryChecked, setSummaryChecked] = useState<any>(true);
  const [picturesChecked, setPicturesChecked] = useState<any>(true);
  const [initialData, setInitialData] = useState<InitialData>({
    startDate: {
      dates: [format(new Date(), "yyyy-MM-dd")],
      monitoringType: monitoringTypes?.map((type: any) => type.value),
    },
    endDate: {
      dates: [format(new Date(), "yyyy-MM-dd")],
      monitoringType: monitoringTypes?.map((type: any) => type.value),
    },
    midDate: {
      dates: [],
      monitoringType: [],
    },
  });

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

  const [jobId, setJobId] = useState<any>(null);
  const [wsLoading, setWsLoading] = useState<any>(false);
  const [socketUpdateStatus, setSocketUpdateStatus] = useState<any>(null);
  const [downloadUrls, setDownloadUrls] = useState<any>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState<any>(false);
  const [isOpenCostSummary, setIsOpenCostSummary] = useState<any>(false);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const screenSummaryPlanTableDataGet = useSelector(
    (state: any) => state.screenSummaryPlanTableDataGet
  );
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;

  const finalPlanPOTableDataGet = useSelector(
    (state: any) => state.finalPlanPOTableDataGet
  );
  const {
    loading: loadingPOData,
    error: errorPOData,
    data: poTableData,
  } = finalPlanPOTableDataGet;

  const { data: coupons } = useSelector((state: any) => state.couponList);

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

  const emailSendForConfirmation = useSelector(
    (state: any) => state.emailSendForConfirmation
  );
  const {
    loading: loadingSendEmail,
    error: errorSendEmail,
    success: successSendEmail,
    data: sendEmailData,
  } = emailSendForConfirmation;

  const {
    loading: loadingGeneration,
    error: errorGeneration,
    data: generationData,
  } = useSelector((state: any) => state.downloadCampaignSummaryPPT);

  const [currentCoupon, setCurrentCoupon] = useState<string>(
    poTableData?.couponId || ""
  );

  const sendEmail = () => {
    message.info(
      "Make sure to send latest generated docs to your valued partner..."
    );
    setLoadingEmailReady(true);
    const formData = new FormData();
    formData.append("toEmail", toEmail);
    formData.append("cc", cc);
    // formData.append(
    //   "message",
    //   `Please find the files at the following links:\n${fileLinks}`
    // );
    formData.append("id", campaignId);

    dispatch(sendEmailForConfirmation(formData));
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
      setConfirmToProceed(true);
      setSkipEmailConfirmation(true);
    }
  };

  const removeImage = (file: any) => {
    setConfirmationImageFiles(
      confirmationImageFiles.filter(
        (singleFile: any) => singleFile.url !== file.url
      )
    );
    if (
      confirmationImageFiles.filter(
        (singleFile: any) => singleFile.url !== file.url
      ).length === 0
    ) {
      setConfirmToProceed(false);
      setSkipEmailConfirmation(false);
    }
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
      if (confirmationImageFiles?.length == 0) {
        message.info(
          "Please share your plan with your manager and upload an email confirmation screenshot to continue"
        );
        return;
      }
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
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
          pageName: "View Final Plan Page",
          id: campaignId,
          clientApprovalImgs: imageArr,
          monitoringSelection: initialData,
        })
      );
    } else {
      setCurrentStep(step + 1);
    }
  };

  const countScreensByResolutionAndCity = (data: any) => {
    const result: any = {};
    data?.forEach((screen: any) => {
      const { city } = screen.location;
      const { screenResolution } = screen;
      if (!result[city]) {
        result[city] = {};
      }
      if (!result[city][screenResolution]) {
        result[city][screenResolution] = {};
        result[city][screenResolution].count = 0;
      }
      result[city][screenResolution].ratio =
        calculateAspectRatio(screenResolution);
      result[city][screenResolution].resolution = screenResolution;
      result[city][screenResolution].count++;
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
          campaignCreationId: campaignDetails?._id,
          couponId: couponId || currentCoupon,
        })
      );
    },
    [campaignDetails, currentCoupon, poTableData, dispatch]
  );

  const handleRemoveCoupon = useCallback(() => {
    dispatch(
      removeCouponForCampaign({
        campaignCreationId: campaignDetails?._id,
      })
    );
  }, [dispatch, campaignDetails]);

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
      setCurrentCoupon("");
      setConfirmToProceed(false);
      dispatch({ type: APPLY_COUPON_RESET });
      dispatch({ type: REMOVE_COUPON_RESET });
      dispatch({ type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET });
      dispatch(getFinalPlanPOTableData(poInput));
      dispatch(
        addDetailsToCreateCampaign({
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
          id: campaignId,
        })
      );
      setDownloadUrls([]);
      setJobId(null);
    }
    if (couponRemoveSuccess) {
      setCurrentCoupon("");
      setConfirmToProceed(false);
      dispatch({ type: APPLY_COUPON_RESET });
      dispatch({ type: REMOVE_COUPON_RESET });
      dispatch({ type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET });
      dispatch(getFinalPlanPOTableData(poInput));
      dispatch(
        addDetailsToCreateCampaign({
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
          id: campaignId,
        })
      );
      setDownloadUrls([]);
      setJobId(null);
    }
  }, [couponRemoveSuccess, couponApplySuccess, dispatch, campaignId, poInput]);

  useEffect(() => {
    if (userInfo && campaignDetails) {
      setLoadingEmailReady(loadingSendEmail);
      dispatch(getCouponList());
      const images = campaignDetails?.clientApprovalImgs;
      setInitialData(
        campaignDetails?.monitoringSelection || {
          startDate: {
            dates: [format(new Date(campaignDetails?.startDate), "yyyy-MM-dd")],
            monitoringType: monitoringTypes.map((type: any) => type.value),
          },
          endDate: {
            dates: [format(new Date(campaignDetails?.endDate), "yyyy-MM-dd")],
            monitoringType: monitoringTypes.map((type: any) => type.value),
          },
          midDate: {
            dates: [],
            monitoringType: [],
          },
        }
      );

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
      if (
        images?.map((image: string) => {
          return {
            file: null,
            url: image,
            fileType: "",
            fileSize: "",
            awsURL: image,
          };
        }).length > 0
      ) {
        setConfirmToProceed(true);
        setSkipEmailConfirmation(true);
      }
    }
  }, [userInfo, dispatch, campaignDetails, loadingSendEmail]);

  useEffect(() => {
    if (successSendEmail) {
      message.success("Email sent successfully!");
      setToEmail("");
      setCC([]);
      setConfirmationImageFiles([]);
      setLoadingEmailReady(false);
      dispatch({ type: SEND_EMAIL_FOR_CONFIRMATION_RESET });
    }
  }, [successSendEmail, dispatch]);

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
      getRegularVsCohortPriceData({
        id: campaignDetails?._id,
        screenIds: poInput?.screenIds,
        cohorts: campaignDetails?.cohorts,
        gender: campaignDetails?.gender,
        duration: campaignDetails?.duration,
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
        setCurrentStep(step + 1);
      }
    }
    if (poTableData) {
      setPdfDownload({
        summary: {
          data: {
            approach: [campaignDetails],
            costSummary: [screenSummaryPlanTableData],
            creativeRatio: countScreensByResolutionAndCity(
              campaignDetails?.screenWiseSlotDetails
            ),
          },
          fileName: `${campaignDetails?.name}_${campaignDetails?.brandName}_Campaign_Summary`,
        },
        "screen-pictures": {
          data: campaignDetails?.screenWiseSlotDetails
            ?.filter((s: any) =>
              campaignDetails?.screenIds.includes(s.screenId)
            )
            ?.map((screen: any) => {
              return screen;
            }),
          fileName: `${campaignDetails?.name}_${campaignDetails?.brandName}_Campaign_Screen_Pictures`,
        },
      });
    }

    if (generationData && generationData.docJob) {
      setJobId(generationData.docJob.jobId);
    }
  }, [
    poTableData,
    screenSummaryPlanTableData,
    campaignDetails,
    successAddDetails,
    step,
    setCurrentStep,
    confirmToProceed,
    dispatch,
    generationData,
  ]);

  const skipFunction = () => {
    message.info(
      "You can't skip this step, you must have to upload plan approval screenshots"
    );
    // dispatch(
    //   addDetailsToCreateCampaign({
    //     event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
    //     pageName: "View Final Plan Page",
    //     id: campaignId,
    //     clientApprovalImgs: [],
    //     monitoringSelection: initialData,
    //   })
    // );
  };

  const handleDownload = () => {
    if (downloadUrls.length > 0) {
      message.info(
        "Your download link is ready, please click on the document type below to download..."
      );
    } else {
      setDownloadUrls([]);
      setWsLoading(true);
      dispatch(
        downloadCampaignSummaryPPTAction({
          id: campaignId,
          pdf: summaryChecked,
          ppt: picturesChecked,
          jsonData: pdfDownload,
        })
      );
    }
  };

  useEffect(() => {
    if (generationData && jobId) {
      // const socketUrl = "ws://localhost:4444";
      const socketUrl = "wss://prooh.vinciis.in";
      const webSocket = io(socketUrl, {
        transports: ["websocket"],
        secure: true,
        rejectUnauthorized: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      });

      const socketState: any = {
        connecting: () => console.log("[Socket] connecting..."),
        connect: () => console.log("[Socket] connected..."),
        connect_error: (error: any) =>
          console.error("[Socket] connection error:", error),
        disconnect: (reason: any) =>
          console.log("[Socket] disconnected:", reason),
        reconnect_attempt: (attempt: any) =>
          console.log("[Socket] reconnecting, attempt:", attempt),
        reconnect_failed: () => console.error("[Socket] reconnect failed..."),
      };

      // Set up all socket state handlers
      Object.entries(socketState).forEach(([event, handler]: [string, any]) => {
        webSocket.on(event, handler);
      });

      // Connection handler
      webSocket.on("connect", () => {
        webSocket.emit("subscribeToGenerateDocPptJob", generationData.docJob);
      });

      // Job status handler
      webSocket.on("generateDocPptJobStatus", (update: any) => {
        const socketStatus = (update.state || "").toLowerCase();
        // Always update the socket status
        setSocketUpdateStatus(update);

        // Handle different job statuses
        switch (socketStatus) {
          case "completed":
            message.success("Document generation completed successfully!");
            setWsLoading(false);
            setJobId(null);

            // Handle the result if available
            if (update.result) {
              // You can access the result data here
              const downloadableUrls = Object.keys(update.result).map((key) => {
                return {
                  fileName: update.result[key].docType,
                  url: update.result[key].url.split("/").includes("https:")
                    ? sensitiseUrlByEncoding(update.result[key].url)
                    : null,
                };
              });
              setDownloadUrls(downloadableUrls);
            }
            dispatch({ type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET });
            break;

          case "active":
            setWsLoading(true);
            break;

          case "failed":
          case "error":
            console.error("Job error:", update.error || "Unknown error");
            setWsLoading(false);
            setJobId(null);
            setSocketUpdateStatus(null);
            dispatch({ type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET });
            message.error(
              update.error || "Error in document generation. Please try again."
            );
            break;

          case "not_found":
            console.error("Job not found");
            setWsLoading(false);
            setJobId(null);
            setSocketUpdateStatus(null);
            dispatch({ type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET });
            message.error("Job not found. Please try again.");
            break;

          case "stuck":
            console.warn("Job is stuck:", update);
            setWsLoading(false);
            setJobId(null);
            setSocketUpdateStatus(null);
            dispatch({ type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET });
            message.warning(
              "Document generation is taking longer than expected. Please check back later."
            );
            break;

          default:
            console.log("Unknown job status:", socketStatus);
        }
      });

      // Error handling
      webSocket.on("connect_error", (error: any) => {
        console.error("Connection error:", error);
        message.error(
          "Connection error. Please check your network and try again."
        );
      });

      // Cleanup on unmount
      return () => {
        if (webSocket) {
          // Unsubscribe from job updates
          webSocket.emit("unsubscribeFromGenerateDocPptJob");

          // Remove all listeners
          webSocket.off("generateDocPptJobStatus");
          webSocket.off("connect");
          webSocket.off("disconnect");
          webSocket.off("connect_error");
          webSocket.offAny();

          // Remove state handlers
          Object.entries(socketState).forEach((event: any) => {
            webSocket.off(event, socketState[event]);
          });

          // Disconnect if connected
          if (webSocket.connected) {
            webSocket.disconnect();
          }
        }
      };
    }
  }, [dispatch, generationData, jobId, socketUpdateStatus]); // Removed socketUpdateStatus from dependencies to prevent re-renders

  return (
    <div className="w-full font-custom">
      {isOpenCostSummary && (
        <CostSummaryPopup
          onClose={() => setIsOpenCostSummary(false)}
          campaignId={campaignId}
        />
      )}
      <SendEmailPopup
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        campaignDetails={campaignDetails}
        setToEmail={setToEmail}
        toEmail={toEmail}
        setCC={setCC}
        cc={cc}
        sendEmail={sendEmail}
        loadingEmailReady={loadingEmailReady}
      />
      <div>
        <h1 className="text-2xl font-semibold">View Final Plan & Share</h1>
        <h1 className="text-sm text-gray-500">
          View your final PO before creative upload and get budget approval
        </h1>
      </div>
      {loadingPOData ? (
        <LoadingScreen />
      ) : (
        <div className="h-[66vh] overflow-y-auto scrollbar-minimal pr-2">
          <div className="grid grid-cols-2 gap-2 pb-20 mt-4">
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
                setIsOpenCostSummary={setIsOpenCostSummary}
                coupons={coupons}
              />
            </div>
            <div ref={pageRef} className="col-span-1 w-full">
              {!loadingScreenSummaryPlanTable &&
                !errorScreenSummaryPlanTable && (
                  <div className="p-4 border border-1 border-#C3C3C3 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-lg">
                        Download your campaign plan
                      </h1>
                      <div
                        className="cursor-pointer flex items-center gap-2"
                        onClick={handleDownload}
                      >
                        <i
                          className={`${
                            wsLoading
                              ? "fi fi-br-spinner animate-spin"
                              : "fi fi-sr-file-download"
                          } text-[12px] text-[#129BFF] flex items-center`}
                        ></i>
                        <h1 className="text-[12px] text-[#129BFF]">
                          {socketUpdateStatus?.progress &&
                            socketUpdateStatus?.progress !== 100 &&
                            `${socketUpdateStatus?.progress}%`}{" "}
                          {downloadUrls.length > 0
                            ? "Download"
                            : wsLoading
                            ? "Generating"
                            : "Generate"}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 pt-4">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          if (downloadUrls.length > 0 && downloadUrls[0].url) {
                            window.open(downloadUrls[0].url, "_blank");
                          }
                        }}
                      >
                        <i
                          className={`
                          fi fi-sr-file-pdf flex items-center justify-center
                          ${
                            downloadUrls.length > 0 && downloadUrls[0].url
                              ? "text-[#129BFF]"
                              : "text-[#D7D7D7]"
                          }
                          ${wsLoading ? "animate-pulse" : ""}
                        `}
                        ></i>
                        {/* <input
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
                                data: {
                                  approach: [campaignDetails],
                                  costSummary: [screenSummaryPlanTableData],
                                  creativeRatio:
                                    countScreensByResolutionAndCity(
                                      campaignDetails?.screenWiseSlotDetails
                                    ),
                                },
                                fileName: `${poInput?.brandName} Campaign Summary`,
                              };
                            } else {
                              delete pdfToDownload["summary"];
                            }
                            setPdfDownload(pdfToDownload);
                          }}
                        /> */}
                        <h1
                          className={`text-[14px] truncate ${
                            downloadUrls.length > 0
                              ? "text-[#129BFF] underline underline-offset-4"
                              : ""
                          }`}
                        >
                          Campaign Summary
                        </h1>
                      </div>
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                          if (downloadUrls.length > 0 && downloadUrls[1].url) {
                            window.open(downloadUrls[1].url, "_blank");
                          }
                        }}
                      >
                        <i
                          className={`
                          fi fi-sr-ppt-file flex items-center justify-center 
                          ${
                            downloadUrls.length > 0 && downloadUrls[1].url
                              ? "text-[#129BFF]"
                              : "text-[#D7D7D7]"
                          }
                          ${wsLoading ? "animate-pulse" : ""}
                        `}
                        ></i>
                        {/* <input
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
                                data: campaignDetails?.screenWiseSlotDetails
                                  ?.filter((s: any) =>
                                    campaignDetails?.screenIds.includes(
                                      s.screenId
                                    )
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
                        /> */}
                        <h1
                          className={`text-[14px] truncate ${
                            downloadUrls.length > 0
                              ? "underline underline-offset-4 text-[#129BFF]"
                              : ""
                          }`}
                        >
                          Screen Picture
                        </h1>
                      </div>
                    </div>
                  </div>
                )}

              <div className="mt-2 p-4 border border-1 border-#C3C3C3 rounded-2xl">
                <h1 className="font-semibold text-lg pb-4">
                  Add Mid Date Monitoring
                </h1>
                <ChoseMonitoringTypeFive
                  initialData={initialData}
                  setInitialData={setInitialData}
                />
              </div>

              {!loadingScreenSummaryPlanTable &&
                !errorScreenSummaryPlanTable && (
                  <div className="mt-2 p-4 border border-1 border-#C3C3C3 rounded-2xl">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => {
                        setIsShareModalOpen(true);
                      }}
                    >
                      <h1 className="font-semibold text-lg">Share this plan</h1>
                      <i className="fi fi-ss-paper-plane flex items-center text-[#129BFF] text-[12px]"></i>
                    </div>
                    <div className="grid grid-cols-6 gap-2 pt-4">
                      <div className="col-span-4">
                        <PrimaryInput
                          placeholder="Enter Email"
                          value={toEmail}
                          inputType="text"
                          action={setToEmail}
                          rounded="rounded-[8px]"
                        />
                      </div>
                      <div className="col-span-2">
                        <ButtonInput
                          variant="primary"
                          className="h-[48px]"
                          loadingText="Sending..."
                          loading={loadingEmailReady}
                          disabled={loadingEmailReady}
                          icon={
                            <i className="fi fi-sr-envelope flex items-center"></i>
                          }
                          onClick={() => {
                            if (isValidEmail(toEmail)) {
                              sendEmail();
                              message.info(
                                "Sending complete plan summary, please call your manager and take approval"
                              );
                            } else message.error("Please Enter valid email");
                          }}
                        >
                          Send
                        </ButtonInput>
                      </div>
                    </div>
                    <div className="flex items-center p-1">
                      <h1 className="text-[12px] text-[#6F7F8E]">
                        Enter email and share your plan
                      </h1>
                    </div>
                  </div>
                )}
              <div className="mt-2 p-4 border border-1 border-#C3C3C3 h-auto rounded-2xl">
                <EmailConfirmationImage
                  files={confirmationImageFiles}
                  handleAddNewFile={handleAddNewFile}
                  removeImage={removeImage}
                  setSkipEmailConfirmation={(e: any) => {
                    setConfirmToProceed(true);
                    setSkipEmailConfirmation(e);
                  }}
                  skipFunction={skipFunction}
                  skipEmailConfirmation={skipEmailConfirmation}
                />
              </div>
            </div>
          </div>
          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              mainTitle={
                !skipEmailConfirmation ? "Confirm to Continue" : "Continue"
              }
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
