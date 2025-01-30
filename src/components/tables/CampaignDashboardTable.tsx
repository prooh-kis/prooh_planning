import React from "react";
import { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCampaignLogsAction,
  GetCampaignMonitoringPicsAction,
} from "../../actions/campaignAction";
import { ShowCampaignLogsPopup } from "../../components/popup/ShowCampaignLogsPopup";
import { ShowMonitoringPicsPopup } from "../../components/popup/ShowMonitoringPics";
import { calculateDaysPlayed } from "../../utils/dateAndTimeUtils";
import { message } from "antd";
import { downloadExcel } from "../../utils/excelUtils";
import axios from "axios";
import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { DashboardImpressionDetailsTable } from "./DashboardImpressionDetailsTable";

const analyticsV1 = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/analytics`;
interface CostSummartTabelProps {
  screenLevelData?: any;
  campaignDetails?: any;
}

export const CampaignDashboardTable = ({
  screenLevelData,
  campaignDetails,
}: CostSummartTabelProps) => {
  const dispatch = useDispatch<any>();
  const [isDownLoad, setIsDownload] = useState<string>("");

  const [openLogsPopup, setOpenLogsPopup] = useState<any>(false);
  const [openMonitoringPicsPopup, setOpenMonitoringPicsPopup] =
    useState<any>(false);
  const [screenId, setScreenId] = useState<any>(null);

  const [screenName, setscreenName] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<any>(null);
  const campaignLogsGet = useSelector((state: any) => state.campaignLogsGet);
  const {
    loading: loadingLogs,
    error: errorLogs,
    data: logs,
  } = campaignLogsGet;

  useEffect(() => {}, [dispatch]);

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
        `${analyticsV1}/getAllCampaignLogs?campaignId=${campaignId}`
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
    const days = calculateDaysPlayed(
      campaignDetails?.startDate,
      campaignDetails?.endDate
    );
    const totalDays = campaignDetails?.duration;
    const delivered = screenLevelData[data]?.slotsDelivered?.toFixed(0);

    const promised = screenLevelData[data]?.slotsPromised?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    return Number((result * 0.01)?.toFixed(2));
  };

  const costConsumedData = (data: string) => {
    const days = calculateDaysPlayed(
      campaignDetails?.startDate,
      campaignDetails?.endDate
    );
    const totalDays = campaignDetails?.duration;
    const delivered = screenLevelData?.[data]?.costConsumed?.toFixed(0);

    const promised = screenLevelData[data]?.costTaken?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    return Number((result * 0.01)?.toFixed(2));
  };
  const impressionsDeliveredPositive = (data: string) => {
    const days = calculateDaysPlayed(
      campaignDetails?.startDate,
      campaignDetails?.endDate
    );
    const totalDays = campaignDetails?.duration;
    const delivered = screenLevelData?.[data]?.impressionsDelivered?.toFixed(0);

    const promised = screenLevelData[data]?.impressionsPromised?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    return Number((result * 0.01)?.toFixed(2));
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
              <h1 className="text-[14px] ">Monitoring</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] ">Logs</h1>
            </th>
          </tr>
        </thead>
        <tbody className=" max-h-[250px] overflow-scroll">
          {screenLevelData &&
            Object.keys(screenLevelData)?.length &&
            Object.keys(screenLevelData)
              ?.filter((d: any) => d !== "totalData")
              ?.map((data: any, index: any) => (
                <React.Fragment key={index}>
                  <tr
                    key={data}
                    className="flex w-full h-[40px] hover:bg-gray-100 hover:rounded-[6px] border-b text-[#0E212E]"
                  >
                    <td className="w-full flex items-center justify-center">
                      <p className="text-[12px]">{index + 1}</p>
                    </td>
                    <td className="w-full flex items-center justify-center truncate">
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
                            screenLevelData[
                              data
                            ]?.impressionsDelivered?.toFixed(0)
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
                    <td
                      className="w-full flex items-center justify-center"
                      onClick={() => {
                        // console.log("Logs clicked...")

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
                    >
                      <i className="fi fi-sr-picture text-[12px] text-[#129BFF]"></i>
                    </td>
                    <td className="w-full flex items-center justify-center">
                      <div className="flex gap-4">
                        <i
                          className={`fi fi-sr-eye text-[12px] text-[#129BFF]`}
                          onClick={() => {
                            dispatch(
                              GetCampaignLogsAction(
                                screenLevelData[data]?.campaignId
                              )
                            );
                            setscreenName(screenLevelData[data]?.screenName);
                            setOpenLogsPopup(true);
                          }}
                        ></i>
                        <i
                          className={`fi fi-sr-download text-[12px] text-[#129BFF] ${
                            isDownLoad == screenLevelData[data]?.campaignId
                              ? "text-gray-400"
                              : "text-[#129BFF]"
                          }`}
                          onClick={() => {
                            if (isDownLoad != screenLevelData[data]?.campaignId)
                              downloadLogs(screenLevelData[data]?.campaignId);
                            else
                              message.warning(
                                "Please wait..., data has start fetching"
                              );
                          }}
                        ></i>
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
                                  Expected :{" "}
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
                                  Actual :{" "}
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
                                ]?.slotsDelivered?.toFixed(
                                  0
                                )}/${screenLevelData[
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
