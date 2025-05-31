import React from "react";

interface Props {
  title?: string;
}

export const LoadingScreen: React.FC<Props> = ({ title = "Loading, please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full mt-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#129BFF] border-t-transparent"></div>
      <h1 className="text-[#129BFF] font-semibold text-[20px] pt-4">
        {title}
      </h1>
    </div>
  );
};
