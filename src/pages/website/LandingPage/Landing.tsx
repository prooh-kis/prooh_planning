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
  NewSection1,
  FeedBack,
  ProohCreator,
  ContactForm,
  FindUsOnGoogle,
  FlowDiagramWeb,
  FlowHorizontalScroll,
  NewSection2,
  NewSection3
} from "../../../components/LoadingPageComponents";
import landingPageGrid from "../../../assets/images/landingPageGrid.png";
import ButtonInput from "../../../components/atoms/ButtonInput";


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
          className="absolute h-full w-full px-20 pt-48"
          style={{ opacity: "75%" }}
          src={landingPageGrid}
          alt={"grid"}
        />
        <div className="px-8 pt-36 ">
          {/* <Section1 /> */}
          <NewSection1 />
          {/* <FloatingBrandIcon /> */}
        </div>
      </div>
     
      <div className="p-8">
        <NewSection2 />
        <NewSection3 />
        {/* <FlowHorizontalScroll /> */}
        <i className="" />
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