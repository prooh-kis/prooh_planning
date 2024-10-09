import { ConformationModel } from "../../components/popup/ConformationModel";
import { FileUploadButton } from "../../components/FileUploadButton";
import { ImageContainer, VideoContainer } from "./ShowMyFile";
import { Radio } from "antd";

export const UploadCreativeForStandardCampaign = ({
  handleSelectFileType,
  selectFileType,
  handleAddNewFile,
  file,
  handleSaveFile,
  removeFile,
}: any) => {
  return (
    <div className="p-4">
      <h1 className="py-2">Upload creative</h1>
      <Radio.Group
        onChange={handleSelectFileType}
        value={selectFileType}
        className="py-2"
      >
        <Radio value={"video"}>Video</Radio>
        <Radio value={"image"}>Image</Radio>
      </Radio.Group>
      <FileUploadButton handleFile={handleAddNewFile} width={"full"} />
      <div className="pt-4">
        {file ? (
          selectFileType === "image" ? (
            <ImageContainer
              url={file?.url}
              className=" rounded-lg"
              height="207px"
              width="383px"
              removeFile={removeFile}
            />
          ) : (
            <VideoContainer
              url={file?.url}
              className=" rounded-lg"
              height="207px"
              width="383px"
              removeFile={removeFile}
            />
          )
        ) : null}
      </div>
      <ConformationModel
        handleConfirm={(value: boolean) => {
          if (value) {
            handleSaveFile();
          }
        }}
      />
    </div>
  );
};

export const UploadCreativeForTriggerCampaign = ({
  handleSelectFileType,
  selectFileType,
  handleAddNewFile,
  file,
  handleSaveFile,
}: any) => {
  return (
    <div className="p-2">
      <h1 className="font-semibold">Selected trigger</h1>
      <h1 className="pt-4 font-semibold">Sports trigger</h1>
      <h1>when virat kohli hits 6</h1>
      <h1 className="pt-2 font-semibold">Upload creative</h1>
      <Radio.Group
        onChange={handleSelectFileType}
        value={selectFileType}
        className=""
      >
        <Radio value={"video"}>Video</Radio>
        <Radio value={"image"}>Image</Radio>
      </Radio.Group>
      <FileUploadButton handleFile={handleAddNewFile} width={"full"} />
      <div className="pt-4">
        {file ? (
          selectFileType === "image" ? (
            <ImageContainer
              url={file?.url}
              className=" rounded-lg"
              height="207px"
              width="383px"
            />
          ) : (
            <VideoContainer
              url={file?.url}
              className=" rounded-lg"
              height="207px"
              width="383px"
            />
          )
        ) : null}
      </div>
      <ConformationModel
        handleConfirm={(value: boolean) => {
          if (value) {
            handleSaveFile();
          }
        }}
      />
    </div>
  );
};
