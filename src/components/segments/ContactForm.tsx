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
    <div className="px-4">
      <div className="py-20 px-4 sm:px-8 bg-gray-100 flex justify-center rounded-[50px]">
        <div className="flex flex-col items-center max-w-[90%] sm:max-w-[640px]">
          {/* Title */}
          <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-semibold text-[#0E212E] leading-tight sm:leading-[44px] lg:leading-[51px] tracking-[-0.04em] text-center">
            Reach Out Anytime, {"We're"} <br />
            Just A Click Away
          </h1>
          {/* Description */}
          <p className="mt-4 text-[14px] sm:text-[16px] text-[#254354] leading-relaxed sm:leading-[24px] tracking-[-0.02em] text-center">
            Our platform helps your business in managing expenses. These are
            some
          </p>

          {/* Form */}
          <div className="w-full sm:w-[640px] mt-8">
            <div className="w-full bg-white rounded-[12px] px-4 sm:px-[21px] py-6 sm:py-[34px] shadow-md">
              <form className="space-y-6">
                {/* Name Field */}
                <input
                  type="text"
                  id="name"
                  placeholder="Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
                <input
                  type="text"
                  id="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                />
                <input
                  type="text"
                  id="message"
                  value={text}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How Did You Find Us? *"
                  className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-gray-800 focus:outline-none focus:border-primaryButton"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={sendEmail}
                  className="w-full bg-primaryButton text-white font-semibold py-4 rounded-lg hover:bg-primaryButtonHover transition"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
