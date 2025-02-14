import React from "react";

export const FindUsOnGoogle = ({
  title = "Find Us On Google Map",
  description = "Our platform helps your business in managing expenses. These are some examples of how our platform provides support for expense management.",
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d701.8275189241946!2d77.13020842924387!3d28.436007404176013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f63a408f755%3A0x7ae950f99dce8a40!2sParas%20Trade%20Centre!5e0!3m2!1sen!2sin!4v1677944554176!5m2!1sen!2sin",
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4 w-full">
      <div className="text-center max-w-[90%] md:max-w-[80%] lg:max-w-[677px]">
        <h1 className="font-custom text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-[#0E212E] leading-tight lg:leading-[64px] tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-[14px] sm:text-[16px] lg:text-[16px] text-[#254354] leading-relaxed lg:leading-[24px] tracking-[-0.02em]">
          {description}
        </p>
      </div>
      <div className="flex justify-center mt-8 w-full max-w-4xl">
        <div className="w-full h-[466px]">
          <iframe
            src={mapSrc}
            className="w-full h-full rounded-[36px]"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
