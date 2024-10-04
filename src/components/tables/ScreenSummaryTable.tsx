import React, { useEffect, useState } from "react";
import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { ScreenDataModel } from "../popup/ScreenDataModel";

interface Data {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        [key: string]: {
          [key: string]: number;
        };
      };
    };
  };
}

interface Tab {
  label: string;
  id: string;
}

export const ScreenSummaryTable: React.FC<any> = ({
  data = {},
  allScreen = [],
  handleSetFilteredScreens,
  isScreenSelected,
  handleMultipleFilteredScreen,
}) => {
  const [currentSummaryTab, setCurrentSummaryTab] = useState<string>("1");
  const [defCnt, setDefCnt] = useState<any>(["India"]);
  const [defSt, setDefSt] = useState<any>([]);

  const [countryStates, setCountryStates] = useState<any>({});
  const [stateCities, setStateCities] = useState<any>({});
  const [cityTouchPoints, setCityTouchPoints] = useState<any>({});
  const [touchPointsCities, setTouchPointsCities] = useState<any>({});
  const [selectedScreen, setSelectedScreen] = useState<any>(null);

  const [isPopupOpen, setIsPopupOpen] = useState<Boolean>(false);
  const [modalData, setModalData] = useState<any>(null);

  const handleOpenScreenDetailModel = (screenName: string) => {
    console.log("handleOpenScreenDetailModel : ", screenName);
    const screenData = allScreen?.find(
      (screen: any) => screen?.screenName == screenName
    );
    console.log("screenData : ", screenData);
    setSelectedScreen(screenData);
    setTimeout(() => {
      setIsPopupOpen(true);
    }, 0);
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
            for (const highlight in myData[country][state][city][attribute]) {
              tc[attribute][highlight] = tc[attribute][highlight] || {};

              tc[attribute][highlight][city] =
                myData[country][state][city][attribute][highlight];
            }
            // tc[attribute] = myData[country][state][city][attribute];
          }
        }
      }
    }
    const sortedArray = Object.entries(tc).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
    const sortedObject = Object.fromEntries(sortedArray);
    // console.log(sortedObject);
    return sortedObject;
  };

  const handleCntClick = (country: any) => {
    const dfc = Array.from(new Set([...defCnt, country]));
    const dataToShow: any = {};
    dfc.map((d: any) => {
      dataToShow[d] = data[d];
    });
    setStateCities(fillStateData(dataToShow));
    setCityTouchPoints(fillCityData(dataToShow));
    setTouchPointsCities(fillTpData(dataToShow));
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
        dataToShow[city] = fillCityData(data)[city];
      }
    }

    setCityTouchPoints(dataToShow);
  };

  useEffect(() => {
    if (data !== undefined) {
      setCountryStates(fillCntData(data));
      setStateCities(fillStateData(data));
      setCityTouchPoints(fillCityData(data));
      setTouchPointsCities(fillTpData(data));
    }
  }, [data]);
  // console.log(cityTouchPoints["Gurgaon"]["Malls"])
  // console.log(touchPointsCities);

  const closePopup = () => setIsPopupOpen(false);

  // Define icons for availability
  const CheckIcon = () => <span className="text-green-500 font-bold">✔</span>;
  const CrossIcon = () => <span className="text-red-500 font-bold">✘</span>;

  return (
    <div className="">
      <div className="py-4">
        <TabWithoutIcon
          currentTab={currentSummaryTab}
          onClick={(tab: Tab) => {
            setCurrentSummaryTab(tab.id);
            if (!defCnt.includes(tab.label)) {
              setDefSt([...defSt, tab.label]);
            } else {
              setDefSt(defSt.filter((f: any) => f !== tab.label));
            }
            handleStClick(tab.label);
          }}
          tabData={Object.keys(stateCities).map((s: any, index: any) => {
            return {
              id: `${index + 1}`,
              label: s,
            };
          })}
        />
      </div>
      <div className="grid grid-cols-12 border-y border-proohGray">
        {/* table header */}

        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-2 p-1 border border-1 border-gray-300  bg-gray-200 ">
            <h1 className="text-base font-bold text-center">Touch Points</h1>
          </div>
          <div className="col-span-10">
            <div className="grid grid-cols-10">
              <div className="col-span-3 p-1 border border-1 border-gray-300  bg-gray-200">
                <h1 className="text-base font-semibold text-center truncate">
                  Screen Type
                </h1>
              </div>
              <div className="col-span-7 flex">
                {Object.keys(cityTouchPoints).map((ct: any, i: any) => (
                  <div
                    className="p-1 w-64 border border-1 border-gray-300  bg-gray-200"
                    key={i}
                  >
                    <h1 className="text-base font-semibold text-center truncate">
                      {ct}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* table data */}
        <div className="col-span-12 grid grid-cols-12 border-r h-[50vh] overflow-scroll no-scrollbar">
          {Object.keys(touchPointsCities).map((tp: any, j: any) => (
            <div className="col-span-12 grid grid-cols-12" key={j}>
              <div className="col-span-2 p-1 border border-proohGray">
                <h1 className="text-base font-bold text-center truncate">
                  {tp}
                </h1>
              </div>
              <div className="col-span-10">
                {Object.keys(touchPointsCities[tp]).map(
                  (screenType: any, j: any) => (
                    <div className="grid grid-cols-10" key={j}>
                      <div
                        className="col-span-3 p-1  px-4 border border-black-300 flex gap-4 justify-between"
                        onClick={() => {
                          for (const s of Object.keys(
                            touchPointsCities[tp][screenType]
                          )) {
                            handleMultipleFilteredScreen(
                              Object.values(
                                touchPointsCities[tp][screenType][s]
                              )
                            );
                          }
                        }}
                      >
                        <h1 className="text-base font-semibold text-center truncate">
                          {screenType}
                        </h1>
                        <CheckIcon />
                      </div>
                      <div className="col-span-7">
                        {Object.keys(touchPointsCities[tp][screenType]).map(
                          (c: any, k: any) => (
                            <div
                              className="flex flex-row w-full h-auto"
                              key={k}
                            >
                              {Object.keys(cityTouchPoints).map(
                                (ct: any, k: any) => (
                                  <div
                                    className="cursor-pointer w-full"
                                    key={k}
                                  >
                                    {Object.keys(
                                      touchPointsCities[tp][screenType][c]
                                    )?.map((g: any, z: any) => (
                                      <div
                                        key={z}
                                        className={
                                          isScreenSelected(
                                            ct === c
                                              ? touchPointsCities[tp][
                                                  screenType
                                                ][c][g]
                                              : "w-full"
                                          )
                                            ? "border w-full h-auto p-1 flex flex-row justify-start items-center pl-4 gap-4 truncate"
                                            : ct === c
                                            ? "border w-full h-auto  flex flex-row justify-start items-center pl-4 gap-4 truncate"
                                            : "bg-red-300 truncate"
                                        }
                                      >
                                        {ct === c ? (
                                          <div className="flex gap-4 items-center justify-between">
                                            <ScreenDataModel
                                              screenName={
                                                ct === c
                                                  ? touchPointsCities[tp][
                                                      screenType
                                                    ][c][g]
                                                  : ""
                                              }
                                            />
                                            {isScreenSelected(
                                              ct === c
                                                ? touchPointsCities[tp][
                                                    screenType
                                                  ][c][g]
                                                : ""
                                            ) ? (
                                              <CrossIcon />
                                            ) : (
                                              <CheckIcon />
                                            )}
                                          </div>
                                        ) : (
                                          <div className="py-3"></div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
