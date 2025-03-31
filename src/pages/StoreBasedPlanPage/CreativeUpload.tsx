import { useCallback, useEffect, useState } from "react";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { TabWithIcon } from "../../components/molecules/TabWithIcon";
import { Checkbox, message, Select, Tooltip } from "antd";
import type { CheckboxProps } from "antd";
import { ViewMediaForUploadCreatives } from "../../components/molecules/ViewMediaForUploadCreatives";
import { useSelector, useDispatch } from "react-redux";
import {
  getPlanningPageFooterData,
  getScreenDataUploadCreativeData,
} from "../../actions/screenAction";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import {
  CAMPAIGN_CREATIVES,
  SELECTED_TRIGGER,
} from "../../constants/localStorageConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import SearchInputField from "../../components/molecules/SearchInputField";
import { UploadCreativesFromBucketPopup } from "../../components/popup/UploadCreativesFromBucketPopup";
import { getCreativesMediaAction } from "../../actions/creativeAction";
import { NoDataView } from "../../components/index";
import { ConformationModelForCreative } from "../../components/popup/ConformationModelForCreative";
import { TriggerBasedIndication } from "../../components/molecules/TriggerBasedIndication";

interface CreativeUploadDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  campaignDetails?: any;
}

interface Creative {
  url: string;
  fileType: string;
  fileSize: number;
  creativeDuration: number;
  awsURL: string;
}

interface Screen {
  screenResolution: string;
  screenRatio: string;
  count: number;
  screenName: string;
  screenIds: string[];
  creativeDuration: number;
  standardDayTimeCreatives: Creative[];
  standardNightTimeCreatives: Creative[];
  triggerCreatives: Creative[];
}

type TransformedData = Record<string, Screen[]>;

export const CreativeUpload = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails,
}: CreativeUploadDetailsProps) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [currentPlayTimeCreative, setCurrentPlayTimeCreative] = useState("1");
  const [currentCity, setCurrentCity] = useState("");
  const [currentScreen, setCurrentScreen] = useState("");
  const [currentScreens, setCurrentScreens] = useState<string[]>([]);
  const [creativeType, setCreativeType] = useState("Standard");
  const [creativeUploadData, setCreativeUploadData] = useState<TransformedData>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [playCreativeTime, setPlayCreativeTime] = useState<any[]>([]);
  const [viewPlayCreativeTime, setViewPlayCreativeTime] = useState<any[]>([]);
  const [viewCreativeType, setViewCreativeType] = useState("0");

  const [citiesCreative, setCitiesCreative] = useState<any[]>([]);
  const [isBucketPopupOpen, setIsBucketPopupOpen] = useState<boolean>(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(
    pathname.split("/").includes("view") ? false : true
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const screenDataUploadCreative = useSelector(
    (state: any) => state.screenDataUploadCreative
  );
  const {
    error: errorScreeData,
    loading: loadingScreenData,
    data: screenData,
  } = screenDataUploadCreative;

  useEffect(() => {
    if (!campaignDetails) return;
    dispatch(getScreenDataUploadCreativeData({ id: campaignId }));
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Upload Creative Page",
      })
    );
    dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
  }, [dispatch, campaignId, campaignDetails]);

  const mergeCreativeWithScreenData = (
    creatives: TransformedData,
    screenData: TransformedData
  ) => {
    const combinedData: TransformedData = {};

    for (const city in screenData) {
      combinedData[city] = screenData[city].map((screen) => {
        const creativeData = creatives[city]?.find((creative) =>
          creative.screenIds.every((id) => screen.screenIds.includes(id))
        );

        return creativeData
          ? {
              ...screen,
              standardDayTimeCreatives: creativeData.standardDayTimeCreatives,
              standardNightTimeCreatives:
                creativeData.standardNightTimeCreatives,
              triggerCreatives: creativeData.triggerCreatives,
            }
          : screen;
      });
    }

    return combinedData;
  };

  const transformData = (data: any[]): TransformedData => {
    const result: TransformedData = {};

    if (data?.[0]?.city === "") {
      message.error(
        "You can't update creative for this campaign, direct jump the next flow"
      );
      return {};
    }

    data?.forEach((item) => {
      const { city, creativeDuration, screenRatio } = item;

      if (!result[city]) {
        result[city] = [];
      }

      const transformCreative = (creative: any) => ({
        url: creative?.url,
        fileType: creative?.type,
        fileSize: creative?.size,
        creativeDuration,
        awsURL: creative?.url,
      });

      result[city].push({
        ...item,
        screenResolution: screenRatio,
        screenRatio,
        creativeDuration,
        standardDayTimeCreatives:
          item.standardDayTimeCreatives?.map(transformCreative) || [],
        standardNightTimeCreatives:
          item.standardNightTimeCreatives?.map(transformCreative) || [],
        triggerCreatives: item.triggerCreatives?.map(transformCreative) || [],
      });
    });

    return result;
  };

  const newTransformData = (input: TransformedData): TransformedData => {
    const transformed: TransformedData = {};

    for (const city in input) {
      transformed[city] = input[city].map((screen) => ({
        ...screen,
        creativeDuration: 10,
        standardDayTimeCreatives: [],
        standardNightTimeCreatives: [],
        triggerCreatives: [],
      }));
    }

    return transformed;
  };

  const removeFile = (url: string) => {
    setCreativeUploadData((prevData) => {
      const newData = { ...prevData };
      const screenIndex = newData[currentCity]?.findIndex((screen) =>
        screen.screenIds.includes(currentScreen)
      );

      if (screenIndex === -1) {
        message.error("Screen not found!");
        return prevData;
      }

      const screen = { ...newData[currentCity][screenIndex] };

      if (viewCreativeType === "1") {
        screen.standardDayTimeCreatives =
          screen.standardDayTimeCreatives.filter((file) => file.url !== url);
      } else if (viewCreativeType === "2") {
        screen.standardNightTimeCreatives =
          screen.standardNightTimeCreatives.filter((file) => file.url !== url);
      } else {
        screen.triggerCreatives = screen.triggerCreatives.filter(
          (file) => file.url !== url
        );
      }
      newData[currentCity][screenIndex] = screen;
      return newData;
    });
  };

  const isCreativeUploaded = (screenId: string) => {
    const screen = creativeUploadData[currentCity]?.find((screen) =>
      screen.screenIds.includes(screenId)
    );
    if (!screen) return false;

    return (
      screen?.standardDayTimeCreatives?.length > 0 ||
      screen?.standardNightTimeCreatives?.length > 0 ||
      screen?.triggerCreatives?.length > 0
    );
  };

  const handleSelectCurrentTab = (id: string) => {
    setCurrentTab(id);
    const city = citiesCreative.find((data) => data.id === id)?.label || "";
    setCurrentCity(city);
  };

  const getScreenCountCityWise = (data: TransformedData, city: string) => {
    return (
      data[city]?.reduce((accum, current) => accum + current.count, 0) || 0
    );
  };

  const getCreativeCountCityWise = (data: TransformedData, city: string) => {
    return (
      data[city]?.reduce((accum, current) => {
        const hasCreatives =
          current.standardDayTimeCreatives?.length > 0 ||
          current.standardNightTimeCreatives?.length > 0 ||
          current.triggerCreatives?.length > 0;
        return hasCreatives ? accum + (current.count || 0) : accum;
      }, 0) || 0
    );
  };

  const handleSetInitialData = useCallback((data: TransformedData) => {
    const result = Object.keys(data || {}).map((city, index) => ({
      id: `${index + 1}`,
      label: city,
      params: [
        getCreativeCountCityWise(data, city),
        getScreenCountCityWise(data, city) -
          getCreativeCountCityWise(data, city),
      ],
    }));

    setCitiesCreative(result);
    setCurrentCity(result[0]?.label || "");
  }, []);

  const isTriggerAvailable = () => {
    const triggers = campaignDetails.triggers;
    return (
      triggers?.weatherTriggers?.length > 0 ||
      triggers?.sportsTriggers?.length > 0 ||
      triggers?.vacantSlots?.length > 0
    );
  };

  const validate = () => {
    const triggerAvailable = isTriggerAvailable();

    return Object.values(creativeUploadData).every((cityScreens) =>
      cityScreens.every((screen) =>
        triggerAvailable
          ? screen.triggerCreatives?.length > 0 // Ensure trigger creatives exist if triggers are available
          : screen.standardDayTimeCreatives?.length > 0 ||
            screen.standardNightTimeCreatives?.length > 0 ||
            screen.triggerCreatives?.length > 0
      )
    );
  };

  const handleSaveAndContinue = async () => {
    if (pathname.split("/").includes("view")) {
      setCurrentStep(step + 1);
      return;
    }

    if (!validate()) {
      const errorMessage = `Please upload creatives for all screens ${
        isTriggerAvailable() && " and for triggers also"
      }`;
      message.error(errorMessage);
      return;
    }

    const requestBody = [];

    for (const city in creativeUploadData) {
      for (const data of creativeUploadData[city]) {
        const processCreatives = async (creatives: Creative[]) => {
          const processed = [];
          for (const file of creatives) {
            processed.push({
              url: file.awsURL,
              size: file.fileSize,
              type: file.fileType,
            });
          }
          return processed;
        };

        const [
          standardDayTimeCreatives,
          standardNightTimeCreatives,
          triggerCreatives,
        ] = await Promise.all([
          processCreatives(data.standardDayTimeCreatives || []),
          processCreatives(data.standardNightTimeCreatives || []),
          processCreatives(data.triggerCreatives || []),
        ]);

        const creativeDuration = Math.max(
          10,
          ...data.standardDayTimeCreatives.map((c) => c.creativeDuration),
          ...data.standardNightTimeCreatives.map((c) => c.creativeDuration),
          ...data.triggerCreatives.map((c) => c.creativeDuration)
        );

        requestBody.push({
          city,
          screenResolution: data.screenRatio,
          count: data.count,
          screenIds: data.screenIds,
          creativeDuration,
          standardDayTimeCreatives,
          standardNightTimeCreatives,
          triggerCreatives,
        });
      }
    }

    saveDataOnLocalStorage(CAMPAIGN_CREATIVES, {
      [campaignId]: creativeUploadData,
    });

    dispatch(
      addDetailsToCreateCampaign({
        pageName: "Upload Creative Page",
        id: campaignId,
        creatives: requestBody,
      })
    );
  };

  const handleSaveFiles = (files: Creative[], screenId: string) => {
    if (files.length === 0) {
      message.error("Please select files to save!");
      return;
    }

    setCreativeUploadData((prevData) => {
      const newData = { ...prevData };
      const screenIndex = newData[currentCity]?.findIndex((screen) =>
        screen.screenIds.includes(screenId)
      );

      if (screenIndex === -1) {
        message.error("Screen not found!");
        return prevData;
      }

      const screen = { ...newData[currentCity][screenIndex] };

      if (creativeType === "Standard") {
        if (currentPlayTimeCreative === "1") {
          screen.standardDayTimeCreatives = [
            ...(screen.standardDayTimeCreatives || []),
            ...files,
          ];
        } else {
          screen.standardNightTimeCreatives = [
            ...(screen.standardNightTimeCreatives || []),
            ...files,
          ];
        }
      } else {
        screen.triggerCreatives = [
          ...(screen.triggerCreatives || []),
          ...files,
        ];
      }

      newData[currentCity][screenIndex] = screen;
      saveDataOnLocalStorage(CAMPAIGN_CREATIVES, { [campaignId]: newData });
      return newData;
    });
  };

  const handleAddNewFile = async () => {
    if (!mediaFiles?.length) {
      message.error("No creative selected!, Please select creative first");
      return;
    }

    const processFile = mediaFiles.map((file: any) => {
      return {
        url: file.awsURL,
        fileType: file.creativeType,
        fileSize: file.fileSize,
        creativeDuration: file.duration,
        awsURL: file.awsURL,
      };
    });

    currentScreens.forEach((screenId) => {
      handleSaveFiles(processFile, screenId);
    });
    setCurrentScreens([]);
    setMediaFiles([]);
    setIsBucketPopupOpen(false);
  };

  const handleSetValue = () => {
    const isTriggerBasedCampaign = pathname
      .split("/")
      .includes("triggerbasedplan");

    const triggerAvailable = isTriggerAvailable();

    if (isTriggerBasedCampaign) {
      setCreativeType("Trigger");
      setViewCreativeType("3");
    }

    setPlayCreativeTime(
      isTriggerBasedCampaign
        ? [{ label: "Trigger", id: "Trigger" }]
        : [
            { icon: "", label: "Regular", id: "Standard" },
            ...(triggerAvailable
              ? [{ icon: "", label: "Trigger", id: "Trigger" }]
              : []),
          ]
    );

    setViewPlayCreativeTime(
      isTriggerBasedCampaign
        ? [{ label: "Trigger", id: "3" }]
        : [
            { icon: "", label: "All", id: "0" },
            { icon: "", label: "Day", id: "1" },
            { icon: "", label: "Night", id: "2" },
            ...(triggerAvailable
              ? [{ icon: "", label: "Trigger", id: "3" }]
              : []),
          ]
    );
  };

  const getFileListToView = () => {
    const screen = creativeUploadData[currentCity]?.find((screen) =>
      screen.screenIds.includes(currentScreen)
    );

    if (!screen) return [];

    return viewCreativeType === "0"
      ? [
          ...screen.standardDayTimeCreatives,
          ...screen.standardNightTimeCreatives,
          ...screen.triggerCreatives,
        ]
      : viewCreativeType === "1"
      ? screen.standardDayTimeCreatives
      : viewCreativeType === "2"
      ? screen.standardNightTimeCreatives
      : screen.triggerCreatives;
  };

  const filteredScreens =
    creativeUploadData[currentCity]?.filter((singleData) =>
      [
        singleData.screenName,
        singleData.screenRatio,
        singleData.screenResolution,
      ].some((prop) => prop?.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  const handleSelectAllFilteredScreens: CheckboxProps["onChange"] = (e) => {
    setCurrentScreens(
      e.target.checked
        ? filteredScreens.map((screen) => screen.screenIds[0])
        : []
    );
  };

  const handleSelectScreen = (e: any, screenId: string) => {
    setCurrentScreens((prev) =>
      e.target.checked
        ? [...prev, screenId]
        : prev.filter((id) => id !== screenId)
    );
  };

  useEffect(() => {
    if (errorScreeData) {
      message.error(errorScreeData);
    }
    if (errorAddDetails) {
      message.error("error in adding campaign details...");
    }
    if (!screenData) return;

    handleSetValue();
    const storedCampaignData = campaignDetails;
    const storedCreatives = storedCampaignData?.creatives;
    const storedTriggers = storedCampaignData?.triggers;

    saveDataOnLocalStorage(SELECTED_TRIGGER, { [campaignId]: storedTriggers });

    const transformedCreatives = transformData(storedCreatives || []);
    const transformedScreenData = newTransformData(screenData || {});
    const combinedData = mergeCreativeWithScreenData(
      transformedCreatives,
      transformedScreenData
    );

    handleSetInitialData(combinedData);
    setCreativeUploadData(combinedData);
    setPageLoading(false);
  }, [
    campaignId,
    errorScreeData,
    errorAddDetails,
    handleSetInitialData,
    screenData,
  ]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      setCurrentStep(step + 1);
    }
  }, [successAddDetails, step, setCurrentStep, dispatch]);

  if (pageLoading) return <LoadingScreen />;

  const closePopup = () => {
    setIsBucketPopupOpen(false);
    setCurrentScreens([]);
  };

  const toggle = () => {
    setOpen((pre) => !pre);
  };

  const getLabel = () => {
    return (
      <div>
        {creativeType === "Standard" ? (
          currentPlayTimeCreative === "1" ? (
            <h1 className="py-2">
              Upload creative for <span className="font-semibold">Day</span>{" "}
            </h1>
          ) : currentPlayTimeCreative === "2" ? (
            <h1 className="py-2">
              Upload creative for <span className="font-semibold">Night</span>{" "}
            </h1>
          ) : null
        ) : creativeType === "Trigger" ? (
          <TriggerBasedIndication
            triggerData={
              campaignDetails?.triggers?.weatherTriggers?.length > 0
                ? campaignDetails?.triggers?.weatherTriggers[0]
                : campaignDetails?.triggers?.sportsTriggers?.length > 0
                ? campaignDetails?.triggers?.sportsTriggers[0]
                : campaignDetails?.triggers?.vacantSlots?.length > 0
                ? campaignDetails?.triggers?.vacantSlots[0]
                : {}
            }
            triggerType={
              campaignDetails?.triggers?.weatherTriggers?.length > 0
                ? "Weather Trigger"
                : campaignDetails?.triggers?.sportsTriggers?.length > 0
                ? "Sports Trigger"
                : "Fill Vacancy Trigger"
            }
          />
        ) : null}
      </div>
    );
  };

  // setTimeout(() => {
  //   setOpen(false);
  // }, 2000);

  return (
    <div className="w-full">
      {open && <ConformationModelForCreative open={open} onClose={toggle} />}
      {isBucketPopupOpen && (
        <UploadCreativesFromBucketPopup
          onClose={closePopup}
          selectedScreens={screenData?.[currentCity].filter((screen: any) =>
            currentScreens.includes(screen?.screenIds[0])
          )}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          brandName={campaignDetails?.brandName}
          handleSaveCreative={handleAddNewFile}
        />
      )}
      <div className="mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Upload Creative</h1>
          <div
            onClick={() => navigate("/my-creatives")}
            className="border-2 border-[#129BFF] text-[#000000] rounded-md  text-[#129BFF] w-auto text-[14px] py-1 px-4 flex items-center gap-2 cursor-pointer"
          >
            <i className="fi fi-sr-folder-open text-[16px]"></i>
            Creative Bucket
          </div>
        </div>
        <h2 className="text-sm text-gray-500">
          Upload your creatives for the campaigns for your selected screens
        </h2>

        {currentCity && (
          <div className="pb-16">
            <div className="flex gap-4">
              <TabWithoutIcon
                tabData={citiesCreative}
                currentTab={currentTab}
                setCurrentTab={handleSelectCurrentTab}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="border rounded-lg p-4 w-[40%]">
                <div className="w-full flex justify-between items-center">
                  <h1 className="w-full">Screen List </h1>
                  <SearchInputField
                    value={searchQuery}
                    onChange={(value: string) => {
                      setSearchQuery(value);
                    }}
                    placeholder="Search screen"
                  />
                </div>
                <div className="flex w-full bg-[#F8F8F8] mt-4 py-2 rounded-md">
                  {[
                    "Sr.No.",
                    "Screens",
                    "Duration",
                    "Ratio",
                    "Resolution",
                    "Status",
                  ].map((d, i) => (
                    <div className="flex gap-1 w-24 justify-center" key={i}>
                      {i === 0 && (
                        <Checkbox
                          checked={
                            currentScreens.length === filteredScreens.length
                          }
                          onChange={handleSelectAllFilteredScreens}
                        />
                      )}
                      <h1 className="text-center text-[#858585] font-[500]">
                        {d}
                      </h1>
                    </div>
                  ))}
                </div>
                <div className="h-[45vh] overflow-scroll scrollbar-minimal">
                  {filteredScreens.map((singleData, index) => {
                    const isUploaded = isCreativeUploaded(
                      singleData.screenIds[0]
                    );
                    const status = isUploaded ? "Completed" : "Pending";
                    const statusColor = isUploaded
                      ? "text-[#31AC56]"
                      : "text-[#F69336]";

                    return (
                      <div
                        key={index}
                        title={
                          isUploaded
                            ? "Click to select row"
                            : "This row has no creative"
                        }
                        className={`hover:bg-[#129BFF80] truncate border-b cursor-pointer ${
                          currentScreens.includes(singleData.screenIds[0])
                            ? "bg-[#e5e7eb]"
                            : currentScreen === singleData.screenIds[0]
                            ? "bg-[#129BFF80]"
                            : ""
                        }`}
                        onClick={() => {
                          setCurrentScreen(singleData.screenIds[0]);
                        }}
                      >
                        <div className="flex text-[13px]">
                          {[
                            index + 1,
                            singleData.screenName,
                            `${singleData.creativeDuration} Sec.`,
                            singleData.screenRatio,
                            singleData.screenResolution,
                            status,
                          ].map((item, i) => (
                            <Tooltip title={item} key={i}>
                              <div className="flex gap-1 w-24 justify-center">
                                {i === 0 && (
                                  <Checkbox
                                    checked={currentScreens.includes(
                                      singleData.screenIds[0]
                                    )}
                                    onChange={(e) =>
                                      handleSelectScreen(
                                        e,
                                        singleData.screenIds[0]
                                      )
                                    }
                                  />
                                )}
                                <h1
                                  className={`p-2 text-center truncate ${
                                    i === 5
                                      ? `${statusColor} text-[12px] font-medium`
                                      : ""
                                  }`}
                                >
                                  {item}
                                </h1>
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="border rounded-lg w-[60%] flex">
                <div className="w-[50%] border-r p-4">
                  <h1>
                    Selected Screen Count{" "}
                    <span className="text-[#F69336] text-[13px]">
                      ({currentScreens.length})
                    </span>
                  </h1>
                  <div className="mt-2">
                    <TabWithIcon
                      tabData={playCreativeTime}
                      currentTab={creativeType}
                      setCurrentTab={setCreativeType}
                      justify={true}
                    />
                  </div>
                  {creativeType === "Standard" && (
                    <div>
                      <h1 className="mt-2">Select Creative Type</h1>
                      <div className="flex justify-between items-center mt-2">
                        <Select
                          options={[
                            { label: "Day", value: "1" },
                            { label: "Night", value: "2" },
                          ]}
                          style={{ width: "100%" }}
                          value={currentPlayTimeCreative}
                          onChange={setCurrentPlayTimeCreative}
                        />
                      </div>
                    </div>
                  )}
                  {getLabel()}

                  {currentScreens?.length > 0 && (
                    <button
                      onClick={() =>
                        setIsBucketPopupOpen((pre: boolean) => !pre)
                      }
                      className={
                        "border border-dashed border-2 border-[#129BFF] text-[#129BFF] rounded-2xl  bg-[#F4F9FF] py-1 w-full"
                      }
                    >
                      + Upload
                    </button>
                  )}
                </div>
                <div className="w-[60%] p-4">
                  <TabWithIcon
                    tabData={viewPlayCreativeTime}
                    currentTab={viewCreativeType}
                    setCurrentTab={setViewCreativeType}
                    justify={true}
                  />
                  {getFileListToView()?.length === 0 && (
                    <NoDataView
                      title={
                        currentScreen
                          ? "No Data"
                          : "Please select screen to view creatives"
                      }
                    />
                  )}

                  <ViewMediaForUploadCreatives
                    files={getFileListToView()}
                    removeFile={removeFile}
                    viewCreativeType={viewCreativeType}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
          <Footer
            mainTitle={validate() ? "Continue" : "Upload and Continue"}
            handleBack={() => setCurrentStep(step - 1)}
            campaignId={campaignId}
            handleSave={handleSaveAndContinue}
            loadingCost={loadingAddDetails || loadingScreenData}
            isDisabled={loadingAddDetails || loadingScreenData}
            pageName="Upload Creative Page"
            successCampaignDetails={successAddDetails}
          />
        </div>
      </div>
    </div>
  );
};
