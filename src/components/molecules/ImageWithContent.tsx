import React from "react";
import { motion } from "framer-motion";

export const ImageWithContent = ({ index, section }: any) => {
  return (
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
        <h1 className="text-[#254354] text-lg sm:text-xl lg:text-[24px] font-bold  leading-[32px] tracking-tight">
          {section.title}
        </h1>
        <p className="text-[#667D8C] text-sm sm:text-base lg:text-[16px] mt-4 leading-[24px] tracking-[-0.02em]">
          {section.content}
        </p>
      </div>
    </motion.div>
  );
};
