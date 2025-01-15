import React from "react";
import { PageFooter } from "../../components/PageFooter";
import { CreateCampaignOption } from "../../components/index";
import {
  mediaOwnerPageData1,
  mediaOwnerPageData2,
} from "../../data/websiteHardCodedData";
import { motion } from "framer-motion";

export const MediaOwnerPage: React.FC = () => {
  return (
    <div className="w-screen h-full pb-0">
      {/* Hero Section */}
      <div
        className="flex justify-center items-center bg-[#129BFF] h-[270px] sm:h-[400px] lg:h-[500px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://media.gettyimages.com/id/1583336780/photo/wide-angle-shot-if-times-square-with-bright-led-displays-on-a-sunny-day-new-york-city-usa.jpg?s=612x612&w=0&k=20&c=tXoj1QeAQoLEZMQwn7TVcXVh-8C64bm_er7gF5C-G2g=)`,
        }}
      >
        <motion.div
          className="flex flex-col justify-center text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-[#FFFFFF] text-4xl sm:text-5xl lg:text-[60px] font-bold">
            Media Owner
          </h1>
          <h1 className="text-[#FFFFFF] text-xl sm:text-2xl lg:text-[30px] font-bold mt-2">
            Because Reach Matters
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-4 sm:m-8 px-4">
        <div className="flex flex-col w-full lg:w-[70%] w-[90%]">
          <motion.h1
            className="text-[#254354] text-2xl sm:text-3xl lg:text-[40px] font-bold mt-4 self-start"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Unlock New Revenue Streams. Optimize Your Occupancy.
          </motion.h1>
          <motion.h2
            className="text-[#254354] text-sm sm:text-base lg:text-[20px] mt-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Prooh ooh ad-network converts conventional media buys into audience
            buys making ooh media more accountable & affordable.
          </motion.h2>

          {/* Features Section */}
          <div className="flex flex-col lg:flex-row justify-between mt-4 lg:mt-8 gap-6">
            {mediaOwnerPageData1.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-6 sm:p-8 lg:p-[41px] h-auto transform transition-transform duration-300 hover:scale-105 hover:border-[#129BFF] hover:border-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  className={
                    feature?.isImage
                      ? ""
                      : "h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center p-2"
                  }
                >
                  {feature.icon}
                </div>
                <h1 className="text-[#254354] text-lg sm:text-xl lg:text-2xl font-bold text-center mt-4">
                  {feature.title}
                </h1>
                <p className="text-[#0E212E] text-sm sm:text-base text-center mt-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Onboarding Section */}
          <motion.div
            className="mt-8 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col gap-4 ">
              <h1 className="text-[#254354] text-[16px] sm:text-[20px] lg:text-[24px] font-bold ">
                PARTNER WITH US:
              </h1>
              <h1 className="text-[#254354] text-[22px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold ">
                Process Of On-Boarding A Media Owner
              </h1>
              <h1 className="text-[#0E212E] text-[14px] sm:text-[16px] leading-relaxed text-start">
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
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
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
                  <h1 className="text-[#254354] text-lg sm:text-xl lg:text-2xl font-bold">
                    {section.title}
                  </h1>
                  <p className="text-[#0E212E] text-sm sm:text-base lg:text-[16px] mt-4">
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
