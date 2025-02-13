import React from "react";
import { PageFooter } from "../../components/PageFooter";
import {
  marketPageData1,
  marketPageData2,
} from "../../data/websiteHardCodedData";
import { CreateCampaignOption } from "../../components/index";
import { motion } from "framer-motion";
import { MarketGetStarted } from "../../components/molecules/MarketGetStarted";

export const MarketersPage: React.FC = () => {
  return (
    <div className="w-screen h-full pb-0">
      {/* Hero Section */}
      <div className="px-4 sm:px-10 md:px-16 lg:px-20">
        <MarketGetStarted />
      </div>
      {/* Main Content */}
      <div className="flex justify-center mt-8 sm:mt-16 px-4">
        <div className="flex flex-col w-full justify-between lg:w-[70%] w-[90%]">
          <motion.h1
            className="text-[#254354] text-[24px] sm:text-3xl lg:text-[48px] font-semibold mt-4  text-center leading-[59.04px] "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Buy Billboards on Audience Impressions.
            <br /> No Fixed Rental.{" "}
          </motion.h1>
          <motion.p
            className="text-[#667D8C] text-sm sm:text-base lg:text-[20px] mt-4 text-center  leading-[30px] tracking-[-0.02em]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            PROOH OOH AD-NETWORK CONVERTS CONVENTIONAL MEDIA BUYS INTO AUDIENCE
            BUYS MAKING OOH MEDIA <br /> MORE ACCOUNTABLE & AFFORDABLE.
          </motion.p>

          {/* Features Section */}
          <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-16 gap-6">
            {marketPageData1.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col justify-center items-center shadow-xl rounded-lg p-6 sm:p-8 lg:p-[41px] h-auto transform transition-transform duration-300 hover:scale-105 hover:border-[#129BFF] hover:border-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  className={
                    feature?.isImage
                      ? ""
                      : "h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center"
                  }
                >
                  {feature.icon}
                </div>
                <h1 className="text-[#254354] text-lg sm:text-xl lg:text-[24px] font-semibold text-center mt-4 leading-[29px] tracking-tight">
                  {feature.title}
                </h1>
                <p className="text-[#667D8C] text-sm sm:text-base text-center leading-[26px] tracking-tight mt-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* How It Works Section */}
          <motion.h1
            className="text-[#254354] text-[24px] sm:text-3xl lg:text-[40px] font-bold mt-8  text-center leading-[49.2px] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            How IT Works?
          </motion.h1>
          <motion.p
            className="text-[#667D8C] text-sm sm:text-base lg:text-[16px] mt-2 text-center leading-[24.2px] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            A single-view dashboard for full accountability, data-driven
            audience planning, transparent supplier-direct pricing, rapid
            OOH/DOOH ad placement, and payment based on validated impressions.
          </motion.p>

          {/* Sections with Images */}
          <div className="mt-8">
            {marketPageData2.map((section, index) => (
              <motion.div
                key={index}
                className={`flex flex-col lg:flex-row justify-between items-center gap-8 ${
                  index % 2 != 0 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <motion.img
                  src={section.img}
                  alt={`section${index}`}
                  className="w-full lg:w-[50%] rounded-md object-cover"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="flex flex-col w-full lg:w-[50%]">
                  <h1 className="text-[#254354] text-lg sm:text-xl lg:text-[24px] font-bold lg:w-[60%]  leading-[39.36px] tracking-tight">
                    {section.title}
                  </h1>
                  <p className="text-[#667D8C] text-sm sm:text-base lg:text-[16px] mt-4 leading-[24px] tracking-[-0.02em]">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <CreateCampaignOption />
      <PageFooter />
    </div>
  );
};
