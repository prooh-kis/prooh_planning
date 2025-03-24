import { useRef, ChangeEvent, useState, useEffect, useCallback } from "react";
import { readExcelFile, validateGioData } from "../../utils/excelUtils";
import { getDistance } from "geolib";
import { ExcelExport } from "./ExcelExport";
import { Tooltip } from "antd";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { EXCEL_DATA_TARGET_STORES } from "../../constants/campaignConstants";

interface ExcelImportProps {
  open: any;
  setOpen: any;
  selectedScreens?: any;
  icon?: any;
  text?: any;
  type?: any;
  setDataBrand?: any;
  setDataComp?: any;
  dataBrand?: any;
  dataComp?: any;
  setCircleData?: any;
  allScreens?: any;
  setExcelFilteredScreens?: any;
  excelFilteredScreens?: any;
  circleRadius?: any;
  setCircleRadius?: any;
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
  circleRadius,
  setCircleRadius,
  setCircleData,
  type,
  setExcelFilteredScreens,
  excelFilteredScreens,
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
    setCircleData([]);
    if (type.includes("brand")) {
      handleFinalSelectedScreens({
        type: "remove",
        screens: brandScreens,
      });
      setExcelFilteredScreens([]);
      setDataBrand([]);
      setBrandScreens(null);
    }
    if (type.includes("comp")) {
      handleFinalSelectedScreens({
        type: "remove",
        screens: compScreens,
      });
      setExcelFilteredScreens([]);
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
    return distance <= radius;
  };

  const handleGetExcelData = useCallback((data: any) => {
    if (data == null)
      return
    const brandCoordinates = data.brand
      .map((x: any) => x.filter((y: any) => /^[+-]?\d+(\.\d+)?$/.test(y)))
      .filter((d: any) => d.length === 2);

    const compCoordinates = data.comp
      .map((x: any) => x.filter((y: any) => /^[+-]?\d+(\.\d+)?$/.test(y)))
      .filter((d: any) => d.length === 2);

    if (validateGioData(data.brand) && validateGioData(data.comp)) {
      if (type.includes("brand")) {
        setDataBrand(brandCoordinates);
      }
      if (type.includes("comp")) {
        setDataComp(compCoordinates);
      }

      const coordinatesWithScreensData: any = [];

      for (const coordinate of brandCoordinates) {
        const center = coordinate;
        let x = allScreens.filter((l: any) =>
          withinRadius(
            center,
            [
              l.location.geographicalLocation.longitude,
              l.location.geographicalLocation.latitude,
            ],
            circleRadius // 🔴 Ensure latest value
          )
        );
        coordinatesWithScreensData.push({ screens: x, coordinate });
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
        coordinatesWithScreensData.push({ screens: x, coordinate });
      }

      const filtered = getUniqueScreens(coordinatesWithScreensData);

      if (type.includes("brand")) {
        setBrandScreens(filtered);
      }
      if (type.includes("comp")) {
        setCompScreens(filtered);
      }

      setExcelFilteredScreens((prevFilteredScreens: any) => {
        // Extract all valid screen IDs from the new filtered list
        const newScreenIds = filtered.map((f: any) => f._id);

        // Remove screens that are no longer in range
        const updatedScreens = prevFilteredScreens.filter((screen: any) =>
          newScreenIds.includes(screen._id)
        );

        // Add new screens that are not already present
        filtered.forEach((f: any) => {
          if (!updatedScreens.map((nf: any) => nf._id).includes(f._id)) {
            updatedScreens.push(f);
          }
        });

        return updatedScreens;
      });

      handleFinalSelectedScreens({
        type: "add",
        screens: filtered,
      });

      setCircleData((prev: any) => ({
        ...prev,
        brand: brandCoordinates,
        comp: compCoordinates,
      }));
    } else {
      alert("Something went wrong, please send us correct data");
    }
  }, [
    allScreens,
    handleFinalSelectedScreens,
    setCircleData,
    setDataBrand,
    setDataComp,
    setExcelFilteredScreens,
    type,
    circleRadius, // ✅ Ensure this is included in dependencies
  ]);

  // 🔴 Ensure data updates when `circleRadius` changes
  useEffect(() => {
    handleGetExcelData(getDataFromLocalStorage(EXCEL_DATA_TARGET_STORES)); // Pass the correct Excel data here
  }, [circleRadius]);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(event.target.files?.[0]);
    if (file) {
      try {
        const data = await readExcelFile(file);
        saveDataOnLocalStorage(EXCEL_DATA_TARGET_STORES, data)
        handleGetExcelData(data);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    }
  };

  return (
    <div className="py-4 w-full border-b border-gray-100">
      <button title="" type="button" className="flex items-center justify-between w-full"
        onClick={() => {
          // setOpen((prev: any) => ({
          //   ...prev,
          //   excel: !prev.excel,
          // }))
        }}
      >
        <div className="flex justify-between w-full">
          <div className="flex justify-start">
            <div className="flex justify-start gap-2 items-center py-2">
              <h1 className="lg:text-[16px] text-[14px] text-gray-500">
                1. Choose your target stores
              </h1>
              <Tooltip
                title="Download the sample excel sheet to edit it with the details of your desired stores and select screens in proximity of your desired locations"
              >
                <i className="fi fi-rs-info pr-1 lg:text-[14px] text-[12px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
              <h1 className="lg:text-[14px] text-[12px] text-[#3B82F6]">({excelFilteredScreens.length} sites)</h1>
            </div>
            <div className="flex items-center justify-center">
              {open["excel"] ? (
                <i className="fi fi-sr-caret-up text-[#EF4444] flex items-center"></i>
              ) : (
                <i className="fi fi-sr-caret-down text-[#22C55E] flex items-center"></i>
              )}
            </div>
          </div>

          <div className="flex justify-end items-center">
            <i className="fi fi-bs-circle text-[10px] text-[#22C55E] pr-2"></i>
            {/* <PrimaryInput
              width="w-20"
              height="h-6"
              // inputType="number"
              placeholder={circleRadius}
              value={circleRadius}
              action={setCircleRadius}
            /> */}
            <input
              className="w-[36px] h-6 text-center"
              type="number"
              placeholder={circleRadius ? (circleRadius / 1000).toString() : "1"}
              value={circleRadius ? circleRadius / 1000 : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = parseFloat(e.target.value) || 0; // Convert to number
                if (newValue === 0) {
                  setCircleRadius(1000);
                } else {
                  setCircleRadius(newValue * 1000);
                }
              }}
            />
            <h1 className="lg:text-[14px] text-[12px] pl-1">km</h1>
          </div>
        </div>

      </button>

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
              defaultValue={""}
              onChange={handleFileUpload}
            />
            <p className="text-sm text-primaryButton pr-2">Upload</p>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              {file !== null && (
                <div>
                  <div className="flex items-center gap-2 truncate">
                    <p className="lg:text-[14px] text-[12px] text-green truncate">{file?.name}</p>
                    <i className="fi fi-sr-cross-small text-green flex items-center" onClick={() => handleResetFile()}></i>
                  </div>
                  <p className="lg:text-[14ps] text-[12px] text-blue truncate">({excelFilteredScreens.length} matching locations found)</p>
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