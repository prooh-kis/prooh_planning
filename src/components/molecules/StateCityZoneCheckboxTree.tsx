import React, { useState, useEffect } from "react";

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
}

export const StateCityZoneCheckboxTree: React.FC<Props> = ({
  data,
  setSelectedCity,
  setSelectedZone,
}) => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({}); // Track expanded/collapsed state

  const processedData = Object.fromEntries(
    Object.entries(data || {}).filter(([key]) => key !== "id")
  );

  const handleSave = () => {
    const selectedCities: string[] = [];
    const selectedZones: string[] = [];

    Object.keys(processedData).forEach((state) => {
      Object.keys(processedData[state]?.cities || {}).forEach((city) => {
        let cityHasSelectedZones = false;

        Object.keys(processedData[state]?.cities?.[city]?.zones || {}).forEach(
          (zone) => {
            if (selected[zone]) {
              selectedZones.push(zone);
              cityHasSelectedZones = true;
            }
          }
        );

        if (selected[city] || cityHasSelectedZones) {
          selectedCities.push(city);
        }
      });
    });

    setSelectedCity(selectedCities);
    setSelectedZone(selectedZones);
  };

  useEffect(() => {
    handleSave();
  }, [selected]);

  // Initialize all checkboxes as checked
  useEffect(() => {
    const initialSelected: Record<string, boolean> = {};
    Object.keys(processedData).forEach((state) => {
      initialSelected[state] = true;
      Object.keys(processedData[state]?.cities || {}).forEach((city) => {
        initialSelected[city] = true;
        Object.keys(processedData[state]?.cities?.[city]?.zones || {}).forEach(
          (zone) => {
            initialSelected[zone] = true;
          }
        );
      });
    });
    setSelected(initialSelected);
  }, [data]);

  const toggleState = (state: string) => {
    const isChecked = !selected[state];
    setSelected((prev) => {
      const newState = { ...prev, [state]: isChecked };
      Object.keys(data[state].cities).forEach((city) => {
        newState[city] = isChecked;
        Object.keys(data[state].cities[city].zones).forEach((zone) => {
          newState[zone] = isChecked;
        });
      });
      return newState;
    });
  };

  const toggleCity = (state: string, city: string) => {
    const isChecked = !selected[city];
    setSelected((prev) => {
      const newState = { ...prev, [city]: isChecked };
      Object.keys(data[state].cities[city].zones).forEach((zone) => {
        newState[zone] = isChecked;
      });

      return newState;
    });
  };

  const toggleZone = (state: string, city: string, zone: string) => {
    const isChecked = !selected[zone];
    setSelected((prev) => ({ ...prev, [zone]: isChecked }));
  };

  const toggleCollapse = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full px-4 py-2">
      <ul>
        {Object.keys(processedData || {}).map((state) => (
          <li key={state} className="mb-2 text-[#303030]">
            <div className="flex items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected[state]}
                  onChange={() => toggleState(state)}
                  className="w-4 h-4"
                />
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[14px] font-[700]${
                        selected[state] ? "" : "text-[#6F7F8E]"
                      }`}
                    >
                      {state}
                    </span>
                    <span className="text-gray-600 text-[10px]">
                      (
                      {Object.values(processedData[state]?.cities || {}).reduce(
                        (acc, city) => acc + city.count,
                        0
                      )}
                      )
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-4 pr-4">
                  <h1 className="text-gray-600 text-[10px]">
                    {processedData[state]?.gender?.Male?.toFixed(1)}%
                  </h1>
                  <h1 className="text-gray-600 text-[10px]">
                    {processedData[state]?.gender?.Female?.toFixed(1)}%
                  </h1>
                </div>
                <button
                  onClick={() => toggleCollapse(state)}
                  className="focus:outline-none text-black text-[10px] "
                >
                  <i
                    className={`text-[#9A9A9A] ${
                      !collapsed[state]
                        ? "fi fi-br-angle-up"
                        : "fi fi-br-angle-down"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            {!collapsed[state] && (
              <ul className="ml-4 mt-1">
                {Object.keys(processedData?.[state]?.cities || {}).map(
                  (city) => (
                    <li key={city} className="mb-2 ">
                      <div className="flex items-center justify-between gap-2 py-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selected[city]}
                            onChange={() => toggleCity(state, city)}
                            className="w-4 h-4"
                          />
                          <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                              <span
                                className={`text-[12px] font-[600]${
                                  selected[city] ? "" : "text-[#6F7F8E]"
                                }`}
                              >
                                {city}
                              </span>
                              <span className="text-gray-600 text-[10px]">
                                ({processedData[state]?.cities?.[city]?.count})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex gap-4 pr-4">
                            <h1 className="text-gray-600 text-[10px]">
                              {processedData[state]?.cities?.[
                                city
                              ]?.Male?.toFixed(1)}
                              %
                            </h1>
                            <h1 className="text-gray-600 text-[10px]">
                              {processedData[state]?.cities?.[
                                city
                              ]?.Female?.toFixed(1)}
                              %
                            </h1>
                          </div>
                          <button
                            onClick={() => toggleCollapse(city)}
                            className="focus:outline-none text-black text-[10px] text-[#9A9A9A]"
                          >
                            <i
                              className={`text-[#9A9A9A] ${
                                !collapsed[city]
                                  ? "fi fi-br-angle-up"
                                  : "fi fi-br-angle-down"
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>

                      {!collapsed[city] && (
                        <ul className="ml-4 mt-1">
                          {Object.keys(
                            processedData?.[state]?.cities?.[city]?.zones || {}
                          ).map((zone) => (
                            <li key={zone} className="py-1">
                              <div className="flex items-center justify-between gap-2 py-1">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={selected[zone]}
                                    onChange={() =>
                                      toggleZone(state, city, zone)
                                    }
                                    className="w-4 h-4"
                                  />
                                  <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                      <span
                                        className={`text-[12px] font-[500] ${
                                          selected[zone] ? "" : "text-[#6F7F8E]"
                                        }`}
                                      >
                                        {zone}
                                      </span>
                                      <span className="text-gray-600 text-[10px]">
                                        (
                                        {
                                          processedData[state]?.cities?.[city]
                                            ?.zones?.[zone]?.count
                                        }
                                        )
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 pr-4">
                                  <div className="flex gap-4 pr-4">
                                    <h1 className="text-gray-600 text-[10px]">
                                      {processedData[state]?.cities?.[
                                        city
                                      ]?.zones?.[zone]?.Male?.toFixed(1)}
                                      %
                                    </h1>
                                    <h1 className="text-gray-600 text-[10px]">
                                      {processedData[state]?.cities?.[
                                        city
                                      ]?.zones?.[zone]?.Female?.toFixed(1)}
                                      %
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
