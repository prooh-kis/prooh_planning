import React from "react";

interface Props {
  title?: string;
  bg?: string;
  reload?: boolean;
}
export const NoDataView = ({
  title = "No Data",
  bg = "bg-[#FFFFFF]",
  reload = false
}: Props) => {
  return (
    <div
      className={`flex flex-col justify-center border border-1  border-gray-200 p-4 w-full h-[90px] items-center rounded-md mt-4 ${bg}`}
    >
      {reload ? (
        <i className="fi fi-br-rotate-right text-[24px] text-gray-400"></i>
      ) : (
        <i className="fi fi-rr-folder-open text-[24px] text-gray-400"></i>
      )}
      <h1 className="text-[14px] text-gray-500">{title}</h1>
    </div>
  );
};
