import { filterScreensByInterests } from "../../utils/screenRanking";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { LinearBar } from "../../components/molecules/linearbar";
import { useState } from "react";
import { SelectManuallyScreensCheckBox } from "./SelectManuallyScreensCheckBox";

interface POIProximityProps {
  pois?: any;
  selectedPOIs?: any;
  allScreens?: any;
  setSelectedPOIs?: any;
  setPOIFilteredScreens?: any;
  finalSelectedScreens?: any;
  selectedScreensFromMap: any;
  handleConfirmScreensSelections: any;
  handleSelectFromMap?: any;
}

export const POIProximity = ({
  pois,
  selectedPOIs,
  allScreens,
  setSelectedPOIs,
  setPOIFilteredScreens,
  finalSelectedScreens,
  selectedScreensFromMap,
  handleConfirmScreensSelections,
  handleSelectFromMap
}: POIProximityProps) => {
  // Split pois into two equal parts
  const middleIndex = Math.ceil(pois?.length / 2);
  const firstColumnPois = pois?.slice(0, middleIndex);
  const secondColumnPois = pois?.slice(middleIndex);

  return (
    <div className="pt-2 w-full">
      <h1 className="text-[20px] truncate pb-2">
        Select sites with most POI exposure
      </h1>
      <div className="h-[35vh] overflow-scroll">
        <div className="grid grid-cols-2 gap-4">
          {/* First column */}
          <div>
            {firstColumnPois?.map((poi: any, index: any) => (
              <div key={index} className="pt-1">
                <CheckboxInput
                  onChange={() => {
                    if (selectedPOIs.includes(poi)) {
                      setSelectedPOIs(selectedPOIs.filter((p: any) => p !== poi));
                    } else {
                      setSelectedPOIs([...selectedPOIs, poi]);
                    }
                  }}
                  checked={selectedPOIs.includes(poi) ? true : false}
                  label={poi}
                />
              </div>
            ))}
          </div>
          {/* Second column */}
          <div>
            {secondColumnPois?.map((poi: any, index: any) => (
              <div key={index} className="pt-1">
                <CheckboxInput
                  onChange={() => {
                    if (selectedPOIs.includes(poi)) {
                      setSelectedPOIs(selectedPOIs.filter((p: any) => p !== poi));
                    } else {
                      setSelectedPOIs([...selectedPOIs, poi]);
                    }
                  }}
                  checked={selectedPOIs.includes(poi) ? true : false}
                  label={poi}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-2">
        <h1 className="text-[14px] font-semibold">Showing Results Below</h1>
        <div className="pt-1">
          <div className="pt-2">
            <h2 className="text-[12px] font-semibold">Atleast One</h2>
            <p className="text-[12px] text-[#9f9f9f]">
              These {filterScreensByInterests(finalSelectedScreens, selectedPOIs).screensWithAnyInterest.length} locations have been shortlisted even if anyone of the
              filters above are matched
            </p>
            <div className="pt-1 grid grid-cols-12 gap-2 flex items-center">
              <div className="col-span-2">
                <CheckboxInput
                  color="#52A2FF"
                  label={
                    filterScreensByInterests(finalSelectedScreens, selectedPOIs)
                      .screensWithAnyInterest.length
                  }
                  onChange={(checked) => {
                    if (checked) {
                      setPOIFilteredScreens(
                        filterScreensByInterests(
                          finalSelectedScreens,
                          selectedPOIs
                        ).screensWithAnyInterest
                      );
                    }
                    handleConfirmScreensSelections({
                      checked, screens: filterScreensByInterests(
                      finalSelectedScreens,
                      selectedPOIs
                    ).screensWithAnyInterest});
                  }}
                />
              </div>
              <div className="col-span-8">
                <LinearBar
                  value={
                    (filterScreensByInterests(
                      finalSelectedScreens,
                      selectedPOIs
                    ).screensWithAnyInterest.length *
                      100) /
                    allScreens.length
                  }
                  colors={["#F3F3F3", "#7AB3A2"]}
                />
              </div>
              <p className="col-span-2 text-[12px] text-semibold flex justify-end truncate">
                {allScreens?.length} Sites
              </p>
            </div>
          </div>
          <SelectManuallyScreensCheckBox
            manuallySelected={selectedScreensFromMap?.length}
            unselectedScreen={allScreens?.length - finalSelectedScreens?.length}
            handleCheck={(checked: any) => {
              allScreens?.filter((s: any) => !finalSelectedScreens?.map((sc: any) => sc._id)?.includes(s._id))?.forEach((sd: any) => {
                handleSelectFromMap(sd)
              })
            }}
          />
        </div>
      </div>
    </div>
  );
};
