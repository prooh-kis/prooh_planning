import { message } from "antd";
import { RadioInput } from "../../components/atoms/RadioInput"

export const OpenBudgetSegment = ({ setDisableApply, triggerSelected, totalCost, selectedBudget, selectedSOV, setSelectedBudget, setSelectedSOV }: any) => {
  return (
    <div className="rounded-md px-2">
      <div className="pt-2">
        <h1>Allow open budget to occupy slot space in a loop</h1>
        <div className="flex justify-start gap-4 py-2 cursor-pointer"
          onClick={() => {
            if (triggerSelected) {
              setDisableApply(false);
            } else {
              message.info("Please select a trigger first to continue or skip...")
            }
          }}
        >
          <RadioInput
            title="1/18"
            value={"1"}
            isChecked={selectedSOV === 1 ? true : false}
            onChange={() => {
              setSelectedSOV(1);
              setSelectedBudget(`${Number(0.01 * totalCost).toFixed(0)}`);
            }}
          />
          <RadioInput
            title="2/18"
            value={"2"}
            isChecked={selectedSOV === 2 ? true : false}
            onChange={() => {
              setSelectedSOV(2);
              setSelectedBudget(`${Number(0.01 * totalCost).toFixed(0)}`);
            }}
          />
          <RadioInput
            title="3/18"
            value={"3"}
            isChecked={selectedSOV === 3 ? true : false}
            onChange={() => {
              setSelectedSOV(3);
              setSelectedBudget(`${Number(0.01 * totalCost).toFixed(0)}`);
            }}
          />
        </div>
      </div>
      <div className="pt-2">
        <h1>Kindly approve maximum budget for this trigger</h1>
        <div className="cursor-pointer flex justify-start gap-4 py-2 truncate"
          onClick={() => {
            if (triggerSelected) {
              setDisableApply(false);
            } else {
              message.info("Please select a trigger first to continue or skip...")
            }
          }}
        >
          <div className="flex gap-1 items-center truncate">
            <RadioInput
              title="1%"
              value={"1"}
              isChecked={Number(selectedBudget).toFixed(0) === `${Number(0.01 * totalCost).toFixed(0)}` ? true : false}
              onChange={() => setSelectedBudget(`${Number(0.01 * totalCost).toFixed(0)}`)}
            />
            <p className="text-[12px] text-gray-500">
              (&#8377;{(0.01 * totalCost).toFixed(0)})
            </p>
          </div>
          <div className="flex gap-1 items-center truncate">
            <RadioInput
              title="2%"
              value={"2"}
              isChecked={Number(selectedBudget).toFixed(0) === `${Number(0.02 * totalCost).toFixed(0)}`? true : false}
              onChange={() => setSelectedBudget(`${Number(0.02 * totalCost).toFixed(0)}`)}
            />
            <p className="text-[12px] text-gray-500">
              (&#8377;{(0.02 * totalCost).toFixed(0)})
            </p>
          </div>
          <div className="flex gap-1 items-center truncate">
            <RadioInput
              title="3%"
              value={"3"}
              isChecked={Number(selectedBudget).toFixed(0) === `${Number(0.03 * totalCost).toFixed(0)}` ? true : false}
              onChange={() => setSelectedBudget(`${Number(0.03 * totalCost).toFixed(0)}`)}
            />
            <p className="text-[12px] text-gray-500">
              (&#8377;{(0.03 * totalCost).toFixed(0)})
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}