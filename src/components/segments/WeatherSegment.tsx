import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { RadioInput } from "../../components/atoms/RadioInput";
import { OpenBudgetSegment } from "./OpenBudgetSegment";

interface WeatherSegmentProps {
  currentTab?: any;
}

export const WeatherSegment = ({ currentTab }: WeatherSegmentProps) => {
  return (
    <div className="pt-5">
      {currentTab === 1 ? (
        <div>
          <div className="border rounded-md flex justify-between p-4">
            <div className="flex gap-2">
              <i className="fi fi-tr-summer flex items-center"></i>
              <h1>Play my ad when temperature is</h1>
            </div>
            <div className="flex justify-start gap-4 py-1">
            </div>
          </div>
          <OpenBudgetSegment />
          <div className="flex justify-between">
            <div>
              <h1>View Use Cases</h1>
              <p></p>
            </div>
            <PrimaryButton />
          </div>
        </div>
      ) : currentTab === 2 ? (
        <div>
          <div className="border rounded-md flex justify-between p-4">
            <div className="flex gap-2">
              <i className="fi fi-tr-summer flex items-center"></i>
              <h1>Play my ad as per rain forecast</h1>
            </div>
            <div className="flex justify-start gap-4 py-1">
              <RadioInput
                title="Cloudy"
                value={"cloudy"}
                // isChecked={selectedBuyingOption === "regular" ? true : false}
                onChange={() => {}}
              />
              <RadioInput
                title="Drizzle"
                value={"drizzle"}
                // isChecked={selectedBuyingOption === "cohort" ? true : false}
                onChange={() => {}}
              />
              <RadioInput
                title="Heavy"
                value={"heavy"}
                // isChecked={selectedBuyingOption === "cohort" ? true : false}
                onChange={() => {}}
              />
            </div>
          </div>
          <OpenBudgetSegment />
          <div className="flex justify-between">
            <div>
              <h1>View Use Cases</h1>
              <p></p>
            </div>
            <PrimaryButton />
          </div>
        </div>
      ) : currentTab === 3 ? (
        <div>
          <div className="border rounded-md flex justify-between p-4">
            <div className="flex gap-2">
              <i className="fi fi-tr-summer flex items-center"></i>
              <h1>Play my ad as per rain forecast</h1>
            </div>
            <div className="flex justify-start gap-4 py-1">
              <RadioInput
                title="Good"
                value={"cloudy"}
                // isChecked={selectedBuyingOption === "regular" ? true : false}
                onChange={() => {}}
              />
              <RadioInput
                title="Moderate"
                value={"drizzle"}
                // isChecked={selectedBuyingOption === "cohort" ? true : false}
                onChange={() => {}}
              />
              <RadioInput
                title="Severe"
                value={"heavy"}
                // isChecked={selectedBuyingOption === "cohort" ? true : false}
                onChange={() => {}}
              />
            </div>
          </div>
          <OpenBudgetSegment />
          <div className="flex justify-between">
            <div>
              <h1>View Use Cases</h1>
              <p></p>
            </div>
            <PrimaryButton />
          </div>
        </div>
      ) : null}

    </div>
  )
}