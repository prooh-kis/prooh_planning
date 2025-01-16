import { useRef, ChangeEvent, useState } from "react";
import { readExcelFile, validateGioData } from "../../utils/excelUtils";
import { getDistance } from "geolib";
import { ExcelExport } from "./ExcelExport";
import { Tooltip } from "antd";

interface ExcelImportProps {
  open: any;
  setOpen: any;
  selectedScreens?: any;
  icon?: any;
  text?: any;
  type?: any;
  setDataBrand?: any;
  setDataComp?: any;
  allScreens?: any;
  circleRadius?: any;
  setFilteredScreens?: any;
  filteredScreens?: any;

  handleFinalSelectedScreens?: any;
}

export function ExcelImport({
  open,
  setOpen,
  icon,
  text,
  allScreens,
  setDataBrand,
  setDataComp,
  type,
  circleRadius,
  setFilteredScreens,
  filteredScreens,
  handleFinalSelectedScreens,
}: ExcelImportProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(null);

  const [brandScreens, setBrandScreens] = useState<any>(null);
  const [compScreens, setCompScreens] = useState<any>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const getUniqueScreens = (data: any) => {
    const uniqueScreens = new Set();
    data.forEach((location: any) => {
      location.screens.forEach((screen: any) => {
        uniqueScreens.add(screen);
      });
    });
    let result = Array.from(uniqueScreens);

    return result;
  };

  const handleResetFile = () => {
    setFile(null);
    if (type.includes("brand")) {
      handleFinalSelectedScreens({
        type: "remove",
        screens: brandScreens,
      });
      setFilteredScreens(
        filteredScreens.filter(
          (s: any) => !brandScreens.map((sc: any) => sc._id).includes(s._id)
        )
      );
      setDataBrand([]);
      setBrandScreens(null);
    } else if (type.includes("comp")) {
      handleFinalSelectedScreens({
        type: "remove",
        screens: compScreens,
      });
      setFilteredScreens(
        filteredScreens.filter((s: any) =>
          compScreens.map((sc: any) => sc._id).includes(s._id)
        )
      );
      setDataComp([]);
      setCompScreens(null);
    }
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ""; // Clear the file input value
    }
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
    ); // in meters
    return distance <= radius * 1000;
  };
 
  const handleGetExcelData = (data: any) => {
    const brandCoordinates = data.brand
      .map((x: any) => x.filter((y: any) => /^[+-]?\d+(\.\d+)?$/.test(y)))
      .filter((d: any) => d.length === 2);

    const compCoordinates = data.comp
      .map((x: any) => x.filter((y: any) => /^[+-]?\d+(\.\d+)?$/.test(y)))
      .filter((d: any) => d.length === 2);

    // const coordinates = data
    //   .map((x: any) => x.filter((y: any) => /^[+-]?\d+(\.\d+)?$/.test(y)))
    //   .filter((d: any) => d.length === 2);

    if (validateGioData(data.brand) && validateGioData(data.comp)) {
      if (type.includes("brand")) {
        setDataBrand(brandCoordinates);
      }
      if (type.includes("comp")) {
        setDataComp(compCoordinates);
      }

      const coordinatesWithScreensData: any = [];
      // for (const coordinate of coordinates) {
      //   const center = coordinate;

      //   let x = allScreens.filter((l: any) =>
      //     withinRadius(center, [l.location.geographicalLocation.longitude, l.location.geographicalLocation.latitude], circleRadius)
      //   );
      //   coordinatesWithScreensData.push({ screens: x, coordinate: coordinate });
      // }
      for (const coordinate of brandCoordinates) {
        const center = coordinate;

        let x = allScreens.filter((l: any) =>
          withinRadius(
            center,
            [
              l.location.geographicalLocation.longitude,
              l.location.geographicalLocation.latitude,
            ],
            circleRadius
          )
        );
        coordinatesWithScreensData.push({ screens: x, coordinate: coordinate });
      }
      for (const coordinate of compCoordinates) {
        const center = coordinate;

        let x = allScreens.filter((l: any) =>
          withinRadius(
            center,
            [
              l.location.geographicalLocation.longitude,
              l.location.geographicalLocation.latitude,
            ],
            circleRadius
          )
        );
        coordinatesWithScreensData.push({ screens: x, coordinate: coordinate });
      }
      const filtered: any = getUniqueScreens(coordinatesWithScreensData);
      const newFiltered: any = filteredScreens;

      if (type.includes("brand")) {
        setBrandScreens(filtered);
      }
      if (type.includes("comp")) {
        setCompScreens(filtered);
      }
      filtered?.forEach((f: any) => {
        if (!newFiltered.map((nf: any) => nf._id).includes(f._id)) {
          newFiltered.push(f);
        }
        return newFiltered;
      });

      setFilteredScreens(newFiltered);
      handleFinalSelectedScreens({
        type: "add",
        screens: newFiltered,
      });
    } else alert("Something went wrong, please send us correct data");
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(event.target.files?.[0]);
    if (file) {
      try {
        const data = await readExcelFile(file);
        console.log(data);
        handleGetExcelData(data);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    }
  };

  return (
    <div className="py-4 w-full border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex justify-start gap-2 items-center py-2">
          <h1 className="lg:text-[16px] text-[14px] text-gray-500">
            1. Upload your target stores location data 
          </h1>
          <Tooltip
              title="Download the sample excel sheet to edit it with the details of your desired stores and select screens in proximity of your desired locations"
              >
            <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
          <h1 className="lg:text-[14px] text-[12px] text-[#3B82F6]">({filteredScreens.length})</h1>
        </div>
        <button className="flex items-center justify-center"
          onClick={() => {
            setOpen((prev: any) => ({
              ...prev,
              excel: !prev.excel,
            }))
          }}
        >
          {open["excel"] ? (
            <i className="fi fi-sr-caret-up text-[#EF4444] flex items-center"></i>
          ) : (
            <i className="fi fi-sr-caret-down text-[#22C55E] flex items-center"></i>
          )}
        </button>
      </div>
      
      {open["excel"] && (
        <div className="w-full">
          <div
            className="border border-dashed w-full h-[40px] rounded-md flex justify-between items-center p-1"
            onClick={handleClick}
          >
            <div className="flex justify-start gap-2 items-center">
              <i className={icon}></i>
              <p className="text-sm">{text}</p>
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
            <p className="text-sm text-primaryButton pr-2">Upload</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              {file !== null && (
                <div>
                  <div className="flex items-center gap-2 truncate">
                    <p className="text-sm text-green-700 truncate">{file?.name}</p>
                    <i className="fi fi-sr-cross-small text-green-700 flex items-center" onClick={() => handleResetFile()}></i>
                  </div>
                  <p className="text-sm text-blue-500 truncate">({filteredScreens.length} matching locations found)</p>
                </div>
        
              )}
            </div>
            
            <ExcelExport
              fileName="store_location_coordinates"
            />
          </div>
        </div>
      )}
    </div>
  );
}
