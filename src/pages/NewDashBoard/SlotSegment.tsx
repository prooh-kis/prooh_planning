import { DashBoardSlotGraph } from "../../components/segments/DashBoardSlotGraph";
import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { SectionHeaderWithSwitch } from "../../components/segments/SectionHeaderWithSwitch";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDeliveryDataForPlannerDashboard } from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { Tooltip } from "antd";
import { getUserRole } from "../../utils/campaignUtils";
import { calculateDayTypes, getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";

export const SlotSegment = ({
  campaignId,
  setShowPercent,
  showPercent,
  screenLevelData,
  filters,
  setFilters,
  dataToShow,
  campaignDetails,
  userInfo,
}: any) => {
  const dispatch = useDispatch<any>();

  const { loading: loadingSpotData, data: spotData } = useSelector(
    (state: any) => state.spotDeliveryDataForPlannerDashboard
  );

  const getSpotDeliveryData = () => {
    const datesArray = Object.keys(spotData?.spotDeliveryData)?.map(
      (date: any) => date
    );
    const countsArray = Object.values(spotData?.spotDeliveryData).map(
      (slot: any) => slot
    );
    return { datesArray, countsArray };
  };

  const handleClick = ({ type, value, checked }: any) => {
    setFilters((prev: any) => ({
      ...prev,
      cities: {
        ...prev.cities,
        spotDelivery:
          type == "city" && checked && value == "all"
            ? Object.keys(spotData.cityWiseData)
            : type == "city" && checked
            ? [...prev.cities.spotDelivery, value]
            : type == "city" && !checked && filters.cities.spotDelivery.length !== 1
            ? filters.cities.spotDelivery.filter((f: any) => f !== value && f !== "all")
            : filters.cities.spotDelivery,
      },
      touchPoints: {
        ...prev.touchPoints,
        spotDelivery:
          type == "touchpoint" && checked && value == "all"
            ? Object.keys(spotData.touchPointWiseData)
            : type == "touchpoint" && checked
            ? [...prev.touchPoints.spotDelivery, value]
            
            : type == "touchpoint" && !checked && filters.touchPoints.spotDelivery.length !== 1
            ? filters.touchPoints.spotDelivery.filter((f: any) => f !== value && f !== "all")
            : filters.touchPoints.spotDelivery,
      },
      screenTypes: {
        ...prev.screenTypes,
        spotDelivery:
          type == "screenType" && checked && value == "all"
            ? Object.keys(spotData.screenTypeWiseData)
            : type == "screenType" && checked
            ? [...prev.screenTypes.spotDelivery, value]
            : type == "screenType" && !checked && filters.screenTypes.spotDelivery.length !== 1
            ? filters.screenTypes.spotDelivery.filter((f: any) => f !== value && f !== "all")
            : filters.screenTypes.spotDelivery,
      },
      dayTypes: {
        ...prev.dayTypes,
        spotDelivery:
          type == "dayType" && checked && value == "all"
            ? Object.keys(spotData.dayWiseData)
            : type == "dayType" && checked
            ? [...prev.dayTypes.spotDelivery, value]
            : type == "dayType" && !checked && filters.dayTypes.spotDelivery.length !== 1
            ? filters.dayTypes.spotDelivery.filter((f: any) => f !== value && f !== "all")
            : filters.dayTypes.spotDelivery,
      },
      timezones: {
        ...prev.timezones,
        spotDelivery:
          type == "timezone" && checked && value == "all"
            ? Object.keys(spotData.timeWiseData)
            : type == "timezone" && checked
            ? [...prev.timezones.spotDelivery, value]
            : type == "timezone" && !checked && filters.timezones.spotDelivery.length !== 1
            ? filters.timezones.spotDelivery.filter((f: any) => f !== value && f !== "all")
            : filters.timezones.spotDelivery,
      },
    }));
  };

  // Initialize filters based on spot data
  useEffect(() => {
    if (
      spotData &&
      (filters.cities.spotDelivery.length == 0 ||
        filters.touchPoints.spotDelivery.length == 0 ||
        filters.screenTypes.spotDelivery.length == 0)
    ) {
      setFilters((prev: any) => ({
        ...prev,
        cities: {
          ...prev.cities,
          spotDelivery: Object.keys(spotData.cityWiseData),
        },
        touchPoints: {
          ...prev.touchPoints,
          spotDelivery: Object.keys(spotData.touchPointWiseData),
        },
        screenTypes: {
          ...prev.screenTypes,
          spotDelivery: Object.keys(spotData.screenTypeWiseData),
        },
        dayTypes: {
          ...prev.dayTypes,
          spotDelivery: Object.keys(spotData.dayWiseData),
        },
        timezones: {
          ...prev.timezones,
          spotDelivery: Object.keys(spotData.timeWiseData),
        },
      }));
    }
  }, [spotData, filters, setFilters]);

  useEffect(() => {
    if (filters && campaignId && !spotData) {
      dispatch(
        getSpotDeliveryDataForPlannerDashboard({
          id: campaignId,
          userRole: getUserRole(userInfo?.userRole),
          userId: userInfo?._id,
          cities: filters.cities.spotDelivery?.filter((f: any) => f !== "all"),
          touchPoints: filters.touchPoints.spotDelivery?.filter(
            (f: any) => f !== "all"
          ),
          screenTypes: filters.screenTypes.spotDelivery?.filter(
            (f: any) => f !== "all"
          ),
          dayTypes: filters.dayTypes.spotDelivery?.filter(
            (f: any) => f !== "all"
          ),
          timezones: filters.timezones.spotDelivery?.filter(
            (f: any) => f !== "all"
          ),
        })
      );
    }
  }, [dispatch, campaignId, filters, spotData, userInfo]);

  return (
    <div className="h-full w-full">
      {loadingSpotData && (
        <div className="h-[240px] bg-[#FFFFFF] border border-gray-100 rounded-[12px] shadow-sm">
          <LoadingScreen />
        </div>
      )}
      {spotData && (
        <div className="w-full">
          <div className="w-full bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
            <div className="border-b">
              <SectionHeader
                iconClass="fi-ss-screen"
                title="Spot Delivery"
                bgColor=" bg-[#77BFEF]"
                dataValue={
                  <Tooltip
                    title={`Av. slots delivered per day / Av. slots promised per day`}
                  >
                    <h1 className={`text-[12px] font-semibold truncate`}>
                      <span className={`${
                          dataToShow.slotsDelivered.toFixed(0)/ screenLevelData?.data?.durationDelivered > 
                          dataToShow.slotsPromisedTillDate.toFixed(0)/screenLevelData?.data?.durationDelivered
                          ? "text-[#4DB37E]" : "text-[#EF4444]"
                        }`}>
                        Actual ({formatNumber(dataToShow.slotsDelivered.toFixed(0)/ screenLevelData?.data?.durationDelivered)}) 
                      </span>
                      <span className="text-[#0E212E]">
                        / 
                        Promised ({formatNumber(
                          dataToShow.slotsPromisedTillDate.toFixed(0)/screenLevelData?.data?.durationDelivered
                        )})
                      </span>
                    </h1>
                  </Tooltip>
                }
                subHeading={
                  "Maxima represent total spots delivered along with extra slots delivered"
                }
              />
            </div>
            <div className="p-2">
              <DashBoardSlotGraph
                allData={spotData?.spotDeliveryData}
                currentData={getSpotDeliveryData().countsArray}
                labels={getSpotDeliveryData().datesArray}
                campaignDetails={campaignDetails}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 pt-2">
            <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-marker"
                  title="Cities"
                  bgColor=" bg-[#77BFEF]"
                  showPercent={showPercent?.[1]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        1: !showPercent?.[1],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(spotData.cityWiseData)?.map(
                  (cityKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={filters.cities["spotDelivery"]?.includes(
                            cityKey
                          ) && filters.cities["spotDelivery"]?.length === 1}
                          label={cityKey.toUpperCase()}
                          checked={filters.cities["spotDelivery"]?.includes(
                            cityKey
                          )}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "city",
                              value: cityKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 flex items-center w-full gap-2">
                        <div className="col-span-3">
                          <MultiColorLinearBar2
                            delivered={
                              spotData.cityWiseData[cityKey]
                                ?.totalSlotsDelivered
                            }
                            expected={
                              (spotData.cityWiseData[cityKey]?.slotsPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              spotData.cityWiseData[cityKey]?.slotsPromised
                            }
                            deliveredColor="bg-[#77BFEF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#D3EDFF]"
                            height="h-[5px]"
                          />
                        </div>
                        <h1 className="text-[10px] col-span-1">
                          {showPercent[1]
                            ? `${(
                                (spotData.cityWiseData[cityKey]
                                  ?.totalSlotsDelivered *
                                  100) /
                                spotData.cityWiseData[cityKey]?.slotsPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                spotData.cityWiseData[cityKey]
                                  ?.totalSlotsDelivered
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-land-location"
                  title="Touchpoints"
                  bgColor=" bg-[#77BFEF]"
                  showPercent={showPercent?.[2]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        2: !showPercent?.[2],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(spotData.touchPointWiseData)?.map(
                  (tpKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={filters.touchPoints["spotDelivery"]?.includes(
                            tpKey
                          ) && filters.touchPoints["spotDelivery"]?.length === 1}
                          label={tpKey.toUpperCase()}
                          checked={filters.touchPoints["spotDelivery"].includes(
                            tpKey
                          )}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "touchpoint",
                              value: tpKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 flex items-center w-full gap-2">
                        <div className="col-span-3">
                          <MultiColorLinearBar2
                            delivered={
                              spotData.touchPointWiseData[tpKey]
                                ?.totalSlotsDelivered
                            }
                            expected={
                              (spotData.touchPointWiseData[tpKey]
                                ?.slotsPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              spotData.touchPointWiseData[tpKey]?.slotsPromised
                            }
                            deliveredColor="bg-[#77BFEF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#D3EDFF]"
                            height="h-[5px]"
                          />
                        </div>
                        <h1 className="text-[10px] col-span-1">
                          {showPercent[2]
                            ? `${(
                                (spotData.touchPointWiseData[tpKey]
                                  ?.totalSlotsDelivered *
                                  100) /
                                spotData.touchPointWiseData[tpKey]
                                  ?.slotsPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                spotData.touchPointWiseData[tpKey]
                                  ?.totalSlotsDelivered
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-computer"
                  title="Screen Types"
                  bgColor=" bg-[#77BFEF]"
                  showPercent={showPercent?.[3]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        3: !showPercent?.[3],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(spotData.screenTypeWiseData)?.map(
                  (stKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={filters.screenTypes["spotDelivery"]?.includes(
                            stKey
                          ) && filters.screenTypes["spotDelivery"]?.length === 1}
                          label={stKey.toUpperCase()}
                          checked={filters.screenTypes["spotDelivery"].includes(
                            stKey
                          )}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "screenType",
                              value: stKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 flex items-center w-full gap-2">
                        <div className="col-span-3">
                          <MultiColorLinearBar2
                            delivered={
                              spotData.screenTypeWiseData[stKey]
                                ?.totalSlotsDelivered
                            }
                            expected={
                              (spotData.screenTypeWiseData[stKey]
                                ?.slotsPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              spotData.screenTypeWiseData[stKey]?.slotsPromised
                            }
                            deliveredColor="bg-[#77BFEF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#D3EDFF]"
                            height="h-[5px]"
                          />
                        </div>
                        <h1 className="text-[10px] col-span-1">
                          {showPercent[3]
                            ? `${(
                                (spotData.screenTypeWiseData[stKey]
                                  ?.totalSlotsDelivered *
                                  100) /
                                spotData.screenTypeWiseData[stKey]
                                  ?.slotsPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                spotData.screenTypeWiseData[stKey]
                                  ?.totalSlotsDelivered
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-land-location"
                  title="Day Types"
                  bgColor=" bg-[#77BFEF]"
                  showPercent={showPercent?.[4]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        4: !showPercent?.[4],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(spotData.dayWiseData)?.map(
                  (dayKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div className="">
                        <CheckboxInput
                          disabled={filters.dayTypes["spotDelivery"]?.includes(
                            dayKey
                          ) && filters.dayTypes["spotDelivery"]?.length === 1}
                          label={dayKey.toUpperCase()}
                          checked={filters.dayTypes["spotDelivery"].includes(
                            dayKey
                          )}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "dayType",
                              value: dayKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 flex items-center w-full gap-2"
                      // onClick={() => {
                      //   console.log(spotData.dayWiseData?.[dayKey]);
                      //   console.log(spotData.dayWiseData?.[dayKey].slotsPromised);
                      //   console.log(screenLevelData?.data);
                      //   console.log("days remaining", getNumberOfDaysBetweenTwoDates(new Date(), campaignDetails.endDate))
                      //   console.log("total day types", calculateDayTypes(campaignDetails?.startDate, new Date()))
                      //   console.log("day types till now", calculateDayTypes(campaignDetails?.startDate, new Date())?.[dayKey as keyof typeof calculateDayTypes])
                      // }}
                      >
                        <div className="col-span-3">
                          <MultiColorLinearBar2
                            delivered={
                              spotData.dayWiseData[dayKey]?.totalSlotsDelivered
                            }
                            expected={
                              ((spotData.dayWiseData[dayKey]?.slotsPromised * calculateDayTypes(campaignDetails?.startDate, new Date())?.[dayKey as keyof typeof calculateDayTypes])/
                              calculateDayTypes(campaignDetails?.startDate, campaignDetails?.endDate)?.[dayKey as keyof typeof calculateDayTypes])
                            }
                            total={spotData.dayWiseData[dayKey]?.slotsPromised}
                            deliveredColor="bg-[#77BFEF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#D3EDFF]"
                            height="h-[5px]"
                          />
                        </div>
                        <h1 className="text-[10px] col-span-1">
                          {showPercent[4]
                            ? `${(
                                (spotData.dayWiseData[dayKey]
                                  ?.totalSlotsDelivered *
                                  100) /
                                spotData.dayWiseData[dayKey]?.slotsPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                spotData.dayWiseData[dayKey]
                                  ?.totalSlotsDelivered
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
              <div className="border-b">
                <SectionHeaderWithSwitch
                  iconClass="fi-sr-computer"
                  title="Time Zones"
                  bgColor=" bg-[#77BFEF]"
                  showPercent={showPercent?.[5]}
                  setShowPercent={() => {
                    setShowPercent((pre: any) => {
                      return {
                        ...pre,
                        5: !showPercent?.[5],
                      };
                    });
                  }}
                />
              </div>
              <div className="py-2">
                {Object.keys(spotData.timeWiseData)?.map(
                  (timeKey: any, i: any) => (
                    <div key={i} className="flex items-center gap-2 pt-1">
                      <div>
                        <CheckboxInput
                          disabled={filters.timezones["spotDelivery"]?.includes(
                            timeKey
                          ) && filters.timezones["spotDelivery"]?.length === 1}
                          label={timeKey.toUpperCase()}
                          checked={filters.timezones["spotDelivery"].includes(
                            timeKey
                          )}
                          textSize={"10px"}
                          color={"#0E212E"}
                          onChange={(checked) =>
                            handleClick({
                              type: "timezone",
                              value: timeKey,
                              checked: checked,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 flex items-center w-full gap-2">
                        <div className="col-span-3">
                          <MultiColorLinearBar2
                            delivered={
                              spotData.timeWiseData[timeKey]
                                ?.totalSlotsDelivered
                            }
                            expected={
                              (spotData.timeWiseData[timeKey]?.slotsPromised *
                                (screenLevelData?.data?.durationDelivered ||
                                  1)) /
                              screenLevelData?.data?.durationPromised
                            }
                            total={
                              spotData.timeWiseData[timeKey]?.slotsPromised
                            }
                            deliveredColor="bg-[#77BFEF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#D3EDFF]"
                            height="h-[5px]"
                          />
                        </div>
                        <h1 className="text-[10px] col-span-1">
                          {showPercent[5]
                            ? `${(
                                (spotData.timeWiseData[timeKey]
                                  ?.totalSlotsDelivered *
                                  100) /
                                spotData.timeWiseData[timeKey]?.slotsPromised
                              ).toFixed(0)}%`
                            : formatNumber(
                                spotData.timeWiseData[timeKey]
                                  ?.totalSlotsDelivered
                              )}
                        </h1>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
