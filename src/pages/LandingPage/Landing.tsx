import React, { useCallback, useEffect, useRef, useState } from "react";
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
import advanceAudience from "../../assets/images/advanceAudience.png";
import { ContactForm } from "../../components/segments/ContactForm";
import { AUTH } from "../../routes/routes";
import { CarouselImageView, TabWithoutIcon } from "../../components";
import { CircleImageCarousel } from "../../components/molecules/CircleImageCrousel";
import imageA from "../../assets/images/imageA.png";
import imageB from "../../assets/images/imageB.png";
import imageC from "../../assets/images/imageC.png";
import imageD from "../../assets/images/imageD.png";
import imageE from "../../assets/images/imageE.png";
import basicDetails from "../../assets/images/basicDetails.png";
import targetAudienceTP from "../../assets/images/targetAudienceTP.png";
import advanceFilters from "../../assets/images/advanceFilters.png";
import comparePlan from "../../assets/images/comparePlan.png";
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

const carouselImages = [
  imageA,
  imageB,
  imageC,
  imageD,
  imageE,
];

const tabData = [{
  id: "1",
  label: "Advertiser",
  params: ""
},{
  id: "2",
  label: "Media Owner",
  params: ""
},{
  id: "3",
  label: "Data Hero",
  params: ""
}];

const advertisersSteps = [{
  id: "1",
  label: "Basic Details"
},{
  id: "2",
  label: "Target Audience And Touchpoints"
},{
  id: "3",
  label: "Advance Filters"
},{
  id: "4",
  label: "Compare Plan"
},{
  id: "5",
  label: "Billing"
},{
  id: "6",
  label: "Campaign Report"
}];

const dataHeroTabs = [{
  id: "1",
  label: "All(98)"
},{
  id: "2",
  label: "Media Owner"
},{
  id: "3",
  label: "Advertiser"
},{
  id: "4",
  label: "Food & Beverage"
}];

const dataHeroUsersImages = [
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
  UserImage,
];

const meetArchitects = [{
  id: "1",
  image: ankur,
  name: "Ankur Rastogi",
  role: "Founder, All About Outdoor, India",
},{
  id: "2",
  image: vishnu,
  name: "Vishnu Mohan",
  role: "Founder, Avyan Holdings, Singapore",
},{
  id: "3",
  image: anuj,
  name: "Anuj Bhandari",
  role: "CEO, All About Outdoor, India",
},{
  id: "4",
  image: partha,
  name: "Partha Sinha",
  role: "Advisory Board, Prooh Technologies, India",
}];

const testimonials = [
  testiO1,
  testiO2,
  testiO3,
  testiO4
]

export const Landing: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);
  const thirdDivRef = useRef<HTMLDivElement>(null);
  const fourthDivRef = useRef<HTMLDivElement>(null);


  const [landingPageData, setLandingPageData] = useState<any>({});
  const [view, setView] = useState<any>("map");

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentAdvertiserTab, setCurrentAdvertiserTab] = useState<any>("1");
  const [currentMOTab, setCurrentMOTab] = useState<any>("1");
  const [currentDHTab, setCurrentDHTab] = useState<any>("1");

  const [currentMeetDataHeroTab, setCurrentMeetDataHeroTab] = useState<any>("1");

  const [screenData, setScreenData] = useState<any>([]);

  const [countryStates, setCountryStates] = useState<any>({});
  const [stateCities, setStateCities] = useState<any>({});
  const [cityTouchpoints, setCityTouchpoints] = useState<any>({});
  const [touchpointsCities, setTouchpointsCities] = useState<any>({});

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const landingPageDataGet = useSelector((state: any) => state.landingPageDataGet);
  const {
    loading, error, data
  } = landingPageDataGet;


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
      targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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

  },[landingPageData])

  useEffect(() => {
    if (getDataFromLocalStorage(LANDING_PAGE_DATA)) {
      setLandingPageData(getDataFromLocalStorage(LANDING_PAGE_DATA));
    } else {
      setLandingPageData(data);
    }
    dispatch(getLandingPageData());
  }, [dispatch, data]);

  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">

      <div className="w-full h-full">
        <div className="h-full grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="w-full flex justify-start items-center gap-2">
              <div className="flex items-center">
                <AnimatedIcon size={20} icon={confetti} />
              </div>
              <p className="lg:text-[14px]">
                Prooh planner is now live
              </p>
            </div>
            <div className="">
              <h1 className="lg:text-[48px] md:text-[40px] font-black text-[#254354] text-wrap truncate">
                End-to-end campaign management platform for <span className="bg-primaryButton text-white rounded p-1">DOOH</span>
              </h1>
              <p className="text-[16px] text-start text-wrap">
                {"Prooh: India’s 1st 'Audience Guarantee' OOH Media Company, delivering data-driven planning, audience measurement, performance proof, and 100% cost transparency"}
              </p>
              <div className="py-4 flex justify-start">
                <PrimaryButton
                  title="Start Planning"
                  rounded="rounded-[5px]"
                  action={() => navigate(AUTH)} // Scroll to the target on click
                />
              </div>
            </div>
          </div>
          <div className="col-span-8 flex items-center justify-center">
            <CarouselImageView showThumbnails={false} images={carouselImages}/>
          </div>
        </div>
        <div>
        <div className="py-8">
          <div className="flex justify-center gap-2 pt-8">
            <button
              className="border rounded-full p-2"
              onClick={() => {}}
            >
              <h1 className="lg:text-[14px] md:text-[12px] font-bold text-gray-500">Demand</h1>
            </button>
            <button
              className=""
              onClick={() => {}}
            >
              <h1 className="lg:text-[14px] md:text-[12px] text-secondaryButton">Supply</h1>
            </button>
          </div>
          <div className="flex gap-4 items-center py-8">
            <ImageCarousel images={images} imagesToShow={6} />
          </div>
        </div>
        </div>
        <div ref={targetDivRef} className="">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="py-4">
                <LandingPageMapFooter data={landingPageData} />
              </div>
            </div>
            <div className="col-span-8">
              <div className="relative">
                <LandingPageMapHeader scrollToTarget={scrollToTarget} setView={setView} view={view} />
              </div>
              <div className="lg:h-[680px] md:h-[540px] sm:h-[480px] w-auto z-0">
                <LandingPageMap data={landingPageData} />
              </div>
            </div>
          </div>
          {view === "list" ? (
            <div className="pt-8 z-0">
              <LandingPageListView
                screens={landingPageData?.screens}
              />
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
                getTotalScreensCountTouchpointWise={getTotalScreensCountTouchpointWise}
                getTotalScreensCount={getTotalScreensCount}
                getTotalScreensCountCityWise={getTotalScreensCountCityWise}
              />
            </div>
          ) : null}
        </div>

        <div ref={secondDivRef} className="py-16">
          <h1 className="px-8 lg:text-[16px] text-[14px] text-gray-500 text-space-2 whitespace-pre">H O W    D O E S    I T    W O R K</h1>
          <div className="px-8 py-4">
            <TabWithoutIcon
              tabData={tabData}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
          <div className="px-8 py-4">
            {currentTab === "1" ? (
              <div className="pb-4">
                <h1 className="lg:text-[40px] text-[32px] font-semibold">Plan Your Campaign In Just Few Clicks</h1>
                <div className="py-4 flex items-center gap-4">
                  {advertisersSteps?.map((step: any, i: any) => (
                    <button
                      key={i} className={`${step.id === currentAdvertiserTab ? "bg-primaryButton" : "bg-gray-100 border border-gray-200"} rounded-[8px] px-4 py-2 truncate cursor-pointer`}
                      onClick={() => setCurrentAdvertiserTab(step.id)}
                    >
                      <h1 className={`lg:text-[14px] text-[12px] ${step.id === currentAdvertiserTab ? "text-white font-semibold" : "text-gray-600"} truncate`}>{step.label}</h1>
                    </button>
                  ))}
                </div>
                <div className="border-t w-4/5 mt-2" />
                {currentAdvertiserTab === "1" ? (
                  <div className="grid grid-cols-12 gap-4 py-4">
                    <div className="col-span-7 flex items-center justify-center">
                      <div className="rounded-[12px] shadow-lg m-1">
                        <img src={basicDetails} alt="basic details"/>
                      </div>
                    </div>
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="bg-gray-100 rounded-[12px] p-4">
                        <p className="lg:text-[14px] text-[12px] font-semibold text-gray-400 p-1">Step 1</p>
                        <h1 className="lg:text-[24px] text-[18px] font-semibold text-wrap p-1">Add Your Campaign Basic Details</h1>
                        <p className="lg:text-[20px] text-[16px] text-gray-400 p-1">
                          Add basic details for your campaign to begin with and get recommendation based on your industry, start date and duration of your campaign.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : currentAdvertiserTab === "2" ? (
                  <div className="grid grid-cols-12 gap-4 py-4">
                    <div className="col-span-7 flex items-center justify-center">
                      <div className="rounded-[12px] shadow-lg m-1">
                        <img src={targetAudienceTP} alt="basic details"/>
                      </div>
                    </div>
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="bg-gray-100 rounded-[12px] p-4">
                        <p className="lg:text-[14px] text-[12px] font-semibold text-gray-400 p-1">Step 2</p>
                        <h1 className="lg:text-[24px] text-[18px] font-semibold text-wrap p-1">Select Your Target Audience And Touchpoint</h1>
                        <p className="lg:text-[20px] text-[16px] text-gray-400 p-1">
                          Select your target audience group and touchpoints where they are available to get an approximate budget for your campaign
                        </p>
                      </div>
                    </div>
                  </div>
                ) : currentAdvertiserTab === "3" ? (
                  <div className="grid grid-cols-12 gap-4 py-4">
                    <div className="col-span-7 flex items-center justify-center">
                      <div className="rounded-[12px] shadow-lg m-1">
                        <img src={advanceFilters} alt="basic details"/>
                      </div>
                    </div>
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="bg-gray-100 rounded-[12px] p-4">
                        <p className="lg:text-[14px] text-[12px] font-semibold text-gray-400 p-1">Step 3</p>
                        <h1 className="lg:text-[24px] text-[18px] font-semibold text-wrap p-1">Apply Advance Filters For Location Proximity</h1>
                        <p className="lg:text-[20px] text-[16px] text-gray-400 p-1">
                          Filter your selected screens based on their proximity with your brand or competitor stores, target routes, geographical location and selected POIs
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-4 py-4">
                    <div className="col-span-7 flex items-center justify-center">
                      <div className="rounded-[12px] shadow-lg m-1">
                        <img src={comparePlan} alt="basic details"/>
                      </div>
                    </div>
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="bg-gray-100 rounded-[12px] p-4">
                        <p className="lg:text-[14px] text-[12px] font-semibold text-gray-400 p-1">Step 4</p>
                        <h1 className="lg:text-[24px] text-[18px] font-semibold text-wrap p-1">Compare Plan Based On Your Selections</h1>
                        <p className="lg:text-[20px] text-[16px] text-gray-400 p-1">
                          Compare your plan budget as per regular spots and spots based on your selected audience penetration and further optimise your campaign plan
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : currentTab === "2" ? (
              <div className="pb-4"></div>
            ) : (
              <div className="pb-4"></div>
            )}
          </div>
          <div className="relative mx-[-80px]">
            <div className="relative z-10 mx-28 text-white bg-primaryButton rounded-[16px] px-4 py-2 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <i className="fi fi-sr-time-fast text-[28px]"></i>
                <div>
                  <h1 className="lg:text-[40px] text-[32px] font-semibold">Plan Your Campaign Now</h1>
                  <div className="pb-2">
                    <p className="lg:text-[14px] text-[12px]">+40 Advertisers Have Already Planned</p>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <PrimaryButton
                  title="Request Demo"
                  rounded="rounded-full"
                  reverse={true}
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-0 w-full bg-gradient-to-b from-[#13202A] to-[#072E4A]">
              <div className="grid grid-cols-12 text-white gap-2">
                <div className="col-span-6 p-32">
                  <div className="flex items-center gap-2">
                    <i className="fi fi-ss-sparkles"></i>
                    <h1 className="lg:text-[20px] text-[16px] whitespace-pre">W H A T    W E    D O</h1>
                  </div>
                  <h1 className="lg:text-[48px] text-[40px] text-wrap font-bold py-2">Simplify & Optimize Your Advertising</h1>
                  <p className="lg:text-[20px] text-[16px] text-wrap py-2">
                    We simplify the way you buy outdoor media and also help you in optimizing your for maximum output and efficient costing
                  </p>
                  <div className="flex justify-start items-center py-4">
                    <PrimaryButton
                      title="Know More"
                      rounded="rounded-[12px]"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex justify-center items-center p-10">
                  <div className="rounded-full bg-[#1E3241] w-4 h-3/4 flex items-center">
                    <div className="rounded-full bg-primaryButton w-full h-1/5"></div>
                  </div>
                </div>
                <div className="col-span-5 p-32 flex justify-start items-center w-full">
                  <div className="">
                    <div className="flex justify-start">
                      <div className="bg-[#1E3E53] rounded-[12px] p-2">
                        <i className="fi fi-sr-display-chart-up"></i>
                      </div>
                    </div>
                   
                    <h1 className="lg:text-[32px] md:text-[24px] font-bold">We Sell OOH & PDOOH On Impressions Only. No Fixed Rental</h1>
                    <p>
                      {"PROOH'S Media Planning Tool Uses Geospatial Data, POI Data, Govt. Traffic Data amongst other data to determine total audience impressions delivered at any specific locations."}
                      {/* <span className="text-primaryButton font-semibold underline">See More</span> */}
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:pt-[720px] pt-[600px] pb-20">
          <div className="relative flex flex-col items-center">
            <h1 className="lg:text-[48px] text-[40px] font-semibold">Meet Our Data Hero</h1>
            <div className="border-b">
              <TabWithoutIcon
                tabData={dataHeroTabs}
                currentTab={currentMeetDataHeroTab}
                setCurrentTab={setCurrentMeetDataHeroTab}
              />
            </div>
            <div className="py-4">
              <CircleImageCarousel
                images={dataHeroUsersImages}
              />
              <div className="flex items-center justify-center py-4">
                <PrimaryButton
                  title="Participate"
                  rounded="rounded-full"
                  action={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#F3FAFF] to-[#FFFFFF] p-16 mx-[-40px]">
          <div className="flex gap-2 items-center ">
            <i className="fi fi-sr-heart lg:text-[14px] text-[12px] text-primaryButton flex items-center"></i>
            <h1 className="lg:text-[14px] text-[12px]">Wall of love</h1>
          </div>
          <div className="w-3/5">
            <h1 className="lg:text-[48px] text-[40px] font-semibold">Feedback From Those {"We've"} Shared Experiences With</h1>
            <p></p>
          </div>
          <div className="h-64 w-full rounded-lg overflow-hidden">
            <TestimonialCarousel images={testimonials} />
          </div>
        </div>

        <div className="p-8">
          <div className="flex gap-2 items-center">
            <i className="fi fi-sr-heart lg:text-[14px] text-[12px] text-primaryButton flex items-center"></i>
            <h1 className="lg:text-[14px] text-[12px]">Our Team</h1>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <h1 className="lg:text-[48px] md:text-[40px] font-bold">Meet The Creators Behind Our Vision</h1>
            </div>
            <div className="col-span-7 flex items-center">
              <p className="lg:text-[20px] text-[16px]">
                Meet the passionate leaders driving our mission. Their expertise and commitment to excellence propel us forward, creating lasting impact and inspiring success
              </p>
            </div>
          </div>
          <div >
            <RightSideArrowsImageCarousel
              images={meetArchitects}
             />
          </div>
        </div>

        <div className="py-20 px-8">
          <div className="flex flex-col items-center">
            <h1 className="text-[56px] font-bold text-[#254354] mb-[-10px]">Reach Out Anytime, {"We're"}</h1>
            <h1 className="text-[56px] font-bold text-[#254354] mt-[-10px]">Just A Click Away</h1>
            <p className="text-[14px] text-[#83939C] w-3/4 text-center">Contact us and start planning your DOOH advertising campaigns today</p>
          </div>
          <div className="">
            <ContactForm />
          </div>
        </div>
        <div className="mx-[-80px] mb-[-60px] bottom-0">
          <PageFooter />
        </div>
      </div>
    </div>
  );
};
