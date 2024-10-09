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

export const CreativeUploadDetails = ({
  setCurrentStep,
  step,
}: CreativeUploadDetailsProps) => {
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
  const [data, setData] = useState<any>(null);
  const [citiesCreative, setCitiesCreative] = useState<any>([]);

  console.log("data : ", data);

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

  const screenDataUploadCreative = useSelector(
    (state: any) => state.screenDataUploadCreative
  );
  const {
    loading: loadingCost,
    error: errorScreeData,
    data: screenData,
  } = screenDataUploadCreative;

  const handleSaveFile = () => {
    if (file) {
      const myData = data;
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
      setData(myData);
    } else {
      message.error("Please select file to save!");
    }
  };

  const removeFile = (url: string) => {
    const myData = data;
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
    setData(myData);
    setIsDeleted((pre: boolean) => !pre);
  };

  const handleSelectCurrentTab = (id: string) => {
    setCurrentTab(id);
    let city = citiesCreative?.find((data: any) => data.id == id)?.label || "";
    setCurrentCity(city);
  };

  const handleSetInitialData = (data: any) => {
    let arr = Object.keys(data);
    let result = arr?.map((value: string, index: number) => {
      return {
        id: `${index + 1}`,
        label: value,
        params: [20, 10],
      };
    });
    setCitiesCreative(result);
    let city = result?.find((data: any) => data.id == "1")?.label || "";
    setCurrentCity(city);
  };

  // const creativeSchema = new mongoose.Schema({
  //   screenResolution: { type: String, default: "" },
  //   screenCount: { type: Number, default: 0 },
  //   creativeDuration: { type: Number, default: 0 },
  //   standardDayTimeCreatives: { type: [creativeInfoSchema], default: [] },
  //   standardNightTimeCreatives: { type: [creativeInfoSchema], default: [] },
  //   triggerDayTimeCreatives: { type: [creativeInfoSchema], default: [] },
  //   triggerNightTimeCreatives: { type: [creativeInfoSchema], default: [] },
  // });

  useEffect(() => {
    if (screenData) {
      handleSetInitialData(screenData);
      const result: any = {};
      for (let city in screenData) {
        if (result[city] === undefined) {
          result[city] = [];
        }
        for (let data of screenData[city]) {
          result[city].push({
            screenResolution: data.resolution,
            screenCount: data.count,
            creativeDuration: data.duration,
            standardDayTimeCreatives: [],
            standardNightTimeCreatives: [],
            triggerCreatives: [],
          });
        }
      }
      setData(result);
    }
    if (errorScreeData) {
      message.error(errorScreeData);
    }
  }, [screenData]);

  useEffect(() => {
    dispatch(
      getScreenDataUploadCreativeData({
        id: pathname?.split("/").splice(-1)[0],
      })
    );
  }, [pathname?.split("/").splice(-1)[0]]);

  return (
    <>
      {currentCity === "" ? null : (
        <div className="w-full py-3">
          <div>
            <h1 className="text-2xl font-semibold">Upload Creative</h1>
            <h1 className="text-sm text-gray-500 ">
              Upload your creatives for the campaigns for your selected screens
            </h1>
          </div>
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
                {data[currentCity]?.map((singleData: any, index: number) => {
                  return (
                    <div
                      title="click to select row"
                      className={index === currentScreen ? "bg-blue-100" : ""}
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
                })}
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
                        {currentPlayTimeCreative === "1" ? (
                          <UploadCreativeForStandardCampaign
                            handleSelectFileType={handleSelectFileType}
                            selectFileType={selectFileType}
                            handleAddNewFile={handleAddNewFile}
                            file={file}
                            handleSaveFile={handleSaveFile}
                            removeFile={() => setFIle(null)}
                          />
                        ) : (
                          <UploadCreativeForStandardCampaign
                            handleSelectFileType={handleSelectFileType}
                            selectFileType={selectFileType}
                            handleAddNewFile={handleAddNewFile}
                            file={file}
                            handleSaveFile={handleSaveFile}
                            removeFile={() => setFIle(null)}
                          />
                        )}
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
                          data[currentCity][currentScreen]
                            ?.standardDayTimeCreatives
                        }
                        removeFile={removeFile}
                      />
                    ) : (
                      <ViewMediaForUploadCreatives
                        files={
                          data[currentCity][currentScreen]
                            ?.standardNightTimeCreatives
                        }
                        removeFile={removeFile}
                      />
                    )
                  ) : (
                    <ViewMediaForUploadCreatives
                      files={data[currentCity][currentScreen]?.triggerCreatives}
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
                setCurrentStep(step + 1);
              }}
              totalScreensData={{}}
            />
          </div>
        </div>
      )}
    </>
  );
};
