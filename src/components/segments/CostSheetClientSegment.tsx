import { SectionHeaderWithSwitch } from "./SectionHeaderWithSwitch";
import { Loading } from "../../components/Loading";
import { CostSheetFilterGridSegment } from "./CostSheetFilterGridSegment";
import { CostSheetPieChartSegment } from "./CostSheetPieChartSegment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getClientCostForCostSummaryPopupPage } from "../../actions/screenAction";

interface CostSheetClientSegmentProps {
  filters?: any;
  setFilters?: any;
  campaignId?: any;
}
export const CostSheetClientSegment = ({
  filters,
  setFilters,
  campaignId
}: CostSheetClientSegmentProps) => {
  const dispatch = useDispatch<any>();

  const {
    loading: loadingClientCostData,
    error: errorClientCostData,
    data: clientCostData
  } = useSelector((state: any) => state.clientCostForCostSummary);

  const handleClick = ({ type, value, checked }: any) => {
    setFilters((prev: any) => ({
      ...prev,
      cities: {
        ...prev.cities,
        client:
          type == "city" && checked
            ? [...prev.cities.client, value]
            : type == "city" && checked && value == "all"
            ? []
            : type == "city" && !checked
            ? filters.cities.client.filter((f: any) => f !== value)
            : filters.cities.client,
      },
      touchPoints: {
        ...prev.touchPoints,
        client:
          type == "touchpoint" && checked
            ? [...prev.touchPoints.client, value]
            : type == "touchpoint" && checked && value == "all"
            ? []
            : type == "touchpoint" && !checked
            ? filters.touchPoints.client.filter((f: any) => f !== value)
            : filters.touchPoints.client,
      },
      screenTypes: {
        ...prev.screenTypes,
        client:
          type == "screenType" && checked
            ? [...prev.screenTypes.client, value]
            : type == "screenType" && checked && value == "all"
            ? []
            : type == "screenType" && !checked
            ? filters.screenTypes.client.filter((f: any) => f !== value)
            : filters.screenTypes.client,
      },
      vendorTypes: {
        ...prev.vendorTypes,
        client:
          type == "vendorType" && checked
            ? [...prev.vendorTypes.client, value]
            : type == "vendorType" && checked && value == "all"
            ? []
            : type == "vendorType" && !checked
            ? filters.vendorTypes.client.filter((f: any) => f !== value)
            : filters.vendorTypes.client,
      },
    }));
  };


  // Initialize filters based on spot data
  useEffect(() => {
    if (clientCostData && (filters.cities.client.length == 0 || filters.touchPoints.client.length == 0 || filters.screenTypes.client.length == 0 || filters.vendorTypes.client.length == 0)) {
      setFilters((prev: any) => ({
        ...prev,
        cities: {
          ...prev.cities,
          client: Object.keys(clientCostData.cityWiseData),
        },
        touchPoints: {
          ...prev.touchPoints,
          client: Object.keys(clientCostData.touchPointWiseData),
        },
        screenTypes: {
          ...prev.screenTypes,
          client: Object.keys(clientCostData.screenTypeWiseData),
        },
        vendorTypes: {
          ...prev.vendorTypes,
          client: Object.keys(clientCostData.vendorTypeWiseData),
        },
      }));
    }
  }, [clientCostData, filters, setFilters]);

  // Refresh data when filters change
  useEffect(() => {
    if (filters && campaignId) {
      const timer = setTimeout(() => {
        dispatch(getClientCostForCostSummaryPopupPage({
          id: campaignId,
          cities: filters.cities.client?.filter((f: any) => f !== "all"),
          touchPoints: filters.touchPoints.client?.filter(
            (f: any) => f !== "all"
          ),
          screenTypes: filters.screenTypes.client?.filter(
            (f: any) => f !== "all"
          ),
          vendorTypes: filters.vendorTypes.client?.filter(
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
    <div className="grid grid-cols-12 gap-2 px-4 py-2 h-full">
      <div className="col-span-9 h-full">
        <CostSheetFilterGridSegment
          loading={loadingClientCostData}
          data={clientCostData}
          filters={filters}
          handleClick={handleClick}
          type="client"

        />
      </div>
      {loadingClientCostData ? (
        <Loading />
      ) : (
        <div className="col-span-3 bg-[#FFFFFF] p-4 rounded-[12px] border border-gray-100 shadow-sm">
          <div className="border-b">
            <SectionHeaderWithSwitch
              iconClass="fi-sr-marker"
              title="Vendor List"
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
          {clientCostData && (
            <div className="h-full flex items-center justify-center">
              <CostSheetPieChartSegment
                data={clientCostData?.vendorWiseData}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )}