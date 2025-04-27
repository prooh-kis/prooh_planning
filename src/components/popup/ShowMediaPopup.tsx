import { convertDataTimeToLocale } from "../../utils/dateAndTimeUtils";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import React, { useEffect, useState } from "react";
import {
  ImageContainer,
  VideoContainer,
} from "../../components/molecules/ShowMyFile";

interface ShowMediaPopupProps {
  openShowMediaPopup?: any;
  creativesToShow?: any;
  loading?: any;
  onClose?: any;
  error?: any;
  screenName?: any;
}

export function ShowMediaPopup({
  openShowMediaPopup,
  creativesToShow,
  loading,
  error,
  onClose,
  screenName,
}: ShowMediaPopupProps) {
  const [creativesKind, setCreativesKind] = useState<any>([
    {
      label: "Day Time Creatives",
      value: "standardDayTimeCreatives",
    },
    {
      label: "Night Time Creatives",
      value: "standardNightTimeCreatives",
    },
    {
      label: "Trigger Creatives",
      value: "triggerCreatives",
    },
  ]);
  useEffect(() => {
    if (openShowMediaPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openShowMediaPopup]);

  if (!openShowMediaPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-3/4 w-3/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose()}
        >
          <i className="fi fi-br-cross"></i>
        </div>
        <div className="p-2 overflow-scroll no-scrollbar h-[65vh]">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {loading ? (
              <div className="w-full h-[50vh] border">
                <SkeletonLoader />
              </div>
            ) : error ? (
              <div>
                <h1>{error?.message}</h1>
              </div>
            ) : (
              <div className="w-full">
                {creativesToShow.screenId === "" ? (
                  <h1>{`Something went wrong, close the popup and click on creative icon to see the creatives of your chosen screens`}</h1>
                ) : (
                  <div className="w-full">
                    <div className="p-2 flex items-end gap-2 border-b">
                      <h1 className="md:text-[14px] sm:text-[12px]">
                        Screen Name:
                      </h1>
                      <h1 className="md:text-[16px] sm:text-[14px] font-bold">
                        {creativesToShow?.screenName}
                      </h1>
                    </div>
                    {creativesKind?.map((c: any, i: any) => (
                      <div key={i}>
                        <div className="border-b p-2">
                          <h1 className="md:text-[16px] sm:text-[14px] font-semibold">
                            {c.label}
                          </h1>
                          <h1 className="md:text-[14px] sm:text-[12px]">
                            {creativesToShow?.creatives[c.value]?.length}{" "}
                            creatives
                          </h1>
                        </div>
                        {creativesToShow?.creatives[c.value]?.map(
                          (cr: any, j: any) => (
                            <div className="grid grid-cols-2 gap-2 p-2" key={j}>
                              {cr.type?.split("/")[0] === "image" ? (
                                <ImageContainer
                                  url={cr?.url}
                                  className=" rounded-lg"
                                  height="207px"
                                  width="full"
                                  showIcon={false}
                                  // removeFile={() => removeFile(files[0]?.url)}
                                />
                              ) : (
                                <VideoContainer
                                  url={cr?.url}
                                  className=" rounded-lg"
                                  height="207px"
                                  width="full"
                                  showIcon={false}
                                  // removeFile={() => removeFile(files[0]?.url)}
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
