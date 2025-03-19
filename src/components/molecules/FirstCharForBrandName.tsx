import clsx from "clsx";

interface FirstCharForBrandNameProps {
  brandName: string;
}

export const FirstCharForBrandName = ({
  brandName,
}: FirstCharForBrandNameProps) => {
  const colors = [
    "bg-[#EF444450]",
    "bg-[#F59E0B50]",
    "bg-[#EAB30850]",
    "bg-[#22C55E50]",
    "bg-[#06B6D450]",
    "bg-[#3B82F650]",
    "bg-[#6366F150]",
    "bg-[#8B5CF650]",
    "bg-[#78DCCA50]",
    "bg-[#FF77E950]",
    "bg-[#3AB7BF50]",
    "bg-[#3F3CBB50]",
    "bg-[#22C55E50]",
    "bg-[#06B6D450]",
    "bg-[#3B82F650]",
    "bg-[#6366F150]",
    "bg-[#EF444450]",
    "bg-[#F59E0B50]",
  ];

  const getBgColors = (index: number) => colors[index % colors.length];

  // Improved logic: Use ASCII value of the first letter to generate a more distributed color index
  const bgColorIndex = brandName ? brandName.charCodeAt(0) % colors.length : 0;

  return (
    <div
      className={clsx(
        "rounded-[12px] flex justify-center items-center w-24 border border-[#D7D7D750]",
        getBgColors(bgColorIndex) // ✅ Uses ASCII-based indexing for better color distribution
      )}
    >
      <h1 className="text-[40px] text-white font-black">
        {brandName?.charAt(0)}
      </h1>
    </div>
  );
};
