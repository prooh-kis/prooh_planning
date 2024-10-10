import { RadioInput } from "../../components/atoms/RadioInput"

export const OpenBudgetSegment = ({ selectedBudget, selectedSOV, setSelectedBudget, setSelectedSOV }: any) => {
  return (
    <div className="rounded-md p-2">
      <div className="pt-4">
        <h1>Allow open budget to occupy slot space in a loop</h1>
        <div className="flex justify-start gap-4 py-2">
          <RadioInput
            title="Once"
            value={"once"}
            isChecked={selectedSOV === 1 ? true : false}
            onChange={() => setSelectedSOV(1)}
          />
          <RadioInput
            title="Twice"
            value={"twice"}
            isChecked={selectedSOV === 2 ? true : false}
            onChange={() => setSelectedSOV(2)}
          />
          <RadioInput
            title="Thrice"
            value={"thrice"}
            isChecked={selectedSOV === 3 ? true : false}
            onChange={() => setSelectedSOV(3)}
          />
        </div>
      </div>
      <div className="pt-4">
        <h1>Kindly approve maximum budget for this trigger</h1>
        <div className="flex justify-start gap-4 py-2">
          <RadioInput
            title="1,00,000"
            value={"100000"}
            isChecked={selectedBudget === "100000" ? true : false}
            onChange={() => setSelectedBudget("100000")}
          />
          <RadioInput
            title="1,50,000"
            value={"150000"}
            isChecked={selectedBudget === "150000" ? true : false}
            onChange={() => setSelectedBudget("150000")}
          />
          <RadioInput
            title="2,00,000"
            value={"200000"}
            isChecked={selectedBudget === "200000" ? true : false}
            onChange={() => setSelectedBudget("200000")}
          />
        </div>
      </div>
    </div>
  )
}