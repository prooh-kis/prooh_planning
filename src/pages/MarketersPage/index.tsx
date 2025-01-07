import React from "react";
import {
  Reward,
  image10,
  image11,
  image12,
  image4,
  image13,
  image14,
  image15,
  image9,
} from "../../assets/index";
import { PageFooter } from "../../components/PageFooter";
import {
  marketPageData1,
  marketPageData2,
} from "../../data/websiteHardCodedData";
import { CreateCampaignOption } from "../../components/index";

export const MarketersPage: React.FC = () => {
  return (
    <div className="w-screen h-full pb-0">
      {/* Hero Section */}
      <div
        className="flex justify-center items-center bg-[#129BFF] h-[270px] sm:h-[400px] lg:h-[500px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://media.istockphoto.com/id/1394347337/photo/black-woman-typing-and-browsing-on-a-laptop-in-an-office-alone.jpg?s=612x612&w=0&k=20&c=U_LbboyyeBx3ghy06DNyVWqFpCNujczdfIgYWdz7haI=)`,
        }}
      >
        <div className="flex flex-col justify-center text-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-[60px] font-bold">
            MARKETERS
          </h1>
          <h1 className="text-white text-xl sm:text-2xl lg:text-[30px] font-bold mt-2">
            Because Reach Matters
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-8 sm:mt-16 px-4">
        <div className="flex flex-col w-full lg:w-[70%] w-[90%]">
          <h1 className="text-[#254354] text-2xl sm:text-3xl lg:text-[40px] font-bold mt-4 self-start">
            Buy Billboards on Audience Impressions. No Fixed Rental.
          </h1>
          <p className="text-[#254354] text-sm sm:text-base lg:text-[20px] mt-4">
            Prooh aggregates anonymized, opt-in, high-quality app-sourced SDK
            location data...
          </p>

          {/* Features Section */}
          <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-16 gap-6">
            {marketPageData1.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-6 sm:p-8 lg:p-[41px] h-auto"
              >
                <div
                  className={
                    feature?.isImage
                      ? ""
                      : "h-[71px] w-[71px] bg-[#129BFF] rounded-full flex justify-center items-center"
                  }
                >
                  {feature.icon}
                </div>
                <h1 className="text-[#254354] text-lg sm:text-xl lg:text-2xl font-bold text-center mt-4">
                  {feature.title}
                </h1>
                <p className="text-[#0E212E] text-sm sm:text-base text-center mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <h1 className="text-[#254354] text-2xl sm:text-3xl lg:text-[40px] font-bold mt-8">
            How IT Works?
          </h1>
          <p className="text-[#0E212E] text-sm sm:text-base lg:text-[16px] mt-2">
            Complete Accountability from a single view dashboard...
          </p>

          {/* Sections with Images */}
          <div className="flex flex-col gap-16 mt-8">
            {marketPageData2.map((section, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row justify-between items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <img
                  src={section.img}
                  alt={`section${index}`}
                  className="w-full lg:w-[50%] rounded-md object-cover"
                />
                <div className="flex flex-col w-full lg:w-[50%]">
                  <h1 className="text-[#254354] text-lg sm:text-xl lg:text-2xl font-bold">
                    {section.title}
                  </h1>
                  <p className="text-[#0E212E] text-sm sm:text-base lg:text-[16px] mt-4">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreateCampaignOption />
      <PageFooter />
    </div>
  );
};
