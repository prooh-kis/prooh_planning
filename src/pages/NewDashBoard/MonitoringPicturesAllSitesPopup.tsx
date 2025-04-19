import React from 'react'

export const MonitoringPicturesAllSitesPopup = ({handleCancel}: any) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 font-inter">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-[80vh] w-[95%] p-4">
        <div className="relative inset-0 flex items-center justify-between gap-4 py-2 pr-5 border-b">
          <div className="flex gap-2 items-center">
            <i
              className="fi fi-sr-angle-small-left text-[#B0B0B0]"
              onClick={handleCancel}
            ></i>
            <h1 className="text-[#0E212E] font-semibold text-[20px] font-inter">
              Monitoring Pictures{" "}
              <span className="text-[#B0B0B0] text-[14px]">
                {/* ({sitesDataMapViewData?.length || 0} Sites) */}
              </span>
            </h1>
          </div>

          <i
            className="fi fi-br-circle-xmark text-[20px] cursor-pointer"
            onClick={handleCancel}
          />
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7 grid grid-cols-10">
            <div className="col-span-3"></div>
            <div className="col-span-4"></div>
            <div className="col-span-3"></div>
          </div>
          <div className="col-span-5">
            <div className="">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
