import React from "react";

const NoInternetPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-start max-w-md">
        <i className="fi fi-bs-wifi-slash text-[24px] "></i>
        <h1 className="text-3xl font-bold text-gray-900">
          This site can’t be reached
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Please check your internet connection. The page may be temporarily
          down or moved to a new web address.
        </p>
        <p className="text-gray-500 mt-2">
          <span className="font-medium">ERR_INTERNET_DISCONNECTED</span>
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-8 py-2 bg-[#129BFF] text-white rounded-md hover:bg-[#129BFF70]"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default NoInternetPage;
