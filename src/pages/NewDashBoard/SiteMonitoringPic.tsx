import { SiteMapViewDetailsPopup } from "../../components/popup/SiteMapViewDetailsPopup";
import React, { useCallback, useState } from "react";
import { MonitoringPicturesAllSitesPopup } from "./MonitoringPicturesAllSitesPopup";

interface MonitoringProps {
  bg: string;
  text: string;
  label: string;
}

const Monitoring = ({ bg, text, label }: MonitoringProps) => {
  return (
    <div
      // style={{ backgroundColor: bg, color: text }}
      className="col-span-1 border border-gray gap-2 sm:gap-4 w-full p-2 rounded-md"
    >
      <div style={{ backgroundColor: bg, color: text }}
        className="p-2 rounded-md flex items-center justify-center gap-2"
      >
        <div
          style={{ background: text }}
        className="h-2 w-2 rounded-full"></div>
        <p className="text-[12px] font-medium leading-[100%] m-0 p-0">
          {label}
        </p>
        <p className="text-[12px] font-bold leading-[100%] m-0 p-0">
          70%
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center p-2">
        {[
          { icon: "fi fi-ss-brightness flex items-center", value: "70%" },
          { icon: "fi fi-ss-moon flex items-center", value: "70%" },
          { icon: "fi fi-ss-map-marker-check flex items-center", value: "70%" },
          { icon: "fi fi-sr-video-camera-alt flex items-center", value: "70%" },
          { icon: "fi fi-sr-newspaper flex items-center", value: "70%" },
        ].map((item, index) => (
          <div key={index} className="flex gap-1 text-[11px] items-center">
            <i style={{color: text}} className={item.icon}></i>
            <p className="font-bold m-0 p-0 text-[#00000090]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SiteMonitoringPic = ({ sitesDataMapViewData, openSiteMapView, setOpenSiteMapView, openMonitoringView, setOpenMonitoringView}: any) => {

  const handleCancel = () => {
    setOpenSiteMapView(false);
  };
  const handleOpenSiteMapView = useCallback(() => {
    setOpenSiteMapView(true);
  }, [setOpenSiteMapView]);

  const handleCancelMonitoringPopup = () => {
    setOpenMonitoringView(false);
  };
  const handleOpenMonitoringPicsView = useCallback(() => {
    setOpenMonitoringView(true)
  },[setOpenMonitoringView]);

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
      {openMonitoringView && (
        <MonitoringPicturesAllSitesPopup
          handleCancel={handleCancelMonitoringPopup}

        />
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-[15px] sm:text-[16px] py-2 font-semibold leading-[19.36px] text-[#0E212E]">
          Site Monitoring Pics <span className="text-[#D7D7D7]">(70%)</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <div
            onClick={handleOpenSiteMapView}
            className=" cursor-pointer flex font-bold text-[13px] sm:text-[14px] text-[#129BFF] gap-1 items-center"
          >
            <i className="fi fi-sr-marker"></i>
            <p>Campaign On Map</p>
          </div>
          <div className="cursor-pointer flex font-normal text-[13px] sm:text-[14px] text-[#637D90] gap-1 items-center"
            onClick={handleOpenMonitoringPicsView}
          >
            <p>View All Pics</p>
            <i className="fi fi-br-angle-small-right"></i>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        <Monitoring bg="#F4FFF6" text="#5AAF69" label="Start" />
        <Monitoring bg="#FFF9F3" text="#FF8D22" label="Mid" />
        <Monitoring bg="#FFF8F4" text="#E43535" label="End" />
      </div>
    </div>
  );
};
