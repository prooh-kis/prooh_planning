import { LinearBar } from "../molecules/linearbar";
import { CheckboxInput } from "../../components/atoms/CheckboxInput"
import { useEffect, useState } from "react";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { Tooltip } from "antd";
import { DEFINE_ALL_TOUCHPOINTS } from "../../constants/helperConstants";

interface TouchPointsProps {
  touchPoints: any;
  totalScreens?: any;
  selectedTouchPoints?: any;
  setSelectedTouchPoints?: any;
  loading?: any;
  handleSelection?: any;
  locked?: any;
  setLocked?: any;
}
export const TouchpointTable = ({
  touchPoints,
  selectedTouchPoints,
  setSelectedTouchPoints,
  handleSelection,
  loading,
  locked,
  setLocked,
}: TouchPointsProps) => {

  const [clicked, setClicked] = useState<any>(false);

  const handleCheckClick = ({ touchPoint, checked }: any) => {
    setClicked(false);
    if (checked && !selectedTouchPoints.includes(touchPoint)) {
      setSelectedTouchPoints([...selectedTouchPoints, touchPoint]);
      // handleSelection({
      //   type: "touchPoints",
      //   data: [...selectedTouchPoints, touchPoint],
      // });
    } else {
      const aud = selectedTouchPoints?.filter((audience: any) => audience !== touchPoint)
      setSelectedTouchPoints(aud);
      // handleSelection({
      //   type: "touchPoints",
      //   data: aud,
      // });
    }
  }

  const handleConfirmClick = () => {
    handleSelection({
      type: "touchPoints",
      data: selectedTouchPoints,
    });
  }

  useEffect(() => {
    const lockedData = {
      cohorts: locked.cohorts,
      touchPoints: clicked,
    }
    setLocked(lockedData);
  },[clicked, setLocked]);

  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="flex justify-between w-full h-[40px] px-2">
          <th className="flex items-center justify-between w-full gap-2">
            <div className="flex gap-2 items-center">
              <h1 className="md:text-[14px] sm:text-[12px] text-[#21394F]">
                Touchpoints
              </h1>
              <Tooltip
                title="Choose your target touchpoints and click on the lock icon to confirm"
              >
                <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
              </Tooltip>
            </div>
            <Tooltip
                title="Click to lock your selections"
            >
              <div
                onClick={() => {
                  if (!loading) {
                    setClicked(true);
                    handleConfirmClick();
                  } else {
                    alert("Please let us calculate the cost for you...");
                  }
                }}
              >
                {clicked ? (
                  <i className="fi fi-sr-lock flex items-center text-green-600 text-[12px]"></i>
                ) : (
                  <i className="fi fi-sr-lock-open-alt flex items-center text-[#9A9A9A] text-[12px]"></i>
                )}
              </div>
            </Tooltip>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className="grid grid-cols-6 w-full px-2 gap-4">
          <th className="col-span-4 flex items-center w-full gap-2">
            <div className="flex items-center gap-1 w-auto">
              <div className="h-2 w-2 bg-[#7AB3A2]"></div>
              <p className="md:text-[12px] sm:text-[10px] font-normal">
                audience %
              </p>
            </div>
            <div className="flex items-center gap-1 w-auto">
              <div className="h-2 w-2 bg-[#00A0FA]"></div>
              <p className="md:text-[12px] sm:text-[10px] font-normal">
                screen %
              </p>
            </div>
          </th>
          <th className="col-span-2 flex justify-between pr-2 truncate">
            <p className="md:text-[12px] sm:text-[10px] font-normal">0,</p>
            <p className="md:text-[12px] sm:text-[10px] font-normal">25,</p>
            <p className="md:text-[12px] sm:text-[10px] font-normal">50,</p>
            <p className="md:text-[12px] sm:text-[10px] font-normal">100</p>
          </th>
        </tr>
        {loading && (
          <tr className="w-full">
            <th className="w-full">
              <SkeletonLoader />
            </th>
          </tr>
        )}
        <tr className="w-full overflow-scroll py-3">
          {Object.keys(touchPoints)?.map((tp: any, i: any) => {
            return (
              <td key={i} className="grid grid-cols-6 gap-4 flex justify-between items-center w-full p-2">
                <div className="col-span-4 flex justify-between w-auto truncate text font-normal">
                  <CheckboxInput
                    disabled={loading}
                    label={tp}
                    checked={selectedTouchPoints?.includes(tp)? true : false}
                    onChange={(e) => handleCheckClick({ touchPoint: tp, checked: e})}
                  />
                  <Tooltip
                    title={`${DEFINE_ALL_TOUCHPOINTS?.filter((c: any) => c.type === tp)[0]?.definition}`}
                  >
                    <i  
                      className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"
                    ></i>
                  </Tooltip>
                </div>
                <div className="col-span-2 pr-2">
                  <LinearBar
                    value={
                    (touchPoints[tp]["Male"] + touchPoints[tp]["Female"]).toFixed(2)
                  } colors={["#F3F3F3", "#7AB3A2"]}/>
                  <LinearBar value={
                    (touchPoints[tp]["Screen"].toFixed(2))
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