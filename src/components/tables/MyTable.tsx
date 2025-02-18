import React from "react";

interface TableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
}

export const MyTable = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="h-[40px] bg-[#F1F9FF] md:text-[14px] sm:text-[12px] border-b">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="px-6 py-1 text-left text-gray-600 border"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50 h-[30px]">
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className="px-6 py-1 text-gray-800 border"
                >
                  {row[col.key] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// example

{
  /* <MyTable
  columns={[
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ]}
  data={[
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]}
/>; */
}
