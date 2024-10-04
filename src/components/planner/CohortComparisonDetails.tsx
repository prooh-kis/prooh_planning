import { useEffect, useState } from "react";
import { RadioInput } from "../atoms/RadioInput";
import { VerticalLine } from "../molecules/VerticalLine";
import {
  RegularCohortSlotsCampaignTable,
  RegularCohortSummaryTable,
} from "../tables";
import { useDispatch, useSelector } from "react-redux";
import { getRegularVsCohortPriceData } from "../../actions/screenAction";

export const CohortComparisonDetails = (props: any) => {

  const dispatch = useDispatch<any>();

  const [showSummary, setShowSummary] = useState(null);

  const [audience, setAudience] = useState<any>([
    "Working Professionals-A",
    "Working Professionals-B",
    "Entrepreneurs",
    "Gen-Zs"
  ]);
  const [gender, setGender] = useState<any>("both");
  const [duration, setDuration] = useState<any>(30);
  const [screenIds, setScreenIds] = useState<any>([
    "66f7bb44d2829e146ff82aeb",
    "66f7bb44d2829e146ff82aec",
    "66f7bb44d2829e146ff82aed",
    "66f7bb44d2829e146ff82b1c",
    "66f7bb44d2829e146ff82b0b"
  ]);

  const [selectedBuyingOption, setSelectedBuyingOption] =
    useState<any>("Regular");

  const regularVsCohortPriceDataGet = useSelector((state: any) => state.regularVsCohortPriceDataGet);
  const {
    loading: loadingPriceData,
    error: errorPriceData,
    data: priceData,
  } = regularVsCohortPriceDataGet;

  useEffect(() => {
    dispatch(getRegularVsCohortPriceData({
      cohorts: audience,
      gender: gender,
      duration: duration,
      screenIds: screenIds,
    }));
  },[dispatch])
  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Compare Plan
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose between a Regular Slots Campaign or a customize your slots with
          cohort data
        </p>
      </div>
      <div className="flex gap-2">
        <div className="ml-[-25px] py-2">
          <VerticalLine height="100px" color="#B5B5B5" thickness="1px" />
          <h1>vs</h1>
          <VerticalLine height="100px" color="#B5B5B5" thickness="1px" />
        </div>
        <div className="w-full">
          <div>
            <h1>Regular slots per day buying</h1>
            <RegularCohortSlotsCampaignTable
              priceData={priceData?.regular}
              setShowSummary={setShowSummary}
              type="regular"
              showSummary={showSummary}
            />
            {showSummary === "regular" && (
              
              <RegularCohortSummaryTable 
                touchPointData={priceData?.regular.touchPointData}
              />
            )}
            
          </div>
          <div>
            <h1>Cohort slots per day buying</h1>
            <RegularCohortSlotsCampaignTable
              type="cohort"
              priceData={priceData?.cohort}
              setShowSummary={setShowSummary}
              showSummary={showSummary}
            />
            {showSummary === "cohort" && (
               <RegularCohortSummaryTable 
               touchPointData={priceData?.cohort.touchPointData}
             />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-start gap-4 py-1">
        <RadioInput
          title="Regular Slots Per Day"
          value={"regular"}
          isChecked={selectedBuyingOption === "regular" ? true : false}
          onChange={() => {}}
        />
        <RadioInput
          title="Cohort Slots Per Day"
          value={"cohort"}
          isChecked={selectedBuyingOption === "cohort" ? true : false}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};
