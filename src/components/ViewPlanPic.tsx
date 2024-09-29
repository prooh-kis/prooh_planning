import { screens } from "../utils/hardCoddedData";
import React from "react";

function Screen({ screen }: any) {
  return (
    <div className="p-2 hover:shadow-xl rounded-md">
      <img src={screen?.images[0]} alt="" className="h-64 w-72 rounded-md" />

      <h1 className="py-2 text-sm ">{screen?.screenName}</h1>
      <h1 className="text-sm text-gray-400">
        {(screen.location.city, screen.location.state, screen.location.country)}
      </h1>
    </div>
  );
}

export function ViewPlanPic() {
  return (
    <div className="flex flex-wrap gap-4 overflow-scroll h-[70vh]">
      {screens?.map((screen, index) => (
        <Screen key={index} screen={screen} />
      ))}
    </div>
  );
}
