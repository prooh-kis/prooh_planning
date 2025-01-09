export const PageFooter = () => {
  return (
    <div className="bg-[#1F1F1F] text-[#FFFFFF]">
      {/* Main Footer Section */}
      <div className="w-full px-4 py-6 sm:px-8 md:px-20 lg:px-40 border-b border-[#474747]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h1 className="text-[20px] font-bold">PROOH.AI</h1>
            <h1 className="text-[12px] font-normal leading-[18px] mt-6 opacity-40">
              Navigation
            </h1>
            <div className="flex flex-wrap md:flex-nowrap gap-8 mt-6 text-[14px] leading-[19.6px]">
              <div>
                <p>Home</p>
                <p>Features</p>
                <p>Terms</p>
                <p>F.A.Q</p>
                <p>Product</p>
              </div>
              <div>
                <p>Research</p>
                <p>Media Owner</p>
                <p>About us</p>
                <p>Contact Us</p>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div>
            {/* Contact Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h1 className="text-[12px] font-normal leading-[18px] opacity-40">
                  Contact Us
                </h1>
                <p>+918125480000</p>
                <p>+1 (480) 555-0103</p>
              </div>
              <div>
                <h1 className="text-[12px] font-normal leading-[18px] opacity-40">
                  Email
                </h1>
                <p>prooh.aws@gmail.com</p>
              </div>
            </div>
            {/* Social & Chat Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
              <div>
                <h1 className="text-[12px] font-normal leading-[18px] opacity-40">
                  Follow Us
                </h1>
                <div className="flex gap-4 mt-8">
                  {[
                    "fi fi-brands-facebook",
                    "fi fi-brands-google",
                    "fi fi-brands-linkedin",
                    "fi fi-brands-youtube",
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="border rounded-full h-[50px] w-[50px] flex items-center justify-center hover:bg-green-200 transition-colors duration-300"
                    >
                      <i
                        className={`${value} text-[24px] text-[#FFFFFF] leading-none`}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h1 className="text-[12px] font-normal leading-[18px] opacity-40">
                  {`Let's Chat`}
                </h1>
                <div className="flex gap-4 mt-8">
                  {[
                    "fi fi-brands-telegram text-[24px]",
                    "fi fi-brands-whatsapp text-[24px]",
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="border rounded-full h-[50px] w-[50px] flex items-center justify-center hover:bg-green-200 transition-colors duration-300"
                    >
                      <i
                        className={`${value} text-[24px] text-[#FFFFFF] leading-none`}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Location */}
            <h1 className="text-[12px] font-normal leading-[18px] mt-8 opacity-40">
              Location
            </h1>
            <p className="text-[14px] font-normal leading-[18px] mt-4">
              Paras Trade Center, Gwal Pahari, Gurgaon, India
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Footer Section */}
      <div className="w-full px-4 py-4 sm:px-8 md:px-20 lg:px-40 bg-[#1F1F1F]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[12px] font-normal text-[#BABCD2] leading-[19.86px]">
            © 2023 prooh.ai All rights reserved.
          </p>
          <div className="flex gap-2 items-center mt-4 sm:mt-0">
            <div className="h-1 w-1 bg-[#6633EE] rounded-full"></div>
            <p className="text-[12px] font-normal text-[#BABCD2] leading-[19.86px]">
              All systems normal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
