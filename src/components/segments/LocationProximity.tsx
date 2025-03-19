import { Tooltip } from "antd";
import { DrawnMapPolygon } from "../../components/molecules/DrawnMapPolygon";
import { CheckboxInput } from "../atoms/CheckboxInput";
// import { ExcelImport } from "../molecules/ExcelImport copy";
import { ExcelImport } from "../molecules/ExcelImport";
import { RouteProximity } from "../molecules/RouteProximity";
import { LinearBar } from "../molecules/linearbar";
import { POIProximity } from "./POIProximity";
import { useState } from "react";

interface LocationProximityProps {
  setCircleRadius?: any;
  circleRadius?: any;
  setRouteRadius?: any;
  routeRadius?: any;
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
  setCircleData?: any;
  allScreens?: any;
  finalSelectedScreens?: any;
  setExcelFilteredScreens?: any;
  excelFilteredScreens?: any;
  handleRouteSetup?: any;
  handleRemoveRoute?: any;
  handleFinalSelectedScreens?: any;
  setDraw?: any;
  polygons?: any;
  setPolygons?: any;
  polygonFilteredScreens?: any;
  setDrawingMode?: any;
  routeFilteredScreens?: any;
  pois?: any;
  selectedPOIs?: any;
  setSelectedPOIs?: any;
  setPOIFilteredScreens?: any;
  selectedScreensFromMap?: any;
  handleSelectFromMap?: any;
  handleConfirmScreensSelections?: any;
  setRoutes?: any;
  setRouteFilteredScreens?: any;
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
  setCircleData,
  allScreens,
  finalSelectedScreens,
  setExcelFilteredScreens,
  excelFilteredScreens,
  handleFinalSelectedScreens,
  setDraw,
  polygons,
  setPolygons,
  polygonFilteredScreens,
  routeFilteredScreens,
  setCircleRadius,
  circleRadius,
  setRouteRadius,
  routeRadius,
  handleConfirmScreensSelections,
  setRouteFilteredScreens,
  setRoutes,
}: LocationProximityProps) => {
  const [open, setOpen] = useState<any>({
    excel: true,
    route: true,
    polygon: true,
    poi: true,
  });

  return (
    <div className="h-auto">
      <div className="h-[55vh] lg:h-[55vh] overflow-scroll scrollbar-minimal">
        <ExcelImport
          open={open}
          setOpen={setOpen}
          icon="fi fi-rr-shop pl-2 text text-primaryButton flex items-center"
          text="Stores"
          setDataBrand={setDataBrand}
          setDataComp={setDataComp}
          setCircleData={setCircleData}
          allScreens={allScreens}
          setExcelFilteredScreens={setExcelFilteredScreens}
          excelFilteredScreens={excelFilteredScreens}
          type={["brand", "comp"]}
          handleFinalSelectedScreens={handleFinalSelectedScreens}
          setCircleRadius={setCircleRadius}
          circleRadius={circleRadius}
        />
        <RouteProximity
          open={open}
          setOpen={setOpen}
          routeRadius={routeRadius}
          setRouteRadius={setRouteRadius}
          userLocation={userLocation}
          setUserLocation={userLocation}
          routeFilteredScreens={routeFilteredScreens}
          routes={routes}
          routeOrigin={routeOrigin}
          setRouteOrigin={setRouteOrigin}
          routeDestination={routeDestination}
          setRouteDestination={setRouteDestination}
          handleFinalSelectedScreens={handleFinalSelectedScreens}
          setRoutes={setRoutes}
          setRouteFilteredScreens={setRouteFilteredScreens}
        />
        <DrawnMapPolygon
          open={open}
          setOpen={setOpen}
          polygons={polygons}
          setPolygons={setPolygons}
          polygonFilteredScreens={polygonFilteredScreens}
          allScreens={allScreens}
          handleFinalSelectedScreens={handleFinalSelectedScreens}
        />
        {/* <POIProximity
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
        /> */}
      </div>
      <div className="flex justify-start gap-2 pt-2">
        <h1 className="lg:text-[16px] text-[14px] font-semibold">
          Showing Results Below
        </h1>
        <Tooltip title="Only showing unique screens from all the above filters selected">
          <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
        </Tooltip>
      </div>

      <div className="grid grid-cols-12 gap-2 flex items-center pt-2">
        <div className="col-span-1">
          <CheckboxInput
            color="#52A2FF"
            label={finalSelectedScreens.length}
            checked={true}
            disabled
            onChange={() => {}}
          />
        </div>
        <div className="col-span-10">
          <LinearBar
            value={(
              (finalSelectedScreens.length * 100) /
              allScreens.length
            )?.toFixed(2)}
            colors={["#F3F3F3", "#7AB3A2"]}
          />
        </div>
        <p className="col-span-1 text-[12px] text-semibold flex justify-end truncate">
          {allScreens?.length} Sites
        </p>
      </div>
      <div className="flex items-center pt-4">
        <CheckboxInput
          label={
            <>
              Confirm and take{" "}
              <span className=" font-bold">
                {`${finalSelectedScreens.length} Sites Out of ${allScreens.length} Sites `}
              </span>{" "}
              for my plan
            </>
          }
          onChange={(e) => {
            handleConfirmScreensSelections({
              checked: e,
              screens: finalSelectedScreens,
            });
          }}
        />
      </div>
    </div>
  );
};
