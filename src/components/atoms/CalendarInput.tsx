interface CalendarInputProps {
  placeholder: string;
  value: string;
  action: (val: string) => void;
  disabled?: boolean;
  minDate?: Date;
}

export const CalendarInput = ({
  placeholder,
  value,
  action,
  disabled = false,
  minDate
}: CalendarInputProps) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1); // Set to yesterday correctly

  // Ensure minDate is formatted correctly for datetime-local
  const formatDateTimeLocal = (date: Date) => {
    return date.toISOString().slice(0, 16); // Ensure format is "YYYY-MM-DDTHH:MM"
  };

  return (
    <div className="w-full">
      <input
        title="calendar_input"
        type="datetime-local"
        disabled={disabled}
        value={value}
        onChange={(e) => action(e.target.value)}
        className="h-[48px] w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-[#F4F9FF] transition-colors"
        min={minDate ? formatDateTimeLocal(new Date(minDate)) : formatDateTimeLocal(yesterday)}
      />
    </div>
  );
};
