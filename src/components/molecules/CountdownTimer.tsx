import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  createdAt: string; // Date string from the pin
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  createdAt,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // Time in milliseconds

  // Function to add 24 hours to the createdAt date
  const add24Hours = (date: string): Date => {
    const initialDate = new Date(date);
    const futureDate = new Date(initialDate.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours (24 * 60 * 60 * 1000 ms)
    return futureDate;
  };

  // Function to calculate time remaining in milliseconds
  const calculateTimeRemaining = (targetDate: Date) => {
    const now = new Date();
    return targetDate.getTime() - now.getTime();
  };

  useEffect(() => {
    // Get the target date (24 hours from createdAt)
    const targetDate = add24Hours(createdAt);

    // Start countdown and update every second
    const interval = setInterval(() => {
      const timeDiff = calculateTimeRemaining(targetDate);

      // If countdown reaches zero, clear the interval
      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining(0); // Countdown has ended
      } else {
        setTimeRemaining(timeDiff);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [createdAt]);

  // Format the remaining time into hours, minutes, and seconds
  const formatTimeRemaining = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      {timeRemaining > 0 ? (
        <div>
          <div className="flex gap-2 items-center justify-end text-[#FF0808]">
            <i className="fi fi-br-clock-three flex items-center"></i>
            <h1 className="text-[14px] font-semibold">
              {formatTimeRemaining(timeRemaining)}
            </h1>
          </div>
          <p className="text-[12px] text-gray-400">Time Remaining</p>
        </div>
      ) : (
        <h1 className="text-[#FF0808] text-[12px]">Countdown has ended!</h1>
      )}
    </div>
  );
};
