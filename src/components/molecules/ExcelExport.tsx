import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
// import { PiExportBold } from "react-icons/pi";

export function ExcelExport({ excelData, fileName, wscols = [] }: any) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    try {
      const wscols1 = wscols || [
        {
          wch: 60,
        },
        {
          wch: 60,
        },
      ];

      var ws = XLSX.utils.aoa_to_sheet([]);
      ws["!cols"] = wscols1;

      XLSX.utils.sheet_add_json(ws, excelData, {
        skipHeader: false,
        origin: "A1", //ok -1
      });
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch (error) {
      alert(`Error in exportToExcel function, ${error}`);
    }
  };

  return (
    <div
      className="flex flex-row items-center align-center p-2 max-w-40 cursor-pointer"
      onClick={exportToExcel}
    >
      {/* <PiExportBold size="16px" /> */}
    </div>
  );
}
