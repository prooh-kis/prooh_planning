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
  setPolygonFilteredScreens?: any;
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
  routeDataCache?: any;
  setRouteDataCache?: any;
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
  setPolygonFilteredScreens,
  routeFilteredScreens,
  setCircleRadius,
  circleRadius,
  setRouteRadius,
  routeRadius,
  handleConfirmScreensSelections,
  setRouteFilteredScreens,
  setRoutes,
  routeDataCache,
  setRouteDataCache,
}: LocationProximityProps) => {
  const [open, setOpen] = useState<any>({
    excel: true,
    route: true,
    polygon: true,
    poi: true,
  });

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className={`overflow-y-auto px-1 h-[calc(100%-150px)]`}>
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
          // handleFinalSelectedScreens={handleFinalSelectedScreens}
          setCircleRadius={setCircleRadius}
          circleRadius={circleRadius}
        />
        <RouteProximity
          open={open}
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
          setRoutes={setRoutes}
          setRouteDataCache={setRouteDataCache}
          props={polygonFilteredScreens}
        />
        <DrawnMapPolygon
          open={open}
          setOpen={setOpen}
          polygons={polygons}
          setPolygons={setPolygons}
          polygonFilteredScreens={polygonFilteredScreens}
          // setPolygonFilteredScreens={setPolygonFilteredScreens}
          allScreens={allScreens}
          handleFinalSelectedScreens={handleFinalSelectedScreens}
        />
      </div>
      
      <div className="border-b mr-2" />

      <div className="py-2 pr-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-medium text-gray-700">
              Showing Results
            </h1>
            <Tooltip title="Only showing unique screens from all the above filters selected">
              <i className="fi fi-rs-info text-xs text-gray-400"></i>
            </Tooltip>
          </div>
          
        </div>
        <div className="grid grid-cols-12 flex items-center gap-4">
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
            <LinearBar
              value={(
                (finalSelectedScreens.length * 100) /
                allScreens.length
              )?.toFixed(2)}
              colors={["#F3F3F3", "#7AB3A2"]}
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <p className="text-xs font-medium text-gray-700">
              {finalSelectedScreens.length} of {allScreens?.length} Sites
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-b mr-2" />

      <div className="flex items-center justify-start py-2">
        <CheckboxInput
          label={
            <p>
              Confirm and take{" "}
              <span className=" font-bold">
                {`${finalSelectedScreens.length} Sites Out of ${allScreens.length} Sites `}
              </span>{" "}
              for my plan
            </p>
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
