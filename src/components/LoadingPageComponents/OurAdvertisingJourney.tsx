import { LandingPageListView } from "../../components/molecules/LandingPageListView";
import { LandingPageMap } from "../../components/molecules/LandingPageMap";
import { LandingPageMapFooter } from "../../components/molecules/LandingPageMapFooter";
import { LandingPageMapHeader } from "../../components/molecules/LandingPageMapHeader";
import { LandingPageTableView } from "../../components/molecules/LandingPageTableView";
import React, { useEffect, useRef, useState } from "react";

export const OurAdvertisingJourney = ({ landingPageData }: any) => {
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<any>("map");
  const [screenData, setScreenData] = useState<any>([]);
  const [countryStates, setCountryStates] = useState<any>({});
  const [stateCities, setStateCities] = useState<any>({});
  const [cityTouchpoints, setCityTouchpoints] = useState<any>({});
  const [touchpointsCities, setTouchpointsCities] = useState<any>({});
  const [defCnt, setDefCnt] = useState<any>([]);
  const [defSt, setDefSt] = useState<any>([]);
  const [defCt, setDefCt] = useState<any>("");

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

  return (
    <div ref={targetDivRef} className="px-4 md:px-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-1 md:col-span-4">
          <div className="py-4">
            <LandingPageMapFooter data={landingPageData} />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 md:col-span-8">
          <div className="relative">
            <LandingPageMapHeader
              scrollToTarget={scrollToTarget}
              setView={setView}
              view={view}
            />
          </div>
          <div className="lg:h-[680px] md:h-[540px] sm:h-[480px] w-full z-0">
            <LandingPageMap data={landingPageData} />
          </div>
        </div>
      </div>

      {/* List or Table View */}
      {view === "list" && (
        <div className="pt-8 z-0">
          <LandingPageListView screens={landingPageData?.screens} />
        </div>
      )}
      {view === "table" && (
        <div className="pt-8 z-0">
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
      )}
    </div>
  );
};
