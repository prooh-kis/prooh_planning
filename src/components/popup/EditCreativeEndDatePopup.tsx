import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import { isValidUrl } from "../../utils/valueValidate";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { message, Tooltip } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { Loading } from "../Loading";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { CalendarInput } from "../../components/atoms/CalendarInput";
import {
  editCampaignCreativesEndDateAction
} from "../../actions/campaignAction";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import SingleCreativeInPopup from "../molecules/SingleCreativeInPopup";
import SearchInputField from "../../components/molecules/SearchInputField";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { format, toZonedTime } from "date-fns-tz";
import { CAMPAIGN_CHANGE_DATE_AND_CREATIVE_PLANNING_PAGE } from "../../constants/userConstants";

interface EditCreativeEndDatePopupProps {
  onClose?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  campaign?: any;
  campaignType?: any;
  screenData?: any;
}
export function EditCreativeEndDatePopup({
  onClose,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  campaign,
  campaignType,
  screenData,
}: EditCreativeEndDatePopupProps) {
  const dispatch = useDispatch<any>();
  const [campaignOption, setCampaignOption] = useState("Image/Video");
  const [url, setUrl] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreativeOpen, setIsCreativeOpen] = useState<boolean>(false);

  const [duration, setDuration] = useState<any>(
    campaign?.creatives?.creativeDuration || 10
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [creativesMedia, setCreativesMedia] = useState<any>([]);

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

  const originalDate = campaign?.endDate || new Date();

  const timeZone = "Asia/Kolkata"; // UTC+5:30
  // Convert the UTC date string to the target timezone
  const zonedDate = toZonedTime(originalDate, timeZone);
  // Format the zoned date into the desired string format
  const formattedDate = format(zonedDate, "yyyy-MM-dd HH:mm:ss", { timeZone });
  const [endDate, setEndDate] = useState<any>(formattedDate);

  useEffect(() => {
    if (creatives && campaign?.brandName) {
      setCreativesMedia(creatives[campaign?.brandName]);
    }
  }, [campaign, creatives]);

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

  const handleAddCampaignOption = (checked: boolean) => {
    if (checked) {
      setCampaignOption("URL");
    } else {
      setCampaignOption("Image/Video");
    }
  };

  const handelDiscard = () => {
    setMediaFiles([]);
    setUrl("");
    setIsLoading(false);
    onClose();
  };

  const createCampaignFromMedia = () => {
    setIsLoading(true);

    const selectedScreenIds = selectedScreens?.map((s: any) => s._id);
    let dataToUpload: any = [];
    mediaFiles?.map((item: any) => {
      const mediaData = {
        resolution: `${item.resolution.width}x${item.resolution.height}`,
        type: item.extension,
        url: item.awsURL,
        size: item.fileSize,
        _id: { $oid: item._id },
        duration: item?.duration ? item?.duration : duration,
      };
      dataToUpload.push(mediaData);
    });

    let creativeDataToUpload: any = {};

    const scrData = screenData?.filter((scr: any) =>
      scr.screens?.map((s: any) => s.id).includes(selectedScreenIds[0])
    )[0]; // for (const scr of screenData) {

    const standardDayTimeCreatives: any = [
      ...(scrData?.standardDayTimeCreatives || []),
    ]; // Clone the array

    if (campaignType === "Default") {
      let creativesForDefault: any = [];
      dataToUpload.forEach((data: any) => {
        creativesForDefault.push({
          fileSize: data.size,
          fileType: data.type.toString().split("/")[0],
          url: data.url,
          name: data.url.split("/")[3],
          mediaId: data.url.split("/")[3].split(".")[0],
        });
      });
    } else {
      let duration1 = Math.max(
        ...dataToUpload?.map((data: any) => parseInt(data.duration))
      );
      dataToUpload.forEach((data: any) => {
        if (!standardDayTimeCreatives?.some((f: any) => f.url === data.url)) {
          standardDayTimeCreatives.push({
            size: data.size,
            type: data.type,
            url: data.url,
          });
        }
      });

      // console.log("duration1 : ", duration1);
      creativeDataToUpload = {
        creativeDuration: mediaFiles?.length > 0 ? duration1 : duration,
        standardDayTimeCreatives: standardDayTimeCreatives,
        standardNightTimeCreatives: [],
        triggerCreatives: [],
      };
      // FFF
      dispatch(
        editCampaignCreativesEndDateAction({
          campaignId: campaign._id,
          endDate: endDate
            ? new Date(endDate).toISOString()
            : new Date(campaign.endDate).toISOString(),
          duration: creativeDataToUpload.creativeDuration,
          creatives:
            creativeDataToUpload?.standardDayTimeCreatives?.length > 0
              ? creativeDataToUpload
              : null,
          event : CAMPAIGN_CHANGE_DATE_AND_CREATIVE_PLANNING_PAGE
        })
      );
    }

    setIsLoading(false);
    setIsCreativeOpen(false);

    message.success("Campaign creative/end date change initialized");

    handelDiscard();
  };

  const createCampaignFromURL = () => {
    setIsLoading(true);
    const campData =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
        campaign.campaignCreationId
      ];
    setTimeout(() => {
      handelDiscard();
    }, 0);
  };

  const validateForm = () => {
    if (campaignOption === "URL" && !isValidUrl(url)) {
      message.error("Please enter valid url");
      setUrl("");
      return false;
    } else if (selectedScreens?.length === 0) {
      message.error("Please Select at least one screen");
      return false;
    } else {
      return true;
    }
  };
  const handleNext = (e: any) => {
    if (validateForm()) {
      if (url?.length > 0 && campaignOption === "URL") {
        createCampaignFromURL();
      } else {
        createCampaignFromMedia();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4  shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "80vh", width: "70vw" }}
      >
        <div className="flex justify-between">
          <h1>
            Edit Campaign{" "}
            <span className="font-bold text-green-600">{campaign?.name}</span>
          </h1>
          <i className="fi fi-rr-cross-small" onClick={() => onClose()}></i>
        </div>
        <div className="flex pt-4">
          <div className="w-[80%] border border-1 p-2">
            <div className="flex flex-col justify-center">
              <div className="flex justify-between border border-1 p-2 text-[12px]">
                <h1 className="">Screen: {selectedScreens?.length}</h1>
                <div className="flex flex-row gap-1">
                  <input
                    placeholder="a"
                    type="checkbox"
                    id="url"
                    checked={campaignOption === "URL" ? true : false}
                    onChange={(e) => handleAddCampaignOption(e.target.checked)}
                  />
                  <label className="text-sm font-black" htmlFor="url">
                    url
                  </label>
                </div>
                <h1>Resolution: {screenData?.resolution}</h1>
              </div>

              {isLoading && (
                <h1 className="border border-1 bg-yellow-600 text-white text-lg px-8 py-2">
                  Wait for some time file is saving....
                </h1>
              )}
            </div>
            {campaignOption === "URL" ? (
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h1>Media URL:</h1>
                  <input
                    placeholder="Enter media url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border border-gray-300 rounded-sm w-full h-10 text text-sm text-black-600 p-2"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="col-span-1 flex flex-col py-2">
                    <h1 className="block text-secondaryText text-[12px]">
                      Change End Date
                    </h1>
                    <CalendarInput
                      placeholder={endDate}
                      value={endDate ? endDate : campaign?.endDate}
                      action={(e: any) => {
                        setEndDate(e);
                      }}
                      minDate={campaign?.startDate || new Date()}
                      disabled={false}
                    />
                  </div>
                  <div className="col-span-1 flex flex-col py-2">
                    <label className="block text-secondaryText text-[12px]">
                      Creative Duration
                    </label>
                    <PrimaryInput
                      inputType="number"
                      placeholder="10"
                      value={duration}
                      action={setDuration}
                    />
                  </div>
                </div>

                <h1 className="text-[14px] font-semibold py-1">
                  Select from creatives
                </h1>
                <SearchInputField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search Creative by creative name"
                />
                {loadingCreatives ? (
                  <Loading />
                ) : (
                  <div className="pt-2">
                    <div className="py-1">
                      <TabWithoutIcon
                        tabData={creativesMedia?.map(
                          (data: any, index: any) => {
                            return {
                              id: index,
                              label: data?.network,
                            };
                          }
                        )}
                        setCurrentTab={setCurrentTab}
                        currentTab={currentTab}
                      />
                    </div>
                    {creativesMedia && (
                      <div className="h-[40vh] overflow-auto">
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
                                    <div className="grid grid-cols-3 gap-1">
                                      {creativesMedia?.[currentTab]?.[m]?.[g]
                                        ?.filter((l: any) =>
                                          l?.creativeName
                                            ?.toUpperCase()
                                            .includes(
                                              searchQuery?.toUpperCase()
                                            )
                                        )
                                        ?.map((l: any, y: any) => (
                                          <div
                                            key={y}
                                            className="w-full border rounded"
                                            onClick={() => {
                                              setMediaFiles((prev: any) => {
                                                if (
                                                  mediaFiles
                                                    ?.map(
                                                      (file: any) => file._id
                                                    )
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
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-[40%] border border-1 ">
            <div className="flex justify-between p-2 border border-1">
              <h1 className="test-[#092A41] text-[16px] font-semibold">
                Selected Creative: {mediaFiles?.length}
              </h1>
              <button
                className="text-[#000000] opacity-[50%] text-[14px] font-normal"
                onClick={() => {
                  setMediaFiles([]);
                }}
              >
                Clear All
              </button>
            </div>
            {campaignOption !== "URL" && mediaFiles?.length > 0 && (
              <div className="flex flex-col gap-1 p-2 h-[45vh] overflow-auto">
                {mediaFiles?.map((media: any, index: any) => (
                  <SingleCreativeInPopup
                    media={media}
                    handleDelete={setMediaFiles}
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <PrimaryButton
          title="Upload"
          rounded="rounded-[12px]"
          action={handleNext}
          disabled={isLoading}
          width="w-[100vw]"
        />
      </div>
    </div>
  );
}
