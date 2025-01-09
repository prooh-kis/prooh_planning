import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatedIcon } from "../../components/molecules/AnimatedIcon";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { ImageCarousel } from "../../components/molecules/ImageCarousel";
import { LandingPageMap } from "../../components/molecules/LandingPageMap";
import { LandingPageMapFooter } from "../../components/molecules/LandingPageMapFooter";
import { LandingPageMapHeader } from "../../components/molecules/LandingPageMapHeader";
import { getLandingPageData } from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { LANDING_PAGE_DATA } from "../../constants/localStorageConstants";
import { LandingPageListView } from "../../components/molecules/LandingPageListView";
import { LandingPageTableView } from "../../components/molecules/LandingPageTableView";
import { ContactForm } from "../../components/segments/ContactForm";
import { AUTH } from "../../routes/routes";
import {
  CarouselImageView,
  CreateCampaignOption,
  TabWithoutIcon,
} from "../../components";
import quotes from "../../assets/icons/quotes.png";
import { CircleImageCarousel } from "../../components/molecules/CircleImageCrousel";
import imageA from "../../assets/images/imageA.png";
import imageB from "../../assets/images/imageB.png";
import imageC from "../../assets/images/imageC.png";
import imageD from "../../assets/images/imageD.png";
import imageE from "../../assets/images/imageE.png";
import asus from "../../assets/images/asus.png";
import samsung from "../../assets/images/samsung.png";
import blinkit from "../../assets/images/blinkit-a.png";
import builderai from "../../assets/images/builderai.png";
import cityflo from "../../assets/images/cityflo.png";
import flebo from "../../assets/images/flebo.png";
import gomechanic from "../../assets/images/gomechanic.png";
import healthians from "../../assets/images/healthians-a.png";
import indewild from "../../assets/images/indewild.png";
import ixigo from "../../assets/images/ixigo.png";
import magicpin from "../../assets/images/magicpin.png";
import oneplus from "../../assets/images/oneplus.png";
import puma from "../../assets/images/puma.png";
import timesprime from "../../assets/images/timesprime.png";
import ankur from "../../assets/images/ankur.jpg";
import anuj from "../../assets/images/anuj.jpg";
import partha from "../../assets/images/partha.jpg";
import vishnu from "../../assets/images/vishnu.jpg";
import testiO1 from "../../assets/images/testi01.png";
import testiO2 from "../../assets/images/testi02.png";
import testiO3 from "../../assets/images/testi03.png";
import testiO4 from "../../assets/images/testi04.png";

import UserImage from "../../assets/userImage.png";
import { RightSideArrowsImageCarousel } from "../../components/molecules/RightSideArrowsImageCrousel";
import { TestimonialCarousel } from "../../components/molecules/TestimonialCarousel";
import { PageFooter } from "../../components/PageFooter";
import { steps } from "../../data/LandingPageData";
import { testO11 } from "../../assets";
const confetti = require("../../assets/lottie/confetti.json");

const images = [
  asus,
  samsung,
  blinkit,
  builderai,
  cityflo,
  flebo,
  gomechanic,
  healthians,
  indewild,
  ixigo,
  magicpin,
  oneplus,
  puma,
  timesprime,
];

const carouselImages = [imageA, imageB, imageC, imageD, imageE];

const tabData = [
  {
    id: "1",
    label: "Advertiser",
    params: "",
  },
  {
    id: "2",
    label: "Media Owner",
    params: "",
  },
  {
    id: "3",
    label: "Data Hero",
    params: "",
  },
];

const advertisersSteps = [
  {
    id: "1",
    label: "Basic Details",
  },
  {
    id: "2",
    label: "Target Audience And Touchpoints",
  },
  {
    id: "3",
    label: "Advance Filters",
  },
  {
    id: "4",
    label: "Compare Plan",
  },
  {
    id: "5",
    label: "Billing",
  },
  {
    id: "6",
    label: "Campaign Report",
  },
];

const dataHeroTabs = [
  {
    id: "1",
    label: "All(98)",
  },
  {
    id: "2",
    label: "Media Owner",
  },
  {
    id: "3",
    label: "Advertiser",
  },
  {
    id: "4",
    label: "Food & Beverage",
  },
];

const dataHeroUsersImages = [
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
];

const meetArchitects = [
  {
    id: "1",
    image: ankur,
    name: "Ankur Rastogi",
    role: "Founder, All About Outdoor, India",
  },
  {
    id: "2",
    image: vishnu,
    name: "Vishnu Mohan",
    role: "Founder, Avyan Holdings, Singapore",
  },
  {
    id: "3",
    image: anuj,
    name: "Anuj Bhandari",
    role: "CEO, All About Outdoor, India",
  },
  {
    id: "4",
    image: partha,
    name: "Partha Sinha",
    role: "Advisory Board, Prooh Technologies, India",
  },
];

// const testimonials = [testiO1, testiO2, testiO3, testiO4]?.map((value) => {
//   return {
//     src: value,
//     alt: value,
//   };
// });

const testimonials = [testiO1, testiO2, testiO3, testiO4];

export const Landing: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);
  const thirdDivRef = useRef<HTMLDivElement>(null);
  const fourthDivRef = useRef<HTMLDivElement>(null);

  const [landingPageData, setLandingPageData] = useState<any>({});
  const [view, setView] = useState<any>("map");
  const [selectOption, setSelectOption] = useState<string>("Demand");

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentAdvertiserTab, setCurrentAdvertiserTab] = useState<any>("1");
  const [currentMOTab, setCurrentMOTab] = useState<any>("1");
  const [currentDHTab, setCurrentDHTab] = useState<any>("1");

  const [currentMeetDataHeroTab, setCurrentMeetDataHeroTab] =
    useState<any>("1");

  const [screenData, setScreenData] = useState<any>([]);

  const [countryStates, setCountryStates] = useState<any>({});
  const [stateCities, setStateCities] = useState<any>({});
  const [cityTouchpoints, setCityTouchpoints] = useState<any>({});
  const [touchpointsCities, setTouchpointsCities] = useState<any>({});

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const landingPageDataGet = useSelector(
    (state: any) => state.landingPageDataGet
  );
  const { loading, error, data } = landingPageDataGet;

  const [defCnt, setDefCnt] = useState<any>([]);
  const [defSt, setDefSt] = useState<any>([]);
  const [defCt, setDefCt] = useState<any>("");

  const getTotalCountryCount = () => {
    return Object.keys(screenData)?.length || 0;
  };

  const getTotalStatesCounts = () => {
    let ans = 0;
    if (defCnt?.length === 0) {
      for (let cnt in screenData) {
        let statesCount = Object.keys(screenData[cnt])?.length || 0;
        ans += statesCount;
      }
    } else {
      for (let cnt of defCnt) {
        let statesCount = Object.keys(screenData[cnt])?.length || 0;
        ans += statesCount;
      }
    }
    return ans;
  };

  const getTotalCityCount = () => {
    return Object.keys(cityTouchpoints)?.length || 0;
  };

  const getTotalScreensCountCityWise = (city: string) => {
    let ans = 0;
    for (let tp of Object.keys(touchpointsCities)) {
      if (cityTouchpoints[city][tp] != undefined) {
        let x = cityTouchpoints[city][tp].length;
        ans += x;
      }
    }
    return ans;
  };

  const getTotalScreensCountTouchpointWise = (tp: string) => {
    let ans = 0;
    for (let city of Object.keys(cityTouchpoints)) {
      if (cityTouchpoints[city][tp] != undefined) {
        let x = cityTouchpoints[city][tp].length;
        ans += x;
      }
    }
    return ans;
  };

  const getTotalScreensCount = () => {
    let ans = 0;
    for (let tp of Object.keys(touchpointsCities)) {
      for (let city of Object.keys(cityTouchpoints)) {
        if (cityTouchpoints[city][tp] != undefined) {
          let x = cityTouchpoints[city][tp].length;
          ans += x;
        }
      }
    }
    return ans;
  };

  const fillCntData = (myData: any) => {
    const cs: any = {};
    // Extracting data for cs
    for (const country in myData) {
      cs[country] = cs[country] || {};
      for (const state in myData[country]) {
        cs[country][state] = Object.keys(myData[country][state]).length;
      }
    }
    return cs;
  };

  const fillStateData = (myData: any) => {
    const sc: any = {};
    // Extracting data for sc
    for (const country in myData) {
      for (const state in myData[country]) {
        for (const city in myData[country][state]) {
          sc[state] = sc[state] || {};
          sc[state][city] = Object.keys(myData[country][state][city]).length;
        }
      }
    }
    return sc;
  };

  const fillCityData = (myData: any) => {
    const ct: any = {};
    // Extracting data for ct
    for (const country in myData) {
      for (const state in myData[country]) {
        for (const city in myData[country][state]) {
          ct[city] = ct[city] || {};
          for (const attribute in myData[country][state][city]) {
            ct[city][attribute] = myData[country][state][city][attribute];
          }
        }
      }
    }
    return ct;
  };

  const fillTpData = (myData: any) => {
    const tc: any = {};
    // Extracting data for tc
    for (const country in myData) {
      for (const state in myData[country]) {
        for (const city in myData[country][state]) {
          for (const attribute in myData[country][state][city]) {
            tc[attribute] = tc[attribute] || {};
            tc[attribute][city] = myData[country][state][city][attribute];
          }
        }
      }
    }
    const sortedArray = Object.entries(tc).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
    const sortedObject = Object.fromEntries(sortedArray);
    return sortedObject;
  };

  const handleCntClick = (country: any) => {
    const dfc = Array.from(new Set([...defCnt, country]));
    const dataToShow: any = {};
    dfc.map((d: any) => {
      dataToShow[d] = screenData[d];
    });
    setStateCities(fillStateData(dataToShow));
    setCityTouchpoints(fillCityData(dataToShow));
    setTouchpointsCities(fillTpData(dataToShow));
  };

  const handleStClick = (state: any) => {
    const dfs = Array.from(new Set([...defSt, state]));
    const dataToUse: any = {};
    dfs.map((d: any) => {
      dataToUse[d] = stateCities[d];
    });
    const dataToShow: any = {};

    for (const state in dataToUse) {
      for (const city in dataToUse[state]) {
        dataToShow[city] = fillCityData(screenData)[city];
      }
    }

    setCityTouchpoints(dataToShow);
  };

  const scrollToTarget = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (landingPageData && Object.keys(landingPageData).length > 0) {
      setScreenData(landingPageData.screenData);
      setCountryStates(fillCntData(landingPageData.screenData));
      setStateCities(fillStateData(landingPageData.screenData));
      setCityTouchpoints(fillCityData(landingPageData.screenData));
      setTouchpointsCities(fillTpData(landingPageData.screenData));
    }
  }, [landingPageData]);

  useEffect(() => {
    if (getDataFromLocalStorage(LANDING_PAGE_DATA)) {
      setLandingPageData(getDataFromLocalStorage(LANDING_PAGE_DATA));
    } else {
      setLandingPageData(data);
    }
    dispatch(getLandingPageData());
  }, [dispatch, data]);

  const CampaignStep = ({ step, image, title, description }: any) => (
    <div className="grid grid-cols-12 gap-4 py-4">
      <div className="col-span-7 flex items-center justify-center">
        <div className="rounded-[12px] shadow-lg m-1">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="col-span-4 p-4 flex flex-col gap-4">
        <p className="lg:text-[14px] text-[12px] font-bold text-[#B5B5B5]">
          {step}
        </p>
        <h1 className="lg:text-[24px] text-[18px] text-[#254354] font-semibold text-wrap tracking-[0.04em]">
          {title}
        </h1>
        <p className="lg:text-[20px] text-[16px] text-[#6D8596] tracking-[0.02em]">
          {description}
        </p>
      </div>
    </div>
  );

  const CampaignSteps = ({
    currentAdvertiserTab,
  }: {
    currentAdvertiserTab: string;
  }) => {
    const step = steps.find((s) => s.id === currentAdvertiserTab) || steps[0];
    return <CampaignStep {...step} />;
  };

  return (
    <div className="w-screen h-full pb-0 flex justify-center items-center">
      <div className="w-full h-full">
        <div className="h-full grid grid-cols-12 gap-16 px-16 py-32">
          <div className="col-span-5">
            <div className="w-[516px]">
              <h1 className="lg:text-[48px] md:text-[40px] font-black text-[#20272C] text-wrap">
                End-to-end campaign management platform for
                <span className="bg-primaryButton text-white rounded-[10px] text-[32px] px-1 ml-2">
                  DOOH
                </span>
              </h1>
              <p className="text-[14px] text-[#4C6590] text-start text-wrap mt-8">
                {
                  "Prooh: India’s 1st 'Audience Guarantee' OOH Media Company, delivering data-driven planning, audience measurement, performance proof, and 100% cost transparency"
                }
              </p>
              <div className="mt-8 flex justify-start">
                <PrimaryButton
                  title="Start Planning"
                  rounded="rounded-[5px]"
                  action={() => navigate(AUTH)} // Scroll to the target on click
                />
              </div>
            </div>
          </div>
          <div className="col-span-7  p-0 m-0 flex flex-start">
            <CarouselImageView showThumbnails={false} images={carouselImages} />
          </div>
        </div>
        <div className="px-16">
          <div className="flex justify-center gap-2">
            {["Demand", "Supply"].map((option) => (
              <button
                key={option}
                className={`rounded-[15px] px-4 py-2 lg:text-[14px] md:text-[12px]  ${
                  selectOption === option ? "active-button" : "inactive-button"
                }`}
                onClick={() => setSelectOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center ">
            <ImageCarousel images={images} imagesToShow={6} />
          </div>
        </div>
        {/* seaction 2 */}
        <div ref={targetDivRef} className="px-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="py-4">
                <LandingPageMapFooter data={landingPageData} />
              </div>
            </div>
            <div className="col-span-8">
              <div className="relative">
                <LandingPageMapHeader
                  scrollToTarget={scrollToTarget}
                  setView={setView}
                  view={view}
                />
              </div>
              <div className="lg:h-[680px] md:h-[540px] sm:h-[480px] w-auto z-0">
                <LandingPageMap data={landingPageData} />
              </div>
            </div>
          </div>
          {view === "list" ? (
            <div className="pt-8 z-0">
              <LandingPageListView screens={landingPageData?.screens} />
            </div>
          ) : view === "table" ? (
            <div className="pt-8 z-0">
              <LandingPageTableView
                data={screenData}
                stateCities={stateCities}
                cityTouchpoints={cityTouchpoints}
                touchpointsCities={touchpointsCities}
                defCnt={defCnt}
                setDefCnt={setDefCnt}
                defSt={defSt}
                setDefSt={setDefSt}
                defCt={defCt}
                getTotalCountryCount={getTotalCountryCount}
                handleCntClick={handleCntClick}
                getTotalStatesCounts={getTotalStatesCounts}
                handleStClick={handleStClick}
                getTotalCityCount={getTotalCityCount}
                getTotalScreensCountTouchpointWise={
                  getTotalScreensCountTouchpointWise
                }
                getTotalScreensCount={getTotalScreensCount}
                getTotalScreensCountCityWise={getTotalScreensCountCityWise}
              />
            </div>
          ) : null}
        </div>
        {/* seaction3 */}

        <div ref={secondDivRef} className="px-16 mt-16">
          <h1 className="px-8  text-[16px] leading-[24px] font-normal tracking-[0.21em] text-left ">
            {`HOW IT'S WORK`}
          </h1>
          <div className="border-b my-4 ml-8 inline-flex items-center gap-2 w-fit">
            <TabWithoutIcon
              tabData={tabData}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
          <div className="px-8 py-4">
            {currentTab === "1" ? (
              <div className="pb-4">
                <h1 className="text-[32px] leading-[24px] font-semibold tracking-[0.01em] text-left">
                  Plan Your Campaign In Just Few Clicks
                </h1>
                <div className="py-4 flex items-center gap-4">
                  {advertisersSteps?.map((step: any, i: any) => (
                    <button
                      key={i}
                      className={`${
                        step.id === currentAdvertiserTab
                          ? "bg-primaryButton"
                          : "bg-gray-100 border border-gray-200"
                      } rounded-[8px] px-4 py-2 truncate cursor-pointer`}
                      onClick={() => setCurrentAdvertiserTab(step.id)}
                    >
                      <h1
                        className={`lg:text-[14px] text-[12px] ${
                          step.id === currentAdvertiserTab
                            ? "text-white font-semibold"
                            : "text-gray-600"
                        } truncate`}
                      >
                        {step.label}
                      </h1>
                    </button>
                  ))}
                </div>
                <div className="border-t w-4/5 mt-2" />
                <CampaignSteps currentAdvertiserTab={currentAdvertiserTab} />
              </div>
            ) : currentTab === "2" ? (
              <div className="pb-4"></div>
            ) : (
              <div className="pb-4"></div>
            )}
          </div>
        </div>
        {/* seaction 4 */}
        <div className="px-4">
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
                  <div className="rounded-full bg-[#1E3241] w-4 h-2/4 flex items-center">
                    <div className="rounded-full bg-primaryButton w-full h-1/5"></div>
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
                      We Sell OOH & PDOOH On Impressions Only. No Fixed Rental
                    </h1>
                    <p className="lg:text-[20px] text-[14px] text-[#FFFFFF]  font-normal text-wrap mt-8 leading-[30px] tracking-[-0.02em]">
                      {`PROOH'S Media Planning Tool Uses Geospatial Data, POI Data, Govt. Traffic Data amongst other data to determine total audience impressions delivered at any specific locations.`}
                      {/* <span className="text-primaryButton font-semibold underline">See More</span> */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* seaction 5 */}

        <div className="flex justify-center lg:pt-[720px] pt-16px pb-20">
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

        {/* section */}
        <div className="px-4">
          <div className="bg-gradient-to-b from-[#F3FAFF] to-[#FFFFFF] py-8 px-4 md:py-16 lg:px-16 rounded-[21px]">
            {/* Section Header */}
            <div className="flex gap-2 items-center mb-4">
              <i className="fi fi-sr-heart lg:text-[14px] text-[12px] text-primaryButton flex items-center"></i>
              <h1 className="lg:text-[14px] text-[12px] text-[#183246]">
                Wall of Love
              </h1>
            </div>

            {/* Title and Description */}
            <h1 className="text-[24px] md:text-[32px] lg:text-[48px] font-semibold text-[#183246] leading-[32px] md:leading-[42px] lg:leading-[55.2px] tracking-[-0.03em] mb-4">
              Feedback From Those {"We've"} Shared Experiences With
            </h1>
            <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#4B5563] font-normal leading-[20px] md:leading-[22px] lg:leading-[24px]">
              Hopeful and confident, he overcame shyness and found happiness in
              life, embracing joy without hesitation.
            </p>

            {/* Testimonial Content */}
            <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
              {/* Testimonial Image */}
              <img
                src={testO11}
                alt="Testimonial Visual"
                className="h-[200px] w-full md:h-[260px] md:w-[373px] object-cover rounded-lg shadow-md"
              />

              {/* Testimonial Text */}
              <div className="w-full md:w-[630px] h-auto flex flex-col">
                {/* Quotation Mark Icon */}
                <img
                  src={quotes}
                  alt="Quotes"
                  className="h-8 w-8 mb-4 bg-blue-500 mask mask-image"
                />

                {/* Quote Content */}
                <h1 className="text-[16px] md:text-[20px] lg:text-[24px] text-[#254354] font-normal leading-[24px] md:leading-[30px] lg:leading-[34px] tracking-[-0.02em]">
                  Being a Tech Company, we believe in everything which can
                  demonstrate measurability. PROOH practices are extremely fresh
                  and deliver the assurances around accountability.
                </h1>

                {/* Author Info */}
                <h1 className="text-[16px] md:text-[18px] lg:text-[20px] text-[#254354] font-bold leading-[24px] mt-2">
                  Ms. Bhawna Talwar,
                </h1>
                <h1 className="text-[14px] md:text-[16px] text-[#688799] font-normal leading-[19.36px]">
                  Brand Marketing,
                </h1>

                {/* Pagination and Navigation */}
                <div className="flex justify-between items-center mt-4">
                  {/* Page Counter */}
                  <h1 className="text-[14px] md:text-[16px] text-[#5A5A5A] font-normal">
                    <span className="text-[#129BFF]">01</span> / 04
                  </h1>

                  {/* Navigation Arrows */}
                  <div className="flex gap-4 items-center">
                    <i className="fi fi-rr-arrow-small-left text-[#8E8E8E]"></i>
                    <i className="fi fi-rr-arrow-small-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section */}
        <div className="px-16">
          <div className="p-4 sm:p-8">
            <div className="flex gap-2 items-center">
              <i className="fi fi-sr-heart text-[12px] sm:text-[14px] text-primaryButton flex items-center"></i>
              <h1 className="text-[12px] sm:text-[14px]">Our Team</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
              <div className="md:col-span-5">
                <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] font-semibold text-[#0E212E] leading-[38px] sm:leading-[50px] lg:leading-[50.88px] tracking-[-0.03em] w-[409px] h-[153px] pr-8">
                  Meet The Creators Behind Our Vision
                </h1>
              </div>
              <div className="md:col-span-7 flex w-[627px]">
                <p className="text-[14px] sm:text-[16px] lg:text-[20px] leading-relaxed text-[#254354]">
                  Meet the passionate leaders driving our mission. Their
                  expertise and commitment to excellence propel us forward,
                  creating lasting impact and inspiring success.
                </p>
              </div>
            </div>
            <div>
              <RightSideArrowsImageCarousel images={meetArchitects} />
            </div>
          </div>
        </div>

        {/* section */}
        <ContactForm />

        {/* Section */}
        <div className="flex justify-center mt-16 px-4">
          <div className="text-center max-w-[90%] md:max-w-[80%] lg:max-w-[677px]">
            <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-semibold text-[#0E212E] leading-tight lg:leading-[64px] tracking-tight">
              Find Us On Google Map
            </h1>
            <p className="mt-4 text-[14px] sm:text-[16px] lg:text-[16px] text-[#254354] leading-relaxed lg:leading-[24px] tracking-[-0.02em]">
              Our platform helps your business in managing expenses. These are
              some examples of how our platform provides support for expense
              management.
            </p>
            <div className="mt-4">{/* Add any content here if needed */}</div>
          </div>
        </div>
        {/* Section */}

        <CreateCampaignOption />
        <PageFooter />
      </div>
    </div>
  );
};
