import { LinearBar } from "../../components/molecules/linearbar";
import { Checkbox } from "../../components/atoms/CheckboxInput"

export const TouchpointTable = ({ touchpointData }: any) => {
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
          {touchpointData?.length > 0 && touchpointData?.map((a: any, i: any) => {
            const touchpointName = Object.keys(a)[0];
            const touchpointValue = a[touchpointName]; // Assuming this is the cohort value (percentage)
            
            return (
              <tr key={i} className="grid grid-cols-6 gap-4 flex justify-between items-center w-full p-2">
                <th className="col-span-4 flex justify-between w-auto truncate text font-normal">
                  <Checkbox label={touchpointName} />
                </th>
                <th className="col-span-2 pr-2">
                  <LinearBar value={touchpointValue[0]} colors={["#F3F3F3", "#7AB3A2"]}/>
                  <LinearBar value={touchpointValue[1]} colors={["#F3F3F3", "#00A0FA"]}/>
                </th>
              </tr>
            );
          })}
        </div>
      </tbody>
    </table>
  )
}