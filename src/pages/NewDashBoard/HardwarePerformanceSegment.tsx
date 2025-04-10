import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { DashBoardHardwarePerformanceGraph } from "../../components/segments/DashBoardHardwarePerformanceGraph";

export const HardwarePerformanceSegment = ({
  hardwarePerformanceData = [],
  setShowPercent,
  showPercent,
  screenLevelData,
}: any) => {


  const getHardwarePerformanceData = () => {
    const datesArray = Object.keys(hardwarePerformanceData?.spotDeliveryData)?.map((date: any) => date);
    const countsArray = Object.values(hardwarePerformanceData?.spotDeliveryData).map((slot: any) => slot);
    return { datesArray, countsArray };
  };

  return (
    <div className="grid grid-cols-5 gap-2 ">
      <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeader
            iconClass="fi-ss-screen"
            title="Spot Delivery"
            bgColor=" bg-[#77BFEF]"
          />
        </div>
        <div className="p-2">
          <DashBoardHardwarePerformanceGraph
            currentData={getHardwarePerformanceData().countsArray}
            labels={getHardwarePerformanceData().datesArray}
          />
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-2">
        <div className="col-span-1 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
          <div className="border-b">
            <SectionHeaderWithSwitch
              iconClass="fi-sr-marker"
              title="Cities"
              bgColor=" bg-[#77BFEF]"
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
              switchShow={false}
            />
          </div>
          <div className="py-2">
            {Object.keys(hardwarePerformanceData.cityWiseData)?.map((cityKey: any, i: any) => (
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
                    delivered={hardwarePerformanceData.cityWiseData[cityKey]?.hardwarePerformanceDelivered}
                    expected={hardwarePerformanceData.cityWiseData[cityKey]?.hardwarePerformancePromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={hardwarePerformanceData.cityWiseData[cityKey]?.hardwarePerformancePromised}
                    deliveredColor="bg-[#77BFEF]"
                    expectedColor="bg-[#CFC7FF]"
                    totalColor="bg-[#D3EDFF]"
                    height="h-[5px]"
                  />
                  <h1 className="text-[10px]">
                    {formatNumber(hardwarePerformanceData.cityWiseData[cityKey]?.hardwarePerformanceDelivered.toFixed(0))}%
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
              bgColor=" bg-[#77BFEF]"
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
              switchShow={false}
            />
          </div>
          <div className="py-2">
            {Object.keys(hardwarePerformanceData.touchPointWiseData)?.map((tpKey: any, i: any) => (
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
                    delivered={hardwarePerformanceData.touchPointWiseData[tpKey]?.hardwarePerformanceDelivered}
                    expected={hardwarePerformanceData.touchPointWiseData[tpKey]?.hardwarePerformancePromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={hardwarePerformanceData.touchPointWiseData[tpKey]?.hardwarePerformancePromised}
                    deliveredColor="bg-[#77BFEF]"
                    expectedColor="bg-[#CFC7FF]"
                    totalColor="bg-[#D3EDFF]"
                    height="h-[5px]"
                  />
                  <h1 className="text-[10px]">
                    {formatNumber(hardwarePerformanceData.touchPointWiseData[tpKey]?.hardwarePerformanceDelivered.toFixed(0))}%
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
          <div className="border-b">
            <SectionHeaderWithSwitch
              iconClass="fi-sr-computer"
              title="Screen Types"
              bgColor=" bg-[#77BFEF]"
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
              switchShow={false}
            />
          </div>
          <div className="py-2">
            {Object.keys(hardwarePerformanceData.screenTypeWiseData)?.map((stKey: any, i: any) => (
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
                    delivered={hardwarePerformanceData.screenTypeWiseData[stKey]?.hardwarePerformanceDelivered}
                    expected={hardwarePerformanceData.screenTypeWiseData[stKey]?.hardwarePerformancePromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={hardwarePerformanceData.screenTypeWiseData[stKey]?.hardwarePerformancePromised}
                    deliveredColor="bg-[#77BFEF]"
                    expectedColor="bg-[#CFC7FF]"
                    totalColor="bg-[#D3EDFF]"
                    height="h-[5px]"
                  />
                  <h1 className="text-[10px]">
                    {formatNumber(hardwarePerformanceData.screenTypeWiseData[stKey]?.hardwarePerformanceDelivered.toFixed(0))}%
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