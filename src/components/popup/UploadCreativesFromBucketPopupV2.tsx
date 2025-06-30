import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import "react-toastify/dist/ReactToastify.css";
import { message, Radio, Tooltip } from "antd";
import { Loading } from "../Loading";
import { NoDataView } from "../../components/molecules/NoDataView";
import ButtonInput from "../../components/atoms/ButtonInput";
import type { RadioChangeEvent } from "antd";

interface UploadCreativesFromBucketPopupPropsV2 {
  onClose?: any;
  selectedScreens?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  brandName?: string;
  handleSaveCreative: any;
  loading: Boolean;
  label: string;
  creatives: any[];
  setLabel: any;
  // ratio: string;
  tabData: any[];
}
export function UploadCreativesFromBucketPopupV2({
  onClose,
  selectedScreens,
  mediaFiles,
  setMediaFiles,
  brandName,
  handleSaveCreative,
  loading,
  label,
  creatives,
  setLabel,
  tabData,
}: // ratio,
UploadCreativesFromBucketPopupPropsV2) {
  const handleSave = () => {
    console.log("save!");
    handleSaveCreative();
  };

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio1 checked", value);
    setLabel(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white py-2 px-4 shadow-lg w-full max-w-full rounded-lg"
        style={{ height: "80vh", width: "80vw" }}
      >
        <div className="flex justify-between items-center py-2">
          <div className="cursor-pointer flex gap-2 items-center hover:text-bold">
            <i className="fi fi-sr-folder flex items-center text-[#F1BC00]" />
            <h1 className="w-full">{brandName}</h1>
          </div>
          <div className="flex gap-4 items-center">
            <ButtonInput
              variant="danger"
              onClick={() => onClose()}
              className="w-[120px]"
            >
              Cancel
            </ButtonInput>
            <ButtonInput onClick={handleSave} className="w-[120px]">
              Save
            </ButtonInput>
          </div>
        </div>
        <div className="py-2 border-t border-b">
          <div className="flex gap-4">
            <h1>Creative Use For</h1>
            <Radio.Group
              value={label}
              onChange={onChange1}
              // options={[
              //   { value: "standardDayTimeCreatives", label: "Day" },
              //   { value: "standardNightTimeCreatives", label: "Night" },
              //   { value: "triggerCreatives", label: "Trigger" },
              // ]}
              options={tabData?.map((tab: any) => {
                return { value: tab.id, label: tab.label?.split("(")[0] };
              })}
            />
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="py-2 flex gap-4">
            <h1 className="text-[14px] text-[#092A41]">
              Total Creatives :{" "}
              <span className="font-semibold">{creatives?.length}</span>
            </h1>
            <h1 className="text-[14px] text-[#092A41]">
              Selected Creatives :{" "}
              <span className="font-semibold">{mediaFiles?.length}</span>
            </h1>
          </div>
          <h1
            className="cursor-pointer hover:text-[#129BFF]"
            title="Clear all selected media"
            onClick={() => setMediaFiles([])}
          >
            Clear All
          </h1>
        </div>

        <div>
          {loading ? (
            <Loading />
          ) : creatives?.length === 0 ? (
            <NoDataView title="No creative in bucket, creative will show next time, while creating campaign" />
          ) : (
            <div className="grid grid-cols-12 gap-4 h-[56vh] overflow-scroll scrollbar-minima">
              {creatives?.map((creative: any, index: number) => (
                <div
                  className="col-span-3 relative hover:bg-gray-300"
                  key={index}
                >
                  {/* Checkbox positioned absolutely on top of ShowMediaFile */}
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={mediaFiles?.some(
                        (file: any) => file._id === creative?._id
                      )}
                      onChange={() => {
                        setMediaFiles((prev: any) => {
                          if (
                            prev?.find(
                              (file: any) => file._id === creative?._id
                            )
                          ) {
                            return mediaFiles?.filter(
                              (file: any) => file._id !== creative._id
                            );
                          } else {
                            return [...prev, creative];
                          }
                        });
                      }}
                    />
                  </div>

                  {/* Clickable area for the media file */}
                  <div
                    onClick={() => {
                      setMediaFiles((prev: any) => {
                        if (
                          prev?.find((file: any) => file._id === creative?._id)
                        ) {
                          return mediaFiles?.filter(
                            (file: any) => file._id !== creative._id
                          );
                        } else {
                          return [...prev, creative];
                        }
                      });
                    }}
                    className="rounded-[12px]"
                  >
                    <ShowMediaFile
                      url={creative?.url}
                      mediaType={creative?.creativeType}
                      key={index}
                      height="h-[160px]"
                      width="w-full"
                    />
                  </div>

                  <div className="p-1">
                    <Tooltip title={`${creative?.creativeName?.toUpperCase()}`}>
                      <h1 className="text-[10px] truncate">
                        {creative?.creativeName?.toUpperCase()}
                      </h1>
                    </Tooltip>
                    <div className="flex gap-1 items-center truncate">
                      <h1 className="text-[12px]">{creative?.extension},</h1>
                      <h1 className="text-[12px] truncate">
                        {Number(creative?.duration)?.toFixed(2)} seconds
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
