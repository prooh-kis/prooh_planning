import { useEffect, useState } from "react";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { CheckboxInput } from "../atoms/CheckboxInput";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { LinearBar } from "../../components/molecules/linearbar";
import { MapSearchInput } from "../../components/atoms/MapSearchInput";
import { Tooltip } from "antd";
import { MapBoxSearchInput } from "../../components/atoms/MapboxSearchInput";

interface RouteProximityProps {
  open: any;
  setOpen: any;
  userLocation?: any;
  setUserLocation?: any;
  routeRadius?: any;
  setRouteRadius?: any;
  routes?: any;
  routeOrigin?: any;
  setRouteOrigin?: any;
  routeDestination?: any;
  setRouteDestination?: any;
  routeFilteredScreens?: any;
  handleFinalSelectedScreens?: any
  setRouteFilteredScreens?: any
  setRoutes?: any;
}

export const RouteProximity = ({
  open,
  setOpen,
  userLocation,
  setUserLocation,
  routeRadius,
  setRouteRadius,
  routes,
  routeOrigin,
  setRouteOrigin,
  routeDestination,
  setRouteDestination,
  routeFilteredScreens,
  setRouteFilteredScreens,
  setRoutes,
  handleFinalSelectedScreens,
}: RouteProximityProps) => {
  const [showDetails, setShowDetails] = useState<any>(null);

  function randomColor(index: any) {
    const colors = ["#540b0e", "#e09f3e", "#073b4c", "#0f4c5c", "#ef476f"];
    return colors[index % 5];
  }

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

  const handleRemoveRoute = (id: any) => {
    let arr = routes;
    for (let data of arr) {
      if (data?.id === id) {
        setRouteFilteredScreens(
          routeFilteredScreens?.filter(
            (rf: any) =>
              !data.selectedScreens.map((s: any) => s._id).includes(rf._id)
          )
        );
        handleFinalSelectedScreens({
          type: "remove",
          screens: data?.selectedScreens,
        });
      }
    }
    arr = arr.filter((data: any) => data?.id != id);
    setRoutes(arr);
  };

  return (
    <div className="py-4 border-b border-gray-100">
      <button type="button" className="flex w-full items-center justify-between"
        onClick={() => {
          // setOpen((prev: any) => ({
          //   ...prev,
          //   route: !prev.route,
          // }))
        }}
      >
        <div className="flex justify-between w-full">
          <div className="flex justify-start">
            <div className="flex justify-start gap-2 items-center py-2">
              <h1 className="lg:text-[16px] text-[14px] text-gray-500 truncate">2. Choose your desired routes </h1>
              <Tooltip
                  title="Enter the origin and destination of your desired routes and select all the screens in proximity of your desired routes"
                  >
                <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
              <h1 className="lg:text-[14px] text-[12px] text-[#3B82F6]">({routeFilteredScreens?.length} sites)</h1>
            </div>
            <div className="flex items-center justify-center">
              {open["route"] ? (
                <i className="fi fi-sr-caret-up text-[#EF4444] flex items-center"></i>
              ) : (
                <i className="fi fi-sr-caret-down text-[#22C55E] flex items-center"></i>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <i className="fi fi-bs-circle text-[10px] text-[#22C55E] pr-2 flex items-center justify-center"></i>
            <input
              className="w-[24px] h-6"
              type={"number"}
              placeholder={`${routeRadius/1000}`}
              value={routeRadius/1000}
              onClick={(e: any) => {
                if (e === 0) {
                  setRouteRadius(1000)
                } else {
                  setRouteRadius(e.target.value * 1000);
                }
              }}
              
            />
            <h1 className="lg:text-[14px] text-[12px] pl-1">km</h1>
          </div>
        </div>
        
        
      </button>

      {open["route"] && (
        <div className="w-full">
          <div className="grid grid-cols-5 gap-2 flex items-center pt-2">
            <div className="col-span-2">
              {/* <MapBoxSearchInput
                setUserLocation={setUserLocation}
                userLocation={userLocation}
                handleClick={(e: any) => setRouteOrigin(e)}
                value={routeOrigin}
                placeholder="Origin"
                prefix={
                  <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
                }
                reset={routeOrigin.length === 0 ? true : false}
              /> */}
              <MapSearchInput 
                setUserLocation={setUserLocation}
                userLocation={userLocation}
                handleClick={(e: any) => setRouteOrigin(e)}
                value={routeOrigin}
                placeholder="Origin"
                prefix={
                  <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
                }
                reset={routeOrigin.length === 0 ? true : false}
              />
            </div>
            <div className="col-span-2">
              {/* <MapBoxSearchInput
                setUserLocation={setUserLocation}
                userLocation={userLocation}
                handleClick={(e: any) => setRouteDestination(e)}
                value={routeDestination}
                placeholder="Destination"
                prefix={
                  <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
                }
                reset={routeDestination.length === 0 ? true : false}
              /> */}
            <MapSearchInput 
                setUserLocation={setUserLocation}
                userLocation={userLocation}
                handleClick={(e: any) => setRouteDestination(e)}
                value={routeDestination}
                placeholder="Destination"
                prefix={
                  <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
                }
                reset={routeDestination.length === 0 ? true : false}
              />
            </div>
            <div className="col-span-1">
              <PrimaryButton
                title="Check"
                action={() => {
                  if (routes?.length >= 5) {
                    alert("Oops! you can only choose upto 5 routes...")
                  } else {
                    handleRouteSetup(routeOrigin, routeDestination);
                    setRouteOrigin([]);
                    setRouteDestination([]);
                  }
                }}
                textSize="lg:text-[14px] text-[12px]"
                rounded="rounded-[10px]"
                disabled={routeOrigin && routeDestination ? false : true}
              />
            </div>
          </div>
          <div className="pt-2">
            <div className="flex justify-between p-2" onClick={() => setShowDetails(null)}>
              <p className="text-sm text-[#9f9f9f]">Added Route</p>
              <p className="text-sm text-[#9f9f9f]">{routes.length}</p>
            </div>
            <div className="overflow-scroll h-44 mb-1 border rounded">
              {routes?.map((route: any, index: any) => (
                <div key={index} className={`
                    ${
                      index === 0 ? "bg-[#540b0e20]" : 
                      index === 1 ? "bg-[#e09f3e20]" : 
                      index === 2 ? "bg-[#073b4c20]" : 
                      index === 3 ? "bg-[#0f4c5c20]" : 
                      index === 4 ? "bg-[#ef476f20]" : 
                      "bg-[#F6F6F6]"
                    }
                    p-2 my-1 rounded
                  `}
                  onClick={() => {
                    // console.log(randomColor(index));
                    // console.log(route)
                  }}
                >
                  <div className="">
                    <div className="flex justify-between items-center" onClick={() => {
                      setShowDetails(index);
                    }}>
                      <p className="text-sm">
                        {index + 1}. <span className="font-bold">{route?.origin?.place_name?.split(",")[0]}</span> to {" "}
                        <span className="font-bold">
                          {route?.destination?.place_name?.split(",")[0]}
                        </span>
                        <span className="px-2 text-blue">
                        ({route?.selectedScreens?.length})
                        </span>
                      </p>
                      <i className="fi fi-sr-cross-small text-gray-700 flex items-center" onClick={() => handleRemoveRoute(route?.id)}></i>
                    </div>
                  </div>

                  {showDetails === index && (
                    <div>
                      <div className="flex gap-2 items-center">
                        {/* <i className="fi fi-br-arrow-from-left text-[12px] text-green-600"></i> */}
                        <i className="fi fi-sr-marker text-violet-500 text-[12px]"></i>

                        <p className="text-[12px]">
                          {route?.origin?.place_name}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        {/* <i className="fi fi-br-arrow-alt-to-left text-[12px] text-red-600"></i> */}
                        <i className="fi fi-sr-marker text-pink-500 text-[12px]"></i>
                        <p className="text-[12px]">
                          {route?.destination?.place_name}
                        </p>
                      </div>
                    </div>
                  )}
                  
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
