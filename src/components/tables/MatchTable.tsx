
export const MatchTable = () => {
  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] flex justify-between items-center w-full">
        <tr className="flex justify-between w-full h-[40px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Date
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Match Details
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Time
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Action
            </h1>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className=" flex justify-between border-b w-full h-[45px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Total
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              sfdf
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              dsfsdf
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              dfffa
            </h1>
          </th>
        </tr>
      </tbody>
    </table>
  )
}