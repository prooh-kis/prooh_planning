import { useNavigate } from "react-router-dom";

interface PrimaryInputProps {
  placeholder: string;
  value: string;
  action: (value: string) => void;  // Updated action type to be more specific
}

export const PrimaryInput = ({placeholder, value, action }: PrimaryInputProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <input
        title="campaign_name"
        value={value}
        onChange={(e) => action(e.target.value)}
        className="h-[48px] w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 active:bg-blue-100 transition-colors"
      />
    </div>
  );
};
