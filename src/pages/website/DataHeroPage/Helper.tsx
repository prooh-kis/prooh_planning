import ButtonInput from "../../../components/atoms/ButtonInput";
import React, { useEffect, useState } from "react";
import { IdentificationFormForDataHeroPopup } from "./IdentificationFormForDataHeroPopup";
import { LocationEntryPopup } from "./LocationEntryPopup";
import { useDispatch } from "react-redux";
import { registerHeroData } from "../../../actions/dataHeroAction";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { ADD_HERO_DATA_DETAILS_RESET } from "../../../constants/dataHeroConstants";

const MyDiv = ({ title, bgColor }: { title: string; bgColor: string }) => {
  return (
    <div className="flex gap-4">
      {title?.split("-")?.map((smallTitle: string) => (
        <div
          key={smallTitle}
          style={{ backgroundColor: bgColor }} // Apply dynamic color here
          className="rounded-[5px] text-[#254354] text-[16px] leading-6 tracking-normal font-[Plus Jakarta Sans] py-1 px-6 max-w-[519px]"
        >
          {smallTitle}
        </div>
      ))}
    </div>
  );
};

const case1 = [
  { title: "The respondents have to edit the %.", bgColor: "#F1F2FF" },
  { title: "There are 50 cells which needs action.", bgColor: "#F1FFFB" },
  { title: "This takes about 30 mins.", bgColor: "#FFEDD8" },
  {
    title:
      "our data expert is available to short your understanding if any can be reached at +9810666666",
    bgColor: "#FDFAFF",
  },
  {
    title:
      "Upon completion of the form, the respondent gets INR 5K credited to his bank account.",
    bgColor: "#FFF9F2",
  },
];

const case2 = [
  {
    title: "Regional Sales Heads of Premium QSR's in Delhi NCR",
    bgColor: "#F1F2FF",
  },
  { title: "F&B Real estate Brokerage firms.", bgColor: "#F1FFFB" },
  {
    title: "OOH media buying experts in buying OOH media in delhi NCR.",
    bgColor: "#FFEDD8",
  },
  {
    title:
      "Media owner in Delhi NCR with avg turnover of running 100+post covid.",
    bgColor: "#FDFAFF",
  },
];

const case3 = [
  {
    title: "We are currently looking to seek data in the following cities",
    bgColor: "#F1F2FF",
  },
  { title: "Delhi", bgColor: "#F1F2FF" },
  {
    title: "We are currently looking to seek data in the following Touchpoints",
    bgColor: "#F1FFFB",
  },
  { title: "Road Networks-F&B Clusters-Premium Offices", bgColor: "#F1FFFB" },
];

const icons = ["fi fi-rr-search-alt", "fi fi-sr-user", "fi fi-sr-marker"];

const Helper = () => {
  const [currentCase, setCase] = useState<string>("1");
  const [open, setOpen] = useState<boolean>(false);
  const [locationOpen, setLocationOpen] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  const [data, setData] = useState<any>({});

  const heroDataRegister = useSelector((state: any) => state.heroDataRegister);
  const { loading, error, success, data: response } = heroDataRegister;

  const getData = () => {
    return currentCase === "1" ? case1 : currentCase === "2" ? case2 : case3;
  };
  const handleSave = (values: any) => {
    setData(values);
    setOpen(false);
    setLocationOpen(true);
  };
  const handleSave2 = (values: any) => {
    console.log("dfgrttrrrrrrr  : ", {
      ...data,
      email: data.email.toLowerCase(),
      ...values,
    });

    dispatch(
      registerHeroData({
        ...data,
        email: data.email.toLowerCase(),
        ...values,
      })
    );
    setLocationOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCase((prevCase) => {
        if (prevCase === "1") return "2";
        if (prevCase === "2") return "3";
        return "1"; // Reset to "1" after "3"
      });
    }, 15000); // 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (success) {
      notification.success({
        message: "Success Register",
        description: "Successfully registered, check your email",
      });
      dispatch({ type: ADD_HERO_DATA_DETAILS_RESET });
    }

    if (error) {
      notification.error({
        message: "Error Register",
        description: error,
      });

      dispatch({ type: ADD_HERO_DATA_DETAILS_RESET });
    }
  }, [success, error]);

  return (
    <div className="w-full h-full font-custom pt-4">
      <IdentificationFormForDataHeroPopup
        open={open}
        setOpen={setOpen}
        handleSave={handleSave}
      />

      <LocationEntryPopup
        open={locationOpen}
        setOpen={setLocationOpen}
        handleSave={handleSave2}
      />
      <div className="w-full h-[95vh] grid grid-cols-12 bg-gradient-to-b from-[#F6FFFA] to-[#FFFFFF] p-12">
        <div className="w-full col-span-6">
          <div className="flex flex-col justify-start gap-4">
            <div className="mt-8">
              <i className="fi fi-ss-bolt text-[42px] text-[#3A9868]"></i>
            </div>
            <h1 className="font-bold text-[64px] text-[#244433] leading-[58px] tracking-tight w-[449px]">
              Become Our Data Hero
            </h1>
            <p className="mt-4 font-normal text-[14px] text-[#2D5087] leading-7 tracking-normal w-[480px]">
              {" "}
              Approval Shall Be Granted In{" "}
              <span className="font-bold">24 </span> hours post application and
              The Research Paper Shall Be Completed In{" "}
              <span className="font-bold">48 </span> Hours Window Thereafter.
            </p>
            <div className="mt-4 flex gap-4">
              <ButtonInput
                className="bg-[#3A9868] hover:bg-[#3A9868]"
                icon={<i className="fi fi-bs-arrow-up-right text-[14px]"></i>}
                iconPosition="right"
                size="large"
                rounded="large"
                onClick={() => setOpen(true)}
              >
                Participate
              </ButtonInput>
              <ButtonInput
                className="text-[#3A9868] border-[#3A9868] hover:bg-[#3A9868]"
                size="large"
                rounded="large"
                variant="outline"
                onClick={() => window.open("https://prooh-dmp.vercel.app/")}
              >
                See Historical Data
              </ButtonInput>
            </div>
            <div className="mt-8 flex gap-4 items-center">
              <div className="flex">
                {[1, 2, 3].map((key: number) => (
                  <div className="h-8 w-8 rounded-full border" key={key} />
                ))}
              </div>
              <h1 className="text-[#0C0C0C] text-[14px] font-normal leading-6 tracking-normal">
                <span className="font-bold">+64 </span> Respondents have already
                participated
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full col-span-6">
          <div className="flex gap-8">
            <div className="flex flex-col gap-4 items-center justify-center">
              {icons?.map((icon: string, index: number) => (
                <button
                  key={`${icon}-${index}`}
                  type="button"
                  className={`h-8 w-8 border rounded-full flex justify-center items-center 
            hover:bg-gray-100 transition-colors 
            ${
              currentCase === `${index + 1}`
                ? "bg-[#3A9868] text-white"
                : "bg-[#E1F7EE] text-[#ABD7C5]"
            }`}
                  onClick={() => setCase(`${index + 1}`)}
                  aria-label={`Select case ${index + 1}`}
                >
                  <i className={`${icon} text-base`} />
                </button>
              ))}
            </div>
            <div className="flex flex-col justify-start gap-4">
              <div className="mt-8"></div>
              <h1 className="text-[#254354] text-[24px] font-extrabold leading-1 tracking-normal">
                {currentCase === "1"
                  ? "1. Scope Of Work"
                  : currentCase === "2"
                  ? "2. Eligibility Criteria"
                  : "3. Region focussed!!"}
              </h1>
              <div className="flex flex-col mt-4 gap-4">
                {getData()?.map((data: any, index: number) => (
                  <MyDiv
                    title={data?.title}
                    bgColor={data?.bgColor} // Apply color directly
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Helper;
