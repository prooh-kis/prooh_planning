import { Tooltip } from "antd";
import { PolygonShape } from "../../components/atoms/PolygonShape";

interface DrawnMapPolygonProps {
  polygons?: any;
  setPolygons?: any;
}

export const DrawnMapPolygon = ({
  polygons,
  setPolygons,
}: DrawnMapPolygonProps) => {
  function getUniqueScreens(poly: any) {
    const screenMap = new Map();

    poly.forEach((feature: any) => {
      feature.screens.forEach((screen: any) => {
        if (!screenMap.has(screen._id)) {
          screenMap.set(screen._id, screen);
        }
      });
    });

    // Convert the Map values to an array
    return Array.from(screenMap.values());
  }
  return (
    <div className="h-[16vh]">
      <div className="flex justify-start gap-2 pt-2">
        <h1 className="lg:text-[16px] md:text-[14px] text-gray-500">
          3. Selected Location Areas{" "}
        </h1>
        <Tooltip title="Choose your screens by drawing an area that you want to target and get all the screens within that area">
          <i className="fi fi-rs-info pr-1 lg:text-[14px] md:text-[12px] text-gray-400 flex justify-center items-center"></i>
        </Tooltip>
        <h1 className="text-[#129BFF]">
          ({getUniqueScreens(polygons)?.length})
        </h1>
      </div>
      <div className="border mt-2 rounded h-full grid grid-cols-3 flex justify-start items-center gap-4">
        {polygons?.length === 0 && (
          <div className="col-span-3 w-full h-full bg-[#F4F9FF] flex justify-center items-center">
            <div className="w-full">
              <i className="fi fi-sr-map-location-track md:text-[40px] sm:text-[32px] text-[#129BFF] flex justify-center items-center"></i>
              <h1 className="md:text-[12px] sm:text-[10px] text-[#129BFF] text-center">
                Draw polygons on the map and select your screens
              </h1>
            </div>
          </div>
        )}
        {polygons?.map((polygon: any, i: any) => (
          <div key={i} className="h-full p-4">
            <div className="relative h-[12vh]">
              <i
                className="absolute right-0 z-1 fi fi-br-cross-circle flex justify-end"
                onClick={() => {
                  const polygonsData = polygons?.filter(
                    (p: any) => p.id !== polygon.id
                  );
                  setPolygons(polygonsData);
                }}
              ></i>
              <PolygonShape data={[polygon]} />
            </div>
            <div className="flex justify-center">
              <h1 className="text-[12px]">
                Area {i + 1} ({polygon.screens.length})
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
