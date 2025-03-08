import React from "react";
import { PageFooter } from "../../../components/PageFooter";
import {
  mediaOwnerPageData1,
  mediaOwnerPageData2,
} from "../../../data/websiteHardCodedData";
import { motion } from "framer-motion";
import { GetOnboardOption } from "../../../components/molecules/GetOnboardOption";
import { MediaOwnerGetStarted } from "../../../components/molecules/MediaOwnerGetStarted";
import { SellLoss } from "../../../components/molecules/SellLoss";
import { SmallChips } from "../../../components/molecules/SmallChips";
import { ImageWithContent } from "../../../components/molecules/ImageWithContent";

export const MediaOwnerPage: React.FC = () => {
  return (
    <div className="w-screen h-full pt-4">
      {/* Hero Section */}
      <div className="px-4 sm:px-10 md:px-16 lg:px-20">
        <MediaOwnerGetStarted />
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-4 sm:mt-8 px-4">
        <div className="flex flex-col w-full lg:w-[70%] w-[90%]">
          {/* Hero Title */}
          <motion.h1
            className="text-[#254354] text-[24px] sm:text-3xl lg:text-[48px] font-semibold mt-4 text-center 
                       leading-[32px] sm:leading-[44px] lg:leading-[59.04px] tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Unlock New Revenue Streams.
            <br /> Optimize Your Occupancy.
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            className="text-[#667D8C] text-sm sm:text-base lg:text-[20px] mt-4 text-center 
                       leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-tight sm:tracking-normal"
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
              <SmallChips section={feature} index={index} key={index} />
            ))}
          </div>

          {/* Onboarding Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col gap-4">
              <h1
                className="text-[#667D8C] text-[16px] sm:text-[20px] lg:text-[20px] font-normal text-center 
                            leading-[22px] sm:leading-[24px] lg:leading-[24.6px] tracking-[0.05em] sm:tracking-[0.07em] lg:tracking-[0.09em]"
              >
                PARTNER WITH US:
              </h1>
              <h1
                className="text-[#254354] text-[22px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold text-center 
                            leading-[30px] sm:leading-[40px] lg:leading-[49px] tracking-tight"
              >
                Process Of On-Boarding A Media Owner
              </h1>
              <h1
                className="text-[#667D8C] text-[14px] sm:text-[16px] text-center 
                            leading-[22px] sm:leading-[24px] lg:leading-[26px] tracking-[-0.02em]"
              >
                Our industry-leading ad-network platform helps media owners
                unlock the full value of their media sites through automation,
                business optimization, and support for programmatic transactions
                with complete transparency in terms of client-direct pricing and
                validation of actual impressions delivered.
              </h1>
            </div>
          </motion.div>

          {/* Sections with Images */}
          <div className="mt-8 flex flex-col gap-8">
            {mediaOwnerPageData2.map((section, index) => (
              <ImageWithContent section={section} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Sell Loss Section */}
      <div className="mt-16 px-4 sm:px-10 md:px-16 lg:px-20">
        <SellLoss />
      </div>

      {/* Get Onboard CTA */}
      <GetOnboardOption />

      {/* Footer */}
      <PageFooter />
    </div>
  );
};
