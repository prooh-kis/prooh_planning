import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { ShowMediaPopup } from "../../components/popup/ShowMediaPopup";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
} from "../../constants/userConstants";
import { CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_ACCEPTED, CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_REJECTED, CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_SENT, CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_ACCEPTED, CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_REJECTED, CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_SENT, CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_ACCEPTED, CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_REJECTED, CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_SENT, CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_ACCEPTED, CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_REJECTED, CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT } from "../../constants/campaignConstants";
import ButtonInput from "../../components/atoms/ButtonInput";

export const VendorConfirmationStatusTable = ({
  userInfo,
  statusTableData,
  handleOpenStatusModel,
  handleOpenMediaModel,
}: any) => {
  const [openShowMediaPopup, setOpenShowMediaPopup] = useState<any>(false);
  const [creativesToShow, setCreativesToShow] = useState<any>({
    screenName: "",
    screenId: "",
    creatives: {},
  });

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
      setSelectedRows(statusTableData.map((_: any, index: number) => index));
    } else {
      setSelectedRows([]);
    }
  };

    const handleSendRequest = () => {
      // dispatch(sendRequestToVendorForBudgetApprovalCostSheetPopupPage({
      //   id: campaignId,
      //   screens: screenData.filter((s: any, i: any) => selectedRows.includes(i))?.map((sc: any) => sc.screenName)
      // }));
    }
  

  return (
    <div className="w-full">
      <ShowMediaPopup
        openShowMediaPopup={openShowMediaPopup}
        onClose={() => {
          setOpenShowMediaPopup(false);
          setCreativesToShow({ screenName: "", screenId: "", creatives: {} });
        }}
        creativesToShow={creativesToShow}
      />
      {selectedRows?.length > 0 && (
        <div className="flex justify-end items-center pb-2">
          <ButtonInput
            variant="primary"
            size="small"
            onClick={handleSendRequest}
            icon={
              <i className="fi fi-sr-envelope flex items-center"></i>
            }
          >
            Send
          </ButtonInput>
        </div>
      )}
      <table className="w-full">
        <thead className="w-full flex">
          {userInfo?.userRole === "campaignPlanner" && (
            <tr className="bg-[#D6EEFF] w-full grid grid-cols-12 rounded-t-[8px]">
              <th className="p-2 col-span-1 flex justify-start items-center gap-2">
                <input
                  title="checkbox"
                  type="checkbox"
                  onChange={(e: any) => handleSelectAllRow(e.target.checked)}
                  checked={selectedRows?.length === statusTableData?.length}
                />
                <h1 className="text-[14px]">S.N.</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around items-center truncate">
                <h1 className="text-[14px] px-2 truncate">Screen Name</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around items-center truncate">
                <h1 className="text-[14px] flex justify-start truncate">Touchpoint</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around items-center">
                <div className="flex gap-2 truncate">
                  <h1 className="text-[14px] truncate">Media Type</h1>
                  <Tooltip title="Connected media type will have real time campaign delivery updates and monitoring.">
                    <i
                      className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"
                      onClick={handleOpenMediaModel}
                    ></i>
                  </Tooltip>
                </div>
              </th>
              <th className="py-2 col-span-1 flex justify-around items-center truncate">
                <h1 className="text-[14px] truncate">Cost</h1>
              </th>
              <th className="py-2 col-span-1 flex justify-around items-center truncate">
                <h1 className="text-[14px] truncate">SOV</h1>
              </th>
              <th className="py-2 col-span-1 flex justify-around items-center truncate">
                <h1 className="text-[14px] truncate">Creative</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around items-center">
                <div className="flex gap-2 truncate">
                  <h1 className="text-[14px] truncate">Status</h1>
                  <Tooltip title="Campaign status subject to approval from screen owner/media vendor">
                    <i
                      className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"
                      onClick={handleOpenStatusModel}
                    ></i>
                  </Tooltip>
                </div>
              </th>
            </tr>
          )}
        </thead>
        <tbody className="w-full">
          {(userInfo?.userRole === CAMPAIGN_PLANNER ||
            userInfo?.userRole === CAMPAIGN_MANAGER) &&
            statusTableData?.map((status: any, i: any) => (
              <tr
                key={i}
                className={`border w-full grid grid-cols-12 ${i === statusTableData?.length - 1 ? "rounded-b-[8px]" : ""}
              ${status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_SENT && "bg-[#F59E0B10]"}
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_ACCEPTED &&
                "bg-[#22C55E10]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_REJECTED &&
                "bg-[#EF444410]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT &&
                "bg-[#F59E0B10]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_ACCEPTED &&
                "bg-[#22C55E10]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_REJECTED &&
                "bg-[#EF444410]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_SENT &&
                "bg-[#F59E0B10]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_ACCEPTED &&
                "bg-[#22C55E10]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_REJECTED &&
                "bg-[#EF444410]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_SENT &&
                "bg-[#F59E0B10]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_ACCEPTED &&
                "bg-[#22C55E10]"
              }
              ${
                status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_REJECTED &&
                "bg-[#EF444410]"
              }
            `}
              >
                <td className="p-2 col-span-1 truncate flex justify-start items-center gap-2">
                  <input
                    title={`checkbox-${i}`}
                    className="border rounded-md"
                    type="checkbox"
                    checked={selectedRows?.includes(i)}
                    onChange={(e: any) => handleSelectRow(e.target.checked, i)}
                  />
                  <h1 className="text-[14px] truncate">{i + 1}</h1>
                </td>
                <td className="p-2 col-span-2 truncate flex justify-around items-center">
                  <h1 className="text-[14px] truncate">{status.screenName}</h1>
                </td>
                <td className="py-2 col-span-2 flex justify-around items-center truncate">
                  <Tooltip title={status.touchPoint}>
                    <h1 className="text-[14px] truncate">
                      {status.touchPoint}
                    </h1>
                  </Tooltip>
                </td>
                <td className="py-2 col-span-2 flex justify-around items-center">
                  <h1 className="text-[14px]">
                    {status.mediaType || "Connected"}
                  </h1>
                </td>
                <td className="py-2 col-span-1 flex justify-around items-center">
                  <h1 className="text-[14px] text-[#5FAC90]">
                    &#8377;{Number(status.cost).toFixed(0)}
                  </h1>
                </td>
                <td className="p-2 col-span-1 flex justify-around items-center">
                  <h1 className="text-[14px]">{status?.sov}</h1>
                </td>
                <td className="p-2 col-span-1 flex justify-around items-center">
                  <div
                    className="flex justify-center items-center gap-2"
                    onClick={() => {
                      setCreativesToShow({
                        screenName: status.screenName,
                        screenId: status.screenId,
                        creatives: status.creatives,
                      });
                      setOpenShowMediaPopup(true);
                    }}
                  >
                    <i className="fi fi-sr-photo-video text-[20px] text-violet flex justify-center" /> 
                    <h1 className="text-[14px]">({status.creatives.standardDayTimeCreatives.length + status.creatives.standardNightTimeCreatives.length + status.creatives.triggerCreatives.length})</h1>
                  </div>
                </td>
                <td className="py-2 col-span-2 flex justify-around items-center truncate">
                  <Tooltip
                    title={
                      status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_SENT
                        ? "Client Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_ACCEPTED
                        ? "Client Approved Planning"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_REJECTED
                        ? "Client Rejected Planning"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT
                        ? "Vendor Budget Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_ACCEPTED
                        ? "Vendor Budget Approved"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_REJECTED
                        ? "Vendor Budget Rejected"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_SENT
                        ? "Creative Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_ACCEPTED
                        ? "Creative Approved"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_REJECTED
                        ? "Creative Rejected"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_SENT
                        ? "Campaign Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_ACCEPTED
                        ? "Campaign Approved"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_REJECTED
                        ? "Campaign Rejected"
                        : status.status === "Pending"
                        ? "approved"
                        : status.status
                    }
                  >
                    <h1
                      className={`text-[14px] truncate ${
                        status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_SENT
                          ? "text-[#F59E0B]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_ACCEPTED
                          ? "text-[#22C55E]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_REJECTED
                          ? "text-[#EF4444]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT
                          ? "text-[#F59E0B]"
                          : status.status ===
                            CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_ACCEPTED
                          ? "text-[#22C55E]"
                          : status.status ===
                            CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_REJECTED
                          ? "text-[#EF4444]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_SENT
                          ? "text-[#F59E0B]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_ACCEPTED
                          ? "text-[#22C55E]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_REJECTED
                          ? "text-[#EF4444]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_SENT
                          ? "text-[#F59E0B]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_ACCEPTED
                          ? "text-[#22C55E]"
                          : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_REJECTED
                          ? "text-[#EF4444]"
                          : status.status === "Pending"
                          ? "text-[#22C55E]"
                          : "text-[#3B82F6]"
                      }`}
                    >
                      {status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_SENT
                        ? "Client Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_ACCEPTED
                        ? "Client Approved Planning"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CLIENT_BUDGET_APPROVAL_REJECTED
                        ? "Client Rejected Planning"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT
                        ? "Vendor Budget Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_ACCEPTED
                        ? "Vendor Budget Approved"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_REJECTED
                        ? "Vendor Budget Rejected"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_SENT
                        ? "Creative Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_ACCEPTED
                        ? "Creative Approved"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_REJECTED
                        ? "Creative Rejected"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_SENT
                        ? "Campaign Approval Pending"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_ACCEPTED
                        ? "Campaign Approved"
                        : status.status === CAMPAIGN_STATUS_PLEA_REQUEST_FINAL_APPROVAL_REJECTED
                        ? "Campaign Rejected"
                        : status.status === "Pending"
                        ? "approved"
                        : status.status}
                    </h1>
                  </Tooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
