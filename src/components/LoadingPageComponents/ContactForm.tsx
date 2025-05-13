import ButtonInput from "../../components/atoms/ButtonInput";
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
    <div className="px-12 sm:px-8 lg:px-16 w-full font-custom py-16">
      {/* Form */}
      <div className="grid grid-cols-12 p-2 mt-8">
        <div className="col-span-12 sm:col-span-4 rounded">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-[#1E376E] text-start font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Let’s Connect & <br/>Grow <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">Together!</span> 
            </h1>
            <p className="text-[20px] py-8 text-[#2D5087]">Our Platform helps your business in <br/> managing expenses. These are some</p>
          </div>

          <div className="flex gap-4 items-center justify-start py-2">
            <div className="w-8 h-8 bg-[#E8F5FF] rounded-full flex justify-center items-center">
              <i className="fi fi-sr-phone-call text-[#129BFF] flex justify-center items-center"></i>
            </div>
            <p className="text-[#2D5087] text-sm">+918125480000</p>
          </div>
          <div className="flex gap-4 items-center justify-start py-4">
            <div className="w-8 h-8 bg-[#E8F5FF] rounded-full flex justify-center items-center">
              <i className="fi fi-sr-envelope text-[#129BFF] flex justify-center items-center"></i>
            </div>
            <p className="text-[#2D5087] text-sm">contact@prooh.ai</p>
          </div>
          <div className="flex gap-4 items-center justify-start py-2">
            <div className="w-8 h-8 bg-[#E8F5FF] rounded-full flex justify-center items-center">
              <i className="fi fi-sr-marker text-[#129BFF] flex justify-center items-center"></i>
            </div>
            <p className="text-[#2D5087] text-sm">
              Paras Trade Center, Gwal Pahari, Gurgaon, India
            </p>
          </div>
          <div className="py-8 flex items-center gap-4">
            <div className="w-8 h-8 bg-[#129BFF] rounded-full flex justify-center items-center">
              <i className="fi fi-brands-linkedin text-white flex justify-center items-center"></i>
            </div>
            <div className="w-8 h-8 bg-[#129BFF] rounded-full flex justify-center items-center">
              <i className="fi fi-brands-instagram text-white flex justify-center items-center"></i>
            </div>
            <div className="w-8 h-8 bg-[#129BFF] rounded-full flex justify-center items-center">
              <i className="fi fi-brands-twitter-alt text-white flex justify-center items-center"></i>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 p-8 border border-gray-100 shadow-sm rounded-[8px]">
          <form>
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <div>
                <label className="text-sm text-gray-500">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border-b border-[#D6D2D2] bg-transparent px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border-b border-[#D6D2D2] bg-transparent px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-[#D6D2D2] bg-transparent px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-b border-[#D6D2D2] bg-transparent px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
              </div>
            </div>

            {/* Website and Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <div>
                <label className="text-sm text-gray-500">Website</label>
                <input
                  type="text"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                  placeholder="Enter your website link"
                  className="w-full border-b border-[#D6D2D2] bg-transparent px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">
                  Organization
                </label>
                <input
                  type="text"
                  placeholder="Enter your organization name"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full border-b border-[#D6D2D2] bg-transparent px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="py-4">
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

            {/* Message */}
            <div className="py-2">
              <label className="text-sm text-gray-500">Message</label>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="How Did You Find Us? *"
                className="w-full border-b border-[#D6D2D2] bg-transparent px-4 py-3 text-gray-800 focus:outline-none focus:border-primaryButton"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-end">
              <ButtonInput onClick={sendEmail}>Send Message</ButtonInput>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
