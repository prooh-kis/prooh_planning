import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { DashBoardCostGraph } from "../../components/segments/DashBoardCostGraph";

export const CostSegment = ({
  costData = [],
  setShowPercent,
  showPercent,
  screenLevelData,
}: any) => {


  const getCostData = () => {
    const datesArray = Object.keys(costData?.costData)?.map((date: any) => date);
    const countsArray = Object.values(costData?.costData).map((slot: any) => slot);
    return { datesArray, countsArray };
  };

  return (
    <div className="grid grid-cols-5 gap-2 ">
    <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
      <div className="border-b">
        <SectionHeader
          iconClass="fi-ss-sack"
          title="Cost Consumed"
          bgColor=" bg-[#6DBC48]"
        />
      </div>
      <div className="p-2">
        <DashBoardCostGraph
          currentData={getCostData().countsArray}
          labels={getCostData().datesArray}
        />
      </div>
    </div>
    <div className="col-span-3 grid grid-cols-3 gap-2">
      <div className="col-span-1 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeaderWithSwitch
            iconClass="fi-sr-marker"
            title="Cities"
            bgColor=" bg-[#6DBC48]"
            showPercent={showPercent?.[1]}
            setShowPercent={() => {
              setShowPercent(() => {
                return {
                  1: !showPercent?.[1],
                  2: showPercent?.[2],
                  3: showPercent?.[3]
                }
              });
            }}
          />
        </div>
        <div className="py-2">
          {Object.keys(costData.cityWiseData)?.map((cityKey: any, i: any) => (
            <div key={i} className="flex items-center gap-2 pt-1">
              <div>
                <CheckboxInput
                  disabled={false}
                  label={cityKey.toUpperCase()}
                  checked={true}
                  textSize={"10px"}
                  color={"#D7D7D7"}
                  onChange={() => {}}
                />
              </div>
              <div className="flex items-center w-full gap-2">
                <MultiColorLinearBar2
                  delivered={costData.cityWiseData[cityKey]?.costConsumed}
                  expected={costData.cityWiseData[cityKey]?.costPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                  total={costData.cityWiseData[cityKey]?.costPromised}
                  deliveredColor="bg-[#64AB42]"
                  expectedColor="bg-[#CFC7FF]"
                  totalColor="bg-[#E1FFD3]"
                  height="h-[5px]"
                />
                <h1 className="text-[10px]">
                  {showPercent[1] ? `${(costData.cityWiseData[cityKey]?.costConsumed*100/costData.cityWiseData[cityKey]?.costPromised).toFixed(0)}%` : formatNumber(costData.cityWiseData[cityKey]?.costConsumed)}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeaderWithSwitch
            iconClass="fi-sr-land-location"
            title="Touchpoints"
            bgColor=" bg-[#6DBC48]"
            showPercent={showPercent?.[2]}
            setShowPercent={() => {
              setShowPercent(() => {
                return {
                  1: showPercent?.[1],
                  2: !showPercent?.[2],
                  3: showPercent?.[3]
                }
              });
            }}
          />
        </div>
        <div className="py-2">
          {Object.keys(costData.touchPointWiseData)?.map((tpKey: any, i: any) => (
            <div key={i} className="flex items-center gap-2 pt-1">
              <div>
                <CheckboxInput
                  disabled={false}
                  label={tpKey.toUpperCase()}
                  checked={true}
                  textSize={"10px"}
                  color={"#D7D7D7"}
                  onChange={() => {}}
                />
              </div>
              <div className="flex items-center w-full gap-2">
                <MultiColorLinearBar2
                  delivered={costData.touchPointWiseData[tpKey]?.costConsumed}
                  expected={costData.touchPointWiseData[tpKey]?.costPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                  total={costData.touchPointWiseData[tpKey]?.costPromised}
                  deliveredColor="bg-[#64AB42]"
                  expectedColor="bg-[#CFC7FF]"
                  totalColor="bg-[#E1FFD3]"
                  height="h-[5px]"
                />
                <h1 className="text-[10px]">
                  {showPercent[2] ? `${(costData.touchPointWiseData[tpKey]?.costConsumed*100/costData.touchPointWiseData[tpKey]?.costPromised).toFixed(0)}%` : formatNumber(costData.touchPointWiseData[tpKey]?.costConsumed)}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeaderWithSwitch
            iconClass="fi-sr-land-location"
            title="Touchpoints"
            bgColor=" bg-[#6DBC48]"
            showPercent={showPercent?.[3]}
            setShowPercent={() => {
              setShowPercent(() => {
                return {
                  1: showPercent?.[1],
                  2: showPercent?.[2],
                  3: !showPercent?.[3]
                }
              });
            }}
          />
        </div>
        <div className="py-2">
          {Object.keys(costData.screenTypeWiseData)?.map((stKey: any, i: any) => (
            <div key={i} className="flex items-center gap-2 pt-1">
              <div>
                <CheckboxInput
                  disabled={false}
                  label={stKey.toUpperCase()}
                  checked={true}
                  textSize={"10px"}
                  color={"#D7D7D7"}
                  onChange={() => {}}
                />
              </div>
              <div className="flex items-center w-full gap-2">
                <MultiColorLinearBar2
                  delivered={costData.screenTypeWiseData[stKey]?.costConsumed}
                  expected={costData.screenTypeWiseData[stKey]?.costPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                  total={costData.screenTypeWiseData[stKey]?.costPromised}
                  deliveredColor="bg-[#64AB42]"
                  expectedColor="bg-[#CFC7FF]"
                  totalColor="bg-[#E1FFD3]"
                  height="h-[5px]"
                />
                <h1 className="text-[10px]">
                  {showPercent[3] ? `${(costData.screenTypeWiseData[stKey]?.costConsumed*100/costData.screenTypeWiseData[stKey]?.costPromised).toFixed(0)}%` : formatNumber(costData.screenTypeWiseData[stKey]?.costConsumed)}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}