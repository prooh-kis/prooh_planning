import ButtonInput from "../../components/atoms/ButtonInput";
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
  const [currentTab, setCurrentTab] = useState("Management");
  const [hoverImage, setHoverImage] = useState(-1);
  const teamTab = [
    "Management",
    "Tech Team",
    "Sales Team",
    "Operations Team",
    "Finance Team",
    "Data Heroes",
  ]
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
    <div className="py-16 px-12 sm:px-8 lg:px-16 mt-24 lg:mt-0 font-custom">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4 pt-8">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">OUR TEAM</p>
          <h1 className="py-4 text-start font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">Behind The <br/><span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">Visioners</span></h1>
          <p className="text-[20px] py-4 text-[#2D5087]">Our platform helps your business in <br /> managing expenses. These are some of <br/> the reasons why you</p>
          <div className="flex justify-center items-center w-1/3 py-4">
            <ButtonInput
              // icon={<i className="fi fi-sr-megaphone flex items-center" />}
              rounded="small"
              fullWidth={true}
            >
              Join Our Team
            </ButtonInput>
          </div>
        </div>
        <div className="col-span-8 w-full">
          <div className="mt-8 mb-4 w-full flex justify-around items-center cursor-pointer">
            {teamTab?.map((tab: any, i: any) => (
              <div
                key={i}
                // type="button"
                onClick={() => {
                  setCurrentTab(tab);
                  // setCurrentAdvertiserTab("0");
                  // setCurrentMediaOwnerTab("0");
                  // setCurrentDataHeroTab("0");
                }}
                className={`${
                  tab === currentTab
                    ? "bg-primaryButton text-white font-semibold"
                    : "bg-[#F6F6F6] text-gray-700"
                } truncate w-full py-2 px-8 ${i == 0 ? "clip-trapezium-right" : i == teamTab.length-1 ? "clip-trapezium-left" : "clip-trapezium-both"}`}
              >
                <span className="text-[12px]">{tab}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-4">
            {teamMembers.map((member: any) => (
              <div
                key={member.id}
                className="col-span-4 shadow-lg hover:shadow-xl transition-shadow duration-300 group flip-card w-full aspect-[1] overflow-hidden"
              >
                <div className="relative flip-card-inner w-full h-full">
                  <div className="flip-card-front rounded-[2px] h-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="object-cover h-full"
                    />
                  </div>
                  
                  <div className="p-8 flip-card-back bg-[#129BFF] flex flex-col items-start justify-center rounded-lg overflow-hidden">
                    <h3 className="my-4 text-[24px] font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-white text-[16px]">{member.role}</p>
                    {member.location && (
                      <p className="text-white text-[16px]">{member.location}</p>
                    )}
                    <div className="h-8 w-8 flex items-center justify-center bg-white rounded-full my-4">
                      <i className="fi fi-brands-linkedin flex items-center justify-center text-[#129BFF]"></i>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
