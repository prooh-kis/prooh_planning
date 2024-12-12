interface CalenderInputProps {
  placeholder: string;
  value: string;
  action: any; // Updated action type to be more specific
  disabled: boolean;
  minDate: Date;
}

export const CalendarInput = ({
  placeholder,
  value,
  action,
  disabled = false,
}: CalenderInputProps) => {

  console.log(value);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate());
  const formattedYesterday = yesterday.toISOString().split("T")[0];

  return (
    <div className="w-full">
      <input
        title="calendar_input"
        type="date"
        disabled={disabled}
        value={value}
        onChange={(e) => action(e.target.value)}
        className="h-[48px] w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-blue-100 transition-colors"
        min={formattedYesterday}
      />
    </div>
  );
};
