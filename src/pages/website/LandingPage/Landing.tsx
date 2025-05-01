import React, { useEffect, useRef } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageData } from "../../../actions/screenAction";
import {
  removeAllKeyFromLocalStorage,
} from "../../../utils/localStorageUtils";
import { CreateCampaignOption } from "../../../components";
import { PageFooter } from "../../../components/PageFooter";
import {
  FloatingBrandIcon,
  HowItsWork,
  OurAdvertisingJourney,
  Section1,
  FeedBack,
  ProohCreator,
  ContactForm,
  FindUsOnGoogle,
  FlowDiagramWeb,
  FlowHorizontalScroll
} from "../../../components/LoadingPageComponents";
import landingPageGrid from "../../../assets/images/landingPageGrid.png";
// eslint-disable-next-line import/no-named-as-default
// import ScrollTrigger from "gsap/ScrollTrigger";
// eslint-disable-next-line import/no-named-as-default
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

export const Landing: React.FC = () => {
  const isMobile = window.innerWidth <= 768;
  const width = window.innerWidth;

  const dispatch = useDispatch<any>();
  const landingPageDataGet = useSelector(
    (state: any) => state.landingPageDataGet
  );
  const { data } = landingPageDataGet;

  useEffect(() => {
    dispatch(getLandingPageData());
    removeAllKeyFromLocalStorage();
  }, [dispatch]);

  return (
    <div className="w-screen h-full bg-white overflow-y-auto overflow-x-hidden">
      <div className="relative w-full">
        <img
          className="absolute h-full w-full p-20"
          style={{ opacity: "75%" }}
          src={landingPageGrid}
          alt={"grid"}
        />
        <div className="px-8 pt-36 ">
          {/* <Section1 /> */}
          <div className="z-10">
            <h1 className="font-custom text-gray-500 text-center">END - TO - END CAMPAIGN MANAGEMENT PLATFORM</h1>
            <h1 className="font-custom text-[80px] w-3/4 text-center">experience the most <span>advanced</span> dooh advertising...</h1>
          </div>
          <FloatingBrandIcon />
        </div>
      </div>
     
      <div className="px-8">
          <FlowHorizontalScroll />
      </div>
      
      <div className="px-8 ">
        <HowItsWork />
      </div>
      
      <div className="px-8 ">
        <OurAdvertisingJourney data={data} />
      </div>
      
      <div className="px-8 ">
        <ProohCreator />
      </div>
      
      <div className="px-8 ">
        <FeedBack />
      </div>
      
      <div className="px-8 ">
        <ContactForm />
      </div>
      
      <div className="px-8 ">
        <FindUsOnGoogle />
      </div>
      
      <div className="">
        <CreateCampaignOption />
      </div>
      
      <div className="">
        <PageFooter />
      </div>
    </div>
  );
};