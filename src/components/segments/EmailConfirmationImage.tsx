import { FileUploadButton } from "../../components/FileUploadButton"
import { ImageViewCloseButton } from "../../components/molecules/ImageViewCloseButton"

interface EmailConfirmationImageProps {
  files?: any;
  handleAddNewFile: (file: File) => void;
  removeImage: (file: any) => void;
}

export const EmailConfirmationImage = ({files, handleAddNewFile, removeImage}: EmailConfirmationImageProps) => {
  return (
    <div className="p-2">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">
            3.upload client approval screenshot
          </h1>
          <div className="flex items-center">
            <FileUploadButton handleFile={handleAddNewFile} width="" />
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          {files?.map((file: any, index: number) => (
            <ImageViewCloseButton
              file={file}
              key={index}
              removeImage={removeImage}
            />
          ))}
        </div>
      </div>
      
    </div>
  )
}