import React from "react";

interface Props {
  message: String;
  onClose: () => void;
}

export const SuccessConfirmationPopup = ({ message, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white border border-[#16a34a] rounded-lg p-8 max-w-md w-full shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <i className="fi fi-ss-check-circle text-5xl text-[#16a34a]"></i>
        </div>

        <h2 className="text-2xl font-bold text-[#15803d] mb-3">Success!</h2>

        <p className="text-gray-700 mb-6 font-medium">
          {message || "Your action has been completed successfully."}
        </p>

        <button
          onClick={onClose}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export const ErrorConfirmationPopup = ({ message, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-[#dc2626] rounded-lg p-8 max-w-md w-full shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <i className="fi fi-ss-cross-circle text-5xl text-[#dc2626]"></i>
        </div>

        <h2 className="text-2xl font-bold text-[#b91c1c] mb-3">Error!</h2>

        <p className="text-gray-700 mb-6 font-medium">
          {message || "An error occurred while processing your request."}
        </p>

        <button
          onClick={onClose}
          className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
