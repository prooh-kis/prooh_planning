import { FileUploadButton } from "../../components/FileUploadButton"
import { ImageViewCloseButton } from "../../components/molecules/ImageViewCloseButton"

interface EmailConfirmationImageProps {
  files?: any;
  handleAddNewFile: (file: File) => void;
  removeImage: (file: any) => void;
  setSkipEmailConfirmation?: any;
  skipEmailConfirmation?: any;
  skipFunction?: any;
  page?: any;
}

export const EmailConfirmationImage = ({page, skipEmailConfirmation, setSkipEmailConfirmation, files, handleAddNewFile, removeImage, skipFunction}: EmailConfirmationImageProps) => {
  return (
    <div className="p-2 h-auto">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div>          
            <h1 className="font-semibold text-lg">
              Upload client approval screenshot
            </h1>
            <p className="text-[12px] text-[#6F7F8E]">Plan highlights to be sent on email</p>
          </div>

          {files?.length === 0 && (
            <div className="flex justify-end items-bottom px-2 cursor-pointer"
              onClick={() => {
                setSkipEmailConfirmation(true);
                skipFunction();
              }}
            >
              <p className="text-[12px]">
                Or{" "}
                <span className=" text-primaryButton underline">
                  {skipEmailConfirmation ? "Skipped" :
                    "Skip"
                  }
                </span>
                {" "}this step
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-2">
          <div className="flex gap-4">
            {files?.map((file: any, index: number) => (
              <ImageViewCloseButton
                file={file}
                key={index}
                removeImage={removeImage}
              />
            ))}
            <div className="flex items-center gap-4">
              {[1]?.map((_: any, i: any) => (
                <div key={i} className="relative inline-block">
                  <div
                    className="w-20 h-20 object-cover rounded-lg shadow-md flex items-center justify-center"
                    
                  >
                    <i className="fi fi-br-plus-small flex items-center text-[36px] text-[#D7D7D7]"></i>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
          <div className="flex items-center">
            <FileUploadButton
              handleFile={handleAddNewFile}
              width=""
              fileType={"image"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}