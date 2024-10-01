import { LinearBar } from "../molecules/linearbar";
import { CheckboxInput } from "../../components/atoms/CheckboxInput"

interface TouchPointsProps {
  touchPoints: any;
  totalScreens?: any;
  selectedTouchPoints?: any;
  setSelectedTouchPoints?: any;
}
export const TouchpointTable = ({
  touchPoints,
  totalScreens,
  selectedTouchPoints,
  setSelectedTouchPoints
}: TouchPointsProps) => {

  const handleCheckClick = ({ touchpoint, checked }: any) => {
    if (checked && !selectedTouchPoints.includes(touchpoint)) {
      setSelectedTouchPoints([...selectedTouchPoints, touchpoint])
    } else {
      const aud = selectedTouchPoints?.filter((audience: any) => audience !== touchpoint)
      setSelectedTouchPoints(aud);
    }
  }

  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="flex justify-between w-full h-[40px] px-2">
          <th className="flex items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Touchpoints
            </h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className="grid grid-cols-6 w-full px-2 gap-4">
          <th className="col-span-4 flex items-center w-full gap-2">
            <div className="flex items-center gap-1 w-auto">
              <div className="h-2 w-2 bg-[#7AB3A2]"></div>
              <p className="text-[12px] font-normal">
                audience %
              </p>
            </div>
            <div className="flex items-center gap-1 w-auto">
              <div className="h-2 w-2 bg-[#00A0FA]"></div>
              <p className="text-[12px] font-normal">
                screen %
              </p>
            </div>
          </th>
          <th className="col-span-2 flex justify-between gap-4 pr-2">
            <p className="text-[12px] font-normal">0</p>
            <p className="text-[12px] font-normal">25</p>
            <p className="text-[12px] font-normal">50</p>
            <p className="text-[12px] font-normal">100</p>
          </th>
        </tr>
        <div className="w-full h-[40vh] overflow-scroll py-3">
          {Object.keys(touchPoints)?.map((a: any, i: any) => {
            return (
              <tr key={i} className="grid grid-cols-6 gap-4 flex justify-between items-center w-full p-2">
                <th className="col-span-4 flex justify-between w-auto truncate text font-normal">
                  <CheckboxInput
                    label={a}
                    checked={selectedTouchPoints.includes(a)? true : false}
                    onChange={(e) => handleCheckClick({ touchPoint: a, checked: e})}
                  />
                </th>
                <th className="col-span-2 pr-2">
                  <LinearBar value={
                    ((Number(touchPoints[a]["gender"]["Male"]) + Number(touchPoints[a]["gender"]["Female"])) / 2) * 100
                  } colors={["#F3F3F3", "#7AB3A2"]}/>
                  <LinearBar value={
                    ((touchPoints[a]?.screens?.length / totalScreens) * 100).toFixed(2)
                  } colors={["#F3F3F3", "#00A0FA"]}/>
                </th>
              </tr>
            );
          })}
        </div>
      </tbody>
    </table>
  )
}