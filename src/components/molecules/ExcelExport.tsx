import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export function ExcelExport({ fileName, wscols = [] }: any) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    try {
      const wscols1 = wscols || [
        { wch: 20 }, // Column width for Longitude
        { wch: 20 }, // Column width for Latitude
      ];

      // Data for the sheets
      const headers = [["Longitude", "Latitude"]]; // Define headers as a 2D array
      const sampleRowBrand = [[77.0891, 28.495]]; // Sample data as a 2D array
      const sampleRowComp = [[77.2378, 28.6004]]; // Sample data as a 2D array

      const dataForSheetsBrand = [...headers, ...sampleRowBrand]; // Combine headers and rows
      const dataForSheetsComp = [...headers, ...sampleRowComp]; // Combine headers and rows


      // Create the first sheet
      const ws1 = XLSX.utils.aoa_to_sheet(dataForSheetsBrand);
      ws1["!cols"] = wscols1; // Set column widths

      // Create the second sheet with the same data
      const ws2 = XLSX.utils.aoa_to_sheet(dataForSheetsComp);
      ws2["!cols"] = wscols1; // Set column widths

      // Create the workbook with two sheets
      const wb = {
        Sheets: {
          Brand: ws1, // First sheet
          Comp: ws2, // Second sheet
        },
        SheetNames: ["Brand", "Comp"], // Names of the sheets
      };

      // Write the workbook to a buffer
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Create a blob and trigger download
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch (error) {
      alert(`Error in exportToExcel function: ${error}`);
    }
  };

  return (
    <div className="flex items-center gap-2 truncate" onClick={exportToExcel}>
      <i className="fi fi-sr-file-excel flex items-center text-[#22C55E]"></i>
      <p className="text-sm truncate text-[#22C55E]">Download Sample</p>
    </div>
  );
}
