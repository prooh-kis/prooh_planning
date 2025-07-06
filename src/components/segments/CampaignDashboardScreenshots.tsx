import { sensitiseUrlByEncoding } from "../../utils/fileUtils";
import ButtonInput from "../../components/atoms/ButtonInput";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { message, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { TAKE_DASHBOARD_SCREENSHOT_RESET } from "../../constants/billInvoiceConstants";

interface CampaignDashboardScreenshotsProps {
  loading?: any;
  takeScreenShot?: any;
  setSocketUpdateStatus?: any;
  socketUpdateStatus?: any;
  dashboardScreenshots?: any;
  setMagnifiedImageView?: any;
  setMagnifiedImage?: any;
  magnifiedImageView?: any;
  dashboardScreenshotName?: any;
  jobId?: any;
  dashboardSS?: any;
  setJobId?: any;
  setLoading?: any;
  setDashboardScreenshots?: any;
}

export const CampaignDashboardScreenshots = ({
  loading,
  takeScreenShot,
  setSocketUpdateStatus,
  socketUpdateStatus,
  setDashboardScreenshots,
  dashboardScreenshots,
  setMagnifiedImageView,
  setMagnifiedImage,
  magnifiedImageView,
  dashboardScreenshotName,
  jobId,
  dashboardSS,
  setJobId,
  setLoading,
}: CampaignDashboardScreenshotsProps) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    // Prevent WebSocket connection in iframe/webview
    if (window.location.search.includes("screenshot=true")) {
      return;
    } else {
      if (dashboardSS && jobId) {
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
        Object.entries(socketState).forEach(
          ([event, handler]: [string, any]) => {
            webSocket.on(event, handler);
          }
        );

        // Connection handler
        webSocket.on("connect", () => {
          webSocket.emit(
            "subscribeToDashboardScreenshotsJob",
            dashboardSS.screenshotjob
          );
        });

        // Job status handler
        webSocket.on("dashboardScreenshotsJobStatus", (update: any) => {
          const socketStatus = (update.state || "").toLowerCase();
          // Always update the socket status
          setSocketUpdateStatus(update);

          // Handle different job statuses
          switch (socketStatus) {
            case "completed":
              message.success("Document generation completed successfully!");
              setLoading(false);
              setJobId(null);
              // Handle the result if available
              if (update.result) {
                // You can access the result data here
                const downloadableUrls = Object.keys(update.result).map(
                  (key) => {
                    return {
                      tab: update.result[key].tab,
                      url: update.result[key].url.split("/").includes("https:")
                        ? sensitiseUrlByEncoding(update.result[key].url)
                        : null,
                    };
                  }
                );
                setDashboardScreenshots(
                  downloadableUrls?.map((url: any) => url.url)
                );
              }
              dispatch({ type: TAKE_DASHBOARD_SCREENSHOT_RESET });
              break;

            case "active":
              setLoading(true);
              break;

            case "failed":
            case "error":
              console.error("Job error:", update.error || "Unknown error");
              setLoading(false);
              setJobId(null);
              setSocketUpdateStatus(null);
              dispatch({ type: TAKE_DASHBOARD_SCREENSHOT_RESET });
              message.error(
                update.error ||
                  "Error in document generation. Please try again."
              );
              break;

            case "not_found":
              console.error("Job not found");
              setLoading(false);
              setJobId(null);
              setSocketUpdateStatus(null);
              dispatch({ type: TAKE_DASHBOARD_SCREENSHOT_RESET });
              message.error("Job not found. Please try again.");
              break;

            case "stuck":
              console.warn("Job is stuck:", update);
              setLoading(false);
              setJobId(null);
              setSocketUpdateStatus(null);
              dispatch({ type: TAKE_DASHBOARD_SCREENSHOT_RESET });
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
            webSocket.emit("unsubscribeFromDashboardScreenshotsJob");

            // Remove all listeners
            webSocket.off("dashboardScreenshotsJobStatus");
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
    }
  }, [
    dispatch,
    dashboardSS,
    jobId,
    setSocketUpdateStatus,
    setLoading,
    setJobId,
    setDashboardScreenshots,
  ]);

  return (
    <div className="py-4 px-1">
      <div className="flex justify-between">
        <div>
          <h1 className="text-[14px] font-semibold pt-2">
            Screenshot Of Campaign Dashboard Summary
          </h1>
          <p className="text-[12px] text-[#6F7F8E]">
            A verified proof of client approval showcasing our commitment to
            transparency
          </p>
        </div>
        <div className="px-4">
          <Tooltip title="Refresh Dashboard Screenshot Data">
            <i
              className="fi fi-br-rotate-right flex items-center justify-center text-gray-500"
              onClick={() => {
                setSocketUpdateStatus(null);
                takeScreenShot({});
              }}
            ></i>
          </Tooltip>
        </div>
      </div>
      {loading && (
        <div className="py-4">
          <LoadingScreen progress={socketUpdateStatus?.progress || ""} />
        </div>
      )}
      {dashboardScreenshots?.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center h-[50vh]">
          <p className="text-[12px]">
            Take snapshots of your campaign summary for future proof of
            references...
          </p>
          <ButtonInput
            disabled={loading}
            onClick={() => {
              setSocketUpdateStatus(null);
              takeScreenShot({});
            }}
          >
            Take Snapshots
          </ButtonInput>
        </div>
      )}
      {dashboardScreenshots?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 rounded-[12px]">
          {[...dashboardScreenshots]
            ?.reverse()
            ?.map((image: any, i: number) => (
              <div key={i} className="col-span-1 py-4 group relative">
                <div className="relative overflow-hidden rounded-[12px]">
                  <img
                    className="w-full h-full border border-gray-100 rounded-[12px] shadow-md transition-transform duration-300 group-hover:scale-105"
                    src={
                      image?.split("/").includes("https:") ? image : `${image}`
                    }
                    alt="dashboard-screenshot"
                  />
                  {!loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 rounded-[12px]">
                      <button
                        type="button"
                        onClick={() => {
                          setMagnifiedImage(image);
                          setMagnifiedImageView(!magnifiedImageView);
                        }}
                        className="p-2 w-12 h-12 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
                        title="View Fullscreen"
                      >
                        <i className="fi fi-rr-search flex items-center justify-center text-gray-700"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          takeScreenShot({ tabs: [`${i + 1}`] });
                        }}
                        className="p-2 h-12 w-12 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
                        title="View Fullscreen"
                      >
                        <i className="fi fi-br-rotate-right flex items-center justify-center text-gray-700"></i>
                      </button>
                    </div>
                  )}
                </div>
                <h1 className="p-1 text-[12px] truncate text-center mt-2">
                  {
                    dashboardScreenshotName?.find(
                      (ds: any) =>
                        ds.id ===
                          Number(image?.match(/_([0-9]+)\.jpeg$/)?.[1]) ||
                        Number(image?.match(/_([0-9]+)\.png$/)?.[1])
                    )?.label
                  }
                </h1>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
