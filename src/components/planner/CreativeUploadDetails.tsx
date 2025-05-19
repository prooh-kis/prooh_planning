import { useCallback, useEffect, useState } from "react";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { TabWithIcon } from "../../components/molecules/TabWithIcon";
import { playCreativeTime } from "../../utils/hardCoddedData";
import { message, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";
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
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";

interface CreativeUploadDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  successAddCampaignDetails?: any;
  pageSuccess?: boolean;
  setPageSuccess?: any;
}

interface Creative {
  file: {};
  url: string;
  fileType: string;
  fileSize: number;
  creativeDuration: number;
  awsURL: string;
}

interface Screen {
  screenResolution: string;
  count: number;
  screenIds: string[];
  creativeDuration: number;
  standardDayTimeCreatives: Creative[];
  standardNightTimeCreatives: Creative[];
  triggerCreatives: Creative[];
}

interface TransformedData {
  [city: string]: Screen[];
}

export const CreativeUploadDetails = ({
  setCurrentStep,
  step,
  campaignId,
  successAddCampaignDetails,
  pageSuccess,
  setPageSuccess,
}: CreativeUploadDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch<any>();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentPlayTimeCreative, setCurrentPlayTimeCreative] =
    useState<string>("1");
  const [file, setFile] = useState<any>(null);
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [selectFileType, setSelectFileType] = useState("video");
  const [creativeType, setCreativeType] = useState("Standard"); // Standard/ Trigger
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [creativeUploadData, setCreativeUploadData] = useState<TransformedData>(
    {}
  );
  const [citiesCreative, setCitiesCreative] = useState<any>([]);
  const [callToSendChangeStatus, setCallToSendChangeStatus] =
    useState<boolean>(false);

  const screenDataUploadCreative = useSelector(
    (state: any) => state.screenDataUploadCreative
  );
  const {
    loading: loadingCost,
    error: errorScreeData,
    data: screenData,
  } = screenDataUploadCreative;

  useEffect(() => {
    if (!successAddCampaignDetails) return;
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
    });
    setPageSuccess(true);
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

  const mergeCreativeWithScreenData = (creatives: any, screenData: any) => {
    const combinedData: any = {};

    for (const city in screenData) {
      if (!combinedData[city]) {
        combinedData[city] = [];
      }

      screenData[city].forEach((screen: any) => {
        // Find the matching creative data by screenIds
        const creativeData = creatives[city]?.find((creative: any) =>
          creative.screenIds.every((id: string) =>
            screen.screenIds.includes(id)
          )
        );

        if (creativeData) {
          // If creative exists, merge it with the screen
          combinedData[city].push({
            count: screen.count,
            creativeDuration: screen.creativeDuration,
            screenIds: screen.screenIds,
            screenResolution: screen.screenResolution,
            standardDayTimeCreatives: creativeData.standardDayTimeCreatives,
            standardNightTimeCreatives: creativeData.standardNightTimeCreatives,
            triggerCreatives: creativeData.triggerCreatives,
          });
        } else {
          // If no creative exists, push only the screen data
          combinedData[city].push(screen);
        }
      });
    }

    return combinedData;
  };

  const transformData = (data: any[]): TransformedData => {
    const result: TransformedData = {};
    if (data.map((s: any) => s?.city)[0] === "") {
      message.error(
        "You  can can't update creative for this campaign, direct jump the next flow "
      );
      return {};
    }
    data.forEach((item) => {
      const city = item.city;

      const transformedItem = {
        screenResolution: item.screenResolution,
        count: item.count,
        screenIds: item.screenIds,
        creativeDuration: item.creativeDuration,
        standardDayTimeCreatives: item?.standardDayTimeCreatives.map(
          (creative: any) => ({
            file: {},
            url: creative?.url,
            fileType: creative?.type,
            fileSize: creative?.size,
            creativeDuration: item.creativeDuration,
            awsURL: creative?.url,
          })
        ),
        standardNightTimeCreatives: item?.standardNightTimeCreatives.map(
          (creative: any) => ({
            file: {},
            url: creative?.url,
            fileType: creative?.type,
            fileSize: creative?.size,
            creativeDuration: item.creativeDuration,
            awsURL: creative?.url,
          })
        ),
        triggerCreatives: item?.triggerCreatives.map((creative: any) => ({
          file: {},
          url: creative?.url,
          fileType: creative?.type,
          fileSize: creative?.size,
          creativeDuration: item.creativeDuration,
          awsURL: creative?.url,
        })),
      };

      if (!result[city]) {
        result[city] = [];
      }

      result[city].push(transformedItem);
    });
    return result;
  };

  const mewTransformData = (input: any): TransformedData => {
    const transformed: TransformedData = {};

    for (const city in input) {
      if (input.hasOwnProperty(city)) {
        transformed[city] = input[city].map((screen: any) => ({
          screenResolution: screen.screenResolution,
          count: screen.count,
          screenIds: screen.screenIds,
          creativeDuration: 10, //screen.duration,
          standardDayTimeCreatives: [],
          standardNightTimeCreatives: [],
          triggerCreatives: [],
        }));
      }
    }

    return transformed;
  };

  const filterUniqueResolutions = (data: any) => {
    const filteredData: any = {};
    Object.keys(data).forEach((city) => {
      // Use a Set to track unique screen resolutions
      const uniqueResolutions = new Set();
      const uniqueCreatives: any = [];

      data[city].forEach((creative: any) => {
        const resolution = creative.screenResolution.trim(); // Remove any extra spaces
        if (!uniqueResolutions.has(resolution)) {
          uniqueResolutions.add(resolution); // Add the resolution to the Set
          uniqueCreatives.push(creative); // Add the creative to the unique list
        }
      });

      filteredData[city] = uniqueCreatives; // Assign unique creatives back to the city
    });

    return filteredData;
  };

  const handleSetCreativeType = (e: RadioChangeEvent) => {
    setCreativeType(e.target.value);
  };

  const handleSelectFileType = (e: any) => {
    setSelectFileType(e.target.value);
  };

  const handleAddNewFile = async (file: File) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      let creativeDuration: any = 10;
      if (file.type?.split("/")[0] === "video") {
        creativeDuration = await getVideoDurationFromVideoURL(fileURL);
      }

      setFile({
        file: file,
        url: fileURL,
        fileType: file.type,
        fileSize: file.size,
        creativeDuration: Number(creativeDuration),
        awsURL: "",
      });
    }
  };

  const removeFile = (url: string) => {
    const myData = creativeUploadData;
    if (creativeType === "Standard") {
      if (currentPlayTimeCreative === "1")
        myData[currentCity][currentScreen].standardDayTimeCreatives = myData[
          currentCity
        ][currentScreen].standardDayTimeCreatives.filter(
          (file: any) => file.url !== url
        );
      else {
        myData[currentCity][currentScreen].standardNightTimeCreatives = myData[
          currentCity
        ][currentScreen].standardNightTimeCreatives.filter(
          (file: any) => file.url !== url
        );
      }
    } else {
      myData[currentCity][currentScreen].triggerCreatives = myData[currentCity][
        currentScreen
      ].triggerCreatives.filter((file: any) => file.url !== url);
    }
    setFile(null);
    setCreativeUploadData(filterUniqueResolutions(myData));
    setIsDeleted((pre: boolean) => !pre);
  };

  const isCreativeUploaded = (index: number) => {
    let res1 =
      creativeUploadData[currentCity][index]?.standardDayTimeCreatives?.length >
      0;
    let res2 =
      creativeUploadData[currentCity][index]?.standardNightTimeCreatives
        ?.length > 0;
    let res3 =
      creativeUploadData[currentCity][index]?.triggerCreatives?.length > 0;

    let res = true;
    if (res1 || res2 || res3) {
      res = true;
    } else {
      res = false;
    }
    return res;
  };

  const handleSelectCurrentTab = (id: string) => {
    setCurrentTab(id);
    let city = citiesCreative?.find((data: any) => data.id == id)?.label || "";
    setCurrentCity(city);
  };

  const getScreenCountCityWise = (data: any, city: string) => {
    return data[city]?.reduce((accum: number, current: any) => {
      return accum + current.count;
    }, 0);
  };

  const getCreativeCountCityWise = (
    data: Record<string, any[]>,
    city: string
  ): number => {
    if (!data || !data[city] || !Array.isArray(data[city])) {
      return 0;
    }
    return data[city]?.reduce((accum: number, current: any) => {
      if (
        (!current?.standardDayTimeCreatives ||
          current.standardDayTimeCreatives.length === 0) &&
        (!current?.triggerCreatives || current.triggerCreatives.length === 0) &&
        (!current?.standardNightTimeCreatives ||
          current.standardNightTimeCreatives.length === 0)
      ) {
        return accum;
      }
      return accum + (current.count || 0);
    }, 0);
  };

  const handleSetInitialData = useCallback((data: any) => {
    let arr = Object.keys(data || {});

    let result = arr?.map((city: string, index: number) => {
      return {
        id: `${index + 1}`,
        label: city,
        params: [
          getCreativeCountCityWise(data, city),
          getScreenCountCityWise(data, city) -
            getCreativeCountCityWise(data, city),
        ],
      };
    });

    setCitiesCreative(result);
    let city = result?.find((data: any) => data.id == "1")?.label || "";
    setCurrentCity(city);
  }, []);

  const handleNextStep = (data: any) => {
    let arr = Object.keys(data || {});
    let result = arr?.map((city: string, index: number) => {
      return {
        id: `${index + 1}`,
        label: city,
        params: [
          getCreativeCountCityWise(data, city),
          getScreenCountCityWise(data, city) -
            getCreativeCountCityWise(data, city),
        ],
      };
    });
    setCitiesCreative(result);
  };

  const getAWSUrl = async (data: any) => {
    try {
      const aws = await getAWSUrlToUploadFile(
        data.fileType,
        data?.file?.name?.split(".")[0]
      );
      const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
      data.awsURL = aws?.awsURL;
      return aws?.awsURL;
    } catch (error: any) {
      message.error(error);
    }
  };

  const returnRequiredValue = async (file: any) => {
    let url = file?.awsURL || "";
    // stop again saving same creatives again and again when we came from future.
    if (!url) {
      console.log("awsURL not preset!");
      url = await getAWSUrl(file);
    }
    return {
      url: url,
      size: file.fileSize,
      type: file.fileType,
    };
  };

  const validate = () => {
    for (let city in creativeUploadData) {
      for (let data of creativeUploadData[city]) {
        if (
          data?.standardDayTimeCreatives?.length === 0 &&
          data?.standardNightTimeCreatives?.length === 0 &&
          data?.triggerCreatives?.length === 0
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const isTriggerAvailable = () => {
    const result =
      getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]?.weatherTriggers
        ?.length > 0
        ? true
        : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
            ?.sportsTriggers?.length > 0
        ? true
        : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]?.vacantSlots
            ?.length > 0
        ? true
        : false;

    return result;
  };

  const handleSaveAndContinue = async () => {
    if (!pathname.split("/").includes("view")) {
      if (validate()) {
        setIsLoading(true);
        let requestBody: any = [];
        let sss = creativeUploadData;
        for (let city in sss) {
          for (let data of creativeUploadData[city]) {
            let standardDayTimeCreatives: any = [];
            let standardNightTimeCreatives: any = [];
            let triggerCreatives: any = [];
            let creativeDuration = 10;

            if (data?.standardDayTimeCreatives) {
              for (let file of data?.standardDayTimeCreatives) {
                creativeDuration =
                  creativeDuration < file?.creativeDuration
                    ? file?.creativeDuration
                    : creativeDuration;
                let myData = await returnRequiredValue(file);
                file.awsURL = myData?.url;
                file.url = myData?.url;
                standardDayTimeCreatives.push(myData);
              }
            }

            if (data?.standardNightTimeCreatives) {
              for (let file of data?.standardNightTimeCreatives) {
                creativeDuration =
                  creativeDuration < file?.creativeDuration
                    ? file?.creativeDuration
                    : creativeDuration;
                let myData = await returnRequiredValue(file);
                file.awsURL = myData?.url;
                file.url = myData?.url;
                standardNightTimeCreatives.push(myData);
              }
            }
            if (data?.triggerCreatives) {
              for (let file of data?.triggerCreatives) {
                creativeDuration =
                  creativeDuration < file?.creativeDuration
                    ? file?.creativeDuration
                    : creativeDuration;
                let myData = await returnRequiredValue(file);
                file.awsURL = myData?.url;
                file.url = myData?.url;
                triggerCreatives.push(myData);
              }
            }

            requestBody.push({
              city: city,
              screenResolution: data?.screenResolution,
              count: data?.count,
              screenIds: data?.screenIds,
              creativeDuration: creativeDuration,
              standardDayTimeCreatives: standardDayTimeCreatives,
              standardNightTimeCreatives: standardNightTimeCreatives,
              triggerCreatives: triggerCreatives,
            });
          }
        }
        saveDataOnLocalStorage(CAMPAIGN_CREATIVES, { [campaignId]: sss });
        dispatch(
          addDetailsToCreateCampaign({
            event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
            pageName: "Upload Creative Page",
            id: campaignId,
            creatives: requestBody,
          })
        );
        setTimeout(() => {
          setPageSuccess(false);
          setCurrentStep(step + 1);
        }, 1000);
        setCallToSendChangeStatus(true);
      } else {
        message.error("Please upload creatives for each row and foreach city");
      }
    } else {
      setCurrentStep(step + 1);
    }
  };

  const handleSaveFile = () => {
    if (file) {
      const myData = creativeUploadData;
      if (creativeType === "Standard") {
        if (currentPlayTimeCreative === "1") {
          if (myData[currentCity][currentScreen].standardDayTimeCreatives) {
            myData[currentCity][currentScreen].standardDayTimeCreatives.push(
              file
            );
          } else {
            myData[currentCity][currentScreen].standardDayTimeCreatives = [];
            myData[currentCity][currentScreen].standardDayTimeCreatives.push(
              file
            );
          }
        } else {
          if (myData[currentCity][currentScreen].standardNightTimeCreatives) {
            myData[currentCity][currentScreen].standardNightTimeCreatives.push(
              file
            );
          } else {
            myData[currentCity][currentScreen].standardNightTimeCreatives = [];
            myData[currentCity][currentScreen].standardNightTimeCreatives.push(
              file
            );
          }
        }
      } else {
        if (myData[currentCity][currentScreen].triggerCreatives) {
          myData[currentCity][currentScreen].triggerCreatives.push(file);
        } else {
          myData[currentCity][currentScreen].triggerCreatives = [];
          myData[currentCity][currentScreen].triggerCreatives.push(file);
        }
      }
      setFile(null);
      setCreativeUploadData(filterUniqueResolutions(myData));
      handleNextStep(myData);

      saveDataOnLocalStorage(CAMPAIGN_CREATIVES, { [campaignId]: myData });
    } else {
      message.error("Please select file to save!");
    }
  };

  useEffect(() => {
    if (errorScreeData) {
      message.error(errorScreeData);
    }
    if (!screenData) return;
    const storedCampaignData =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId];
    const storedCreatives = storedCampaignData?.creatives;
    const storedTriggers = storedCampaignData?.triggers;
    saveDataOnLocalStorage(SELECTED_TRIGGER, { [campaignId]: storedTriggers });
    const transformedCreatives = transformData(storedCreatives);
    const transformedScreenData = mewTransformData(screenData || {});
    const combinedData = mergeCreativeWithScreenData(
      transformedCreatives,
      transformedScreenData
    );

    handleSetInitialData(combinedData);
    setCreativeUploadData(filterUniqueResolutions(combinedData));
    setPageLoading(false);
  }, [campaignId, errorScreeData, handleSetInitialData, screenData]);

  return (
    <div className="w-full">
      {pageLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto">
          {/* Heading */}
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

              {/* Table Header */}
              <div className="mr-48 w-full">
                <div className="grid grid-cols-12 bg-[#129BFF] border py-2 mt-4 items-center text-[16px]">
                  <div className="col-span-3 ">
                    <div className="flex">
                      {["Screens", "Duration", "Ratio"]?.map(
                        (d: any, i: any) => (
                          <h1
                            key={i}
                            className="w-24 text-center text-[#FFFFFF] font-semibold"
                          >
                            {d}
                          </h1>
                        )
                      )}
                    </div>
                  </div>
                  <div className="col-span-9">
                    <h1 className="w-full text-center text-[#FFFFFF] font-semibold col-span-9">
                      Upload creatives
                    </h1>
                  </div>
                </div>

                {/* Creative Upload Section */}
                <div className="grid grid-cols-12">
                  {/* Screen Selection */}
                  <div className="border border-1 h-[55vh] overflow-scroll scrollbar-minimal col-span-3">
                    {creativeUploadData[currentCity]?.map(
                      (singleData, index) => (
                        <div
                          key={index}
                          title={
                            isCreativeUploaded(index)
                              ? "Click to select row"
                              : "This row has no creative"
                          }
                          className={`${
                            index === currentScreen
                              ? "bg-[#aed6f150]"
                              : isCreativeUploaded(index)
                              ? "bg-[#abebc650]"
                              : !isCreativeUploaded(index)
                              ? "bg-[#FFFFFF]"
                              : "bg-[#FFFFFF]"
                          } hover:bg-[#e5e7eb50]`}
                          onClick={() => setCurrentScreen(index)}
                        >
                          <div className="flex">
                            {[
                              singleData?.count,
                              singleData?.creativeDuration,
                              singleData?.screenResolution,
                            ].map((item, i) => (
                              <h1 key={i} className="p-2 w-24 text-center">
                                {item}
                              </h1>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Creative Type Selection */}
                  <div className="border-b border-1 px-2 py-1 col-span-1 truncate">
                    <Radio.Group
                      onChange={handleSetCreativeType}
                      value={creativeType}
                      className="text-xl"
                    >
                      <Space direction="vertical">
                        {!pathname?.split("/").includes("triggerbasedplan") && (
                          <Radio value="Standard">
                            <p className="truncate">Standard</p>
                          </Radio>
                        )}
                        {isTriggerAvailable() && (
                          <Radio value="Trigger">
                            <p className="truncate">Trigger</p>
                          </Radio>
                        )}
                      </Space>
                    </Radio.Group>
                  </div>

                  {/* File Upload Section */}
                  <div className="border border-1 p-2 col-span-4 h-[55vh]">
                    {creativeType === "Standard" ? (
                      <div className="w-full">
                        <TabWithIcon
                          tabData={playCreativeTime}
                          currentTab={currentPlayTimeCreative}
                          setCurrentTab={setCurrentPlayTimeCreative}
                        />
                        <UploadCreativeForStandardCampaign
                          handleSelectFileType={handleSelectFileType}
                          selectFileType={selectFileType}
                          handleAddNewFile={handleAddNewFile}
                          file={file}
                          handleSaveFile={handleSaveFile}
                          removeFile={() => setFile(null)}
                        />
                      </div>
                    ) : (
                      <UploadCreativeForTriggerCampaign
                        handleSelectFileType={handleSelectFileType}
                        selectFileType={selectFileType}
                        handleAddNewFile={handleAddNewFile}
                        file={file}
                        handleSaveFile={handleSaveFile}
                        triggerData={
                          getDataFromLocalStorage(SELECTED_TRIGGER)?.[
                            campaignId
                          ]?.weatherTriggers ||
                          getDataFromLocalStorage(SELECTED_TRIGGER)?.[
                            campaignId
                          ]?.sportsTriggers ||
                          getDataFromLocalStorage(SELECTED_TRIGGER)?.[
                            campaignId
                          ]?.vacantSlots ||
                          {}
                        }
                        triggerType={
                          getDataFromLocalStorage(SELECTED_TRIGGER)?.[
                            campaignId
                          ]?.weatherTriggers?.[0]?.type
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

                  {/* Preview Section */}
                  <div className="border-b border-r border-1 h-[55vh] px-4 py-2 col-span-4">
                    <h1 className="font-semibold">
                      {creativeType === "Standard"
                        ? currentPlayTimeCreative === "1"
                          ? "Day Time Creative"
                          : "Night Time Creative"
                        : "Trigger Creative"}
                    </h1>
                    <ViewMediaForUploadCreatives
                      files={
                        creativeType === "Standard"
                          ? currentPlayTimeCreative === "1"
                            ? creativeUploadData?.[currentCity]?.[currentScreen]
                                ?.standardDayTimeCreatives
                            : creativeUploadData?.[currentCity]?.[currentScreen]
                                ?.standardNightTimeCreatives
                          : creativeUploadData?.[currentCity]?.[currentScreen]
                              ?.triggerCreatives
                      }
                      removeFile={removeFile}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
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
          )}
        </div>
      )}
    </div>
  );
};
