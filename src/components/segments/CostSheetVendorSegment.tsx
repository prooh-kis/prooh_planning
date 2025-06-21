
import { CostSheetFilterGridSegment } from "./CostSheetFilterGridSegment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getVendorPayoutForCostSummaryPopupPage } from "../../actions/screenAction";
import { Loading } from "../../components/Loading";
import { SectionHeaderWithSwitch } from "./SectionHeaderWithSwitch";
import { CostSheetHorizontalBarChartSegment } from "./CostSheetHorizontalBarChartSegment";

interface CostSheetVendorSegmentProps {
  filters?: any;
  setFilters?: any;
  campaignId?: any;
}
export const CostSheetVendorSegment = ({
  filters,
  setFilters,
  campaignId
}: CostSheetVendorSegmentProps) => {
  const dispatch = useDispatch<any>();

  const [dataForGraph, setDataForGraph] = useState<any>([]);
  const {
    loading: loadingVendorPayoutData,
    error: errorVendorPayoutData,
    data: vendorPayoutData
  } = useSelector((state: any) => state.vendorPayoutForCostSummary);

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
    if (vendorPayoutData) {
      if (filters.cities.vendor.length == 0 || filters.touchPoints.vendor.length == 0 || filters.screenTypes.vendor.length == 0 || filters.vendorTypes.vendor.length == 0) {
        setFilters((prev: any) => ({
          ...prev,
          cities: {
            ...prev.cities,
            vendor: Object.keys(vendorPayoutData.cityWiseData),
          },
          touchPoints: {
            ...prev.touchPoints,
            vendor: Object.keys(vendorPayoutData.touchPointWiseData),
          },
          screenTypes: {
            ...prev.screenTypes,
            vendor: Object.keys(vendorPayoutData.screenTypeWiseData),
          },
          vendorTypes: {
            ...prev.vendorTypes,
            vendor: Object.keys(vendorPayoutData.vendorTypeWiseData),
          },
        }));
      }
      const { all, ...restData} = vendorPayoutData.vendorWiseData;
      setDataForGraph(restData);
    } 
      
      
  }, [vendorPayoutData, filters, setFilters]);

  // Refresh data when filters change
  useEffect(() => {
    if (filters && campaignId) {
      const timer = setTimeout(() => {
        dispatch(getVendorPayoutForCostSummaryPopupPage({
          id: campaignId,
          cities: filters.cities.vendor?.filter((f: any) => f !== "all"),
          touchPoints: filters.touchPoints.vendor?.filter(
            (f: any) => f !== "all"
          ),
          screenTypes: filters.screenTypes.vendor?.filter(
            (f: any) => f !== "all"
          ),
          vendorTypes: filters.vendorTypes.vendor?.filter(
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
          loading={loadingVendorPayoutData}
          data={vendorPayoutData}
          filters={filters}
          handleClick={handleClick}
          type="vendor"
          valueType="cost"
        />
      </div>
      {loadingVendorPayoutData ? (
        <Loading />
      ) : (
        <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
          <div className="border-b">
            <SectionHeaderWithSwitch
              iconClass="fi-sr-marker"
              title="Vendor Payout"
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