import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";

interface MyCampaignsListTableProps {
  campaignsList?: any;
  loading?: any;
}

export const MyCampaignsListTable = ({
  campaignsList,
  loading,
}: MyCampaignsListTableProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#129BFF] text-[#FFFFFF] text-[14px]">
          <th className="py-2 font-semibold">
            <h1>Sl.No.</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="text-[14px] flex justify-start">Campaign Name</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="text-[14px] flex justify-start">Brand Name</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="text-[14px] flex justify-start">Campaign Type</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="text-[14px] flex justify-start">Start Date</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1 className="text-[14px] flex justify-start">End Date</h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>Action</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr className="w-full">
            <div className="h-full w-full">
              <h1>Loading data, please wait...</h1>
              <SkeletonLoader />
            </div>
          </tr>
        )}
        {campaignsList?.map((campaign: any, i: any) => (
          <tr key={i}>
            <td className="p-2">
              <h1 className="text-[14px] flex justify-center">{i + 1}</h1>
            </td>
            <td className="p-2">
              <h1 className="text-[14px]">{campaign.name}</h1>
            </td>
            <td className="p-2">
              <h1 className="text-[14px]">{campaign.brandName}</h1>
            </td>
            <td className="p-2">
              <h1 className="text-[14px]">{campaign.campaignType}</h1>
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
            <td
              className="p-2"
              onClick={() => {
                // dispatch(addDetailsToCreateCampaign({
                //   id: campaign._id,
                // }));
                // if (campaign.currentPage !== "")
                navigate(`/campaignDetails/${campaign._id}`);
              }}
            >
              <i className="fi fi-bs-menu-dots text-[20px] flex justify-center"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
