import React, { useState } from 'react';

interface MultiBarProps {
  values: number[];  // Define the expected types for values and colors
  colors: string[];
  totalValue: number;
  showPercentage: boolean;  // New prop to control display mode
}

export const MultiColorLinearBar = ({ values, colors, totalValue, showPercentage }: MultiBarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);  // State to track hovered bar
  const [isHoveredMainBar, setIsHoveredMainBar] = useState(false);  // State to track hover over the main bar

  return (
    <div
      className="rounded flex items-center w-full h-1 mt-1 relative group"
      style={{ backgroundColor: colors[0] || '#F3F3F3' }}
      onMouseEnter={() => setIsHoveredMainBar(true)}  // Set hover state for the main bar
      onMouseLeave={() => {
        setIsHoveredMainBar(false);  // Reset hover state for the main bar
        setHoveredIndex(null);  // Reset hovered index
      }}
    >
      {values.map((value, index) => {
        const percentage = (value / totalValue) * 100;  // Calculate percentage for each value
        const isHovered = hoveredIndex === index;  // Check if the current index is hovered

        return (
          <div
            key={index}
            className="relative flex border border-transparent rounded h-full"
            style={{
              width: `${percentage}%`,  // Set width based on the calculated percentage
              backgroundColor: colors[index + 1] || '#7AB3A2',  // Assign a color from the array
            }}
            onMouseEnter={() => setHoveredIndex(index)}  // Set hovered index on mouse enter
            onMouseLeave={() => setHoveredIndex(null)}   // Reset hovered index on mouse leave
          >
            {/* Tooltip for individual value or percentage on hover */}
            {isHovered && (
              <span className="absolute inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 -top-7 right-0 z-10">
                {showPercentage ? `${percentage.toFixed(2)}%` : value}  {/* Display based on prop */}
              </span>
            )}
          </div>
        );
      })}

      {/* Tooltip for total value when hovering over the main bar */}
      {isHoveredMainBar && (
        <span className="absolute inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 -top-7 right-0 z-10">
          Total: {totalValue}  {/* Display the total value */}
        </span>
      )}
    </div>
  );
};
