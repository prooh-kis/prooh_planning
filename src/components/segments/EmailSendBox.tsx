import { PrimaryInput } from "../../components/atoms/PrimaryInput"
import { PrimaryButton } from "../../components/atoms/PrimaryButton"
import { useState } from "react";

interface EmailSendBoxProps {
  toEmail?: any;
  setToEmail?: any;
  sendEmail?: any;
  sendEmailToAll?: any;
  cc?: any;
  data?: any
  type?: any;
}

export const EmailSendBox = ({cc, data, type, toEmail, setToEmail, sendEmail, sendEmailToAll}: EmailSendBoxProps) => {
  return (
    <div className="p-2">
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg">
          2. Share this plan to client
        </h1>
        <div className="grid grid-cols-6 gap-2 pt-4">
          <div className="col-span-4">
            <PrimaryInput
              placeholder="Enter Email"
              value={toEmail}
              inputType="text"  // Updated inputType to be more specific
              action={setToEmail}  // Updated action type to be more specific
              rounded="rounded-[8px]"
            />
          </div>
          <div className="col-span-1">
            <PrimaryButton
              title={"Send"}
              rounded="rounded-[8px]"
              action={sendEmail}
              width="w-full"
              height=""
              textSize="14px"
            />
          </div>
          {type === "vendor" && (
            <div className="col-span-1">
              <PrimaryButton
                title={"Send To All"}
                rounded="rounded-[8px]"
                action={sendEmailToAll}
                width="w-full"
                height=""
                textSize="14px"
              />
            </div>
          )}
          
        </div>
        <p className="p-1 pb-6 text-gray-500 text-[12px]">Send plan summary as pdf attachement in email</p>
      </div>
    </div>
  )
}