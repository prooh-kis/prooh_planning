import { filterScreensByInterests } from "../../utils/screenRanking";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { LinearBar } from "../../components/molecules/linearbar";
import { useEffect, useState } from "react";
import { SelectManuallyScreensCheckBox } from "./SelectManuallyScreensCheckBox";
import { Tooltip } from "antd";

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

  const [checked1, setChecked1] = useState<any>(false);
  const [checked2, setChecked2] = useState<any>(false);
  const [screensForPOIFilters, setScreensForPOIFilters] = useState<any>(filterScreensByInterests(finalSelectedScreens, selectedPOIs).screensWithAnyInterest)

  console.log(checked1, "1 checked", selectedPOIs?.length);
  console.log(checked2, "2 checked", selectedPOIs?.length);
  console.log("selected", selectedPOIs)
  console.log("selected length", selectedPOIs.length);

  useEffect(() => {
    // setScreensForPOIFilters(filterScreensByInterests(screensForPOIFilters, selectedPOIs).screensWithAnyInterest);
  },[]);
  console.log(finalSelectedScreens, "ootioieieo");
  console.log(screensForPOIFilters, "assfklsfks");

  return (
    <div className="pt-2 w-full">
      <div className="flex justify-start items-center gap-2 pb-4">
        <h1 className="text-[14px] text-gray-500 truncate">
          Select sites with most POI exposure
        </h1>
        <Tooltip
            title="Click to deselect and select your desired POIs and get screens located in the proximity of those POIs"
            >
          <i className="fi fi-rs-info text-[14px] text-gray-400 flex justify-center items-center"></i>
        </Tooltip>
        <h1 className="text-[14px] text-blue-500">({selectedPOIs?.length})</h1>
      </div>

      <div className="h-[48vh] overflow-scroll">
        <div className="grid grid-cols-2 gap-4">
          {/* First column */}
          <div className="col-span-1">
            {firstColumnPois?.map((poi: any, index: any) => (
              <div key={index} className="py-1">
                <div className={
                  `
                  border rounded-[10px] relative p-4
                   ${selectedPOIs.includes(poi) ? "border border-blue-500" : ""}
                  `
                }
                onClick={() => {
                  setChecked1(false);
                  setChecked2(false);
                  if (selectedPOIs.includes(poi)) {
                    setSelectedPOIs(selectedPOIs.filter((p: any) => p !== poi));
                  } else {
                    setSelectedPOIs([...selectedPOIs, poi]);
                  }
                }}
                >
                  {selectedPOIs?.includes(poi) && (
                    <i className={
                      `
                      text-red-400
                      absolute right-0 top-0 z-1 fi fi-br-cross-circle flex justify-end
                      `
                    }
                    ></i>
                  )}
                  <div className="flex justify-center items-center">
                    <h1 className="text-[14px] truncate">{poi}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Second column */}
          <div className="col-span-1">
            {secondColumnPois?.map((poi: any, index: any) => (
              <div key={index} className="py-1">
                <div className={
                  `
                  border rounded-[10px] relative p-4
                   ${selectedPOIs.includes(poi) ? "border border-blue-500" : ""}
                  `
                }
                  onClick={() => {
                    setChecked1(false);
                    setChecked2(false);
                    if (selectedPOIs.includes(poi)) {
                      setSelectedPOIs(selectedPOIs.filter((p: any) => p !== poi));
                    } else {
                      setSelectedPOIs([...selectedPOIs, poi]);
                    }
                  }}
                >
                  {selectedPOIs?.includes(poi) && (
                    <i className={
                      `
                      text-red-400
                      absolute right-0 top-0 z-1 fi fi-br-cross-circle flex justify-end
                      `
                    }
                    ></i>
                  )}
                  <div className="flex justify-center items-center">
                    <h1 className="text-[14px] truncate">{poi}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-2">
        <div className="flex justify-start items-center gap-2">
          <h1 className="text-[14px] font-semibold">Showing Results Below</h1>
        </div>
        <div className="pt-1">
          <div className="pt-2">
            <div className="flex justify-start items-center gap-2">
              <h2 className="text-[12px] font-semibold">Atleast One</h2>
              <Tooltip
                title="Check to select all the screens having any one POI in the proximity"
                >
                  <i className="fi fi-rs-info text-[12px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>

            <p className="text-[12px] text-[#9f9f9f]">
              These {filterScreensByInterests(screensForPOIFilters, selectedPOIs).screensWithAnyInterest.length} locations have been shortlisted even if anyone of the
              filters above are matched
            </p>
            <div className="pt-1 grid grid-cols-12 gap-2 flex items-center">
              <div className="col-span-2">
                <CheckboxInput
                  color="#52A2FF"
                  label={
                    filterScreensByInterests(screensForPOIFilters, selectedPOIs)
                      .screensWithAnyInterest.length
                  }
                  onChange={(checked) => {
                    setChecked1(checked);
                    console.log(screensForPOIFilters);
                    if (checked) {
                      setPOIFilteredScreens(
                        filterScreensByInterests(
                          screensForPOIFilters,
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
                  checked={checked1}
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
          <div className="">
            <SelectManuallyScreensCheckBox
              manuallySelected={selectedScreensFromMap?.length}
              unselectedScreen={allScreens?.length - finalSelectedScreens?.length}
              handleCheck={(checked: any) => {
                setChecked2(checked);
           
                allScreens?.filter((s: any) => !finalSelectedScreens?.map((sc: any) => sc._id)?.includes(s._id))?.forEach((sd: any) => {
                  handleSelectFromMap(checked, sd)
                })
              }}
              checked={checked2}
            />
          </div>
   
        </div>
      </div>
    </div>
  );
};
