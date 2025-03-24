import React from "react";

interface CalendarScaleSliderProps {
  days: number;
  daysPlayed: number;
}

export const CalendarScaleSlider: React.FC<CalendarScaleSliderProps> = ({
  days,
  daysPlayed,
}) => {
  // Generate an array of days from 1 to the provided total number of days
  const dayArray = Array.from({ length: days }, (_, i) => i + 1);

  // Select the days up to the number of daysPlayed
  const playedDays = dayArray.slice(0, daysPlayed);

  // Find the week that contains the last played day
  const lastPlayedDay = playedDays[playedDays.length - 1];
  const playedWeekIndex = Math.floor((lastPlayedDay - 1) / 7);

  // Function to check if the day is played
  const isDayPlayed = (day: number) => playedDays.includes(day);

  // Determine margin values based on played week
  const isFirstWeek = playedWeekIndex === 0;
  const isLastWeek = playedWeekIndex === Math.ceil(days / 7) - 1;

  // Determine line color based on played days
  const lineColor =
    Number(playedDays) > 0 ? "border-[#129BFF20]" : "border-[#129BFF30]"; // Change color if days are played

  return (
    <div className="calendar-scale relative flex flex-col items-start w-full">
      {/* Continuous horizontal line behind circles */}
      <div
        className={`absolute bottom-1/4 left-0 right-0 transform -translate-y-1/2 border-t border-2
          ${lineColor}`}
        style={{
          marginLeft: isFirstWeek ? "20px" : "25px", // Change margin if daysPlayed is in the first week
          marginRight: isLastWeek ? "20px" : "35px", // Change margin if daysPlayed is in the last week
        }}
      ></div>

      {/* Weeks in a linear scale */}
      <div className="flex items-center justify-between w-full relative z-1 mt-[-17px]">
        {/* Loop through each week */}
        {Array.from({ length: Math.ceil(days / 7) }, (_, weekIndex) => {
          // Calculate the start and end day of the current week
          const weekStartDay = weekIndex * 7 + 1;
          const weekEndDay = Math.min((weekIndex + 1) * 7, days);

          // Check if the current week is the one that contains the played days
          const isPlayedWeek = weekIndex === playedWeekIndex;

          // Determine if the week circle should be colored differently
          const isFutureWeek = weekIndex > playedWeekIndex; // Check if the week is after the played week

          return (
            <React.Fragment key={weekIndex}>
              {/* Week divider */}
              {weekIndex > 0 && (
                <div className="flex flex-col items-center justify-center px-2 mb-[-15px]">
                  <div className="week-divider w-px h-4 bg-[#D7D7D7]"></div>
                </div>
              )}

              {/* If it's the played week, show all days of the week */}
              {isPlayedWeek ? (
                <div className="flex items-center justify-between w-full">
                  {Array.from(
                    { length: weekEndDay - weekStartDay + 1 },
                    (_, i) => {
                      const day = weekStartDay + i;
                      return (
                        <div
                          key={day}
                          className="flex flex-col px-4 items-center"
                        >
                          <div className="text-[12px] text-gray-400">{day}</div>
                          <div
                            className={`w-4 h-4 rounded-full relative z-1 ${
                              lastPlayedDay === day
                                ? "bg-[#22C55E]"
                                : isDayPlayed(day)
                                ? "bg-[#129BFF]"
                                : "bg-[#D7D7D7]"
                            }`}
                          >
                            <div
                            className={`w-4 h-4 rounded-full relative z-1 ${
                              lastPlayedDay === day
                                && "bg-[#22C55E] animate-ping"
                   
                            }`}
                          />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                // If it's not the played week, collapse it into a single circle
                <div className="flex flex-col mr-2 items-center w-20">
                  <div className="text-[12px] text-gray-400">
                    Week {weekIndex + 1}
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full relative z-1 ${
                      isFutureWeek ? "bg-[#D7D7D7]" : "bg-[#129BFF]"
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
