import React from "react";

interface VendorMailTemplateProps {
  tableData: any; // Data for table rows
  buttonText?: string; // Text for the button
  approvalUrl?: any; // Action for button click
}

export const VendorMailTemplate: React.FC<VendorMailTemplateProps> = ({
  tableData,
  buttonText,
  approvalUrl,
}) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">Screen Name</th>
            <th className="py-2 px-4">Touchpoint</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">End Date</th>
            <th className="py-2 px-4">Cost</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: any, index: any) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
                <td className="py-2 px-4 border">
                  {row?.screenName}
                </td>
                <td className="py-2 px-4 border">
                  {row?.touchPoint}
                </td>
                <td className="py-2 px-4 border">
                  {row?.startDate}
                </td>
                <td className="py-2 px-4 border">
                  {row?.endDate}
                </td>
                <td className="py-2 px-4 border">
                  {row?.cost}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <a
          href={approvalUrl}
          className="w-full inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 text-center"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};


export const CCMailTemplate: React.FC<VendorMailTemplateProps> = ({
  tableData,
}) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">Screen Name</th>
            <th className="py-2 px-4">Touchpoint</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">End Date</th>
            <th className="py-2 px-4">Cost</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row: any, index: any) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
                <td className="py-2 px-4 border">
                  {row?.screenName}
                </td>
                <td className="py-2 px-4 border">
                  {row?.touchPoint}
                </td>
                <td className="py-2 px-4 border">
                  {row?.startDate}
                </td>
                <td className="py-2 px-4 border">
                  {row?.endDate}
                </td>
                <td className="py-2 px-4 border">
                  {row?.cost}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};