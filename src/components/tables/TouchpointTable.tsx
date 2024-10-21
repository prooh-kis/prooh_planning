import { LinearBar } from "../molecules/linearbar";
import { CheckboxInput } from "../../components/atoms/CheckboxInput"

interface TouchPointsProps {
  touchPoints: any;
  totalScreens?: any;
  selectedTouchPoints?: any;
  setSelectedTouchPoints?: any;
  selectedGender?: any;
}
export const TouchpointTable = ({
  touchPoints,
  selectedTouchPoints,
  setSelectedTouchPoints,
  selectedGender,
}: TouchPointsProps) => {

  const handleCheckClick = ({ touchPoint, checked }: any) => {
    if (checked && !selectedTouchPoints.includes(touchPoint)) {
      setSelectedTouchPoints([...selectedTouchPoints, touchPoint])
    } else {
      const aud = selectedTouchPoints?.filter((audience: any) => audience !== touchPoint)
      setSelectedTouchPoints(aud);
    }
  }

  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="flex justify-between w-full h-[40px] px-2">
          <th className="flex items-center justify-between w-full gap-2">
            <div className="flex gap-2 items-center">
              <h1 className="text-[14px] text-[#21394F]">
                Touchpoints
              </h1>
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </div>
            <i className="fi fi-sr-lock-open-alt flex items-center text-[#9A9A9A] text-[12px]"></i>
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
        <tr className="w-full overflow-scroll py-3">
          {Object.keys(touchPoints)?.map((a: any, i: any) => {
            return (
              <td key={i} className="grid grid-cols-6 gap-4 flex justify-between items-center w-full p-2">
                <div className="col-span-4 flex justify-between w-auto truncate text font-normal">
                  <CheckboxInput
                    label={a}
                    checked={selectedTouchPoints.includes(a)? true : false}
                    onChange={(e) => handleCheckClick({ touchPoint: a, checked: e})}
                  />
                </div>
                <div className="col-span-2 pr-2">
                  <LinearBar
                    value={
                    ((touchPoints[a]["Male"] + touchPoints[a]["Female"]) / 2).toFixed(2)
                  } colors={["#F3F3F3", "#7AB3A2"]}/>
                  <LinearBar value={
                    (touchPoints[a]["Screen"].toFixed(2))
                  } colors={["#F3F3F3", "#00A0FA"]}/>
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  )
}