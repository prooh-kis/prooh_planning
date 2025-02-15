import {
  calculateDaysPlayed,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import { LinearBar } from "./linearbar";
import { MultiColorLinearBar2 } from "./MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";

interface BarChartProps {
  campaignDetails?: any;
  type?: any;
  screenLevelData?: any;
}

// Reusable Header Component
const SectionHeader: React.FC<{ iconClass: string; title: string }> = ({
  iconClass,
  title,
}) => (
  <div className="flex items-center gap-2">
    <div className="rounded-full bg-gray-100 p-2">
      <i
        className={`fi ${iconClass} text-[14px] flex items-center justify-center`}
      ></i>
    </div>
    <h1 className="text-[14px] text-[#0E212E] leading-[16.94px] truncate">
      {title}
    </h1>
    <i className="fi fi-br-info text-[#BCBCBC] text-[14px] flex items-center justify-center"></i>
  </div>
);

export const DashboardGrid: React.FC<BarChartProps> = ({
  campaignDetails,
  type,
  screenLevelData,
}) => {
  const calculateSpot = () => {
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
    const delivered =
      screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(0);

    const promised =
      screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0);
    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    const averagePromised = Number((promised / totalDays).toFixed(2));

    return Number(((result / averagePromised) * 100)?.toFixed(2));
  };

  const calculateAudience = () => {
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
    const delivered =
      screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(0);

    const promised =
      screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    const averagePromised = Number((promised / totalDays).toFixed(2));

    return Number(((result / averagePromised) * 100)?.toFixed(2));
  };

  const calculateCost = () => {
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
    const delivered =
      screenLevelData?.result?.totalData?.costConsumed?.toFixed(0);

    const promised = screenLevelData?.result?.totalData?.costTaken?.toFixed(0);

    const result =
      Number((delivered / days).toFixed(2)) -
      Number((promised / totalDays).toFixed(2));

    const averagePromised = Number((promised / totalDays).toFixed(2));

    return Number(((result / averagePromised) * 100)?.toFixed(2));
  };
  return (
    <div className="w-full">
      {type === "duration" ? (
        <div>
          <SectionHeader
            iconClass="fi-rr-calendar text-[#8079F9]"
            title="Campaign Duration"
          />
          <div className="mt-4">
            <h1 className="text-[24px] font-semibold  leading-[32.68px] text-[#BCBCBC]">
              <span className="text-[#0E212E]">
                {calculateDaysPlayed(
                  campaignDetails?.startDate,
                  campaignDetails?.endDate
                ) > 0
                  ? calculateDaysPlayed(
                      campaignDetails?.startDate,
                      campaignDetails?.endDate
                    )
                  : 1}
              </span>
              /{campaignDetails?.duration} <span> Days</span>
            </h1>
          </div>
          <div className="mt-4">
            <LinearBar
              value={
                calculateDaysPlayed(
                  campaignDetails?.startDate,
                  campaignDetails?.endDate
                ) === 0
                  ? 1
                  : calculateDaysPlayed(
                      campaignDetails?.startDate,
                      campaignDetails?.endDate
                    )
              }
              colors={["#00000020", "#7AB3A2"]}
              highest={campaignDetails?.duration}
              percent={false}
            />
          </div>
        </div>
      ) : type === "audience" ? (
        <div>
          <SectionHeader
            iconClass="fi-rr-target-audience text-blue"
            title="Audience Impressions"
          />
          <div className="mt-4">
            <h1 className="text-[24px] font-semibold  leading-[32.68px] text-[#BCBCBC]">
              <span className="text-[#0E212E]">
                {formatNumber(
                  screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(
                    0
                  ) || 0
                )}
              </span>{" "}
              /{" "}
              {formatNumber(
                screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(
                  0
                ) || 0
              )}
              <span
                className={`text-[14px] ${
                  calculateAudience() > 0 ? "text-[#2A892D]" : "text-[#CC0000]"
                }`}
              >
                {" "}
                {`(${formatNumber(calculateAudience() || 0)}%)`}
                {calculateAudience() > 0 ? (
                  <i className="fi fi-rr-arrow-up "></i>
                ) : (
                  <i className="fi fi-rr-arrow-down "></i>
                )}
              </span>
            </h1>
          </div>
          <div className="mt-4">
            <MultiColorLinearBar2
              delivered={screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(
                0
              )}
              expected={
                (screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(
                  0
                ) *
                  calculateDaysPlayed(
                    campaignDetails?.startDate,
                    campaignDetails?.endDate
                  )) /
                campaignDetails?.duration
              }
              total={screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(
                0
              )}
            />
          </div>
        </div>
      ) : type === "screen" ? (
        <div>
          <SectionHeader
            iconClass="fi-rs-dashboard text-[#B077FF]"
            title="Screen Performance"
          />
          <div className="mt-4">
            <h1 className="text-[24px] font-semibold  leading-[32.68px] text-[#BCBCBC]">
              <span className="text-[#0E212E]">
                {formatNumber(
                  screenLevelData?.result?.totalData?.screenPerformance?.toFixed(
                    0
                  ) || 0
                )}
                %
              </span>{" "}
              / 100%
            </h1>
          </div>
          <div className="mt-4">
            <LinearBar
              value={screenLevelData?.result?.totalData?.screenPerformance?.toFixed(
                0
              )}
              colors={["#00000020", "#7AB3A2"]}
              highest={100}
            />
          </div>
        </div>
      ) : type === "spot" ? (
        <div>
          <SectionHeader
            iconClass="fi-rs-selling text-indigo"
            title="Spot Delivery"
          />
          <div className="mt-4">
            <h1 className="text-[24px] font-semibold  leading-[32.68px] text-[#BCBCBC]">
              <span className="text-[#0E212E]">
                {formatNumber(
                  screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(
                    0
                  ) || 0
                )}
              </span>{" "}
              /{" "}
              {formatNumber(
                screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0) ||
                  0
              )}
              <span
                className={`text-[14px] ${
                  calculateSpot() > 0 ? "text-[#2A892D]" : "text-[#CC0000]"
                }`}
              >
                {" "}
                {`(${formatNumber(calculateSpot() || 0)}%)`}
                {calculateSpot() > 0 ? (
                  <i className="fi fi-rr-arrow-up "></i>
                ) : (
                  <i className="fi fi-rr-arrow-down "></i>
                )}
              </span>
            </h1>
          </div>
          <div className="mt-4">
            <MultiColorLinearBar2
              delivered={screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(
                0
              )}
              expected={
                (screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0) *
                  calculateDaysPlayed(
                    campaignDetails?.startDate,
                    campaignDetails?.endDate
                  )) /
                campaignDetails?.duration
              }
              total={screenLevelData?.result?.totalData?.slotsPromised?.toFixed(
                0
              )}
            />
          </div>
        </div>
      ) : type === "cost" ? (
        <div>
          <SectionHeader
            iconClass="fi-br-sack text-green"
            title="Cost Consumed"
          />
          <div className="mt-4">
            <h1 className="text-[24px] font-semibold  leading-[32.68px] text-[#BCBCBC]">
              <span className="text-[#0E212E]">
                &#8377;
                {formatNumber(
                  screenLevelData?.result?.totalData?.costConsumed?.toFixed(
                    0
                  ) || 0
                )}
              </span>{" "}
              / &#8377;
              {formatNumber(
                screenLevelData?.result?.totalData?.costTaken?.toFixed(0) || 0
              )}
              <span
                className={`text-[14px] ${
                  calculateCost() > 0 ? "text-[#2A892D]" : "text-[#CC0000]"
                }`}
              >
                {" "}
                {`(${formatNumber(calculateCost() || 0)}%)`}
                {calculateCost() > 0 ? (
                  <i className="fi fi-rr-arrow-up "></i>
                ) : (
                  <i className="fi fi-rr-arrow-down "></i>
                )}
              </span>
            </h1>
          </div>
          <div className="mt-4">
            <LinearBar
              percent={false}
              value={screenLevelData?.result?.totalData?.costConsumed?.toFixed(
                0
              )}
              colors={["#00000020", "#7AB3A2"]}
              highest={screenLevelData?.result?.totalData?.costTaken?.toFixed(
                0
              )}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
