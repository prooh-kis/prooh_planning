import React from "react";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { LinearBar } from "../../components/molecules/linearbar";

export const SelectManuallyScreensCheckBox = ({
  manuallySelected,
  unselectedScreen,
  handleCheck,
}: any) => {
  return (
    <div className="pt-2">
      <h2 className="text-[12px] font-semibold">Manually Selected</h2>
      <p className="text-[12px] text-[#9f9f9f]">
        Select manually all the screens you need to select from unselected
        screens
      </p>
      <div className="pt-1 grid grid-cols-12 gap-2 flex items-center">
        <div className="col-span-2">
          <CheckboxInput
            color="#52A2FF"
            label={manuallySelected}
            // checked={manuallySelected > 0 ? true : false}
            onChange={handleCheck}
          />
        </div>
        <div className="col-span-8">
          <LinearBar
            value={(manuallySelected * 100) / unselectedScreen}
            colors={["#F3F3F3", "#7AB3A2"]}
          />
        </div>
        <p className="col-span-2 text-[12px] text-semibold flex justify-end truncate">
          {unselectedScreen} Sites
        </p>
      </div>
    </div>
  );
};
