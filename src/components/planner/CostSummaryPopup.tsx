import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { useDispatch } from "react-redux";
import {
  editCostDetailsScreenWiseForCostSummaryPopupPage,
  getBasicDetailsCostSummaryPopupPage,
  getClientCostForCostSummaryPopupPage,
  getGrossMarginForCostSummaryPopupPage,
  getInventoryDetailsForCostSummaryPopupPage,
  getVendorPayoutForCostSummaryPopupPage,
} from "../../actions/screenAction";
import { EditIcon } from "../../assets";
import { CostSummaryBox } from "../../components/segments/CostSummaryBox";
import ButtonInput from "../../components/atoms/ButtonInput";
import { CostSheetTable } from "../../components/tables";
import { CostSheetClientSegment } from "../../components/segments/CostSheetClientSegment";
import { CostSheetVendorSegment } from "../../components/segments/CostSheetVendorSegment";
import { CostSheetGrossMarginSegment } from "../../components/segments/CostSheetGrossMarginSegment";
import { message } from "antd";

type CostMetric = "clientCost" | "vendorCost" | "grossMargin";

interface TitleConfig {
  label: string;
  bgColor: string;
  icon: string;
}

interface FilterState {
  client: string[];
  vendor: string[];
  margin: string[];
}

export const CostSummaryPopup = ({ onClose, campaignId }: any) => {
  const dispatch = useDispatch<any>();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const [result, setResult] = useState<any>(null);
  const [currentRow, setCurrentRow] = useState<number>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

// State for filters
  const [filters, setFilters] = useState<{
    cities: FilterState;
    touchPoints: FilterState;
    screenTypes: FilterState;
    vendorTypes: FilterState;
  }>({
    cities: {
      client: [],
      vendor: [],
      margin: [],
    },
    touchPoints: {
      client: [],
      vendor: [],
      margin: [],
    },
    screenTypes: {
      client: [],
      vendor: [],
      margin: [],
    },
    vendorTypes: {
      client: [],
      vendor: [],
      margin: [],
    }
  });

  const basicDetailsForCostSummary = useSelector(
    (state: any) => state.basicDetailsForCostSummary
  );

  const {
    loading: loadingBasicDetails,
    error: errorBasicDetails,
    data: basicDetails,
  } = basicDetailsForCostSummary;

  const inventoryDetailsForCostSummary = useSelector(
    (state: any) => state.inventoryDetailsForCostSummary
  );

  const {
    loading: loadingInventoryDetails,
    error: errorInventoryDetails,
    success: successInventoryDetails,
    data: inventoryDetails,
  } = inventoryDetailsForCostSummary;


  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit
  } = useSelector((state: any) => state.editCostDetailsScreenWise);

  useEffect(() => {
    if (successInventoryDetails && result === null) {
      setResult(
        inventoryDetails?.map((data: any) => {
          return {
            ...data,
            documents: data?.documents ? data?.documents : [],
          };
        })
      );
    }

    if (successEdit) {
      message.success("Cost details updated successfully")
    }

  }, [successInventoryDetails, result, inventoryDetails, successEdit]);


  useEffect(() => {
    dispatch(getInventoryDetailsForCostSummaryPopupPage({ id: campaignId }));
    dispatch(getBasicDetailsCostSummaryPopupPage({ id: campaignId }));
    dispatch(getClientCostForCostSummaryPopupPage({
      id: campaignId,
      cities: [],
      touchPoints: [],
      screenTypes: [],
      vendorTypes: []
    }));
    dispatch(getVendorPayoutForCostSummaryPopupPage({
      id: campaignId,
      cities: [],
      touchPoints: [],
      screenTypes: [],
      vendorTypes: []
    }));
    dispatch(getGrossMarginForCostSummaryPopupPage({
      id: campaignId,
      cities: [],
      touchPoints: [],
      screenTypes: [],
      vendorTypes: []
    }));
    
  }, [dispatch, campaignId]);

  const titles: Record<CostMetric, TitleConfig> = {
    clientCost: {
      label: "Total Client Cost",
      bgColor: "#FF7525",
      icon: "fi fi-sr-wallet-arrow",
    },
    vendorCost: {
      label: "Total Vendor Cost",
      bgColor: "#4CAF50",
      icon: "fi fi-sr-wallet-arrow",
    },
    grossMargin: {
      label: "Gross Margin",
      bgColor: "#2196F3",
      icon: "fi fi-sr-wallet",
    },
  } as const;


  return (
    <div className="font-custom fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-[80%] w-[96%] p-1 overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center px-4 py-2">
          <div className=" flex items-center gap-2">
            <i
              className="fi fi-rr-arrow-left text-gray-400 flex items-center"
              onClick={() => onClose()}
            ></i>
            <h1 className="text-[18px] font-bold">Const Summary</h1>
          </div>
          <i className="fi fi-br-cross" onClick={() => onClose()}></i>
        </div>
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-3 gap-2 px-4 py-2">
            {(Object.keys(titles) as CostMetric[]).map(
              (key: CostMetric, index: number) => (
                <CostSummaryBox
                  key={key}
                  title={titles[key].label}
                  bgColor={titles[key].bgColor}
                  value={Number(basicDetails?.[key] ?? 0)}
                  icon={titles[key].icon}
                  isSelected={index === currentTab}
                  loading={loadingBasicDetails}
                  onClick={() => setCurrentTab(index)}
                />
              )
            )}
          </div>
          <div className="h-full">
            {currentTab == 0 ? (
                <CostSheetClientSegment
                  filters={filters}
                  setFilters={setFilters}
                  campaignId={campaignId}
              />
            ) : currentTab == 1 ? (
              <CostSheetVendorSegment
                filters={filters}
                setFilters={setFilters}
                campaignId={campaignId}
              />
            ) : currentTab == 2 ? (
              <CostSheetGrossMarginSegment
                filters={filters}
                setFilters={setFilters}
                campaignId={campaignId}
              />
            ) : null}
          </div>
          <div className="px-4">
            <CostSheetTable
              campaignId={campaignId}
              loadingInventoryDetails={loadingInventoryDetails}
              result={result}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              setCurrentRow={setCurrentRow}
              currentRow={currentRow}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};
