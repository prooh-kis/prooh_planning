import {
  calculateDaysPlayed,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import { LinearBar } from "./linearbar";
import { MultiColorLinearBar2 } from "./MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { Tooltip } from "antd";
import { MyToolTip } from "./MyToolTip";
import { calculateScreenTimePercentage } from "../../utils/dashboadUtils";

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
    <h1 className="text-[16px] text-[#0E212E] leading-[19.36px] truncate">
      {title}
    </h1>
    <MyToolTip label="My label" />
  </div>
);

const MyGrid = ({
  upper1,
  upper2,
  lower1,
  lower2,
  lower3,
  delivered,
  expected,
  total,
  iconClass,
  title,
}: any) => {
  return (
    <div>
      <SectionHeader iconClass={iconClass} title={title} />
      <div className="mt-4">
        <h1 className="text-[20px] font-semibold  leading-[24.2px] tracking-tight  text-[#9BB3C9]">
          <span className="text-[#0E212E]">{upper1}</span>/{upper2}
        </h1>
      </div>
      <div className="mt-2">
        <MultiColorLinearBar2
          delivered={delivered}
          expected={expected}
          total={total}
        />
      </div>
      <div className="mt-2">
        <h1 className="text-[16px] font-medium  leading-[19.36px] tracking-tight  text-[#9BB3C9]">
          <span className="text-[#0E212E]">{lower1}</span> / {lower2}
          <span
            className={`text-[14px] ${
              lower3 > 0 ? "text-[#2A892D]" : "text-[#CC0000]"
            }`}
          >
            {" "}
            {`(${formatNumber(lower3 || 0)}%)`}
            {lower3 > 0 ? (
              <i className="fi fi-rr-arrow-up "></i>
            ) : (
              <i className="fi fi-rr-arrow-down "></i>
            )}
          </span>
        </h1>
      </div>
    </div>
  );
};

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
            <h1 className="text-[20px] font-semibold  leading-[24.2px] tracking-tight  text-[#9BB3C9]">
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
          <div className="mt-2">
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
          <div className="mt-2">
            <h1 className="text-[16px] font-medium  leading-[19.36px] tracking-tight  text-[#9BB3C9]">
              <span className="text-[#3B8518]">
                {calculateScreenTimePercentage()}{" "}
              </span>
              Duration Completed
            </h1>
          </div>
        </div>
      ) : type === "audience" ? (
        <MyGrid
          upper1={formatNumber(
            screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(
              0
            ) || 0
          )}
          upper2={formatNumber(
            screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(
              0
            ) || 0
          )}
          lower1={formatNumber(
            screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(
              0
            ) || 0
          )}
          lower2={formatNumber(
            screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(
              0
            ) || 0
          )}
          lower3={calculateAudience()}
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
          iconClass="fi-rr-target-audience text-blue"
          title="Audience Impressions"
        />
      ) : type === "screen" ? (
        <MyGrid
          upper1={`${formatNumber(
            screenLevelData?.result?.totalData?.screenPerformance?.toFixed(0) ||
              0
          )}
                %`}
          upper2={`100%`}
          lower1={`${formatNumber(
            screenLevelData?.result?.totalData?.screenPerformance?.toFixed(0) ||
              0
          )}%`}
          lower2={`100%`}
          lower3={calculateAudience()}
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
          total={screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0)}
          iconClass="fi-rs-dashboard text-[#B077FF]"
          title="Hardware Performance"
        />
      ) : type === "spot" ? (
        <MyGrid
          upper1={formatNumber(
            screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(0) || 0
          )}
          upper2={formatNumber(
            screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0) || 0
          )}
          lower1={formatNumber(
            screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(0) || 0
          )}
          lower2={formatNumber(
            screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0) || 0
          )}
          lower3={calculateSpot()}
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
          total={screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0)}
          iconClass="fi-rs-selling text-indigo"
          title="Spot Delivery"
        />
      ) : type === "cost" ? (
        <MyGrid
          upper1={formatNumber(
            screenLevelData?.result?.totalData?.costConsumed?.toFixed(0) || 0
          )}
          upper2={formatNumber(
            screenLevelData?.result?.totalData?.costTaken?.toFixed(0) || 0
          )}
          lower1={formatNumber(
            screenLevelData?.result?.totalData?.costConsumed?.toFixed(0) || 0
          )}
          lower2={formatNumber(
            screenLevelData?.result?.totalData?.costTaken?.toFixed(0) || 0
          )}
          lower3={calculateCost()}
          delivered={screenLevelData?.result?.totalData?.costConsumed?.toFixed(
            0
          )}
          expected={screenLevelData?.result?.totalData?.costTaken?.toFixed(0)}
          total={screenLevelData?.result?.totalData?.costTaken?.toFixed(0)}
          iconClass="fi-br-sack text-green"
          title="Cost Consumed"
        />
      ) : null}
    </div>
  );
};
