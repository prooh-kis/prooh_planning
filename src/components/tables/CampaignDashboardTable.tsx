import { useEffect, useState } from "react"
import { formatNumber } from "../../utils/formatValue"
import { useDispatch, useSelector } from "react-redux";
import { GetCampaignLogsAction, GetCampaignMonitoringPicsAction } from "../../actions/campaignAction";
import { ShowCampaignLogsPopup } from "../../components/popup/ShowCampaignLogsPopup";
import { ShowMonitoringPicsPopup } from "../../components/popup/ShowMonitoringPics";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";

interface CostSummartTabelProps {
  screenLevelData?: any,
  campaignDetails?: any
}

export const CampaignDashboardTable = ({
  screenLevelData,
  campaignDetails
}: CostSummartTabelProps) => {
  const dispatch = useDispatch<any>();

  const [openLogsPopup, setOpenLogsPopup] = useState<any>(false);
  const [openMonitoringPicsPopup, setOpenMonitoringPicsPopup] = useState<any>(false);
  const [screenId, setScreenId] = useState<any>(null);

  const [screenName, setscreenName] = useState<any>(null);
  const campaignLogsGet = useSelector((state: any) => state.campaignLogsGet);
  const {
    loading: loadingLogs,
    error: errorLogs,
    data: logs
  } = campaignLogsGet;


  useEffect(() => {
    
  },[dispatch]);

  const onClose = () => {
    setOpenLogsPopup(false);
    setOpenMonitoringPicsPopup(false)
    setScreenId(null);
  }
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
              <h1 className="text-[14px] text-[#21394F] truncate">Screen Name</h1>
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
          {screenLevelData && Object.keys(screenLevelData)?.length && Object.keys(screenLevelData)?.filter((d: any) => d !== "totalData")?.map((data: any, index: any) => (
            <tr key={data} className="flex w-full h-[40px]">
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">{index + 1}</p>
              </td>
              <td className="w-full flex items-center justify-center truncate">
                <p className="text-[12px] truncate px-1">{screenLevelData[data]?.screenName}</p>
              </td>
              <td className="w-full flex items-center justify-center truncate">
                <p className="text-[12px] truncate">{screenLevelData[data]?.location}</p>
              </td>
              <td className="w-full flex items-center justify-center truncate">
                <p className="text-[12px] truncate">{screenLevelData[data]?.touchPoint}</p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">{screenLevelData[data]?.durationPromised}</p>
              </td>
              <td className="w-full flex items-center justify-center">
                <div className="flex flex-row justify-center items-center gap-1">
                  <p className="text-[12px]">
                    {screenLevelData[data]?.slotsDelivered}
                  </p>
                  <p className="text-[10px] text-red">
                    {`(-${screenLevelData[data]?.slotsPromised * getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date()) / campaignDetails?.duration - screenLevelData[data]?.slotsDelivered})`}
                  </p>
                </div>
                
              </td>
              <td className="w-full flex items-center justify-center">
                <div className="flex flex-row justify-center items-center gap-1">
                  <p className="text-[12px]">
                    {formatNumber(screenLevelData[data]?.impressionsDelivered?.toFixed(0))}
                  </p>
                  <p className="text-[10px] text-red">
                    {`(-${(screenLevelData[data]?.impressionsPromised?.toFixed(0) * getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date()) / campaignDetails?.duration - screenLevelData?.[data]?.impressionsDelivered?.toFixed(0))?.toFixed(0)})`}
                  </p>
                </div>
              </td>
              <td className="w-full flex items-center justify-center">
                <div className="flex flex-row justify-center items-center gap-1">
                  <p className="text-[12px]">
                    {formatNumber(screenLevelData[data]?.costConsumed?.toFixed(0))}
                  </p>
                  <p className="text-[10px] text-red">
                    {`(-${(screenLevelData[data]?.costTaken?.toFixed(0) * getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date()) / campaignDetails?.duration - screenLevelData?.[data]?.costConsumed?.toFixed(0))?.toFixed(0)})`}
                  </p>
                </div>
              </td>
              <td className="w-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-1">
                  <p className="text-[12px]">
                    {(screenLevelData?.[data]?.slotsDelivered * 100 / screenLevelData?.[data]?.slotsPromised)?.toFixed(2)} %
                  </p>
                </div>
              </td>
              <td className="w-full flex items-center justify-center"
                onClick={() => {
                  // console.log("Logs clicked...")

                  dispatch(GetCampaignMonitoringPicsAction({
                    campaignId: screenLevelData[data]?.campaignId,
                    screenId: data,
                    date: campaignDetails.startDate,
                  }));
                  setScreenId(data);
                  setOpenMonitoringPicsPopup(true);

                }}
              >
                <i className="fi fi-sr-picture text-[12px] text-[#129BFF]"></i>
              </td>
              <td className="w-full flex items-center justify-center"
                onClick={() => {
                  dispatch(GetCampaignLogsAction(screenLevelData[data]?.campaignId));
                  setscreenName(screenLevelData[data]?.screenName);
                  setOpenLogsPopup(true);
                }}
              >
                <i className="fi fi-sr-eye text-[12px] text-[#129BFF]"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}
