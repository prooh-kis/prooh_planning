import { LinearBar } from "../molecules/linearbar";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { useEffect, useState } from "react";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { Tooltip } from "antd";
import { DEFINE_ALL_COHORTS } from "../../constants/helperConstants";

interface AudiencesProps {
  audiences?: any;
  markets?: any;
  selectedAudiences?: any;
  setSelectedAudiences?: any;
  loading?: any;
  handleSelection?: any;
  locked?: any;
  setLocked?: any;
  showIconHighlight?: any;
}
export const AudienceCohortTable = ({
  handleSelection,
  loading,
  audiences,
  selectedAudiences,
  setSelectedAudiences,
  locked,
  setLocked,
  showIconHighlight,
}: AudiencesProps) => {

  const handleCheckClick = ({ cohort, checked }: any) => {
    if (checked && !selectedAudiences.includes(cohort)) {
      setSelectedAudiences([...selectedAudiences, cohort]);
      // handleSelection({
      //   type: "cohorts",
      //   data: [cohort, selectedAudiences],
      // });
    } else {
      const aud = selectedAudiences?.filter(
        (audience: any) => audience !== cohort
      );
      setSelectedAudiences(aud);
      // handleSelection({
      //   type: "cohorts",
      //   data: aud,
      // });
    }
  };

  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="flex justify-between w-full h-[40px] px-2">
          <th className="flex items-center justify-between w-full gap-2">
            <div className="flex gap-2 items-center px-1">
              <Tooltip title="Choose your target audience type and click on the lock icon to confirm">
                <i className="fi fi-sr-target-audience flex items-center lg:text-[14px] text-[12px] text-[#21394F]"></i>
              </Tooltip>
              <h1 className="lg:text-[14px] text-[12px] text-[#21394F]">
                Audience Cohorts
              </h1>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className="grid grid-cols-6 w-full px-2 gap-4">
          <th className="col-span-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1 px-1 w-full">
              <i className="fi fi-sr-square-small flex items-center justify-center text-[#7AB3A2]"></i>
              <p className="text-[12px] font-normal">
                audience %
              </p>
            </div>
          </th>
          <th className="col-span-2 flex justify-between gap-4 pr-2">
            <p className="lg:text-[14px] text-[12px] font-normal">0</p>
            <p className="lg:text-[14px] text-[12px] font-normal">
              {Number(
                Math.max(
                  ...Object.keys(audiences)?.map((a: any) => audiences[a])
                ).toFixed(0)
              ) + 1}
            </p>
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
          {Object.keys(audiences)?.map((a: any, i: any) => {
            const cohortName = a;
            const cohortValue = audiences[a]; // Assuming this is the cohort value (percentage)
            return (
              <td
                key={i}
                className="grid grid-cols-6 gap-4 flex justify-between items-center w-full px-2 lg:py-2 py-1"
              >
                <div className="col-span-4 flex justify-between w-auto truncate text font-normal">
                  <CheckboxInput
                    disabled={loading}
                    checked={
                      selectedAudiences?.includes(cohortName) ? true : false
                    }
                    label={cohortName}
                    onChange={(e: any) =>
                      handleCheckClick({ cohort: cohortName, checked: e })
                    }
                  />
                  <Tooltip
                    title={`${
                      DEFINE_ALL_COHORTS?.filter(
                        (c: any) => c.type === cohortName
                      )[0]?.definition
                    }`}
                  >
                    <i className="fi fi-rs-info flex items-center text-[#9A9A9A] lg:text-[14px] text-[12px]"></i>
                  </Tooltip>
                </div>
                <div className="col-span-2 pr-2">
                  <LinearBar
                    highest={Math.max(
                      ...Object.keys(audiences)?.map((a: any) => audiences[a])
                    )}
                    value={cohortValue}
                    colors={["#F3F3F3", "#7AB3A2"]}
                  />
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};
