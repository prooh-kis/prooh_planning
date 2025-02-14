import { RightSideArrowsImageCarousel } from "../../components/molecules/RightSideArrowsImageCrousel";
import { meetArchitects } from "../../data/LandingPageData";
import React, { useState } from "react";

export const ProohCreator = ({
  title = "Meet The Creators Behind Our Vision",
  description = "Meet the passionate leaders driving our mission. Their expertise and commitment to excellence propel us forward, creating lasting impact and inspiring success.",
  images = meetArchitects,
}) => {
  const [teamMembers, setTeamMembers] = useState<any>(meetArchitects);
  const [currentIndex, setCurrentIndex] = useState(0);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= teamMembers.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? teamMembers.length - 4 : prevIndex - 1
    );
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Team Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <i className="fi fi-sr-heart w-5 h-5 text-primaryButton"></i>
            <span className="text-gray-600">our team</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet The Creators Behind Our Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the passionate leaders driving our mission. Their expertise and commitment to excellence propel us forward,
            creating lasting impact and inspiring success
          </p>

          {/* Team Filter Buttons */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full">All(98)</button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              Management
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              Tech Team
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              Sales Team
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              Operations Team
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              Finance Team
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              Data Heroes
            </button>
          </div>
        </div>

        {/* Team Members Carousel */}
        <div className="relative">
          <button 
            id=""
            title="previous"
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50"
          >
            <i className="fi fi-br-angle-left"></i>
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            >
              {teamMembers.map((member: any) => (
                <div 
                  key={member.id}
                  className="min-w-[calc(25%-1.25rem)] animate-fade-in"
                >
                  <div className="relative group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    {member.linkedin && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-blue-500 p-2 rounded-full">
                          <i className="fi fi-brands-linkedin"></i>
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                  {member.location && (
                    <p className="text-gray-600">{member.location}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button 
            id=""
            title="next"
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50"
          >
            <i className="fi fi-br-angle-right"></i>
          </button>
        </div>

        {/* Join Our Team Section */}
        <div className="mt-24 bg-[#129BFF] rounded-2xl p-6 text-center flex justify-between items-center">
          <div className="">
            <h2 className="text-4xl font-custom font-bold text-white mb-4 text-start">Join Our Team</h2>
            <p className="text-white font-custom mb-8 text-start">
              Be part of a dynamic team that values creativity, collaboration, and growth. Explore opportunities with us today!
            </p>
          </div>

          <button
            id=""
            type="button"
            className="bg-white text-[#129BFF] px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
    // <div className="w-full px-6 md:px-16">
    //   <div className="p-4 sm:p-8">
    //     <div className="flex gap-2 items-center">
    //       <i className="fi fi-sr-heart text-[12px] sm:text-[14px] text-primaryButton"></i>
    //       <h2 className="text-[12px] sm:text-[14px] font-medium text-primaryButton">
    //         Our Team
    //       </h2>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
    //       <div className="md:col-span-5">
    //         <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-semibold text-[#0E212E] leading-tight tracking-tight">
    //           {title}
    //         </h2>
    //       </div>
    //       <div className="md:col-span-7">
    //         <p className="text-[14px] sm:text-[16px] lg:text-[20px] text-[#254354] leading-relaxed">
    //           {description}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="mt-8">
    //       <RightSideArrowsImageCarousel images={images} />
    //     </div>
    //   </div>
    // </div>
  );
};
