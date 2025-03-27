import React, { useCallback, useEffect } from "react";
import { Tooltip } from "antd";
import { ScreenDataModel } from "../../components/popup/ScreenDataModel";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { 
  SCREEN_SUMMARY_SELECTION, 
  SCREEN_TYPE_TOGGLE_SELECTION 
} from "../../constants/localStorageConstants";
import { CAMPAIGN_PLAN_TYPE_KNOW } from "../../constants/campaignConstants";

interface ScreenSummaryTableProps {
  data: any;
  currentCity: string;
  screensBuyingCount: any;
  setCityZones: (zones: any) => void;
  cityZones: any;
  setCityTP: (tps: any) => void;
  cityTP: any;
  setScreenTypes: (types: any) => void;
  campaignId: string;
  listView: boolean;
  screenTypeToggle: any;
  setScreenTypeToggle: (toggle: any) => void;
  handleScreenClick: (params: any) => void;
  campaignDetails: any;
  setScreenSummaryTableData: (data: any) => void;
  setScreensBuyingCount?: any;
}

export const ScreenSummaryTable = ({
  data,
  currentCity,
  screensBuyingCount,
  setCityZones,
  cityZones,
  setCityTP,
  cityTP,
  setScreenTypes,
  campaignId,
  listView,
  screenTypeToggle,
  setScreenTypeToggle,
  handleScreenClick,
  campaignDetails,
  setScreensBuyingCount,
}: ScreenSummaryTableProps) => {

  const handleData = useCallback((myData: any) => {
    const zones: any = {};
    const tps: any = {};
    const screens: any = {};
    const types: any = {};
    const stToggle: any = {};

    Object.keys(myData).forEach(city => {
      zones[city] = {};
      tps[city] = {};
      screens[city] = {};
      types[city] = {};
      stToggle[city] = {};

      Object.keys(myData[city]).forEach(tp => {
        tps[city][tp] = {};
        stToggle[city][tp] = {};

        Object.keys(myData[city][tp]).forEach(st => {
          tps[city][tp][st] = [];
          types[city][st] = [];
          
          stToggle[city][tp][st] = 
            getDataFromLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION)?.[campaignId]?.[city]?.[tp]?.[st] ?? true;
          
          setScreenTypeToggle((prev: any) => ({
            ...prev,
            [city]: {
              ...prev[city],
              [tp]: {
                ...prev[city]?.[tp],
                [st]: stToggle[city][tp][st]
              }
            }
          }));

          Object.keys(myData[city][tp][st]).forEach(zone => {
            zones[city][zone] = [];
            
            myData[city][tp][st][zone].forEach((screen: any) => {
              zones[city][zone].push(screen.screenName);
              tps[city][tp][st].push(screen.screenName);
              types[city][st].push(screen.screenName);

              const screenId = screen._id;
              const localScreenData = getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]?.[city]?.[screenId];
              const localCampaign = campaignDetails;

              screens[city][screenId] = {
                status: localScreenData ? localScreenData.status : 
                  localCampaign?.screenIds?.length > 0 && !localCampaign?.screenIds.includes(screenId) ? false :
                  true,
                data: screen
              };
            });
          });
        });
      });
    });

    setCityZones(zones);
    setCityTP(tps);
    setScreenTypes(types);
    const storedSelection = getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId];
    setScreensBuyingCount(storedSelection && Object.keys(storedSelection).length ? storedSelection : screens);
  }, [setCityZones, setCityTP, setScreenTypes, campaignId, setScreensBuyingCount, setScreenTypeToggle, campaignDetails]);

  useEffect(() => {
    if (data) {
      handleData(data);
    }
  }, [data, handleData]);

  const handleScreenTypeClick = useCallback((screenType: string, tp: string) => {
    const screens = Object.values(data?.[currentCity]?.[tp]?.[screenType] || {})
      .flat() as any[];

    const allSelected = screens.every(s => 
      screensBuyingCount[currentCity]?.[s._id]?.status
    );

    const updatedScreens = { ...screensBuyingCount };
    const cityScreens = updatedScreens[currentCity] || {};

    screens.forEach(s => {
      cityScreens[s._id] = { status: !allSelected, data: s };
    });

    updatedScreens[currentCity] = cityScreens;
    setScreensBuyingCount(updatedScreens);

    setScreenTypeToggle((prev: any) => ({
      ...prev,
      [currentCity]: {
        ...prev[currentCity],
        [tp]: {
          ...prev[currentCity]?.[tp],
          [screenType]: !allSelected
        }
      }
    }));
  }, [currentCity, data, screensBuyingCount, setScreensBuyingCount, setScreenTypeToggle]);

  if (!currentCity || !data || Object.keys(cityZones).length === 0) {
    return <div className="h-full" />;
  }

  return (
    <div className="h-full">
      <div className="w-full h-full border-b">
        <div className="bg-[#f7f7f7] grid grid-cols-12 items-center rounded-t text-[#6f7f8e]">
          <div className="py-2 col-span-2">
            <h1 className="text-[16px] font-bold text-center">Touchpoints</h1>
          </div>
          <div className="py-2 col-span-2 border-l">
            <h1 className="text-[16px] font-bold text-center">Screen Type</h1>
          </div>
          <div className="col-span-8">
            <div 
              className="overflow-x-auto no-scrollbar sync-scroll-row"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                document.querySelectorAll(".sync-scroll").forEach(el => {
                  el.scrollLeft = scrollLeft;
                });
              }}
            >
              <div className={`grid ${Object.keys(cityZones[currentCity]).length > 3 ? 
                "grid-cols-[repeat(auto-fit,minmax(8rem,0.5fr))]" : 
                "grid-cols-[repeat(auto-fit,minmax(6rem,0.5fr))]"} gap-0`}
                style={{ 
                  width: Object.keys(cityZones[currentCity]).length > 3 ? 
                    "calc(8rem * 8)" : "calc(6rem * 8)" 
                }}
              >
                {Object.keys(cityZones[currentCity]).map((zone, i) => (
                  <div className="col-span-1 border-x min-w-[2rem]" key={i}>
                    <h1 className="md:text-[16px] sm:text-[14px] py-2 font-bold text-center truncate">
                      {zone.split(" ").slice(0, 3).join(" ")}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto scrollbar-minimal h-[50vh] pb-10">
          {Object.keys(data?.[currentCity] || {}).map((tp, i) => (
            <div key={i} className="grid grid-cols-12">
              <div className="rounded-bl border-b border-l col-span-2 py-2 px-4 border-r truncate">
                <Tooltip title={tp}>
                  <h1 className="text-[14px] truncate">{tp}</h1>
                </Tooltip>
              </div>
              
              <div className="col-span-10">
                {Object.keys(cityTP?.[currentCity]?.[tp] || {}).map((st, j) => (
                  <div key={j} className="rounded-br grid grid-cols-10 border-b border-r">
                    <div className="cursor-pointer col-span-2 py-2 px-4 border-r">
                      <div className="flex justify-between items-center">
                        <Tooltip title={st}>
                          <h1 className="text-[14px] truncate">{st}</h1>
                        </Tooltip>
                        <div onClick={() => {
                          console.log(screenTypeToggle[currentCity]);
                          handleScreenTypeClick(st, tp);
                        }}>
                          <i
                            className={`fi ${
                              screenTypeToggle?.[currentCity]?.[tp]?.[st]
                                ? "fi-br-check text-[#358E0B]"
                                : "fi-br-cross text-[#FF0808]"
                            } flex items-center text-[12px]`}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-span-8 overflow-x-auto no-scrollbar sync-scroll"
                      onScroll={(e) => {
                        const scrollLeft = e.currentTarget.scrollLeft;
                        document.querySelectorAll(".sync-scroll-row").forEach(el => {
                          el.scrollLeft = scrollLeft;
                        });
                      }}
                    >
                      <div className={`grid ${Object.keys(cityZones[currentCity]).length > 3 ? 
                        "grid-cols-[repeat(auto-fit,minmax(8rem,0.5fr))]" : 
                        "grid-cols-[repeat(auto-fit,minmax(6rem,0.5fr))]"} gap-0`}
                        style={{ 
                          width: Object.keys(cityZones[currentCity]).length > 3 ? 
                            "calc(8rem * 8)" : "calc(6rem * 8)" 
                        }}
                      >
                        {Object.keys(cityZones[currentCity]).map((zone, k) => (
                          <div key={k} className="cursor-pointer col-span-1 border-r min-w-[2rem] truncate">
                            {data?.[currentCity]?.[tp]?.[st]?.[zone]?.map((screen: any, m: number) => (
                              <div 
                                key={m} 
                                className={`cursor-pointer flex gap-4 justify-between py-2 px-4 ${
                                  m === 0 ? "" : "border-t"
                                } truncate`}
                              >
                                <ScreenDataModel
                                  listView={listView}
                                  campaignId={campaignId}
                                  screen={screen}
                                  handleRemove={() => handleScreenClick({ screen, city: currentCity })}
                                  isAdded={screensBuyingCount[currentCity]?.[screen._id]?.status}
                                />
                                
                                <div className="flex gap-4 justify-between items-center">
                                  <div className="flex gap-1 items-center">
                                    <i className="fi fi-sr-star text-[12px] text-[#F1BC00]" />
                                    {screen.pricePerSlot > 100 && (
                                      <i className="fi fi-sr-star text-[12px] text-[#F1BC00]" />
                                    )}
                                  </div>
                                  <div onClick={() => handleScreenClick({ screen, city: currentCity })}>
                                    {screensBuyingCount[currentCity]?.[screen._id]?.status === false ? (
                                      <i className="fi fi-br-cross text-[#FF0808] text-[12px]" />
                                    ) : (
                                      <i className="fi fi-br-check text-[#358E0B] text-[12px]" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};