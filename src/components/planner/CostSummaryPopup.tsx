import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { useDispatch } from "react-redux";
import {
  getBasicDetailsCostSummaryPopupPage,
  getInventoryDetailsForCostSummaryPopupPage,
} from "../../actions/screenAction";
import { EditIcon } from "../../assets";
import { FileUploadButton } from "../../components/FileUploadButton";
import { CostSummaryBox } from "../../components/segments/CostSummaryBox";
import ButtonInput from "../../components/atoms/ButtonInput";

type CostMetric = "clientCost" | "vendorCost" | "grossMargin";

interface TitleConfig {
  label: string;
  bgColor: string;
  icon: string;
}

export const CostSummaryPopup = ({ onClose, campaignId }: any) => {
  const dispatch = useDispatch<any>();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const [result, setResult] = useState<any>(null);
  const [currentRow, setCurrentRow] = useState<number>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  console.log("selectedRows : ", selectedRows);

  const basicDetailsForCostSummary = useSelector(
    (state: any) => state.basicDetailsForCostSummary
  );

  const {
    loading: loadingBasicDetails,
    error: errorBasicDetails,
    success: successBasicDetails,
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

  useEffect(() => {
    if (successInventoryDetails && result === null) {
      setResult(
        inventoryDetails?.map((data: any) => {
          return {
            ...data,
            documents: [],
          };
        })
      );
    }
  }, [successInventoryDetails]);

  console.log("inventoryDetails : ", inventoryDetails);

  useEffect(() => {
    dispatch(getInventoryDetailsForCostSummaryPopupPage({ id: campaignId }));
    dispatch(getBasicDetailsCostSummaryPopupPage({ id: campaignId }));
  }, []);

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

  const handleAddNewFile = (files: any) => {
    console.log("files", files);
  };

  const handleSelectRow = (value: boolean, index: number) => {
    if (value) {
      setSelectedRows((pre: number[]) => [...pre, index]);
    } else {
      setSelectedRows((pre: number[]) =>
        pre.filter((data: number) => data !== index)
      );
    }
  };

  const handleSelectAllRow = (value: boolean) => {
    if (value) {
      setSelectedRows(result.map((_: any, index: number) => index));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border rounded-[10px] h-[86%] w-[96%] bg-[#FFFFFF]">
        <div className="relative inset-0 flex items-center justify-between gap-4 p-4 border">
          <div className=" flex items-center gap-2">
            <i
              className="fi fi-rr-arrow-left text-gray-400"
              onClick={() => onClose()}
            ></i>
            <h1 className="text-[18px] font-bold">Const Summary</h1>
          </div>
          <i className="fi fi-br-cross" onClick={() => onClose()}></i>
        </div>
        <div className="p-4 h-full bg-[#FFFFFF]">
          <div className="grid grid-cols-3 gap-8">
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
          <div className="p-0 m-0 mt-2">
            <div className="flex justify-between items-center">
              <h1 className="text-[14px] font-semibold py-4">
                Inventory Details{" "}
                <span className="text-[#6F7F8E] text-[12px]">({5})</span>
              </h1>
              {selectedRows?.length > 0 && (
                <FileUploadButton
                  handleFile={handleAddNewFile}
                  width=""
                  fileType={"image"}
                />
              )}
            </div>

            {/* Row of table */}
            <div className="grid grid-cols-11 bg-[#FAFAFA] border shadow-sm py-4 flex items-center">
              <div className="col-span-1 grid grid-cols-2 flex items-center justify-center truncate text-[12px] pl-4">
                <CheckboxInput
                  onChange={handleSelectAllRow}
                  checked={selectedRows?.length === result?.length}
                />
                <h1 className="ml-[-8px]">SI.N.</h1>
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Screen Name
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Touch Points
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px]">
                Vendor Name
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Vendor Type
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Cost to client
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Vendor compassion
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px]">
                Final Vendor Price
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Final Margin
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Conformation Doc
              </div>
              <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                Action
              </div>
            </div>
            <div className="max-[30vh] overflow-y-auto scrollbar-minimal pr-1">
              {result?.map((inventory: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-11 bg-[#FFFFFF] border shadow-sm py-2 truncate flex items-center"
                >
                  <div className="col-span-1 grid grid-cols-2 flex items-center justify-center truncate text-[12px] pl-4">
                    <CheckboxInput
                      checked={selectedRows?.includes(index)}
                      onChange={(value: boolean) =>
                        handleSelectRow(value, index)
                      }
                    />
                    <h1 className="ml-[-8px]">{index + 1}</h1>
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                    {inventory?.screenName}
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                    {inventory?.touchPoint}
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px]">
                    {inventory?.vendorName}
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                    {inventory?.vendorType}
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                    {isEdit && currentRow === index ? (
                      <input
                        type="number"
                        className="border rounded-md py-2 px-2 w-full"
                        value={inventory?.clientCost}
                        onChange={() => {}}
                      />
                    ) : (
                      <h1>₹ {inventory?.clientCost?.toFixed(0)}</h1>
                    )}
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                    {inventory?.commission?.toFixed(0)}%
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                    {isEdit && currentRow === index ? (
                      <input
                        className="border rounded-md py-2 px-2 w-full"
                        type="number"
                        value={inventory?.vendorCost}
                        onChange={() => {}}
                      />
                    ) : (
                      <h1>₹ {inventory?.vendorCost?.toFixed(2)}</h1>
                    )}
                  </div>
                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px]">
                    ₹ {inventory?.margin?.toFixed(0)}
                  </div>

                  <div className="col-span-1 flex gap-1 justify-center truncate text-[12px] ">
                    <div
                      className={`flex gap-1 text-[14px]  font-medium ${
                        inventory?.documents?.length > 0
                          ? "text-[#43AF5B]"
                          : "text-[#FF5050]"
                      }`}
                    >
                      <i className="fi fi-sr-clip-file"></i>
                      <h1>{inventory?.documents?.length}</h1>
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-2 justify-center truncate text-[12px] ">
                    <div
                      className="h-8 w-8 border rounded-lg flex items-center justify-center"
                      onClick={() => {
                        setCurrentRow(index);
                        setIsEdit(true);
                      }}
                    >
                      {/* <i className="fi fi-sr-pencil text-[#6F7F8E] " /> */}
                      <img src={EditIcon} />
                    </div>
                    {isEdit && currentRow === index && (
                      <div className="h-8 w-8 border rounded-lg flex items-center justify-center">
                        <i className="fi fi-sr-disk text-[16px] text-[#6F7F8E] " />
                        {/* <img src={EditIcon} /> */}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
