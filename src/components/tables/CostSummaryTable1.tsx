
export const CostSummaryTable1 = () => {
  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] flex justify-between items-center w-full">
        <tr className="flex justify-between w-full h-[40px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Cities
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Touchpoints
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Screens
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Duration
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Impressions
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Budget (INR)
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              CPM
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
              3
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              12
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              70
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              30 Days
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              100K
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              3Cr
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              0.2
            </h1>
          </th>
        </tr>
        <tr className="bg-[#F0F9FF] flex justify-between border-b w-full h-[45px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Selected
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              3
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              12
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              70
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <div className="grid grid-cols-4 w-full items-center">
              <p className="col-span-1"></p>
              <h1 className="col-span-2 text-[14px] text-[#21394F] truncate font-normal">
                30 Days
              </h1>
              <p className="col-span-1 text-[12px] text-right text-red-500 font-normal">
                Edit
              </p>
            </div>
            
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              100K
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-red-500">
              3Cr
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              0.2
            </h1>
          </th>
        </tr>
      </tbody>
    </table>
  )
}