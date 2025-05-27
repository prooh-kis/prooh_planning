import { LandingPageListView } from "../../components/molecules/LandingPageListView";
import { LandingPageMap } from "../../components/molecules/LandingPageMap";
import { LandingPageMapHeader } from "../../components/molecules/LandingPageMapHeader";
import { LandingPageTableView } from "../../components/molecules/LandingPageTableView";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { LANDING_PAGE_DATA } from "../../constants/localStorageConstants";
import { getLandingPageData } from "../../actions/screenAction";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { LandingPageMapStats } from "../../components/molecules/LandingPageMapStats";
import { Tooltip } from "antd";

const colors = [
  "bg-[#8B5CF6]",
  "bg-[#6366F1]",
  "bg-[#3B82F6]",
  "bg-[#06B6D4]",
  "bg-[#22C55E]",
  "bg-[#F59E0B]",
  "bg-[#EF4444]",
  "bg-[#FF77E9]",
];
const textColors = [
  "text-[#8B5CF6]",
  "text-[#6366F1]",
  "text-[#3B82F6]",
  "text-[#06B6D4]",
  "text-[#22C55E]",
  "text-[#F59E0B]",
  "text-[#EF4444]",
  "text-[#FF77E9]",
];
const colorsbg = [
  "group-hover:bg-[#8B5CF630]",
  "group-hover:bg-[#6366F130]",
  "group-hover:bg-[#3B82F630]",
  "group-hover:bg-[#06B6D430]",
  "group-hover:bg-[#22C55E30]",
  "group-hover:bg-[#F59E0B30]",
  "group-hover:bg-[#EF444430]",
  "group-hover:bg-[#FF77E9]",
];
export const OurAdvertisingJourney = ({ data, clientAgencyData }: any) => {
  const dispatch = useDispatch<any>();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const landingMapRef = useRef<any>(null);

  const [view, setView] = useState<any>("map");
  const [screenData, setScreenData] = useState<any>([]);
  const [countryStates, setCountryStates] = useState<any>({});
  const [stateCities, setStateCities] = useState<any>({});
  const [cityTouchpoints, setCityTouchpoints] = useState<any>({});
  const [touchpointsCities, setTouchpointsCities] = useState<any>({});
  const [defCnt, setDefCnt] = useState<any>([]);
  const [defSt, setDefSt] = useState<any>([]);
  const [defCt, setDefCt] = useState<any>("");
  const [landingPageData, setLandingPageData] = useState<any>({});

  const [currentOfferIndex, setCurrentOfferIndex] = useState(3);
  const [currentTab, setCurrentTab] = useState("Demand");

  const [clientAgencyCategories, setClientAgencyCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("All");
  const [clientAgencyLogos, setClientAgencyLogos] = useState<any>([]);

  useEffect(() => {
    if (getDataFromLocalStorage(LANDING_PAGE_DATA)) {
      setLandingPageData(getDataFromLocalStorage(LANDING_PAGE_DATA));
    } else {
      setLandingPageData(data);
    }
  }, [data]);

  const scrollToTarget = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getTotalCountryCount = () => {
    return Object.keys(screenData)?.length || 0;
  };

  const getTotalStatesCounts = () => {
    let ans = 0;
    if (defCnt?.length === 0) {
      for (let cnt in screenData) {
        let statesCount = Object.keys(screenData[cnt])?.length || 0;
        ans += statesCount;
      }
    } else {
      for (let cnt of defCnt) {
        let statesCount = Object.keys(screenData[cnt])?.length || 0;
        ans += statesCount;
      }
    }
    return ans;
  };

  const getTotalCityCount = () => {
    return Object.keys(cityTouchpoints)?.length || 0;
  };

  const getTotalScreensCountCityWise = (city: string) => {
    let ans = 0;
    for (let tp of Object.keys(touchpointsCities)) {
      if (cityTouchpoints[city][tp] != undefined) {
        let x = cityTouchpoints[city][tp].length;
        ans += x;
      }
    }
    return ans;
  };

  const getTotalScreensCountTouchpointWise = (tp: string) => {
    let ans = 0;
    for (let city of Object.keys(cityTouchpoints)) {
      if (cityTouchpoints[city][tp] != undefined) {
        let x = cityTouchpoints[city][tp].length;
        ans += x;
      }
    }
    return ans;
  };

  const getTotalScreensCount = () => {
    let ans = 0;
    for (let tp of Object.keys(touchpointsCities)) {
      for (let city of Object.keys(cityTouchpoints)) {
        if (cityTouchpoints[city][tp] != undefined) {
          let x = cityTouchpoints[city][tp].length;
          ans += x;
        }
      }
    }
    return ans;
  };

  const fillCntData = (myData: any) => {
    const cs: any = {};
    // Extracting data for cs
    for (const country in myData) {
      cs[country] = cs[country] || {};
      for (const state in myData[country]) {
        cs[country][state] = Object.keys(myData[country][state]).length;
      }
    }
    return cs;
  };

  const fillStateData = (myData: any) => {
    const sc: any = {};
    // Extracting data for sc
    for (const country in myData) {
      for (const state in myData[country]) {
        for (const city in myData[country][state]) {
          sc[state] = sc[state] || {};
          sc[state][city] = Object.keys(myData[country][state][city]).length;
        }
      }
    }
    return sc;
  };

  const fillCityData = (myData: any) => {
    const ct: any = {};
    // Extracting data for ct
    for (const country in myData) {
      for (const state in myData[country]) {
        for (const city in myData[country][state]) {
          ct[city] = ct[city] || {};
          for (const attribute in myData[country][state][city]) {
            ct[city][attribute] = myData[country][state][city][attribute];
          }
        }
      }
    }
    return ct;
  };

  const fillTpData = (myData: any) => {
    const tc: any = {};
    // Extracting data for tc
    for (const country in myData) {
      for (const state in myData[country]) {
        for (const city in myData[country][state]) {
          for (const attribute in myData[country][state][city]) {
            tc[attribute] = tc[attribute] || {};
            tc[attribute][city] = myData[country][state][city][attribute];
          }
        }
      }
    }
    const sortedArray = Object.entries(tc).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
    const sortedObject = Object.fromEntries(sortedArray);
    return sortedObject;
  };

  const handleCntClick = (country: any) => {
    const dfc = Array.from(new Set([...defCnt, country]));
    const dataToShow: any = {};
    dfc.map((d: any) => {
      dataToShow[d] = screenData[d];
    });
    setStateCities(fillStateData(dataToShow));
    setCityTouchpoints(fillCityData(dataToShow));
    setTouchpointsCities(fillTpData(dataToShow));
  };

  const handleStClick = (state: any) => {
    const dfs = Array.from(new Set([...defSt, state]));
    const dataToUse: any = {};
    dfs.map((d: any) => {
      dataToUse[d] = stateCities[d];
    });
    const dataToShow: any = {};

    for (const state in dataToUse) {
      for (const city in dataToUse[state]) {
        dataToShow[city] = fillCityData(screenData)[city];
      }
    }

    setCityTouchpoints(dataToShow);
  };

  useEffect(() => {
    if (landingPageData && Object.keys(landingPageData).length > 0) {
      setScreenData(landingPageData.screenData);
      setCountryStates(fillCntData(landingPageData.screenData));
      setStateCities(fillStateData(landingPageData.screenData));
      setCityTouchpoints(fillCityData(landingPageData.screenData));
      setTouchpointsCities(fillTpData(landingPageData.screenData));
    }

    if (clientAgencyData) {
      setClientAgencyCategories(() => {
        return clientAgencyData
          ?.map((data: any) => data.industry)
          ?.reduce((acc: any, current: any) => {
            if (!acc.includes(current)) {
              acc.push(current);
            }
            return acc;
          }, []);
      });

      setClientAgencyLogos(() => {
        return clientAgencyData
          ?.filter((d: any) => d.industry === selectedCategory)
          ?.map((data: any) => data.logo);
      });
    }
  }, [landingPageData, clientAgencyData, selectedCategory]);

  const markers = useMemo(() => {
    const newMarkers: any[] = [];
    const tpColors: any[] = [];

    const locations = data?.location
      ? data?.locations
      : getDataFromLocalStorage(LANDING_PAGE_DATA)?.locations;
    const touchPoints =
      data?.touchPoints ||
      getDataFromLocalStorage(LANDING_PAGE_DATA)?.touchPoints;

    locations?.forEach((s: any) => {
      const [screenId, details]: any = Object.entries(s)[0];
      const exists = newMarkers.some(
        (marker: any) =>
          marker[0] === details?.lat &&
          marker[1] === details?.lng &&
          marker[2] === screenId
      );

      if (!exists) {
        newMarkers.push([
          details?.lat,
          details?.lng,
          screenId,
          details.touchpoint,
        ]);
      }
    });

    if (Array.isArray(touchPoints) && touchPoints.length > 0) {
      touchPoints.forEach((t: any, j: any) => {
        tpColors.push({ tp: t, color: textColors[j] });
      });
    } else {
      // Handle case where touchPoints is not an array or is empty
      console.warn("touchPoints is not a valid array or is empty.");
    }

    return { markers: newMarkers, touchPoints: tpColors };
  }, [data]);

  const { markers: memoizedMarkers, touchPoints: memoizedTouchPoints } =
    markers;

  useEffect(() => {
    if (memoizedMarkers?.length > 0 && landingMapRef.current) {
      const latitudes = memoizedMarkers.map((marker: any) => marker[0]);
      const longitudes = memoizedMarkers.map((marker: any) => marker[1]);
      const bounds = [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)],
      ];

      const map = landingMapRef.current?.getMap();
      map.fitBounds(bounds, { padding: 20, maxZoom: 15 });
    }
  }, [memoizedMarkers]);

  return (
    <div className="px-4 sm:px-2 md:px-8 w-full mt-16">
      <div className="flex flex-col justify-center items-center gap-4 py-2 w-full">
        <p className="font-custom leading-[18px] tracking-[0.24em] font-normal text-center text-[12px] text-[#667D8C]">
          OUR JOURNEY
        </p>
        <h1 className="text-[#1E376E] text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
          From Bold Ideas To Lasting <br /> Impact In{" "}
          <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">
            advertising
          </span>
        </h1>
      </div>
      <div className="py-4 flex justify-center items-center">
        {["Demand", "Supply"]?.map((tab: any, i: any) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (i == 0) {
                setCurrentTab("Demand");
              }
              if (i == 1) {
                setCurrentTab("Supply");
              }
            }}
            className={`${
              tab === currentTab
                ? "bg-primaryButton text-white font-semibold"
                : "bg-[#F6F6F6] text-gray-700"
            } border border-[#D7D7D7] py-2 px-8 ${
              i == 0
                ? "clip-trapezium-right mr-[-2px]"
                : i == ["Demand", "Supply"].length - 1
                ? "clip-trapezium-left ml-[-2px]"
                : "clip-trapezium-both"
            }`}
          >
            <span className="text-[12px]">{tab}</span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="px-12">
        <div className="relative flex items-center justify-between my-6 py-4">
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-primaryButton transition-all duration-500"
              // style={{ width: `${((currentOfferIndex) / [2022, 2023, 2024, 2025].length) * 100}%` }}
              style={{ width: `${(Number(currentOfferIndex) / 3) * 100}%` }}
            />
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentOfferIndex(i)}
                className={`w-4 h-4 rounded-full -mt-1.5 border border-primaryButton
                  ${i <= currentOfferIndex ? "bg-primaryButton" : "bg-gray-200"}
                `}
              >
                <Tooltip title={[2022, 2023, 2024, 2025][3]}>
                  {/* Icon or Text for each step */}
                  <div
                    className={`${
                      i <= currentOfferIndex
                        ? "text-primaryButton"
                        : "text-gray-300"
                    } relative mt-[-32px] w-full flex justify-center`}
                  >
                    {[2022, 2023, 2024, 2025][i]}
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentTab === "Supply" && (
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8 pt-4">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              {/* <YearSlider /> */}
              <div className="relative">
                <LandingPageMapHeader
                  scrollToTarget={scrollToTarget}
                  setView={setView}
                  view={view}
                />
              </div>
              <div className="h-[500px] w-full z-0">
                {view === "list" ? (
                  <div className="w-full h-full">
                    <LandingPageListView screens={landingPageData?.screens} />
                  </div>
                ) : view === "table" ? (
                  <div className="w-full h-full">
                    <LandingPageTableView
                      data={screenData}
                      stateCities={stateCities}
                      cityTouchpoints={cityTouchpoints}
                      touchpointsCities={touchpointsCities}
                      defCnt={defCnt}
                      setDefCnt={setDefCnt}
                      defSt={defSt}
                      setDefSt={setDefSt}
                      defCt={defCt}
                      getTotalCountryCount={getTotalCountryCount}
                      handleCntClick={handleCntClick}
                      getTotalStatesCounts={getTotalStatesCounts}
                      handleStClick={handleStClick}
                      getTotalCityCount={getTotalCityCount}
                      getTotalScreensCountTouchpointWise={
                        getTotalScreensCountTouchpointWise
                      }
                      getTotalScreensCount={getTotalScreensCount}
                      getTotalScreensCountCityWise={
                        getTotalScreensCountCityWise
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full h-full">
                    <LandingPageMap data={landingPageData} />
                  </div>
                )}
              </div>
            </div>
            {landingPageData?.screens?.length > 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center">
                <LandingPageMapStats data={landingPageData} />
              </div>
            )}
          </div>

          {view === "map" && (
            <div className="flex justify-around flex-wrap justify-start gap-2 py-4 px-8">
              {memoizedTouchPoints?.map((tp: any, i: any) => (
                <div
                  key={i}
                  className="cursor-pointer flex items-center gap-1 group"
                >
                  <div
                    className={clsx(`h-3 w-3 ${colors[i]} rounded-full`)}
                  ></div>
                  <h1
                    className={clsx(
                      `text-[10px] sm:text-[12px] md:text-[12px] leading-[18.1px] tracking-[0.01em] ${colorsbg[i]} p-1 rounded-[4px]`
                    )}
                  >
                    {tp?.tp}
                  </h1>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {currentTab === "Demand" && (
        <div className="bg-[#F5FBFF] rounded-[12px] mx-8">
          <div className="grid grid-cols-12 gap-2 p-2">
            <div className="col-span-2 bg-[#FFFFFF] rounded-[12px]">
              <div
                className="p-4 truncate cursor-pointer"
                onClick={() => setSelectedCategory("")}
              >
                <h1 className="font-custom font-semibold text-[16px]">
                  Category
                </h1>
              </div>
              <div className="grid grid cols-1 pb-4 truncate h-auto overflow-y-auto scrollbar-minimal pr-4">
                {clientAgencyCategories
                  ?.filter((category: string) => category != "")
                  ?.map((category: any, i: number) => (
                    <div
                      className="flex gap-8 items-center col-span-1 "
                      key={i}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div
                        className={`h-12 w-1  ${
                          selectedCategory == category && "bg-[#129BFF]"
                        }`}
                      ></div>
                      <div
                        className={` border-b border-gray-200 h-12 w-full font-custom text-[14px] cursor-pointer flex items-center  ${
                          selectedCategory == category
                            ? "text-[#129BFF] font-bold"
                            : "text-[#547082] font-normal"
                        }`}
                      >
                        {category}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-span-10 bg-[#FFFFFF] rounded-[12px]">
              <div className="p-4">
                <h1 className="font-custom font-semibold text-[16px]">
                  Brands & Agency
                </h1>
              </div>
              <div className="grid grid-cols-12 pb-4">
                {clientAgencyLogos
                  ?.slice(0, 30)
                  ?.map((logo: any, j: number) => (
                    <div
                      key={j}
                      className="p-4 col-span-2 border border-gray-50 flex items-center justify-center"
                    >
                      {logo && logo !== "" ? (
                        <img className="" src={logo} alt="logo" />
                      ) : (
                        <span className="text-gray-400">Logo</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
