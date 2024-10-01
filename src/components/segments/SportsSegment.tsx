import { MatchTable } from "../../components/tables/MatchTable";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { RadioInput } from "../../components/atoms/RadioInput";

interface SportsSegmentProps {
  currentTab?: any;
}
export const SportsSegment = ({ }: SportsSegmentProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <DropdownInput />
        <DropdownInput />
        <DropdownInput />
      </div>
      <div>
        <MatchTable />
      </div>
      <div className="border rounded">
        <h1>Choose a condition</h1>
        <div className="flex gap-2">
          <RadioInput
            title="Hits 6"
            value={"sixer"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="Hits 4"
            value={"four"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="Scores 100"
            value={"century"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="Scores 50"
            value={"halfCentury"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="Bowls Out"
            value={"bowlsOut"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="During Batting"
            value={"batting"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="During Bowling"
            value={"bowling"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
          <RadioInput
            title="Takes Catch"
            value={"catching"}
            // isChecked={selectedBuyingOption === "regular" ? true : false}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  )}