export function LandingPageMapHeader({view, setView}: any) {
  return (
    <div
      className="absolute flex justify-around top-1 right-4 transform translate-x-0 w-[10%] z-10 px-4 pt-1 border bg-white rounded-[12px] shadow-lg"
      style={{ marginTop: "0px" }}
    >
      <div
        onClick={() => setView("map")}
        className=
        {`flex justify-between ${view === "map" && "border-b border-b-2 border-[#00A0FA]"} px-1 py-2`}
      >
        <h1 className={`text-[12px] ${view === "map" ? "text-[#00A0FA]" : "text-[#859FAD]"}`}>Map</h1>
      </div>
      <div
        onClick={() => setView("list")}
        className={`flex justify-between ${view === "list" && "border-b border-b-2 border-[#00A0FA]"} px-1 py-2`}
      >
        <h1 className={`text-[12px] ${view === "list" ? "text-[#00A0FA]" : "text-[#859FAD]"}`}>List</h1>
      </div>
      <div
        onClick={() => setView("table")}
        className={`flex justify-between ${view === "table" && "border-b border-b-2 border-[#00A0FA]"} px-1 py-2`}
      >
        <h1 className={`text-[12px] ${view === "table" ? "text-[#00A0FA]" : "text-[#859FAD]"}`}>Table</h1>
      </div>
    </div>
  );
}
