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
export const OurAdvertisingJourney = ({ data }: any) => {
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

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

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
  }, [landingPageData]);

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
      <div className="flex flex-col gap-4 py-2 w-full">
        <h1 className="font-custom text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold leading-[40px] sm:leading-[48px] md:leading-[57.6px] lg:leading-[64px] tracking-normal text-[#0E212E] text-center font-inter">
          Our Advertising Journey
        </h1>
        <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-[300] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] tracking-normal text-[#667D8C] text-center font-inter">
          Our platform helps your business in managing expenses. These are some
          of the reasons why you
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between my-6 pt-4 px-12">
        <div className="flex-1 h-1 bg-gray-200 relative">
          <div className="absolute inset-x-0 flex justify-between p">
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
                <Tooltip title={[2022, 2023, 2024, 2025][i]}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
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
                  getTotalScreensCountCityWise={getTotalScreensCountCityWise}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <LandingPageMap data={landingPageData} />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center">
          <LandingPageMapStats data={landingPageData} />
        </div>
      </div>

      {view === "map" && (
        <div className="flex justify-between flex-wrap justify-start gap-4 py-4 px-8">
          {memoizedTouchPoints?.map((tp: any, i: any) => (
            <div
              key={i}
              className="cursor-pointer flex items-center gap-2 group"
            >
              <div className={clsx(`h-4 w-4 ${colors[i]} rounded-full`)}></div>
              <h1
                className={clsx(
                  `text-[10px] sm:text-[12px] md:text-[14px] leading-[18.1px] tracking-[0.01em] ${colorsbg[i]} p-1 rounded-[4px]`
                )}
              >
                {tp?.tp}
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
