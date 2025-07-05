import React, { useEffect } from "react";

interface FinalConfirmationPopupProps {
  open?: boolean;
  onClose?: any;
}

export function FinalConfirmationPopup({
  onClose,
  open,
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

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-1.9/4 w-1/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose(false)}
        >
          <i className="fi fi-br-cross"></i>
        </div>
        
      </div>
    </div>
  );
}
