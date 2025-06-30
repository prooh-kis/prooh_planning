import { SCREEN_MANAGER } from "../../constants/userConstants";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const PageNotFound: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      // This message will be sent to the iframe
      const message = {
        type: 'USERINFO_FOR_VENDOR_DASHBOARD',
        data: {userRole: SCREEN_MANAGER},
        timestamp: new Date().toISOString()
      };

      // Wait for the iframe to be fully loaded
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Send the message to the iframe
        iframeRef.current.contentWindow.postMessage(message, 'https://cms.prooh.ai/');
        // Also log it in the parent console for debugging
        console.log('Message sent to iframe:', message);
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-4xl">
          <span className="font-bold">404</span> | Page Not Found
        </p>
        <Link to="/">
          <p className="mt-2 text-sm underline text-[#129BFF]"></p>
          Go Home
        </Link>
      </div>
      <iframe
        ref={iframeRef}
        className="w-full h-[100vh] border"
        src="http://localhost:3000/campaignDashboard/684a907de21fdccaadc14a1f?embed=true"
        title="Campaign Dashboard"
      />
    </div>
  );
};
