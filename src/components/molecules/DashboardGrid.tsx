import { calculateDaysPlayed } from "../../utils/dateAndTimeUtils";
import { LinearBar } from "./linearbar";
import { MultiColorLinearBar2 } from "./MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { Tooltip } from "antd";

interface BarChartProps {
  campaignDetails?: {
    startDate: string;
    endDate: string;
  };
  type: string;
  screenLevelData?: {
    durationDelivered: number;
    durationPromised: number;
    impressionsDelivered: number;
    impressionsPromised: number;
    impressionsPromisedTillDate: number;
    slotsDelivered: number;
    slotsPromised: number;
    slotsPromisedTillDate: number;
    costConsumed: number;
    costTaken: number;
    costTakenTillDate: number;
    screenPerformance: number;
    result?: {
      totalData?: {
        screenPerformance: number;
      };
    };
  };
}

interface SectionHeaderProps {
  iconClass: string;
  title: string;
  bgColor: string;
}

interface ValueDisplayProps {
  left: string | number;
  right: string | number;
  isPositive?: boolean;
  value?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  iconClass,
  title,
  bgColor,
}) => (
  <div className="flex items-center gap-2 pb-2">
    <div className={`rounded-full p-2 ${bgColor}`}>
      <i
        className={`fi ${iconClass} text-[14px] text-white flex items-center justify-center`}
      ></i>
    </div>
    <h1 className="text-[14px] text-[#0E212E] leading-[16.94px] truncate">
      {title}
    </h1>
    <Tooltip title="">
      <i className="fi fi-br-info text-[14px] text-[#b2c1ca]"></i>
    </Tooltip>
  </div>
);

const ValueAboveGraph: React.FC<
  Omit<ValueDisplayProps, "isPositive" | "value">
> = ({ left, right }) => (
  <div className="mt-1">
    <h1 className="text-[20px] font-bold text-[#9bb3c9]">
      <span className="text-[#0E212E]">{left}</span> / {right}
    </h1>
  </div>
);

const ValueBelowGraph: React.FC<ValueDisplayProps> = ({
  left,
  right,
  isPositive = true,
  value,
}) => (
  <div className="mt-1">
    <h1 className="text-[16px] font-medium leading-[32.68px] text-[#9bb3c9]">
      <span className="text-[#0E212E]">{left}</span> / {right}
      {value !== undefined && (
        <span className={isPositive ? "text-[#2A892D]" : "text-[#CC0000]"}>
          {` (${value}%)`}
          <i
            className={`fi ${
              isPositive ? "fi-rr-arrow-up" : "fi-rr-arrow-down"
            }`}
          ></i>
        </span>
      )}
    </h1>
  </div>
);

const getPercentageDifference = (
  delivered: number,
  promised: number,
  totalDays: number
): number => {
  const averageDelivered = delivered / totalDays;
  const averagePromised = promised / totalDays;
  const difference = averageDelivered - averagePromised;
  return Number(((difference / averagePromised) * 100).toFixed(2));
};

export const DashboardGrid: React.FC<BarChartProps> = ({
  campaignDetails,
  type,
  screenLevelData,
}) => {
  const getDaysPlayed = (): number => {
    const days = calculateDaysPlayed(
      campaignDetails?.startDate,
      campaignDetails?.endDate
    );
    return days === 0 ? 1 : days;
  };

  const daysPlayed = getDaysPlayed();
  const durationPromised = screenLevelData?.durationPromised || 0;

  const renderDurationSection = () => (
    <>
      <SectionHeader
        iconClass="fi-sr-calendar-clock"
        title="Campaign Duration"
        bgColor=" bg-[#DC6700]"
      />
      <div className="mt-1">
        <h1 className="text-[20px] font-bold leading-[32.68px] text-[#9bb3c9]">
          <span className="text-[#0E212E]">
            {screenLevelData?.durationDelivered || 1}
          </span>
          /{durationPromised} <span>Days</span>
        </h1>
      </div>
      <div className="mt-1">
        <LinearBar
          value={screenLevelData?.durationDelivered || 1}
          colors={["#D1E5F7", "#DC6700"]}
          highest={durationPromised}
          percent={false}
        />
      </div>
      <div className="mt-1">
        <h1 className="text-[#9BB3C9] text-[16px] font-medium">
          <span className="text-[#3B8518]">
            {Math.round(
              ((screenLevelData?.durationDelivered || 0) / durationPromised) *
                100
            )}
            %{"  "}
          </span>
          Duration Completed
        </h1>
      </div>
    </>
  );

  const renderAudienceSection = () => {
    const impressionsDelivered = screenLevelData?.impressionsDelivered || 0;
    const impressionsPromised = screenLevelData?.impressionsPromised || 0;
    const impressionsTillDate =
      screenLevelData?.impressionsPromisedTillDate || 0;
    const percentage = getPercentageDifference(
      impressionsDelivered,
      impressionsTillDate,
      screenLevelData?.durationDelivered || 0
    );

    return (
      <>
        <SectionHeader
          iconClass="fi fi-sr-users"
          title="Audience Impressions"
          bgColor=" bg-[#129BFF]"
        />
        <ValueAboveGraph
          left={formatNumber(impressionsDelivered)}
          right={formatNumber(impressionsPromised)}
        />
        <div className="mt-1">
          <MultiColorLinearBar2
            delivered={impressionsDelivered}
            expected={(impressionsPromised * daysPlayed) / durationPromised}
            total={impressionsPromised}
          />
        </div>
        <ValueBelowGraph
          left={formatNumber(impressionsDelivered)}
          right={formatNumber(impressionsTillDate)}
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  const renderScreenSection = () => {
    const screenPerformance = screenLevelData?.screenPerformance || 0;
    const percentage = getPercentageDifference(
      screenPerformance,
      100,
      screenLevelData?.durationDelivered || 0
    );

    return (
      <>
        <SectionHeader
          iconClass="fi-sr-dashboard"
          title="Hardware Performance"
          bgColor=" bg-[#6982FF]"
        />
        <ValueAboveGraph
          left={`${formatNumber(screenPerformance)}%`}
          right="100%"
        />
        <div className="mt-1">
          <LinearBar
            value={screenLevelData?.result?.totalData?.screenPerformance || 0}
            colors={["#D1E5F7", "#DC6700"]}
            highest={100}
          />
        </div>
        <ValueBelowGraph
          left={`${formatNumber(screenPerformance)}%`}
          right="100%"
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  const renderSpotSection = () => {
    const slotsDelivered = screenLevelData?.slotsDelivered || 0;
    const slotsPromised = screenLevelData?.slotsPromised || 0;
    const slotsTillDate = screenLevelData?.slotsPromisedTillDate || 0;
    const percentage = getPercentageDifference(
      slotsDelivered,
      slotsTillDate,
      screenLevelData?.durationDelivered || 0
    );

    return (
      <>
        <SectionHeader
          iconClass="fi-ss-screen"
          title="Spot Delivery"
          bgColor=" bg-[#77BFEF]"
        />
        <ValueAboveGraph
          left={formatNumber(slotsDelivered)}
          right={formatNumber(slotsPromised)}
        />
        <div className="mt-1">
          <MultiColorLinearBar2
            delivered={slotsDelivered}
            expected={(slotsPromised * daysPlayed) / durationPromised}
            total={slotsPromised}
          />
        </div>
        <ValueBelowGraph
          left={formatNumber(slotsDelivered)}
          right={formatNumber(slotsTillDate)}
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  const renderCostSection = () => {
    const costConsumed = screenLevelData?.costConsumed || 0;
    const costTaken = screenLevelData?.costTaken || 0;
    const costTillDate = screenLevelData?.costTakenTillDate || 0;
    const percentage = getPercentageDifference(
      costConsumed,
      costTillDate,
      screenLevelData?.durationDelivered || 0
    );

    return (
      <>
        <SectionHeader
          iconClass="fi-ss-sack"
          title="Cost Consumed"
          bgColor=" bg-[#6DBC48]"
        />
        <ValueAboveGraph
          left={formatNumber(costConsumed)}
          right={formatNumber(costTaken)}
        />
        <div className="mt-1">
          <MultiColorLinearBar2
            delivered={costConsumed}
            expected={(costTaken * daysPlayed) / durationPromised}
            total={costTaken}
          />
        </div>
        <ValueBelowGraph
          left={formatNumber(costConsumed)}
          right={formatNumber(costTillDate)}
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  return (
    <div className="w-full">
      {type === "duration" && renderDurationSection()}
      {type === "audience" && renderAudienceSection()}
      {type === "screen" && renderScreenSection()}
      {type === "spot" && renderSpotSection()}
      {type === "cost" && renderCostSection()}
    </div>
  );
};
