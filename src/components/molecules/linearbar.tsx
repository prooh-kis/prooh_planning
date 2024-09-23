export const LinearBar = ({ value, colors }: any) => {
  return (
    <div
      className="rounded flex items-center w-full h-1 mt-1 relative group"
      style={{ backgroundColor: colors[0] || '#F3F3F3' }}
    >
      <div
        className="border border-transparent rounded h-full"
        style={{
          width: `${value}%`,
          backgroundColor: colors[1] || '#7AB3A2',
        }}
      ></div>
      {/* Tooltip for percentage value on hover */}
      <span className="absolute hidden group-hover:inline-block bg-gray-700 text-white text-[12px] rounded px-2 py-1 -top-7 right-0 z-10">
        {value}%
      </span>
    </div>
  );
};
