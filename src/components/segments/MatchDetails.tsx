interface MatchDetailsProps {
  details?: any;
}

export const MatchDetails = ({ details }: MatchDetailsProps) => {
  return (
    <div className="overflow-y-auto h-28 no-scrollbar">
      {details.length < 1 && (
        <p className="px-1 text-[12px] text-[#FF0808]">
          Please select a match first
        </p>
      )}
      {details?.map((m: any, i: any) => (
        <div key={i} className="border rounded-[10px] py-2 my-2 px-4">
          <div className="flex gap-2 items-center py-1">
            <i className="fi fi-sr-cricket text-[14px] flex items-center text-primaryButton"></i>
            <p className="text-[14px]">
              {m.team1} vs {m.team2}, {m.seriesName}
            </p>
          </div>
          <div className="flex gap-2 items-center py-1">
            <i className="fi fi-sr-marker text-[14px] flex items-center text-[#45B57F]"></i>
            <p className="text-[#73838E] text-[14px]">
              {m.ground}, {m.city}, {m.country}
            </p>
          </div>
          <div className="flex gap-2 items-center py-1">
            <i className="fi fi-br-calendar-clock text-[14px] flex items-center text-[#73838E]"></i>
            <p className="text-[#73838E] text-[12px]">
              {m.startDate}, {m.startTime}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
