export const LandingPageTableView = ({
  data = {},
  stateCities,
  cityTouchpoints,
  touchpointsCities,
  defCnt,
  setDefCnt,
  defSt,
  setDefSt,
  defCt,
  getTotalCountryCount,
  handleCntClick,
  getTotalStatesCounts,
  handleStClick,
  getTotalCityCount,
  getTotalScreensCountTouchpointWise,
  getTotalScreensCount,
  getTotalScreensCountCityWise,
}: any) => {
  return (
    <div className="">
      <div className="grid grid-cols-12 border-y border border-proohGray bg-[#00A0FA]">
        <div className="border-r border-proohGray col-span-4 flex justify-between lg:px-5">
          <h1 className="text-[14px] text-black font-bold text-center px-4 py-2">
            Countries ({getTotalCountryCount()})
          </h1>
        </div>
        <div className="col-span-8 flex flex-nowrap overflow-scroll no-scrollbar">
          {Object.keys(data)?.map((c: any, i: any) => (
            <div
              className={
                defCnt.includes(c)
                  ? "border-r border-proohGray bg-[#D4F0FF] flex-none w-64 flex justify-center cursor-pointer items-center"
                  : "border-r border-proohGray bg-transparent flex-none w-64 flex justify-center cursor-pointer items-center"
              }
              key={i}
              onClick={() => {
                if (!defCnt.includes(c)) {
                  setDefCnt([...defCnt, c]);
                }
                handleCntClick(c);
              }}
            >
              <h1 className="text-[14px] text-black font-bold align-center truncate">
                {c}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12 border border-proohGray bg-[#D4F0FF]">
        <div className="border-r border-proohGray col-span-4 flex justify-between px-5 py-2">
          <h1 className="text-[14px] text-black font-bold text-center lg:px-4">
            States ({getTotalStatesCounts()})
          </h1>
        </div>
        <div className="col-span-8 flex flex-nowrap overflow-scroll no-scrollbar">
          {Object.keys(stateCities).map((s: any, i: any) => (
            <div
              className={
                defSt.includes(s)
                  ? "border-r border-proohGray bg-[#EDF9FF] flex-none w-64 flex justify-center cursor-pointer items-center"
                  : "border-r border-proohGray bg-transparent flex-none w-64 flex justify-center cursor-pointer items-center"
              }
              key={i}
              onClick={() => {
                if (!defSt.includes(s)) {
                  setDefSt([...defSt, s]);
                }
                handleStClick(s);
              }}
            >
              <h1 className="text-[14px] text-black font-bold align-center truncate">
                {s}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <div className="border-y border-l border-proohGray flex justify-between px-5 items-center py-2 bg-[#EDF9FF]">
            <h1 className="text-[14px] text-black font-bold text-center px-4">
              City ({getTotalCityCount()})
            </h1>
          </div>
          <div
            className="h-[360px] overflow-auto no-scrollbar sync-scroll-container"
            onScroll={(e) => {
              const { scrollLeft, scrollTop } = e.currentTarget;
              document.querySelectorAll(".sync-scroll-container").forEach((el) => {
                (el as HTMLElement).scrollLeft = scrollLeft;
                (el as HTMLElement).scrollTop = scrollTop;
              });
            }}
          >
            {Object.keys(touchpointsCities).map((tp: any, i: any) => (
              <div
                className="flex flex-row justify-between px-5 border-b border-l border-proohGray py-2"
                key={i}
              >
                <h1 className="text-[14px] font-semibold truncate lg:px-4">
                  {tp} ({getTotalScreensCountTouchpointWise(tp)})
                </h1>
              </div>
            ))}
          </div>
          <div className="bg-[#00A0FA] flex flex-row border justify-between px-5 py-2">
            <div className="text-[14px] lg:px-4 font-semibold">
              Total ({getTotalScreensCount()})
            </div>
          </div>
        </div>
        <div className="col-span-8 border border-proohGray">
          <div className="flex flex-nowrap overflow-scroll">
            {Object.keys(cityTouchpoints).map((c: any, j: any) => (
              <div className="flex-none w-64" key={j}>
                <div
                  className={
                    defCt.includes(c)
                      ? "border-r border-proohGray bg-proohYellow flex justify-center cursor-pointer py-2 bg-[#FFFADF]"
                      : "border-r border-b border-proohGray bg-transparent flex justify-center cursor-pointer py-2 bg-[#FFFADF]"
                  }
                >
                  <h1 className="text-[14px]">{c}</h1>
                </div>
                <div
                  className="h-[360px] overflow-auto no-scrollbar sync-scroll-container"
                  onScroll={(e) => {
                    const { scrollLeft, scrollTop } = e.currentTarget;
                    document.querySelectorAll(".sync-scroll-container").forEach((el) => {
                      (el as HTMLElement).scrollLeft = scrollLeft;
                      (el as HTMLElement).scrollTop = scrollTop;
                    });
                  }}
                >
                  {Object.keys(touchpointsCities).map((t: any, k: any) => (
                    <div
                      className="border-b border-r border-proohGray flex justify-center py-2"
                      key={k}
                    >
                      <h1 className="text-[14px]">
                        {touchpointsCities[t][c]?.length || 0}
                      </h1>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row border-r border-t border-proohGray justify-center py-2">
                  <h1 className="lg:text-[14px] text-[12px]">
                    {getTotalScreensCountCityWise(c)}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
