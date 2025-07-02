import { useCallback, useEffect, useState, useRef } from "react";
import { MapSearchInput } from "../../components/atoms/MapSearchInput";
import { Slider, Tooltip } from "antd";
import ButtonInput from "../../components/atoms/ButtonInput";

interface RouteProximityProps {
  open: any;
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
  setRoutes?: any;
  setRouteDataCache?: any;
  props?: any;
  setRouteFilteredScreens?: any;
}

export const RouteProximity = ({
  open,
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
  setRoutes,
  setRouteDataCache,
  setRouteFilteredScreens,
}: RouteProximityProps) => {
  const [showDetails, setShowDetails] = useState<any>(null);
  const sliderTimeout = useRef<NodeJS.Timeout>();

  const handleRouteSetup = useCallback(async (originData: any, destinationData: any) => {
    if (!originData?.[0] || !destinationData?.[0]) return;
    
    const newRoute = {
      origin: originData[0],
      destination: destinationData[0],
      selectedScreens: [],
      id: routes?.map((r: any) => r.id)?.includes(routes.length + 1) ? routes[routes.length - 1]?.id + 1 : routes.length + 1
    };


    // Check if this exact route already exists
    const routeExists = routes.some(
      (route: any) => 
        route.origin === newRoute.origin && 
        route.destination === newRoute.destination
    );

    if (!routeExists) {
      setRoutes((prevRoutes: any[]) => [...prevRoutes, newRoute]);
    }
    
  }, [routes, setRoutes]);


  const handleRemoveRoute = (id: any) => {
    let arr = routes;
    setRouteDataCache((prev: any) => {
      const newCache = { ...prev };
      // Only update if there are routes to filter by
      Object.keys(newCache).forEach((key) => {
        const routeId = Number(key.split("-")[0]);
        if (routeId === Number(id)) {
          delete newCache[key];
        }
      });
      return newCache;
    });
    const screensToRemove = arr.find((data: any) => data?.id === id)?.selectedScreens;
    setRouteFilteredScreens((prev: any) => {
      return prev.filter((data: any) => !screensToRemove?.map((s: any) => s._id).includes(data._id));
    });
    // Remove the route from the routes array
    arr = arr.filter((data: any) => data?.id !== id);
    setRoutes(arr);
  };
  return (
    <div className="py-2 border-b border-gray-100">
      <button
        type="button"
        className="flex w-full items-center justify-between"
        onClick={() => {
          // setOpen((prev: any) => ({
          //   ...prev,
          //   route: !prev.route,
          // }))
        }}
      >
        <div className="flex justify-between w-full">
          <div className="flex justify-start">
            <div className="flex justify-start gap-2 items-center py-2 truncate">
              <h1 className="lg:text-[16px] text-[14px] truncate">
                2. Choose your desired routes{" "}
              </h1>
              <Tooltip title="Enter the origin and destination of your desired routes and select all the screens in proximity of your desired routes">
                <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
              <h1 className="lg:text-[14px] text-[12px] text-[#3B82F6]">
                ({routeFilteredScreens?.length} sites)
              </h1>
            </div>
            <div className="flex items-center justify-center">
              {/* {open["route"] ? (
                <i className="fi fi-sr-caret-up text-[#EF4444] flex items-center"></i>
              ) : (
                <i className="fi fi-sr-caret-down text-[#22C55E] flex items-center"></i>
              )} */}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="w-24 px-1">
              <Slider
                min={0.1}
                max={1}
                step={0.1}
                value={routeRadius ? routeRadius / 1000 : 1}
                onChange={(value: number) => {
                  // Clear any existing timeout
                  if (sliderTimeout.current) {
                    clearTimeout(sliderTimeout.current);
                  }
                  
                  // Set a new timeout to update the route radius after sliding stops
                  sliderTimeout.current = setTimeout(() => {
                    setRouteRadius(value * 1000);
                  }, 300); // 300ms delay after sliding stops
                }}
                tooltip={{ formatter: (value) => `${value} km` }}
                styles={{
                  track: {
                    background: '#22C55E',
                  },
                  handle: {
                    borderColor: '#22C55E',
                    backgroundColor: '#22C55E',
                  },
                }}
              />
            </div>
            <div className="w-12 pr-2 text-[12px] text-center">
              {routeRadius ? (routeRadius / 1000).toFixed(1) : '1.0'} km
            </div>
          </div>
        </div>
      </button>

      {open["route"] && (
        <div className="w-full">
          <div className="grid grid-cols-5 gap-2 flex items-center pt-2">
            <div className="col-span-2">
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
              <ButtonInput
                onClick={() => {
                  if (routes?.length >= 5) {
                    alert("Oops! you can only choose upto 5 routes...");
                  } else {
                    handleRouteSetup(routeOrigin, routeDestination);
                    setRouteOrigin([]);
                    setRouteDestination([]);
                  }
                }}
                variant="primary"
                disabled={routeOrigin && routeDestination ? false : true}
              >
                Check
              </ButtonInput>
            </div>
          </div>
          <div className="pt-2">
            <div
              className="flex justify-between p-2"
              onClick={() => setShowDetails(null)}
            >
              <p className="text-sm text-[#9f9f9f]">Added Route</p>
              <p className="text-sm text-[#9f9f9f]">{routes.length}</p>
            </div>
            {routes.length > 0 && (
              <div className="overflow-scroll h-40 mb-1 border rounded">
                {routes?.map((route: any, index: any) => (
                  <div
                    key={index}
                    className={`
                      ${
                        index === 0
                          ? "bg-[#540b0e20]"
                          : index === 1
                          ? "bg-[#e09f3e20]"
                          : index === 2
                          ? "bg-[#073b4c20]"
                          : index === 3
                          ? "bg-[#0f4c5c20]"
                          : index === 4
                          ? "bg-[#ef476f20]"
                          : "bg-[#F6F6F6]"
                      }
                      p-2 mb-1 rounded
                    `}
                    onClick={() => {
                      // console.log(randomColor(index));
                      // console.log(route)
                    }}
                  >
                    <div className="">
                      <div
                        className="flex justify-between items-center"
                        onClick={() => {
                          setShowDetails(index);
                        }}
                      >
                        <p className="text-sm">
                          {index + 1}.{" "}
                          <span className="font-bold">
                            {route?.origin?.place_name?.split(",")[0]}
                          </span>{" "}
                          to{" "}
                          <span className="font-bold">
                            {route?.destination?.place_name?.split(",")[0]}
                          </span>
                          <span className="px-2 text-blue">
                            ({route?.selectedScreens?.length})
                          </span>
                        </p>
                        <i
                          className="fi fi-sr-cross-small text-gray-700 flex items-center"
                          onClick={() => handleRemoveRoute(route?.id)}
                        ></i>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};
