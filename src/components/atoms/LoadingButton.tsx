import { useState } from "react";

interface ButtonProps {
  onClick: () => Promise<void>;
  label: string;
}

const LoadingButton: React.FC<ButtonProps> = ({ onClick, label }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`relative flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg transition-all duration-200
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
    >
      {loading ? (
        <svg
          className="w-5 h-5 animate-spin text-white"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
      ) : (
        label
      )}
    </button>
  );
};

export default LoadingButton;
