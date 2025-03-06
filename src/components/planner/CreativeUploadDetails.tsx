import { useEffect, useState } from "react";
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
import {
  addDetailsToCreateCampaign,
  changeCampaignStatusAfterCreativeUpload,
} from "../../actions/campaignAction";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  CAMPAIGN_CREATIVES,
  FULL_CAMPAIGN_PLAN,
  SELECTED_TRIGGER,
} from "../../constants/localStorageConstants";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_RESET,
} from "../../constants/campaignConstants";
import { getVideoDurationFromVideoURL } from "../../utils/fileUtils";

interface CreativeUploadDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  successAddCampaignDetails?: any;
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
}: CreativeUploadDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch<any>();
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentPlayTimeCreative, setCurrentPlayTimeCreative] =
    useState<string>("1");
  const [file, setFIle] = useState<any>(null);
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

  // useEffect(() => {
  //   if (successAddCampaignDetails) {
  //     setCurrentStep(step + 1);
  //   }
  // }, [successAddCampaignDetails]);

  useEffect(() => {
    const campaignIdFromPath = pathname?.split("/").splice(-1)[0];

    dispatch(getScreenDataUploadCreativeData({ id: campaignIdFromPath }));
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Upload Creative Page",
      })
    );
  }, [dispatch, pathname, campaignId]);

  const mergeCreativeWithScreenData = (creatives: any, screenData: any) => {
    const combinedData: any = {};

    for (const city in screenData) {
      if (!combinedData[city]) {
        combinedData[city] = [];
      }
      screenData[city].forEach((screen: any) => {
        const creativeData = creatives[city]?.find(
          (creative: any) =>
            creative.screenResolution === screen.screenResolution
        );

        if (creativeData) {
          combinedData[city].push({
            ...screen,
            ...creativeData,
          });
        } else {
          combinedData[city].push(screen);
        }
      });
    }
    return combinedData;
  };

  const transformData = (data: any[]): TransformedData => {
    // console.log("transformData :", data);
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

      const ff = {
        file: file,
        url: fileURL,
        fileType: file.type,
        fileSize: file.size,
        creativeDuration: Number(creativeDuration),
        awsURL: "",
      };
      setFIle(ff);
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
    setFIle(null);
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

  const handleSetInitialData = (data: any) => {
    let arr = Object.keys(data || {});

    let result = arr?.map((city: string, index: number) => {
      // console.log(getCreativeCountCityWise(data, city));
      // console.log(getScreenCountCityWise(data, city));
      return {
        id: `${index + 1}`,
        label: city,
        params: [
          getCreativeCountCityWise(data, city),
          getScreenCountCityWise(data, city),
        ],
      };
    });

    setCitiesCreative(result);
    let city = result?.find((data: any) => data.id == "1")?.label || "";
    setCurrentCity(city);
  };

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
    let url = "";
    // stop again saving same creatives again and again when we came from future.
    if (file?.awsURL === "") {
      console.log("awsURL not preset!");
      url = await getAWSUrl(file);
    } else {
      console.log("no need to save again and again");
      url = file.awsURL;
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

  // const findMax = (data: Creative[]) => {
  //   return Math.max(...data?.map((s: Creative) => s.creativeDuration), 0);
  // };

  const handleSaveAndContinue = async () => {
    if (validate()) {
      setIsLoading(true);
      let requestBody: any = [];
      let sss = creativeUploadData;
      for (let city in sss) {
        for (let data of creativeUploadData[city]) {
          let standardDayTimeCreatives: any = [];
          let standardNightTimeCreatives: any = [];
          let triggerCreatives: any = [];

          if (data?.standardDayTimeCreatives) {
            for (let file of data?.standardDayTimeCreatives) {
              let myData = await returnRequiredValue(file);
              file.awsURL = myData?.url;
              file.url = myData?.url;
              standardDayTimeCreatives.push(myData);
            }
          }

          if (data?.standardNightTimeCreatives) {
            for (let file of data?.standardNightTimeCreatives) {
              let myData = await returnRequiredValue(file);
              file.awsURL = myData?.url;
              file.url = myData?.url;
              standardNightTimeCreatives.push(myData);
            }
          }
          if (data?.triggerCreatives) {
            for (let file of data?.triggerCreatives) {
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
            creativeDuration: data?.creativeDuration,
            standardDayTimeCreatives: standardDayTimeCreatives,
            standardNightTimeCreatives: standardNightTimeCreatives,
            triggerCreatives: triggerCreatives,
          });
        }
      }
      saveDataOnLocalStorage(CAMPAIGN_CREATIVES, { [campaignId]: sss });
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Upload Creative Page",
          id: pathname.split("/").splice(-1)[0],
          creatives: requestBody,
        })
      );
      setTimeout(() => setCurrentStep(step + 1), 1000);
      setCallToSendChangeStatus(true);
    } else {
      message.error("Please upload creatives for each row and foreach city");
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
      setFIle(null);
      setCreativeUploadData(filterUniqueResolutions(myData));
      handleNextStep(myData);

      saveDataOnLocalStorage(CAMPAIGN_CREATIVES, { [campaignId]: myData });
    } else {
      message.error("Please select file to save!");
    }
  };

  useEffect(() => {
    const storedCampaignData =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId];
    const storedCreatives = storedCampaignData?.creatives;
    const storedTriggers = storedCampaignData?.triggers;
    saveDataOnLocalStorage(SELECTED_TRIGGER, { [campaignId]: storedTriggers });

    if (Array.isArray(storedCreatives) && storedCreatives.length > 0) {
      const transformedCreatives = transformData(storedCreatives);
      const transformedScreenData = mewTransformData(screenData || {});
      const combinedData = mergeCreativeWithScreenData(
        transformedCreatives,
        transformedScreenData
      );

      handleSetInitialData(combinedData);
      setCreativeUploadData(filterUniqueResolutions(combinedData));
    } else if (screenData) {
      const storedCampaignCreatives =
        getDataFromLocalStorage(CAMPAIGN_CREATIVES)?.[campaignId];
      const finalData = storedCampaignCreatives || screenData;

      handleSetInitialData(finalData);
      setCreativeUploadData(
        filterUniqueResolutions(mewTransformData(finalData))
      );
    }

    if (errorScreeData) {
      message.error(errorScreeData);
    }
  }, [campaignId, errorScreeData, screenData]);

  return (
    <div className="w-full h-[80vh] overflow-y-auto no-scrollbar">
      <div className="mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-semibold">Upload Creative</h1>
        <h2 className="text-sm text-gray-500">
          Upload your creatives for the campaigns for your selected screens
        </h2>

        {/* Loader Message */}
        {isLoading && (
          <div className="p-2 bg-yellow-200 text-yellow-700 text-md">
            Wait for some time, file is uploading...
          </div>
        )}

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
              <div className="grid grid-cols-12 bg-[#129BFF] py-2 mt-4 items-center text-[16px]">
                <div className="col-span-3 flex">
                  <h1 className="w-24 text-center text-[#FFFFFF] font-semibold ">
                    Screens
                  </h1>
                  <h1 className="w-24 text-center text-[#FFFFFF] font-semibold ">
                    Duration
                  </h1>
                  <h1 className="w-48 text-center text-[#FFFFFF] font-semibold">
                    Screen Dimension
                  </h1>
                </div>
                <h1 className="w-full text-center text-[#FFFFFF] font-semibold col-span-9">
                  Upload creatives
                </h1>
              </div>

              {/* Creative Upload Section */}
              <div className="grid grid-cols-12">
                {/* Screen Selection */}
                <div className="border border-1 h-[60vh] overflow-scroll scrollbar-minimal col-span-3">
                  {creativeUploadData[currentCity]?.map((singleData, index) => (
                    <div
                      key={index}
                      title={
                        isCreativeUploaded(index)
                          ? "Click to select row"
                          : "This row has no creative"
                      }
                      className={`${
                        index === currentScreen
                          ? "bg-[#aed6f1]  border border-[#000000]"
                          : isCreativeUploaded(index)
                          ? "bg-[#abebc6]"
                          : !isCreativeUploaded(index)
                          ? "bg-[#E8F3FF]"
                          : "bg-[#E8F3FF]"
                      } hover:bg-[#e5e7eb]`}
                      onClick={() => setCurrentScreen(index)}
                    >
                      <div className="flex">
                        {[
                          singleData?.count,
                          singleData?.creativeDuration,
                          singleData?.screenResolution,
                        ].map((item, i) => (
                          <h1
                            key={i}
                            className="border-b border-1 p-2 w-24 text-center"
                          >
                            {item}
                          </h1>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Creative Type Selection */}
                <div className="border-b border-1 px-2 py-1 col-span-1">
                  <Radio.Group
                    onChange={handleSetCreativeType}
                    value={creativeType}
                    className="text-xl"
                  >
                    <Space direction="vertical">
                      {!pathname?.split("/").includes("triggerbasedplan") && (
                        <Radio value="Standard">Standard</Radio>
                      )}
                      {isTriggerAvailable() && (
                        <Radio value="Trigger">Trigger</Radio>
                      )}
                    </Space>
                  </Radio.Group>
                </div>

                {/* File Upload Section */}
                <div className="border border-1 p-2 col-span-4 h-[60vh]">
                  {creativeType === "Standard" ? (
                    <>
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
                        removeFile={() => setFIle(null)}
                      />
                    </>
                  ) : (
                    <UploadCreativeForTriggerCampaign
                      handleSelectFileType={handleSelectFileType}
                      selectFileType={selectFileType}
                      handleAddNewFile={handleAddNewFile}
                      file={file}
                      handleSaveFile={handleSaveFile}
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

                {/* Preview Section */}
                <div className="border-b border-r border-1 h-[60vh] px-4 py-2 col-span-4">
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
    </div>
  );
};
