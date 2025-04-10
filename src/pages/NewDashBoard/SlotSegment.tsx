import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";

export const SlotSegment = ({
  spotData = [],
  setShowPercent,
  showPercent,
  screenLevelData,
}: any) => {


  const getSpotDeliveryData = () => {
    const datesArray = Object.keys(spotData?.spotDeliveryData)?.map((date: any) => date);
    const countsArray = Object.values(spotData?.spotDeliveryData).map((slot: any) => slot);
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
          <DashBoardSlotGraph
            currentData={getSpotDeliveryData().countsArray}
            labels={getSpotDeliveryData().datesArray}
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
            />
          </div>
          <div className="py-2">
            {Object.keys(spotData.cityWiseData)?.map((cityKey: any, i: any) => (
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
                    delivered={spotData.cityWiseData[cityKey]?.slotsDelivered}
                    expected={spotData.cityWiseData[cityKey]?.slotsPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={spotData.cityWiseData[cityKey]?.slotsPromised}
                  />
                  <h1 className="text-[10px]">
                    {showPercent[1] ? `${(spotData.cityWiseData[cityKey]?.slotsDelivered*100/spotData.cityWiseData[cityKey]?.slotsPromised).toFixed(0)}%` : formatNumber(spotData.cityWiseData[cityKey]?.slotsDelivered)}
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
            />
          </div>
          <div className="py-2">
            {Object.keys(spotData.touchPointWiseData)?.map((tpKey: any, i: any) => (
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
                    delivered={spotData.touchPointWiseData[tpKey]?.slotsDelivered}
                    expected={spotData.touchPointWiseData[tpKey]?.slotsPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={spotData.touchPointWiseData[tpKey]?.slotsPromised}
                  />
                  <h1 className="text-[10px]">
                    {showPercent[2] ? `${(spotData.touchPointWiseData[tpKey]?.slotsDelivered*100/spotData.touchPointWiseData[tpKey]?.slotsPromised).toFixed(0)}%` : formatNumber(spotData.touchPointWiseData[tpKey]?.slotsDelivered)}
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
            />
          </div>
          <div className="py-2">
            {Object.keys(spotData.screenTypeWiseData)?.map((stKey: any, i: any) => (
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
                    delivered={spotData.screenTypeWiseData[stKey]?.slotsDelivered}
                    expected={spotData.screenTypeWiseData[stKey]?.slotsPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={spotData.screenTypeWiseData[stKey]?.slotsPromised}
                  />
                  <h1 className="text-[10px]">
                    {showPercent[3] ? `${(spotData.screenTypeWiseData[stKey]?.slotsDelivered*100/spotData.screenTypeWiseData[stKey]?.slotsPromised).toFixed(0)}%` : formatNumber(spotData.screenTypeWiseData[stKey]?.slotsDelivered)}
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