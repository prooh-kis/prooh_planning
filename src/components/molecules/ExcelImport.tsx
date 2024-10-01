import { useRef, ChangeEvent, useState } from "react";
import { readExcelFile, validateGioData } from "../../utils/excelUtils";
import { getDistance } from "geolib";

interface ExcelImportProps {
  selectedScreens?: any;
  handleResetFileUpload?: any;
  dataBrand?: any;
  setDataBrand?: any;
  dataComp?: any;
  setDataComp?: any;
}

export function ExcelImport({
  selectedScreens,
  handleResetFileUpload,
  dataBrand,
  setDataBrand,
  dataComp,
  setDataComp
}: ExcelImportProps) {
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

  const withinRadius = (center: any, point: any, radius: any) => {
    const distance = getDistance(
      {
        latitude: center[1],
        longitude: center[0],
      },
      {
        latitude: point[1],
        longitude: point[0],
      }
    );
    return distance <= radius;
  };

 
  const handleGetExcelData = (data: any) => {
    const coveredScreens: any = [];
    console.log(data);
    const coordinates = data
      .map((x: any) => x.filter((y: any) => /^[+-]?\d+(\.\d+)?$/.test(y)))
      .filter((d: any) => d.length === 2);
    console.log(coordinates);
    if (validateGioData(data)) {
      setDataBrand(coordinates);
      for (const coordinate of coordinates) {
        const center = coordinate;
        // props?.allScreens
        //   .filter((l: any) =>
        //     withinRadius(center, [l.latitude, l.longitude], 1000)
        //   )
        //   ?.map((s: any) => {
        //     if (!coveredScreens.includes(s)) {
        //       coveredScreens.push(s);
        //     }
        //   });
      }
      const coordinatesWithScreensData: any = [];
      for (const coordinate of coordinates) {
        const center = coordinate;
        // let x = props?.allScreens.filter((l: any) =>
        //   withinRadius(center, [l.latitude, l.longitude], 1000)
        // );
        // coordinatesWithScreensData.push({ screens: x, coordinate: coordinate });
      }
      console.log(coordinatesWithScreensData);
      // setCoordinatesWithScreens(coordinatesWithScreensData);
      // if (circleData["brand"]?.length > 0) {
      //   // console.log(circleData["compt"]);
      // } else {
      //   setFilter2(getUniqueScreens(coveredScreens));

      // }
    } else alert("Something went wrong, please send us correct data");
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(event.target.files?.[0]);
    if (file) {
      try {
        const data = await readExcelFile(file);
        console.log(data)
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
