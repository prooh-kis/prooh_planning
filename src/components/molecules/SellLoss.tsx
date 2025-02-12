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
    className={`border-2 p-4 w-[766px] rounded-[12px] ${
      currentIndex == index ? `border-[#4281F6]` : ``
    }`}
  >
    <div className="flex justify-between items-center ">
      <div className="flex gap-4 items-center">
        <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
        <motion.h1
          className="text-[#254354] text-[16px] sm:text-[20px] lg:text-[24px] font-semibold text-center leading-[36px] tracking-tight "
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.h1>
      </div>
      <div
        className={`h-[40px] w-[40px] rounded-full  flex items-center justify-center ${
          currentIndex == index ? `bg-[#4281F6] text-[#FFFFFF]` : `bg-gray-200`
        }`}
        onClick={() => setCurrentIndex(index)}
      >
        {currentIndex == index ? (
          <i className="fi fi-br-angle-up text-[20px]"></i>
        ) : (
          <i className="fi fi-br-angle-down text-[20px]"></i>
        )}
      </div>
    </div>
    {currentIndex == index && descriptions && (
      <motion.h2
        className="text-[#667D8C] text-[12px] sm:text-[14px] lg:text-[16px] font-normal leading-[24px] tracking-[-0.02em] mt-2 "
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {descriptions}
      </motion.h2>
    )}
    {currentIndex == index && data?.length > 0 && (
      <div className="mt-2 px-4">
        {data.map((suggestion: any, index: number) => (
          <div
            className="flex gap-4 text-[#667D8C] text-[12px] items-center"
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
    <div className="w-full h-hull">
      <motion.h1
        className="text-[#254354] text-[24px] sm:text-3xl lg:text-[48px] font-semibold mt-4  text-center leading-[59.04px] tracking-tight "
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Do you Know about your sales loss?
      </motion.h1>
      <motion.p
        className="text-[#667D8C] text-[12px] sm:text-[14px] lg:text-[16px] mt-4 text-center  leading-[30px] tracking-[-0.02em]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        OOH media owners publish a Monthly Card Rate for each site but also
        maintain a Minimum Monthly Operating Rental (Floor Price).
      </motion.p>
      <div className="mt-8 flex justify-between">
        <img src={PaymentInfo} alt="fff" className="h-[454px] w-[454px]" />
        <div className="flex flex-col gap-8">
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
