import { useState, useEffect } from "react";
import { getAllSitesMonitoringData } from "../../actions/dashboardAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Checkbox, notification } from "antd";
import { List, ListItem } from "../../components/molecules/List";
import { MonitoringPic } from "../../components/segments/MonitoringPic";
import { LinearBar } from "../../components/molecules/linearbar";
import { generateMonitoringPpt, getMonitoringPptJobStatus } from "../../actions/monitoringAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { GENERATE_MONITORING_PPT_RESET, GET_MONITORING_PPT_JOB_STATUS_RESET } from "../../constants/monitoringConstant";

interface HeaderProps {
  icon: string;
  title: string;
}

const Header = ({ icon, title }: HeaderProps) => {
  return (
    <div className="bg-[#FAFAFA] text-gray-800 text-[16px] font-medium font-inter p-2 flex items-center gap-2 px-2">
      <div className="h-[26px] w-[26px] rounded-full bg-[#129BFF] flex items-center justify-center">
        <i className={`fi ${icon} text-white text-[16px] flex items-center`} />
      </div>
      <h1>{title}</h1>
    </div>
  );
};

interface Props {
  handleCancel: () => void;
  campaignId: string;
  open: string;
}

export const MonitoringPicturesAllSitesPopup = ({
  open,
  handleCancel,
  campaignId,
}: Props) => {
  const dispatch = useDispatch<any>();
  const { loading, error, data } = useSelector(
    (state: any) => state.allSitesMonitoringData
  );

  const [currentScreen, setCurrentScreen] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedTouchPoints, setSelectedTouchPoints] = useState<string[]>([]);
  const [selectedScreenTypes, setSelectedScreenTypes] = useState<string[]>([]);
  const [dataInitialized, setDataInitialized] = useState(false);
  const [pptGeneration, setPptGeneration] = useState(false);
  const [zipGeneration , setZipGeneration] = useState(false);
  const [pptJobId, setPptJobId] = useState(1);

  const generateMonitoringPPT = useSelector((state: any) => state.generateMonitoringPpt);
  const {
    loading: generateMonitoringPptLoading,
    error: generateMonitoringPptError,
    success: generateMonitoringPptSuccess,
    data: generateMonitoringPptData,
  } = generateMonitoringPPT;


  const getMonitoringPptJobStatusData = useSelector((state: any) => state.getMonitoringPptJobStatus);
  const {
    loading: pptJobStatusLoading,
    error: pptJobStatusError,
    success: pptJobStatusSuccess,
    data: pptJobStatusData,
  } = getMonitoringPptJobStatusData;

  const downloadPPT = (url: any) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'monitoring_ppt.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getJobStatusInfo = async (id : any) => {
    setTimeout(async () => {
      try {
        dispatch(getMonitoringPptJobStatus({ id: id }))
      } catch (error) {
        console.error('API call failed:', error);
      }
    }, 10000);
  }

  useEffect(() => {
    if (generateMonitoringPptSuccess) {
      console.log(generateMonitoringPptData)
      setPptJobId(Number(generateMonitoringPptData.jobId))
      setPptGeneration(true)
      getJobStatusInfo(Number(generateMonitoringPptData.jobId))
      dispatch({ type: GENERATE_MONITORING_PPT_RESET })
    }

    if (pptJobStatusSuccess) {
      if (pptJobStatusData.state === "completed") {
        setPptGeneration(false)
        downloadPPT(pptJobStatusData.result.url)
        dispatch({ type: GET_MONITORING_PPT_JOB_STATUS_RESET })
      }
      else {
        getJobStatusInfo(pptJobId)
      }
    }
  }, [generateMonitoringPptError, generateMonitoringPptSuccess, pptJobStatusSuccess, pptJobStatusError])

  useEffect(() => {
    if (data && !dataInitialized) {
      const cities = Object.keys(data.cityWiseData || {}).filter(
        (c) => c !== "all"
      );
      const touchPoints = Object.keys(data.touchPointWiseData || {}).filter(
        (t) => t !== "all"
      );
      const screenTypes = Object.keys(data.screenTypeWiseData || {}).filter(
        (s) => s !== "all"
      );

      setSelectedCities(cities);
      setSelectedTouchPoints(touchPoints);
      setSelectedScreenTypes(screenTypes);
      setCurrentScreen(data?.screenList?.[0] || "");

      setDataInitialized(true); // Mark that initial setup is done
    }
  }, [data, dataInitialized]);

  // Dispatch action with updated filters
  useEffect(() => {
    if (dataInitialized) {
      // Only when initial setup done
      dispatch(
        getAllSitesMonitoringData({
          id: campaignId,
          cities: selectedCities,
          touchPoints: selectedTouchPoints,
          screenTypes: selectedScreenTypes,
          screenName: currentScreen === "all" ? "" : currentScreen,
        })
      );
    }
  }, [
    campaignId,
    selectedCities,
    selectedTouchPoints,
    selectedScreenTypes,
    currentScreen,
    dataInitialized,
    open,
    dispatch,
  ]);

  useEffect(() => {
    if (error) notification.error(error);
  }, [error]);

  useEffect(() => {
    setDataInitialized(true);
  }, []);

  // Handle city selection
  const handleCityChange = (city: string, checked: boolean) => {
    if (checked) {
      setSelectedCities([...selectedCities, city]);
    } else {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    }
  };

  // Handle touch point selection
  const handleTouchPointChange = (touchPoint: string, checked: boolean) => {
    if (checked) {
      setSelectedTouchPoints([...selectedTouchPoints, touchPoint]);
    } else {
      setSelectedTouchPoints(
        selectedTouchPoints.filter((t) => t !== touchPoint)
      );
    }
  };

  // Handle screen type selection
  const handleScreenTypeChange = (screenType: string, checked: boolean) => {
    if (checked) {
      setSelectedScreenTypes([...selectedScreenTypes, screenType]);
    } else {
      setSelectedScreenTypes(
        selectedScreenTypes.filter((s) => s !== screenType)
      );
    }
  };

  const handleDownloadPPT = () => {
    dispatch(generateMonitoringPpt({ campaignId: campaignId }))
  }

  const handleDownloadZip = async () => {
    setZipGeneration(true);
    try {
      const res = await fetch(`https://api.justmonad.com/api/v2/monitoring/downloadMonitoringPicsZip?id=${campaignId}`);
      if (!res.ok) throw new Error('Failed to download');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'monitoring_pics.zip'; // optional: dynamic name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert("Download failed. Please try again.");
      setZipGeneration(false)
    } finally {
      setZipGeneration(false);
    }
  };

  // Toggle all cities
  const toggleAllCities = (checked: boolean) => {
    const allCities = Object.keys(data?.cityWiseData || {}).filter(
      (c) => c !== "all"
    );
    setSelectedCities(checked ? allCities : []);
  };

  // Toggle all touch points
  const toggleAllTouchPoints = (checked: boolean) => {
    const allTouchPoints = Object.keys(data?.touchPointWiseData || {}).filter(
      (t) => t !== "all"
    );
    setSelectedTouchPoints(checked ? allTouchPoints : []);
  };

  // Toggle all screen types
  const toggleAllScreenTypes = (checked: boolean) => {
    const allScreenTypes = Object.keys(data?.screenTypeWiseData || {}).filter(
      (s) => s !== "all"
    );
    setSelectedScreenTypes(checked ? allScreenTypes : []);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 font-inter">
      {(pptGeneration || zipGeneration) && (
        <div className="absolute inset-0 bg-white bg-opacity-70 z-20 flex items-center justify-center rounded-[10px]">
          <LoadingScreen title={ pptGeneration === true ? "Generating PPT, Please Wait..." : "Generating Zip , Please Wait..."} />
        </div>
      )}
      <div className="bg-[#FFFFFF] rounded-[10px] h-[80vh] w-[99%] p-4 flex flex-col">
        <div className="relative inset-0 flex items-center justify-between gap-4 py-2 pr-5">
          <div className="flex gap-2 items-center">
            <h1 className="text-[#0E212E] font-semibold text-[20px]">
              Monitoring Pictures
              <span className="text-[#B0B0B0] text-[14px] ml-2">
                ({data?.monitoringData?.length || 0} Screens)
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Download PDF Button */}
            <i
              className="fi fi-br-ppt-file text-[16px] text-[#0E212E] cursor-pointer"
              title="Download PPT"
              onClick={handleDownloadPPT}
            />

            {/* Download ZIP Button as anchor tag */}
              <i
              className="fi fi-rr-folder-download text-[16px] text-[#0E212E] cursor-pointer"
              title="Download ZIP"
              onClick={handleDownloadZip}
            />

            {/* Close Button */}
            <i
              className="fi fi-br-cross text-[14px] cursor-pointer"
              title="Close"
              onClick={handleCancel}
            />
          </div>
        </div>


        <div className="my-4 grid grid-cols-6 max-h-[65vh] gap-1">
          {/* Cities Filter */}
          <div className="border border-gray-100 rounded-[12px] col-span-1 max-h-[65vh] overflow-auto">
            <Header title={"City"} icon="fi-sr-marker" />
            <div className="px-2 py-2 flex flex-col">
              <div className="grid grid-cols-4 items-center">
                <Checkbox
                  indeterminate={
                    selectedCities.length > 0 &&
                    selectedCities.length <
                    Object.keys(data?.cityWiseData || {}).length - 1
                  }
                  onChange={(e) => toggleAllCities(e.target.checked)}
                  checked={
                    selectedCities.length ===
                    Object.keys(data?.cityWiseData || {}).length - 1
                  }
                  className="col-span-3 truncate"
                >
                  All
                </Checkbox>
                <div className="col-span-1">
                  <LinearBar
                    value={data?.cityWiseData?.all?.monitoringDelivered?.toFixed(
                      2
                    )}
                    colors={["#E4E4E4", "#129bff"]}
                    highest={data?.cityWiseData?.all?.monitoringPromised?.toFixed(
                      2
                    )}
                    percent={false}
                  />
                </div>
              </div>

              {Object.keys(data?.cityWiseData || {})
                .filter((city) => city !== "all")
                .map((city: string) => (
                  <div className="grid grid-cols-4 items-center" key={city}>
                    <Checkbox
                      checked={selectedCities.includes(city)}
                      onChange={(e) => handleCityChange(city, e.target.checked)}
                      className="col-span-3 truncate"
                    >
                      {city}
                    </Checkbox>
                    <div className="col-span-1">
                      <LinearBar
                        value={data?.cityWiseData?.[
                          city
                        ]?.monitoringDelivered?.toFixed(2)}
                        colors={["#E4E4E4", "#129bff"]}
                        highest={data?.cityWiseData?.[
                          city
                        ]?.monitoringPromised?.toFixed(2)}
                        percent={false}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Touch Points Filter */}
          <div className="border border-gray-100 rounded-[12px] col-span-1 max-h-[65vh] overflow-auto">
            <Header title={"Touch points"} icon="fi-sr-land-location" />
            <div className="px-2 py-2 flex flex-col">
              <div className="grid grid-cols-4 items-center">
                <Checkbox
                  indeterminate={
                    selectedTouchPoints.length > 0 &&
                    selectedTouchPoints.length <
                    Object.keys(data?.touchPointWiseData || {}).length - 1
                  }
                  onChange={(e) => toggleAllTouchPoints(e.target.checked)}
                  checked={
                    selectedTouchPoints.length ===
                    Object.keys(data?.touchPointWiseData || {}).length - 1
                  }
                  className="col-span-3 truncate"
                >
                  All
                </Checkbox>
                <div className="col-span-1">
                  <LinearBar
                    value={data?.cityWiseData?.all?.monitoringDelivered?.toFixed(
                      2
                    )}
                    colors={["#E4E4E4", "#129bff"]}
                    highest={data?.cityWiseData?.all?.monitoringPromised?.toFixed(
                      2
                    )}
                    percent={false}
                  />
                </div>
              </div>

              {Object.keys(data?.touchPointWiseData || {})
                .filter((tp) => tp !== "all")
                .map((tp: string) => (
                  <div className="grid grid-cols-4 items-center" key={tp}>
                    <Checkbox
                      checked={selectedTouchPoints.includes(tp)}
                      onChange={(e) =>
                        handleTouchPointChange(tp, e.target.checked)
                      }
                      className="col-span-3 truncate"
                    >
                      {tp}
                    </Checkbox>
                    <div className="col-span-1">
                      <LinearBar
                        value={data?.touchPointWiseData?.[
                          tp
                        ]?.monitoringDelivered?.toFixed(2)}
                        colors={["#E4E4E4", "#129bff"]}
                        highest={data?.touchPointWiseData?.[
                          tp
                        ]?.monitoringPromised?.toFixed(2)}
                        percent={false}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Screen Types Filter */}
          <div className="border border-gray-100 rounded-[12px] col-span-1 max-h-[65vh] overflow-auto">
            <Header title={"Screen Types"} icon="fi-sr-screen" />
            <div className="px-2 py-2 flex flex-col">
              <div className="grid grid-cols-4 items-center">
                <Checkbox
                  indeterminate={
                    selectedScreenTypes.length > 0 &&
                    selectedScreenTypes.length <
                    Object.keys(data?.screenTypeWiseData || {}).length - 1
                  }
                  onChange={(e) => toggleAllScreenTypes(e.target.checked)}
                  checked={
                    selectedScreenTypes.length ===
                    Object.keys(data?.screenTypeWiseData || {}).length - 1
                  }
                  className="col-span-3 truncate"
                >
                  All
                </Checkbox>
                <div className="col-span-1">
                  <LinearBar
                    value={data?.cityWiseData?.all?.monitoringDelivered?.toFixed(
                      2
                    )}
                    colors={["#E4E4E4", "#129bff"]}
                    highest={data?.cityWiseData?.all?.monitoringPromised?.toFixed(
                      2
                    )}
                    percent={false}
                  />
                </div>
              </div>

              {Object.keys(data?.screenTypeWiseData || {})
                .filter((screenType) => screenType !== "all")
                .map((screenType: string) => (
                  <div
                    className="grid grid-cols-4 items-center"
                    key={screenType}
                  >
                    <Checkbox
                      checked={selectedScreenTypes.includes(screenType)}
                      onChange={(e) =>
                        handleScreenTypeChange(screenType, e.target.checked)
                      }
                      className="col-span-3 truncate"
                    >
                      {screenType}
                    </Checkbox>
                    <div className="col-span-1">
                      <LinearBar
                        value={data?.screenTypeWiseData?.[
                          screenType
                        ]?.monitoringDelivered?.toFixed(2)}
                        colors={["#E4E4E4", "#129bff"]}
                        highest={data?.screenTypeWiseData?.[
                          screenType
                        ]?.monitoringPromised?.toFixed(2)}
                        percent={false}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Screen List */}
          <div className="border border-gray-100 rounded-[12px] col-span-1 max-h-[65vh] overflow-auto">
            <Header title={"Screens"} icon="fi-sr-screen" />
            <List
              items={data?.screenList || []}
              loading={loading}
              renderItem={(screenName: string, index: number) => (
                <ListItem
                  key={index}
                  item={screenName}
                  isActive={currentScreen === screenName}
                  onClick={() => setCurrentScreen(screenName)}
                  icon=""
                  text={screenName === "all" ? "All Screens" : screenName}
                />
              )}
            />
          </div>

          {/* Monitoring Pictures */}
          <div className="border border-gray-100 rounded-[12px] max-h-[65vh] overflow-auto col-span-2 px-2 py-2">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                Loading...
              </div>
            ) : error ? (
              <div className="text-red-500 p-4">
                Error loading monitoring data
              </div>
            ) : (
              <MonitoringPic
                result={
                  Array.isArray(data?.monitoringData) ? data.monitoringData : []
                }
                className="grid-cols-2"
                cardHeight="h-[200px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
