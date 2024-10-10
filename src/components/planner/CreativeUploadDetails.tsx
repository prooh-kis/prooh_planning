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
import { useSelector } from "react-redux";
import { getScreenDataUploadCreativeData } from "../../actions/screenAction";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Footer } from "../../components/footer";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";

interface CreativeUploadDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
}
interface SingleFile {
  file: File;
  url: string;
  fileType: string;
  fileSize: number;
  duration: number;
  awsURl: string;
}
interface Data1 {
  screenResolution: string;
  screenCount: number;
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

  console.log("data : ", creativeUploadData);

  const screenDataUploadCreative = useSelector(
    (state: any) => state.screenDataUploadCreative
  );
  const {
    loading: loadingCost,
    error: errorScreeData,
    data: screenData,
  } = screenDataUploadCreative;

  console.log(screenData);
  const handleSetCreativeType = (e: RadioChangeEvent) => {
    setCreativeType(e.target.value);
  };

  const handleSelectFileType = (e: any) => {
    setSelectFileType(e.target.value);
  };

  const handleAddNewFile = async (file: File) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const ff = {
        file: file,
        url: fileURL,
        fileType: file.type,
        fileSize: file.size,
        duration: "10",
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
      setCreativeUploadData(myData);
      let citiesCreativeData = citiesCreative.map((data: any) => {
        if (data.label === currentCity) {
          data.params[0] += myData[currentCity][currentScreen]?.screenCount;
        }
        return data;
      });
      setCitiesCreative(citiesCreativeData);
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
    setCreativeUploadData(myData);
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
    // let url = "";
    // if (file) url = await getAWSUrl(file);
    return {
      url: file.url,
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

  const handleSaveAndNext = async () => {
    if (validate()) {
      setIsLoading(true);
      let requestBody: any = [];
      for (let city in creativeUploadData) {
        for (let data of creativeUploadData[city]) {
          let standardDayTimeCreatives: any = [];
          let standardNightTimeCreatives: any = [];
          let triggerCreatives: any = [];

          for (let file of data?.standardDayTimeCreatives) {
            standardDayTimeCreatives.push(await returnRequiredValue(file));
          }
          for (let file of data?.standardNightTimeCreatives) {
            standardNightTimeCreatives.push(await returnRequiredValue(file));
          }
          for (let file of data?.triggerCreatives) {
            triggerCreatives.push(await returnRequiredValue(file));
          }
          requestBody.push({
            screenResolution: data?.screenResolution,
            screenCount: data?.screenCount,
            creativeDuration: data?.creativeDuration,
            standardDayTimeCreatives: standardDayTimeCreatives,
            standardNightTimeCreatives: standardNightTimeCreatives,
            triggerCreatives: triggerCreatives,
          });
        }
      }
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Upload Creative Page",
          id: pathname.split("/").splice(-1)[0],
          creatives: requestBody,
        })
      );

      console.log("requestBody : ", requestBody);
    } else {
      message.error("Please upload creatives for each row and foreach city");
    }
  };

  useEffect(() => {
    dispatch(
      getScreenDataUploadCreativeData({
        id: pathname?.split("/").splice(-1)[0],
      })
    );
  }, [dispatch, pathname]);

  useEffect(() => {
    if (screenData) {
      handleSetInitialData(screenData);
      const result: any = {};
      for (let city in screenData) {
        console.log(city);
        if (result[city] === undefined) {
          result[city] = [];
        }
        console.log(screenData[city]);
        for (let data in screenData[city]) {
          result[city].push({
            screenResolution: screenData[city][data].resolution,
            screenCount: screenData[city][data].count,
            creativeDuration: screenData[city][data].duration,
            standardDayTimeCreatives: [],
            standardNightTimeCreatives: [],
            triggerCreatives: [],
          });
        }
      }
      setCreativeUploadData(result);
    }
    if (errorScreeData) {
      message.error(errorScreeData);
    }
  }, [errorScreeData, screenData]);

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-2xl font-semibold">Upload Creative</h1>
        <h1 className="text-sm text-gray-500 ">
          Upload your creatives for the campaigns for your selected screens
        </h1>
      </div>
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
                  Resolution
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
                            ? "bg-green-200"
                            : !(
                                index === currentScreen ||
                                isCreativeUploaded(index)
                              )
                            ? "bg-red-100"
                            : isCreativeUploaded(index)
                            ? "bg-green-100"
                            : "bg-red-200"
                        }
                        key={index}
                        onClick={() => setCurrentScreen(index)}
                      >
                        <div className="flex">
                          <h1 className="border border-1 p-2 w-24 text-center ">
                            {singleData?.screenCount}
                          </h1>
                          <h1 className="border border-1 p-2 w-24 text-center ">
                            {singleData?.creativeDuration}
                          </h1>
                          <h1 className="border border-1 p-2 w-48 text-center ">
                            {singleData?.screenResolution}
                          </h1>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="border border-1 h-100% px-2 py-1 w-72">
                <Radio.Group
                  onChange={handleSetCreativeType}
                  value={creativeType}
                  className="text-xl"
                >
                  <Space direction="vertical">
                    <Radio value={"Standard"}>Standard</Radio>
                    <Radio value={"Trigger"}>Trigger</Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className="flex border border-1 h-100% w-full">
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
                    />
                  )}
                </div>
                <div className="border border-1 h-100% px-4 py-2 w-1/2">
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
              handleSave={() => {
                handleSaveAndNext();
                // setCurrentStep(step + 1);
              }}
              loading={isLoading}
              totalScreensData={{}}
            />
          </div>
        </div>
      )}
    </div>
  );
};
