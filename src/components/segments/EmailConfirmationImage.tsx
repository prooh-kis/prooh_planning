import { FileUploadButton } from "../../components/FileUploadButton"
import { ImageViewCloseButton } from "../../components/molecules/ImageViewCloseButton"

interface EmailConfirmationImageProps {
  files?: any;
  handleAddNewFile: (file: File) => void;
  removeImage: (file: any) => void;
}

export const EmailConfirmationImage = ({files, handleAddNewFile, removeImage}: EmailConfirmationImageProps) => {
  return (
    <div className="p-2 h-auto">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">
            3.Upload email approval screenshot
          </h1>
          <div className="flex items-center">
            <FileUploadButton handleFile={handleAddNewFile} width="" />
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

        <div className="flex justify-end items-bottom px-2">
          <p className="text-[12px] text-primaryButton underline">
            Skip    
          </p>
        </div>
      )}

    </div>
  )
}