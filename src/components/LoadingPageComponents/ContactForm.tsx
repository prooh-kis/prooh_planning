import { message } from "antd";
import { useState } from "react";

export const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [text, setMessage] = useState<string>("");

  const sendEmail = () => {
    message.success("Thank you!");
  };

  return (
    <div className="px-4 w-full">
      <div className="py-20 px-4 sm:px-8 flex justify-center">
        <div className="flex flex-col items-center max-w-[90%]">
          {/* Title */}
          <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-custom font-semibold text-[#0E212E] leading-tight sm:leading-[44px] lg:leading-[51px] tracking-[-0.04em] text-center">
            {"Let's connect and grow together"} 
          </h1>
          {/* Description */}
          <p className="mt-4 text-[14px] sm:text-[16px] text-[#254354] leading-relaxed sm:leading-[24px] tracking-[-0.02em] text-center">
            Feel free to connect for any queries and issues
          </p>

          {/* Form */}
          <div className="grid grid-cols-12 bg-white rounded-r pt-4">
            <div className="col-span-4 rounded bg-[#129BFF] p-8">
              <div className="mb-16">
                <h1 className="font-custom text-white text-xl">Contact Information</h1>
                <p className="text-sm text-white">Say something to start a conversation with us...</p>
              </div>
              <div className="">
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
              <div className="mt-20 flex items-center gap-2">
                <i className="fi fi-brands-linkedin text-white flex items-center"></i>
              </div>
            </div>
            <div className="col-span-8">
              <div className="w-full mt-8">
                <div className="w-full px-4 sm:px-[21px] py-6 sm:py-[34px]">
                  <form className="space-y-6">
                    {/* Name Field */}
                    <input
                      type="text"
                      id="name"
                      placeholder="Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                    <input
                      type="text"
                      id="email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                    <input
                      type="text"
                      id="phone"
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />
                    <input
                      type="text"
                      id="message"
                      value={text}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How Did You Find Us? *"
                      className="w-full border-b border-[#D6D2D2] bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      onClick={sendEmail}
                      className="w-full bg-primaryButton text-[#FFFFFF] font-semibold py-4 rounded-lg hover:bg-primaryButtonHover transition"
                    >
                      SEND
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
