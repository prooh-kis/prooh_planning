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

  const isSlotDeliveryPositive = (data: string) => {
    return Number(
      (screenLevelData[data]?.slotsPromised *
        calculateDaysPlayed(
          campaignDetails?.startDate,
          campaignDetails?.endDate
        )) /
        campaignDetails?.duration -
        screenLevelData[data]?.slotsDelivered.toFixed(0)
    ) > 0
      ? true
      : false;
  };

  const isCostConsumedPositive = (data: string) => {
    return Number(
      (
        (screenLevelData[data]?.costTaken?.toFixed(0) *
          calculateDaysPlayed(
            campaignDetails?.startDate,
            campaignDetails?.endDate
          )) /
          campaignDetails?.duration -
        screenLevelData?.[data]?.costConsumed?.toFixed(0)
      )?.toFixed(0)
    ) > 0
      ? true
      : false;
  };
  const impressionsDeliveredPositive = (data: string) => {
    return Number(
      (
        (screenLevelData[data]?.impressionsPromised?.toFixed(0) *
          calculateDaysPlayed(
            campaignDetails?.startDate,
            campaignDetails?.endDate
          )) /
          campaignDetails?.duration -
        screenLevelData?.[data]?.impressionsDelivered?.toFixed(0)
      )?.toFixed(0)
    ) > 0
      ? true
      : false;
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
        <thead className="bg-[#F7F7F7] w-full flex justify-between items-center">
          <tr className="flex w-full items-center h-[40px]">
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Sr.</h1>
            </th>
            <th className="w-full flex items-center justify-center truncate">
              <h1 className="text-[14px] text-[#21394F] truncate">
                Screen Name
              </h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Location</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Touchpoint</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Days</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Spots</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Impressions</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Cost</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Delivery</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Monitoring</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Logs</h1>
            </th>
          </tr>
        </thead>
        <tbody className="overflow-scroll">
          {screenLevelData &&
            Object.keys(screenLevelData)?.length &&
            Object.keys(screenLevelData)
              ?.filter((d: any) => d !== "totalData")
              ?.map((data: any, index: any) => (
                <React.Fragment key={index}>
                  <tr key={data} className="flex w-full h-[40px] hover:bg-[#D7D7D7]">
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
                        {screenLevelData[data]?.durationPromised}
                      </p>
                    </td>
                    <td className="w-full flex items-center justify-center">
                      <div className="flex flex-row justify-center items-center gap-1">
                        <p className="text-[12px]">
                          {formatNumber(screenLevelData[data]?.slotsDelivered)}
                        </p>
                        <p
                          className={`text-[10px] ${
                            isSlotDeliveryPositive(data)
                              ? "text-[#2A892D]"
                              : "text-[#CC0000]"
                          }`}
                        >
                          {" "}
                          {`(${formatNumber(
                            (
                              (screenLevelData[data]?.slotsPromised *
                                calculateDaysPlayed(
                                  campaignDetails?.startDate,
                                  campaignDetails?.endDate
                                )) /
                                campaignDetails?.duration -
                              screenLevelData[data]?.slotsDelivered
                            ).toFixed(0)
                          )})`}
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
                            impressionsDeliveredPositive(data)
                              ? "text-[#2A892D]"
                              : "text-[#CC0000]"
                          }`}
                        >
                          {" "}
                          {`(${formatNumber(
                            (
                              (screenLevelData[
                                data
                              ]?.impressionsPromised?.toFixed(0) *
                                calculateDaysPlayed(
                                  campaignDetails?.startDate,
                                  campaignDetails?.endDate
                                )) /
                                campaignDetails?.duration -
                              screenLevelData?.[
                                data
                              ]?.impressionsDelivered?.toFixed(0)
                            )?.toFixed(0)
                          )})`}
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
                            isCostConsumedPositive(data)
                              ? "text-[#2A892D]"
                              : "text-[#CC0000]"
                          }`}
                        >
                          {`(${formatNumber(
                            (
                              (screenLevelData[data]?.costTaken?.toFixed(0) *
                                calculateDaysPlayed(
                                  campaignDetails?.startDate,
                                  campaignDetails?.endDate
                                )) /
                                campaignDetails?.duration -
                              screenLevelData?.[data]?.costConsumed?.toFixed(0)
                            )?.toFixed(0)
                          )})`}
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
                        <div className="col-span-3 bg-[#FFFFFF] py-4 rounded-[12px] border border-gray-100">
                          <div className="flex items-center gap-2 px-4 py-1">
                            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">
                              Day Wise Spot Delivered
                            </h1>
                            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
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
                            />
                          </div>
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
