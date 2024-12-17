import { useState } from "react";
import { RadioInput } from "../../components/atoms/RadioInput";

interface BuyVacantSlotsProps {
  condition?: any;
  setCondition?: any;
}
export const BuyVacantSlots = ({condition, setCondition}: BuyVacantSlotsProps) => {

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
      <h1 className="py-2 md:text-[16px] sm:text-[14px]">Choose desired time for using vacant slots for your campaign</h1>
      {times?.map((t: any, index: any) => (
        <div key={index}>
          <RadioInput 
            title={t.label}
            value={t.value}
            isChecked={condition === t.value ? true : false}
            onChange={() => setCondition(t.value)}
          />
        </div>

      ))}
      
    </div>
  )}