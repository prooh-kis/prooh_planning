import React from "react";

export const FindUsOnGoogle = ({
  title = "Find Us On Google Map",
  description = "Our platform helps your business in managing expenses. These are some examples of how our platform provides support for expense management.",
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d701.8275189241946!2d77.13020842924387!3d28.436007404176013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f63a408f755%3A0x7ae950f99dce8a40!2sParas%20Trade%20Centre!5e0!3m2!1sen!2sin!4v1677944554176!5m2!1sen!2sin",
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 font-custom pt-16 px-12 sm:px-8 lg:px-16">
      <div className="col-span-4">
        <h1 className="text-start font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
          Find Us On<br/>Google <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">Map!</span> 
        </h1>
        <p className="text-[20px] py-8 text-[#2D5087]">Our Platform helps your business in managing <br/>expenses. These are some</p>
      </div>
      <div className="col-span-8 flex justify-center w-full max-w-4xl">
        <div className="w-full h-[360px]">
          <iframe
            src={mapSrc}
            className="w-full h-full rounded-[12px]"
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
