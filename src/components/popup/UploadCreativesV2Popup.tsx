import { useEffect, useState } from "react";
import { ShowMediaFile } from "../molecules/ShowMediaFIle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { PrimaryButton } from "../atoms/PrimaryButton";
import {
  getAllBrandAndNetworkAction,
  getCreativesMediaAction,
  uploadCreativesMediaAction,
} from "../../actions/creativeAction";
import { useLocation } from "react-router-dom";
import {
  getImageResolution,
  getVideoDurationFromVideoURL,
  getVideoResolution,
} from "../../utils/fileUtils";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../utils/awsUtils";
import { MultipleFileUploader } from "../../components/molecules/MultipleFileUploader";
import { UPLOAD_CREATIVES_RESET } from "../../constants/creativeConstants";
import { SuggestionInput } from "../../components/atoms/SuggestionInput";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import {
  ALL_BRAND_LIST,
  ALL_PACKAGE_LIST,
} from "../../constants/localStorageConstants";
import { CREATIVE_ADD_PLANNING_PAGE } from "../../constants/userConstants";

interface UploadCreativesV2PopupProps {
  onClose?: any;
  mediaFiles?: any;
  setMediaFiles?: any;
  isOpen?: any;
  brandName?: any;
  setBrandName?: any;
  network?: string;
  setNetwork?: any;
  userInfo?: any;
  purpose: string;
}
export function UploadCreativesV2Popup({
  onClose,
  mediaFiles,
  setMediaFiles,
  isOpen,
  brandName,
  setBrandName,
  network,
  setNetwork,
  userInfo,
  purpose,
}: UploadCreativesV2PopupProps) {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const creativeId =
    pathname?.split("/")?.length > 2
      ? pathname?.split("/")?.splice(2)[0]
      : null;

  const creativesMediaUpload = useSelector(
    (state: any) => state.creativesMediaUpload
  );
  const {
    loading: loadingUpload,
    error: errorUpload,
    success: successUpload,
  } = creativesMediaUpload;

  const openErrorToast = (message: string) => {
    toast.error(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  const openSuccessToast = (message: string) => {
    toast.success(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  useEffect(() => {
    if (errorUpload) {
      setLoading(false);
      dispatch({ type: UPLOAD_CREATIVES_RESET });
    }
    if (successUpload) {
      openSuccessToast("Creative uploaded successfully!");
      setMediaFiles([]);
      setBrandName("");
      setNetwork("");
      setLoading(false);
      dispatch({ type: UPLOAD_CREATIVES_RESET });
      dispatch(getAllBrandAndNetworkAction());
      dispatch(getCreativesMediaAction({ userId: userInfo?._id }));
      onClose();
    }
  }, [dispatch, successUpload, errorUpload]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const validateSelectedFile = (file: any) => {
    // const MIN_FILE_SIZE = 1024; // 1MB
    let mb = 1000; // mb
    const MAX_FILE_SIZE = mb * 1000 * 1024; // 5MB
    const fileExtension = file.type.split("/")[1];
    const fileSizeKiloBytes = file.size; // convert to kb
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      openErrorToast(
        "File size is greater than maximum limit. File size must be less then 50 MB "
      );
      return false;
    }
    if (
      !(
        fileExtension === "mp4" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png"
      )
    ) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (brandName === "") {
      message.error("Please enter a brand name");
      return false;
    } else if (network === "") {
      message.error("Please select a network");
      return false;
    } else {
      return true;
    }
  };

  const handleFilesUploader = async (files: FileList) => {
    if (files) {
      const mediaFilesArray: any = [];
      for (let file of Array.from(files)) {
        if (
          file.type.startsWith("image/") ||
          file.type.startsWith("video/") ||
          file.type.startsWith("audio/")
        ) {
          const url = URL.createObjectURL(file);
          let duration: any = 10;
          let resolution: any = {};
          if (file.type.split("/")[0] != "image") {
            duration = await getVideoDurationFromVideoURL(url);
            resolution = await getVideoResolution(url);
          } else {
            duration = 10;
            resolution = await getImageResolution(url);
          }
          if (validateSelectedFile(file))
            mediaFilesArray.push({
              file: file,
              url,
              type: file.type,
              awsURL: "",
              fileSize: file.size,
              extension: file.type,
              creativeType: file.type.split("/")[0],
              duration: duration,
              resolution: resolution,
              creativeName: file?.name?.split(".")[0],
            });
        }
      }
      setMediaFiles(mediaFilesArray);
    }
  };

  const createNewCreatives = async () => {
    let myData = mediaFiles;
    try {
      for (let data of myData) {
        if (data.awsURL === "") {
          const aws = await getAWSUrlToUploadFile(
            data?.extension.toString(),
            data?.creativeName?.toString(),
          );
          const successAWSUploadFile = await saveFileOnAWS(aws?.url, data.file);
          data.awsURL = aws?.awsURL;
          data.url = aws?.url;
        }
      }

      dispatch(
        uploadCreativesMediaAction({
          id: creativeId,
          userId: userInfo?._id,
          brand: brandName?.toUpperCase(),
          network: network?.toUpperCase(),
          creatives: myData,
          event : CREATIVE_ADD_PLANNING_PAGE
        })
      );
    } catch (error) {
      setLoading(false);
      message.error(`createNewCreatives Error , ${error}`);
    }
  };

  const handleCreateCreatives = () => {
    if (validateForm()) {
      setLoading(true);
      createNewCreatives();
    }
  };

  const handleDelete = (index: any) => {
    setMediaFiles(mediaFiles?.filter((_: any, i: any) => i != index));
  };

  const handleAddBrandName = (value: string) => {
    if (purpose === "New") {
      let oldBrandName = getDataFromLocalStorage(ALL_BRAND_LIST)?.find(
        (data: string) => data === value
      );
      if (oldBrandName) {
        message.warning(
          "Brand name already exist, try new brand name, other wise go with other flow of upload creative"
        );
      }
    }
    setBrandName(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-1">
      <div
        className="bg-white p-4  shadow-lg w-9/12 max-w-full h-full flex flex-col justify-between"
        style={{ height: "70vh", width: "50vw" }}
      >
        <div className="">
          <div className="flex p-2 justify-between">
            <h1 className="text-[16px] font-semibold">
              {purpose === "New"
                ? "Add New Creative With New Brand And New Network"
                : "Add Creatives"}
            </h1>
            <i className="fi fi-rr-cross-small" onClick={() => onClose()}></i>
          </div>
          <div className="p-2">
            <div className="py-1">
              <SuggestionInput
                suggestions={getDataFromLocalStorage(ALL_BRAND_LIST)}
                onChange={(value: string) =>
                  handleAddBrandName(value?.toUpperCase())
                }
                value={brandName || ""}
                placeholder="Brand Name"
              />
            </div>
            <div className="py-1">
              <SuggestionInput
                suggestions={getDataFromLocalStorage(ALL_PACKAGE_LIST)}
                onChange={(value: string) => setNetwork(value)}
                value={network || ""}
                placeholder="Network"
              />
            </div>
          </div>
          <div className="px-2 relative overflow-auto h-auto">
            {mediaFiles?.length === 0 && (
              <div className="py-2">
                <MultipleFileUploader
                  handleFilesUploader={handleFilesUploader}
                  fileType="all"
                />
                <h1 className="text-[10px] text-red-700">{`Max file size less then 50 MB`}</h1>
              </div>
            )}

            {mediaFiles?.length > 0 && (
              <div className="h-[35vh]">
                <div className="flex fle-row justify-between">
                  <p className="py-1">Uploaded media</p>
                  <button
                    className=""
                    type="submit"
                    onClick={() => {
                      setMediaFiles([]);
                    }}
                  >
                    Reset
                  </button>
                </div>
                <div className="flex flex-wrap justify-center overflow-y-auto no-scrollbar h-[30vh] gap-4">
                  {mediaFiles?.map((media: any, index: any) => (
                    <ShowMediaFile
                      url={media.awsURL || media.url}
                      mediaType={media?.creativeType}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-2 w-full bottom-0">
          <PrimaryButton
            title="Upload"
            rounded="rounded"
            width="w-full"
            action={handleCreateCreatives}
            disabled={loading || loadingUpload}
            // loading={loading || loadingUpload}
            // loadingText="updating..."
          />
        </div>
      </div>
      <div className="pt-20">
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}
