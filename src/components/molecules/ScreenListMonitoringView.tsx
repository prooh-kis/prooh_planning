import { useState } from "react";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { UPLOAD_CREATIVE_SCREEN_DATA } from "../../constants/localStorageConstants";
import { useDispatch } from "react-redux";
import {
  convertIntoDateAndTime,
  getNumberOfDaysBetweenTwoDates,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import {
  CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_PLANNING_PAGE,
  CAMPAIGN_STATUS_CHANGED_TO_DELETED_PLANNING_PAGE,
  CAMPAIGN_STATUS_CHANGED_TO_PAUSED_PLANNING_PAGE,
} from "../../constants/userConstants";

export function ScreenListMonitoringView({
  screen,
  noImages,
  setOpenCreativeEndDateChangePopup,
  campaignCreated,
  handleChangeCampaignStatus,
  handleGetCampaignLog,
  showOption,
  campaign,
}: any) {
  const dispatch = useDispatch<any>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const getScreenClassName = (screen: any) => {
    if (screen?.screenCode) {
      if (getTimeDifferenceInMin(screen?.lastActive) < 15)
        return "border w-3 h-3 bg-[#348730] rounded-full justify-end";
      else return "border w-3 h-3 bg-yellow-500 rounded-full justify-end";
    } else return "border w-3 h-3 bg-red-500 rounded-full justify-end";
  };

  const getClassNameByStatus = () => {
    let className = "text-[12px] truncate";
    if (campaign?.status === "Active") {
      className += "text-[#348730]";
    } else if (campaign?.status === "Pause") {
      className += " text-[#FF6E3E]";
    } else if (campaign?.status === "Deleted") {
      className += " text-yellow-500";
    } else {
      className += " text-[#129BFF]";
    }
    return className;
  };

  const isScreenActive = () => {
    if (screen?.screenCode) {
      if (getTimeDifferenceInMin(screen?.lastActive) < 15) return true;
      else false;
    }
    return false;
  };

  return (
    <div>
      {isScreenActive() ? (
        <div className="flex grid grid-cols-12 gap-2 p-2 hover:bg-gray-100 rounded-md">
          {!noImages && (
            <div className="col-span-3">
              <img
                className="rounded h-24 w-full"
                src={screen?.images[0]}
                alt={screen?._id}
              />
              <div className="-mt-2">
                <Tooltip
                  title={`${
                    convertIntoDateAndTime(screen?.lastActive) ||
                    "Not Available"
                  }`}
                >
                  <div className="h-full flex justify-end items-end ml-[-8px]">
                    <div className={getScreenClassName(screen)} />
                  </div>
                </Tooltip>
              </div>
            </div>
          )}
          <div className="col-span-7 truncate flex flex-col gap-1">
            <h1 className="text-[20px] text-[#294558] font-semibold truncate">
              {screen?.screenName}
            </h1>
            <div className="flex gap-2 text-[14px] text-[#6B8494]">
              <i className="fi fi-sr-marker"></i>
              <h1 className="truncate">
                {screen?.location?.address || screen?.location},{" "}
                {screen?.location?.city || screen?.city}
              </h1>
            </div>
          </div>
          <div className="col-span-1 relative inline-block ml-auto">
            {showOption && (
              <i
                className="fi fi-br-menu-dots-vertical cursor-pointer text-[#6B8494]"
                onClick={() => setShowMenu(true)}
              ></i>
            )}
            {campaignCreated && showMenu && (
              <div
                onMouseLeave={() => setShowMenu(false)}
                className="absolute z-10 mt-1 w-[150px] bg-white border border-gray-300  shadow-lg right-0 text-sm text-black-1000"
              >
                <ul className="border rounded ">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-[#129BFF] hover:text-white"
                    onClick={() => {
                      if (
                        confirm(`Are you sure you want to edit the campaign???`)
                      ) {
                        saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, {
                          [`${campaignCreated?._id}`]:
                            campaign?.creatives?.standardDayTimeCreatives,
                        });
                        setOpenCreativeEndDateChangePopup(true);
                      }
                    }}
                  >
                    Edit
                  </li>

                  {campaign?.status === "Active" && (
                    <li
                      onClick={() => {
                        handleChangeCampaignStatus(
                          "Pause",
                          campaign?._id,
                          CAMPAIGN_STATUS_CHANGED_TO_PAUSED_PLANNING_PAGE
                        );
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-white cursor-pointer"
                    >
                      Pause
                    </li>
                  )}
                  {(campaign?.status === "Active" ||
                    campaign?.status === "Pause") && (
                    <li
                      onClick={() => {
                        handleChangeCampaignStatus(
                          "Delete",
                          campaign?._id,
                          CAMPAIGN_STATUS_CHANGED_TO_DELETED_PLANNING_PAGE
                        );
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-white cursor-pointer"
                    >
                      Delete
                    </li>
                  )}
                  {(campaign?.status === "Deleted" ||
                    campaign?.status === "Pause" ||
                    campaign?.status === "Completed") && (
                    <li
                      onClick={() => {
                        handleChangeCampaignStatus(
                          "Active",
                          campaign?._id,
                          CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_PLANNING_PAGE
                        );
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-white cursor-pointer"
                    >
                      Activate
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-4 p-1 hover:bg-gray-100 hover:rounded text-[#9AADB9]">
          {!noImages && (
            <div className="flex justify-center items-center">
              <Tooltip
                title={`${
                  convertIntoDateAndTime(screen?.lastActive) || "Not Available"
                }`}
              >
                <img
                  className="rounded h-24 w-32 saturate-0 opacity-50"
                  src={screen?.images[0]}
                  alt={screen?._id}
                />
              </Tooltip>
            </div>
          )}
          <div className="truncate flex flex-col gap-1">
            <h1 className="text-[16px] font-semibold truncate">
              {screen?.screenName}
            </h1>
            <div className="flex gap-2 text-[12px]">
              <i className="fi fi-sr-marker"></i>
              <h1 className="truncate">
                {screen?.location?.address || screen?.location},{" "}
                {screen?.location?.city || screen?.city}
              </h1>
            </div>
            <div className="flex gap-2 text-[12px]">
              <i className="fi fi-sr-megaphone"></i>
              <h1 className="truncate">
                Ends In:{" "}
                {getNumberOfDaysBetweenTwoDates(new Date(), campaign?.endDate)}{" "}
                Days
              </h1>
            </div>
            <h1 className="text-[12px]">
              {campaign?.status ?? "No Creatives"}
            </h1>
          </div>
          <div className="relative inline-block ml-auto">
            {showOption && (
              <i
                className="fi fi-bs-menu-dots cursor-pointer"
                onClick={() => setShowMenu(true)}
              ></i>
            )}
            {campaignCreated &&
              showMenu &&
              userInfo?.userRole === "primary" && (
                <div
                  onMouseLeave={() => setShowMenu(false)}
                  className="absolute z-10 mt-1 w-[150px] bg-white border border-gray-300  shadow-lg right-0 text-sm text-black-1000"
                >
                  <ul className="border rounded ">
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-[#129BFF] hover:text-white"
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to edit the campaign???`
                          )
                        ) {
                          saveDataOnLocalStorage(UPLOAD_CREATIVE_SCREEN_DATA, {
                            [`${campaignCreated?._id}`]:
                              campaign?.creatives?.standardDayTimeCreatives,
                          });
                          setOpenCreativeEndDateChangePopup(true);
                        }
                      }}
                    >
                      Edit
                    </li>

                    {campaign?.status === "Active" && (
                      <li
                        onClick={() => {
                          handleChangeCampaignStatus(
                            "Pause",
                            campaign?._id,
                            CAMPAIGN_STATUS_CHANGED_TO_PAUSED_PLANNING_PAGE
                          );
                        }}
                        className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-white cursor-pointer"
                      >
                        Pause
                      </li>
                    )}
                    {(campaign?.status === "Active" ||
                      campaign?.status === "Pause") && (
                      <li
                        onClick={() => {
                          handleChangeCampaignStatus(
                            "Delete",
                            campaign?._id,
                            CAMPAIGN_STATUS_CHANGED_TO_DELETED_PLANNING_PAGE
                          );
                        }}
                        className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-white cursor-pointer"
                      >
                        Delete
                      </li>
                    )}
                    {(campaign?.status === "Deleted" ||
                      campaign?.status === "Pause" ||
                      campaign?.status === "Completed") && (
                      <li
                        onClick={() => {
                          handleChangeCampaignStatus(
                            "Active",
                            campaign?._id,
                            CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_PLANNING_PAGE
                          );
                        }}
                        className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-white cursor-pointer"
                      >
                        Activate
                      </li>
                    )}

                    <li
                      onClick={() => {
                        handleGetCampaignLog(campaign?._id);
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-[#129BFF] hover:text-white cursor-pointer"
                    >
                      View Log Report
                    </li>
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
