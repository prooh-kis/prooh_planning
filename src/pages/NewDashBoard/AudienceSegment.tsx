import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";

export const AudienceSegment = ({
  audienceData = [],
  setShowPercent,
  showPercent,
  screenLevelData,
}: any) => {


  return (
    <div className="grid grid-cols-5 gap-2 ">

      <div className="col-span-3 grid grid-cols-3 gap-2">
        <div className="col-span-1 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
          <div className="border-b">
            <SectionHeaderWithSwitch
              iconClass="fi-sr-marker"
              title="Cities"
              bgColor=" bg-[#129BFF]"
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
            {Object.keys(audienceData.cityWiseData)?.map((cityKey: any, i: any) => (
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
                    delivered={audienceData.cityWiseData[cityKey]?.impressionDelivered}
                    expected={audienceData.cityWiseData[cityKey]?.impressionPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={audienceData.cityWiseData[cityKey]?.impressionPromised}
                    deliveredColor="bg-[#129BFF]"
                    expectedColor="bg-[#CFC7FF]"
                    totalColor="bg-[#D3EDFF]"
                    height="h-[5px]"
                  />
                  <h1 className="text-[10px]">
                    {showPercent[1] ? `${(audienceData.cityWiseData[cityKey]?.impressionDelivered*100/audienceData.cityWiseData[cityKey]?.impressionPromised).toFixed(0)}%` : formatNumber(audienceData.cityWiseData[cityKey]?.impressionDelivered)}
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
              bgColor=" bg-[#129BFF]"
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
            {Object.keys(audienceData.touchPointWiseData)?.map((tpKey: any, i: any) => (
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
                    delivered={audienceData.touchPointWiseData[tpKey]?.impressionDelivered}
                    expected={audienceData.touchPointWiseData[tpKey]?.impressionPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={audienceData.touchPointWiseData[tpKey]?.impressionPromised}
                    deliveredColor="bg-[#129BFF]"
                    expectedColor="bg-[#CFC7FF]"
                    totalColor="bg-[#D3EDFF]"
                    height="h-[5px]"
                  />
                  <h1 className="text-[10px]">
                    {showPercent[2] ? `${(audienceData.touchPointWiseData[tpKey]?.impressionDelivered*100/audienceData.touchPointWiseData[tpKey]?.impressionPromised).toFixed(0)}%` : formatNumber(audienceData.touchPointWiseData[tpKey]?.impressionDelivered)}
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
              bgColor=" bg-[#129BFF]"
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
            {Object.keys(audienceData.screenTypeWiseData)?.map((stKey: any, i: any) => (
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
                    delivered={audienceData.screenTypeWiseData[stKey]?.impressionDelivered}
                    expected={audienceData.screenTypeWiseData[stKey]?.impressionPromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                    total={audienceData.screenTypeWiseData[stKey]?.impressionPromised}
                    deliveredColor="bg-[#129BFF]"
                    expectedColor="bg-[#CFC7FF]"
                    totalColor="bg-[#D3EDFF]"
                    height="h-[5px]"
                  />
                  <h1 className="text-[10px]">
                    {showPercent[3] ? `${(audienceData.screenTypeWiseData[stKey]?.impressionDelivered*100/audienceData.screenTypeWiseData[stKey]?.impressionPromised).toFixed(0)}%` : formatNumber(audienceData.screenTypeWiseData[stKey]?.impressionDelivered)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeader
            iconClass="fi-ss-screen"
            title="Audience Type"
            bgColor=" bg-[#129BFF]"
          />
        </div>
        <div className="p-2">
          <div className="grid grid-cols-10">
              <div className="col-span-4">
                <h1 className="text-[12px]">Category</h1>
              </div>
              <div className="col-span-6 grid grid-cols-6 flex items-center w-full gap-2">
                <div className="col-span-5 flex items-center justify-around w-full gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-[2px] bg-[#5863FF]" />
                    <h1 className="text-[12px]">Male</h1>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-[2px] bg-[#DC97FF]" />
                    <h1 className="text-[12px]">Female</h1>
                  </div>
                </div>
                <div className="cols-span-1 text-[10px]">
                  <h1 className="text-[12px]">
                    Value
                  </h1>
                </div>
              </div>
          </div>
          <div className="h-[160px] overflow-y-auto no-scrollbar">
            {Object.keys(audienceData.audienceTypeData)?.map((audienceType: any, i: any) => (
              <div key={i} className="grid grid-cols-10 flex items-center gap-2 pt-1">
                <div className="col-span-4 truncate py-1">
                  <h1 className="text-[10px] truncate">{audienceType.toUpperCase()}</h1>
                </div>
                <div className="col-span-6 grid grid-cols-6 flex items-center w-full gap-2">
                  <div className="col-span-5 flex items-center w-full gap-2">
                    <MultiColorLinearBar2
                      delivered={audienceData.audienceTypeData[audienceType]?.impressionDeliveredMale}
                      expected={audienceData.audienceTypeData[audienceType]?.impressionPromisedMale * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                      total={audienceData.audienceTypeData[audienceType]?.impressionPromisedMale}
                      deliveredColor="bg-[#5863FF]"
                      expectedColor="bg-[#CFC7FF]"
                      totalColor="bg-[#DFE5FF]"
                      height="h-[5px]"
                    />
                    <MultiColorLinearBar2
                      delivered={audienceData.audienceTypeData[audienceType]?.impressionDeliveredFemale}
                      expected={audienceData.audienceTypeData[audienceType]?.impressionPromisedFemale * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                      total={audienceData.audienceTypeData[audienceType]?.impressionPromisedFemale}
                      deliveredColor="bg-[#DC97FF]"
                      expectedColor="bg-[#CFC7FF]"
                      totalColor="bg-[#F9ECFF]"
                      height="h-[5px]"
                    />
                  </div>
                  <div className="col-span-1">
                    <h1 className="text-[10px]">
                      {showPercent[3] && showPercent[2] && showPercent[1] ? `${(audienceData.audienceTypeData[audienceType]?.impressionDeliveredTotal*100/audienceData.audienceTypeData[audienceType]?.impressionPromisedTotal).toFixed(0)}%` : formatNumber(audienceData.audienceTypeData[audienceType]?.impressionDeliveredTotal)}
                    </h1>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}