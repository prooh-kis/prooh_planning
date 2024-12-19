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
    <div className="py-10 px-40 w-full">
      <div className="py-2">
        <PrimaryInput
          placeholder="Enter Full Name"
          value={name}
          inputType="text"  // Updated inputType to be more specific
          action={setName}  // Updated action type to be more specific
          rounded="rounded-[8px]"
        />
      </div>
      <div className="py-2">
        <PrimaryInput
          placeholder="Enter Email Address"
          value={email}
          inputType="email"  // Updated inputType to be more specific
          action={setEmail}  // Updated action type to be more specific
          rounded="rounded-[8px]"
        />
      </div>
      <div className="py-2">
        <PrimaryInput
          placeholder="Enter Phone Number"
          value={phone}
          inputType="text"  // Updated inputType to be more specific
          action={setPhone}  // Updated action type to be more specific
          rounded="rounded-[8px]"
        />
      </div>
      <div className="py-2">
        <PrimaryButton
          title={"Send"}
          rounded="rounded-[8px]"
          action={sendEmail}
          width="w-full"
          height=""
          textSize="14px"
        />
      </div>
      <div className="grid grid-cols-6 py-4">
        <div className="col-span-2 lg:flex lg:items-center lg:justify-center gap-2">
          <i className="fi fi-sr-phone-call lg:text-[36px] md:text-[18px] text-[#129BFF] flex items-center justify-center"></i>
          <div>
            <h1 className="lg:text-[16px] md:text-[12px] md:text-center font-bold mb-[-2px] truncate">
              Phone Number
            </h1>
            <p className="lg:text-[16px] md:text-[12px] md:text-center mt-[-2px] truncate">
              8125480000
            </p>
          </div>
        </div>
        <div className="col-span-2 lg:flex lg:items-center lg:justify-center gap-2">
          <i className="fi fi-sr-envelope lg:text-[36px] md:text-[18px] text-[#129BFF] flex items-center justify-center"></i>
          <div>
            <h1 className="lg:text-[16px] md:text-[12px] md:text-center font-bold mb-[-2px] truncate">
              Email ID
            </h1>
            <p className="lg:text-[16px] md:text-[12px] md:text-center mt-[-2px] truncate">
              contact@prooh.ai
            </p>
          </div>
        </div>
        <div className="col-span-2 lg:flex lg:items-center lg:justify-center gap-2">
          <i className="fi fi-sr-marker lg:text-[36px] md:text-[18px] text-[#129BFF] flex items-center justify-center"></i>
          <div>
            <h1 className="lg:text-[16px] md:text-[12px] md:text-center font-bold mb-[-2px] truncate">
              Address
            </h1>
            <p className="=lg:text-[16px] md:text-[12px] md:text-center mt-[-2px] truncate">
              Paras TC, Gurgaon, India
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}