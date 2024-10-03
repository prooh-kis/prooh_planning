import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton"
import { useNavigate } from "react-router-dom";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { RouteProximity } from "../../components/segments/RouteProximity";
import { MapWithGeometry } from "../../components/molecules/MapWithGeometry";
import * as turf from "@turf/turf";
import { ExcelImport } from "../../components/molecules/ExcelImport";
import { LinearBar } from "../../components/molecules/linearbar";
import { getAllLocalStorageData } from "../../utils/localStorageUtils";

type Coordinate = [number, number];

interface AdvanceFiltersDetails {
  step?: any;
  setCurrentStep?: any;
  mapData?: any;
  loading?: boolean;
  error?: any;
}

export const AdvanceFiltersDetails = ({ mapData, step, setCurrentStep, loading, error }: AdvanceFiltersDetails) => {
  const navigate = useNavigate();

  const [storeFilter, setStoreFilter] = useState<any>(true);

  const [circleRadius, setCircleRadius] = useState<any>(1);
  const [routes, setRoutes] = useState<any[]>([]);

  const [routeOrigin, setRouteOrigin] = useState<any>([]);
  const [routeDestination, setRouteDestination] = useState<any>([]);

  const [allScreens, setAllScreens] = useState<any>([]);
  const [excelFilteredScreens, setExcelFilteredScreens] = useState<any>([]);
  const [routeFilteredScreens, setRouteFilteredScreens] = useState<any>([]);
  const [unSelectedScreens, setUnSelectedScreens] = useState<any>([]);
  const [circleData, setCircleData] = useState<any>({});
  const [finalSelectedScreens, setFinalSelectedScreens] = useState<any>([]);

  const [dataBrand, setDataBrand] = useState<any[]>([]);
  const [dataComp, setDataComp] = useState<any[]>([]);
  
  const [pois, setPOIs] = useState<any[]>([]);

  const getUniqueScreens = (data: any) => {
    const uniqueScreens = new Set();
    data.forEach((location: any) => {
      location.screens.forEach((screen: any) => {
        uniqueScreens.add(screen);
      });
    });
    let result = Array.from(uniqueScreens);
   
    return result;
  };

  const getMapData = useCallback((myData: any) => {
    setAllScreens(myData.screens);
    const data: any = {
      "brand": [],
      "comp": [],
    }
    data["brand"].push(dataBrand);
    data["comp"].push(dataComp);
    setCircleData(data)
  },[dataBrand, dataComp])

  const handleFinalSelectedScreens = ({type, screens}: any) => {

    console.log(screens);
    const mySelectedScreens = finalSelectedScreens;
    const uniqueScreens = getUniqueScreens([{screens}]);

    if (type === "add") {
      console.log("adding value", uniqueScreens)
      setFinalSelectedScreens(uniqueScreens);

    } else if (type === "remove") {
      console.log("removing value");
      setFinalSelectedScreens(finalSelectedScreens.filter((fs: any) => !uniqueScreens.map((s: any) => s._id).includes(fs._id)));
    } 
    console.log('adasdsadasdasd', finalSelectedScreens)
  }

  useEffect(() => {
    if (getAllLocalStorageData()) {
      getMapData(JSON.parse(getAllLocalStorageData()["advanceFilterScreensMapData"]))
      setPOIs(JSON.parse(getAllLocalStorageData()["advanceFilterScreensMapData"]).poiList)
    }
  }, [getMapData]);

  useEffect(() => {

    if (excelFilteredScreens.length === 0 && routeFilteredScreens.length === 0) {
      handleFinalSelectedScreens({
        type: "add",
        screens: JSON.parse(getAllLocalStorageData()["advanceFilterScreensMapData"]).screens
      })
    }
  }, []);

  const handleRemoveRoute = (id: any) => {
    let arr = routes;
    console.log(arr);
    for (let data of arr) {
      if (data?.id === id) {
        setRouteFilteredScreens(routeFilteredScreens?.filter((rf: any) => !data.selectedScreens.map((s: any) => s._id).includes(rf._id)))
        handleFinalSelectedScreens({
          type: "remove",
          screens: data.selectedScreens
        });
      }
    }
    arr = arr.filter((data: any) => data?.id != id);
    setRoutes(arr);
  };
  
  const handleRouteSetup = async (originData: any, destinationData: any) => {
    let route: any = {};

    route["origin"] = originData[0];
    route["destination"] = destinationData[0];
    route["selectedScreens"] = [];
    route["id"] = routes?.length + 1;

    if (routes.includes(route)) {
    } else {
      routes.push(route);
    }

    setRoutes([...routes]);
  };

  const handleRouteData = (routeData: any, id: any) => {
    const radiusInMeters = 1000; // 1000 meters radius
    const filteredRecords = allScreens?.filter((point: any) => {
      let x: Coordinate = [point.location.geographicalLocation.longitude, point.location.geographicalLocation.latitude];
      return routeData?.coordinates.some((coord: Coordinate) => {
        const from = turf.point([Number(coord[0]), Number(coord[1])]);
        const to = turf.point(x);
        const distance = turf.distance(from, to, { units: "meters" });
        return distance <= radiusInMeters; // Convert meters to kilometers
      });
    });
    let arr = routes;
    const screens: any = routeFilteredScreens;
    for (let data of arr) {
      if (data?.id === id) {
        data.selectedScreens = filteredRecords;
        filteredRecords.map((f: any) => {
          if (!screens.map((s: any) => s._id).includes(f._id)) {
            screens.push(f);
          }
        });
      }
    }
    setRouteFilteredScreens(screens);
    setRoutes(arr);
    handleFinalSelectedScreens({
      type: "add",
      screens: filteredRecords
    });

    // handleSetFIlter4(arr);
  };

  
  return (
    <div className="w-full py-3 grid grid-cols-2 gap-4">
      {storeFilter ? (
        <div className="col-span-1 py-2 pr-8">
          <div className="flex justify-between">
            <div className="truncate">
              <h1 className="text-[24px] text-primaryText font-semibold truncate">
                Store & Route Proximity
              </h1>
              <p className="text-[14px] text-secondaryText">
                Viewing Store & Competitor Matches
              </p>
            </div>
            <div className="flex items-center justify-end" onClick={() => setStoreFilter(!storeFilter)}>
              <p className="text-[14px] text-[#9f9f9f]">Skip</p>
            </div>
          </div>
          
          <div className="py-2">
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
              filteredScreens={routeFilteredScreens}
              setFilteredScreens={setRouteFilteredScreens}
              setRoutes={setRoutes}
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
                  <CheckboxInput color="#52A2FF" label={finalSelectedScreens.length}/>
                </div>
                <div className="col-span-8">
                  <LinearBar value={5} colors={["#F3F3F3", "#7AB3A2"]} />
                </div>
                <p className="col-span-2 text-[12px] text-semibold flex justify-end truncate">{allScreens?.length} Sites</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckboxInput />
              <p className="text-[14px] truncate">
                Confirm and take {" "}
                <span className=" font-bold">
                  {`${finalSelectedScreens.length} Sites Out of ${allScreens.length} Sites `}
                </span>
                  for my plan
                </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-1 py-2 pr-8">
          <div className="flex justify-between">
            <div className="truncate">
              <h1 className="text-[24px] text-primaryText font-semibold truncate">
                POI Proximity
              </h1>
              <p className="text-[14px] text-secondaryText">
                Select your desired POIs for filtering screens
              </p>
            </div>
            <div className="flex items-center justify-end" onClick={() => setStoreFilter(!storeFilter)}>
              <p className="text-[14px] text-[#9f9f9f]">Skip</p>
            </div>
          </div>
          <div className="py-2">
            <div className="">
              <h1 className="">
                Select sites with most POI exposure
              </h1>
              {pois?.map((poi: any, index: any) => (
                <div key={index} className="">
                  <h1>{poi}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
  
      <div className="col-span-1 py-5">
        <MapWithGeometry
          handleRouteData={handleRouteData}
          circleRadius={circleRadius}
          filteredScreens={finalSelectedScreens || []}
          allScreens={allScreens}
          routes={routes}
          data={circleData}
        />
      </div>
    </div>
  )
}