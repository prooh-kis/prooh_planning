import React, { useState } from 'react';

export const Footer: React.FC = () => {
  // State to track if the footer is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle between expanded and collapsed states
  const toggleFooter = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-100 text-white transition-all duration-300 ease-in-out
      ${isExpanded ? 'h-[350px]' : 'h-[60px]'}`}>
      
      {/* Content inside the footer */}
      <div className="flex justify-between items-center px-[3rem] h-full w-full">
        <div>
          <p className="text-sm text-black">Summary goes here...</p>

        </div>
        
        {/* Toggle Button */}
        {/* <button
          title="footer"
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleFooter}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button> */}
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
