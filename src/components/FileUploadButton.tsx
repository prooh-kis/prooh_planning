import React, { useRef, ChangeEvent } from "react";

interface FileUploaderProps {
  handleFile: (files: any) => void;
  width: string;
  fileType: string;
}

export const FileUploadButton: React.FC<FileUploaderProps> = ({
  handleFile,
  width,
  fileType,
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files;
    if (fileUploaded) handleFile(fileUploaded);
    event.target.value = "";
  };

  const getContentType = () => {
    let type = "";
    if (fileType == "image") {
      type = "image/*";
    } else if (fileType == "video") {
      type = "video/*";
    } else {
      return type;
    }
    return type;
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className={
          width
            ? "border border-dashed border-2 border-[#129BFF] text-[#129BFF] rounded-2xl  bg-[#F4F9FF] py-1 w-full"
            : "border border-dashed border-2 border-[#129BFF] text-[#129BFF] rounded-2xl  bg-[#F4F9FF] py-1 w-32"
        }
      >
        + Upload
      </button>
      <input
        accept={getContentType()}
        title="select media"
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }} // Make the file input element invisible
        multiple={true}
        content="video/mp4"
      />
    </div>
  );
};
