import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatValue"
import { useState } from "react";

interface MyRequestsListTableProps {
  requestsList?: any,
  setShowDetails?: any,
  showDetails?: any,
}

export const MyRequestsListTable = ({
  requestsList,
  setShowDetails,
  showDetails,
}: MyRequestsListTableProps) => {

  const navigate = useNavigate();
  const [tooltipContent, setTooltipContent] = useState<any>([]);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLTableRowElement>,
    campaign: any
  ) => {

    setTooltipContent(campaign.campaigns);

    const row = event.currentTarget;
    // console.log(row.getBoundingClientRect());
    const { top, left, width } = row.getBoundingClientRect();

    // Adjust tooltip position to appear above the row
    const tooltipTop = top; // Position the tooltip above the row with some margin
    const tooltipLeft = left; // Center tooltip horizontally relative to the row

    setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
  };

  const handleMouseLeave = () => {
    setTooltipContent([]);
    setTooltipPosition(null);
  };

  
  return (
    <div>
      {tooltipContent.length > 0 && tooltipPosition && (
        <div
          className="absolute bg-gray-700 text-white text-xs rounded py-1 px-2"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          {tooltipContent.map((c: any, i: any) => (
            <p key={i}>{c.screenName}</p>
          ))}
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr className="bg-[#129BFF] text-white text-[14px]">
            <th className="py-2 font-semibold">
              <h1>
                Sl.No.
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1>
                Screens
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1 className="flex justify-start">
                Campaign
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1 className="flex justify-start">
                Brand
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1 className="flex justify-start">
                Client
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1 className="flex justify-start">
                Status
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1 className="flex justify-start">
                Start
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1 className="flex justify-start">
                End
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1 className="flex justify-start">
                Type
              </h1>
            </th>
            <th className="py-2 font-semibold">
              <h1>
                Action
              </h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {requestsList?.map((campaign: any, i: any) => (
              <tr key={i}
                onMouseEnter={(event) => {
                  if (campaign.campaigns.length > 0) {
                    handleMouseEnter(event, campaign);
                  }
                  console.log(campaign);
                }}
                
                onMouseLeave={handleMouseLeave}
              className={`border 
                ${campaign.status === "PleaRequestBudgetSent" && "bg-purple-50"}
                ${
                  campaign.status === "PleaRequestBudgetAccepted" && "bg-purple-50"
                }
                ${
                  campaign.status === "PleaRequestBudgetRejected" && "bg-purple-50"
                }
                ${
                  campaign.status === "PleaRequestScreenApprovalSent" &&
                  "bg-blue-50"
                }
                ${
                  campaign.status === "PleaRequestScreenApprovalAccepted" &&
                  "bg-blue-50"
                }
                ${
                  campaign.status === "PleaRequestScreenApprovalRejected" &&
                  "bg-blue-50"
                }
                ${
                  campaign.status === "PleaRequestFinalApprovalSent" &&
                  "bg-violet-100"
                }
                ${
                  campaign.status === "PleaRequestFinalApprovalAccepted" &&
                  "bg-violet-100"
                }
                ${
                  campaign.status === "PleaRequestFinalApprovalRejected" &&
                  "bg-violet-100"
                }
              `}
              >
                <td className="p-2">
                  <h1 className="text-[14px] flex justify-center">
                    {i+1}
                  </h1>
                </td>
                <td className="p-2">
                  <h1 className="text-[14px] flex justify-start">
                    {campaign?.campaigns.length}
                  </h1>
                </td>
                <td className="p-2">
                  <h1 className="text-[14px] flex justify-start">
                    {campaign.name}
                  </h1>
                </td>
                <td className="p-2">
                  <h1 className="text-[14px] flex justify-start">
                    {campaign.brandName}
                  </h1>
                </td>
                <td className="p-2">
                  <h1 className="text-[14px] flex justify-start">
                    {campaign.clientName}
                  </h1>
                </td>
              
                <td className="p-2">
                <h1 className={`text-[14px] ${
                      campaign.status === "PleaRequestBudgetSent"
                      ? "text-purple-400"
                      : campaign.status === "PleaRequestBudgetAccepted"
                      ? "text-blue-400"
                      : campaign.status === "PleaRequestBudgetRejected"
                      ? "text-red-400"
                      : campaign.status === "PleaRequestScreenApprovalSent"
                      ? "text-purple-800"
                      : campaign.status === "PleaRequestScreenApprovalAccepted"
                      ? "text-blue-800"
                      : campaign.status === "PleaRequestScreenApprovalRejected"
                      ? "text-red-800"
                      : campaign.status === "PleaRequestFinalApprovalSent"
                      ? "text-purple-800"
                      : campaign.status === "PleaRequestFinalApprovalAccepted"
                      ? "text-blue-800"
                      : campaign.status === "PleaRequestFinalApprovalRejected"
                      ? "text-red-800"
                      : campaign.status === "Pending"
                      ? "text-green-700" : ""
                    }`}
                  >
                    {
                      campaign.status === "PleaRequestBudgetSent"
                      ? "Budget Approval Pending"
                      : campaign.status === "PleaRequestBudgetAccepted"
                      ? "Budget Approved"
                      : campaign.status === "PleaRequestBudgetRejected"
                      ? "Budget Rejected"
                      : campaign.status === "PleaRequestScreenApprovalSent"
                      ? "Approval Pending"
                      : campaign.status === "PleaRequestScreenApprovalAccepted"
                      ? "Screen Approved"
                      : campaign.status === "PleaRequestScreenApprovalRejected"
                      ? "Screen Rejected"
                      : campaign.status === "PleaRequestFinalApprovalSent"
                      ? "Final Aprroval Pending"
                      : campaign.status === "PleaRequestFinalApprovalAccepted"
                      ? "Final Approved"
                      : campaign.status === "PleaRequestFinalApprovalRejected"
                      ? "Final Rejected" 
                      : campaign.status === "Pending" ? "Approved" : "Pending"
                    }
                  </h1>
                </td>
                <td className="p-2 truncate">
                  <h1 className="text-[14px] truncate">
                    {new Date(campaign.startDate).toDateString()}
                  </h1>
                </td>
                <td className="p-2 truncate">
                  <h1 className="text-[14px] truncate">
                    {new Date(campaign.endDate).toDateString()}
                  </h1>
                </td>
                <td className="p-2 truncate">
                  <h1 className="text-[14px] truncate">
                    {campaign?.campaignType}
                  </h1>
                </td>
                <td className="p-2"
                  onClick={() => setShowDetails({
                    show: !showDetails.show,
                    data: {
                      campaignId: campaign.campaignCreationId,
                      name: campaign.name,
                      brandName: campaign.brandName,
                      clientName: campaign.clientName,
                      startDate: campaign.startDate,
                      endDate: campaign.endDate,
                      duration: campaign.duration,
                      campaignType: campaign.campaignType,
                      totalCampaignBudget: campaign.totalCampaignBudget,
                      trigger: campaign.triggers,
                      screens: campaign.screens,
                      campaigns: campaign.campaigns
                    }
                  })}
                >
                  <i className="fi fi-bs-menu-dots text-[20px] flex justify-center"></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

  )
}