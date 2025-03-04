import moment from "moment";

export function SingleCalenderData({
  data,
  setSelectedDate,
  selectedDate,
  setSelectedSpacialDay,
}: any) {
  const getDay = (date: string) => {
    return moment(date).format("ll");
  };
  const handleCheck = (e: any) => {
    setSelectedDate(data?.date);
    setSelectedSpacialDay(data?.specialDay);
  };
  return (
    <div className="flex justify-between hover:border hover:border-1 hover:border-[#129BFF] hover:text-[#129BFF] border-b py-4 px-4 rounded-lg">
      <div className="flex gap-2">
        <div className="rounded-[100%] h-8 w-8 p-2 bg-gray-100 i justify-center">
          <i className="fi fi-ss-cake-birthday text-[#28A61D] "></i>
        </div>
        <div>
          <h1>{data?.specialDay}</h1>
          <h1 className="text-[#737373] text-[13px] ">
            your final bill will include the cost of all
          </h1>
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <h1 className="text-[24px]">
            {getDay(data?.date).split(" ")[1]?.split(",")[0]}
          </h1>
          <h1 className="text-[#737373] text-[13px] ">
            {getDay(data?.date).split(" ")[0]}
          </h1>
        </div>
        <input
          title="month"
          type="radio"
          checked={data?.date === selectedDate}
          className="text-[24px]"
          onChange={handleCheck}
        />
      </div>
    </div>
  );
}
