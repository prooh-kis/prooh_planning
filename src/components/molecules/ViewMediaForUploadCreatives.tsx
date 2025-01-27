import { ImageContainer, VideoContainer } from "./ShowMyFile";

export const ViewMediaForUploadCreatives = ({ files, removeFile }: any) => {
  return (
    <div className="pt-4">
      {files?.length > 0 && (
        <div>
          {files[0].fileType?.split("/")[0] === "image" ? (
            <ImageContainer
              url={files[0]?.url}
              className=" rounded-lg"
              height="207px"
              width="500px"
              removeFile={() => removeFile(files[0]?.url)}
            />
          ) : (
            <VideoContainer
              url={files[0]?.url}
              className=" rounded-lg"
              height="207px"
              width="500px"
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
              <ImageContainer
                key={index}
                url={file?.url}
                className="rounded-lg "
                height="102px"
                width="150px"
                removeFile={removeFile}
              />
            );
          else
            return (
              <VideoContainer
                key={index}
                url={file?.url}
                className="rounded-lg "
                height="102px"
                width="150px"
                removeFile={removeFile}
              />
            );
        })}
      </div>
    </div>
  );
};
