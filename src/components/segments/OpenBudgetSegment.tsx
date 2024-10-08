import { RadioInput } from "../../components/atoms/RadioInput"

export const OpenBudgetSegment = () => {
  return (
    <div className="rounded-md p-2">
      <div className="pt-4">
        <h1>Allow open budget to occupy slot space in a loop</h1>
        <div className="flex justify-start gap-4 py-2">
          <RadioInput
            title="once"
            value={"Once"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="twice"
            value={"Twice"}
            // isChecked={selectedBuyingOption === "cohort" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="thrice"
            value={"Thrice"}
            // isChecked={selectedBuyingOption === "cohort" ? true : false}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="pt-4">
        <h1>Kindly approve maximum budget for this trigger</h1>
        <div className="flex justify-start gap-4 py-2">
          <RadioInput
            title="1,00,000"
            value={"100000"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="1,50,000"
            value={"150000"}
            // isChecked={selectedBuyingOption === "cohort" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="2,00,000"
            value={"200000"}
            // isChecked={selectedBuyingOption === "cohort" ? true : false}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}