import { Tooltip } from "antd";
import { formatNumber } from "../../utils/formatValue";
import React from "react";

interface MultiColorLinearBar2Props {
  delivered: number;
  expected: number;
  total: number;
}

export const MultiColorLinearBar2: React.FC<MultiColorLinearBar2Props> = ({
  delivered,
  expected,
  total,
}) => {
  // Prevent division by zero
  const deliveredPercentage = total > 0 ? (delivered / total) * 100 : 0;
  const expectedPercentage = total > 0 ? (expected / total) * 100 : 0;
  return (
    <div className="relative w-full h-2 rounded-full overflow-visible">
      <Tooltip
        title={`${formatNumber(delivered)} / ${formatNumber(
          expected
        )} / ${formatNumber(total)}`}
      >
        <div className="relative h-2 bg-[#D1E5F7] rounded-full overflow-hidden">
          {/* Promised Bar (Red) */}
          <div
            className="group absolute rounded-full top-0 left-0 h-full bg-[#FF0000]"
            style={{ width: `${Math.min(expectedPercentage, 100)}%` }}
          >
            <span className="absolute hidden group-hover:inline-block bg-gray-700 text-[#FFFFFF] text-[12px] rounded-full px-2 py-1 -top-7 right-0 z-10">
              {`${expectedPercentage.toFixed(2)}%`}
            </span>
          </div>

          {/* Delivered Bar (Blue) - Stacks over Promised */}

          <div
            className="group absolute top-0 left-0 h-full bg-[#00B7FF] rounded-full"
            style={{ width: `${Math.min(deliveredPercentage, 100)}%` }}
          >
            {/* <span
              className={`hidden group-hover:inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 z-50 pointer-events-none transition-all delay-150 -bottom-7 left-0`}
            >
              {formatNumber(delivered)} /{formatNumber(expected)} /{" "}
              {formatNumber(total)}
            </span> */}
          </div>
        </div>
      </Tooltip>
    </div>
  );
};
