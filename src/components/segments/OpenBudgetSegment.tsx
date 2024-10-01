import { PrimaryInput } from "../../components/atoms/PrimaryInput"
import { RadioInput } from "../../components/atoms/RadioInput"

export const OpenBudgetSegment = () => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between">
        <div className="">
          <h1>Allow open budget to occupy</h1>
          <p>Additional cost of slots will be same as normal slot price</p>
        </div>
        <div className="flex justify-start gap-4 py-1">
          <RadioInput
            title="25%"
            value={"25"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="33%"
            value={"33"}
            // isChecked={selectedBuyingOption === "cohort" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="50%"
            value={"50"}
            // isChecked={selectedBuyingOption === "cohort" ? true : false}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <h1>Maximum budget permitted</h1>
        <PrimaryInput
          inputType="text"
          placeholder="Client Name"
          value={"clientName"}
          action={() => {}}
        />
      </div>
    </div>
  )
}