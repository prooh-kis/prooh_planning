import { useCallback, useEffect, useState } from "react";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { TabWithIcon } from "../../components/molecules/TabWithIcon";
import { Checkbox, message, Select, Tooltip } from "antd";
import type { CheckboxProps } from "antd";
import { ViewMediaForUploadCreatives } from "../../components/molecules/ViewMediaForUploadCreatives";
import {
  UploadCreativeForStandardCampaign,
  UploadCreativeForTriggerCampaign,
} from "../../components/molecules/UploadCreativeForCreateCampaign";
import { useSelector, useDispatch } from "react-redux";
import {
  getPlanningPageFooterData,
  getScreenDataUploadCreativeData,
} from "../../actions/screenAction";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  CAMPAIGN_CREATIVES,
  FULL_CAMPAIGN_PLAN,
  SELECTED_TRIGGER,
} from "../../constants/localStorageConstants";
import { getVideoDurationFromVideoURL } from "../../utils/fileUtils";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import SearchInputField from "../../components/molecules/SearchInputField";

interface CreativeUploadDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: string;
  successAddCampaignDetails?: boolean;
  pageSuccess?: boolean;
  setPageSuccess?: (value: boolean) => void;
}

interface Creative {
  file: File;
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
  campaignId = "",
  successAddCampaignDetails,
  pageSuccess,
  setPageSuccess,
}: CreativeUploadDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch<any>();
  const [pageLoading, setPageLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [currentPlayTimeCreative, setCurrentPlayTimeCreative] = useState("1");
  const [currentCity, setCurrentCity] = useState("");
  const [currentScreen, setCurrentScreen] = useState("");
  const [currentScreens, setCurrentScreens] = useState<string[]>([]);
  const [selectFileType, setSelectFileType] = useState("video");
  const [creativeType, setCreativeType] = useState("Standard");
  const [creativeUploadData, setCreativeUploadData] = useState<TransformedData>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [playCreativeTime, setPlayCreativeTime] = useState<any[]>([]);
  const [citiesCreative, setCitiesCreative] = useState<any[]>([]);

  const screenDataUploadCreative = useSelector(
    (state: any) => state.screenDataUploadCreative
  );
  const { error: errorScreeData, data: screenData } = screenDataUploadCreative;

  useEffect(() => {
    if (!successAddCampaignDetails) return;
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
    setPageSuccess?.(true);
  }, [dispatch, setPageSuccess, successAddCampaignDetails]);

  useEffect(() => {
    if (!pageSuccess) return;
    dispatch(getScreenDataUploadCreativeData({ id: campaignId }));
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Upload Creative Page",
      })
    );
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
  }, [dispatch, campaignId, pageSuccess]);

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
        file: {},
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

      if (creativeType === "Standard") {
        if (currentPlayTimeCreative === "1") {
          screen.standardDayTimeCreatives =
            screen.standardDayTimeCreatives.filter((file) => file.url !== url);
        } else {
          screen.standardNightTimeCreatives =
            screen.standardNightTimeCreatives.filter(
              (file) => file.url !== url
            );
        }
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

  const getAWSUrl = async (data: Creative) => {
    try {
      const aws = await getAWSUrlToUploadFile(
        data.fileType,
        data.file.name.split(".")[0]
      );
      await saveFileOnAWS(aws.url, data.file);
      return aws.awsURL;
    } catch (error: any) {
      message.error(error.message);
      return "";
    }
  };

  const returnRequiredValue = async (file: Creative) => {
    const url = file.awsURL || (await getAWSUrl(file));
    return {
      url,
      size: file.fileSize,
      type: file.fileType,
    };
  };

  const validate = () => {
    return Object.values(creativeUploadData).every((cityScreens) =>
      cityScreens.every(
        (screen) =>
          screen.standardDayTimeCreatives?.length > 0 ||
          screen.standardNightTimeCreatives?.length > 0 ||
          screen.triggerCreatives?.length > 0
      )
    );
  };

  const isTriggerAvailable = () => {
    const triggers = getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId];
    return (
      triggers?.weatherTriggers?.length > 0 ||
      triggers?.sportsTriggers?.length > 0 ||
      triggers?.vacantSlots?.length > 0
    );
  };

  const handleSaveAndContinue = async () => {
    if (pathname.split("/").includes("view")) {
      setCurrentStep(step + 1);
      return;
    }

    if (!validate()) {
      message.error("Please upload creatives for each row and each city");
      return;
    }

    setIsLoading(true);
    const requestBody = [];

    for (const city in creativeUploadData) {
      for (const data of creativeUploadData[city]) {
        const processCreatives = async (creatives: Creative[]) => {
          const processed = [];
          for (const file of creatives) {
            const myData = await returnRequiredValue(file);
            processed.push(myData);
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

    setTimeout(() => {
      setPageSuccess?.(false);
      setCurrentStep(step + 1);
    }, 1000);
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

  const handleAddNewFile = async (files: File[] | FileList) => {
    if (!currentScreens?.length) {
      message.error("No Screens selected!, Please select screens first");
      return;
    }
    const fileArray = Array.from(files || []);
    if (fileArray.length === 0) return;

    const processFile = async (file: File) => {
      const fileURL = URL.createObjectURL(file);
      const creativeDuration = file.type.startsWith("video")
        ? Number(await getVideoDurationFromVideoURL(fileURL))
        : 10;

      return {
        file,
        url: fileURL,
        fileType: file.type,
        fileSize: file.size,
        creativeDuration,
        awsURL: "",
      };
    };

    const processedFiles = await Promise.all(fileArray.map(processFile));

    currentScreens.forEach((screenId) => {
      handleSaveFiles(processedFiles, screenId);
    });
    setCurrentScreens([]);
  };

  const handleSetValue = () => {
    setPlayCreativeTime([
      { icon: "", label: "Regular", id: "Standard" },
      ...(isTriggerAvailable()
        ? [{ icon: "", label: "Trigger", id: "Trigger" }]
        : []),
    ]);
  };

  const getFileListToView = () => {
    const screen = creativeUploadData[currentCity]?.find((screen) =>
      screen.screenIds.includes(currentScreen)
    );

    if (!screen) return [];

    return creativeType === "Standard"
      ? currentPlayTimeCreative === "1"
        ? screen.standardDayTimeCreatives
        : screen.standardNightTimeCreatives
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
    if (!screenData) return;

    handleSetValue();
    const storedCampaignData =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId];
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
  }, [campaignId, errorScreeData, handleSetInitialData, screenData]);

  if (pageLoading) return <LoadingScreen />;

  return (
    <div className="w-full">
      <div className="mx-auto">
        <h1 className="text-2xl font-semibold">Upload Creative</h1>
        <h2 className="text-sm text-gray-500">
          Upload your creatives for the campaigns for your selected screens
        </h2>

        {currentCity && (
          <div>
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
                        onClick={() =>
                          setCurrentScreen(singleData.screenIds[0])
                        }
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
                  <h1 className="mt-2">Select Creative Type</h1>
                  <div className="flex justify-between items-center mt-2">
                    <Select
                      options={[
                        { label: "Day", value: "1" },
                        { label: "Night", value: "2" },
                      ]}
                      style={{ width: "150px" }}
                      value={currentPlayTimeCreative}
                      onChange={setCurrentPlayTimeCreative}
                    />
                    <Select
                      options={[
                        { label: "Video", value: "video" },
                        { label: "Image", value: "image" },
                      ]}
                      style={{ width: "150px" }}
                      value={selectFileType}
                      onChange={setSelectFileType}
                    />
                  </div>
                  {creativeType === "Standard" ? (
                    <UploadCreativeForStandardCampaign
                      selectFileType={selectFileType}
                      handleAddNewFile={handleAddNewFile}
                    />
                  ) : (
                    <UploadCreativeForTriggerCampaign
                      selectFileType={selectFileType}
                      handleAddNewFile={handleAddNewFile}
                      triggerData={
                        getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                          ?.weatherTriggers ||
                        getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                          ?.sportsTriggers ||
                        getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                          ?.vacantSlots ||
                        {}
                      }
                      triggerType={
                        getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                          ?.weatherTriggers?.[0]?.type
                          ? "Weather Trigger"
                          : getDataFromLocalStorage(SELECTED_TRIGGER)?.[
                              campaignId
                            ]?.sportsTriggers?.[0]?.sport
                          ? "Sports Trigger"
                          : "Fill Vacancy Trigger"
                      }
                    />
                  )}
                </div>
                <div className="w-[60%] p-4">
                  <h1 className="font-semibold">
                    {creativeType === "Standard"
                      ? currentPlayTimeCreative === "1"
                        ? "Day Time Creative"
                        : "Night Time Creative"
                      : "Trigger Creative"}
                  </h1>
                  <ViewMediaForUploadCreatives
                    files={getFileListToView()}
                    removeFile={removeFile}
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
            loading={isLoading}
            isDisabled={isLoading}
            totalScreensData={
              getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
            }
            pageName="Upload Creative Page"
            successAddCampaignDetails={successAddCampaignDetails}
          />
        </div>
      </div>
    </div>
  );
};
