import React from "react";
import { motion } from "framer-motion";

export const SmallChips = ({ section , index }: any) => {
  return (
    <motion.div
      key={index}
      className="flex flex-col justify-center items-center shadow-xl  rounded-[23px] p-6 sm:p-8 lg:p-[41px] h-auto transform transition-transform duration-300 hover:scale-105 hover:border-[#129BFF] hover:border-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <div
        className={
          section?.isImage
            ? ""
            : "h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center"
        }
      >
        {section.icon}
      </div>
      <h1 className="text-[#254354] text-lg sm:text-xl lg:text-[24px] font-semibold text-center mt-4 leading-[29px] tracking-tight">
        {section.title}
      </h1>
      <p className="text-[#667D8C] text-sm sm:text-base text-center leading-[26px] tracking-tight mt-2">
        {section.description}
      </p>
    </motion.div>
  );
};
