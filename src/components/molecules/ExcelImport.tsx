import { useRef, ChangeEvent, useState } from "react";
import { readExcelFile } from "../../utils/excelUtils";
// import { MdOutlineUploadFile, MdArrowDropDown } from "react-icons/md";

export function ExcelImport({handleResetFileUpload, handleGetExcelData}: any) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleResetFile = () => {
    setFile(null);
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ""; // Clear the file input value
    }

    handleResetFileUpload();
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(event.target.files?.[0]);
    if (file) {
      try {
        const data = await readExcelFile(file);
        handleGetExcelData(data);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    }
  };
  return (
    <div className="flex flex-row gap-4 w-full py-2">
      <div
        className="border border-dashed w-full h-[40px] rounded-md flex justify-end items-center p-1"
        onClick={handleClick}
      >
        <div className="w-full flex justify-center items-center">
          <i className="fi fi-sr-file-excel flex items-center text-green-600"></i>
        
          <h1 className="text-sm text-gray-400 px-2">Upload Sheet</h1>
        </div>
        

        <input
          title="file"
          type="file"
          accept=".xlsx, .xls"
          ref={hiddenFileInput}
          style={{ display: "none" }} // Make the file input element invisible
          multiple={false}
          onChange={handleFileUpload}
        />
      </div>
      {/* {file !== null && (
        <button
          type="submit"
          className="my-3 w-48 h-8 rounded-lg bg-red-200 text-sm font-bold test-white px-2"
          onClick={() => handleResetFileUpload()}
        >
          Reset filter
        </button>
      )} */}
    </div>
  );
}
