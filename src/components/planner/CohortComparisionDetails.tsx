import { useState } from "react";
import { RadioInput } from "../../components/atoms/RadioInput"
import { VerticalLine } from "../../components/molecules/VerticalLine"
import { CohortSlotsCampaignTable, RegularSlotsCampaignTable } from "../../components/tables"

export const CohortComparisionDetails = (props: any) => {
  const [selectedBuyingOption, setSelectedBuyingOption] = useState<any>("Regular");

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Compare Plan
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose between a Regular Slots Campaign or a customize your slots with cohort data
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
            <RegularSlotsCampaignTable />
          </div>
          <div>
            <h1>Cohort slots per day buying</h1>
            <CohortSlotsCampaignTable />
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
  )
}