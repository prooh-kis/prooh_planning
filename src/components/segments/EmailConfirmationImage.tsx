import { FileUploadButton } from "../../components/FileUploadButton"
import { ImageViewCloseButton } from "../../components/molecules/ImageViewCloseButton"

interface EmailConfirmationImageProps {
  files?: any;
  handleAddNewFile: (file: File) => void;
  removeImage: (file: any) => void;
  setSkipEmailConfirmation?: any;
  skipEmailConfirmation?: any;
}

export const EmailConfirmationImage = ({skipEmailConfirmation, setSkipEmailConfirmation, files, handleAddNewFile, removeImage}: EmailConfirmationImageProps) => {
  return (
    <div className="p-2 h-auto">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">
            3.Upload email approval screenshot
          </h1>
          <div className="flex items-center">
            <FileUploadButton
              handleFile={handleAddNewFile}
              width=""
              fileType={"any"}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          {files?.map((file: any, index: number) => (
            <ImageViewCloseButton
              file={file}
              key={index}
              removeImage={removeImage}
            />
          ))}
        </div>
      </div>
      {files?.length === 0 && (
        <div className="flex justify-end items-bottom px-2 cursor-pointer"
          onClick={() => setSkipEmailConfirmation(true)}
        >
          <p className="text-[12px] text-primaryButton underline">
            {skipEmailConfirmation ? "Skipped" :
              "Skip"
            }
          </p>
        </div>
      )}
    </div>
  );
}