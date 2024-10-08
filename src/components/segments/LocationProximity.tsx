import { CheckboxInput } from "../atoms/CheckboxInput";
import { ExcelImport } from "../molecules/ExcelImport"
import { RouteProximity } from "../molecules/RouteProximity"
import { LinearBar } from "../molecules/linearbar";

interface LocationProximityProps {
  routes?: any;
  routeOrigin?: any;
  setRouteOrigin?: any;
  routeDestination?: any;
  setRouteDestination?: any;
  setDataBrand?: any;
  setDataComp?: any;
  allScreens?: any;
  finalSelectedScreens?: any;
  setExcelFilteredScreens?: any;
  excelFilteredScreens?: any;
  circleRadius?: any;
  handleRouteSetup?: any;
  handleRemoveRoute?: any;
  handleFinalSelectedScreens?: any;
}
export const LocationProximity = ({
  routes,
  routeOrigin,
  setRouteOrigin,
  routeDestination,
  setRouteDestination,
  setDataBrand,
  setDataComp,
  allScreens,
  finalSelectedScreens,
  setExcelFilteredScreens,
  excelFilteredScreens,
  circleRadius,
  handleRouteSetup,
  handleRemoveRoute,
  handleFinalSelectedScreens,
}: LocationProximityProps) => {
  return (
    <div className="pt-2">
    <ExcelImport
      icon="fi fi-rr-shop pl-2 text text-primaryButton flex items-center"
      text="Brand Store"
      setDataBrand={setDataBrand}
      allScreens={allScreens}
      setFilteredScreens={setExcelFilteredScreens}
      filteredScreens={excelFilteredScreens}
      circleRadius={circleRadius}
      type={"brand"}
      handleFinalSelectedScreens={handleFinalSelectedScreens}

    />
    <ExcelImport
      icon="fi fi-rr-shop pl-2 text text-red-600 flex items-center"
      text="Competitor Store"
      setDataComp={setDataComp}
      allScreens={allScreens}
      setFilteredScreens={setExcelFilteredScreens}
      filteredScreens={excelFilteredScreens}
      circleRadius={circleRadius}
      type={"comp"}
      handleFinalSelectedScreens={handleFinalSelectedScreens}
    />
    <RouteProximity
      routes={routes}
      routeOrigin={routeOrigin}
      setRouteOrigin={setRouteOrigin}
      routeDestination={routeDestination}
      setRouteDestination={setRouteDestination}
      handleRouteSetup={handleRouteSetup}
      handleRemoveRoute={handleRemoveRoute}
    />
    <div className="">
      <p className="text-[14px]">Showing Result</p>
      <div className="pb-1 grid grid-cols-12 gap-2 flex items-center">
        <div className="col-span-2">
          <CheckboxInput
            color="#52A2FF"
            label={finalSelectedScreens.length}
            checked={true}
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