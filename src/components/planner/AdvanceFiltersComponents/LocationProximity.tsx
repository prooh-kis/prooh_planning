import { Tooltip } from "antd";
import { LinearBar } from "../../molecules/linearbar";
import { CheckboxInput } from "../../atoms/CheckboxInput";
import { DrawnMapPolygon } from "../../molecules/DrawnMapPolygon";
import { ExcelImport } from "../../molecules/ExcelImport";
import { RouteProximity } from "../../molecules/RouteProximity";
import { useEffect, useRef, useState } from "react";

interface LocationProximityProps {
  allScreens?: any;
  finalSelectedScreens?: any;
  userLocation?: any;
  excelFilteredScreens?: any;
  setExcelFilteredScreens?: any;
  setExcelData?: any;
  excelData?: any;
  setDataBrand?: any;
  setDataComp?: any;
  circleRadius?: any;
  setCircleRadius?: any;
  routeFilteredScreens?: any;
  setRouteFilteredScreens?: any;
  setRouteDataCache?: any;
  routeRadius?: any;
  setRouteRadius?: any;
  routes?: any;
  setRoutes?: any;
  polygonFilteredScreens?: any;
  polygons?: any;
  setPolygons?: any;
  handleConfirmScreensSelections?: any;
  isDisabled?: any;
}
export const LocationProximity = ({
  allScreens,
  finalSelectedScreens,
  userLocation,
  excelFilteredScreens,
  setExcelFilteredScreens,
  setExcelData,
  excelData,
  setDataBrand,
  setDataComp,
  circleRadius,
  setCircleRadius,
  routeFilteredScreens,
  setRouteFilteredScreens,
  setRouteDataCache,
  routeRadius,
  setRouteRadius,
  routes,
  setRoutes,
  polygonFilteredScreens,
  polygons,
  setPolygons,
  handleConfirmScreensSelections,
  isDisabled,
}: LocationProximityProps) => {
  const wrapperRef = useRef<any>(null);
  
  const [open, setOpen] = useState<any>({
    excel: true,
    route: true,
    polygon: true,
    poi: true,
  });

  const [routeOrigin, setRouteOrigin] = useState<any>([]);
  const [routeDestination, setRouteDestination] = useState<any>([]);

  const [showScreensList, setShowScreensList] = useState<any>(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowScreensList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          setCircleData={setExcelData}
          circleData={excelData}
          allScreens={allScreens}
          setExcelFilteredScreens={setExcelFilteredScreens}
          excelFilteredScreens={excelFilteredScreens}
          type={["brand", "comp"]}
          // campaignD={handleFinalSelectedScreens}
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
          setRouteFilteredScreens={setRouteFilteredScreens}
          routes={routes}
          routeOrigin={routeOrigin}
          setRouteOrigin={setRouteOrigin}
          routeDestination={routeDestination}
          setRouteDestination={setRouteDestination}
          setRoutes={setRoutes}
          setRouteDataCache={setRouteDataCache}
        />
        <DrawnMapPolygon
          open={open}
          setOpen={setOpen}
          polygons={polygons}
          setPolygons={setPolygons}
          polygonFilteredScreens={polygonFilteredScreens}
          allScreens={allScreens}
        />
      </div>
      
      <div className="border-b mr-2" />

      <div className="py-2 pr-4">
        <div className="relative flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-medium text-gray-700">
              Showing Results
            </h1>
            <Tooltip title="Final filtered Screens" placement="bottom">
              <i className="fi fi-rs-info text-xs text-gray-400 flex items-center cursor-pointer" onClick={() => setShowScreensList(true)}></i>
            </Tooltip>
          </div>
          {showScreensList && (
            <div
              ref={wrapperRef}
              className="absolute bottom-6 left-0 z-10 bg-white shadow-lg rounded-md p-2 w-64"
            >
              <div className="max-h-60 overflow-y-auto">
                {finalSelectedScreens?.length > 0 ? (
                  finalSelectedScreens.map((screen: any, i: number) => (
                    <div
                      key={screen?._id}
                      className={`flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer`}
                    >
                      <span className="text-[10px] truncate block">{i+1}. {screen.screenName}</span>
                      <i className="fi fi-rs-check text-xs text-[#4DB37E] flex items-center" />
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No screens found</div>
                )}
              </div>
            </div>
          )}
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
          checked={!isDisabled}
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
