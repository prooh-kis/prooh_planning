import { useState } from "react";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { CheckboxInput } from "../atoms/CheckboxInput"
import { PrimaryButton } from "../atoms/PrimaryButton";
import { LinearBar } from "../../components/molecules/linearbar";
import { MapSearchInput } from "../../components/atoms/MapSearchInput";
import { PolygonShape } from "../../components/atoms/PolygonShape";


interface DrawnMapPolygonProps {
  polygons?: any;
}

export const DrawnMapPolygon = ({
  polygons,
}: DrawnMapPolygonProps) => {

console.log(polygons);
  return (
    <div className="pt-2 pb-4">
      <div className="flex justify-between pt-2">
        <h1 className="text-[20px] text-primaryText">3. Selected Locations</h1>
      </div>
      <div className="p-4 h-full grid grid-cols-3 flex justify-start items-center gap-4">
        {polygons?.map((polygon: any, i: any) => (
          <div key={i} className="h-20">
            <PolygonShape data={[polygon]} />
            <div className="flex justify-center">
              <h1 className="text-[12px]">Area {i+1}</h1>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}