import { LinearBar } from "../molecules/linearbar";
import { CheckboxInput } from "../../components/atoms/CheckboxInput"

interface AudiencesProps {
  audiences?: any
  markets?: any
  selectedAudiences?: any
  setSelectedAudiences?: any

}
export const AudienceCohortTable = ({ audiences, selectedAudiences, setSelectedAudiences }: AudiencesProps) => {
  
  const handleCheckClick = ({ cohort, checked }: any) => {
    if (checked && !selectedAudiences.includes(cohort)) {
      setSelectedAudiences([...selectedAudiences, cohort])
    } else {
      const aud = selectedAudiences?.filter((audience: any) => audience !== cohort)
      setSelectedAudiences(aud);
    }
  }
  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="flex justify-between w-full h-[40px] px-2">
          <th className="flex items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Cohorts
            </h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </th>
        </tr> 
      </thead>
      <tbody className="border overflow-scroll">
        <tr className="grid grid-cols-6 w-full px-2 gap-4">
          <th className="col-span-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1 w-full">
              <div className="h-2 w-2 bg-[#7AB3A2]"></div>
              <p className="text-[12px] font-normal">
                audience %
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
        <tr className="w-full h-[40vh] overflow-scroll py-3">
          {Object.keys(audiences)?.map((a: any, i: any) => {
            const cohortName = a;
            const cohortValue = audiences[a]; // Assuming this is the cohort value (percentage)
            return (
              <td key={i} className="grid grid-cols-6 gap-4 flex justify-between items-center w-full p-2">
                <div className="col-span-4 flex justify-between w-auto truncate text font-normal">
                  <CheckboxInput
                    checked={selectedAudiences.includes(cohortName) ? true : false}
                    label={cohortName}
                    onChange={(e: any) => handleCheckClick({ cohort: cohortName, checked: e})}
                  />
                </div>
                <div className="col-span-2 pr-2">
                  <LinearBar value={cohortValue} colors={["#F3F3F3", "#7AB3A2"]} />
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  )
}
