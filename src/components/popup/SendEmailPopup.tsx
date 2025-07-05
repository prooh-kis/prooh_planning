import { isValidEmail } from "../../utils/valueValidate";
import ButtonInput from "../../components/atoms/ButtonInput";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import React, { useEffect, useState } from "react";
import { message } from "antd";

interface SendEmailPopupProps {
  open?: boolean;
  onClose?: any;
  campaignDetails?: any;
  setToEmail?: any;
  toEmail?: any;
  cc?: any;
  setCC?: any;
  sendEmail?: any;
  loadingEmailReady?: any;
}

export function SendEmailPopup({
  open,
  onClose,
  campaignDetails,
  setToEmail,
  toEmail,
  setCC,
  cc,
  loadingEmailReady,
  sendEmail
}: SendEmailPopupProps) {

  const [email, setEmail] = useState<any>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (cc.includes(toEmail)) {
      const newCC = cc?.filter((item: any) => item !== toEmail);
      setCC(newCC);
    }
  },[cc, setCC, toEmail]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
      setIsVisible(true);
    } else {
      document.body.classList.remove("overflow-hidden");
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open && !isVisible) {
    return null;
  }



  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className={`bg-white rounded-xl w-[32rem] shadow-xl transform transition-all duration-300 ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-gray-800">Select email recipients</h1>
          <button
            onClick={() => onClose()}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 p-4 text-sm text-blue-700 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <p>Email will be sent from <span className="font-medium">plan@prooh.ai</span>. Please ensure to allow incoming emails from this address.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Recipient Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-700">Recipient</h2>
            <div className="bg-gray-50 p-3 rounded-lg">
              <CheckboxInput 
                textSize="14px"
                label={campaignDetails?.campaignPlannerEmail}
                checked={!!campaignDetails?.campaignPlannerEmail}
                emailText={true}
                onChange={(e: boolean) => {
                  if (e) {
                    setCC((prev: string[]) => [...prev, campaignDetails.campaignPlannerEmail]);
                  } else {
                    setCC((prev: string[]) => prev.filter((email: string) => email !== campaignDetails.campaignPlannerEmail));
                  }
                }}
              />
            </div>
          </div>

          {/* CC Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-medium text-gray-700">CC</h2>
              <span className="text-xs text-gray-500">{cc?.length} email(s) added</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg space-y-2 max-h-40 overflow-y-auto">
              {cc?.length > 0 ? (
                cc.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between group">
                    <CheckboxInput 
                      textSize="14px"
                      label={item.toLowerCase()}
                      checked={!!item}
                      emailText={true}
                      disabled={item === "tech@prooh.ai"}
                      onChange={() => {
                        if (cc.includes(item)) {
                          const newCC = cc?.filter((_: any, i: number) => i !== index);
                          setCC(newCC);
                        }
                      }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">No CC recipients added yet</p>
              )}
            </div>
          </div>

          {/* Add Email Input */}
          <div className="space-y-2">
            <label htmlFor="email-input" className="text-sm font-medium text-gray-700">Add Email</label>
            <div className="flex gap-2">
              <input
                id="email-input"
                type="email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && email && !cc.includes(email)) {
                    setCC((prev: string[]) => [...prev, email]);
                    setEmail("");
                  }
                }}
              />
              <button
                type="button"
                disabled={!email || !isValidEmail(email) || cc.includes(email)}
                onClick={() => {
                  if (cc.includes(email)) {
                    message.error("Email already added");
                    return;
                  }
                  setCC((prev: string[]) => [...prev, email]);
                  setEmail("");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end">
            <ButtonInput
              variant="primary"
              loadingText="Sending..."
              loading={loadingEmailReady}
              disabled={loadingEmailReady || !isValidEmail(toEmail)}
              className="px-6 py-2.5 text-base font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
              icon={<i className="fi fi-sr-envelope flex items-center"></i>}
              onClick={() => {
                if (isValidEmail(toEmail)) {
                  sendEmail();
                  message.info("Sending complete plan summary, please call your manager and take approval");
                } else {
                  message.error("Please enter a valid recipient email");
                }
              }}
            >
              Send Email
            </ButtonInput>
          </div>
        </div>
      </div>
    </div>
  );
}
