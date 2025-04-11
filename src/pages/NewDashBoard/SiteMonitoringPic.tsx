import { SiteMapViewDetailsPopup } from "../../components/popup/SiteMapViewDetailsPopup";
import React, { useCallback, useState } from "react";

interface MonitoringProps {
  bg: string;
  text: string;
  label: string;
}

const Monitoring = ({ bg, text, label }: MonitoringProps) => {
  return (
    <div
      style={{ backgroundColor: bg, color: text }}
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full p-4 rounded-[9.51px]"
    >
      <p className="text-[12px] sm:text-[12.68px] font-medium leading-[100%] m-0 p-0">
        {label}
      </p>
      <div
        style={{ borderColor: text }}
        className="sm:h-full sm:border sm:border-l sm:border-r hidden sm:block"
      ></div>
      <p className="text-[14px] sm:text-[15.84px] font-bold leading-[100%] m-0 p-0">
        70%
      </p>
      <div
        style={{ borderColor: text }}
        className="sm:h-full sm:border sm:border-l sm:border-r hidden sm:block"
      ></div>
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
        {[
          { icon: "fi fi-ss-brightness", value: "70%" },
          { icon: "fi fi-ss-moon", value: "70%" },
          { icon: "fi fi-ss-map-marker-check", value: "70%" },
          { icon: "fi fi-sr-video-camera-alt", value: "70%" },
          { icon: "fi fi-sr-newspaper", value: "70%" },
        ].map((item, index) => (
          <div key={index} className="flex gap-1 text-[11px] items-center">
            <i className={item.icon}></i>
            <p className="font-bold m-0 p-0">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SiteMonitoringPic = ({ sitesDataMapViewData }: any) => {
  const [openSiteMapView, setOpenSiteMapView] = useState<boolean>(false);

  const handleCancel = () => {
    setOpenSiteMapView(false);
  };
  const handleOpenSiteMapView = useCallback(() => {
    setOpenSiteMapView(true);
  }, [openSiteMapView]);

  const updatedData = sitesDataMapViewData?.map((data: any) => {
    return {
      ...data,
      lat: data.location.latitude,
      lng: data.location.longitude,
      id: data.location._id,
      screenType: "Spectacular",
    };
  });
  return (
    <div className="bg-[#FFFFFF] mt-2 w-full border border-gray-100 rounded-[12px] p-4">
      {openSiteMapView && (
        <SiteMapViewDetailsPopup
          handleCancel={handleCancel}
          sitesDataMapViewData={updatedData}
        />
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-[15px] sm:text-[16px] py-2 font-semibold leading-[19.36px] text-[#0E212E]">
          Site Monitoring Pics - <span className="text-[#129BFF]">70%</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <div
            onClick={handleOpenSiteMapView}
            className=" cursor-pointer flex font-bold text-[13px] sm:text-[14px] text-[#129BFF] gap-1 items-center"
          >
            <i className="fi fi-sr-marker"></i>
            <p>Campaign On Map</p>
          </div>
          <div className="flex font-normal text-[13px] sm:text-[14px] text-[#637D90] gap-1 items-center">
            <p>View All Pics</p>
            <i className="fi fi-br-angle-small-right"></i>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        <Monitoring bg="#F5F9FF" text="#79B2DB" label="Start" />
        <Monitoring bg="#F4FFFA" text="#6EAD94" label="Mid" />
        <Monitoring bg="#F8F8FF" text="#AB90D2" label="End" />
      </div>
    </div>
  );
};
