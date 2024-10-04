import { filterScreensByInterests } from "../../utils/screenRanking";
import { CheckboxInput } from "../../components/atoms/CheckboxInput"
import { LinearBar } from "../../components/molecules/linearbar"
import { useState } from "react";

interface POIProximityProps {
  pois?: any;
  selectedPOIs?: any;
  allScreens?: any;
  setSelectedPOIs?: any;
  setPOIFilteredScreens?: any;
  finalSelectedScreens?: any;
  handlePOIScreens?: any;
}
export const POIProximity = ({
  pois,
  selectedPOIs,
  allScreens,
  setSelectedPOIs,
  setPOIFilteredScreens,
  finalSelectedScreens,
  handlePOIScreens,
}: POIProximityProps) => {

  const [manuallySelected, setManuallySelected] = useState<any>([]);

  // console.log(filterScreensByInterests(finalSelectedScreens, selectedPOIs))
  return (
    <div className="pt-2">
    <h1 className="text-[20px] truncate pb-2">
      Select sites with most POI exposure
    </h1>
    <div className="h-[30vh] overflow-scroll">
      {pois?.map((poi: any, index: any) => (
        <div key={index} className="pt-1">
          <CheckboxInput
            onChange={() => {
              if (selectedPOIs.includes(poi)) {
                setSelectedPOIs(selectedPOIs.filter((p: any) => p !== poi))
              } else {
                setSelectedPOIs([...selectedPOIs, poi])
              }
              handlePOIScreens();
            }}
            checked={
              selectedPOIs.includes(poi) ? true : false
            }
            label={poi}
          />
        </div>
      ))}
    </div>
    <div className="pt-2">
      <h1 className="text-[14px] font-semibold">Showing Results Below</h1>
      <div className="pt-1">
        <div className="pt-2">
          <h2 className="text-[12px] font-semibold">Atleast One</h2>
          <p className="text-[12px] text-[#9f9f9f]">These 20 locations have been shortlisted even if anyone of the filters above are matched</p>
          <div className="pt-1 grid grid-cols-12 gap-2 flex items-center">
            <div className="col-span-2">
              <CheckboxInput
                color="#52A2FF"
                checked={true}
                label={
                  filterScreensByInterests(
                    finalSelectedScreens,
                    selectedPOIs
                  ).screensWithAnyInterest.length
                }
                onChange={(checked) => {
                  if (checked) {
                    setPOIFilteredScreens(
                      filterScreensByInterests(
                      finalSelectedScreens,
                      selectedPOIs
                    ).screensWithAnyInterest)
                  }
                }}
              />
            </div>
            <div className="col-span-8">
              <LinearBar
                value={
                  filterScreensByInterests(
                    finalSelectedScreens,
                    selectedPOIs
                  ).screensWithAnyInterest.length * 100 / allScreens.length
                }
                colors={["#F3F3F3", "#7AB3A2"]}
              />
            </div>
            <p className="col-span-2 text-[12px] text-semibold flex justify-end truncate">{allScreens?.length} Sites</p>
          </div>
        </div>
        <div className="pt-2">
          <h2 className="text-[12px] font-semibold">Manually Selected</h2>
          <p className="text-[12px] text-[#9f9f9f]">Select manually all the screens you need to select from unselected screens</p>
          <div className="pt-1 grid grid-cols-12 gap-2 flex items-center">
            <div className="col-span-2">
              <CheckboxInput color="#52A2FF" label={manuallySelected.length} onChange={() => {}}/>
            </div>
            <div className="col-span-8">
              <LinearBar value={manuallySelected.length * 100 / allScreens.length} colors={["#F3F3F3", "#7AB3A2"]} />
            </div>
            <p className="col-span-2 text-[12px] text-semibold flex justify-end truncate">{allScreens?.length} Sites</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}