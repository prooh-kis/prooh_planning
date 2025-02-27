import * as XLSX from "xlsx";
import { convertDataTimeToLocale } from "./dateAndTimeUtils";

export const readExcelFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const secondSheetName = workbook.SheetNames[1];
      const worksheetB = workbook.Sheets[firstSheetName];
      const worksheetC = workbook.Sheets[secondSheetName];

      const jsonDataB = XLSX.utils.sheet_to_json(worksheetB, { header: 1 });
      const jsonDataC = XLSX.utils.sheet_to_json(worksheetC, { header: 1 });

      resolve({
        brand: jsonDataB,
        comp: jsonDataC,
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const validateGioData = (data: any) => {
  const header = ["Longitude", "Latitude"];
  // first check its headers lenght
  if (data[0].length !== header.length) {
    console.log("header leagth not same");
    return false;
  }
  // Now check its headers leve are same or not
  data[0].forEach((element: string, index: number) => {
    if (element !== header[index]) {
      // console.log("header velev not same");
      return false;
    }
  });
  // now check all its value must be number
  // console.log("validateGioData : ", data);

  //   for (let i = 1; i < data.length; i++) {
  //     if (!Number.isNaN(data[i][0]) || !Number.isNaN(data[i][1])) {
  //       console.log("validateGioData : ", data[i][0], data[i][1]);

  //       return false;
  //     }
  //   }

  // finally
  return true;
};

export const downloadExcel = ({ campaign, campaignLog }: any) => {
  const getData = (campaign: any, index: number) => {
    return [
      index,
      convertDataTimeToLocale(campaign?.logTime),
      convertDataTimeToLocale(campaign?.deviceTime),
      campaign?.mediaId?.split("_")[1],
      campaign.screenStatus,
    ];
  };

  const data = [
    [
      {
        v: "PROOH.AI ",
        s: {
          font: { bold: true, sz: 48 },
          border: {
            style: "thick",
            color: "000000",
          },
        },
      },
    ],
    [
      {
        v: `Campaign Name: ${campaign?.name} `,
        s: {
          font: {
            name: "arial",
          },

          border: {
            style: "thin",
            color: "000000",
          },
        },
      },
      {
        v: `Brand: ${campaign?.brandName}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: "No. of Creative: 1",
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
    ],
    [
      {
        v: `Start Date: ${convertDataTimeToLocale(campaign?.startDate)}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `End Date: ${convertDataTimeToLocale(campaign?.endDate)}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `No. of Days: ${campaign?.campaignDuration}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
    ],
    [
      {
        v: `Screen Name: ${campaign?.screenName}`,
        s: {
          font: {
            name: "arial",
            sz: 12,
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `Log Generated at: ${convertDataTimeToLocale(new Date())}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `Campaign Type: ${campaign?.campaignType}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
    ],
    [
      {
        v: `Total slots assigned: ${campaign?.totalSlotBooked}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
      {
        v: `Total slots played: ${campaign?.totalSlotsPlayed}`,
        s: {
          font: {
            name: "arial",
          },

          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
        },
      },
    ],
    [],
    [
      {
        v: "S.N.",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      {
        v: "Log stamp",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      {
        v: "Device stamp",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      {
        v: "Media",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      {
        v: "Screen Status",
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: "#C7C8CC" } },
        },
      },
      // {
      //   v: "Screen Mac",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
      // {
      //   v: "Screen DeviceId",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
      // {
      //   v: "Screen Ip",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
      // {
      //   v: "Screen Display",
      //   s: {
      //     font: { bold: true, sz: 16 },
      //     fill: { fgColor: { rgb: "#C7C8CC" } },
      //   },
      // },
    ],
    [],
    ...campaignLog?.map((campaign: any, index: number) =>
      getData(campaign, index + 1)
    ),
  ];

  try {
    // Creating the worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Adding some column widths (optional)
    worksheet["!cols"] = [
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];

    worksheet["!rows"] = [
      { hpx: 50 }, // Height for the first row
      { hpx: 20 }, // Height for the second row
      { hpx: 20 }, // Height for the third row
      { hpx: 20 }, // Height for the fourth row
      { hpx: 20 }, // Height for the fifth row (empty)
      { hpx: 20 }, // Height for the header row
      { hpx: 20 }, // Height for the header row
    ];

    // Creating a new workbook and adding the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Campaign Report");

    // Writing and downloading the Excel file
    XLSX.writeFile(workbook, `${campaign?.name}_${campaign?.screenName}.xlsx`);
    return Promise.resolve("success");
  } catch (error) {
    return Promise.reject(error);
  }
};
