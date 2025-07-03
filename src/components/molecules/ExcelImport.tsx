import { useRef, ChangeEvent, useState, useEffect, useCallback } from "react";
import { readExcelFile, validateGioData } from "../../utils/excelUtils";
import { getDistance } from "geolib";
import { ExcelExport } from "./ExcelExport";
import { Tooltip, Slider } from "antd";

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
  circleData?: any;
  allScreens?: any;
  setExcelFilteredScreens?: any;
  excelFilteredScreens?: any;
  circleRadius?: any;
  setCircleRadius?: any;
  // handleFinalSelectedScreens?: any;
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
  circleData,
  type,
  setExcelFilteredScreens,
  excelFilteredScreens,
  // handleFinalSelectedScreens,
}: ExcelImportProps) {
  // Add this ref at the top of your component
  const processedData = useRef<any>({ brand: null, comp: null });

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(null);

  const [brandScreens, setBrandScreens] = useState<any>(null);
  const [compScreens, setCompScreens] = useState<any>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const getUniqueScreens = (data: any) => {
    const uniqueScreens = new Set();
    data?.forEach((location: any) => {
      location?.screens?.forEach((screen: any) => {
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
      // handleFinalSelectedScreens({
      //   type: "remove",
      //   screens: brandScreens,
      // });
      setExcelFilteredScreens([]);
      setDataBrand([]);
      setBrandScreens(null);
    }
    if (type.includes("comp")) {
      // handleFinalSelectedScreens({
      //   type: "remove",
      //   screens: compScreens,
      // });
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
        filtered?.forEach((f: any) => {
          if (!updatedScreens.map((nf: any) => nf._id).includes(f._id)) {
            updatedScreens.push(f);
          }
        });

        return updatedScreens;
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
    setCircleData,
    setDataBrand,
    setDataComp,
    setExcelFilteredScreens,
    type,
    circleRadius,
  ]);


  // Update your useEffect
  useEffect(() => {
    if (!circleData) return;

    // Check if data is different from what we've already processed
    const brandChanged = JSON.stringify(circleData.brand) !== JSON.stringify(processedData.current.brand);
    const compChanged = JSON.stringify(circleData.comp) !== JSON.stringify(processedData.current.comp);

    if ((circleData.brand?.length || circleData.comp?.length) && (brandChanged || compChanged)) {
      // Update the ref with current data
      processedData.current = {
        brand: circleData.brand ? [...circleData.brand] : null,
        comp: circleData.comp ? [...circleData.comp] : null
      };
      
      handleGetExcelData(circleData);
    }
  }, [circleData, handleGetExcelData]);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(event.target.files?.[0]);
    if (file) {
      try {
        const data = await readExcelFile(file);
        // saveDataOnLocalStorage(EXCEL_DATA_TARGET_STORES, data)
        handleGetExcelData(data);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    }
  };

  return (
    <div className="py-2 w-full border-b border-gray-100">
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
              <h1 className="lg:text-[16px] text-[14px]">
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
              {/* {open["excel"] ? (
                <i className="fi fi-sr-caret-up text-[#EF4444] flex items-center"></i>
              ) : (
                <i className="fi fi-sr-caret-down text-[#22C55E] flex items-center"></i>
              )} */}
            </div>
          </div>

          <div className="flex justify-end items-center">
            {/* <PrimaryInput
              width="w-20"
              height="h-6"
              // inputType="number"
              placeholder={circleRadius}
              value={circleRadius}
              action={setCircleRadius}
            /> */}
            <div className="w-24 px-1">
              <Slider
                min={0.1}
                max={1}
                step={0.1}
                value={circleRadius ? circleRadius / 1000 : 1}
                onChange={(value) => {
                  setCircleRadius(value * 1000);
                }}
                tooltip={{ formatter: (value) => `${value} km` }}
                styles={{
                  track: {
                    background: '#22C55E',
                  },
                  handle: {
                    borderColor: '#22C55E',
                    backgroundColor: '#22C55E',
                  },
                }}
              />
            </div>
            <div className="w-12 text-[12px] text-center">
              {circleRadius ? (circleRadius / 1000).toFixed(1) : '1.0'} km
            </div>
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