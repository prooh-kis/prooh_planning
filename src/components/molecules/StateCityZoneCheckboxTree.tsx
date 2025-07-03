import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";

interface Zone {
  Male: number;
  Female: number;
  count: number;
}

interface City {
  Male: number;
  Female: number;
  count: number;
  zones: Record<string, Zone>;
}

interface StateData {
  gender: {
    Male: number;
    Female: number;
  };
  cities: Record<string, City>;
}

interface DataStructure {
  [state: string]: StateData;
}

interface Props {
  data: DataStructure;
  setSelectedCity: (cities: string[]) => void;
  setSelectedZone: (zones: string[]) => void;
  loading?: any;
}

export const StateCityZoneCheckboxTree: React.FC<Props> = ({
  data,
  loading,
  setSelectedCity,
  setSelectedZone,
}) => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const selectedCitiesRef = useRef<string[]>([]);
  const selectedZonesRef = useRef<string[]>([]);

  // Memoize processed data to prevent unnecessary recalculations
  const processedData = useMemo(() => {
    return Object.fromEntries(
      Object.entries(data || {}).filter(([key]) => key !== "id")
    );
  }, [data]);

  // Stable function to update selections without causing re-renders
  const updateSelections = useCallback(() => {
    const newSelectedCities: string[] = [];
    const newSelectedZones: string[] = [];

    Object.keys(processedData).forEach((state) => {
      Object.keys(processedData[state]?.cities || {}).forEach((city) => {
        let cityHasSelectedZones = false;

        Object.keys(processedData[state]?.cities?.[city]?.zones || {}).forEach(
          (zone) => {
            if (selected[zone]) {
              newSelectedZones.push(zone);
              cityHasSelectedZones = true;
            }
          }
        );

        if (selected[city] || cityHasSelectedZones) {
          newSelectedCities.push(city);
        }
      });
    });

    // Only update if selections actually changed
    if (
      JSON.stringify(newSelectedCities) !== JSON.stringify(selectedCitiesRef.current) ||
      JSON.stringify(newSelectedZones) !== JSON.stringify(selectedZonesRef.current)
    ) {
      selectedCitiesRef.current = newSelectedCities;
      selectedZonesRef.current = newSelectedZones;
      setSelectedCity(newSelectedCities);
      setSelectedZone(newSelectedZones);
    }
  }, [processedData, selected, setSelectedCity, setSelectedZone]);

  // This effect runs only when selections change
  useEffect(() => {
    updateSelections();
  }, [selected, updateSelections]);

  const handleSaveData = useCallback((data: any) => {
    saveDataOnLocalStorage("STATE_CITY_ZONE", data);
  }, []);

  // Initialize collapsed state - runs only once on mount
  useEffect(() => {
    const initialCollapsed: Record<string, boolean> = {};
    Object.keys(processedData).forEach((state) => {
      initialCollapsed[state] = false;
      Object.keys(processedData[state]?.cities || {}).forEach((city) => {
        initialCollapsed[city] = true;
        Object.keys(processedData[state]?.cities?.[city]?.zones || {}).forEach(
          (zone) => {
            initialCollapsed[zone] = true;
          }
        );
      });
    });
    setCollapsed(initialCollapsed);
  }, [processedData]);

  // Initialize selected state - runs when data changes
  useEffect(() => {
    const savedData = getDataFromLocalStorage("STATE_CITY_ZONE") || {};
    if (Object.keys(savedData).length > 0) {
      setSelected(savedData);
    } else {
      const initialSelected: Record<string, boolean> = {};
      Object.keys(processedData).forEach((state) => {
        initialSelected[state] = true;
        Object.keys(processedData[state]?.cities || {}).forEach((city) => {
          initialSelected[city] = true;
          Object.keys(
            processedData[state]?.cities?.[city]?.zones || {}
          ).forEach((zone) => {
            initialSelected[zone] = true;
          });
        });
      });
      setSelected(initialSelected);
    }
  }, [processedData]);

  // Memoized toggle functions
  const toggleState = useCallback((state: string) => {
    setSelected((prev) => {
      const isChecked = !prev[state];
      const newState = { ...prev, [state]: isChecked };
      
      Object.keys(data[state].cities).forEach((city) => {
        newState[city] = isChecked;
        Object.keys(data[state].cities[city].zones).forEach((zone) => {
          newState[zone] = isChecked;
        });
      });
      
      handleSaveData(newState);
      return newState;
    });
  }, [data, handleSaveData]);

  const toggleCity = useCallback((state: string, city: string) => {
    setSelected((prev) => {
      const isChecked = !prev[city];
      const newState = { ...prev, [city]: isChecked };
      
      Object.keys(data[state].cities[city].zones).forEach((zone) => {
        newState[zone] = isChecked;
      });
      
      handleSaveData(newState);
      return newState;
    });
  }, [data, handleSaveData]);

  const toggleZone = useCallback((state: string, city: string, zone: string) => {
    setSelected((prev) => {
      const newState = { ...prev, [zone]: !prev[zone] };
      handleSaveData(newState);
      return newState;
    });
  }, [handleSaveData]);

  const toggleCollapse = useCallback((key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-4">
      <ul>
        {Object.keys(processedData || {}).map((state) => (
          <li key={state} className="mb-2 text-[#303030]">
            {/* State checkbox */}
            <div className="flex items-center justify-between gap-2 py-1 cursor-pointer">
              <div className="flex items-center gap-2 truncate">
                <input
                  title="state"
                  type="checkbox"
                  checked={selected[state] ?? false}
                  onChange={() => toggleState(state)}
                  className="w-4 h-4 truncate"
                  disabled={true}
                />
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span className={`text-[14px] font-[700] ${selected[state] ? "" : "text-[#6F7F8E]"}`}>
                      {state}
                    </span>
                    <span className="text-gray-600 text-[12px]">
                      ({Object.values(processedData[state]?.cities || {}).reduce(
                        (acc, city) => acc + city.count,
                        0
                      )})
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  title="state button"
                  type="button"
                  onClick={() => toggleCollapse(state)}
                  className="focus:outline-none text-black text-[10px]"
                >
                  <i
                    className={`text-[#9A9A9A] flex items-center ${
                      !collapsed[state] ? "fi fi-br-angle-up" : "fi fi-br-angle-down"
                    }`}
                  ></i>
                </button>
                <div className="flex gap-2 px-1">
                  <h1 className="text-[#6F7F8E] text-[12px]">
                    {processedData[state]?.gender?.Male?.toFixed(1)}%
                  </h1>
                  <h1 className="text-[#6F7F8E] text-[12px]">
                    {processedData[state]?.gender?.Female?.toFixed(1)}%
                  </h1>
                </div>
              </div>
            </div>
            
            {/* City list */}
            {!collapsed[state] && (
              <ul className="ml-4 mt-1">
                {Object.keys(processedData?.[state]?.cities || {}).map((city) => (
                  <li key={city} className="mb-2">
                    {/* City checkbox */}
                    <div className="flex items-center justify-between gap-2 py-1 cursor-pointer">
                      <div className="flex items-center gap-2 truncate">
                        <input
                          title="city"
                          type="checkbox"
                          checked={selected[city] ?? false}
                          onChange={() => toggleCity(state, city)}
                          className="w-4 h-4 truncate"
                        />
                        <div className="flex justify-between">
                          <div className="flex items-center gap-1">
                            <span className={`text-[12px] font-[600] ${selected[city] ? "" : "text-[#6F7F8E]"}`}>
                              {city}
                            </span>
                            <span className="text-gray-600 text-[12px]">
                              ({processedData[state]?.cities?.[city]?.count})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          title="city button"
                          type="button"
                          onClick={() => toggleCollapse(city)}
                          className="focus:outline-none text-black text-[10px] text-[#9A9A9A]"
                        >
                          <i
                            className={`text-[#9A9A9A] ${
                              !collapsed[city] ? "fi fi-br-angle-up" : "fi fi-br-angle-down"
                            }`}
                          ></i>
                        </button>
                        <div className="flex gap-2 px-1">
                          <h1 className="text-[#6F7F8E] text-[12px]">
                            {processedData[state]?.cities?.[city]?.Male?.toFixed(1)}%
                          </h1>
                          <h1 className="text-[#6F7F8E] text-[12px]">
                            {processedData[state]?.cities?.[city]?.Female?.toFixed(1)}%
                          </h1>
                        </div>
                      </div>
                    </div>

                    {/* Zone list */}
                    {!collapsed[city] && (
                      <ul className="ml-4 mt-1">
                        {Object.keys(processedData?.[state]?.cities?.[city]?.zones || {}).map((zone) => (
                          <li key={zone} className="py-1">
                            <div className="flex items-center justify-between gap-2 py-1 cursor-pointer">
                              <div className="flex items-center gap-2">
                                <input
                                  title="zone"
                                  type="checkbox"
                                  checked={selected[zone] ?? false}
                                  onChange={() => toggleZone(state, city, zone)}
                                  className="w-4 h-4 truncate"
                                />
                                <div className="flex justify-between">
                                  <div className="flex items-center gap-1">
                                    <span className={`text-[12px] font-[500] ${selected[zone] ? "" : "text-[#6F7F8E]"}`}>
                                      {zone}
                                    </span>
                                    <span className="text-gray-600 text-[12px]">
                                      ({processedData[state]?.cities?.[city]?.zones?.[zone]?.count})
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <div className="flex gap-2 px-1">
                                  <h1 className="text-[#6F7F8E] text-[12px]">
                                    {processedData[state]?.cities?.[city]?.zones?.[zone]?.Male?.toFixed(1)}%
                                  </h1>
                                  <h1 className="text-[#6F7F8E] text-[12px]">
                                    {processedData[state]?.cities?.[city]?.zones?.[zone]?.Female?.toFixed(1)}%
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};