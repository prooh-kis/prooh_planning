import React, { useEffect, useState } from "react";

// Inline SVG Icons
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

interface FinalConfirmationPopupProps {
  open?: boolean;
  onClose?: (confirmed: boolean) => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  message?: string;
  title?: string;
  loading?: boolean;
}

export function FinalConfirmationPopup({
  onClose,
  open,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonText = "Confirm",
  secondaryButtonText = "Cancel",
  message = "Your action has been completed successfully!",
  title = "Success!",
  loading = false
}: FinalConfirmationPopupProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    }
    if (onClose) onClose(true);
  };

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    }
    if (onClose) onClose(false);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      // Trigger animation after the component is mounted
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div 
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl w-[28rem] p-8 shadow-2xl transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6 mt-4">
            <div className={`absolute inset-0 bg-[#22C55E] rounded-full animate-ping ${isAnimating ? 'opacity-75' : 'opacity-0'}`}></div>
            <div className="w-24 h-24 bg-gradient-to-br from-[#22C55E] to-[#B9EAB3] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="text-white">
                <CheckCircleIcon />
              </div>
            </div>
            <div className={`absolute -top-2 -right-2 w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center text-white text-sm font-bold animate-bounce ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
              ✓
            </div>
          </div>
          
          <h3 className="text-[20px] font-bold bg-gradient-to-r from-[#00000080] to-[#00000050] bg-clip-text text-transparent mb-3">
            {title}
          </h3>
          <p className="text-gray-600 mb-8 text-[12px] leading-relaxed">
            {message}
          </p>
          
          <div className="flex w-full gap-4">
            {onSecondaryAction && (
              <button
                type="button"
                onClick={handleSecondaryAction}
                disabled={loading}
                className={`flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium ${!loading ? 'hover:bg-[#D7D7D7] hover:border-[#00A0FA20] hover:text-[#00A0FA60]' : 'opacity-50 cursor-not-allowed'} transition-all duration-300 flex items-center justify-center gap-2`}
              >
                <ArrowLeftIcon />
                {secondaryButtonText}
              </button>
            )}
            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={loading}
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-[#00A0FA] to-[#00A0FA80] text-white font-medium rounded-xl ${!loading ? 'hover:shadow-lg hover:shadow-[#00A0FA20] hover:from-[#00A0FA80] hover:to-[#00A0FA]' : 'opacity-70 cursor-not-allowed'} transition-all duration-300 flex items-center justify-center gap-2 group`}
            >
              {loading ? (
                <>
                  <Spinner />
                  Processing...
                </>
              ) : (
                <>
                  {primaryButtonText}
                  <div className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => onClose?.(false)}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-[#D7D7D7] text-gray-500 hover:bg-[#D7D7D7] hover:text-gray-700 transition-colors duration-200"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
