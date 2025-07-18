import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, message, Tooltip } from "antd";
import type { CheckboxProps } from "antd";
import { LoadingScreen } from "../molecules/LoadingScreen";
import { Footer } from "../footer";
import SearchInputField from "../molecules/SearchInputField";
import FilterUI from "../../components/molecules/FilterUI";
import { MultipleFileUpload } from "../../components/FileUploadButton";
import ShowUploadedCreativePopup, {
  ShowSelectedCreativePopup,
} from "../../components/popup/ShowUploadedCreativePopup";
import {
  getAllFiltersDetailsForUploadCreativePage,
  getCreativesFromCreativeBucketForUploadPage,
  getPlanningPageFooterData,
  getScreenDataForUploadCreativePageV3,
} from "../../actions/screenAction";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { getAWSUrl } from "../../utils/awsUtils";
import { getVideoDurationFromVideoURL } from "../../utils/fileUtils";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";
import { UploadCreativesFromBucketPopupV2 } from "../popup/UploadCreativesFromBucketPopupV2";
import { NoDataView } from "../../components/molecules/NoDataView";

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
  city: string;
  screenName: string;
  screenId: string;
  creativeDuration: number;
  standardDayTimeCreatives: Creative[];
  standardNightTimeCreatives: Creative[];
  triggerCreatives: Creative[];
  [key: string]: any; // Add index signature
}

type SelectedFilters = {
  cities: string[];
  touchPoints: string[];
  screenTypes: string[];
  screenRatio: string[];
  gridType: string[];
};

type FilterOptionItem = {
  lable: string; // Note: Using "lable" to match your API response
  total: number;
  uploaded: number;
};

type FilterOptions = {
  cities: FilterOptionItem[];
  touchPoints: FilterOptionItem[];
  screenTypes: FilterOptionItem[];
  screenRatio: FilterOptionItem[];
  gridType: FilterOptionItem[];
};

export const CreativeUploadV4 = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails,
}: CreativeUploadDetailsProps) => {
  // Hooks and state initialization
  const { pathname } = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [allFilter, setAllFilter] = useState<any>({});
  const [currentTab, setCurrentTab] = useState("1");
  const [currentScreen, setCurrentScreen] = useState<Screen>();
  const [files, setFiles] = useState<File[]>([]);
  const [currentScreens, setCurrentScreens] = useState<string[]>([]);
  const [creativeUploadData, setCreativeUploadData] = useState<Screen[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    cities: ["All"],
    touchPoints: ["All"],
    screenTypes: ["All"],
    screenRatio: ["All"],
    gridType: ["All"],
  });
  const [isBucketPopupOpen, setIsBucketPopupOpen] = useState<boolean>(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const [tabData, setTabData] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openSelected, setOpenSelected] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("standardDayTimeCreatives");

  // Redux selectors
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allFiltersDetailsForUploadCreativePage = useSelector(
    (state: any) => state.allFiltersDetailsForUploadCreativePage
  );
  const {
    loading: loadingFilterOption,
    error: errorFilterOption,
    success: successFilterOption,
    data: filterOption,
  } = allFiltersDetailsForUploadCreativePage;

  useEffect(() => {
    if (successFilterOption) {
      setAllFilter(filterOption);
    } else if (errorFilterOption) {
      message.error(errorFilterOption);
    }
  }, [filterOption]);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const creativesFromCreativeBucketForUploadPage = useSelector(
    (state: any) => state.creativesFromCreativeBucketForUploadPage
  );
  const {
    error: errorCreatives,
    loading: loadingCreatives,
    data: creatives,
  } = creativesFromCreativeBucketForUploadPage;

  const screenDataUploadCreative = useSelector(
    (state: any) => state.screenDataUploadCreative
  );
  const {
    error: errorScreeData,
    loading: loadingScreenData,
    data: screenData,
  } = screenDataUploadCreative;

  const creativeCountScreenWise = (screenId: string) => {
    const screen = creativeUploadData?.find(
      (screen: Screen) => screen.screenId === screenId
    );
    if (!screen) return 0;
    return (
      screen?.standardDayTimeCreatives?.length +
      screen?.standardNightTimeCreatives?.length +
      screen?.triggerCreatives?.length
    );
  };

  // First, let's create a sorting function
  const sortScreens = (screens: any[]) => {
    return [...screens].sort((a, b) => {
      const aCount = creativeCountScreenWise(a.screenId);
      const bCount = creativeCountScreenWise(b.screenId);

      // If both have 0 creatives or both have >0 creatives, sort by name
      if ((aCount === 0 && bCount === 0) || (aCount > 0 && bCount > 0)) {
        return a.screenName.localeCompare(b.screenName);
      }
      // Put screens with 0 creatives first
      return aCount === 0 ? -1 : 1;
    });
  };

  // Derived values
  const filteredScreens =
    screenData?.filter((singleData: any) =>
      [
        singleData.screenName,
        singleData.screenRatio,
        singleData.screenResolution,
      ].some((prop) => prop?.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  const isTriggerBasedCampaign = pathname
    .split("/")
    .includes("triggerbasedplan");

  // Helper functions
  const transformData = (data: any[]): any[] => {
    return data?.map((item) => {
      const transformCreative = (creative: any) => ({
        url: creative?.url,
        fileType: creative?.type,
        fileSize: creative?.size,
        creativeDuration: item.creativeDuration || 10,
        awsURL: creative?.url,
      });

      return {
        ...item,
        screenId: item.screenIds?.[0] || "",
        screenResolution: item.screenRatio,
        screenRatio: item.screenRatio,
        creativeDuration: item.creativeDuration || 10,
        standardDayTimeCreatives:
          item.standardDayTimeCreatives?.map(transformCreative) || [],
        standardNightTimeCreatives:
          item.standardNightTimeCreatives?.map(transformCreative) || [],
        triggerCreatives: item.triggerCreatives?.map(transformCreative) || [],
      };
    });
  };

  const newTransformData = (input: Screen[]): any[] => {
    return input.map((screen) => ({
      ...screen,
      creativeDuration: 10,
      standardDayTimeCreatives: [],
      standardNightTimeCreatives: [],
      triggerCreatives: [],
    }));
  };

  const isTriggerAvailable = useCallback(() => {
    const triggers = campaignDetails?.triggers || [];
    return (
      triggers?.weatherTriggers?.length > 0 ||
      triggers?.sportsTriggers?.length > 0 ||
      triggers?.vacantSlots?.length > 0
    );
  }, [campaignDetails?.triggers]);

  const handleSetValue = useCallback(() => {
    const triggerAvailable = isTriggerAvailable();

    setTabData(
      isTriggerBasedCampaign
        ? [{ label: "Trigger", id: "triggerCreatives" }]
        : [
            { icon: "", label: "Day", id: "standardDayTimeCreatives" },
            { icon: "", label: "Night", id: "standardNightTimeCreatives" },
            ...(triggerAvailable
              ? [{ icon: "", label: "Trigger", id: "triggerCreatives" }]
              : []),
          ]
    );
  }, [isTriggerBasedCampaign, isTriggerAvailable]);

  const mergeCreativeWithScreenData = (creatives: any[], screenData: any[]) => {
    return screenData.map((screen: any) => {
      const creativeData = creatives?.find(
        (creative: any) => creative.screenId === screen.screenId
      );

      return {
        ...screen,
        standardDayTimeCreatives: creativeData?.standardDayTimeCreatives || [],
        standardNightTimeCreatives:
          creativeData?.standardNightTimeCreatives || [],
        triggerCreatives: creativeData?.triggerCreatives || [],
      };
    });
  };

  const isCreativeUploaded = useCallback(
    (screenId: string) => {
      const screen = creativeUploadData?.find(
        (screen) => screen.screenId === screenId
      );
      return (
        screen &&
        (screen?.standardDayTimeCreatives?.length > 0 ||
          screen?.standardNightTimeCreatives?.length > 0 ||
          screen?.triggerCreatives?.length > 0)
      );
    },
    [creativeUploadData]
  );

  const isCreativeUploaded2 = (screen: any) => {
    return (
      screen?.standardDayTimeCreatives?.length > 0 ||
      screen?.standardNightTimeCreatives?.length > 0 ||
      screen?.triggerCreatives?.length > 0
    );
  };

  const validate = () => {
    const triggerAvailable = isTriggerAvailable();
    const validationStatus = creativeUploadData.every((screen) => {
      const hasContent = triggerAvailable
        ? screen.triggerCreatives?.length > 0
        : screen.standardDayTimeCreatives?.length > 0 ||
          screen.standardNightTimeCreatives?.length > 0 ||
          screen.triggerCreatives?.length > 0;
      return hasContent;
    });
    return validationStatus;
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

    const requestBody = await Promise.all(
      creativeUploadData.map(async (data) => {
        const processCreatives = async (creatives: Creative[]) => {
          return creatives.map((file) => ({
            url: file.awsURL,
            size: file.fileSize,
            type: file.fileType,
          }));
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

        return {
          city: data?.city || "",
          screenResolution: data.ratio,
          count: 1,
          screenIds: [data.screenId],
          creativeDuration,
          standardDayTimeCreatives,
          standardNightTimeCreatives,
          triggerCreatives,
        };
      })
    );
    setCreativeUploadData(creativeUploadData);
    // saveDataOnLocalStorage(CAMPAIGN_CREATIVES, creativeUploadData);
    dispatch(
      addDetailsToCreateCampaign({
        event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
        pageName: "Upload Creative Page",
        id: campaignId,
        creatives: requestBody,
      })
    );
  };

  const handleSelectAllFilteredScreens: CheckboxProps["onChange"] = (e) => {
    setCurrentScreens(
      e.target.checked
        ? filteredScreens.map((screen: any) => screen.screenId)
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

  const handleSelectScreenByClick = (screenId: string) => {
    const checked = currentScreens?.includes(screenId);
    setCurrentScreens((prev) =>
      !checked ? [...prev, screenId] : prev.filter((id) => id !== screenId)
    );
  };

  const handleViewCreative = (id: string) => {
    const screen = creativeUploadData.find(
      (screen: Screen) => screen.screenId === id
    ) as Screen; // Type assertion
    if (!isCreativeUploaded2(screen)) {
      message.error("No Creative uploaded yet");
      return;
    }
    setTabData((pre: any) => {
      let sss = [...pre];
      for (let d of sss) {
        d.label = `${d.label?.split("(")[0]} (${screen[d.id]?.length}) `;
      }
      return sss;
    });
    setCurrentScreen(screen);
    setOpen(true);
  };

  const getScreenCountWhereCreativeUploaded = () => {
    return creativeUploadData.reduce(
      (count: number, screen: any) =>
        isCreativeUploaded2(screen) ? count + 1 : count,
      0
    );
  };

  const handleSelectFiles = async (label: string, files: File[] | FileList) => {
    if (currentScreens?.length === 0) {
      message.error("No Screen selected, Please select screens first.");
      return;
    }
    const fileArray = Array.from(files || []);
    setLabel(label);
    setFiles(fileArray);
    setOpenSelected(true);
  };

  const handleAddNewFiles = async () => {
    try {
      setFileUploadLoading(true);
      const newCreatives = await Promise.all(
        files?.map(async (file) => {
          const awsURL = await getAWSUrl(file);
          const fileURL = URL.createObjectURL(file);
          let creativeDuration: any;
          creativeDuration = 10;

          if (file.type?.split("/")[0] === "video") {
            creativeDuration = await getVideoDurationFromVideoURL(fileURL);
          }

          return {
            url: fileURL,
            fileType: file.type.split("/")[0],
            fileSize: file.size,
            creativeDuration,
            awsURL,
          };
        })
      );

      setCreativeUploadData((prev) =>
        prev.map((screen: any) =>
          currentScreens.includes(screen.screenId)
            ? { ...screen, [label]: [...screen[label], ...newCreatives] }
            : screen
        )
      );
      setFileUploadLoading(false);
      setCurrentScreens([]);
      setFiles([]);
      setLabel("standardDayTimeCreatives");
      setOpenSelected(false);
    } catch (error: any) {
      message.error(error.message);
      setFileUploadLoading(false);
    }
  };

  const getCount = useCallback(
    (key: keyof Screen, label: string): number => {
      let creativeCount = 0;

      if (label === "All") {
        for (const screen of screenData || []) {
          if (isCreativeUploaded(screen.screenId)) {
            creativeCount++;
          }
        }
      } else {
        for (const screen of screenData || []) {
          // Check if this screen matches the filter criteria
          if (screen[key] === label) {
            // Check if creative is uploaded for this screen
            if (isCreativeUploaded(screen.screenId)) {
              creativeCount++;
            }
          }
        }
      }

      return creativeCount;
    },
    [screenData, isCreativeUploaded]
  );

  useEffect(() => {
    setAllFilter((prev: FilterOptions) => {
      const updatedFilters = { ...prev };

      // Define mapping with proper types
      const filterToScreenKeyMap: Record<keyof FilterOptions, keyof Screen> = {
        cities: "city",
        touchPoints: "touchPoint",
        screenTypes: "screenType",
        screenRatio: "ratio",
        gridType: "gridType",
      };

      // Type-safe iteration through filter categories
      (Object.keys(updatedFilters) as Array<keyof FilterOptions>).forEach(
        (category) => {
          updatedFilters[category] = updatedFilters[category].map((option) => ({
            ...option,
            uploaded: getCount(filterToScreenKeyMap[category], option.lable),
          }));
        }
      );

      return updatedFilters;
    });
  }, [creativeUploadData]);

  const removeFile = (awsURL: string) => {
    let newData = [...creativeUploadData];
    const screenIndex = newData?.findIndex(
      (screen) => screen.screenId === currentScreen?.screenId
    );

    const screen = { ...newData[screenIndex] };
    if (!isCreativeUploaded2(screen)) {
      message.error("No Creative uploaded yet");
      return;
    }

    screen.standardDayTimeCreatives = screen.standardDayTimeCreatives.filter(
      (file) => file.awsURL !== awsURL
    );

    screen.standardNightTimeCreatives =
      screen.standardNightTimeCreatives.filter(
        (file) => file.awsURL !== awsURL
      );

    screen.triggerCreatives = screen.triggerCreatives.filter(
      (file) => file.awsURL !== awsURL
    );

    newData[screenIndex] = screen;
    setCurrentScreen(screen);
    setTabData((pre: any) => {
      let sss = [...pre];
      for (let d of sss) {
        d.label = `${d.label?.split("(")[0]} (${screen[d.id]?.length}) `;
      }
      return sss;
    });

    setCreativeUploadData(newData);
  };

  const removeAllSavedCreative = () => {
    setCreativeUploadData((prevData) => {
      const newData = [...prevData];
      const screenIndex = newData?.findIndex(
        (screen) => screen.screenId === currentScreen?.screenId
      );

      if (screenIndex === -1) {
        message.error("Screen not found!");
        return prevData;
      }

      const screen = { ...newData[screenIndex] };

      screen.standardDayTimeCreatives = [];

      screen.standardNightTimeCreatives = [];

      screen.triggerCreatives = [];

      newData[screenIndex] = screen;
      setCurrentScreen(screen);
      return newData;
    });
  };

  const closePopup = () => {
    setIsBucketPopupOpen(false);
    setCurrentScreens([]);
  };

  const handleSaveFiles = (files: Creative[], screenId: string) => {
    if (files.length === 0) {
      message.error("Please select files to save!");
      return;
    }

    setCreativeUploadData((prev) =>
      prev.map((screen: any) =>
        screen.screenId === screenId
          ? { ...screen, [label]: [...screen[label], ...files] }
          : screen
      )
    );
  };

  const handleAddFileFromBucket = async () => {
    if (!mediaFiles?.length) {
      message.error("No creative selected!, Please select creative first");
      return;
    }

    const processFile = mediaFiles.map((file: any) => {
      return {
        url: file.url,
        fileType: file.creativeType,
        fileSize: file.fileSize,
        creativeDuration: file.duration,
        awsURL: file.url,
      };
    });

    currentScreens.forEach((screenId) => {
      handleSaveFiles(processFile, screenId);
    });
    // setCurrentScreens([]);
    setMediaFiles([]);
    // setIsBucketPopupOpen(false);
    message.success(`Add creative successfully for ${label}`);
    closePopup();
  };

  const handleOpenBucketPopup = () => {
    if (currentScreens?.length === 0) {
      message.error("Please select screen first");
      return;
    }
    const dd: any = {};
    for (let category in allFilter) {
      dd[category] = allFilter[category].map((d1: any) => d1.lable);
    }
    dispatch(
      getCreativesFromCreativeBucketForUploadPage({
        ...dd,
        brandName: campaignDetails?.brandName,
        userId: userInfo?._id,
      })
    );
    setIsBucketPopupOpen(true);
  };

  useEffect(() => {
    dispatch(getAllFiltersDetailsForUploadCreativePage({ id: campaignId }));
    dispatch(
      getScreenDataForUploadCreativePageV3({
        id: campaignId,
        ...selectedFilters,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Upload Creative Page",
      })
    );
  }, [dispatch, campaignId, selectedFilters]);

  useEffect(() => {
    if (errorScreeData) message.error(errorScreeData);
    if (errorAddDetails) message.error("Error in adding campaign details...");
  }, [errorAddDetails, errorScreeData]);

  useEffect(() => {
    if (!screenData || !campaignDetails) return;

    handleSetValue();

    // Only initialize if we don't have creative data yet
    if (creativeUploadData?.length === 0) {
      const storedCreatives = campaignDetails?.creatives;
      const transformedCreatives = transformData(storedCreatives || []);
      const transformedScreenData = newTransformData(screenData || []);
      const combinedData = mergeCreativeWithScreenData(
        transformedCreatives,
        transformedScreenData
      );
      setCreativeUploadData(combinedData);
    }

    setPageLoading(false);
  }, [screenData, campaignDetails, creativeUploadData.length, handleSetValue]);

  useEffect(() => {
    if (successAddDetails) {
      navigate(`/editCampaign/${campaignId}`, { state: null });
      dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
      setCurrentStep(step + 1);
    }
  }, [successAddDetails, step, setCurrentStep, dispatch, navigate, campaignId]);

  if (pageLoading) return <LoadingScreen />;

  return (
    <div className="w-full">
      <ShowUploadedCreativePopup
        open={open}
        onClose={() => setOpen(false)}
        tabData={tabData}
        screenData={currentScreen}
        removeFile={removeFile}
        removeAllSavedCreative={removeAllSavedCreative}
      />
      <ShowSelectedCreativePopup
        open={openSelected}
        onClose={() => setOpenSelected(false)}
        files={files}
        setFiles={setFiles}
        handleSubmit={handleAddNewFiles}
        loading={fileUploadLoading}
        screensName={currentScreens?.map((id) => {
          let screen = creativeUploadData?.find(
            (s1: Screen) => s1.screenId === id
          );
          return screen?.screenName;
        })}
      />
      {isBucketPopupOpen && (
        <UploadCreativesFromBucketPopupV2
          onClose={closePopup}
          selectedScreens={creativeUploadData?.filter((screen: any) =>
            currentScreens.includes(screen?.screenId)
          )}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          brandName={campaignDetails?.brandName}
          handleSaveCreative={handleAddFileFromBucket}
          label={label}
          setLabel={setLabel}
          loading={loadingCreatives}
          creatives={creatives}
          tabData={tabData}
        />
      )}

      <div className="mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Upload Creative</h1>
        </div>
        <h2 className="text-sm text-gray-500">
          Upload your creatives for the campaigns for your selected screens
        </h2>

        <div className="grid grid-cols-12 gap-1 mt-4">
          {/* Filter Panel */}
          <div className="col-span-3">
            <FilterUI
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              filterOptions={allFilter || {}}
            />
          </div>

          {/* Screen List Panel */}
          <div className="border rounded-lg p-2 px-4 col-span-6">
            {loadingScreenData ? (
              <LoadingScreen />
            ) : (
              <div className="w-full">
                <div className="w-full flex justify-between items-center border-b pb-2 p-0">
                  <h1 className="w-full text-[16px] font-semibold">
                    Screen List{" "}
                    <span className="text-[14px] text-gray-500">
                      <span className="font-medium text-[#0E212E]">
                        ({getScreenCountWhereCreativeUploaded()}
                      </span>
                      /{screenData?.length})
                    </span>
                  </h1>
                  <SearchInputField
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search screen"
                  />
                </div>

                <div className="w-full">
                  {/* Table Header */}
                  <div className="grid grid-cols-8 w-full bg-gray-100 py-2 rounded-md">
                    {[
                      "Screens",
                      "City",
                      "TouchPoint",
                      "Ratio",
                      "ScreenType",
                      "Count",
                      "Preview",
                    ].map((d, i) => (
                      <div
                        className={`col-span-${
                          i === 0 ? "2" : "1"
                        } flex items-center ${
                          i === 0 ? "pl-4" : "justify-center"
                        }`}
                        key={i}
                      >
                        {i === 0 && (
                          <Checkbox
                            checked={
                              currentScreens.length === filteredScreens.length
                            }
                            onChange={handleSelectAllFilteredScreens}
                            className="mr-2"
                          />
                        )}
                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Table Body */}
                  <div className="h-[50vh] overflow-auto scrollbar-minimal">
                    {filteredScreens?.length === 0 && (
                      <NoDataView title="No Screen found for this filter" />
                    )}
                    {sortScreens(filteredScreens)?.map(
                      (singleData: any, index: number) => {
                        const isUploaded = isCreativeUploaded(
                          singleData.screenId
                        );
                        const status = isUploaded ? "Completed" : "Pending";
                        const creativeCount = creativeCountScreenWise(
                          singleData?.screenId
                        );
                        const statusColor = isUploaded
                          ? "text-[#3A9868]"
                          : "text-[#FD7E00]";

                        return (
                          <div
                            key={index}
                            className={`grid grid-cols-8 w-full items-center border-b hover:bg-blue-50 cursor-pointer ${
                              currentScreen === singleData.screenId
                                ? "bg-blue-100"
                                : ""
                            }`}
                          >
                            {[
                              singleData.screenName,
                              singleData.city,
                              singleData.touchPoint,
                              singleData.ratio,
                              singleData.screenType,
                              creativeCount,
                            ].map((item, i) => (
                              <div
                                className={`col-span-${
                                  i === 0 ? "2" : "1"
                                } flex items-center ${
                                  i === 0 ? "pl-4" : "justify-center"
                                } py-2`}
                                key={i}
                              >
                                {i === 0 && (
                                  <Checkbox
                                    checked={currentScreens.includes(
                                      singleData.screenId
                                    )}
                                    onChange={(e) =>
                                      handleSelectScreen(e, singleData.screenId)
                                    }
                                    className="mr-2"
                                  />
                                )}
                                {i === 0 || i === 2 || i === 4 ? (
                                  <Tooltip title={item}>
                                    <span
                                      className={`text-sm truncate  font-medium`}
                                      onClick={() =>
                                        handleSelectScreenByClick(
                                          singleData.screenId
                                        )
                                      }
                                    >
                                      {item}
                                    </span>
                                  </Tooltip>
                                ) : (
                                  <span
                                    onClick={() =>
                                      handleSelectScreenByClick(
                                        singleData.screenId
                                      )
                                    }
                                    className={`text-sm truncate ${
                                      i === 5
                                        ? `${statusColor} font-medium`
                                        : ""
                                    }`}
                                  >
                                    {item}
                                  </span>
                                )}
                              </div>
                            ))}
                            <div className="col-span-1 flex justify-center">
                              <i
                                className={`fi fi-sr-picture cursor-pointer ${statusColor}`}
                                onClick={() =>
                                  handleViewCreative(singleData.screenId)
                                }
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Upload Panel */}
          <div className="border rounded-lg p-4 col-span-3">
            <div className="w-full flex justify-between items-center border-b pb-4">
              <h1 className="w-full font-semibold text-[16px] text-[#0E212E]">
                Upload creative
              </h1>
              <div
                className="cursor-pointer flex gap-2 items-center hover:text-bold"
                onClick={handleOpenBucketPopup}
              >
                <i className="fi fi-sr-folder flex items-center text-[#F1BC00]" />
                <h1 className="w-full">Bucket</h1>
              </div>
            </div>

            {currentTab === "1" && (
              <div className="mt-4">
                <div className="flex flex-col gap-4">
                  {!isTriggerBasedCampaign ? (
                    <div className="flex flex-col gap-4">
                      <MultipleFileUpload
                        title="Upload Day"
                        handleFile={(files) =>
                          handleSelectFiles("standardDayTimeCreatives", files)
                        }
                        width="w-full"
                        fileType="*"
                      />
                      <p className="text-[14px] font-medium">
                        Optional creative
                      </p>
                      <MultipleFileUpload
                        title="Upload Night"
                        handleFile={(files) =>
                          handleSelectFiles("standardNightTimeCreatives", files)
                        }
                        width="w-full"
                        fileType="*"
                      />
                    </div>
                  ) : null}
                  {isTriggerAvailable() && (
                    <MultipleFileUpload
                      title="Upload Trigger"
                      handleFile={(files) =>
                        handleSelectFiles("triggerCreatives", files)
                      }
                      width="w-full"
                      fileType="*"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
          <Footer
            mainTitle={validate() ? "Continue" : "Continue"}
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
