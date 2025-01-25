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
        className={`fi ${iconClass} text-lg flex items-center justify-center`}
      ></i>
    </div>
    <h1 className="text-lg font-bold truncate">{title}</h1>
    <i className="fi fi-br-info text-gray-400 text-lg flex items-center justify-center"></i>
  </div>
);

export const DashboardGrid: React.FC<BarChartProps> = ({
  campaignDetails,
  type,
  screenLevelData,
}) => {
  return (
    <div className="w-full">
      {type === "duration" ? (
        <div>
          <SectionHeader
            iconClass="fi-rr-calendar text-violet"
            title="Campaign Duration"
          />
          <div className="p-2 sm:p-4">
            <h1 className="text-2xl md:text-3xl text-gray-400">
              <span className="text-gray-900">
                {calculateDaysPlayed(
                  campaignDetails?.startDate,
                  campaignDetails?.endDate
                )}
                <span className="text-[18px]"> {"  "}Days</span>
              </span>{" "}
              / {campaignDetails?.duration}{" "}
              <span className="text-[18px]">Days</span>
            </h1>
          </div>
          <div className="p-2 sm:p-4">
            <LinearBar
              value={calculateDaysPlayed(
                campaignDetails?.startDate,
                campaignDetails?.endDate
              )}
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
          <div className="p-2 sm:p-4">
            <h1 className="text-2xl md:text-3xl text-gray-400">
              <span className="text-gray-900">
                {formatNumber(
                  screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(
                    0
                  )
                )}
              </span>{" "}
              /{" "}
              {formatNumber(
                screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(
                  0
                )
              )}
            </h1>
          </div>
          <div className="p-2 sm:p-4">
            <MultiColorLinearBar2
              delivered={screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(
                0
              )}
              expected={
                (screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(
                  0
                ) *
                  getNumberOfDaysBetweenTwoDates(
                    campaignDetails?.startDate,
                    new Date()
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
            iconClass="fi-rs-dashboard text-[#3f33bb]"
            title="Screen Performance"
          />
          <div className="p-2 sm:p-4">
            <h1 className="text-2xl md:text-3xl text-gray-400">
              <span className="text-gray-900">
                {formatNumber(
                  screenLevelData?.result?.totalData?.screenPerformance?.toFixed(
                    0
                  )
                )}
                %
              </span>{" "}
              / 100%
            </h1>
          </div>
          <div className="p-2 sm:p-4">
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
          <div className="p-2 sm:p-4">
            <h1 className="text-2xl md:text-3xl text-gray-400">
              <span className="text-gray-900">
                {formatNumber(
                  screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(0)
                )}
              </span>{" "}
              /{" "}
              {formatNumber(
                screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0)
              )}
            </h1>
          </div>
          <div className="p-2 sm:p-4">
            <MultiColorLinearBar2
              delivered={screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(
                0
              )}
              expected={
                (screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0) *
                  getNumberOfDaysBetweenTwoDates(
                    campaignDetails?.startDate,
                    new Date()
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
          <div className="p-2 sm:p-4">
            <h1 className="text-2xl md:text-3xl text-gray-400">
              <span className="text-gray-900">
                &#8377;
                {formatNumber(
                  screenLevelData?.result?.totalData?.costConsumed?.toFixed(0)
                )}
              </span>{" "}
              / &#8377;
              {formatNumber(
                screenLevelData?.result?.totalData?.costTaken?.toFixed(0)
              )}
            </h1>
          </div>
          <div className="p-2 sm:p-4">
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
