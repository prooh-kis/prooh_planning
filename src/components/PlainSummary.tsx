import React from "react";

export function PlainSummary() {
  return (
    <div>
      <div className="w-100% py-2 bg-gray-200 text-center rounded-sm">
        Summary
      </div>
      <table className="w-full border border-1 ">
        <thead>
          <tr className="py-1 border border-1">
            <th className="border border-1">Cities</th>
            <th className="border border-1">Total screens</th>
            <th className="border border-1">Total impression</th>
            <th className="border border-1">
              Total impression based on time schedule
            </th>
            <th className="border border-1">Total campaign budget</th>
            <th className="border border-1">CPM</th>
          </tr>
        </thead>
        <tbody className="w-full">
          <tr className="py-1 border border-1">
            <td className="border border-1 text-center">Delhi</td>
            <td className="border border-1 text-center">34</td>
            <td className="border border-1 text-center">567000</td>
            <td className="border border-1 text-center">454545</td>
            <td className="border border-1 text-center">56546546</td>
            <td className="border border-1 text-center">4000</td>
          </tr>
          <tr className="py-1 border border-1">
            <td className="border border-1 text-center">Delhi</td>
            <td className="border border-1 text-center">34</td>
            <td className="border border-1 text-center">567000</td>
            <td className="border border-1 text-center">454545</td>
            <td className="border border-1 text-center">56546546</td>
            <td className="border border-1 text-center">4000</td>
          </tr>{" "}
          <tr className="py-1 border border-1">
            <td className="border border-1 text-center">Delhi</td>
            <td className="border border-1 text-center">34</td>
            <td className="border border-1 text-center">567000</td>
            <td className="border border-1 text-center">454545</td>
            <td className="border border-1 text-center">56546546</td>
            <td className="border border-1 text-center">4000</td>
          </tr>{" "}
          <tr className="py-1 border border-1">
            <td className="border border-1 text-center">Delhi</td>
            <td className="border border-1 text-center">34</td>
            <td className="border border-1 text-center">567000</td>
            <td className="border border-1 text-center">454545</td>
            <td className="border border-1 text-center">56546546</td>
            <td className="border border-1 text-center">4000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
