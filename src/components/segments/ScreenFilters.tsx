import { CheckboxInput } from "../../components/atoms/CheckboxInput";

export const ScreenFilters = ({
  cityZones,
  cityTP,
  screenTypes,
  zoneFilters,
  tpFilters,
  stFilters,
  handleFilterSelection,
  filteredScreensData,
  screensBuyingCount,
  currentSummaryTab,
  filterType,
  setFilterType,
  setIsOpen,
  listView,
}: any) => {
  return (
    <div className="">
      {listView ? (
        <div className="absolute right-12 w-[40vw] rounded-[8px] bg-white shadow-lg mt-4 z-50 border border-[#D3D3D320]">
          <div className="flex justify-between items-center border-b p-4">
            <h1 className="font-semibold text-[14px]">Screen List</h1>
            <button
              title="close"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <i className="fi fi-br-cross-small flex justify-center items-center"></i>
            </button>
          </div>
          <div className="p-4 grid grid-cols-12">
            <div className="col-span-4 bg-[#D3D3D310] rounded-[8px] p-2">
              <div className="flex items-center gap-2">
                <CheckboxInput
                  label={`Touchpoints `}
                  checked={filterType === "Touchpoints"}
                  onChange={() => {
                    setFilterType("Touchpoints");
                  }}
                />
                <p className="text-[14px]">
                  (
                  {
                    Object.keys(
                      cityTP?.[
                        Object.keys(screensBuyingCount)?.[
                          Number(currentSummaryTab) - 1
                        ]
                      ]
                    )?.length
                  }
                  )
                </p>
              </div>
              <div className="pt-1 mb-1 border-b border-[#D3D3D350]" />
              <div className="flex items-center gap-2">
                <CheckboxInput
                  label="Screen Type"
                  checked={filterType === "Screen Type"}
                  onChange={() => {
                    setFilterType("Screen Type");
                  }}
                />
                <p className="text-[14px]">
                  (
                  {
                    Object.keys(
                      screenTypes?.[
                        Object.keys(screensBuyingCount)?.[
                          Number(currentSummaryTab) - 1
                        ]
                      ]
                    )?.length
                  }
                  )
                </p>
              </div>
              <div className="pt-1 mb-1 border-b border-[#D3D3D350]" />
              <div className="flex items-center gap-2">
                <CheckboxInput
                  label="Zones"
                  checked={filterType === "Zones"}
                  onChange={() => {
                    setFilterType("Zones");
                  }}
                />
                <p className="text-[14px]">
                  (
                  {
                    Object.keys(
                      cityZones?.[
                        Object.keys(screensBuyingCount)?.[
                          Number(currentSummaryTab) - 1
                        ]
                      ]
                    )?.length
                  }
                  )
                </p>
              </div>
              <div className="pt-1 mb-1 border-b border-[#D3D3D350]" />
            </div>
            {filterType === "Screen Type" ? (
              <div className="col-span-8 p-2">
                {screenTypes &&
                  Object.keys(
                    screenTypes?.[
                      Object.keys(screensBuyingCount)?.[
                        Number(currentSummaryTab) - 1
                      ]
                    ]
                  )?.map((st: any, i: any) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <CheckboxInput
                          label={st}
                          checked={stFilters?.includes(st)}
                          onChange={(checked) =>
                            handleFilterSelection({
                              type: "st",
                              value: st,
                              checked,
                            })
                          }
                        />
                        <p className="text-[14px]">
                          (
                          {
                            filteredScreensData?.allResult?.filter(
                              (s: any) => s?.screenType === st
                            )?.length
                          }
                          )
                        </p>
                      </div>
                      <div className="pt-1 mb-1 border-b border-[#D3D3D350]" />
                    </div>
                  ))}
              </div>
            ) : filterType === "Zones" ? (
              <div className="col-span-8 p-2">
                {cityZones &&
                  Object.keys(
                    cityZones?.[
                      Object.keys(screensBuyingCount)?.[
                        Number(currentSummaryTab) - 1
                      ]
                    ]
                  )?.map((zone: any, i: any) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <CheckboxInput
                          label={zone}
                          checked={zoneFilters?.includes(zone)}
                          onChange={(checked) => {
                            handleFilterSelection({
                              type: "zone",
                              value: zone,
                              checked,
                            });
                          }}
                        />
                        <p className="text-[14px]">
                          (
                          {
                            filteredScreensData?.allResult?.filter(
                              (s: any) => s?.location?.zoneOrRegion === zone
                            )?.length
                          }
                          )
                        </p>
                      </div>
                      <div className="pt-1 mb-1 border-b border-[#D3D3D350]" />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="col-span-8 p-2">
                {cityTP &&
                  Object.keys(
                    cityTP?.[
                      Object.keys(screensBuyingCount)?.[
                        Number(currentSummaryTab) - 1
                      ]
                    ]
                  )?.map((tp: any, i: any) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <CheckboxInput
                          label={tp}
                          checked={tpFilters?.includes(tp)}
                          onChange={(checked) => {
                            handleFilterSelection({
                              type: "tp",
                              value: tp,
                              checked,
                            });
                          }}
                        />
                        <p className="text-[14px]">
                          (
                          {
                            filteredScreensData?.allResult?.filter(
                              (s: any) => s?.location?.touchPoint === tp
                            )?.length
                          }
                          )
                        </p>
                      </div>
                      <div className="pt-1 mb-1 border-b border-[#D3D3D350]" />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-[16px]">Filters</h1>
            {/* <p className="text-[12px]">Clear All</p> */}
          </div>
          <div className="py-2">
            <h1 className="font-semibold">Zone</h1>
            {Object.keys(
              cityZones[
                Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
              ]
            )?.map((zone: any, i: any) => (
              <div
                key={i}
                className="flex items-center justify-between py-1 text-[14px]"
              >
                <CheckboxInput
                  label={zone}
                  checked={zoneFilters?.includes(zone)}
                  onChange={(checked) => {
                    handleFilterSelection({
                      type: "zone",
                      value: zone,
                      checked,
                    });
                  }}
                />
                <h1 className="">
                  (
                  {
                    filteredScreensData?.allResult?.filter(
                      (s: any) => s.location.zoneOrRegion === zone
                    )?.length
                  }
                  )
                </h1>
              </div>
            ))}
          </div>
          <div className="py-2">
            <h1 className="font-semibold">Touchpoint</h1>
            {Object.keys(
              cityTP[
                Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
              ]
            )?.map((tp: any, j: any) => (
              <div
                key={j}
                className="flex items-center justify-between py-1 text-[14px]"
              >
                <CheckboxInput
                  label={tp}
                  checked={tpFilters?.includes(tp)}
                  onChange={(checked) =>
                    handleFilterSelection({ type: "tp", value: tp, checked })
                  }
                />
                <h1 className="">
                  (
                  {
                    filteredScreensData?.allResult?.filter(
                      (s: any) => s.location.touchPoint === tp
                    )?.length
                  }
                  )
                </h1>
              </div>
            ))}
          </div>
          <div className="py-2">
            <h1 className="font-semibold">Screen Type</h1>
            {Object.keys(
              screenTypes[
                Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
              ]
            )?.map((st: any, k: any) => (
              <div
                key={k}
                className="flex items-center justify-between py-1 text-[14px]"
              >
                <CheckboxInput
                  label={st}
                  checked={stFilters?.includes(st)}
                  onChange={(checked) =>
                    handleFilterSelection({ type: "st", value: st, checked })
                  }
                />
                <h1 className="">
                  (
                  {
                    filteredScreensData?.allResult?.filter(
                      (s: any) => s.screenType === st
                    )?.length
                  }
                  )
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
