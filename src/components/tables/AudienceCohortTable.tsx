
export const AudienceCohortTable = () => {
  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="flex justify-between w-full h-[40px] p-2">
          <th className="flex items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Cohorts
            </h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A]"></i>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className="flex justify-between w-full px-2 gap-10">
          <th className="flex items-center justify-center w-full gap-2">
            <div className="flex items-center gap-1 w-full">
              <div className="h-2 w-2 bg-green-500"></div>
              <p className="text-[12px] font-normal">
                audience %
              </p>
            </div>
          </th>
          <th className="flex justify-between w-full gap-4 px-2">
            <p className="text-[12px] font-normal">0</p>
            <p className="text-[12px] font-normal">25</p>
            <p className="text-[12px] font-normal">50</p>
            <p className="text-[12px] font-normal">100</p>
          </th>
        </tr>
        <tr className=" flex justify-between w-full p-2">
          
        </tr>
      </tbody>
    </table>
  )
}