import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { AddCampaignDetails } from "../popup/AddCampaignDetails";
import { EventCalender } from "../../components/popup/EventCalender";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import {
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_SELECTION,
} from "../../constants/localStorageConstants";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { getScreenSummaryData } from "../../actions/screenAction";

interface IKnowItAllProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  pathname?: string;
  campaignId?: any;
}

export const IKnowItAll = ({
  setCurrentStep,
  step,
  userInfo,
  pathname,
  campaignId,
}: IKnowItAllProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [idCampaign, setCampaignId] = useState<any>(campaignId || "");

  const [isOpen, setIsOpen] = useState<boolean>(campaignId ? false : true);
  const [currentSummaryTab, setCurrentSummaryTab] = useState<any>("1");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [citiesCreative, setCitiesCreative] = useState<any>([]);

  const [screensBuyingCount, setScreensBuyingCount] = useState<any>(
    getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
  );

  const [showSummary, setShowSummary] = useState<any>(null);

  const [listView, setListView] = useState<any>(true);
  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});

  const screenSummaryDataGet = useSelector(
    (state: any) => state.screenSummaryDataGet
  );
  const {
    loading: loadingScreenSummary,
    error: errorScreenSummary,
    data: screenSummaryData,
  } = screenSummaryDataGet;

  const handleSelectCurrentTab = (id: string) => {
    setCurrentSummaryTab(id);
    let city = citiesCreative?.find((data: any) => data.id == id)?.label || "";
    setCurrentCity(city);
  };

  const getTabValue = (screenSummaryData: any) => {
    if (screenSummaryData)
      return Object.keys(screenSummaryData).map((s: any, index: any) => {
        return {
          id: `${index + 1}`,
          label: s,
          params:
            getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] !==
            null
              ? [
                  Object.values(
                    getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[
                      campaignId
                    ]?.[s]
                  )
                    ?.map((f: any) => f.status)
                    ?.filter((s: any) => s === true).length,
                  Object.values(
                    getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[
                      campaignId
                    ]?.[s]
                  )
                    ?.map((f: any) => f.status)
                    ?.filter((s: any) => s === false).length,
                ]
              : [0, 0],
        };
      });
    else return [];
  };

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleOpenModel = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  useEffect(() => {
    dispatch(
      getScreenSummaryData({
        id: campaignId,
        type: "Regular",
      })
    );

    // if (screenSummaryData) {
    //   dispatch(
    //     getScreenSummaryPlanTableData({
    //       id: campaignId,
    //       screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
    //     })
    //   );
    // }
  }, [dispatch]);

  console.log(campaignId);
  return (
    <div className="w-full py-3">
      <AddCampaignDetails
        handleCancel={handleCancel}
        open={isOpen}
        userInfo={userInfo}
        setCurrentStep={setCurrentStep}
        step={step}
        campaignId={idCampaign}
        setCampaignId={setCampaignId}
        router="iknowitallplan"
      />
      <h1 className="text-[24px] text-primaryText font-semibold">
        Select Screens
      </h1>
      <div className="py-2 flex justify-between">
        <div className="">
          {screenSummaryData && screensBuyingCount && (
            <TabWithoutIcon
              currentTab={currentSummaryTab}
              setCurrentTab={handleSelectCurrentTab}
              tabData={getTabValue(screenSummaryData)}
            />
          )}
        </div>
        <div className="flex gap-2">
          <div className="px-1 border rounded flex items-center gap-1 ">
            <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
            <p className="text-[12px]">&#8377;200 - &#8377;400</p>
          </div>
          <div className="px-1 border rounded flex items-center gap-1">
            <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
            <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
            <p className="text-[12px]">&#8377;400 - &#8377;600</p>
          </div>
          <div
            className={`px-1 border rounded flex items-center gap-1 ${
              listView && "border-primaryButton"
            }`}
            onClick={() => setListView(true)}
          >
            <i
              className={`fi fi-rr-table-list flex items-center
                text-[12px]
                ${listView && "text-primaryButton"}`}
            ></i>
            <p className={`${listView && "text-primaryButton"} text-[12px]`}>
              List View
            </p>
          </div>
          <div
            className={`px-1 border rounded flex items-center gap-1 ${
              !listView && "border-primaryButton"
            }`}
            onClick={() => setListView(false)}
          >
            <i
              className={`fi fi-sr-apps flex items-center
                text-[12px]
                ${!listView && "text-primaryButton"}`}
            ></i>
            <p className={`${!listView && "text-primaryButton"} text-[12px]`}>
              Grid View
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
