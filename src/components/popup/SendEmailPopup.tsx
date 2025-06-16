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
  sendEmail,
  loadingEmailReady
}: SendEmailPopupProps) {

  useEffect(() => {

    if (cc.includes(toEmail)) {
      const newCC = cc?.filter((item: any) => item !== toEmail);
      setCC(newCC);
    }
  },[cc, setCC, toEmail]);

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
      <div className="border bg-white rounded-[10px] h-[40vh] w-[30vw] p-4">
       
        <div className="flex justify-between items-center py-2 border-b">
          <h1 className="text-[16px] font-bold">Select email ids to send email</h1>

          <div
            className="relative inset-0 flex items-center justify-end gap-4"
            onClick={() => onClose()}
          >
            <i className="fi fi-rr-cross-small flex items-center"></i>
          </div>
        </div>
        <h1 className="text-[10px]">Email will be sent from the official id of prooh planner, please make sure to allow incoming emails from plan@prooh.ai</h1>
        <div className="py-2">
          <h1>Recepient:</h1>
          <CheckboxInput 
            textSize="14px"
            label={campaignDetails?.campaignPlannerEmail}
            checked={campaignDetails.campaignPlannerEmail}
            onChange={(e: any) => {
              // campaignDetails.campaignPlannerEmail = e;
              setCC((prev: any) => [...prev, campaignDetails.campaignPlannerEmail]);
            }}
          />
        </div>
        <div className="border-b py-2">
          <h1>CC:</h1>
          <CheckboxInput 
            textSize="14px"
            label={campaignDetails?.campaignManagerEmail}
            checked={campaignDetails.campaignManagerEmail}
            onChange={(e: any) => {
              // campaignDetails.campaignManagerEmail = e;
              setCC((prev: any) => [...prev, campaignDetails.campaignManagerEmail]);
            }}
          />
        </div>
        <div className="py-4">
          <ButtonInput
            variant="primary"
            loadingText="Sending..."
            loading={loadingEmailReady}
            disabled={loadingEmailReady}
            icon={<i className="fi fi-sr-envelope flex items-center"></i>}
            onClick={() => {
              if (isValidEmail(toEmail)) {
                sendEmail();
                message.info(
                  "Sending complete plan summary, please call your manager and take approval"
                );
              } else message.error("Please Enter valid email");
            }}
          >
            Send
          </ButtonInput>
        </div>
      </div>
    </div>
  );
}
