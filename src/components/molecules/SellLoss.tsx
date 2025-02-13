import React, { useState } from "react";
import { motion } from "framer-motion";
import { PaymentInfo } from "../../assets";
import { SellLossData } from "../../data/websiteHardCodedData";

const SubPart = ({
  title,
  descriptions,
  data,
  currentIndex,
  index,
  setCurrentIndex,
}: any) => (
  <div
    className={`border-2 p-4 w-full sm:w-[766px] rounded-[12px] ${
      currentIndex === index ? `border-[#4281F6]` : ``
    }`}
  >
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
        <motion.h1
          className="text-[#254354] text-sm sm:text-[20px] lg:text-[24px] font-semibold 
            leading-[24px] sm:leading-[30px] lg:leading-[36px] 
            tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.h1>
      </div>
      <div
        className={`h-[40px] w-[40px] rounded-full flex items-center justify-center 
          ${
            currentIndex === index
              ? `bg-[#4281F6] text-[#FFFFFF]`
              : `bg-gray-200`
          }`}
        onClick={() => setCurrentIndex(index)}
      >
        {currentIndex === index ? (
          <i className="fi fi-br-angle-up text-[20px]"></i>
        ) : (
          <i className="fi fi-br-angle-down text-[20px]"></i>
        )}
      </div>
    </div>
    {currentIndex === index && descriptions && (
      <motion.h2
        className="text-[#667D8C] text-xs sm:text-sm lg:text-[16px] font-normal 
          leading-[20px] sm:leading-[24px] lg:leading-[28px] 
          tracking-[-0.01em] sm:tracking-[-0.015em] lg:tracking-[-0.02em] mt-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {descriptions}
      </motion.h2>
    )}
    {currentIndex === index && data?.length > 0 && (
      <div className="mt-2 px-4">
        {data.map((suggestion: any, index: number) => (
          <div
            className="flex gap-4 text-[#667D8C] text-xs sm:text-sm items-center"
            key={index}
          >
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              {suggestion}
            </motion.h2>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const SellLoss = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <div className="w-full">
      <motion.h1
        className="text-[#254354] text-lg sm:text-2xl lg:text-[48px] font-semibold 
          text-center mt-4 
          leading-[36px] sm:leading-[48px] lg:leading-[59.04px] 
          tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Do you know about your sales loss?
      </motion.h1>
      <motion.p
        className="text-[#667D8C] text-xs sm:text-sm lg:text-[16px] mt-4 text-center 
          leading-[20px] sm:leading-[26px] lg:leading-[30px] 
          tracking-[-0.01em] sm:tracking-[-0.015em] lg:tracking-[-0.02em]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        OOH media owners publish a Monthly Card Rate for each site but also
        maintain a Minimum Monthly Operating Rental (Floor Price).
      </motion.p>
      <div className="mt-8 flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between">
        {/* Hide Image on Mobile */}
        <div className="hidden sm:block w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto sm:h-[454px]">
          <img
            src={PaymentInfo}
            alt="Payment Info"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-6 w-full sm:w-auto">
          {SellLossData?.map((d: any, index: number) => (
            <SubPart
              key={index}
              index={index}
              title={d.title}
              descriptions={d.descriptions}
              data={d.data}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
