import { ActionMenu } from "../../components/molecules/ActionMenu"
import { CheckboxInput } from "../atoms/CheckboxInput"

export const VendorConfirmationStatusTable = ({
  campaignId,
  userInfo,
  statusTableData,
  selectedCampaignIds,
  setSelectedCampaignIds
}: any) => {

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

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#D6EEFF]">
          <th className="p-2">
            <CheckboxInput
              checked={statusTableData?.length > 0 && statusTableData?.length === selectedCampaignIds?.length}
              onChange={(e) => {
                statusTableData?.map((status: any) => {
                  handleRowCheckboxChange(e, status.campaignId)
                })
              }}
              disabled
            />
          </th>
          <th className="py-2">
            <h1 className="text-[14px] flex justify-start">
              Screen Name
            </h1>
          </th>
          <th className="py-2">
            <h1 className="text-[14px] flex justify-start">
              Touchpoint
            </h1>
          </th>
          <th className="py-2">
            <div className="flex gap-2">
              <h1 className="text-[14px]">Media Type</h1>
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </div>
          </th>
          <th className="py-2">
            <h1 className="text-[14px] flex justify-start">
              Cost
            </h1>
          </th>
          <th className="py-2">
            <div className="flex gap-2">
              <h1 className="text-[14px]">Status</h1>
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </div>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Creative
            </h1>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Action
            </h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {statusTableData?.map((status: any, i: any) => (
          <tr key={i}  className={`border 
            ${status.status === "PleaRequestBudgetSent" && "bg-purple-50"}
            ${
              status.status === "PleaRequestBudgetAccepted" && "bg-purple-50"
            }
            ${
              status.status === "PleaRequestBudgetRejected" && "bg-purple-50"
            }
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
          `}>
            <td className="p-2">
              <CheckboxInput
                checked={selectedCampaignIds?.includes(status.campaignId)}
                onChange={(e) => handleRowCheckboxChange(e, status.campaignId)}
              />
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                {status.screenName}
              </h1>
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                {status.touchPoint}
              </h1>
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                {status.mediaType || "Connected"}
              </h1>
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                &#8377;{Number(status.cost).toFixed(0)}
              </h1>
            </td>
            <td className="py-2">
              <h1 className={`text-[14px] ${
                  status.status === "PleaRequestBudgetSent"
                  ? "text-purple-400"
                  : status.status === "PleaRequestBudgetAccepted"
                  ? "text-blue-400"
                  : status.status === "PleaRequestBudgetRejected"
                  ? "text-red-400"
                  : status.status === "PleaRequestScreenApprovalSent"
                  ? "text-purple-800"
                  : status.status === "PleaRequestScreenApprovalAccepted"
                  ? "text-blue-800"
                  : status.status === "PleaRequestScreenApprovalRejected"
                  ? "text-red-800"
                  : status.status === "PleaRequestFinalApprovalSent"
                  ? "text-purple-800"
                  : status.status === "PleaRequestFinalApprovalAccepted"
                  ? "text-blue-800"
                  : status.status === "PleaRequestFinalApprovalRejected"
                  ? "text-red-800"
                  : ""
                }`}
              >
                {
                  status.status === "PleaRequestBudgetSent"
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
                  ? "Final Rejected" : "Pending"
                }
              </h1>
            </td>
            <td className="p-2">
              {/* {status.creatives} */}
              <i className="fi fi-sr-photo-video text-[20px] text-violet-500 flex justify-center"></i>
            </td>
            <td className="p-2">
                {userInfo?.isMaster ? (
                  <div className="flex justify-center">
                    {selectedCampaignIds?.length > 0 && (
                      <ActionMenu ids={selectedCampaignIds}/>
                    )}
                  </div>
                ) : (
                  <i className="fi fi-bs-menu-dots text-[20px] flex justify-center"></i>
                )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}