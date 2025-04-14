import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { Loading } from "../Loading";
import SingleCreativeInPopup from "../molecules/SingleCreativeInPopup";
import SearchInputField from "../molecules/SearchInputField";
import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { NoDataView } from "../../components/molecules/NoDataView";

interface UploadCreativesFromBucketPopupProps {
  onClose?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  brandName?: string;
  handleSaveCreative: any;
}
export function UploadCreativesFromBucketPopup({
  onClose,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  brandName,
  handleSaveCreative,
}: UploadCreativesFromBucketPopupProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreativeOpen, setIsCreativeOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [creativesMedia, setCreativesMedia] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const uniqueResolution = selectedScreens.reduce(
    (unique: any, screen: any) => {
      if (!unique.includes(screen.resolution)) {
        unique.push(screen.resolution);
      }
      return unique;
    },
    []
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const creativesMediaGet = useSelector(
    (state: any) => state.creativesMediaGet
  );
  const {
    loading: loadingCreatives,
    error: errorCreatives,
    data: creatives,
  } = creativesMediaGet;

  useEffect(() => {
    if (creatives && brandName) {
      setCreativesMedia(creatives[brandName]);
    }
  }, [brandName, creatives]);

  useEffect(() => {
    if (isCreativeOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCreativeOpen]);

  const isImageAvailable = () => {
    return mediaFiles.find((media: any) =>
      media.creativeType?.includes("image")
    )
      ? "h-[44vh]"
      : "h-[58vh]";
  };

  const handleSave = () => {
    console.log("save!");
    handleSaveCreative();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4 shadow-lg w-full max-w-full rounded-lg"
        style={{ height: "80vh", width: "80vw" }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-semibold text-[#092A41]">
            Choose Creatives
          </h1>
          <div className="flex gap-4 items-center">
            <PrimaryButton
              title="Save"
              rounded="rounded-[12px]"
              action={handleSave}
              disabled={isLoading}
              width="w-[150px]"
              height="h-[36px]"
            />
            <i
              className="fi fi-rr-cross-small text-[20px] hover:text-[#FF0000]"
              onClick={() => onClose()}
            ></i>
          </div>
        </div>

        <div className="grid grid-cols-12 pt-4">
          <div className="col-span-8 border border-1">
            <div className="flex flex-col justify-center">
              <div className="py-4 px-2">
                <SearchInputField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search Creative by creative name"
                />
              </div>
              {uniqueResolution?.length > 1 && (
                <h1 className="text-[10px] text-red-500">
                  Screens with different resolutions selected, please check and
                  proceed again
                </h1>
              )}
              {isLoading && (
                <h1 className="border border-1 bg-yellow-600 text-white text-lg px-8 py-2">
                  Wait for some time file is saving....
                </h1>
              )}
            </div>

            <div className="">
              {loadingCreatives ? (
                <Loading />
              ) : (
                <div className="px-2">
                  <TabWithoutIcon
                    tabData={creativesMedia?.map((data: any, index: any) => {
                      return {
                        id: index,
                        label: data?.network,
                      };
                    })}
                    setCurrentTab={setCurrentTab}
                    currentTab={currentTab}
                  />

                  {creativesMedia ? (
                    <div className={`h-[55vh] overflow-auto mt-2`}>
                      {Object.keys(creativesMedia?.[currentTab] || {})
                        ?.filter((c: any) => c !== "network")
                        ?.map((m: any, i: any) => (
                          <div key={i}>
                            <h1 className="text-[12px] font-semibold border-b">
                              {`${m}s`.toUpperCase()}
                            </h1>

                            {Object.keys(creativesMedia?.[currentTab][m])
                              ?.filter((c: any) => c !== "network")
                              ?.map((g: any, j: any) => (
                                <div key={j} className="py-2">
                                  <h1 className="text-[10px] py-1">
                                    Resolution: {g}
                                  </h1>
                                  <div className="grid grid-cols-3 gap-2">
                                    {creativesMedia?.[currentTab]?.[m]?.[g]
                                      ?.filter((l: any) =>
                                        l?.creativeName
                                          ?.toUpperCase()
                                          .includes(searchQuery?.toUpperCase())
                                      )
                                      ?.map((l: any, y: any) => (
                                        <div
                                          key={y}
                                          className="w-full border rounded"
                                          onClick={() => {
                                            setMediaFiles((prev: any) => {
                                              if (
                                                mediaFiles
                                                  ?.map((file: any) => file._id)
                                                  .includes(l._id)
                                              ) {
                                                return mediaFiles?.filter(
                                                  (file: any) =>
                                                    file._id !== l._id
                                                );
                                              } else {
                                                return [...prev, l];
                                              }
                                            });
                                          }}
                                        >
                                          <div className="w-full">
                                            <ShowMediaFile
                                              url={l?.awsURL}
                                              mediaType={l?.creativeType}
                                              key={y}
                                              height="h-full"
                                              width="w-full"
                                            />
                                          </div>
                                          <div className="p-1">
                                            <Tooltip
                                              title={`${l?.creativeName?.toUpperCase()}`}
                                            >
                                              <h1 className="text-[10px] truncate">
                                                {l?.creativeName?.toUpperCase()}
                                              </h1>
                                            </Tooltip>
                                            <div className="flex gap-1 items-center truncate">
                                              <h1 className="text-[12px]">
                                                {l?.extension?.split("/")[1]},
                                              </h1>
                                              <h1 className="text-[12px] truncate">
                                                {Number(l?.duration)?.toFixed(
                                                  2
                                                )}{" "}
                                                seconds
                                              </h1>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <NoDataView title="No Data Found, Please Upload Creatives in creative bucket " />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-4 border border-1 ">
            <div className="flex justify-between p-2 border border-1">
              <h1 className="test-[#092A41] text-[16px] font-semibold">
                Selected Creative: {mediaFiles?.length}
              </h1>
              <button
                className="text-[#000000] opacity-[50%] text-[14px] font-normal hover:text-[#129BFF] cursor-pointer"
                onClick={() => {
                  setMediaFiles([]);
                }}
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-col gap-2 p-2 relative overflow-scroll no-scrollbar">
              {mediaFiles?.map((media: any, index: any) => (
                <SingleCreativeInPopup
                  media={media}
                  handleDelete={setMediaFiles}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
