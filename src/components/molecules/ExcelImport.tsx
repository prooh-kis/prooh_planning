import { useRef, ChangeEvent, useState } from "react";
import { readExcelFile, validateGioData } from "../../utils/excelUtils";
import { getDistance } from "geolib";

interface ExcelImportProps {
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
  icon,
  text,
  allScreens,
  setDataBrand,
  setDataComp,
  type,
  circleRadius,
  setFilteredScreens,
  filteredScreens,
  handleFinalSelectedScreens
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
    if (type === "brand") {
      console.log(brandScreens);
      handleFinalSelectedScreens({
        type: "remove",
        screens: brandScreens
      });
      console.log(filteredScreens.filter((s: any) => !brandScreens.map((sc: any) => sc._id).includes(s._id)))
      setFilteredScreens(filteredScreens.filter((s: any) => !brandScreens.map((sc: any) => sc._id).includes(s._id)));
      setDataBrand([]);
      setBrandScreens(null);        

    } else if (type === "comp") {
      console.log(compScreens);
      handleFinalSelectedScreens({
        type: "remove",
        screens: compScreens
      });
      console.log(filteredScreens.filter((s: any) => !compScreens.map((sc: any) => sc._id).includes(s._id)))
      setFilteredScreens(filteredScreens.filter((s: any) => compScreens.map((sc: any) => sc._id).includes(s._id)));
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
    const coordinates = data
      .map((x: any) => x.filter((y: any) => /^[+-]?\d+(\.\d+)?$/.test(y)))
      .filter((d: any) => d.length === 2);

    if (validateGioData(data)) {
      if (type === "brand") {
        setDataBrand(coordinates);        
      } else if (type === "comp") {
        setDataComp(coordinates);
      }

      const coordinatesWithScreensData: any = [];
      for (const coordinate of coordinates) {
        const center = coordinate;

        let x = allScreens.filter((l: any) =>
          withinRadius(center, [l.location.geographicalLocation.longitude, l.location.geographicalLocation.latitude], circleRadius)
        );
        coordinatesWithScreensData.push({ screens: x, coordinate: coordinate });
      }

      const filtered: any = getUniqueScreens(coordinatesWithScreensData)
      const newFiltered: any = filteredScreens;
      console.log(filteredScreens);
      console.log(filtered);
      if (type === "brand") {
        setBrandScreens(filtered);        
      } else if (type === "comp") {
        setCompScreens(filtered);

      }
      filtered?.forEach((f: any) => {
        if (!newFiltered.map((nf: any) => nf._id).includes(f._id)) {
          newFiltered.push(f);
        }
        return newFiltered
      })

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
        handleGetExcelData(data);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    }
  };
  return (
    <div className="w-full py-2">
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
        <div className="flex items-center justify-between pt-2">
            <div>
              {file !== null && (
                <div className="flex items-center gap-2 truncate">
                  <p className="text-sm text-green-700 truncate">{file?.name}</p>
                  <i className="fi fi-sr-cross-small text-green-700 flex items-center" onClick={() => handleResetFile()}></i>
                </div>
              )}
            </div>
         
          <div className="flex items-center gap-2 truncate">
            <i className="fi fi-sr-file-excel flex items-center text-green-600"></i>
            <p className="text-sm truncate">Download Sample</p>
          </div>
        </div>
    </div>
  );
}
