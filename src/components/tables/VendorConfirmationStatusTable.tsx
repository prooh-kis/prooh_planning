import { useEffect, useState } from "react";
import { ActionMenu } from "../../components/molecules/ActionMenu";
import { CheckboxInput } from "../atoms/CheckboxInput";
import { Tooltip } from "antd";
import { ShowMediaPopup } from "../../components/popup/ShowMediaPopup";

export const VendorConfirmationStatusTable = ({
  campaignId,
  userInfo,
  statusTableData,
  selectedCampaignIds,
  setSelectedCampaignIds,
}: any) => {
  const [openShowMediaPopup, setOpenShowMediaPopup] = useState<any>(false);
  const [creativesToShow, setCreativesToShow] = useState<any>({
    screenName: "",
    screenId: "",
    creatives: {},
  });

  const handleRowCheckboxChange = (e: boolean, campaignId: string) => {
    let updatedIds = [...selectedCampaignIds];
    if (e) {
      // Add campaignId if row checkbox is checked
      updatedIds = [...selectedCampaignIds, campaignId];
    } else {
      // Remove campaignId if row checkbox is unchecked
      updatedIds = updatedIds.filter((id) => id !== campaignId);
    }
    setSelectedCampaignIds(updatedIds); // Update the state with the new selection
  };

  useEffect(() => {
    setSelectedCampaignIds(statusTableData?.map((c: any) => c._id));
  }, [setSelectedCampaignIds, statusTableData]);
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
      <table className="w-full">
        <thead className="w-full flex">
          {userInfo?.userRole==="campaignPlanner" && (
            <tr className="bg-[#D6EEFF] w-full flex justify-around">
              <th className="py-2 basis-1/8">
                <h1 className="text-[14px] px-2 flex justify-start">
                  Screen Name
                </h1>
              </th>
              <th className="py-2 basis-1/8">
                <h1 className="text-[14px] flex justify-start">Touchpoint</h1>
              </th>
              <th className="py-2 basis-1/8">
                <div className="flex gap-2">
                  <h1 className="text-[14px]">Media Type</h1>
                  <Tooltip title="Connected media type will have real time campaign delivery updates and monitoring.">
                    <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
                  </Tooltip>
                </div>
              </th>
              <th className="py-2 basis-1/8">
                <h1 className="text-[14px] flex justify-start">Cost</h1>
              </th>
              <th className="py-2 basis-1/8">
                <div className="flex gap-2">
                  <h1 className="text-[14px]">Status</h1>
                  <Tooltip title="Campaign status subject to approval from screen owner/media vendor">
                    <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
                  </Tooltip>
                </div>
              </th>
              <th className="py-2 basis-1/8">
                <h1 className="text-[14px] flex justify-start">SOV</h1>
              </th>
              <th className="py-2 basis-1/8">
                <h1 className="text-[14px]">Creative</h1>
              </th>
              {/* <th className="py-2">
                <h1 className="text-[14px]">
                  Action
                </h1>
              </th> */}
            </tr>
          )}
        </thead>
        <tbody className="w-full flex">
          {userInfo?.userRole==="campaignPlanner" &&
            statusTableData?.map((status: any, i: any) => (
              <tr
                key={i}
                className={`border w-full flex justify-around
              ${status.status === "PleaRequestBudgetSent" && "bg-purple-50"}
              ${status.status === "PleaRequestBudgetAccepted" && "bg-purple-50"}
              ${status.status === "PleaRequestBudgetRejected" && "bg-purple-50"}
              ${
                status.status === "PleaRequestScreenApprovalSent" &&
                "bg-blue-50"
              }
              ${
                status.status === "PleaRequestScreenApprovalAccepted" &&
                "bg-blue-50"
              }
              ${
                status.status === "PleaRequestScreenApprovalRejected" &&
                "bg-blue-50"
              }
              ${
                status.status === "PleaRequestFinalApprovalSent" &&
                "bg-violet-100"
              }
              ${
                status.status === "PleaRequestFinalApprovalAccepted" &&
                "bg-violet-100"
              }
              ${
                status.status === "PleaRequestFinalApprovalRejected" &&
                "bg-violet-100"
              }
            `}
              >
                <td className="p-2 basis-1/8">
                  <h1 className="text-[14px]">{status.screenName}</h1>
                </td>
                <td className="py-2 basis-1/8">
                  <h1 className="text-[14px]">{status.touchPoint}</h1>
                </td>
                <td className="py-2 basis-1/8">
                  <h1 className="text-[14px]">
                    {status.mediaType || "Connected"}
                  </h1>
                </td>
                <td className="py-2 basis-1/8">
                  <h1 className="text-[14px]">
                    &#8377;{Number(status.cost).toFixed(0)}
                  </h1>
                </td>
                <td className="py-2 basis-1/8">
                  <h1
                    className={`text-[14px] ${
                      status.status === "PleaRequestBudgetSent"
                        ? "text-purple-400"
                        : status.status === "PleaRequestBudgetAccepted"
                        ? "text-[#129BFF]"
                        : status.status === "PleaRequestBudgetRejected"
                        ? "text-red-400"
                        : status.status === "PleaRequestScreenApprovalSent"
                        ? "text-purple-800"
                        : status.status === "PleaRequestScreenApprovalAccepted"
                        ? "text-[#129BFF]"
                        : status.status === "PleaRequestScreenApprovalRejected"
                        ? "text-red-800"
                        : status.status === "PleaRequestFinalApprovalSent"
                        ? "text-purple-800"
                        : status.status === "PleaRequestFinalApprovalAccepted"
                        ? "text-[#129BFF]"
                        : status.status === "PleaRequestFinalApprovalRejected"
                        ? "text-red-800"
                        : status.status === "Pending"
                        ? "text-green-700"
                        : ""
                    }`}
                  >
                    {status.status === "PleaRequestBudgetSent"
                      ? "Budget Approval Pending"
                      : status.status === "PleaRequestBudgetAccepted"
                      ? "Budget Approved"
                      : status.status === "PleaRequestBudgetRejected"
                      ? "Budget Rejected"
                      : status.status === "PleaRequestScreenApprovalSent"
                      ? "Screen Approval Pending"
                      : status.status === "PleaRequestScreenApprovalAccepted"
                      ? "Screen Approved"
                      : status.status === "PleaRequestScreenApprovalRejected"
                      ? "Screen Rejected"
                      : status.status === "PleaRequestFinalApprovalSent"
                      ? "Final Aprroval Pending"
                      : status.status === "PleaRequestFinalApprovalAccepted"
                      ? "Final Approved"
                      : status.status === "PleaRequestFinalApprovalRejected"
                      ? "Final Rejected"
                      : status.status === "Pending"
                      ? "Approved"
                      : "Pending"}
                  </h1>
                </td>
                <td className="p-2 basis-1/8">
                  <h1 className="text-[14px]">{status?.sov}</h1>
                </td>
                <td className="p-2 basis-1/8">
                  <div
                    className="flex justify-center items-center"
                    onClick={() => {
                      setCreativesToShow({
                        screenName: status.screenName,
                        screenId: status.screenId,
                        creatives: status.creatives,
                      });
                      setOpenShowMediaPopup(true);
                    }}
                  >
                    <i className="fi fi-sr-photo-video text-[20px] text-violet-500 flex justify-center"></i>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
