import { Tooltip } from "antd";
import { DrawnMapPolygon } from "../../components/molecules/DrawnMapPolygon";
import { CheckboxInput } from "../atoms/CheckboxInput";
import { ExcelImport } from "../molecules/ExcelImport"
import { RouteProximity } from "../molecules/RouteProximity"
import { LinearBar } from "../molecules/linearbar";
import { POIProximity } from "./POIProximity";
import { useState } from "react";

interface LocationProximityProps {
  userLocation?: any;
  setUserLocation?: any;
  routes?: any;
  routeOrigin?: any;
  setRouteOrigin?: any;
  routeDestination?: any;
  setRouteDestination?: any;
  setDataBrand?: any;
  setDataComp?: any;
  dataBrand?: any;
  dataComp?: any;
  allScreens?: any;
  finalSelectedScreens?: any;
  setExcelFilteredScreens?: any;
  excelFilteredScreens?: any;
  circleRadius?: any;
  handleRouteSetup?: any;
  handleRemoveRoute?: any;
  handleFinalSelectedScreens?: any;
  polygons?: any;
  setPolygons?: any;
  routeFilteredScreens?: any;
  pois?: any;
  selectedPOIs?: any;
  setSelectedPOIs?: any;
  setPOIFilteredScreens?: any;
  selectedScreensFromMap?: any;
  handleSelectFromMap?: any;
  handleConfirmScreensSelections?: any;
}
export const LocationProximity = ({
  userLocation,
  setUserLocation,
  routes,
  routeOrigin,
  setRouteOrigin,
  routeDestination,
  setRouteDestination,
  setDataBrand,
  setDataComp,
  dataBrand,
  dataComp,
  allScreens,
  finalSelectedScreens,
  setExcelFilteredScreens,
  excelFilteredScreens,
  circleRadius,
  handleRouteSetup,
  handleRemoveRoute,
  handleFinalSelectedScreens,
  polygons,
  setPolygons,
  routeFilteredScreens,
  pois,
  selectedPOIs,
  setSelectedPOIs,
  setPOIFilteredScreens,
  selectedScreensFromMap,
  handleSelectFromMap,
  handleConfirmScreensSelections,
}: LocationProximityProps) => {

  const [open, setOpen] = useState<any>({
    "excel": false,
    "route": false,
    "polygon": false,
    "poi": false,
  });
  return (
    <div className="pt-2 h-full">
      <div className="h-[60vh] overflow-scroll no-scrollbar">

      <ExcelImport
        open={open}
        setOpen={setOpen}
        icon="fi fi-rr-shop pl-2 text text-primaryButton flex items-center"
        text="Stores"
        setDataBrand={setDataBrand}
        setDataComp={setDataComp}
        dataBrand={dataBrand}
        dataComp={dataComp}
        allScreens={allScreens}
        setFilteredScreens={setExcelFilteredScreens}
        filteredScreens={excelFilteredScreens}
        circleRadius={circleRadius}
        type={["brand", "comp"]}
        handleFinalSelectedScreens={handleFinalSelectedScreens}

      />
      <RouteProximity
        open={open}
        setOpen={setOpen}
        userLocation={userLocation}
        setUserLocation={userLocation}
        routeFilteredScreens={routeFilteredScreens}
        routes={routes}
        routeOrigin={routeOrigin}
        setRouteOrigin={setRouteOrigin}
        routeDestination={routeDestination}
        setRouteDestination={setRouteDestination}
        handleRouteSetup={handleRouteSetup}
        handleRemoveRoute={handleRemoveRoute}
      />
      <DrawnMapPolygon
        open={open}
        setOpen={setOpen}
        polygons={polygons}
        setPolygons={setPolygons}
      />
      <POIProximity
        open={open}
        setOpen={setOpen}
        pois={pois}
        selectedPOIs={selectedPOIs}
        setSelectedPOIs={setSelectedPOIs}
        setPOIFilteredScreens={setPOIFilteredScreens}
        allScreens={allScreens}
        finalSelectedScreens={finalSelectedScreens}
        selectedScreensFromMap={selectedScreensFromMap}
        handleSelectFromMap={handleSelectFromMap}
        handleConfirmScreensSelections={handleConfirmScreensSelections}
      />
    </div>

    <div className="pt-2">
      <div className="flex justify-start gap-2">
        <h1 className="lg:text-[16px] text-[14px] font-semibold">Showing Results Below</h1>
        <Tooltip
            title="Only showing unique screens from all the above filters selected"
            >
          <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
        </Tooltip>
      </div>

      <div className="pb-1 grid grid-cols-12 gap-2 flex items-center">
        <div className="col-span-2">
          <CheckboxInput
            color="#52A2FF"
            label={finalSelectedScreens.length}
            checked={true}
            disabled
            onChange={() => {}}
          />
        </div>
        <div className="col-span-8">
          <LinearBar value={(finalSelectedScreens.length * 100 / (allScreens.length))?.toFixed(2)} colors={["#F3F3F3", "#7AB3A2"]} />
        </div>
        <p className="col-span-2 text-[12px] text-semibold flex justify-end truncate">{allScreens?.length} Sites</p>
      </div>
    </div>
  </div>
  )
}