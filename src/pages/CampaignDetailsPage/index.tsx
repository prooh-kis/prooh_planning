import { message, Skeleton, Tooltip } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import {
  convertIntoDateAndTime,
  getCampaignEndingStatus,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import {
  campaignLogsByCampaignIdAction,
  changeCampaignStatusAction,
  editAllSubCampaignsAction,
  getCampaignCreatedScreensDetailsAction,
  getCampaignDetailsAction,
} from "../../actions/campaignAction";
import { confirmData } from "../../utils/champaignStatusUtils";
import {
  CAMPAIGN_STATUS_ACTIVE,
  CAMPAIGN_STATUS_DELETED,
  CAMPAIGN_STATUS_PAUSE,
  CAMPAIGN_STATUS_CHANGE_RESET,
  EDIT_ALL_SUB_CAMPAIGNS_RESET,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
  EDIT_CAMPAIGN,
} from "../../constants/campaignConstants";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import {
  EditCampaignCreationAndItsSubCampaigns,
  EditCreativeEndDatePopup,
  SearchInputField,
  NoDataView,
  PrimaryButton,
} from "../../components";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { creativeTypeTab } from "../../constants/tabDataConstant";
import { MY_CREATIVES } from "../../routes/routes";
import {
  CAMPAIGN_CREATION_EDIT_END_DATE_PLANNING_PAGE,
  CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
  CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_PLANNING_PAGE,
  CAMPAIGN_STATUS_CHANGED_TO_DELETED_PLANNING_PAGE,
  CAMPAIGN_STATUS_CHANGED_TO_PAUSED_PLANNING_PAGE,
} from "../../constants/userConstants";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";
import { GET_CAMPAIGN_DASHBOARD_DATA_RESET } from "../../constants/screenConstants";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { formatNumber } from "../../utils/formatValue";

export const CampaignDetailsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState<string>(
    "standardDayTimeCreatives"
  );
  const [currentTab1, setCurrentTab1] = useState<string>("1");
  const campaignId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;
  const [campaign, setCampaign] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [dropdownVisible, setDropdownVisible] = useState<any>({});

  const [openCreativeEndDateChangePopup, setOpenCreativeEndDateChangePopup] =
    useState<any>(false);
  const [openCampaignLogPopup, setOpenCampaignLogPopup] = useState<any>(false);
  const [
    openCreateCampaignEndDateChangePopup,
    setOpenCreateCampaignEndDateChangePopup,
  ] = useState<any>(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [screenCreativeUpload, setScreenCreativeUpload] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const campaignDetailsGet = useSelector(
    (state: any) => state.campaignDetailsGet
  );
  const { loading, error, data: campaignCreated } = campaignDetailsGet;

  const campaignCreatedScreensDetailsGet = useSelector(
    (state: any) => state.campaignCreatedScreensDetailsGet
  );
  const {
    loading: loadingScreens,
    error: errorScreens,
    data: screens,
  } = campaignCreatedScreensDetailsGet;

  const campaignStatusChange = useSelector(
    (state: any) => state.campaignStatusChange
  );
  const {
    loading: loadingStatusChange,
    error: errorStatusChange,
    success: successStatusChange,
  } = campaignStatusChange;

  const editAllSubCampaigns = useSelector(
    (state: any) => state.editAllSubCampaigns
  );
  const {
    loading: loadingEditAllSubCampaigns,
    error: errorEditAllSubCampaigns,
    data: successEditAllSubCampaigns,
  } = editAllSubCampaigns;

  const changeCampaignCreativeEndDate = useSelector(
    (state: any) => state.changeCampaignCreativeEndDate
  );
  const {
    loading: loadingChange,
    error: errorChange,
    success: successChange,
  } = changeCampaignCreativeEndDate;

  const handleEditAllSubCampaigns = (
    campaignCreationId: string,
    endDate: any
  ) => {
    dispatch(
      editAllSubCampaignsAction({
        campaignCreationId,
        endDate,
        campaignCreationIds: [campaignCreationId],
        event: CAMPAIGN_CREATION_EDIT_END_DATE_PLANNING_PAGE,
      })
    );
  };

  const campaigns =
    screens?.length > 0
      ? campaignCreated?.campaigns
          ?.filter((camp: any) =>
            campaignCreated?.screenIds?.includes(camp.screenId.toString())
          )
          ?.filter((camp: any) =>
            camp?.screenName
              ?.toLowerCase()
              ?.includes(searchQuery?.toLowerCase())
          )
      : [];

  useEffect(() => {
    if (successEditAllSubCampaigns) {
      message.success("Campaign updated successfully!");
      dispatch({
        type: EDIT_ALL_SUB_CAMPAIGNS_RESET,
      });
      setOpenCreateCampaignEndDateChangePopup(false);
      dispatch(
        getCampaignDetailsAction({
          campaignId: campaignId,
          event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
        })
      );
    }
    if (errorEditAllSubCampaigns) {
      message.error(errorEditAllSubCampaigns);
      dispatch({
        type: EDIT_ALL_SUB_CAMPAIGNS_RESET,
      });
      setOpenCreateCampaignEndDateChangePopup(false);
    }
  }, [successEditAllSubCampaigns, dispatch, errorEditAllSubCampaigns]);

  useEffect(() => {
    if (campaignCreated) {
      dispatch(
        getCampaignCreatedScreensDetailsAction({
          screenIds: campaignCreated.screenIds,
        })
      );
    }
  }, [campaignCreated, dispatch]);

  useEffect(() => {
    if (successStatusChange) {
      message.success("Campaign Status Changed");
      dispatch({
        type: CAMPAIGN_STATUS_CHANGE_RESET,
      });
      dispatch(
        getCampaignDetailsAction({
          campaignId: campaignId,
          event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
        })
      );
    }
    if (errorStatusChange) {
      message.error(errorStatusChange);
      dispatch({
        type: CAMPAIGN_STATUS_CHANGE_RESET,
      });
    }
    if (successChange) {
      message.success("Campaign Creative/End Date Changed");
      dispatch({
        type: EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
      });
      window.location.reload();
    }
  }, [dispatch, successStatusChange, errorStatusChange, successChange]);

  useEffect(() => {
    removeAllKeyFromLocalStorage();
    dispatch({ type: GET_CAMPAIGN_DASHBOARD_DATA_RESET });
    dispatch(
      getCampaignDetailsAction({
        campaignId: campaignId,
        event: CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_PLANNING_PAGE,
      })
    );
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [campaignId, dispatch, userInfo]);

  const toggleDropdown = (screenId: string) => {
    setDropdownVisible((prev: any) => ({
      ...prev,
      [screenId]: !prev[screenId],
    }));
  };

  const handelSelectScreen = (campaignId: string) => {
    const data = campaignCreated?.campaigns?.find(
      (data: any) => data?._id == campaignId
    );
    setCampaign(data);
  };

  const getCampaignIdsToChangeStatus = () => {
    return campaignCreated?.campaigns?.map((campaign: any) => campaign._id);
  };

  const handleChangeStatusAll = (status: string, event: string) => {
    if (confirm(confirmData[status])) {
      let data = getCampaignIdsToChangeStatus();
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
            event: event,
          })
        );
      } else {
        message.error("No Campaign found!, to change status");
      }
    }
  };

  const handleChangeCampaignStatus = (
    status: string,
    campaignId: string,
    event: string
  ) => {
    if (confirm(confirmData[status])) {
      let data = campaignCreated?.campaigns
        ?.filter((campaign: any) => campaign._id == campaignId)
        ?.map((campaign: any) => campaign._id);
      if (data?.length > 0) {
        dispatch(
          changeCampaignStatusAction({
            campaignIds: data,
            status: status,
            event: event,
          })
        );
      } else {
        message.error("No Campaign found!, to change status");
      }
    }
  };

  const handleOpenCloseCampaignLogPopup = useCallback(() => {
    setOpenCampaignLogPopup((pre: boolean) => !pre);
  }, [openCampaignLogPopup]);

  const handleShowLogReport = (campaignId: string) => {
    if (campaignId) {
      dispatch(campaignLogsByCampaignIdAction(campaignId));
      handleOpenCloseCampaignLogPopup();
    } else {
      message.error("No creative added!");
    }
  };

  const openCampaignDashboard = () => {
    navigate(`/campaignDashboard/${campaignId}`);
  };

  const getBgColors = (index: any) => {
    const colors = [
      "bg-[#EF444450]",
      "bg-[#F59E0B50]",
      "bg-[#EAB30850]",
      "bg-[#22C55E50]",
      "bg-[#06B6D450]",
      "bg-[#3B82F650]",
      "bg-[#6366F150]",
      "bg-[#8B5CF650]",
      "bg-[#78DCCA50]",
      "bg-[#FF77E950]",
      "bg-[#3AB7BF50]",
      "bg-[#3F3CBB50]",
      "bg-[#22C55E50]",
      "bg-[#06B6D450]",
      "bg-[#3B82F650]",
      "bg-[#6366F150]",
      "bg-[#EF444450]",
      "bg-[#F59E0B50]",
    ];
    return colors[index];
  };

  function MyDiv({ left, right, paisa = false }: any) {
    return (
      <div className="flex ">
        <h1 className="text-left text-[14px] basis-1/2 text-[#6F7F8E] font-medium ">
          {left}
        </h1>
        {paisa ? (
          <h1 className="text-left text-[14px] basis-1/2 text-[#0E212E]">
            &#8377; {right}
          </h1>
        ) : (
          <h1 className="text-left text-[14px] basis-1/2 text-[#0E212E]">
            {right}
          </h1>
        )}
        
      </div>
    );
  }

  const basicDetails = [
    { label: "Campaign Name", value: campaignCreated?.name },
    { label: "Client Name", value: campaignCreated?.clientName },
    { label: "Brand Name", value: campaignCreated?.brandName },
    { label: "Campaign Type", value: campaignCreated?.campaignType },
    { label: "Trigger", value: campaignCreated?.triggers?.weatherTriggers?.length > 0
      ? "Weather Trigger"
      : campaignCreated?.triggers?.sportsTriggers?.length > 0
      ? "Sports Trigger"
      : campaignCreated?.triggers?.vacantSlots?.length > 0 ? 
      "Fill Vacancy Trigger" : "None" },
    { label: "Plan Created by", value: campaignCreated?.campaignPlannerName },
    { label: "Plan Approved by", value: campaignCreated?.campaignManagerEmail?.split("@")[0] },
  ];

  const durationDetails = [
    {
      label: "Start Date",
      value: convertIntoDateAndTime(campaignCreated?.startDate),
    },
    {
      label: "End Date",
      value: convertIntoDateAndTime(campaignCreated?.endDate),
    },
    { label: "Duration", value: `${campaignCreated?.duration} Days ` },
    {
      label: "Ends In",
      value: getCampaignEndingStatus(campaignCreated?.endDate)?.split(":")[1],
    },
  ];

  const performanceMatrix = [
    {
      label: "Total Cities",
      value: campaignCreated?.cities?.length,
    },
    {
      label: "Total TouchPoints",
      value: campaignCreated?.touchPoints?.length,
    },
    { label: "Total Screens", value: campaignCreated?.screenIds?.length},
    {
      label: "Audience Impression",
      value: formatNumber(campaignCreated?.totalImpression),
    },
    {
      label: "Reach",
      value: formatNumber(campaignCreated?.totalReach),
    },
    {
      label: "Tg%",
      value: `${Number((campaignCreated?.totalImpression / campaignCreated?.totalReach)).toFixed(2)}  %`,
    },
    {
      label: "CPM",
      value: `${formatNumber(Number(campaignCreated?.totalCpm).toFixed(2))}`,
      paisa: true,
    },
  ];

  const campaignCost = [
    {
      label: "Plan Cost",
      value: formatNumber(campaignCreated?.totalCampaignBudget.toFixed(2)),
      paisa: true,
    },
    {
      label: "Trigger Cost",
      value: campaignCreated?.triggers?.weatherTriggers?.length > 0
      ? campaignCreated?.triggers?.weatherTriggers?.[0]?.budget.toFixed(2)
      : campaignCreated?.triggers?.sportsTriggers?.length > 0
      ? campaignCreated?.triggers?.sportsTriggers?.[0]?.budget.toFixed(2)
      : campaignCreated?.triggers?.vacantSlots?.length > 0 ? 
      campaignCreated?.triggers?.vacantSlots?.[0]?.budget.toFixed(2) : "None" ,
      paisa: true,
    },
    {
      label: "Total Discount",
      value: formatNumber(campaignCreated?.totalDiscount.toFixed(2)),
      paisa: true,
    },
    {
      label: "Total Cost",
      value: formatNumber(campaignCreated?.finalCampaignBudget !== 0 ? campaignCreated?.finalCampaignBudget.toFixed(2) : campaignCreated?.totalCampaignBudget.toFixed(2)),
      paisa: true
    },
  ];

  return (
    <div className="w-full grid grid-cols-12 gap-2 pt-2">
      {openCreativeEndDateChangePopup && (
        <EditCreativeEndDatePopup
          onClose={() => setOpenCreativeEndDateChangePopup(false)}
          selectedScreens={screens}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          campaign={campaign}
          screenData={screenCreativeUpload}
        />
      )}
      {openCreateCampaignEndDateChangePopup && (
        <EditCampaignCreationAndItsSubCampaigns
          onClose={() => setOpenCreateCampaignEndDateChangePopup(false)}
          openShowMedia={openCreateCampaignEndDateChangePopup}
          campaignCreation={campaignCreated}
          isLoading={loadingEditAllSubCampaigns}
          handleNext={handleEditAllSubCampaigns}
        />
      )}

      {loading ? (
        <div className="col-span-8">
          <Loading />
        </div>
      ) : (
        <div className="col-span-8">
          <div className="w-full border border-[#D3D3D350] rounded-[18px] px-4 pt-4 bg-white">
            <div className="flex justify-between mx-1">
              <div className="flex gap-4">
                <i
                  className="fi fi-sr-angle-small-left text-[#7C8E9B] flex items-center"
                  onClick={() => navigate(-1)}
                ></i>
                <div
                  className={
                    campaignCreated
                      ? `rounded  ${getBgColors(
                          campaignCreated?.brandName?.split(" ")[0]?.split("")
                            .length
                        )}`
                      : `rounded bg-gray-100`
                  }
                >
                  <h1 className="text-[40px] text-white font-bold px-4">
                    {campaignCreated?.brandName.split("")[0]}
                  </h1>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[18px] font-semibold p-0 m-0">
                    {campaignCreated?.name?.toUpperCase() ||
                      "Campaign Name"}
                  </h1>
                  <h1 className="text-[12px]">
                    {campaignCreated?.brandName}, {campaignCreated?.duration}{" "}
                    days
                  </h1>
                </div>
              </div>
              {loadingStatusChange ? (
                <Skeleton active paragraph={{ rows: 1 }} />
              ) : (
                <div className="flex h-auto gap-1">
                  <div
                    onClick={() => {
                      const pageName = getCampaignPageNameFromCampaignType(campaignCreated?.campaignType);
                      navigate(
                        `/${pageName}/${campaignCreated._id}/edit`,
                        {
                          state: {
                            from: EDIT_CAMPAIGN,
                          },
                        }
                      );
                    }}
                    className="h-8 truncate flex gap-2 text-[#6F7F8E] text-[14px] font-medium hover:text-[#129BFF] cursor-pointer hover:border border-[#129BFF] rounded-md py-1 px-4"
                  >
                    <i className="fi fi-rr-file-edit"></i>
                    <h1 className="truncate">Edit Plan</h1>
                  </div>
                  <div
                    onClick={() =>
                      setOpenCreateCampaignEndDateChangePopup(
                        !openCreateCampaignEndDateChangePopup
                      )
                    }
                    className="truncate h-8 flex gap-2 text-[#6F7F8E] text-[14px] font-medium hover:text-[#129BFF] cursor-pointer hover:border border-[#129BFF] rounded-md py-1 px-4"
                  >
                    <i className="fi fi-rs-calendar-lines-pen"></i>
                    <h1 className=" truncate">Edit Duration</h1>
                  </div>
                  <div
                    onClick={() => openCampaignDashboard()}
                    className="h-8 truncate flex gap-2 text-[14px] font-medium text-[#129BFF] cursor-pointer border border-[#129BFF] rounded-md py-1 px-4"
                  >
                    <i className="fi fi-rs-dashboard"></i>
                    <h1 className=" truncate">View Analytics</h1>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between px-4 mt-2 items-center">
              <TabWithoutIcon
                currentTab={currentTab1}
                setCurrentTab={setCurrentTab1}
                tabData={[
                  { label: "Campaign details", id: "1" },
                  { label: "Campaign creatives", id: "2" },
                ]}
              />
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
          {currentTab1 === "1" ? (
            <div className="w-full h-[65vh] border border-[#D3D3D350] rounded-[18px] p-4 bg-white mt-2">
              <div className="flex justify-between border-b pb-2">
                <h1 className="text-[#092A41] text-[16px] font-semibold mt-2 px-1">
                  Your Plan Details
                </h1>{" "}
                <div
                  onClick={() => openCampaignDashboard()}
                  className="h-8 flex items-center gap-2 text-[14px] font-medium text-[#129BFF] cursor-pointer hover:border border-[#129BFF] rounded-md py-1 px-4"
                >
                  <i className="fi-rr-file-download"></i>
                  <h1 className="">Download Approach</h1>
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-6 border-r-2">
                  <div className="p-4">
                    <h1 className="text-[#0E212E] font-semibold text-[14px]  ">
                      Basic Details
                    </h1>
                    <div className="mt-2 flex flex-col gap-1">
                      {basicDetails?.map((data, index) => (
                        <MyDiv
                          key={index}
                          left={data.label}
                          right={data.value}
                        />
                      ))}
                    </div>
                    <h1 className="text-[#0E212E] font-semibold text-[14px] mt-4">
                      Campaign Duration
                    </h1>
                    <div className="mt-2 flex flex-col gap-1">
                      {durationDetails?.map((data, index) => (
                        <MyDiv
                          key={index}
                          left={data.label}
                          right={data.value}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="p-4">
                    <h1 className="text-[#0E212E] font-semibold text-[14px]  ">
                      Performance Metrics
                    </h1>
                    <div className="mt-2 flex flex-col gap-1">
                      {performanceMatrix?.map((data, index) => (
                        <MyDiv
                          key={index}
                          left={data.label}
                          right={data.value}
                          paisa={data.paisa}
                        />
                      ))}
                    </div>
                    <h1 className="text-[#0E212E] font-semibold text-[14px] mt-4">
                      Campaign Cost
                    </h1>
                    <div className="mt-2 flex flex-col gap-1">
                      {campaignCost?.map((data, index) => (
                        <MyDiv
                          paisa={data.paisa}
                          key={index}
                          left={data.label}
                          right={data.value}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full border border-[#D3D3D350] rounded-[18px] p-4 bg-white mt-2">
              <div className="flex justify-between">
                <h1 className="text-[#092A41] text-[16px] font-semibold mt-2 px-1">
                  Campaign Creatives
                </h1>
                <PrimaryButton
                  action={() => navigate(MY_CREATIVES)}
                  title="+ Creatives"
                  rounded="rounded-full"
                  height="h-10"
                  width="w-28"
                  textSize="text-[12px] font-semibold"
                  reverse={true}
                />
              </div>
              <div className="border-b mb-1">
                <TabWithoutIcon
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  tabData={creativeTypeTab}
                />
              </div>
              <div className="h-[50vh] rounded overflow-y-auto no-scrollbar py-2">
                {campaignCreated?.creatives?.map((c: any, i: any) => (
                  <div key={i}>
                    {c?.[currentTab]?.length > 0 && (
                      <div className="py-4">
                        <div className="grid grid-cols-3 gap-1 ">
                          {c?.[currentTab]?.map((cs: any, j: any) => (
                            <div className="col-span-1 " key={j}>
                              <ShowMediaFile
                                url={cs.url}
                                mediaType={cs.type.split("/")[0]}
                              />

                              <Tooltip
                                title={`${
                                  cs.url?.split("_")[
                                    cs.url?.split("_")?.length - 1
                                  ]
                                }`}
                              >
                                <h1 className="text-[12px] text-gray-500 truncate">
                                  {
                                    cs.url?.split("_")[
                                      cs.url?.split("_")?.length - 1
                                    ]
                                  }
                                </h1>
                              </Tooltip>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {loading || loadingScreens ? (
        <div className="col-span-4">
          <Loading />
        </div>
      ) : (
        <div className="col-span-4 w-full h-auto border border-[#D3D3D350] rounded-[18px] p-4 bg-white">
          <div className="flex justify-between">
            <h1 className="text-[16px] font-semibold px-1 py-2">
              Screens Play{" "}
              <span className="text-[14px]">
                ({campaignCreated?.screenIds?.length || 0})
              </span>
            </h1>
            <div className="flex flex-col px-1 justify-center">
              {loadingStatusChange ? (
                <Skeleton active paragraph={{ rows: 1 }} />
              ) : (
                <div className="py-2 flex items-center justify-center h-auto gap-4">
                  <Tooltip title="Pause for all screens">
                    <i
                      className="fi fi-br-pause-circle text-[#000000]"
                      title="Pause All"
                      onClick={() =>
                        handleChangeStatusAll(
                          CAMPAIGN_STATUS_PAUSE,
                          CAMPAIGN_STATUS_CHANGED_TO_PAUSED_PLANNING_PAGE
                        )
                      }
                    ></i>
                  </Tooltip>
                  <Tooltip title="Activate for all screens">
                    <i
                      className="fi fi-br-play-circle text-[#000000]"
                      title="Active All"
                      onClick={() =>
                        handleChangeStatusAll(
                          CAMPAIGN_STATUS_ACTIVE,
                          CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_PLANNING_PAGE
                        )
                      }
                    ></i>
                  </Tooltip>
                  <Tooltip title="Delete for all screens">
                    <i
                      className="fi fi-br-trash text-[#D44949]"
                      title="Delete All"
                      onClick={() =>
                        handleChangeStatusAll(
                          CAMPAIGN_STATUS_DELETED,
                          CAMPAIGN_STATUS_CHANGED_TO_DELETED_PLANNING_PAGE
                        )
                      }
                    ></i>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>

          <div className="mt-0">
            <SearchInputField
              placeholder="Search screens by name"
              height="h-8"
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="h-[70vh] overflow-y-auto no-scrollbar mt-2 flex flex-col gap-2">
            {campaigns?.length === 0 && <NoDataView />}
            {campaigns?.map((camp: any, k: any) => (
              <div
                key={k}
                className="p-0 m-0"
                onClick={() => handelSelectScreen(camp?._id)}
              >
                <ScreenListMonitoringView
                  handleChangeCampaignStatus={handleChangeCampaignStatus}
                  campaignCreated={campaignCreated}
                  setOpenCreativeEndDateChangePopup={
                    setOpenCreativeEndDateChangePopup
                  }
                  screen={screens?.find(
                    (screen: any) => screen?.screenId == camp?.screenId
                  )}
                  campaign={camp}
                  noImages={false}
                  showOption={true}
                  handleGetCampaignLog={handleShowLogReport}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
