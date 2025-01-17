import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageData } from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { LANDING_PAGE_DATA } from "../../constants/localStorageConstants";
import { CreateCampaignOption } from "../../components";
import { PageFooter } from "../../components/PageFooter";
import {
  FloatingBrandIcon,
  HowItsWork,
  OurAdvertisingJourney,
  Section1,
  MeetOurDataHero,
  FeedBack,
  ProohCreator,
  ContactForm,
  FindUsOnGoogle,
} from "../../components/LoadingPageComponents";

export const Landing: React.FC = () => {
  const dispatch = useDispatch<any>();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const landingPageDataGet = useSelector(
    (state: any) => state.landingPageDataGet
  );
  const { loading, error, data } = landingPageDataGet;

  useEffect(() => {
    dispatch(getLandingPageData());
  },[dispatch])
  return (
    <div className="w-screen h-full">
      <Section1 />
      <FloatingBrandIcon />
      <OurAdvertisingJourney data={data} />
      <HowItsWork />
      <MeetOurDataHero />
      <FeedBack />
      <ProohCreator />
      <ContactForm />
      <FindUsOnGoogle />
      <CreateCampaignOption />
      <PageFooter />
    </div>
  );
};
