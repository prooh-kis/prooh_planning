import { ScreenSummaryModel } from '../../components/popup/ScreenSummaryModel';
import React, { useState } from 'react';

export const Footer = ({ handleSave, handleBack } : any) => {
  // State to track if the footer is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle between expanded and collapsed states
  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 transition-all duration-300 ease-in-out
      ${isExpanded ? 'h-[350px]' : 'h-[60px]'}`}>
      
      {/* Content inside the footer */}
      <div className="flex justify-between items-center px-[3rem] h-full w-full">
      <div className="py-8 flex justify-between">
      <div className="flex justify-between items-center gap-4">
        <ScreenSummaryModel />
        <div className="flex gap-2">
          <h1>Total screens</h1>
          <h1 className="font-semibold">27/73</h1>
        </div>
        <div className="flex gap-2">
          <h1>Total impression</h1>
          <h1 className="font-semibold">100k</h1>
        </div>
        <div className="flex gap-2">
          <h1>Total Budget</h1>
          <h1 className="font-semibold">200 Lkh</h1>
        </div>
        <div className="flex gap-2">
          <h1>CPM</h1>
          <h1 className="font-semibold">34</h1>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <button
          className="border border-1 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
          title="Go back"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="border border-1 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          title="Save and go next"
          onClick={handleSave}
        >
          Save and Continue
        </button>
      </div>
    </div>
        
        {isExpanded ? (
          <i className="fi fi-ss-angle-up text-gray-500" onClick={toggleFooter}></i>
        ) : (
          <i className="fi fi-ss-angle-down text-gray-500" onClick={toggleFooter}></i>
        )}
      </div>

      {/* Expanded content that appears only when the footer is expanded */}
      {isExpanded && (
        <div className="p-4">
          <p>Additional information or details in the expanded view...</p>
        </div>
      )}
    </div>
  );
};
