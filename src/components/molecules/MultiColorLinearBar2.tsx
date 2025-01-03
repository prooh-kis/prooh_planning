import React, { useState } from 'react';

interface MultiColorLinearBar2Props {
  delivered: number;
  expected: number;
  total: number;
}

export const MultiColorLinearBar2: React.FC<MultiColorLinearBar2Props> = ({ delivered, expected, total }) => {
  const deliveredPercentage = (delivered / total) * 100;
  const expectedPercentage = (expected / total) * 100;

  return (
    <div className="mt-1 relative">
      <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden ">
        {/* Expected Bar */}
        <div
          className="group absolute top-0 left-0 h-full bg-red"
          style={{ width: `${expectedPercentage}%` }}
        >
          <span className="absolute hidden group-hover:inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 -top-7 right-0 z-10">
            {`${expectedPercentage.toFixed(2)}%`}
          </span>
        </div>
        {/* Delivered Bar */}
        <div
          className="group absolute top-0 left-0 h-full bg-blue"
          style={{ width: `${deliveredPercentage}%` }}
        >
          <span className="absolute hidden group-hover:inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 -top-7 right-0 z-10">
            {`${deliveredPercentage.toFixed(2)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
