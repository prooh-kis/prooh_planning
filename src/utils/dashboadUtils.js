export function calculateScreenTimePercentage() {
  // Get current time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Define start and end time in minutes from midnight
  const startTime = 5 * 60; // 5:00 AM in minutes
  const endTime = 23 * 60 + 59; // 11:59 PM in minutes
  const totalDuration = endTime - startTime; // Total minutes from 5:00 AM to 11:59 PM

  // Calculate current time in minutes from midnight
  const currentTime = currentHour * 60 + currentMinute;

  // Elapsed time from 5:00 AM
  const elapsedTime = currentTime - startTime;

  // Ensure elapsed time doesn't go negative and doesn't exceed 100%
  const percentage = Math.max(
    0,
    Math.min((elapsedTime / totalDuration) * 100, 100)
  );

  return percentage.toFixed(0) + "%";
}


