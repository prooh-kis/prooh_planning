import { CircleImageCarousel } from "../../components/molecules/CircleImageCrousel";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { dataHeroTabs, dataHeroUsersImages } from "../../data/LandingPageData";
import React, { useState } from "react";

export const MeetOurDataHero = () => {
  const [currentMeetDataHeroTab, setCurrentMeetDataHeroTab] =
    useState<any>("1");
  return (
    <div className="flex justify-center lg:pt-[720px] pt-16px pb-20 w-full">
      <div className="relative flex flex-col items-center">
        <h1 className="lg:text-[48px] text-[40px] font-semibold">
          Meet Our Data Hero
        </h1>
        <div className="border-b">
          <TabWithoutIcon
            tabData={dataHeroTabs}
            currentTab={currentMeetDataHeroTab}
            setCurrentTab={setCurrentMeetDataHeroTab}
          />
        </div>
        <div className="py-4">
          <CircleImageCarousel images={dataHeroUsersImages} />
          <div className="flex items-center justify-center py-4">
            <button className="text-[#FFFFFF] text-[20px] font-bold h-[50pz] w-[153px] bg-[#129BFF] rounded-[109px] px-[31px] py-[7px] mt-8 hover:bg-white hover:text-[#129BFF] border border-2 hover:border-[#129BFF]">
              Participate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
