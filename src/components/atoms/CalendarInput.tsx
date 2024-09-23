
interface CalenderInputProps {
  placeholder: string;
  value: string;
  action: any;  // Updated action type to be more specific
}

export const CalendarInput = ({placeholder, value, action }: CalenderInputProps) => {
  const getMinDateTime = (): string => {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset());  // Adjust for time zone
    return currentDate.toISOString().slice(0, 16);  // Get the format 'YYYY-MM-DDTHH:MM'
  };

  return (
    <div className="w-full">
      <input
        title="calendar_input"
        type="datetime-local"
        value={value}
        onChange={(e) => action(e.target.value)}
        className="h-[48px] w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-blue-100 transition-colors"
        min={getMinDateTime()}
      />
    </div>
  );
};
