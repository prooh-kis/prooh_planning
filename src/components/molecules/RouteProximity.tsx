import { useState } from "react";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { CheckboxInput } from "../atoms/CheckboxInput"
import { PrimaryButton } from "../atoms/PrimaryButton";
import { LinearBar } from "../../components/molecules/linearbar";
import { MapSearchInput } from "../../components/atoms/MapSearchInput";


interface RouteProximityProps {
  routes?: any;
  routeOrigin?: any;
  setRouteOrigin?: any;
  routeDestination?: any;
  setRouteDestination?: any;
  handleRouteSetup?: any;
  handleRemoveRoute?: any;
}

export const RouteProximity = ({
  routes,
  routeOrigin,
  setRouteOrigin,
  routeDestination,
  setRouteDestination,
  handleRouteSetup,
  handleRemoveRoute,
}: RouteProximityProps) => {

  const [showDetails, setShowDetails] = useState<any>(null);

  return (
    <div className="py-2">
      <div className="flex justify-between pt-2">
        <h1 className="text-[20px] text-primaryText">2. Route Proximity</h1>
      </div>
      
      <div className="grid grid-cols-5 gap-2 flex items-center pt-2">
        <div className="col-span-2 flex items-center">
          <MapSearchInput 
            handleClick={(e: any) => setRouteOrigin(e)}
            placeholder="Origin"
            prefix={
              <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
            }
          />
        </div>
        <div className="col-span-2">
        <MapSearchInput 
            handleClick={(e: any) => setRouteDestination(e)}
            placeholder="Destination"
            prefix={
              <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
            }
          />
        </div>
        <div className="col-span-1">
          <PrimaryButton
            title="Check"
            action={() => handleRouteSetup(routeOrigin, routeDestination)}
            rounded="rounded-[10px]"
            disabled={routeOrigin && routeDestination ? false : true}
          />
        </div>
      </div>
      <div className="pt-2">
        <div className="flex justify-between pr-2" onClick={() => setShowDetails(null)}>
          <p className="text-sm text-[#9f9f9f]">Added Route</p>
          <p className="text-sm text-[#9f9f9f]">{routes.length}</p>
        </div>
        <div className="overflow-scroll h-36">
          {routes?.map((route: any, index: any) => (
            <div key={index} className="bg-[#F6F6F6] p-2 my-1">
              <div className="">
                <div className="flex justify-between items-center" onClick={() => {
                  setShowDetails(index);
                  console.log(route);
                }}>
                  <p className="text-sm">
                    {index + 1}. <span className="font-bold">{route.origin.place_name?.split(",")[0]}</span> to {" "}
                    <span className="font-bold">
                      {route.destination.place_name?.split(",")[0]}
                    </span>
                    <span className="text-blue-600">
                    ({route?.selectedScreens?.length})
                    </span>
                  </p>
                  <i className="fi fi-sr-cross-small text-gray-700 flex items-center" onClick={() => handleRemoveRoute(route.id)}></i>
                </div>
              </div>

              {showDetails === index && (
                <div>
                  <div className="flex gap-2 items-center">
                    <i className="fi fi-br-arrow-from-left text-[12px] text-green-600"></i>
                    <p className="text-[12px]">
                      {route.origin.place_name}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fi fi-br-arrow-alt-to-left text-[12px] text-red-600"></i>
                    <p className="text-[12px]">
                      {route.destination.place_name}
                    </p>
                  </div>
                </div>
              )}
              
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}