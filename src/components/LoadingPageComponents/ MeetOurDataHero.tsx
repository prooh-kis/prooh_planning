import React, { useState } from "react";
import { CircleImageCarousel } from "../../components/molecules/CircleImageCrousel";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { dataHeroTabs, heroData } from "../../data/LandingPageData";
import { useNavigate } from "react-router-dom";
import { dmpURL } from "../../constants/urlConstant";

export const MeetOurDataHero = () => {
  const navigate = useNavigate();
  const [currentMeetDataHeroTab, setCurrentMeetDataHeroTab] = useState("1");

  // Event handler for the Participate button
  const handleParticipateClick = () => {
    alert("Participation action triggered!");
    window.location.replace(dmpURL);
  };

  return (
    <section className="flex justify-center pt-4 pb-20 w-full">
      <div className="flex flex-col items-center w-full max-w-screen-lg">
        {/* Title */}
        <h1 className="text-[32px] lg:text-[48px] font-semibold text-center mb-4">
          Meet Our Data Hero
        </h1>

        {/* Tabs Section */}
        <div className="border-b mb-4">
          <TabWithoutIcon
            tabData={dataHeroTabs}
            currentTab={currentMeetDataHeroTab}
            setCurrentTab={setCurrentMeetDataHeroTab}
          />
        </div>

        {/* Carousel and Button */}
        <div className="py-4 w-full flex flex-col items-center">
          {/* Circle Image Carousel */}
          <CircleImageCarousel heroData={heroData} />
          <div className="flex items-center justify-center py-4">
            {/* Participate Button */}
            <button
              className="text-[#FFFFFF] text-[20px] font-bold h-[50px] w-[153px] bg-[#129BFF] rounded-full px-6 py-2 mt-8 hover:bg-[#FFFFFF] hover:text-[#129BFF] border-2 border-transparent hover:border-[#129BFF] transition-all"
              onClick={handleParticipateClick}
            >
              Participate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
