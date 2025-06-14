import { Tooltip } from "antd";
import { PolygonShape } from "../../components/atoms/PolygonShape";
import { useState } from "react";

interface DrawnMapPolygonProps {
  open?: any;
  setOpen?: any;
  polygons?: google.maps.Polygon[];
  setPolygons?: (polygons: google.maps.Polygon[]) => void;
  polygonFilteredScreens?: any;
  handleFinalSelectedScreens?: any;
  allScreens?: any;
}

export const DrawnMapPolygon = ({
  open,
  setOpen,
  polygons,
  setPolygons,
  polygonFilteredScreens,
  handleFinalSelectedScreens,
  allScreens,
}: DrawnMapPolygonProps) => {
  const [selectedPolygon, setSelectedPolygon] = useState<google.maps.Polygon | null>(null);

  // Function to generate random colors for polygons
  function randomColor(index: any) {
    const colors = ["#540b0e50", "#e09f3e50", "#073b4c50", "#0f4c5c50", "#ef476f50"];
    return colors[index % 5];
  }

  // Function to check if a screen is inside a polygon
  const isScreenInsidePolygon = (screen: any, polygon: any) => {
    const screenLocation = new google.maps.LatLng(screen?.location?.geographicalLocation?.latitude, screen?.location?.geographicalLocation?.longitude);
    return google.maps.geometry.poly.containsLocation(screenLocation, polygon);
  };

  // Function to get all screens inside all polygons
  const getScreensInsidePolygons = (polygons: google.maps.Polygon[]) => {
    const screensInsidePolygons = allScreens.filter((screen: any) =>
      polygons.some((polygon) => isScreenInsidePolygon(screen, polygon))
    );
    return screensInsidePolygons;
  };
  
  // Function to handle polygon deletion
  const handleDeleteSelected = (polygon: google.maps.Polygon) => {
    if (!polygon) return;

    // Remove the polygon from the map
    polygon.setMap(null);

    // Update the polygons state
    const updatedPolygons = polygons?.filter((p) => p !== polygon) || [];
    const polygonToRemove = polygons?.filter((p) => p === polygon) || [];
    const screensToRemove = getScreensInsidePolygons(polygonToRemove)
    setPolygons?.(updatedPolygons);
    handleFinalSelectedScreens({screens: screensToRemove, type: "remove"});
    // Reset selected polygon
    setSelectedPolygon(null);
  };

  return (
    <div className="py-2">
      <button
        type="button"
        className="flex items-center justify-between"
        onClick={() => {
          // setOpen((prev: any) => ({
          //   ...prev,
          //   polygon: !prev.polygon,
          // }));
        }}
      >
        <div className="flex justify-start gap-2 items-center py-2">
          <h1 className="lg:text-[16px] text-[14px]">3. Selected Location Areas </h1>
          <Tooltip title="Choose your screens by drawing an area that you want to target and get all the screens within that area">
            <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
          <h1 className="lg:text-[14px] text-[12px] text-[#3B82F6]">({polygonFilteredScreens?.length} sites)</h1>
        </div>
        {/* <div className="flex items-center justify-center">
          {open?.["polygon"] ? (
            <i className="fi fi-sr-caret-up text-[#EF4444] flex items-center"></i>
          ) : (
            <i className="fi fi-sr-caret-down text-[#22C55E] flex items-center"></i>
          )}
        </div> */}
      </button>
      {open["polygon"] && (
        <div className="h-full my-2 border rounded h-full grid grid-cols-3 gap-4">
          {polygons?.length === 0 && (
            <div className="col-span-3 w-full h-full bg-[#3B82F620] flex justify-center items-center p-4">
              <Tooltip title={"Click on polygon icon on top of the map to draw shapes and select all the screens within the shape boundaries!!!"}>
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <i className="fi fi-sr-map-location-track md:text-[40px] sm:text-[32px] text-blue"></i>
                  <h1 className="md:text-[12px] sm:text-[10px] text-blue text-center">
                    Draw polygons on the map and select your screens
                  </h1>
                </div>
              </Tooltip>
            </div>
          )}

          {polygons?.map((polygon: google.maps.Polygon, i: number) => (
            <div key={i} className="h-full w-full p-4 relative">
              {/* Polygon container with scaling */}
              <div className="relative w-full h-full grid grid-rows-4">
                {/* Scale polygon shape to fit within container */}
                <div className="w-full h-full row-span-3 flex flex-col justify-center items-center">
                  {/* Cross icon to delete the polygon */}
                  <div className="absolute top-0 right-0">
                    <i
                      className="fi fi-br-cross-circle text-[#EF4444] cursor-pointer"
                      onClick={() => {
                        setSelectedPolygon(polygon); // Select the polygon
                        handleDeleteSelected(polygon); // Delete the selected polygon
                      }}
                    ></i>
                  </div>
                  <PolygonShape polygon={polygon} color={randomColor(i)} />
                </div>
                <div className="flex justify-center items-center row-span-1">
                  <h1 className="text-[12px]">Area {i + 1}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};  