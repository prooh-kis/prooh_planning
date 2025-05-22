import { ShowMediaFile } from "./ShowMediaFIle";
import { ImageContainer, VideoContainer } from "./ShowMyFile";

export const ViewMediaForUploadCreatives = ({
  files,
  removeFile,
  viewCreativeType,
}: any) => {
  const showIcon = viewCreativeType === "0" ? false : true;

  return (
    <div className="pt-4">
      {files?.length > 0 && (
        <div key={files[0]?.url}>
          {files[0].fileType?.split("/")[0] === "image" ? (
            <ImageContainer
              url={files[0]?.url}
              className=" rounded-lg"
              height="207px"
              width="500px"
              showIcon={showIcon}
              removeFile={() => removeFile(files[0]?.url)}
            />
          ) : (
            <VideoContainer
              url={files[0]?.url}
              className=" rounded-lg"
              height="207px"
              width="500px"
              showIcon={showIcon}
              removeFile={() => removeFile(files[0]?.url)}
            />
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-4 pt-4">
        {files?.map((file: any, index: any) => {
          if (index === 0) return null;
          if (file.fileType.split("/")[0] === "image")
            return (
              <div className="w-[150px]" key={file?.url}>
                <ImageContainer
                  key={index}
                  url={file?.url}
                  className="rounded-lg "
                  height="102px"
                  width="150px"
                  showIcon={showIcon}
                  removeFile={removeFile}
                />
              </div>
            );
          else
            return (
              <div className="w-[150px]" key={file?.url}>
                <VideoContainer
                  key={index}
                  url={file?.url}
                  className="rounded-lg "
                  height="102px"
                  width="150px"
                  showIcon={showIcon}
                  removeFile={removeFile}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
};

export const ViewMediaForUploadCreatives2 = ({
  files,
  removeFile,
  viewCreativeType,
}: {
  files: Array<{ awsURL: string; fileType: string }>;
  removeFile: (url: string) => void;
  viewCreativeType: string;
}) => {
  const showIcon = viewCreativeType === "0" ? false : true;

  return (
    <div className="grid grid-cols-12 gap-4">
      {files?.map((file, index) => (
        <div className="col-span-4 relative" key={`${file.awsURL}-${index}`}>
          <ShowMediaFile
            url={file?.awsURL}
            mediaType={file.fileType.split("/")[0]}
            key={index}
            height="h-[160]"
            width="w-full"
          />
          {showIcon && (
            <button
              type="button"
              aria-label="Remove video"
              onClick={() => removeFile(file?.awsURL)}
              className="absolute top-2 right-2 bg-[#FF0808] text-[#FFFFFF] px-2 rounded-full focus:outline-none hover:bg-red-700"
            >
              &times;
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export const ViewMediaForUploadCreatives3 = ({
  files,
  removeFile,
  viewCreativeType,
}: {
  files: Array<{ url: string; type: string }>;
  removeFile: (url: string) => void;
  viewCreativeType: string;
}) => {
  const showIcon = viewCreativeType !== "0";

  return (
    <div className="grid grid-cols-12 gap-4">
      {files?.map((file, index) => (
        <div className="col-span-4 relative" key={`${file.url}-${index}`}>
          <ShowMediaFile
            url={file?.url}
            mediaType={file.type.split("/")[0]}
            key={index}
            height="h-[160]"
            width="w-full"
          />
          {showIcon && (
            <button
              type="button"
              aria-label="Remove video"
              onClick={() => removeFile(file?.url)}
              className="absolute top-2 right-2 bg-[#FF0808] text-[#FFFFFF] px-2 rounded-full focus:outline-none hover:bg-red-700"
            >
              &times;
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
