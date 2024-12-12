import { PolygonShape } from "../../components/atoms/PolygonShape";


interface DrawnMapPolygonProps {
  polygons?: any;
  setPolygons?: any;
}

export const DrawnMapPolygon = ({
  polygons,
  setPolygons
}: DrawnMapPolygonProps) => {

console.log(polygons);
  return (
    <div className="pt-2 pb-4 h-[20vh]">
      <div className="flex justify-between pt-2">
        <h1 className="text-[20px] text-primaryText">3. Selected Locations</h1>
      </div>
      <div className="p-4 my-2 border rounded h-full grid grid-cols-3 flex justify-start items-center gap-4">
        {polygons?.map((polygon: any, i: any) => (
          <div key={i} className="h-28">
            <div>
              <i className="fi fi-br-cross-circle flex justify-end"
                onClick={() => {
                  const polygonsData = polygons?.filter((p: any) => p.id !== polygon.id)
                  setPolygons(polygonsData);
                }}
              ></i>
              <PolygonShape data={[polygon]} />
            </div>
            <div className="flex justify-center">
              <h1 className="text-[12px]">Area {i+1} ({polygon.screens.length})</h1>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}