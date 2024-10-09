import React, { useRef, ChangeEvent } from "react";

interface FileUploaderProps {
  handleFile: (file: File) => void;
  width: string;
}

export const FileUploadButton: React.FC<FileUploaderProps> = ({
  handleFile,
  width,
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (fileUploaded) handleFile(fileUploaded);
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className={
          width
            ? "border border-dashed border-2 border-blue-400 text-blue-400 rounded-2xl  bg-blue-100 py-1 w-full"
            : "border border-dashed border-2 border-blue-400 text-blue-400 rounded-2xl  bg-blue-100 py-1 w-32"
        }
      >
        + Upload
      </button>
      <input
        title="select media"
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }} // Make the file input element invisible
        multiple={false}
      />
    </div>
  );
};
