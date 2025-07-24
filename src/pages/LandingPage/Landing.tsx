import { cmsURL, dmpURL, planningURL } from "../../constants/urlConstant";
import { Fly, Layer, Planner } from "../../assets";
import ButtonInput from "../../components/atoms/ButtonInput";
import React from "react";

export const Landing: React.FC<any> = ({}) => {
  const secondSection = [
    {
      name: "Audience Selection",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#129BFF]",
    },
    {
      name: "Cohort TimePlay",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#FF0707]",
    },
    {
      name: "Advance Filters",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#129BFF]",
    },
    {
      name: "Campaign Monitoring",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#FF960C]",
    },
    {
      name: "Inventory Management",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#4418A4]",
    },
    {
      name: "Sync Creatives In Loop",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>
      ),
      bg: "bg-[#B408BD]",
    },
  ];

  const thirdSection = [
    {
      color: "bg-[#129BFF]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-users-alt flex items-center justify-center"></i>
      ),
      heading: "Sell Media On Audience Impressions",
      subHeading:
        "Discover locations frequented most by your lookalike audiences and Accurately forecast total traffic and target audience impressions.",
    },
    {
      color: "bg-[#129BFF]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-digital-tachograph flex items-center justify-center"></i>
      ),
      heading: "Applies to both Static & PDOOH",
      subHeading:
        "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase  agreements media owners & through programmatic SSP integrations.",
    },
    {
      color: "bg-[#129BFF]",
      icon: (
        <i className="text-white text-[24px] fi fi-sr-loan flex items-center justify-center"></i>
      ),
      heading: "Assured Business with Quaterly MGs",
      subHeading:
        "Get supplier-direct pricing adjusted with validation of actual target audience impressions. If you’re quoted a better price elsewhere, we'll match it.",
    },
  ];

  const otherProducts = [
    {
      id: 1,
      icon: <img src={Layer} alt="layer" />,
      textColor: "text-[#438061]",
      bgColor: "bg-[#F0FFEB]",
      heading: "Layer",
      subHeading: "DATA MANAGEMENT PLATFORM",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: dmpURL,
    },
    {
      id: 2,
      icon: <img src={Fly} alt="fly" />,
      textColor: "text-[#4E64EE]",
      bgColor: "bg-[#F2F4FF]",
      heading: "Fly",
      subHeading: "CONTENT MANAGEMENT SYSTEM",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: cmsURL,
    },
  ];

  return (
    <div className="w-full h-full font-custom pt-4 px-4">
      <div className="w-full grid grid-cols-12 bg-gradient-to-b from-[#F0F9FF] to-[#FFFFFF] p-12">
        <div className="w-full col-span-8">
          <div>
            <h1
              className="pb-2 word inline-block z-10 font-custom font-semibold text-[24px] sm:text-[20px] md:text-[40px] lg:text-[60px] text-[#1E376E] 
              leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[90px] tracking-[-0.01rem] align-center text-start"
            >
              transform your outdoor
              <br />
              advertising with data-
              <br />
              driven{" "}
              <span className="font-cursive font-regular tracking-[-0.3rem] text-[#129BFF]">
                intelligence
              </span>
            </h1>
            <p
              className="pb-8 text-[20px] text-start sm:text-[14px] md:text-[16px] lg:text-[16px] text-[#4C6590] mt-12 md:mt-8 
              leading-[22px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] tracking-normal"
            >
              Our Data Management Platform helps you collect, organize, and
              activate high-quality <br />
              audience data directly from real respondents—no guesswork, just
              insights that drive results.
            </p>
          </div>
          <div className="w-1/4">
            <ButtonInput
              className={"bg-[#129BFF]"}
              // icon={<i className="fi fi-sr-megaphone flex items-center" />}
              rounded="small"
              fullWidth={true}
              onClick={() => window.open(planningURL)}
            >
              Request Demo
            </ButtonInput>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <div className="bg-[#EEF7FF] rounded-full h-[360px] w-[360px] flex justify-center items-center">
            <img
              src={Planner}
              className="h-1/2 w-1/2 -rotate-[0.542rad]"
              alt="fly"
            />
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
            TYPES OF DATA SOURCES
          </p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Real-Time Campaign{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">
              Intelligence
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            {" "}
            Respondents input their real-world demographics, interests, and
            behaviors <br />
            directly into your system.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 px-20 py-8">
          {secondSection?.map((content: any, i: any) => (
            <div
              key={i}
              className="col-span-4 rounded-[12px] border border-gray-100 p-4 flex items-center gap-2 h-[120px]"
            >
              <div className={`${content.bg} rounded-full p-4`}>
                {content.icon}
              </div>
              <h1 className="text-[24px] text-[#2A3856] font-semibold">
                {content.name}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
            DEMOGRAPHIC & MOVEMENT PATTERNS
          </p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Buy Billboards On Audience
            <br />
            Impressions, No{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">
              Fixed Rentals
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            {" "}
            Respondents input their real-world demographics, interests, and
            behaviors <br />
            directly into your system.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 px-36 py-8">
          {thirdSection?.map((content: any, i: any) => (
            <div
              key={i}
              className="col-span-4 border border-gray-100 rounded-[12px] px-4 py-8"
            >
              <div
                className={`${content.color} h-12 w-12 flex items-center justify-center rounded-full p-2`}
              >
                {content.icon}
              </div>
              <h1 className="py-4 text-[#2A3856] text-[24px] font-semibold">
                {content.heading}
              </h1>
              <p className="py-2 text-[16px] text-[#2D5087]">
                {content.subHeading}
              </p>
              <p></p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
            TYPES OF DATA SOURCES
          </p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            Transform Your Outdoor Advertising <br />
            With Data-Driven{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">
              Intelligence
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">
            {" "}
            Respondents input their real-world demographics, interests, and{" "}
            <br />
            behaviors directly into your system.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 bg-[#F7FCFF] flex items-center justify-center mr-12">
            <img src={Planner} className="h-1/2 w-1/2" alt="planner" />
          </div>
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Real-Time Campaign Intelligence
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              Monitor your outdoor advertising performance as it happens. Track
              impressions, hardware status, and campaign costs with live
              dashboards that give you the power to optimize on the fly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Precision Audience Targeting
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              {
                "Why pay for every passing glance? Our platform ensures you only invest in the impressions that reach your specific audience segments, maximizing your ROI with every display."
              }
            </p>
          </div>
          <div className="col-span-6 bg-[#F7FCFF] flex items-center justify-center ml-12">
            <img src={Planner} className="h-1/2 w-1/2" alt="planner" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 bg-[#F7FCFF] flex items-center justify-center mr-12">
            <img src={Planner} className="h-1/2 w-1/2" alt="planner" />
          </div>
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Smart Contextual Activation
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              {
                "Deploy dynamic content triggered by real-world events. Weather changes, sports outcomes, traffic patterns—your displays respond automatically to what's happening around them."
              }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Strategic Location Intelligence
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              {
                "Position your message where it matters most. Target displays near your retail locations, intercept customers near competitor sites, or dominate high-traffic commuter routes for maximum visibility."
              }
            </p>
          </div>
          <div className="col-span-6 bg-[#F7FCFF] flex items-center justify-center ml-12">
            <img src={Planner} className="h-1/2 w-1/2" alt="planner" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ml-[-15px] py-8">
          <div className="col-span-6 bg-[#F7FCFF] flex items-center justify-center mr-12">
            <img src={Planner} className="h-1/2 w-1/2" alt="planner" />
          </div>
          <div className="col-span-6 font-custom px-16">
            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Calendar-Optimized Campaigns
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              Position your message where it matters most. Target displays near
              your retail locations, intercept customers near competitor sites,
              or dominate high-traffic commuter routes for maximum visibility.
            </p>
          </div>
        </div>
      </div>

      <div className="px-12 pb-24">
        <div className="grid grid-cols-12 gap-4 py-8">
          <div className="col-span-6 p-16">
            <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">
              HOW WE USE
            </p>
            <h1 className="py-4 font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Using Data insights to <br /> Optimize{" "}
              <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">
                Performance
              </span>
            </h1>
            <p className="text-[20px] py-4 text-[#2D5087]">
              {" "}
              We use the insights to spot trends, improve performance, and guide
              smarter decisions
            </p>
          </div>
          <div className="col-span-6 font-custom p-16 bg-[#EDF8FF] rounded-[12px]">
            <img src={Planner} className="h-1/2 w-1/2" alt="planner" />

            <h1 className="font-semibold text-[28px] md:text-[40px] leading-[42px] md:leading-[54.72px] tracking-normal">
              Built for Marketers, Researchers, and Media Owners
            </h1>
            <p className="text-[20px] text-[#2D5087] py-4">
              {
                "Prooh accurately converts vehicle numbers into audience impressions using google's speed data, R.T.O vehicles circulation data & D.U.L.T audience approximation data. Such aggregated data goes through "
              }
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4 px-16 py-8">
        <div className="col-span-4">
          <h1 className="py-4 text-start font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
            See Our Other{" "}
            <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">
              Products
            </span>
          </h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-start">
            find out how our user are spreading the word
          </p>
        </div>
        <div className="col-span-6 grid grid-cols-12 gap-4">
          {otherProducts?.map((product: any) => (
            <div
              key={product.id}
              className={`${product.bgColor} col-span-6 w-full rounded-[12px] shadow-sm border border-gray-100 p-8`}
            >
              {product.icon}
              <h1 className="my-4 text-[24px] text-[#2A3856] font-semibold">
                {product.heading}
              </h1>
              <h1 className="my-4 text-[16px] text-[#2A3856]">
                {product.subHeading}
              </h1>
              <p className="my-2 text-[16px] text-[#2D5087]">{product.para}</p>
              <div className="w-1/2 pt-4">
                <ButtonInput
                  variant="knowMore"
                  icon={
                    <i className="fi fi-br-arrow-up-right flex items-center" />
                  }
                  iconPosition="right"
                  rounded="full"
                  size="small"
                  textColor={product.textColor}
                  onClick={() => window.open(product.redirect)}
                >
                  <span className={`${product.textColor} py-1`}>Know More</span>
                </ButtonInput>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
