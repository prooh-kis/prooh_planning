import { Skeleton, Tooltip } from "antd";
import {
  CAMPAIGN_STATUS_ACTIVE,
  CAMPAIGN_STATUS_DELETED,
  CAMPAIGN_STATUS_PAUSE,
} from "../../constants/campaignConstants";
import { SearchInputField, NoDataView } from "../../components";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { creativeTypeTab } from "../../constants/tabDataConstant";
import {
  CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_PLANNING_PAGE,
  CAMPAIGN_STATUS_CHANGED_TO_DELETED_PLANNING_PAGE,
  CAMPAIGN_STATUS_CHANGED_TO_PAUSED_PLANNING_PAGE,
} from "../../constants/userConstants";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import { useEffect, useState } from "react";
import { getUserRole } from "../../utils/campaignUtils";

const ScreenListForCampaignDetails = ({
  campaignCreated,
  loadingStatusChange,
  handleChangeStatusAll,
  searchQuery,
  setSearchQuery,
  campaigns,
  campaign,
  handelSelectScreen,
  handleSetCurrentScreen,
  handleChangeCampaignStatus,
  setOpenCreativeEndDateChangePopup,
  screens,
  handleShowLogReport,
  currentScreen,
  currentTab,
  setCurrentTab,
  userInfo,
}: any) => {
  const [initialized, setInitialized] = useState(false);

  const renderCreatives = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {campaign?.creatives?.[currentTab].map(
          (creativeGroup: any, i: number) => (
            <div className="truncate" key={i}>
              <ShowMediaFile
                url={creativeGroup.url}
                mediaType={creativeGroup.type?.split("/")[0]}
                height="h-auto"
                width="w-full"
              />
              <Tooltip title={creativeGroup.url?.split("_").pop()}>
                <h1 className="text-[12px] text-gray-500 truncate">
                  {creativeGroup.url?.split("_").pop()}
                </h1>
              </Tooltip>
            </div>
          )
        )}
      </div>
    );
  };
  useEffect(() => {
    if (campaigns?.length > 0) {
      handelSelectScreen(campaigns[0]?._id);
      handleSetCurrentScreen(campaigns[0]?.screenId)
    }
  }, [campaigns]); // Only runs once when campaigns first loads

  return (
    <div className="grid grid-cols-12 gap-1 mt-1">
      <div className="col-span-7 w-full h-auto border border-[#D3D3D350] rounded-md p-4 bg-white">
        <div className="flex justify-between">
          <h1 className="text-[16px] font-semibold">
            Screens Play{" "}
            <span className="text-[14px] text-[#68879C] ">
              ({campaignCreated?.screenIds?.length || 0})
            </span>
          </h1>
          {loadingStatusChange ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : (
            <div>
              {getUserRole(userInfo?.userRole) === "planner" && (
                <div className="py-2 flex items-center justify-center h-auto gap-4">
                  <Tooltip title="Pause for all screens">
                    <i
                      className="fi fi-br-pause-circle text-[#000000] cursor-pointer"
                      onClick={() =>
                      handleChangeStatusAll(
                        CAMPAIGN_STATUS_PAUSE,
                        CAMPAIGN_STATUS_CHANGED_TO_PAUSED_PLANNING_PAGE
                      )
                    }
                  />
                </Tooltip>
                <Tooltip title="Activate for all screens">
                  <i
                    className="fi fi-br-play-circle text-[#000000] cursor-pointer"
                    onClick={() =>
                      handleChangeStatusAll(
                        CAMPAIGN_STATUS_ACTIVE,
                        CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_PLANNING_PAGE
                      )
                    }
                  />
                </Tooltip>
                <Tooltip title="Delete for all screens">
                  <i
                    className="fi fi-br-trash text-[#D44949] cursor-pointer"
                    onClick={() =>
                      handleChangeStatusAll(
                        CAMPAIGN_STATUS_DELETED,
                        CAMPAIGN_STATUS_CHANGED_TO_DELETED_PLANNING_PAGE
                      )
                    }
                  />
                </Tooltip>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-0">
          <SearchInputField
            placeholder="Search screens by name"
            height="h-8"
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <div className="h-[56vh] overflow-y-auto scrollbar-minimal mt-2 pr-2 flex flex-col gap-1">
          {campaigns?.length === 0 ? (
            <NoDataView />
          ) : (
            campaigns?.map((camp: any, k: number) => (
              <div
                key={k}
                className={`p-0 m-0 rounded-md ${campaign?._id === camp?._id ? "bg-[#129BFF30]" : ""
                  } cursor-pointer`}
                onClick={() => {
                  handelSelectScreen(camp?._id);
                  handleSetCurrentScreen(camp?.screenId);
                }}
              >
                <ScreenListMonitoringView
                  handleChangeCampaignStatus={handleChangeCampaignStatus}
                  campaignCreated={campaignCreated}
                  setOpenCreativeEndDateChangePopup={
                    setOpenCreativeEndDateChangePopup
                  }
                  screen={screens?.find(
                    (screen: any) => screen?.screenId === camp?.screenId
                  )}
                  campaign={camp}
                  noImages={false}
                  showOption={true}
                  handleGetCampaignLog={handleShowLogReport}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Creative Display */}
      {currentScreen && (
        <div className="col-span-5 w-full h-auto border border-[#D3D3D350] rounded-md p-4 bg-white">
          <div className="col-span-7 truncate flex flex-col gap-1">
            <h1 className="text-[16px] text-[#294558] font-bold truncate">
              {currentScreen?.screenName}
            </h1>
            <div className="flex gap-2 py-2 text-[12px] text-[#6B8494]">
              <i className="fi fi-sr-marker" />
              <h1 className="truncate">
                {currentScreen?.location?.address || currentScreen?.location},{" "}
                {currentScreen?.location?.city || currentScreen?.city}
              </h1>
            </div>
          </div>
          <h1 className="text-[16px] text-[#294558] font-semibold truncate  border-t py-1">
            Creatives List
          </h1>
          <div className="border-b mb-2 border-t mt-2">
            <TabWithoutIcon
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tabData={creativeTypeTab}
            />
          </div>
          <div className="h-[50vh] rounded overflow-y-auto no-scrollbar py-2">
            <div className="grid grid-cols-2 gap-4">
              {campaign?.creatives?.[currentTab].map(
                (creativeGroup: any, i: number) => (
                  <div className="truncate" key={i}>
                    <ShowMediaFile
                      url={creativeGroup.url}
                      mediaType={creativeGroup.type?.split("/")[0]}
                      height="h-auto"
                      width="w-full"
                    />
                    <Tooltip title={creativeGroup.url?.split("_").pop()}>
                      <h1 className="text-[12px] text-gray-500 truncate">
                        {creativeGroup.url?.split("_").pop()}
                      </h1>
                    </Tooltip>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenListForCampaignDetails;
