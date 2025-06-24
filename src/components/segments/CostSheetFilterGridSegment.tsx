import { useEffect, useState } from "react";
import { RadioInput } from "../../components/atoms/RadioInput";
import { SectionHeaderWithSwitch } from "./SectionHeaderWithSwitch";
import { Loading } from "../../components/Loading";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch } from "react-redux";
import { getClientCostForCostSummaryPopupPage } from "../../actions/screenAction";

interface CostSheetFilterGridSegmentProps {
  loading?: any;
  data?: any;
  filters?: any;
  handleClick?: any;
  type?: any;
  valueType?: any;
}
export const CostSheetFilterGridSegment = ({
  loading,
  data,
  filters,
  handleClick,
  type = "client",
  valueType="cost"
}: CostSheetFilterGridSegmentProps) => {
  return (
    <div className="grid grid-cols-10 gap-2 h-full">
     <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeaderWithSwitch
            iconClass="fi-sr-marker"
            title="Cities"
            bgColor=" bg-[#6982FF]"
            // showPercent={showPercent?.[1]}
            // setShowPercent={() => {
            //   setShowPercent((pre: any) => {
            //     return {
            //       ...pre,
            //       1: !showPercent?.[1],
            //     };
            //   });
            // }}
            switchShow={false}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="py-2">
            {data && Object.keys(data?.cityWiseData)?.map(
              (cityKey: any, i: any) => (
                <div key={i} className="grid grid-cols-4 gap-2 pt-1">
                  <div className="col-span-3">
                    <CheckboxInput
                      disabled={false}
                      label={cityKey.toUpperCase()}
                      checked={filters.cities[
                        type
                      ]?.includes(cityKey)}
                      textSize={"10px"}
                      color={"#0E212E"}
                      onChange={(checked) => {
                        handleClick({
                          type: "city",
                          value: cityKey,
                          checked: checked,
                        })
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <h1 className="text-[10px] truncate">
                    ₹ {formatNumber(
                        data?.cityWiseData[
                          cityKey
                        ]?.[valueType]?.toFixed(0)
                      )}
                    </h1>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeaderWithSwitch
            iconClass="fi-sr-marker"
            title="TouchPoints"
            bgColor=" bg-[#6982FF]"
            // showPercent={showPercent?.[1]}
            // setShowPercent={() => {
            //   setShowPercent((pre: any) => {
            //     return {
            //       ...pre,
            //       1: !showPercent?.[1],
            //     };
            //   });
            // }}
            switchShow={false}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="py-2">
            {data && Object.keys(data?.touchPointWiseData)?.map(
              (tpKey: any, i: any) => (
                <div key={i} className="grid grid-cols-4 gap-2 pt-1">
                  <div className="col-span-3">
                    <CheckboxInput
                      disabled={false}
                      label={tpKey.toUpperCase()}
                      checked={filters.touchPoints[
                        type
                      ]?.includes(tpKey)}
                      textSize={"10px"}
                      color={"#0E212E"}
                      onChange={(checked) => {
                        handleClick({
                          type: "touchpoint",
                          value: tpKey,
                          checked: checked,
                        })
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <h1 className="text-[10px] truncate">
                    ₹ {formatNumber(
                        data?.touchPointWiseData[
                          tpKey
                        ]?.[valueType]?.toFixed(0)
                      )}
                    </h1>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeaderWithSwitch
            iconClass="fi-sr-marker"
            title="Screen Types"
            bgColor=" bg-[#6982FF]"
            // showPercent={showPercent?.[1]}
            // setShowPercent={() => {
            //   setShowPercent((pre: any) => {
            //     return {
            //       ...pre,
            //       1: !showPercent?.[1],
            //     };
            //   });
            // }}
            switchShow={false}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="py-2">
            {data && Object.keys(data?.screenTypeWiseData)?.map(
              (stKey: any, i: any) => (
                <div key={i} className="grid grid-cols-4 gap-2 pt-1">
                  <div className="col-span-3">
                    <CheckboxInput
                      disabled={false}
                      label={stKey.toUpperCase()}
                      checked={filters.screenTypes[
                        type
                      ]?.includes(stKey)}
                      textSize={"10px"}
                      color={"#0E212E"}
                      onChange={(checked) => {
                        handleClick({
                          type: "screenType",
                          value: stKey,
                          checked: checked,
                        })
                      }}
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <h1 className="text-[10px] truncate">
                    ₹ {formatNumber(
                        data?.screenTypeWiseData[
                          stKey
                        ]?.[valueType]?.toFixed(0)
                      )}
                    </h1>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <div className="col-span-2 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
        <div className="border-b">
          <SectionHeaderWithSwitch
            iconClass="fi-sr-marker"
            title="Vendor Types"
            bgColor=" bg-[#6982FF]"
            // showPercent={showPercent?.[1]}
            // setShowPercent={() => {
            //   setShowPercent((pre: any) => {
            //     return {
            //       ...pre,
            //       1: !showPercent?.[1],
            //     };
            //   });
            // }}
            switchShow={false}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="py-2">
            {data && Object.keys(data?.vendorTypeWiseData)?.map(
              (vtKey: any, i: any) => (
                <div key={i} className="grid grid-cols-4 gap-2 pt-1">
                  <div className="col-span-3">
                    <CheckboxInput
                      disabled={false}
                      label={vtKey.toUpperCase()}
                      checked={filters.vendorTypes[
                        type
                      ]?.includes(vtKey)}
                      textSize={"10px"}
                      color={"#0E212E"}
                      onChange={(checked) =>
                        handleClick({
                          type: "vendorType",
                          value: vtKey,
                          checked: checked,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <h1 className="text-[10px] truncate">
                      ₹ {formatNumber(
                        data?.vendorTypeWiseData[
                          vtKey
                        ]?.[valueType]?.toFixed(0)
                      )}
                    </h1>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )}