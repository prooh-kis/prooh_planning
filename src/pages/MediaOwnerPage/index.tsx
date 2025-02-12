import React from "react";
import { PageFooter } from "../../components/PageFooter";
import { CreateCampaignOption } from "../../components/index";
import {
  mediaOwnerPageData1,
  mediaOwnerPageData2,
} from "../../data/websiteHardCodedData";
import { motion } from "framer-motion";
import { GetOnboardOption } from "../../components/molecules/GetOnboardOption";
import { MediaOwnerGetStarted } from "../../components/molecules/MediaOwnerGetStarted";
import { SellLoss } from "../../components/molecules/SellLoss";

export const MediaOwnerPage: React.FC = () => {
  return (
    <div className="w-screen h-full pb-0">
      {/* Hero Section */}
      <div className="px-20 ">
        <MediaOwnerGetStarted />
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-4 sm:m-8 px-4">
        <div className="flex flex-col w-full lg:w-[70%] w-[90%]">
          <motion.h1
            className="text-[#254354] text-[24px] sm:text-3xl lg:text-[48px] font-semibold mt-4  text-center leading-[59.04px] "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Unlock New Revenue Streams.
            <br /> Optimize Your Occupancy.
          </motion.h1>
          <motion.p
            className="text-[#667D8C] text-sm sm:text-base lg:text-[20px] mt-4 text-center  leading-[30px] tracking-[-0.02em]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            PROOH OOH AD-NETWORK CONVERTS CONVENTIONAL MEDIA BUYS INTO AUDIENCE
            BUYS MAKING OOH MEDIA MORE ACCOUNTABLE & AFFORDABLE.
          </motion.p>

          {/* Features Section */}
          <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-16 gap-6">
            {mediaOwnerPageData1.map((feature, index) => (
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

          {/* Onboarding Section */}
          <motion.div
            className="mt-16 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col gap-4 ">
              <h1 className="text-[#667D8C] text-[16px] sm:text-[20px] lg:text-[20px] font-normal text-center leading-[24.6px] tracking-[0.09em]">
                PARTNER WITH US:
              </h1>
              <h1 className="text-[#254354] text-[22px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold text-center leading-[49px] tracking-tight">
                Process Of On-Boarding A Media Owner
              </h1>
              <h1 className="text-[#667D8C] text-[14px] sm:text-[16px] leading-relaxed text-center leading-[24px] tracking-[-0.02em] ">
                Our industry-leading ad-network platform helps media owners
                unlock the full value of their media sites through automation,
                business optimization, and support for programmatic transactions
                with complete transparency in terms of client-direct pricing and
                validation of actual impressions delivered.
              </h1>
            </div>
          </motion.div>

          {/* Sections with Images */}
          <div className="mt-8">
            {mediaOwnerPageData2.map((section, index) => (
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
      <div className="mt-16 px-20">
        <SellLoss />
      </div>
      <GetOnboardOption />
      <PageFooter />
    </div>
  );
};
