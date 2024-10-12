import { CheckboxInput } from "../atoms/CheckboxInput"

export const VendorConfirmationStatusTable = ({statusTableData}: any) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#D6EEFF]">
          <th className="p-2">
            <CheckboxInput />
          </th>
          <th className="py-2">
            <h1 className="text-[14px] flex justify-start">
              Screen Name
            </h1>
          </th>
          <th className="py-2">
            <h1 className="text-[14px] flex justify-start">
              Touchpoint
            </h1>
          </th>
          <th className="py-2">
            <div className="flex gap-2">
              <h1 className="text-[14px]">Media Type</h1>
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </div>
          </th>
          <th className="py-2">
            <h1 className="text-[14px] flex justify-start">
              Cost
            </h1>
          </th>
          <th className="py-2">
            <div className="flex gap-2">
              <h1 className="text-[14px]">Status</h1>
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </div>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Creative
            </h1>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Action
            </h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {statusTableData?.map((status: any, i: any) => (
          <tr key={i}>
            <td className="p-2"><CheckboxInput /></td>
            <td className="py-2">
              <h1 className="text-[14px]">
                {status.screenName}
              </h1>
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                {status.touchPoint}
              </h1>
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                {status.mediaType || "Connected"}
              </h1>
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                &#8377;{Number(status.cost).toFixed(0)}
              </h1>
            </td>
            <td className="py-2">
              <h1 className="text-[14px]">
                {status.status || "Pending"}
              </h1>
            </td>
            <td className="p-2">
              {/* {status.creatives} */}
              <i className="fi fi-sr-photo-video text-[20px] text-violet-500 flex justify-center"></i>
            </td>
            <td className="p-2">
              <i className="fi fi-bs-menu-dots text-[20px] flex justify-center"></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}