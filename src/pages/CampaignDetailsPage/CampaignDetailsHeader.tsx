import { TabWithoutIcon } from "../../components/index";
import { FirstCharForBrandName } from "../../components/molecules/FirstCharForBrandName";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";
import { getCampaignEndingStatus } from "../../utils/dateAndTimeUtils";
import { Skeleton } from "antd";
import { EDIT_CAMPAIGN } from "../../constants/campaignConstants";
import { useNavigate } from "react-router-dom";

export const CampaignDetailsHeader = ({
  campaignCreated,
  loadingStatusChange,
  setOpenCreateCampaignEndDateChangePopup,
  openCampaignDashboard,
  currentTab1,
  setCurrentTab1,
}: any) => {
  const navigate = useNavigate();
  return (
    <div className="w-full border border-[#D3D3D350] rounded-md bg-white">
      <div className="flex justify-between border-b p-4">
        <div className="flex gap-4">
          <i
            className="fi fi-sr-angle-small-left text-[#7C8E9B] flex items-center cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <FirstCharForBrandName brandName={campaignCreated?.name || ""} />
          <div className="flex flex-col gap-0">
            <h1 className="text-[18px] font-semibold p-0 m-0">
              {campaignCreated?.name?.toUpperCase() || "Campaign Name"}
            </h1>
            <h1 className="text-[12px]">
              {campaignCreated?.brandName}, {campaignCreated?.duration} days
            </h1>
            <h1
              className={`text-[12px] ${
                getCampaignEndingStatus(campaignCreated?.endDate).includes(
                  "Already"
                )
                  ? "text-[#EF4444]"
                  : "text-[#22C55E]"
              }`}
            >
              {getCampaignEndingStatus(campaignCreated?.endDate)}
            </h1>
          </div>
        </div>
        {loadingStatusChange ? (
          <Skeleton active paragraph={{ rows: 1 }} />
        ) : (
          <div className="flex h-auto gap-1">
            <div
              onClick={() => navigate(`/editCampaign/${campaignCreated?._id}`)}
              className="h-8 truncate flex gap-2 text-[#6F7F8E] text-[14px] font-medium hover:text-[#129BFF] cursor-pointer hover:border border-[#129BFF] rounded-md py-1 px-4"
            >
              <i className="fi fi-rs-dashboard" />
              <h1 className="truncate">Change Creatives</h1>
            </div>
            <div
              onClick={() => {
                const pageName = getCampaignPageNameFromCampaignType(
                  campaignCreated?.campaignType
                );
                navigate(`/${pageName}/${campaignCreated?._id}/edit`, {
                  state: { from: EDIT_CAMPAIGN },
                });
              }}
              className="h-8 truncate flex gap-2 text-[#6F7F8E] text-[14px] font-medium hover:text-[#129BFF] cursor-pointer hover:border border-[#129BFF] rounded-md py-1 px-4"
            >
              <i className="fi fi-rr-file-edit" />
              <h1 className="truncate">Edit Plan</h1>
            </div>
            <div
              onClick={() => setOpenCreateCampaignEndDateChangePopup(true)}
              className="truncate h-8 flex gap-2 text-[#6F7F8E] text-[14px] font-medium hover:text-[#129BFF] cursor-pointer hover:border border-[#129BFF] rounded-md py-1 px-4"
            >
              <i className="fi fi-rs-calendar-lines-pen" />
              <h1 className="truncate">Edit Duration</h1>
            </div>
            <div
              onClick={openCampaignDashboard}
              className="h-8 truncate flex gap-2 text-[14px] font-medium text-[#129BFF] cursor-pointer border border-[#129BFF] rounded-md py-1 px-4"
            >
              <i className="fi fi-rs-dashboard" />
              <h1 className="truncate">View Analytics</h1>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between px-4 items-center">
        <TabWithoutIcon
          currentTab={currentTab1}
          setCurrentTab={setCurrentTab1}
          tabData={[
            { label: "Screens List", id: "1" },
            { label: "About Campaign", id: "2" },
          ]}
        />
      </div>
    </div>
  );
};

export default CampaignDetailsHeader;
