export function LandingPageMapHeader(props: any) {
  return (
    <div
      className="absolute flex justify-around top-1 right-4 transform translate-x-0 w-[10%] z-10 px-4 pt-1 border bg-white rounded-[12px] shadow-lg"
      style={{ marginTop: "0px" }}
    >
      <div className="flex justify-between border-b border-b-2 border-[#00A0FA] px-1 py-2">
        <h1 className="text-[12px] text-[#00A0FA]">Map</h1>
      </div>
      <div className="flex justify-between px-1 py-2">
        <h1 className="text-[12px] text-[#859FAD]">List</h1>
      </div>
      <div className="flex justify-between px-1 py-2">
        <h1 className="text-[12px] text-[#859FAD]">Table</h1>
      </div>
    </div>
  );
}
