import { PrimaryInput } from "../../components/atoms/PrimaryInput"
import { PrimaryButton } from "../../components/atoms/PrimaryButton"
import { useState } from "react";

interface ContactFormProps {
  name?: any;
  setName?: any;
  email?: any;
  setEmail?: any;
  phone?: any;
  setPhone?: any;
  sendEmail?: any;
}

export const ContactForm = ({name, setName, email, setEmail, phone, setPhone, sendEmail }: ContactFormProps) => {
  return (
    <div className="py-10 px-60">
      <div className="col-span-4 py-2">
        <PrimaryInput
          placeholder="Enter Full Name"
          value={name}
          inputType="text"  // Updated inputType to be more specific
          action={setName}  // Updated action type to be more specific
          rounded="rounded-[8px]"
        />
      </div>
      <div className="col-span-4 py-2">
        <PrimaryInput
          placeholder="Enter Email Address"
          value={email}
          inputType="email"  // Updated inputType to be more specific
          action={setEmail}  // Updated action type to be more specific
          rounded="rounded-[8px]"
        />
      </div>
      <div className="col-span-4 py-2">
        <PrimaryInput
          placeholder="Enter Phone Number"
          value={phone}
          inputType="text"  // Updated inputType to be more specific
          action={setPhone}  // Updated action type to be more specific
          rounded="rounded-[8px]"
        />
      </div>
      <div className="col-span-4 py-2">
        <PrimaryButton
          title={"Send"}
          rounded="rounded-[8px]"
          action={sendEmail}
          width="w-full"
          height=""
          textSize="14px"
        />
      </div>
      <div className="col-span-4 grid grid-cols-3 py-4">
        <div className="col-span-1 flex items-center justify-center gap-2">
          <i className="fi fi-sr-phone-call text-[36px] text-[#129BFF] flex items-center justify-center"></i>
          <div>
            <h1 className="text-[16px] font-bold mb-[-2px]">
              Phone Number
            </h1>
            <p className="text-[16px] mt-[-2px]">
              8125480000
            </p>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center gap-2">
          <i className="fi fi-sr-envelope text-[36px] text-[#129BFF] flex items-center justify-center"></i>
          <div>
            <h1 className="text-[16px] font-bold mb-[-2px]">
              Email ID
            </h1>
            <p className="text-[16px] mt-[-2px]">
              contact@prooh.ai
            </p>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center gap-2">
          <i className="fi fi-sr-marker text-[36px] text-[#129BFF] flex items-center justify-center"></i>
          <div>
            <h1 className="text-[16px] font-bold mb-[-2px]">
              Address
            </h1>
            <p className="text-[16px] mt-[-2px]">
              Paras TC, Gurgaon, India
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}