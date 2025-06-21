import clsx from "clsx";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { EditIcon } from "../../assets";
import { Loading } from "../../components/Loading";
import { useDispatch } from "react-redux";
import { editCostDetailsScreenWiseForCostSummaryPopupPage } from "../../actions/screenAction";
import { useEffect, useState } from "react";
import { FileUploadButton } from "../../components/FileUploadButton";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { message } from "antd";

interface CostSheetTableProps {
  campaignId?: any;
  result?: any;
  setIsEdit?: any;
  isEdit?: any;
  setCurrentRow?: any;
  currentRow?: number;
  loadingInventoryDetails?: any;
  screenData?: any;
  setScreenData?: any;
}

export const CostSheetTable = ({
  campaignId,
  result,
  setIsEdit,
  isEdit,
  setCurrentRow,
  currentRow,
  loadingInventoryDetails,
}: CostSheetTableProps) => {
  const dispatch = useDispatch<any>();

  const [screenData, setScreenData] = useState<any>(result);
  
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false);


  useEffect(() => {
    setScreenData(result);
  }, [result]);

  const handleEdit = (e: any) => {
    setScreenData((prevData: any[]) => {
      const newData = [...prevData];
      if (e.type === "clientCost") {
        newData[e.index] = {
          ...newData[e.index],
          clientCost: e.value
        };
      }

      if (e.type === "vendorCost") {
        newData[e.index] = {
          ...newData[e.index],
          vendorCost: e.value
        };
      }
      return newData;
    });
  }

  const handleSave = () => {
    dispatch(editCostDetailsScreenWiseForCostSummaryPopupPage({
      id: campaignId,
      screenData: screenData
    }))
  }


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


  const getAWSUrl = async (data: any) => {
    try {
      const aws = await getAWSUrlToUploadFile(
        data.fileType,
        data?.file?.name?.split(".")[0]
      );
      const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
      data.awsURL = aws?.awsURL;
      return aws?.awsURL;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  };

  const handleAddNewFile = async (file: any) => {
    const data = {
      file: file,
      fileType: file.type,
    }
    const awsUrl = await getAWSUrl(data);
    if (!awsUrl) return;
    let data2: any = [...screenData];

    for (const row in selectedRows) {
      data2[row].documents.push(awsUrl);
      setScreenData(data2);
    }
    dispatch(
      editCostDetailsScreenWiseForCostSummaryPopupPage({
        id: campaignId,
        screenData: data2
      })
    )
  };


  return (
    <div className="w-full py-2">
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="border bg-[#FFFFFF] rounded-[10px] h-3/4 w-3/4 p-1">
            <div className="flex justify-between">
              <div className="relative inset-0 flex items-center justify-start gap-4 p-3">
                <h1 className="text-[14px] font-bold">Confirmation Documents</h1>
              </div>
              <div className="relative inset-0 flex items-center justify-end gap-4 p-3" onClick={() => setShowDocumentModal(false)}>
                <i className="fi fi-br-cross"></i>
              </div>
            </div>
            <div className="p-2 overflow-scroll no-scrollbar h-[60vh]">
              <div className="grid grid-cols-2 gap-2">
                {screenData?.map((data: any, i: number) => (
                  <div key={i} className="col-span-1 p-2">
                    <div className="border rounded-[12px]">
                      {data?.documents?.map((doc: any, j: number) => (
                        <img key={j} src={doc} alt="" />
                      ))}
                    </div>
                    <h1 className="text-[12px] p-2">Screen Name: {data?.screenName}</h1>
                  </div>
                ))} 
              </div>
              
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-[14px] font-semibold p-2">
          Inventory Details{" "}
          <span className="text-[#6F7F8E] text-[12px]">({result?.length || 0})</span>
        </h1>
        {selectedRows?.length > 0 && (
          <div className="flex items-center gap-2">
            <FileUploadButton
              handleFile={handleAddNewFile}
              width=""
              fileType={"image"}
            />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col h-[400px] border rounded-md">
        <div className="w-full">
          <table className="w-full">
            <thead className="bg-[#F7F7F7] w-full">
              <tr className="grid grid-cols-12 w-full h-[40px] grid-flow-col">
            <th className="col-span-3 grid grid-cols-5 w-full flex items-center justify-start px-2 gap-2">
              <div className="col-span-1 flex items-center gap-2">
                <input
                  title="checkbox"
                  type="checkbox"
                  onChange={(e: any) => handleSelectAllRow(e.target.checked)}
                  checked={selectedRows?.length === result?.length}
                />
                <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">Sl</h1>
              </div>
              <div className="col-span-4 flex justify-start">
                <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                  Screen Name
                </h1>
              </div>
            </th>
            <th className="flex col-span-1 w-full items-center justify-start gap-2">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Touchpoints
              </h1>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-2">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Vendor Name
              </h1>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-2">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Vendor Type
              </h1>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-1">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Cost
              </h1>
              <i className="fi fi-br-info text-[#21394F] text-[12px] flex items-center"></i>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-1">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Commission
              </h1>
              <i className="fi fi-br-info text-[#21394F] text-[12px] flex items-center"></i>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-1">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Price
              </h1>
              <i className="fi fi-br-info text-[#21394F] text-[12px] flex items-center"></i>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-1">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Margin
              </h1>
              <i className="fi fi-br-info text-[#21394F] text-[12px] flex items-center"></i>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-2">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Docs
              </h1>
            </th>
            <th className="flex col-span-1 w-full items-center justify-center gap-2">
              <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F]">
                Action
              </h1>
            </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="overflow-y-auto flex-1">
          <table className="w-full">
            <tbody>
              {loadingInventoryDetails && (
                <tr>
                  <td>
                    <Loading />
                  </td>
                </tr>
              )}
              {screenData?.map((inventory: any, i: number) => (
                <tr
                  key={i}
                  className={clsx(
                    `flex justify-between border-b w-full h-[45px] grid grid-cols-12 hover:bg-gray-100`
                  )}
                >
                  <td className="col-span-3 grid grid-cols-5 w-full flex items-center justify-start gap-4 truncate px-2">
                    <div className="col-span-1 flex items-center gap-2">
                      <input
                        title={`checkbox-${i}`}
                        className="border rounded-md"
                        type="checkbox"
                        checked={selectedRows?.includes(i)}
                        onChange={(e: any) => handleSelectRow(e.target.checked, i)}
                      />
                      <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F] truncate">
                        {i + 1}
                      </h1>
                    </div>
                    <div className="col-span-4 flex items-center gap-2">
                      <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F] font-normal truncate">
                        {inventory?.screenName}
                      </h1>
                    </div>
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-start gap-2">
                    <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F] font-normal truncate">
                      {inventory?.touchPoint}
                    </h1>
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-center gap-2">
                    <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F] font-normal">
                      {inventory?.vendorName}
                    </h1>
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-center gap-2">
                    <div className="grid grid-cols-4 w-full items-center">
                      <p className="col-span-1"></p>
                      <h1 className="col-span-2 lg:text-[12px] md:text-[12px] text-[#21394F] truncate font-normal">
                        {inventory?.vendorType}
                      </h1>
                    </div>
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-center gap-2">
                    {isEdit && currentRow === i ? (
                      <input
                        placeholder="₹"
                        type="number"
                        className="border rounded-md py-2 px-2 w-full"
                        value={inventory?.clientCost}
                        onChange={(e: any) => handleEdit({value: e.target.value, type: "clientCost", index: i})}
                      />
                    ) : (
                      <h1 className="lg:text-[12px] md:text-[12px] text-[#21394F] font-normal truncate">₹ {inventory?.clientCost?.toFixed(0)}</h1>
                    )}
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-center gap-2">
                    <h1 className="lg:text-[12px] md:text-[12px] text-[#FF0808] font-normal truncate">{inventory?.commission?.toFixed(0)}%</h1>
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-center gap-2">
                    {isEdit && currentRow === i ? (
                      <input
                        placeholder="₹"
                        className="border rounded-md py-2 px-2 w-full"
                        type="number"
                        value={inventory?.vendorCost}
                        onChange={(e: any) => handleEdit({value: e.target.value, type: "vendorCost", index: i})}
                      />
                    ) : (
                      <span className="lg:text-[12px] md:text-[12px] text-[#21394F] font-normal">
                        ₹ {inventory?.vendorCost?.toFixed(0)}
                      </span>
                    )}
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-center gap-2">
                    <span className="lg:text-[12px] md:text-[12px] text-[#21394F] font-normal">
                      ₹ {inventory?.margin?.toFixed(0)}
                    </span>
                  </td>
                  <td className="flex col-span-1 w-full items-center justify-center gap-2">
                    <div
                      className={`flex gap-1 text-[14px]  font-medium ${
                        inventory?.documents?.length > 0
                          ? "text-[#43AF5B]"
                          : "text-[#FF5050]"
                      }`}

                      onClick={() => {
                        console.log(inventory);
                        if (inventory?.documents?.length > 0) {
                          setShowDocumentModal(true);
                        } else {
                          message.error("No documents uploaded");
                        }
                      }}
                    >
                      <i className="fi fi-sr-clip-file flex items-center"></i>
                      <h1 >{inventory?.documents?.length}</h1>
                    </div>
                  </td>
                  <td className="cursor-pointer flex col-span-1 w-full items-center justify-center gap-2">
                    
                    {isEdit && currentRow === i ? (
                      <button
                        title="Save"
                        type="button"
                        className="h-8 w-8 border border-[#4DB37E] rounded-lg flex items-center justify-center hover:bg-[#4DB37E50] hover:border-[#4DB37E10]"
                        onClick={() => {
                          handleSave();
                        }}
                      >
                        <i className="fi fi-sr-disk text-[16px] text-[#4DB37E]" />
                      </button>
                    ) : (
                      <button
                        title="Edit"
                        type="button"
                        className="h-8 w-8 border rounded-lg flex items-center justify-center hover:bg-[#D7D7D750]"
                        onClick={() => {
                          setCurrentRow(i);
                          setIsEdit(true);
                        }}
                      >
                        <img alt="edit icon" src={EditIcon} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
