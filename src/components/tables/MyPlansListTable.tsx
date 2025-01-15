import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatValue";
import {
  CAMPAIGN_PLAN_TYPE_KNOW,
  CAMPAIGN_PLAN_TYPE_REGULAR,
  CAMPAIGN_PLAN_TYPE_STORE,
  CAMPAIGN_PLAN_TYPE_TOPICAL,
  CAMPAIGN_PLAN_TYPE_TRIGGER,
} from "../../constants/campaignConstants";

interface MyRequestsListTableProps {
  plansList?: any;
  query?: any;
}

export const MyPlansListTable = ({
  plansList,
  query,
}: MyRequestsListTableProps) => {
  const navigate = useNavigate();
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#129BFF] text-[#FFFFFF] text-[14px]">
          <th className="py-2 font-semibold">
            <h1>Sl.No.</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="flex justify-start">Campaign Name</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="flex justify-start">Brand Name</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="flex justify-start">Client Name</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="flex justify-start">Status</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="flex justify-start">Start Date</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="flex justify-start">End Date</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="flex justify-start">Campaign Type</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>Action</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {plansList
          ?.filter((data: any) =>
            data?.name?.toLowerCase().includes(query?.toLowerCase())
          )
          ?.map((campaign: any, i: any) => (
            <tr key={i}>
              <td className="p-2">
                <h1 className="text-[14px] flex justify-center">{i + 1}</h1>
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
                <h1 className="text-[14px]">{campaign.status || "Pending"}</h1>
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
                  {campaign?.campaignType === CAMPAIGN_PLAN_TYPE_REGULAR
                    ? "Regular Plan"
                    : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_TRIGGER
                    ? "Trigger Based Plan"
                    : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_STORE
                    ? "Stores Based Plan"
                    : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_TOPICAL
                    ? "Special Day Plan"
                    : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_KNOW
                    ? "I Know It All Plan"
                    : "None"}
                </h1>
              </td>
              <td
                className="p-2"
                onClick={() =>
                  navigate(
                    `/${
                      campaign?.campaignType === CAMPAIGN_PLAN_TYPE_REGULAR
                        ? "regularplan"
                        : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_TRIGGER
                        ? "triggerbasedplan"
                        : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_STORE
                        ? "storebasedplan"
                        : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_TOPICAL
                        ? "specialdayplan"
                        : campaign?.campaignType === CAMPAIGN_PLAN_TYPE_KNOW
                        ? "iknowitallplan"
                        : ""
                    }/${campaign._id}`
                  )
                }
              >
                <i className="fi fi-bs-menu-dots text-[20px] flex justify-center"></i>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
