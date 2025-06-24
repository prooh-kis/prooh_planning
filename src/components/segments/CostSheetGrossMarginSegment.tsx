import { Loading } from "../Loading";
import { CostSheetFilterGridSegment } from "./CostSheetFilterGridSegment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGrossMarginForCostSummaryPopupPage } from "../../actions/screenAction";
import { SectionHeaderWithSwitch } from "./SectionHeaderWithSwitch";
import { CostSheetHorizontalBarChartSegment } from "./CostSheetHorizontalBarChartSegment";

interface CostSheetGrossMarginSegmentProps {
  filters?: any;
  setFilters?: any;
  campaignId?: any;
}
export const CostSheetGrossMarginSegment = ({
  filters,
  setFilters,
  campaignId
}: CostSheetGrossMarginSegmentProps) => {
  const dispatch = useDispatch<any>();
  const [dataForGraph, setDataForGraph] = useState<any>([]);

  const {
    loading: loadingGrossMarginData,
    error: errorGrossMarginData,
    data: grossMarginData
  } = useSelector((state: any) => state.grossMarginForCostSummary);

  const handleClick = ({ type, value, checked }: any) => {
    setFilters((prev: any) => ({
      ...prev,
      cities: {
        ...prev.cities,
        vendor:
          type == "city" && checked
            ? [...prev.cities.vendor, value]
            : type == "city" && checked && value == "all"
            ? []
            : type == "city" && !checked
            ? filters.cities.vendor.filter((f: any) => f !== value)
            : filters.cities.vendor,
      },
      touchPoints: {
        ...prev.touchPoints,
        vendor:
          type == "touchpoint" && checked
            ? [...prev.touchPoints.vendor, value]
            : type == "touchpoint" && checked && value == "all"
            ? []
            : type == "touchpoint" && !checked
            ? filters.touchPoints.vendor.filter((f: any) => f !== value)
            : filters.touchPoints.vendor,
      },
      screenTypes: {
        ...prev.screenTypes,
        vendor:
          type == "screenType" && checked
            ? [...prev.screenTypes.vendor, value]
            : type == "screenType" && checked && value == "all"
            ? []
            : type == "screenType" && !checked
            ? filters.screenTypes.vendor.filter((f: any) => f !== value)
            : filters.screenTypes.vendor,
      },
      vendorTypes: {
        ...prev.vendorTypes,
        vendor:
          type == "vendorType" && checked
            ? [...prev.vendorTypes.vendor, value]
            : type == "vendorType" && checked && value == "all"
            ? []
            : type == "vendorType" && !checked
            ? filters.vendorTypes.vendor.filter((f: any) => f !== value)
            : filters.vendorTypes.vendor,
      },
    }));
  };


  // Initialize filters based on spot data
  useEffect(() => {
    if (grossMarginData) {

      if (filters.cities.margin.length == 0 || filters.touchPoints.margin.length == 0 || filters.screenTypes.margin.length == 0 || filters.vendorTypes.margin.length == 0) {
        setFilters((prev: any) => ({
          ...prev,
          cities: {
            ...prev.cities,
            margin: Object.keys(grossMarginData.cityWiseData),
          },
          touchPoints: {
            ...prev.touchPoints,
            margin: Object.keys(grossMarginData.touchPointWiseData),
          },
          screenTypes: {
            ...prev.screenTypes,
            margin: Object.keys(grossMarginData.screenTypeWiseData),
          },
          vendorTypes: {
            ...prev.vendorTypes,
            margin: Object.keys(grossMarginData.vendorTypeWiseData),
          },
        }));
      }
      
      const { all, ...restData} = grossMarginData.vendorWiseData;
      setDataForGraph(restData);

    }
      
  }, [grossMarginData, filters, setFilters]);

  // Refresh data when filters change
  useEffect(() => {
    if (filters && campaignId) {
      const timer = setTimeout(() => {
        dispatch(getGrossMarginForCostSummaryPopupPage({
          id: campaignId,
          cities: filters.cities.margin?.filter((f: any) => f !== "all"),
          touchPoints: filters.touchPoints.margin?.filter(
            (f: any) => f !== "all"
          ),
          screenTypes: filters.screenTypes.margin?.filter(
            (f: any) => f !== "all"
          ),
          vendorTypes: filters.vendorTypes.margin?.filter(
            (f: any) => f !== "all"
          ),
        }));
      }, 300); // Small debounce to avoid too many API calls

      return () => clearTimeout(timer);
    }
  }, [
    dispatch, 
    campaignId, 
    filters
  ]);

  return (
    <div className="grid grid-cols-12 gap-2 px-4 py-2">
      <div className="col-span-9">
        <CostSheetFilterGridSegment
          loading={loadingGrossMarginData}
          data={grossMarginData}
          filters={filters}
          handleClick={handleClick}
          type="vendor"
          valueType="cost"
        />
      </div>
      {loadingGrossMarginData ? (
        <Loading />
      ) : (
        <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
          <div className="border-b">
            <SectionHeaderWithSwitch
              iconClass="fi-sr-marker"
              title="Margin By Vendor"
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
          <div className="h-full flex items-center justify-center">
            <CostSheetHorizontalBarChartSegment
              currentData={Object.values(dataForGraph)}
              labels={Object.values(dataForGraph)}
              additionalData={Object.keys(dataForGraph)}
              label="Vendor Payout"
            />
          </div>
        </div>
      )}
    </div>
  )}
