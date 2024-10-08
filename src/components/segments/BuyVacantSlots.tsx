import { RadioInput } from "../../components/atoms/RadioInput";

interface BuyVacantSlotsProps {
  currentTab?: any;
}
export const BuyVacantSlots = ({}: BuyVacantSlotsProps) => {

  const times = [
    {
      label: "Morning",
      value: "morning",
    },{
      label: "Afternoon",
      value: "afternoon",
    },{
      label: "Evening",
      value: "evening",
    },{
      label: "Night",
      value: "night",
    }
  ]
 
  return (
    <div className="py-4 border-b">
      <h1 className="py-2 text-[14px]">Choose time</h1>
      {times?.map((t: any, index: any) => (
        <div key={index}>
          <RadioInput 
            title={t.label}
            value={t.value}
            onChange={() => {}}
          />
        </div>

      ))}
      
    </div>
  )}