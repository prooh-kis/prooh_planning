import { formatNumber } from "../../utils/formatValue";

interface QuickSummaryRecieptProps {
  selectedTrigger?: any;
  tableDataForSelectTrigger?: any;
}
export const QuickSummaryReciept = ({
  selectedTrigger,
  tableDataForSelectTrigger,
}: QuickSummaryRecieptProps) => {
  return (
    <div className="border rounded h-full">
      <div className="py-3 px-4">
        <h1 className="text-[16px]">Trigger Selection - {selectedTrigger}</h1>
        <p className="text-[12px] text-[#737373]">
          Your final bill will include the cost of all the additional slots
        </p>
      </div>
      <div className="px-4 flex flex-col gap-4 mt-4 h-[38vh] overflow-y-auto">
        {Object.keys(tableDataForSelectTrigger || {})?.map(
          (key: string, index: any) => (
            <div key={index} className="pr-4">
              <div className="flex justify-between">
                <h1 className="pb-2">{key}</h1>
                <h1
                  className={
                    key === "Total Budget"
                      ? "text-[#1297E2] text-[20px]"
                      : "text-[#CC1C1C]"
                  }
                >
                  {key === "per slot price" ||
                  key === "Total Budget" ||
                  key === "CPM"
                    ? "\u20B9 "
                    : ""}
                  {!isNaN(Number(tableDataForSelectTrigger[key]))
                    ? formatNumber(
                        Number(tableDataForSelectTrigger[key]).toFixed(0)
                      )
                    : tableDataForSelectTrigger[key]}
                  {key === "Campaign Duration" ? " Days" : ""}
                </h1>
              </div>
              <div className="border border-1"></div>
            </div>
          )
        )}
      </div>
      <h1 className="p-3 text-[#E90707] text-[14px] mt-4">
        Note - these fields are subject to change when you <br /> proceed for
        optimizing this plan
      </h1>
    </div>
  );
};
