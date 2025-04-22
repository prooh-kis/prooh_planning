import { LoadingScreen } from '../../components/molecules/LoadingScreen'
import { MultiColorLinearBar2 } from '../../components/molecules/MultiColorLinearBar2'
import { DashBoardCostGraph } from '../../components/segments/DashBoardCostGraph'
import { DashBoardHardwarePerformanceGraph } from '../../components/segments/DashBoardHardwarePerformanceGraph'
import { DashBoardSlotGraph } from '../../components/segments/DashBoardSlotGraph'
import { DurationGraphPerDay } from '../../components/segments/DurationGraphPerDay'
import { formatNumber } from '../../utils/formatValue'
import React from 'react'

export function SiteLevelAnalysis({screenLevelData, getData, currentTab, loadingTabWiseSiteData, tabWiseSiteData }: any) {
  return (
    <div>
      {currentTab == "1" ? (
        <div className="w-full">
          {loadingTabWiseSiteData ? (
            <div className="h-[240px]">
              <LoadingScreen />
            </div>
          ) : (
            <div className="h-auto">
              <DurationGraphPerDay
                currentData={tabWiseSiteData}
                additionalLegends={[
                  { label: "Hourly Delivery", values: [1500], color: "rgba(16, 185, 129, 1)" },
                  { label: "Extra Delivery", values: [1200], color: "rgba(245, 158, 11, 1)" },
                ]}
              />
            </div>
          )}  
        </div>
      ) : currentTab == "2" ? (
        <div className="pt-4">
          {loadingTabWiseSiteData ? (
            <div className="h-[240px]">
              <LoadingScreen />
            </div>
          ) : (
            <div className="grid grid-cols-5 py-2">
              <div className="col-span-2 border-r pr-4">
                <h1 className="text-[14px] font-semibold">
                  Gender Wise Impressions
                </h1>
                <div className="pt-1 w-full overflow-y-auto no-scrollbar">
                  {Object.keys(tabWiseSiteData)?.filter((t: any) => t == "all")?.map((audienceType: any, i: any) => (
                    <div key={i} className="grid grid-cols-5 flex items-center gap-2 pt-1">
                      <div className="col-span-1 truncate py-1">
                        <h1 className="text-[10px] truncate">{audienceType.toUpperCase()}</h1>
                      </div>
                      <div className="col-span-4 grid grid-cols-6 flex items-center w-full gap-2">
                        <div className="col-span-5 flex items-center w-full gap-2">
                          <MultiColorLinearBar2
                            delivered={tabWiseSiteData[audienceType]?.impressionDeliveredTotal}
                            expected={tabWiseSiteData[audienceType]?.impressionPromisedTotal * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                            total={tabWiseSiteData[audienceType]?.impressionPromisedTotal}
                            deliveredColor="bg-[#129BFF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <h1 className="text-[10px]">
                            {formatNumber(Number(tabWiseSiteData[audienceType]?.impressionDeliveredTotal).toFixed(0))}
                          </h1>
                        </div>
                        
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-5 flex items-center gap-2 pt-1">
                    <div className="col-span-1 truncate py-1">
                      <h1 className="text-[10px] truncate">{"Male".toUpperCase()}</h1>
                    </div>
                    <div className="col-span-4 grid grid-cols-6 flex items-center w-full gap-2">
                      <div className="col-span-5 flex items-center w-full gap-2">
                        <MultiColorLinearBar2
                          delivered={tabWiseSiteData["all"]?.impressionDeliveredMale}
                          expected={tabWiseSiteData["all"]?.impressionPromisedMale * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                          total={tabWiseSiteData["all"]?.impressionPromisedMale}
                          deliveredColor="bg-[#5864FF]"
                          expectedColor="bg-[#CFC7FF]"
                          totalColor="bg-[#DFE5FF]"
                          height="h-[5px]"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <h1 className="text-[10px]">
                          {formatNumber(Number(tabWiseSiteData["all"]?.impressionDeliveredMale).toFixed(0))}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 flex items-center gap-2 pt-1">
                    <div className="col-span-1 truncate py-1">
                      <h1 className="text-[10px] truncate">{"Female".toUpperCase()}</h1>
                    </div>
                    <div className="col-span-4 grid grid-cols-6 flex items-center w-full gap-2">
                      <div className="col-span-5 flex items-center w-full gap-2">
                        <MultiColorLinearBar2
                          delivered={tabWiseSiteData["all"]?.impressionDeliveredFemale}
                          expected={tabWiseSiteData["all"]?.impressionPromisedFemale * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                          total={tabWiseSiteData["all"]?.impressionPromisedFemale}
                          deliveredColor="bg-[#DC97FF]"
                          expectedColor="bg-[#CFC7FF]"
                          totalColor="bg-[#DFE5FF]"
                          height="h-[5px]"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <h1 className="text-[10px]">
                          {formatNumber(Number(tabWiseSiteData["all"]?.impressionDeliveredFemale).toFixed(0))}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 border-l px-4">
                <h1 className="text-[14px] font-semibold">
                  Audience Type Wise Impressions
                </h1>
                <div className="h-[90px] pt-1 w-full overflow-y-auto no-scrollbar">
                  {Object.keys(tabWiseSiteData)?.filter((t: any) => t !== "all")?.map((audienceType: any, i: any) => (
                    <div key={i} className="grid grid-cols-10 flex items-center gap-2 pt-1">
                      <div className="col-span-4 truncate py-1">
                        <h1 className="text-[10px] truncate">{audienceType.toUpperCase()}</h1>
                      </div>
                      <div className="col-span-6 grid grid-cols-6 flex items-center w-full gap-2">
                        <div className="col-span-5 flex items-center w-full gap-2">
                          <MultiColorLinearBar2
                            delivered={tabWiseSiteData[audienceType]?.impressionDeliveredMale}
                            expected={tabWiseSiteData[audienceType]?.impressionPromisedMale * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                            total={tabWiseSiteData[audienceType]?.impressionPromisedMale}
                            deliveredColor="bg-[#5863FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#DFE5FF]"
                            height="h-[5px]"
                          />
                          <MultiColorLinearBar2
                            delivered={tabWiseSiteData[audienceType]?.impressionDeliveredFemale}
                            expected={tabWiseSiteData[audienceType]?.impressionPromisedFemale * (screenLevelData?.data?.durationDelivered || 1)/ screenLevelData?.data?.durationPromised}
                            total={tabWiseSiteData[audienceType]?.impressionPromisedFemale}
                            deliveredColor="bg-[#DC97FF]"
                            expectedColor="bg-[#CFC7FF]"
                            totalColor="bg-[#F9ECFF]"
                            height="h-[5px]"
                          />
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <h1 className="text-[10px]">
                            {formatNumber(Number(tabWiseSiteData[audienceType]?.impressionDeliveredTotal).toFixed(0))}
                          </h1>
                        </div>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : currentTab == "3" ? (
        <div className="pt-4">
          {loadingTabWiseSiteData ? (
            <div className="h-[240px]">
              <LoadingScreen />
            </div>
          ) : (
            <DashBoardHardwarePerformanceGraph
              currentData={getData().countsArray}
              labels={getData().datesArray}
            />
          )}
        </div>
      ) : currentTab == "4" ? (
        <div className="pt-4">
          {loadingTabWiseSiteData ? (
            <div className="h-[240px]">
              <LoadingScreen />
            </div>
          ) : (
            <DashBoardSlotGraph
              currentData={getData().countsArray}
              labels={getData().datesArray}
            />
          )}
        </div>
      ) : currentTab == "5" ? (
        <div className="pt-4">
          {loadingTabWiseSiteData ? (
            <div className="h-[240px]">
              <LoadingScreen />
            </div>
          ) : (
            <DashBoardCostGraph
              currentData={getData().countsArray}
              labels={getData().datesArray}
            />
          )}
        </div>
      ) : null}
    </div>
  )
}
