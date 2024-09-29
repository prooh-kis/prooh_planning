interface MultiBarProps {
  values: number[];  // Define the expected types for values and colors
  colors: string[];
  totalValue: number;
}

export const MultiColorLinearBar = ({ values, colors, totalValue }: MultiBarProps) => {
  return (
    <div className="rounded flex items-center w-full h-1 mt-1 relative group" style={{ backgroundColor: colors[0] || '#F3F3F3' }}>
      {values.map((value, index) => {
        const percentage = (value / totalValue) * 100;  // Calculate percentage for each value
        return (
          <div
            key={index}
            className="relative flex border border-transparent rounded h-full"
            style={{
              width: `${percentage}%`,  // Set width based on the calculated percentage
              backgroundColor: colors[index + 1] || '#7AB3A2',  // Assign a color from the array
            }}
          >
            {/* Tooltip for percentage value on hover */}
            <span className="absolute hidden group-hover:inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 -top-7 right-0 z-10">
              {percentage.toFixed(2)}%  {/* Display the percentage in tooltip */}
            </span>
          </div>
        );
      })}
    </div>
  );
};
