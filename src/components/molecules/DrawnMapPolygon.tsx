import { Tooltip } from "antd";
import { PolygonShape } from "../../components/atoms/PolygonShape";

interface DrawnMapPolygonProps {
  open?: any;
  setOpen?: any;
  polygons?: any;
  setPolygons?: any;
}

export const DrawnMapPolygon = ({
  open,
  setOpen,
  polygons,
  setPolygons,
}: DrawnMapPolygonProps) => {

  function randomColor(index: any) {
    const colors = ["#540b0e50", "#e09f3e50", "#073b4c50", "#0f4c5c50", "#ef476f50"];
    return colors[index % 5];
  }

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
    <div className="py-4 border-b">
      <button type="button" className="flex items-center justify-between"
        onClick={() => {
          setOpen((prev: any) => ({
            ...prev,
            polygon: !prev.polygon,
          }))
        }}
      >
        <div className="flex justify-start gap-2 items-center py-2">
          <h1 className="lg:text-[16px] text-[14px] text-gray-500">3. Selected Location Areas </h1>
          <Tooltip
            title="Choose your screens by drawing an area that you want to target and get all the screens within that area"
          >
            <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
          <h1 className="lg:text-[14px] text-[12px] text-[#3B82F6]">({getUniqueScreens(polygons)?.length})</h1>
        </div>
        <div className="flex items-center justify-center">
          {open?.["polygon"] ? (
            <i className="fi fi-sr-caret-up text-[#EF4444] flex items-center"></i>
          ) : (
            <i className="fi fi-sr-caret-down text-[#22C55E] flex items-center"></i>
          )}
        </div>
      </button>
      {open["polygon"] && (
        <div className="h-full my-2 border rounded h-full grid grid-cols-3 gap-4">
          {polygons?.length === 0 && (
            <div className="col-span-3 w-full h-full bg-[#3B82F620] flex justify-center items-center p-4">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <i className="fi fi-sr-map-location-track md:text-[40px] sm:text-[32px] text-blue"></i>
                <h1 className="md:text-[12px] sm:text-[10px] text-blue text-center">
                  Draw polygons on the map and select your screens
                </h1>
              </div>
            </div>
          )}
          
          {polygons?.map((polygon: any, i: any) => (
            <div key={i} className="h-full w-full p-4 relative">
              {/* Polygon container with scaling */}
              <div className="relative w-full h-full grid grid-rows-4">
                {/* Scale polygon shape to fit within container */}
                <div className="w-full h-full row-span-3 flex flex-col justify-center items-center">
                  <div className="absolute top-0 right-0">
                    <i className="fi fi-br-cross-circle text-[#EF4444]" onClick={() => {
                      const polygonsData = polygons?.filter((p: any) => p.id !== polygon.id);
                      setPolygons(polygonsData);
                    }}></i>
                  </div>
                  <PolygonShape data={[polygon]} color={randomColor(i)}/>
                </div>
                <div className="flex justify-center items-center row-span-1">
                  <h1 className="text-[12px]">Area {i+1} ({polygon.screens.length})</h1>
                </div>
              </div>
              
          
            </div>
          ))}
        </div>
      )}
    </div>

  

  )
}