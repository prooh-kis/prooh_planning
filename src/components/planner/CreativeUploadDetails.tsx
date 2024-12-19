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
import { getScreenDataUploadCreativeData } from "../../actions/screenAction";
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
import { CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT } from "../../constants/campaignConstants";
import { getVideoDurationFromVideoURL } from "../../utils/fileUtils";

interface CreativeUploadDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
}
interface SingleFile {
  file: File;
  url: string;
  fileType: string;
  fileSize: number;
  duration: number;
  awsURL: string;
}
interface Data1 {
  screenResolution: string;
  count: number;
  screenIds: string[];
  creativeDuration: number;
  standardDayTimeCreatives: SingleFile[];
  standardNightTimeCreatives: SingleFile[];
  triggerCreatives: SingleFile[];
}

interface Data {
  [key: string]: Data1[];
}

export const CreativeUploadDetails = ({
  setCurrentStep,
  step,
  campaignId,
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
  const [creativeUploadData, setCreativeUploadData] = useState<Data>({});
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

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading,
    error,
    success,
    data: campaignDetails,
  } = detailsToCreateCampaignAdd;

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
      let duration: any = 15;
      if (file.type?.split("/")[0] === "video") {
        duration = await getVideoDurationFromVideoURL(fileURL);
      }

      const ff = {
        file: file,
        url: fileURL,
        fileType: file.type,
        fileSize: file.size,
        duration: Number(duration),
        awsURL: "",
      };
      setFIle(ff);
    }
  };

  const handleSaveFile = () => {
    if (file) {
      const myData = creativeUploadData;
      if (creativeType === "Standard") {
        if (currentPlayTimeCreative === "1")
          myData[currentCity][currentScreen].standardDayTimeCreatives.push(
            file
          );
        else {
          myData[currentCity][currentScreen].standardNightTimeCreatives.push(
            file
          );
        }
      } else {
        myData[currentCity][currentScreen].triggerCreatives.push(file);
      }
      setFIle(null);
      setCreativeUploadData(filterUniqueResolutions(myData));
      let citiesCreativeData = citiesCreative.map((data: any) => {
        if (
          data.label === currentCity &&
          (myData[currentCity][currentScreen].standardDayTimeCreatives
            .length === 0 ||
            myData[currentCity][currentScreen].triggerCreatives.length === 0)
        ) {
          data.params[0] += myData[currentCity][currentScreen]?.count;
          data.params[1] =
            data.params[1] - myData[currentCity][currentScreen]?.count;
        }
        return data;
      });
      setCitiesCreative(citiesCreativeData);
      saveDataOnLocalStorage(CAMPAIGN_CREATIVES, {[campaignId]: myData});
    } else {
      message.error("Please select file to save!");
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
    // const param1 = data[city]?.filter(
    //   (d: any) =>
    //     d?.standardDayTimeCreatives?.length > 0 ||
    //     d?.triggerCreatives?.length > 0
    // );
    return data[city]?.reduce((accum: number, current: any) => {
      return accum + current.count;
    }, 0);
  };

  const handleSetInitialData = (data: any) => {
    let arr = Object.keys(data);

    let result = arr?.map((value: string, index: number) => {
      return {
        id: `${index + 1}`,
        label: value,
        params: [0, getScreenCountCityWise(data, value)],
      };
    });
    setCitiesCreative(result);
    let city = result?.find((data: any) => data.id == "1")?.label || "";
    setCurrentCity(city);
  };

  const getAWSUrl = async (data: any) => {
    try {
      const aws = await getAWSUrlToUploadFile(data.fileType);
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
          data?.standardNightTimeCreatives?.length === 0
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const isTriggerAvailable = () => {
    const result =
      getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]?.weatherTriggers?.length > 0
        ? true
        : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]?.sportsTriggers?.length > 0
        ? true
        : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]?.vacantSlots?.length > 0
        ? true
        : false;

    return result;
  };

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

          for (let file of data?.standardDayTimeCreatives) {
            let myData = await returnRequiredValue(file);
            file.awsURL = myData?.url;
            file.url = myData?.url;
            standardDayTimeCreatives.push(myData);
          }
          for (let file of data?.standardNightTimeCreatives) {
            let myData = await returnRequiredValue(file);
            file.awsURL = myData?.url;
            file.url = myData?.url;
            standardNightTimeCreatives.push(myData);
          }
          for (let file of data?.triggerCreatives) {
            let myData = await returnRequiredValue(file);
            file.awsURL = myData?.url;
            file.url = myData?.url;
            triggerCreatives.push(myData);
          }
          requestBody.push({
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
      console.log("ssss : ", sss);
      saveDataOnLocalStorage(CAMPAIGN_CREATIVES, {[campaignId]: sss});
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Upload Creative Page",
          id: pathname.split("/").splice(-1)[0],
          creatives: requestBody,
        })
      );
      setCallToSendChangeStatus(true);
    } else {
      message.error("Please upload creatives for each row and foreach city");
    }
  };

  useEffect(() => {
    if (error && callToSendChangeStatus) {
      setIsLoading(false);
      message.error(error);
    }
    if (success && callToSendChangeStatus) {
      console.log(
        "Now calling to send CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT",
        success,
        callToSendChangeStatus
      );
      setIsLoading(false);
      dispatch(
        changeCampaignStatusAfterCreativeUpload({
          id: campaignId,
          status: CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
        })
      );

      setCallToSendChangeStatus(false);
      setCurrentStep(step + 1);
    }
  }, [error, success, callToSendChangeStatus]);

  useEffect(() => {
    dispatch(
      getScreenDataUploadCreativeData({
        id: pathname?.split("/").splice(-1)[0],
      })
    );
  }, [dispatch, pathname]);

  useEffect(() => {
    if (screenData) {
      // console.log("screenData : ", screenData);
      if (getDataFromLocalStorage(CAMPAIGN_CREATIVES)?.[campaignId]) {
        handleSetInitialData(getDataFromLocalStorage(CAMPAIGN_CREATIVES)?.[campaignId] || {});
      } else {
        handleSetInitialData(screenData);
      }
      const result: any = getDataFromLocalStorage(CAMPAIGN_CREATIVES)?.[campaignId] || {};
      for (let city in screenData) {
        if (result[city] === undefined) {
          result[city] = [];
        }
        for (let data in screenData[city]) {
          result[city].push({
            screenResolution: screenData[city][data].screenResolution,
            count: screenData[city][data].count,
            screenIds: screenData[city][data].screenIds,
            creativeDuration: screenData[city][data].duration,
            standardDayTimeCreatives:
              screenData[city][data].standardDayTimeCreatives || [],
            standardNightTimeCreatives:
              screenData[city][data].standardDayTimeCreatives || [],
            triggerCreatives: screenData[city][data].triggerCreatives || [],
          });
        }
      }
      setCreativeUploadData(filterUniqueResolutions(result));
    }
    if (errorScreeData) {
      message.error(errorScreeData);
    }

    const result =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.triggers;
    saveDataOnLocalStorage(SELECTED_TRIGGER, {[campaignId]: result});
  }, [errorScreeData, screenData]);

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-2xl font-semibold">Upload Creative</h1>
        <h1 className="text-sm text-gray-500 ">
          Upload your creatives for the campaigns for your selected screens
        </h1>
      </div>
      {isLoading && (
        <div className="p-2 bg-yellow-200 text-yellow-700 text-md">
          Wait for some time file is uploading....
        </div>
      )}
      {currentCity === "" ? null : (
        <div>
          <div className="flex gap-4">
            <TabWithoutIcon
              tabData={citiesCreative}
              currentTab={currentTab}
              setCurrentTab={handleSelectCurrentTab}
            />
          </div>
          <div className="mr-48 w-full">
            <div className="flex bg-blue-400 py-2 mt-4 items-center">
              <div className="flex">
                <h1 className="w-24 text-center text-white font-semibold ">
                  Screens
                </h1>
                <h1 className="w-24 text-center text-white font-semibold ">
                  Duration
                </h1>
                <h1 className="w-48 text-center text-white font-semibold ">
                  Screen Dimension
                </h1>
              </div>
              <h1 className="w-full text-center text-white font-semibold">
                Upload creatives
              </h1>
            </div>
            <div className="flex">
              <div className="border border-1 h-100%">
                {creativeUploadData[currentCity]?.map(
                  (singleData: any, index: number) => {
                    return (
                      <div
                        title={
                          isCreativeUploaded(index)
                            ? "click to select row"
                            : "this row has no creative"
                        }
                        className={
                          index === currentScreen && isCreativeUploaded(index)
                            ? "bg-blue-50"
                            : !(
                                index === currentScreen ||
                                isCreativeUploaded(index)
                              )
                            ? ""
                            : isCreativeUploaded(index)
                            ? "bg-blue-50"
                            : "bg-blue-50"
                        }
                        key={index}
                        onClick={() => setCurrentScreen(index)}
                      >
                        <div className="flex">
                          <h1 className="border-b border-1 p-2 w-24 text-center ">
                            {singleData?.count}
                          </h1>
                          <h1 className="border-b border-x border-1 p-2 w-24 text-center ">
                            {singleData?.creativeDuration}
                          </h1>
                          <h1 className="border-b border-1 p-2 w-48 text-center ">
                            {singleData?.screenResolution}
                          </h1>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="border-b border-1 h-100% px-2 py-1 w-72">
                <Radio.Group
                  onChange={handleSetCreativeType}
                  value={creativeType}
                  className="text-xl"
                >
                  <Space direction="vertical">
                    {!pathname?.split("/").includes("triggerbasedplan") && (
                      <Radio value={"Standard"}>Standard</Radio>
                    )}
                    {isTriggerAvailable() && (
                      <Radio value={"Trigger"}>Trigger</Radio>
                    )}
                  </Space>
                </Radio.Group>
              </div>
              <div className="flex border-1 h-100% w-full">
                <div className="border border-1 h-100% p-2  w-1/2">
                  {creativeType === "Standard" ? (
                    <div>
                      <TabWithIcon
                        tabData={playCreativeTime}
                        currentTab={currentPlayTimeCreative}
                        setCurrentTab={setCurrentPlayTimeCreative}
                      />
                      <div className="">
                        <UploadCreativeForStandardCampaign
                          handleSelectFileType={handleSelectFileType}
                          selectFileType={selectFileType}
                          handleAddNewFile={handleAddNewFile}
                          file={file}
                          handleSaveFile={handleSaveFile}
                          removeFile={() => setFIle(null)}
                        />
                      </div>
                    </div>
                  ) : (
                    <UploadCreativeForTriggerCampaign
                      handleSelectFileType={handleSelectFileType}
                      selectFileType={selectFileType}
                      handleAddNewFile={handleAddNewFile}
                      file={file}
                      handleSaveFile={handleSaveFile}
                      triggerData={
                        getDataFromLocalStorage(SELECTED_TRIGGER)
                          ?.weatherTriggers[0]?.type !== ""
                          ? getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                              ?.weatherTriggers
                          : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                              ?.sportsTriggers[0]?.sport !== ""
                          ? getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                              ?.sportsTriggers
                          : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                              ?.vacantSlots[0]?.slotType !== ""
                          ? getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                              ?.vacantSlots
                          : {}
                      }
                      triggerType={
                        getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                          ?.weatherTriggers[0]?.type !== ""
                          ? "Weather Trigger"
                          : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                              ?.sportsTriggers[0]?.sport !== ""
                          ? "Sports Trigger"
                          : getDataFromLocalStorage(SELECTED_TRIGGER)?.[campaignId]
                              ?.vacantSlots[0]?.slotType !== ""
                          ? "Fill Vacancy Trigger"
                          : "No Trigger"
                      }
                    />
                  )}
                </div>
                <div className="border-b border-r border-1 h-100% px-4 py-2 w-1/2">
                  <h1 className="font-semibold">
                    {creativeType === "Standard"
                      ? currentPlayTimeCreative === "1"
                        ? "Day time creative"
                        : "Night Time Creative"
                      : "Trigger creative"}
                  </h1>
                  {creativeType === "Standard" ? (
                    currentPlayTimeCreative === "1" ? (
                      <ViewMediaForUploadCreatives
                        files={
                          creativeUploadData[currentCity][currentScreen]
                            ?.standardDayTimeCreatives
                        }
                        removeFile={removeFile}
                      />
                    ) : (
                      <ViewMediaForUploadCreatives
                        files={
                          creativeUploadData[currentCity][currentScreen]
                            ?.standardNightTimeCreatives
                        }
                        removeFile={removeFile}
                      />
                    )
                  ) : (
                    <ViewMediaForUploadCreatives
                      files={
                        creativeUploadData[currentCity][currentScreen]
                          ?.triggerCreatives
                      }
                      removeFile={removeFile}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
            <Footer
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              campaignId={campaignId}
              handleSave={handleSaveAndContinue}
              loading={isLoading}
              isDisabled={isLoading}
              totalScreensData={
                getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
