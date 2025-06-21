interface BoxProps {
  isSelected?: boolean;
  title: string;
  value?: number; // Changed to only accept number
  icon: string;
  bgColor?: string;
  iconColor?: string;
  titleColor?: string;
  valueColor?: string;
  loading?: boolean;
  onClick: () => void;
}

export const CostSummaryBox = ({
  isSelected = false,
  title,
  value = 0, // Default to 0
  icon,
  bgColor = "#FF7525",
  iconColor = "#FFFFFF",
  titleColor = "#6F7F8E",
  valueColor = "#000000",
  loading = false,
  onClick,
}: BoxProps) => {
  return (
    <div
      className={`cursor-pointer rounded-lg border bg-white p-4 flex gap-4 ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <div
        className="h-12 w-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <i
          className={`text-[24px] ${icon} flex items-center`}
          style={{ color: iconColor }}
        ></i>
      </div>
      <div>
        <p className="text-[12px] font-semibold" style={{ color: titleColor }}>
          {title}
        </p>
        {loading ? (
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
        ) : (
          <h1
            className="text-[18px] font-extrabold"
            style={{ color: valueColor }}
          >
            ₹ {(Number(value).toFixed(0))}
          </h1>
        )}
      </div>
    </div>
  );
};
