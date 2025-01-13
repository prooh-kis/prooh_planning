import React, { useEffect, useRef, useState } from "react";

export const PlanYourCampaign = ({ }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current item index
  const scrollRef = useRef<HTMLDivElement>(null); // Ref for the scrollable middle column
  const data = [
    {
      title: "We Sell OOH & PDOOH on Impressions Only. No Fixed Rental.",
      description:
        "PROOH’s Media Planning Tool uses Geospatial Data, POI Data, Govt. Traffic Data amongst other Data sets to determine Total Count of people at specific locations and",
    },
    {
      title:
        "We Minimize Ad-Spend Wastage By Targeting Cohorts By Location And Time Of The Day",
      description:
        "On-the-Go audiences tend to follow daily routines faithfully. The collection, processing and analysis of SDK data enables attribution of a mobile device ID on POI’s and",
    },
    {
      title: "We Bring Advanced Audience Measurement Through Iot Devices",
      description:
        "Prooh’s Advanced Audience Measurement Platform is composed of Computer Vision and uses a HD IP Camera at the site level for recording live scene analysis pointing at the intended direction capturing data within a defined",
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop; // How far scrolled
      const containerHeight = scrollRef.current.offsetHeight; // Height of scroll container
      const totalHeight = scrollRef.current.scrollHeight; // Total scrollable height

      // Item height based on total scrollable height divided by the number of items
      const itemHeight = totalHeight / data.length;

      // Calculate the index of the currently visible item
      const index = Math.min(
        Math.floor(scrollTop / itemHeight),
        data.length - 1
      );

      // Update current index if it has changed
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };


  return (
    <div className="lg:px-4 px-0 w-full">
      {/* so in mobile and hide in tablet and laptop */}
      <div className="block lg:hidden">
        <section className="relative px-4 w-full">
          {/* Header Section */}
          <div className="relative z-10 mx-auto max-w-6xl bg-primaryButton text-white rounded-lg px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-start sm:items-center gap-4">
              <i
                className="fi fi-sr-time-fast text-2xl sm:text-3xl"
                aria-label="Time icon"
              ></i>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Plan Your Campaign Now
                </h1>
                <p className="text-sm sm:text-base mt-2">
                  <span className="font-bold">+40</span> Advertisers Have
                  Already Planned
                </p>
              </div>
            </div>
            <button
              className="mt-4 sm:mt-0 text-[#183246]  text-lg sm:text-xl font-bold w-full sm:w-auto bg-white rounded-full px-6 py-3 hover:bg-gray-100 transition-all"
              onClick={() => alert("Request Demo clicked")}
            >
              Request Demo
            </button>
          </div>

          {/* Main Content Section */}
          <div className="mt-8 bg-gradient-to-b from-[#13202A] to-[#072E4A] rounded-lg py-8 px-4 sm:px-8 lg:px-16 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="sm:col-span-6 flex flex-col">
                <div className="flex items-center gap-2">
                  <i
                    className="fi fi-ss-sparkles"
                    aria-label="Sparkles icon"
                  ></i>
                  <h2 className="text-sm sm:text-base lg:text-lg uppercase">
                    What We Do
                  </h2>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
                  Simplify & Optimize Your Advertising
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mt-4">
                  Our platform helps your business manage expenses. Here are
                  some reasons why you should use our platform:
                </p>
                <button
                  className="mt-8 bg-[#129BFF] text-white text-base font-bold py-3 px-6 rounded-md hover:bg-white hover:text-[#129BFF] transition-all"
                  onClick={() => alert("Plan Now clicked")}
                >
                  Plan Now
                </button>
              </div>

              {/* Middle Divider */}
              <div className="hidden sm:block sm:col-span-1 flex justify-center items-center">
                <div className="w-2 h-full bg-[#1E3241] rounded-full">
                  <div className="w-full h-1/4 bg-primaryButton rounded-full"></div>
                </div>
              </div>

              {/* Right Column */}
              <div className="sm:col-span-5 flex flex-col">
                <div className="bg-[#1E3E53] rounded-lg p-6 w-16 h-16 flex items-center justify-center">
                  <i
                    className="fi fi-sr-display-chart-up text-xl sm:text-3xl"
                    aria-label="Chart icon"
                  ></i>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mt-8">
                  {data[currentIndex]?.title}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mt-4">
                  {data[currentIndex]?.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="hidden lg:block">
        <div className="relative ">
          <div className="relative z-10 mx-28 text-white bg-primaryButton rounded-[16px] px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <i className="fi fi-sr-time-fast text-[28px]"></i>
              <div>
                <h1 className="lg:text-[40px] text-[32px] font-bold tracking-[0.02em]">
                  Plan Your Campaign Now
                </h1>
                <div className="pb-2">
                  <p className="lg:text-[14px] text-[12px]">
                    <span className="font-bold">+40</span> Advertisers Have
                    Already Planned
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4">
              <button className="text-[#183246] text-[20px] font-bold h-[60pz] w-[181px] bg-white rounded-[72px] px-[3px] py-[20px] hover:bg-white hover:text-[#183246]">
                Request Demo
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-0 w-full bg-gradient-to-b from-[#13202A] to-[#072E4A] rounded-[26px]">
            <div className="grid grid-cols-12 text-white gap-2 mt-16">
              <div className="col-span-6 p-32">
                <div className="flex items-center gap-2">
                  <i className="fi fi-ss-sparkles"></i>
                  <h1 className="lg:text-[20px] text-[16px] tracking-[0.21em]">
                    WHAT WE DO
                  </h1>
                </div>
                <h1 className="lg:text-[48px] text-[40px]  font-bold mt-8 hover:bg-white hover:text-[#129BFF} w-[320px] leading-[48.96px] tracking-[-0.05em] h-[147px]">
                  Simplify & Optimize Your Advertising
                </h1>
                <p className="lg:text-[20px] text-[16px] text-[#88A8BF] text-wrap mt-8 hover:bg-white hover:text-[#129BFF} leading-[30px] tracking-[-0.02em]">
                  Our platform helps your business in managing expenses. These
                  are some of the reasons why you should use our platform in
                </p>
                <button className="text-[#FFFFFF] text-[20px] font-bold h-[50pz] w-[153px] bg-[#129BFF] rounded-[12px] px-[31px] py-[7px] mt-8 hover:bg-white hover:text-[#129BFF]">
                  Plan Now
                </button>
              </div>
              <div className="col-span-1 flex justify-center items-center p-10">
                <div className="rounded-full bg-[#1E3241] w-4 h-2/4 flex items-center flex-col justify-between py-4">
                  {currentIndex == 0 ? (
                    <div
                      onClick={() => setCurrentIndex(0)}
                      className="rounded-full bg-primaryButton w-full h-1/3"
                    ></div>
                  ) : (
                    <div
                      onClick={() => setCurrentIndex(0)}
                      className="bg-[#1E3241] w-full h-1/3"
                    ></div>
                  )}
                  {currentIndex == 1 ? (
                    <div
                      onClick={() => setCurrentIndex(1)}
                      className="rounded-full bg-primaryButton w-full h-1/3"
                    ></div>
                  ) : (
                    <div
                      onClick={() => setCurrentIndex(1)}
                      className="bg-[#1E3241] w-full h-1/3"
                    ></div>
                  )}
                  {currentIndex == 2 ? (
                    <div
                      onClick={() => setCurrentIndex(2)}
                      className="rounded-full bg-primaryButton w-full h-1/3"
                    ></div>
                  ) : (
                    <div
                      onClick={() => setCurrentIndex(2)}
                      className="bg-[#1E3241] w-full h-1/3"
                    ></div>
                  )}
                </div>
              </div>
              <div className="col-span-4 px-6 py-32 flex justify-start items-center w-full">
                <div className="">
                  <div className="flex justify-start">
                    <div className="bg-[#1E3E53] rounded-[20px] p-5 h-[86px] w-[86px] flex justify-center items-center">
                      <i className="fi fi-sr-display-chart-up text-[37px]"></i>
                    </div>
                  </div>

                  <h1 className="lg:text-[32px] text-[24px] text-[#FFFFFF]  font-[800] text-wrap mt-8 leading-[40.96px] tracking-[-0.04em] w-[541px] h-[82px]">
                    {data[currentIndex]?.title}
                  </h1>
                  <p className="lg:text-[20px] text-[14px] text-[#FFFFFF]  font-normal text-wrap mt-8 leading-[30px] tracking-[-0.02em]">
                    {data[currentIndex]?.description}
                    {/* <span className="text-primaryButton font-semibold underline">
                      See More
                    </span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
