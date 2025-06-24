import { getUserRole } from "../../utils/campaignUtils";
import React from "react";

function MyDiv({ left, right, paisa = false }: any) {
  return (
    <div className="flex ">
      <h1 className="text-left text-[14px] basis-1/2 text-[#6F7F8E] font-medium ">
        {left}
      </h1>
      {paisa ? (
        <h1 className="text-left text-[14px] basis-1/2 text-[#0E212E]">
          &#8377; {right}
        </h1>
      ) : (
        <h1 className="text-left text-[14px] basis-1/2 text-[#0E212E]">
          {right}
        </h1>
      )}
    </div>
  );
}

export const PlanDetails = ({
  basicDetails,
  durationDetails,
  performanceMatrix,
  campaignCost,
  downloadSummary,
  userInfo,
}: any) => {
  return (
    <div className="w-full border border-[#D3D3D350] rounded-[18px] p-4 bg-white mt-2">
      <div className="flex justify-between border-b pb-2">
        <h1 className="text-[#092A41] text-[16px] font-semibold mt-2 px-1">
          Your Plan Details
        </h1>{" "}
        <div
          onClick={downloadSummary}
          className="h-8 flex items-center gap-2 text-[14px] font-medium text-[#129BFF] cursor-pointer hover:border border-[#129BFF] rounded-md py-1 px-4"
        >
          <i className="fi-rr-file-download" />
          <h1>Download Approach</h1>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-6 border-r-2">
          <div className="p-4">
            <h1 className="text-[#0E212E] font-semibold text-[14px]  ">
              Basic Details
            </h1>
            <div className="mt-2 flex flex-col gap-1">
              {basicDetails?.map((data: any, index: number) => (
                <MyDiv key={index} left={data.label} right={data.value} />
              ))}
            </div>
            <h1 className="text-[#0E212E] font-semibold text-[14px] mt-4">
              Campaign Duration
            </h1>
            <div className="mt-2 flex flex-col gap-1">
              {durationDetails?.map((data: any, index: number) => (
                <MyDiv key={index} left={data.label} right={data.value} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div className="p-4">
            <h1 className="text-[#0E212E] font-semibold text-[14px]  ">
              Performance Metrics
            </h1>
            <div className="mt-2 flex flex-col gap-1">
              {performanceMatrix?.map((data: any, index: number) => (
                <MyDiv
                  key={index}
                  left={data.label}
                  right={data.value}
                  paisa={data.paisa}
                />
              ))}
            </div>
            {getUserRole(userInfo?.userRole) === "planner" && (
              <div>
                <h1 className="text-[#0E212E] font-semibold text-[14px] mt-4">
                  Campaign Cost
                </h1>
                <div className="mt-2 flex flex-col gap-1">
                  {campaignCost?.map((data: any, index: number) => (
                    <MyDiv
                      paisa={data.paisa}
                      key={index}
                      left={data.label}
                      right={data.value}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
