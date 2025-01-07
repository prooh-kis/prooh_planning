import React from "react";
import { PageFooter } from "../../components/PageFooter";
import {
  marketPageData1,
  marketPageData2,
} from "../../data/websiteHardCodedData";
import { CreateCampaignOption } from "../../components/index";
import { motion } from "framer-motion";

export const MarketersPage: React.FC = () => {
  return (
    <div className="w-screen h-full pb-0">
      {/* Hero Section */}
      <div
        className="flex justify-center items-center bg-[#129BFF] h-[270px] sm:h-[400px] lg:h-[500px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://media.istockphoto.com/id/1394347337/photo/black-woman-typing-and-browsing-on-a-laptop-in-an-office-alone.jpg?s=612x612&w=0&k=20&c=U_LbboyyeBx3ghy06DNyVWqFpCNujczdfIgYWdz7haI=)`,
        }}
      >
        <motion.div
          className="flex flex-col justify-center text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white text-4xl sm:text-5xl lg:text-[60px] font-bold">
            MARKETERS
          </h1>
          <h1 className="text-white text-xl sm:text-2xl lg:text-[30px] font-bold mt-2">
            Because Reach Matters
          </h1>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-8 sm:mt-16 px-4">
        <div className="flex flex-col w-full lg:w-[70%] w-[90%]">
          <motion.h1
            className="text-[#254354] text-2xl sm:text-3xl lg:text-[40px] font-bold mt-4 self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Buy Billboards on Audience Impressions. No Fixed Rental.
          </motion.h1>
          <motion.p
            className="text-[#254354] text-sm sm:text-base lg:text-[20px] mt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Prooh aggregates anonymized, opt-in, high quality app-sourced sdk
            location data, and combines it with road traffic circulation data to
            determine in real-time, which locations attribute to highest target
            audience penetration and help select media units on visibility index
            parameters and applies the % of impressions delivered vs total
            impressions on the market operating price resulting into 100%
            accountability and assured savings.
          </motion.p>

          {/* Features Section */}
          <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-16 gap-6">
            {marketPageData1.map((feature, index) => (
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
                      : "h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center"
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

          {/* How It Works Section */}
          <motion.h1
            className="text-[#254354] text-2xl sm:text-3xl lg:text-[40px] font-bold mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            How IT Works?
          </motion.h1>
          <motion.p
            className="text-[#0E212E] text-sm sm:text-base lg:text-[16px] mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Complete Accountability from a single view dashboard backed by Data
            Driven Audience Planning and complete transparency in
            supplier-direct pricing adjusted with Audience Allocation , super
            fast Ad-placement in OOH and DOOH and final payment as per
            validation of actual impressions.
          </motion.p>

          {/* Sections with Images */}
          <div className="mt-8">
            {marketPageData2.map((section, index) => (
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
