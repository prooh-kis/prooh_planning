import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { DashBoardHardwarePerformanceGraph } from "../../components/segments/DashBoardHardwarePerformanceGraph";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHardwarePerformanceDataForPlannerDashboard } from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const HardwarePerformanceSegment = ({
  campaignId,
  setShowPercent,
  showPercent,
  screenLevelData,
  filters,
  setFilters,
  dataToShow,
}: any) => {
console.log(dataToShow);
  const dispatch = useDispatch<any>();
  const {
    loading: loadingHardwarePerformanceData,
    data: hardwarePerformanceData,
  } = useSelector(
    (state: any) => state.hardwarePerformanceDataForPlannerDashboard
  );

  const getHardwarePerformanceData = () => {
    const datesArray = Object.keys(hardwarePerformanceData?.hardwarePerformanceData)?.map((date: any) => date);
    const countsArray = Object.values(hardwarePerformanceData?.hardwarePerformanceData)?.map((slot: any) => slot);
    return { datesArray, countsArray };
  };

  const handleClick = ({type, value, checked}: any) => {
    setFilters((prev: any) => ({
      ...prev,
      cities: {
        ...prev.cities,
        screenPerformance: 
          type == "city" && checked ? 
            [...prev.cities.screenPerformance, value] :
          type == "city" && checked && value == "all" ? 
            [] :
          type == "city" && !checked ? 
            filters.cities.screenPerformance.filter((f: any) => f !== value) :
          filters.cities.screenPerformance,
      },
      touchPoints: {
        ...prev.touchPoints,
        screenPerformance:
          type == "touchpoint" && checked ?
            [...prev.touchPoints.screenPerformance, value] :
          type == "touchpoint" && checked && value == "all" ? 
            [] :
          type == "touchpoint" && !checked ?
            filters.touchPoints.screenPerformance.filter((f: any) => f !== value) :
          filters.touchPoints.screenPerformance,
      },
      screenTypes: {
        ...prev.screenTypes,
        screenPerformance:
          type == "screenType" && checked ?
            [...prev.screenTypes.screenPerformance, value] :
          type == "screenType" && checked && value == "all" ? 
            [] :
          type == "screenType" && !checked ?
            filters.screenTypes.screenPerformance.filter((f: any) => f !== value) :
          filters.screenTypes.screenPerformance,
      },
    }));
  }

  // Initialize filters based on spot data
  useEffect(() => {
  if (hardwarePerformanceData && (filters.cities.screenPerformance.length == 0 || filters.touchPoints.screenPerformance.length == 0 || filters.screenTypes.screenPerformance.length == 0)) {
    setFilters((prev: any) => ({
      ...prev,
      cities: {
        ...prev.cities,
        screenPerformance: Object.keys(hardwarePerformanceData.cityWiseData),
      },
      touchPoints: {
        ...prev.touchPoints,
        screenPerformance: Object.keys(hardwarePerformanceData.touchPointWiseData),
      },
      screenTypes: {
        ...prev.screenTypes,
        screenPerformance: Object.keys(hardwarePerformanceData.screenTypeWiseData),
      },
    }));
  }
}, [hardwarePerformanceData, filters, setFilters]);
  

  useEffect(() => {
    if (filters && campaignId && !hardwarePerformanceData) {
      dispatch(
        getHardwarePerformanceDataForPlannerDashboard({
          id: campaignId,
          cities: filters.cities.screenPerformance?.filter((f: any) => f !== "all"),
          touchPoints: filters.touchPoints.screenPerformance?.filter((f: any) => f !== "all"),
          screenTypes: filters.screenTypes.screenPerformance?.filter((f: any) => f !== "all"),
        })
      );
    }
  },[dispatch, campaignId, filters, hardwarePerformanceData])


  return (
    <div className="w-full h-full">
      {loadingHardwarePerformanceData && (
        <div className="h-[240px] border border-gray-100 rounded-[12px] shadow-sm">
          <LoadingScreen />
        </div>
      )}
      {hardwarePerformanceData && (
        <div className="grid grid-cols-5 gap-2 ">
          <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
            <div className="border-b">
              <SectionHeader
                iconClass="fi-ss-screen"
                title="Screen Performance"
                bgColor=" bg-[#6982FF]"
                dataValue={
                  <h1 className="text-[12px] font-semibold truncate">
                    Total-{dataToShow.hardwarePerformanceDelivered.toFixed(0)}%
                    <span className="text-[#D7D7D7]">
                      /{dataToShow.hardwarePerformancePromisedTillDate.toFixed(0)}%
                    </span>  
                  </h1>
                }
                subHeading={"Maxima represent 100% screen performance "}
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
                  bgColor=" bg-[#6982FF]"
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
                        checked={filters.cities["screenPerformance"]?.includes(cityKey)}
                        textSize={"10px"}
                        color={"#D7D7D7"}
                        onChange={(checked) => handleClick({
                          type: "city",
                          value: cityKey,
                          checked: checked
                        })}
                      />
                    </div>
                    <div className="flex items-center w-full gap-2">
                      <MultiColorLinearBar2
                        delivered={hardwarePerformanceData.cityWiseData[cityKey]?.hardwarePerformanceDelivered}
                        expected={hardwarePerformanceData.cityWiseData[cityKey]?.hardwarePerformancePromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                        total={hardwarePerformanceData.cityWiseData[cityKey]?.hardwarePerformancePromised}
                        deliveredColor="bg-[#6982FF]"
                        expectedColor="bg-[#CFC7FF]"
                        totalColor="bg-[#DFE5FF]"
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
                  bgColor=" bg-[#6982FF]"
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
                        checked={filters.touchPoints["screenPerformance"]?.includes(tpKey)}
                        textSize={"10px"}
                        color={"#D7D7D7"}
                        onChange={(checked) => handleClick({
                          type: "touchpoint",
                          value: tpKey,
                          checked: checked
                        })}
                      />
                    </div>
                    <div className="flex items-center w-full gap-2">
                      <MultiColorLinearBar2
                        delivered={hardwarePerformanceData.touchPointWiseData[tpKey]?.hardwarePerformanceDelivered}
                        expected={hardwarePerformanceData.touchPointWiseData[tpKey]?.hardwarePerformancePromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                        total={hardwarePerformanceData.touchPointWiseData[tpKey]?.hardwarePerformancePromised}
                        deliveredColor="bg-[#6982FF]"
                        expectedColor="bg-[#CFC7FF]"
                        totalColor="bg-[#DFE5FF]"
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
                  bgColor=" bg-[#6982FF]"
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
                        checked={filters.screenTypes["screenPerformance"]?.includes(stKey)}
                        textSize={"10px"}
                        color={"#D7D7D7"}
                        onChange={(checked) => handleClick({
                          type: "screenType",
                          value: stKey,
                          checked: checked
                        })}
                      />
                    </div>
                    <div className="flex items-center w-full gap-2">
                      <MultiColorLinearBar2
                        delivered={hardwarePerformanceData.screenTypeWiseData[stKey]?.hardwarePerformanceDelivered}
                        expected={hardwarePerformanceData.screenTypeWiseData[stKey]?.hardwarePerformancePromised * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                        total={hardwarePerformanceData.screenTypeWiseData[stKey]?.hardwarePerformancePromised}
                        deliveredColor="bg-[#6982FF]"
                        expectedColor="bg-[#CFC7FF]"
                        totalColor="bg-[#DFE5FF]"
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
      )}

    </div>

  )
}