import { useEffect, useState } from "react";
import { RadioInput } from "../atoms/RadioInput";
import { VerticalLine } from "../molecules/VerticalLine";
import {
  RegularCohortSlotsCampaignTable,
  RegularCohortSummaryTable,
} from "../tables";
import { useDispatch, useSelector } from "react-redux";
import { getRegularVsCohortPriceData, getScreenSummaryData } from "../../actions/screenAction";
import { getAllLocalStorageData, getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { Footer } from "../../components/footer";
import { message } from "antd";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { useLocation } from "react-router-dom";

export const RegularCohortComparisonDetails = ({setCurrentStep, step}: any) => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [isDisabled, setIsDisabled] = useState<any>(true);

  const [showSummary, setShowSummary] = useState<any>(null);
  const [screenIds, setScreenIds] = useState<any>(JSON.parse(getAllLocalStorageData()["selectedScreensId"] || "[]") || []);
  const [cohorts, setCohorts] = useState<any>(JSON.parse(getAllLocalStorageData()["selectedAudienceTouchpoints"] || "{}").cohorts || []);
  const [gender, setGender] = useState<any>(JSON.parse(getAllLocalStorageData()["selectedAudienceTouchpoints"] || "{}").gender || "both");
  const [duration, setDuration] = useState<any>(JSON.parse(getAllLocalStorageData()["selectedAudienceTouchpoints"] || "{}").duration || 30);

  const [selectedBuyingOption, setSelectedBuyingOption] =
    useState<any>("Regular");


  const regularVsCohortPriceDataGet = useSelector((state: any) => state.regularVsCohortPriceDataGet);
  const {
    loading: loadingPriceData,
    error: errorPriceData,
    data: priceData,
  } = regularVsCohortPriceDataGet;
  
  useEffect(() => {
    if (priceData) {
      saveDataOnLocalStorage(
        "regularVsCohortPriceData",
        priceData
      );
    }


  },[priceData])

  useEffect(() => {
 
    if (!priceData) {
      dispatch(getRegularVsCohortPriceData({
        screenIds: screenIds,
        cohorts: cohorts,
        gender: gender,
        duration: duration,
      }));
    }

  },[priceData, cohorts, dispatch, duration, gender, screenIds])

  
  const handleRegularVsCohortSelection = (type: any) => {
    setSelectedBuyingOption(type);
    setShowSummary(null);
    setIsDisabled(false);

    const oldData = getDataFromLocalStorage("costSummary");
    oldData["3"] = priceData[type]?.tableData;
    const campaign = getDataFromLocalStorage("campaign");
    campaign.basicDetails["regularVsCohort"] = type;
    saveDataOnLocalStorage("campaign", campaign);
    saveDataOnLocalStorage("costSummary", oldData);
    // dispatch(getScreenSummaryData({
    //   id: pathname.split("/").splice(-1)[0],
    //   type: type
    // }));
  }
  return (
    <div className="w-full pt-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Compare Plan
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose between a Regular Slots Campaign or a customize your slots with
          cohort data
        </p>
      </div>
      {loadingPriceData ? (
        <h1>Loading...</h1>
      ) : errorPriceData ? (
        <p>Error: {errorPriceData}</p>
      ) : (
        <div className="flex gap-2">
          <div className="ml-[-25px] pt-6">
            <VerticalLine height="120px" color="#B5B5B5" thickness="1px" />
            <h1 className="py-4">vs</h1>
            <VerticalLine height="100px" color="#B5B5B5" thickness="1px" />
          </div>
          <div className="w-full">
            <div className="py-2">
              <h1 className="py-2">Regular slots per day buying</h1>
              <RegularCohortSlotsCampaignTable
                priceData={priceData?.regular}
                setShowSummary={setShowSummary}
                type="regular"
                showSummary={showSummary}
              />
              {showSummary === "regular" && (
                
                <RegularCohortSummaryTable 
                  type="regular"
                  touchPointData={priceData?.regular?.touchPointData}
                />
              )}
              
            </div>
            <div className="py-2">
              <h1 className="py-2">Cohort slots per day buying</h1>
              <RegularCohortSlotsCampaignTable
                type="cohort"
                priceData={priceData?.cohort}
                setShowSummary={setShowSummary}
                showSummary={showSummary}
              />
              {showSummary === "cohort" && (
                <RegularCohortSummaryTable
                  type="cohort" 
                  touchPointData={priceData?.cohort?.touchPointData}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start gap-4 pt-1">
        <RadioInput
          title="Regular Slots Per Day"
          value={"regular"}
          isChecked={selectedBuyingOption === "regular" ? true : false}
          onChange={() => {
            handleRegularVsCohortSelection("regular");
          }}
        />
        <RadioInput
          title="Cohort Slots Per Day"
          value={"cohort"}
          isChecked={selectedBuyingOption === "cohort" ? true : false}
          onChange={() => {
            handleRegularVsCohortSelection("cohort");
          }}
        />
      </div>
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            if (isDisabled) {
              message.error("Please  confirm screen selection");
            } else {
              dispatch(addDetailsToCreateCampaign({
                pageName: "Compare Plan Page",
                id: pathname.split("/").splice(-1)[0],
                regularTouchPointWiseSlotDetails: priceData?.regular?.touchPointData,
                cohortTouchPointWiseSlotDetails: priceData?.cohort?.touchPointData,
                selectedType: selectedBuyingOption
              }));
              setCurrentStep(step + 1);
            };
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};
