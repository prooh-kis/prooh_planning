import { RadioInput } from "../../components/atoms/RadioInput";
import { message } from "antd";
import { useState } from "react";

export const ContactForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [websiteLink, setWebsiteLink] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");

  const [messageText, setMessageText] = useState<string>("");

  const sendEmail = () => {
    message.success("Thank you!");
  };

  return (
    <div className="px-4 w-full">
      <div className="py-20 px-4 sm:px-8 flex justify-center">
        <div className="flex flex-col items-center max-w-[90%]">
          {/* Title */}
          <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-custom font-bold text-[#0E212E] leading-tight sm:leading-[44px] lg:leading-[51px] tracking-[-0.04em] text-center">
            {"Let's connect and grow together"} 
          </h1>
          {/* Description */}
          <p className="mt-4 text-[14px] sm:text-[16px] text-[#254354] leading-relaxed sm:leading-[24px] tracking-[-0.02em] text-center">
            Feel free to connect for any queries and issues
          </p>

          {/* Form */}
          <div className="grid grid-cols-12 bg-white rounded-r shadow-sm p-2 mt-8">
            <div className="col-span-4 rounded bg-[#129BFF] p-8 grid grid-rows-12">
              <div className="row-span-4">
                <h1 className="font-custom text-white text-xl">Contact Information</h1>
                <p className="text-sm text-white">Say something to start a conversation with us...</p>
              </div>
              <div className="row-span-7">
                <div className="flex gap-4 items-center justify-start py-2">
                  <i className="fi fi-sr-phone-call text-white flex items-center"></i>
                  <p className="text-white text-sm">+918125480000</p>
                </div>
                <div className="flex gap-4 items-center justify-start py-2">
                  <i className="fi fi-sr-envelope text-white flex items-center"></i>
                  <p className="text-white text-sm">contact@prooh.ai</p>
                </div>
                <div className="flex gap-4 items-center justify-start py-2">
                  <i className="fi fi-sr-marker text-white flex items-center"></i>
                  <p className="text-white text-sm">Paras Trade Center, Gwal Pahari, Gurgaon, India</p>
                </div>
              </div>
              <div className="row-span-1flex items-center gap-2">
                <i className="fi fi-brands-linkedin text-white flex items-center"></i>
              </div>
            </div>
            <div className="col-span-8 px-8">
              <form className="">
                {/* Name Field */}
                <div className="grid grid-cols-2 gap-8 py-4">
                  <div className="col-span-1">
                    <label className="text-sm px-2 text-gray-500">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first name"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="placeholder:text-[12px] w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm px-2 text-gray-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last name"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="placeholder:text-[12px] w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                  </div>
                  
                </div>
                <div className="grid grid-cols-2 gap-8 py-4">
                  <div className="col-span-1">
                    <label className="text-sm px-2 text-gray-500">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="placeholder:text-[12px] w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm px-2 text-gray-500">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="placeholder:text-[12px] w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 py-4">
                  <div className="col-span-1">
                    <label className="text-sm px-2 text-gray-500">
                      Website
                    </label>
                    <input
                      type="text"
                      id="message"
                      value={websiteLink}
                      onChange={(e) => setWebsiteLink(e.target.value)}
                      placeholder="How Did You Find Us? *"
                      className="placeholder:text-[12px] col-span-1 w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="text-sm px-2 text-gray-500">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      placeholder="Enter your organization name"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="placeholder:text-[12px] w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                  </div>
                </div>
                <div className="">
                  <h1 className="text-sm font-semibold">Select Subject</h1>
                  <div className="flex items-center gap-4 py-2 flex-wrap">
                    <RadioInput
                      title="DOOH inventory related enquiry"
                      isChecked={true}
                      value={""}
                      onChange={() => {}}
                      textSize="text-sm truncate"
                    />
                    <RadioInput
                      title="Campaigns related enquiry"
                      isChecked={false}
                      value={""}
                      onChange={() => {}}
                      textSize="text-sm truncate"
                    />
                    <RadioInput
                      title="Other enquiry"
                      isChecked={false}
                      value={""}
                      onChange={() => {}}
                      textSize="text-sm truncate"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <label className="text-sm px-2 text-gray-500">
                    Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="How Did You Find Us? *"
                    className="placeholder:text-[12px] w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                  />
                </div>

                {/* Submit Button */}
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    onClick={sendEmail}
                    className="font-custom w-1/2 bg-primaryButton text-[#FFFFFF] font-regular py-4 rounded-lg hover:bg-primaryButtonHover transition"
                  >
                    Send Message
                  </button>
                </div>
                
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
