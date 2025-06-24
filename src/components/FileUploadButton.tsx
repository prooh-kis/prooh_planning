import React, { useRef, ChangeEvent } from "react";

interface FileUploaderProps {
  handleFile: (files: any) => void;
  width: string;
  fileType?: string;
}

interface FileUploaderProps2 {
  handleFile: (files: any) => void;
  width: string;
  fileType?: string;
  title: string;
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
    const fileUploaded = event.target.files?.[0];
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
            ? "border border-dashed border-2 border-[#129BFF] text-[#129BFF] rounded-2xl  bg-[#F4F9FF] w-full"
            : "h-[24px] border border-dashed border-2 border-[#129BFF] text-[12px] text-[#129BFF] rounded-2xl  bg-[#F4F9FF] w-28"
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
        multiple={false}
        content="video/mp4"
      />
    </div>
  );
};

export const MultipleFileUpload: React.FC<FileUploaderProps2> = ({
  handleFile,
  width,
  fileType,
  title,
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

  return (
    <div className="">
      <button
        onClick={handleClick}
        className={`border border-dashed border-2 border-[#129BFF] text-[#129BFF] rounded-sm  bg-[#F4F9FF] py-1 ${width}`}
      >
        + {title}
      </button>
      <input
        accept={fileType}
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
