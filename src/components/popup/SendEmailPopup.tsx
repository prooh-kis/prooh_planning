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

  const [email, setEmail] = useState<any>("");

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
      <div className="border bg-white rounded-[10px] w-[30vw] p-4">
       
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
        <div className="border-b py-2">
          <h1>CC:</h1>
          {cc?.map((item: any, index: number) => (
            <CheckboxInput 
              key={index}
              textSize="14px"
              label={item.toLowerCase()}
              checked={!!item}
              emailText={true}
              disabled={item === "tech@prooh.ai" ? true : false}
              onChange={(e: any) => {
                if (cc.includes(item)) {
                  const newCC = cc?.filter((item: any, i: any) => i !== index);
                  setCC(newCC);
                }
                // setCC((prev: any) => [...prev, item]);
              }}
            />
          ))}
        </div>
        <div className="py-2 grid grid-cols-6 gap-2">
          <input
            type="email"
            className="border rounded-[5px] p-2 col-span-5"
            placeholder="Enter email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <button
            type="button"
            title="add email"
            disabled={email === null ? true : false}
            className="col-span-1 flex items-center justify-center rounded-[6px] bg-primaryButton hover:bg-gray-500"
            onClick={() => {
              if (cc.includes(email)) {
                message.error("Email already added");
                return;
              } else {
                setCC((prev: any) => [...prev, email]);
                setEmail("");
              }
            }}
          >
            <i className="fi fi-br-plus flex items-center text-white"></i>
          </button>
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
