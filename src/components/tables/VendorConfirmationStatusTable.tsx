import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { ShowMediaPopup } from "../../components/popup/ShowMediaPopup";

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

  // const handleRowCheckboxChange = (e: boolean, campaignId: string) => {
  //   let updatedIds = [...selectedCampaignIds];
  //   if (e) {
  //     // Add campaignId if row checkbox is checked
  //     updatedIds = [...selectedCampaignIds, campaignId];
  //   } else {
  //     // Remove campaignId if row checkbox is unchecked
  //     updatedIds = updatedIds.filter((id) => id !== campaignId);
  //   }
  //   setSelectedCampaignIds(updatedIds); // Update the state with the new selection
  // };

  // useEffect(() => {
  //   var campaignIds : any = []
  //   for ( const campaign of campaignsList ){
  //     if ( campaign.campaignCreationId === statusTableData._id )
  //       campaignIds.push(campaign._id.toString())
  //   }
  //   setSelectedCampaignIds(campaignIds);
  // }, [ setSelectedCampaignIds, statusTableData]);
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
          {userInfo?.userRole === "campaignPlanner" && (
            <tr className="bg-[#D6EEFF] w-full grid grid-cols-12 rounded-t">
              <th className="py-2 col-span-1 flex justify-around">
                <h1 className="text-[14px] px-2">S.N.</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around">
                <h1 className="text-[14px] px-2">Screen Name</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around">
                <h1 className="text-[14px] flex justify-start">Touchpoint</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around">
                <div className="flex gap-2">
                  <h1 className="text-[14px]">Media Type</h1>
                  <Tooltip title="Connected media type will have real time campaign delivery updates and monitoring.">
                    <i
                      className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"
                      onClick={handleOpenMediaModel}
                    ></i>
                  </Tooltip>
                </div>
              </th>
              <th className="py-2 col-span-1 flex justify-around">
                <h1 className="text-[14px]">Cost</h1>
              </th>
              <th className="py-2 col-span-1 flex justify-around">
                <h1 className="text-[14px]">SOV</h1>
              </th>
              <th className="py-2 col-span-1 flex justify-around">
                <h1 className="text-[14px]">Creative</h1>
              </th>
              <th className="py-2 col-span-2 flex justify-around">
                <div className="flex gap-2">
                  <h1 className="text-[14px]">Status</h1>
                  <Tooltip title="Campaign status subject to approval from screen owner/media vendor">
                    <i
                      className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"
                      onClick={handleOpenStatusModel}
                    ></i>
                  </Tooltip>
                </div>
              </th>
              {/* <th className="py-2">
                <h1 className="text-[14px]">
                  Action
                </h1>
              </th> */}
            </tr>
          )}
        </thead>
        <tbody className="w-full">
          {userInfo?.userRole === "campaignPlanner" &&
            statusTableData?.map((status: any, i: any) => (
              <tr
                key={i}
                className={`border w-full grid grid-cols-12 rounded-b
              ${status.status === "PleaRequestBudgetSent" && "bg-[#F59E0B10]"}
              ${status.status === "PleaRequestBudgetAccepted" && "bg-[#22C55E10]"}
              ${status.status === "PleaRequestBudgetRejected" && "bg-[#EF444410]"}
              ${
                status.status === "PleaRequestScreenApprovalSent" &&
                "bg-[#F59E0B10]"
              }
              ${
                status.status === "PleaRequestScreenApprovalAccepted" &&
              "bg-[#22C55E10]"
              }
              ${
                status.status === "PleaRequestScreenApprovalRejected" &&
                "bg-[#EF444410]"
              }
              ${
                status.status === "PleaRequestFinalApprovalSent" &&
                "bg-[#F59E0B10]"
              }
              ${
                status.status === "PleaRequestFinalApprovalAccepted" &&
                "bg-[#22C55E10]"
              }
              ${
                status.status === "PleaRequestFinalApprovalRejected" &&
                "bg-[#EF444410]"
              }
            `}
              >
                <td className="p-2 col-span-1 truncate flex justify-around items-center">
                  <h1 className="text-[14px] truncate">{i + 1}</h1>
                </td>
                <td className="p-2 col-span-2 truncate flex justify-around items-center">
                  <h1 className="text-[14px] truncate">{status.screenName}</h1>
                </td>
                <td className="py-2 col-span-2 flex justify-around items-center truncate">
                  <Tooltip title={status.touchPoint}>
                    <h1 className="text-[14px] truncate">{status.touchPoint}</h1>
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
                    <i className="fi fi-sr-photo-video text-[20px] text-violet flex justify-center"></i>
                  </div>
                </td>
                <td className="py-2 col-span-2 flex justify-around items-center truncate">
                  <Tooltip title={status.status === "PleaRequestBudgetSent"
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
                        : "Approved"}>
                    <h1
                      className={`text-[14px] truncate ${
                        status.status === "PleaRequestBudgetSent"
                          ? "text-[#F59E0B]"
                          : status.status === "PleaRequestBudgetAccepted"
                          ? "text-[#22C55E]"
                          : status.status === "PleaRequestBudgetRejected"
                          ? "text-[#EF4444]"
                          : status.status === "PleaRequestScreenApprovalSent"
                          ? "text-[#F59E0B]"
                          : status.status === "PleaRequestScreenApprovalAccepted"
                          ? "text-[#22C55E]"
                          : status.status === "PleaRequestScreenApprovalRejected"
                          ? "text-[#EF4444]"
                          : status.status === "PleaRequestFinalApprovalSent"
                          ? "text-[#F59E0B]"
                          : status.status === "PleaRequestFinalApprovalAccepted"
                          ? "text-[#22C55E]"
                          : status.status === "PleaRequestFinalApprovalRejected"
                          ? "text-[#EF4444]"
                          : status.status === "Pending"
                          ? "text-[#22C55E]"
                          : "text-[#3B82F6]"
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
                        : "Approved"}
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
