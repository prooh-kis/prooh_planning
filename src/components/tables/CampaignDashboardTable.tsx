import React from "react";
import { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch, useSelector } from "react-redux";
import { GetCampaignMonitoringPicsAction } from "../../actions/campaignAction";
import { ShowCampaignLogsPopup } from "../../components/popup/ShowCampaignLogsPopup";
import { ShowMonitoringPicsPopup } from "../../components/popup/ShowMonitoringPics";
import {
  calculateDaysPlayed,
  convertIntoDateAndTime,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import { message, Tooltip } from "antd";
import { downloadExcel } from "../../utils/excelUtils";
import axios from "axios";
import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { DashboardImpressionDetailsTable } from "./DashboardImpressionDetailsTable";

const analyticsV1 = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/analytics`;
interface CostSummaryTableProps {
  screenLevelData?: any;
  campaignDetails?: any;
  city: string;
  currentTouchPoint: string;
}

export const CampaignDashboardTable = ({
  screenLevelData,
  campaignDetails,
  city,
  currentTouchPoint,
}: CostSummaryTableProps) => {
  const dispatch = useDispatch<any>();
  const [isDownLoad, setIsDownload] = useState<string>("");

  const [openLogsPopup, setOpenLogsPopup] = useState<any>(false);
  const [openMonitoringPicsPopup, setOpenMonitoringPicsPopup] =
    useState<any>(false);
  const [screenId, setScreenId] = useState<any>(null);

  const [screenName, setscreenName] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<any>(null);
  const [campaignData, setCampaignData] = useState<any>({});

  const [currentWeek, setCurrentWeek] = useState<any>(1);
  const [currentDay, setCurrentDay] = useState<any>(1);
  const [currentDate, setCurrentDate] = useState<any>(new Date().toUTCString());
  const campaignLogsGet = useSelector((state: any) => state.campaignLogsGet);
  const {
    loading: loadingLogs,
    error: errorLogs,
    data: logs,
  } = campaignLogsGet;

  useEffect(() => {
    if (campaignDetails?.startDate && campaignDetails?.endDate) {
      const start = new Date(campaignDetails.startDate);
      const today = new Date();

      // Ensure today is within the campaign duration
      if (today < start) {
        setCurrentDay(1);
        setCurrentWeek(1);
      } else {
        const daysPassed =
          Math.floor(
            (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1; // Adding 1 to start from day 1, not 0

        setCurrentDay(daysPassed % 7);
        setCurrentWeek(Math.ceil(daysPassed / 7)); // Week starts from 1
      }

      // setCurrentDate(today.toUTCString());
    }
  }, [campaignDetails]);

  const onClose = () => {
    setOpenLogsPopup(false);
    setOpenMonitoringPicsPopup(false);
    setScreenId(null);
  };

  const downloadLogs = async (campaignId: string) => {
    try {
      message.info("Start fetching data, it will take some time");
      setIsDownload(campaignId);
      const { data } = await axios.get(
        `${analyticsV1}/downloadAllCampaignLogs?campaignId=${campaignId}`
      );
      await downloadExcel({
        campaign: data?.campaign,
        campaignLog: data?.logs,
      });
      message.success("Downloaded success full!");
      setIsDownload("");
    } catch (error: any) {
      message.error(error.message);
      setIsDownload("");
    }
  };

  const slotDeliveryData = (data: string) => {
    const days =
      calculateDaysPlayed(
        campaignDetails?.startDate,
        campaignDetails?.endDate
      ) === 0
        ? 1
        : calculateDaysPlayed(
            campaignDetails?.startDate,
            campaignDetails?.endDate
          );
    const totalDays = campaignDetails?.duration;
    const delivered = screenLevelData[data]?.slotsDelivered?.toFixed(0);

    const promised = screenLevelData[data]?.slotsPromised?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    const averagePromised = Number((promised / totalDays).toFixed(2));

    return Number(((result / averagePromised) * 100)?.toFixed(2));
  };

  const costConsumedData = (data: string) => {
    const days =
      calculateDaysPlayed(
        campaignDetails?.startDate,
        campaignDetails?.endDate
      ) === 0
        ? 1
        : calculateDaysPlayed(
            campaignDetails?.startDate,
            campaignDetails?.endDate
          );
    const totalDays = campaignDetails?.duration;
    const delivered = screenLevelData?.[data]?.costConsumed?.toFixed(0);

    const promised = screenLevelData[data]?.costTaken?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    const averagePromised = Number((promised / totalDays).toFixed(2));

    return Number(((result / averagePromised) * 100)?.toFixed(2));
  };
  const impressionsDeliveredPositive = (data: string) => {
    const days =
      calculateDaysPlayed(
        campaignDetails?.startDate,
        campaignDetails?.endDate
      ) === 0
        ? 1
        : calculateDaysPlayed(
            campaignDetails?.startDate,
            campaignDetails?.endDate
          );
    const totalDays = campaignDetails?.duration;
    const delivered = screenLevelData?.[data]?.impressionsDelivered?.toFixed(0);

    const promised = screenLevelData[data]?.impressionsPromised?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    const averagePromised = Number((promised / totalDays).toFixed(2));

    return Number(((result / averagePromised) * 100)?.toFixed(2));
  };

  const getSpotDeliveryData = (data: any) => {
    const datesArray = data?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = data?.slotsPlayedPerDay?.map((slot: any) => slot.count);
    return { datesArray, countsArray };
  };

  const getPromisedSpotDeliveryData = (data: any) => {
    const datesArray = data?.slotsPlayedPerDay?.map((slot: any) => slot.date);
    const countsArray = data?.slotsPlayedPerDay?.map(
      (slot: any) => slot.countPromised
    );
    return { datesArray, countsArray };
  };

  const getScreenClassName = (lastActive: any) => {
    if (lastActive) {
      if (getTimeDifferenceInMin(lastActive) < 15)
        return "border w-4 h-4 bg-[#348730] rounded-full justify-end";
      else return "border w-4 h-4 bg-[#ffec33] rounded-full justify-end";
    } else return "border w-4 h-4 bg-[#ff3333] rounded-full justify-end";
  };

  const getScreenStatus = (lastActive: any) => {
    if (lastActive) {
      if (getTimeDifferenceInMin(lastActive) < 15) return "Active";
      else return "Close";
    } else return "Close";
  };

  const getAllDates = ({ startDate, endDate }: any) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dates.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }

    return dates;
  };

  const allDates: any = getAllDates({
    startDate: campaignDetails?.startDate,
    endDate: campaignDetails?.endDate,
  });

  const downloadFileFromUrl = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      message.error("You can download logs from tomorrow");
      return;
    }

    const campaignEndDate = campaignDetails?.endDate
      ? new Date(campaignDetails.endDate)
      : null;

    if (campaignEndDate && new Date() > campaignEndDate) {
      message.info("Downloading all logs, please wait for some time...");
    } else {
      message.info(
        "Logs till yesterday will be downloaded as the campaign is still live today..."
      );
    }

    // Create a hidden <a> tag and trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <ShowMonitoringPicsPopup
        campaign={screenLevelData?.[screenId]}
        screenId={screenId}
        campaignCreation={campaignDetails}
        onClose={onClose}
        open={openMonitoringPicsPopup}
      />
      <ShowCampaignLogsPopup
        logs={logs}
        loading={loadingLogs}
        open={openLogsPopup}
        onClose={onClose}
        campaignData={campaignData}
        campaignDetails={campaignDetails}
        setCurrentDay={setCurrentDay}
        setCurrentWeek={setCurrentWeek}
        currentDay={currentDay}
        currentWeek={currentWeek}
        allDates={allDates}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
        isDownLoad={isDownLoad}
        downloadLogs={downloadLogs}
      />
      <table className="table-auto w-full">
        <thead className="bg-[#F7F7F7] rounded-[6px] w-full flex justify-between items-center">
          <tr className="flex w-full items-center h-[40px] border-b text-[#707070]">
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Sr.</h1>
            </th>
            <th className="w-full flex items-center justify-center truncate">
              <h1 className="text-[14px]  truncate">Screen Name</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Location</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Touchpoint</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Days</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Spots</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Impressions</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Cost</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Delivery</h1>
            </th>

            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Action</h1>
            </th>
          </tr>
        </thead>
        <tbody className=" max-h-[250px] overflow-scroll">
          {Object.keys(screenLevelData || {})
            .filter((d: string) => d !== "totalData")
            .filter((d: string) => {
              const item = screenLevelData[d];
              const cityMatch = city ? item?.city === city : true;
              const touchpointMatch = currentTouchPoint
                ? item?.touchPoint === currentTouchPoint
                : true;
              return cityMatch && touchpointMatch;
            })
            .map((data: string, index: number) => (
              <React.Fragment key={index}>
                <tr
                  key={data}
                  className="flex w-full h-[40px] hover:bg-gray-100 hover:rounded-[6px] border-b text-[#0E212E]"
                >
                  <td className="w-full flex items-center justify-center">
                    <p className="text-[12px]">{index + 1}</p>
                  </td>
                  <td className="w-full flex items-center justify-start gap-2 truncate">
                    <Tooltip
                      title={`${getScreenStatus(
                        screenLevelData?.[data]?.lastActive
                      )}, ${convertIntoDateAndTime(
                        screenLevelData?.[data]?.lastActive
                      )} `}
                    >
                      <div
                        className={getScreenClassName(
                          screenLevelData?.[data]?.lastActive
                        )}
                      />
                    </Tooltip>
                    <p className="text-[12px] truncate px-1">
                      {screenLevelData[data]?.screenName}
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center truncate">
                    <p className="text-[12px] truncate">
                      {screenLevelData[data]?.location}
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center truncate">
                    <p className="text-[12px] truncate">
                      {screenLevelData[data]?.touchPoint}
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <p className="text-[12px]">
                      {screenLevelData[data]?.durationPromised}{" "}
                      <span className="text-[#2A892D] text-[10px]">
                        (
                        {(
                          (calculateDaysPlayed(
                            campaignDetails?.startDate,
                            campaignDetails?.endDate
                          ) *
                            100) /
                          screenLevelData[data]?.durationPromised
                        ).toFixed(0)}
                        %)
                      </span>
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex flex-row justify-center items-center gap-1">
                      <p className="text-[12px]">
                        {formatNumber(screenLevelData[data]?.slotsDelivered)}
                      </p>
                      <p
                        className={`text-[10px] ${
                          slotDeliveryData(data) > 0
                            ? "text-[#2A892D]"
                            : "text-[#CC0000]"
                        }`}
                      >
                        {`(${formatNumber(slotDeliveryData(data))}%)`}{" "}
                        {slotDeliveryData(data) > 0 ? (
                          <i className="fi fi-rr-arrow-up "></i>
                        ) : (
                          <i className="fi fi-rr-arrow-down "></i>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex flex-row justify-center items-center gap-1">
                      <p className="text-[12px]">
                        {formatNumber(
                          screenLevelData[data]?.impressionsDelivered?.toFixed(
                            0
                          )
                        )}
                      </p>
                      <p
                        className={`text-[10px] ${
                          impressionsDeliveredPositive(data) > 0
                            ? "text-[#2A892D]"
                            : "text-[#CC0000]"
                        }`}
                      >
                        {`(${formatNumber(
                          impressionsDeliveredPositive(data)
                        )}%)`}{" "}
                        {impressionsDeliveredPositive(data) > 0 ? (
                          <i className="fi fi-rr-arrow-up "></i>
                        ) : (
                          <i className="fi fi-rr-arrow-down "></i>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex flex-row justify-center items-center gap-1">
                      <p className="text-[12px]">
                        {formatNumber(
                          screenLevelData[data]?.costConsumed?.toFixed(0)
                        )}
                      </p>
                      <p
                        className={`text-[10px] ${
                          costConsumedData(data) > 0
                            ? "text-[#2A892D]"
                            : "text-[#CC0000]"
                        }`}
                      >
                        {`(${formatNumber(costConsumedData(data))}%)`}{" "}
                        {costConsumedData(data) > 0 ? (
                          <i className="fi fi-rr-arrow-up "></i>
                        ) : (
                          <i className="fi fi-rr-arrow-down "></i>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center gap-1">
                      <p className="text-[12px]">
                        {(
                          (screenLevelData?.[data]?.slotsDelivered * 100) /
                          screenLevelData?.[data]?.slotsPromised
                        )?.toFixed(2)}{" "}
                        %
                      </p>
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex gap-4">
                      <Tooltip title="View Monitoring Pics">
                        <i
                          className="fi fi-sr-picture text-[12px] text-[#129BFF]"
                          onClick={() => {
                            dispatch(
                              GetCampaignMonitoringPicsAction({
                                campaignId: screenLevelData[data]?.campaignId,
                                screenId: data,
                                date: campaignDetails.startDate,
                              })
                            );
                            setScreenId(data);
                            setOpenMonitoringPicsPopup(true);
                          }}
                        ></i>
                      </Tooltip>
                      <Tooltip title="View Logs">
                        <i
                          className={`fi fi-sr-eye text-[12px] text-[#129BFF]`}
                          onClick={() => {
                            setscreenName(screenLevelData[data]?.screenName);
                            setCampaignData(screenLevelData[data]);
                            setOpenLogsPopup(true);
                          }}
                        ></i>
                      </Tooltip>
                      <Tooltip title="Download logs in one click">
                        <i
                          className={`fi fi-sr-download text-[12px] text-[#129BFF] ${
                            isDownLoad == screenLevelData[data]?.campaignId
                              ? "text-gray-400"
                              : "text-[#129BFF]"
                          }`}
                          onClick={() => {
                            downloadFileFromUrl(
                              screenLevelData[data].logUrl,
                              `${screenLevelData[data]?.screenName}`
                            );
                            // if (isDownLoad != screenLevelData[data]?.campaignId)
                            //   downloadLogs(screenLevelData[data]?.campaignId);
                            // else
                            //   message.warning(
                            //     "Please wait..., data has start fetching"
                            //   );
                          }}
                        ></i>
                      </Tooltip>

                      <i
                        className="fi fi-rs-chart-histogram text-[12px] text-[#129BFF]"
                        title="Analytic"
                        onClick={() => {
                          if (data === currentIndex) {
                            setCurrentIndex(null);
                          } else {
                            setCurrentIndex(data);
                          }
                        }}
                      ></i>
                    </div>
                  </td>
                </tr>
                {currentIndex === data && (
                  <tr className="h-full w-full p-4">
                    <td>
                      <div className="grid grid-cols-7 gap-4 p-2">
                        <div className="col-span-4 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 px-4 py-1">
                              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                                Day Wise Spot Delivered
                              </h1>
                              <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-1">
                              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                                Promised :{" "}
                                {(
                                  getPromisedSpotDeliveryData(
                                    screenLevelData[data]
                                  ).countsArray?.reduce(
                                    (a: number, c: number) => a + c,
                                    0
                                  ) /
                                  getPromisedSpotDeliveryData(
                                    screenLevelData[data]
                                  ).countsArray?.length
                                ).toFixed(0)}{" "}
                              </h1>
                              <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                                Delivered :{" "}
                                {(
                                  getSpotDeliveryData(
                                    screenLevelData[data]
                                  ).countsArray?.reduce(
                                    (a: number, c: number) => a + c,
                                    0
                                  ) /
                                  getSpotDeliveryData(screenLevelData[data])
                                    .countsArray?.length
                                ).toFixed(0)}{" "}
                              </h1>
                            </div>
                          </div>
                          <div className="p-2">
                            <DashBoardSlotGraph
                              total={`${screenLevelData[
                                data
                              ]?.slotsDelivered?.toFixed(0)}/${screenLevelData[
                                data
                              ]?.slotsPromised?.toFixed(0)}`}
                              label={"Spot Delivery"}
                              targetData={
                                getPromisedSpotDeliveryData(
                                  screenLevelData[data]
                                ).countsArray
                              }
                              currentData={
                                getSpotDeliveryData(screenLevelData[data])
                                  .countsArray
                              }
                              labels={
                                getSpotDeliveryData(screenLevelData[data])
                                  .datesArray
                              }
                              color="#77C1E3"
                              bgColor="#77C1E3"
                              color2="#FFC2A8"
                              bgColor2="#FFC2A8"
                            />
                          </div>
                        </div>
                        <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100 ">
                          <div className="flex items-center gap-2 px-4 py-1">
                            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                              Audience Type Wise Impressions
                            </h1>
                            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                          </div>
                          <div className="p-2">
                            <DashboardImpressionDetailsTable
                              screenLevelData={screenLevelData[data]}
                            />
                            {/* {JSON.stringify(screenLevelData[data])} */}
                          </div>
                        </div>{" "}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};
