import React from "react";
import { PageFooter } from "../../components/PageFooter";
import {
  marketPageData1,
  marketPageData2,
} from "../../data/websiteHardCodedData";
import { CreateCampaignOption } from "../../components/index";
import { motion } from "framer-motion";
import { MarketGetStarted } from "../../components/molecules/MarketGetStarted";
import { SmallChips } from "../../components/molecules/SmallChips";
import { ImageWithContent } from "../../components/molecules/ImageWithContent";

export const MarketersPage: React.FC = () => {
  return (
    <div className="w-screen h-full pt-8">
      {/* Hero Section */}
      <div className="px-4 sm:px-10 md:px-16 lg:px-20">
        <MarketGetStarted />
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-8 sm:mt-16 px-4">
        <div className="flex flex-col w-full justify-between lg:w-[70%] w-[90%]">
          {/* Hero Title */}
          <motion.h1
            className="text-[#254354] text-[24px] sm:text-3xl lg:text-[48px] font-semibold mt-4 text-center 
                       leading-[32px] sm:leading-[44px] lg:leading-[59.04px] tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Buy Billboards on Audience Impressions.
            <br /> No Fixed Rental.
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
            BUYS MAKING OOH MEDIA <br /> MORE ACCOUNTABLE & AFFORDABLE.
          </motion.p>

          {/* Features Section */}
          <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-16 gap-6">
            {marketPageData1.map((feature, index) => (
              <SmallChips section={feature} index={index} key={index} />
            ))}
          </div>

          {/* How It Works Section */}
          <motion.h1
            className="text-[#254354] text-[24px] sm:text-3xl lg:text-[40px] font-bold mt-16 text-center 
                       leading-[32px] sm:leading-[40px] lg:leading-[49.2px] tracking-[-0.02em] sm:tracking-[-0.03em] lg:tracking-[-0.04em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            How IT Works?
          </motion.h1>

          <motion.p
            className="text-[#667D8C] text-sm sm:text-base lg:text-[16px] mt-2 text-center 
                       leading-[20px] sm:leading-[22px] lg:leading-[24.2px] tracking-tight sm:tracking-normal lg:tracking-[0.02em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            A single-view dashboard for full accountability, data-driven
            audience planning, transparent supplier-direct pricing, rapid
            OOH/DOOH ad placement, and payment based on validated impressions.
          </motion.p>

          {/* Sections with Images */}
          <div className="mt-8 flex flex-col gap-8">
            {marketPageData2.map((section, index) => (
              <ImageWithContent section={section} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CreateCampaignOption />

      {/* Footer */}
      <PageFooter />
    </div>
  );
};
