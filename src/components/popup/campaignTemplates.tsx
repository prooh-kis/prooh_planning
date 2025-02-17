import { useEffect, useState } from "react";
import { TemplateCard } from "../atoms/TemplateCard";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { message } from "antd";

export const CampaignTemplates: React.FC = () => {
  const navigate = useNavigate();

  // Track the index of the selected card
  const [selectedCard, setSelectedCard] = useState<number>(0);

  const allPlans = [{
    id: 0,
    label: "Regular Plan",
    icon: "fi fi-sr-megaphone",
    link: "regularplan",
    description: "A regular campaign plan for DOOH media offers a flexible and comprehensive approach, allowing advertisers to target audiences based on demographics, behaviors, and locations while selecting DOOH inventory near key store locations. This plan also provides the option to incorporate triggers such as weather, time of day, or traffic conditions to enhance relevance and engagement. By combining audience targeting, strategic location selection, and real-time triggers, advertisers can optimize reach, impact, and campaign performance efficiently.",
    color: "#8B5CF6",
  },{
    id: 1,
    label: "I Know It All Plan",
    icon: "fi fi-sr-head-side-brain",
    link: "iknowitallplan",
    description: `An "I Know It All" campaign plan for DOOH media is designed for advertisers who have precise knowledge of the DOOH inventory they want to target. This plan involves selecting specific screens or locations based on audience insights, historical performance, or strategic brand positioning. Since the advertiser controls the placements, the campaign can be optimized for maximum impact by choosing the best time slots, locations, and content variations. This approach ensures efficient budget allocation and a high return on investment by delivering ads exactly where and when they matter most`,
    color: "#3B82F6",
  },{
    id: 2,
    label: "Topical Day Plan",
    icon: "fi fi-sr-calendar-star",
    link: "specialdayplan",
    description: "A special day campaign plan for DOOH media is a one-day advertising strategy designed to maximize impact on a specific occasion, such as a holiday, product launch, or major event. Ads are scheduled to appear at high-traffic locations and peak times, leveraging dynamic content, countdowns, or real-time updates to create urgency and engagement. By focusing on a single day, this campaign ensures high visibility and relevance, driving awareness, foot traffic, or immediate action from the target audience.",
    color: "#F59E0B",
  },{
    id: 3,
    label: "Trigger Based Plan",
    icon: "fi fi-sr-condition-alt",
    link: "triggerbasedplan",
    description: "A trigger-based campaign plan for DOOH (Digital Out-of-Home) media involves dynamically activating ads based on real-time conditions or predefined triggers. These triggers can include factors such as weather changes, audience demographics, traffic patterns, time of day, or external data feeds (e.g., sports scores or stock market updates). By leveraging data-driven automation, advertisers can ensure that their messages appear at the most relevant moments, maximizing engagement and campaign effectiveness while optimizing ad spend",
    color: "#22C55E",
  },{
    id: 4,
    label: "Store Based Plan",
    icon: "fi fi-sr-shop",
    link: "storebasedplan",
    description: "A store location-based campaign plan for DOOH media focuses on delivering ads near specific retail locations to drive foot traffic and conversions. These campaigns use geo-fencing and audience data to target screens within a defined radius of a store, triggering relevant ads based on proximity, time of day, or consumer behavior. This approach ensures that potential customers see compelling offers or promotions when they are most likely to visit, enhancing engagement and optimizing ad effectiveness",
    color: "#EF4444",
  }]

  // Handle card click, setting the clicked card's index
  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  const handleNext = () => {
    if (selectedCard === null) {
      message.error("Please select campaign type");
    } else {
      if (selectedCard === 0) {
        navigate("/regularplan");
      } else if (selectedCard === 1) {
        navigate("/specialdayplan");
      } else if (selectedCard === 2) {
        navigate("/triggerbasedplan");
      } else if (selectedCard === 3) {
        navigate("/storebasedplan");
      } else if (selectedCard === 4) {
        navigate("/iknowitallplan");
      }
    }
  };

  useEffect(() => {
    removeAllKeyFromLocalStorage();
  }, []);

  return (
    <div className="p-10 mt-16 flex items-center justify-center w-full h-full bg-gray-50">
      <div className="border border-transparent rounded-lg w-full h-full">
        <div className="flex flex-col items-start justify-start p-2">
          <h1 className="font-custom text-[24px] font-bold text-start text-primaryText">
            Select Your Campaign Type
          </h1>
          <p className="text-[14px] font-sans text-secondaryText">
            Choose any one of the following and start planning your campaign
            instantly
          </p>
        </div>
        <div className="grid grid-cols-12 gap-8 py-8">
          <div className="col-span-4 rounded-[16px] bg-white px-4 py-4">
            {allPlans?.map((plan: any, i: any) => (
              <div
                key={plan.id}
                onClick={() => {
                  handleCardClick(plan.id)
                }}
                className={`${selectedCard === plan.id ? "bg-primaryButton" : ""} flex items-center justify-start gap-4 border-b p-4 rounded-[12px] my-2`}
              >
                <span className={`bg-[${selectedCard === plan.id ? "#ffffff" : plan.color}] rounded-full h-8 w-8 flex items-center justify-center`}>
                  <i className={`${plan.icon} flex items-center justify-center ${selectedCard === plan.id ? "text-primaryButton" : "text-white"}`} />
                </span>
                <h1 className={`text-[14px] font-custom ${selectedCard === plan.id ? "text-white font-bold" : "font-semibold"}`}>
                  {plan.label}
                </h1>
              </div>
            ))}
          </div>
          <div className="col-span-8 rounded-[16px] bg-white px-8 py-12">
            <div className="flex flex-col h-full justify-between items-between">
              <div className="">
                <span className={`bg-[${allPlans[selectedCard].color}] rounded-full h-8 w-8 flex items-center justify-center`}>
                  <i className={`${allPlans[selectedCard].icon} flex items-center justify-center text-white `} />
                </span>
                <h1 className="font-custom text-[16px] font-semibold py-2">
                  {allPlans[selectedCard].label}
                </h1>
                <p className="text-wrap text-[12px] text-gray-500">
                  {allPlans[selectedCard].description}
                </p>
              </div>
              <div className="flex justify-start py-4">
                <PrimaryButton
                  title="Start Planing"
                  rounded="rounded-full"
                  action={() => navigate(`${allPlans[selectedCard].link}`)}
                  height="12"
                  width=""
                  textSize="text-[14px]"
                />
              </div>
              
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center p-2">
          <h1 className="text-[24px] font-sans font-bold text-center text-primaryText">
            Create A Campaign
          </h1>
          <p className="text-[14px] font-sans text-secondaryText">
            Choose any one of the following and start planning your campaign
            instantly
          </p>
        </div> */}

        {/* <div className="py-[20px] w-full flex flex-wrap justify-center gap-[20px]">
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Regular Campaign"
              paratext="Plan a complete outdoor campaign based on your target audiences"
              icon="fi fi-sr-megaphone"
              color="#0091E3"
              isSelected={selectedCard === 0}
              handleCardClick={() => navigate("/regularplan")}
            />
          </div>
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Special Day"
              paratext="Create campaigns based for your special day and engage with your target audiences"
              icon="fi fi-sr-calendar-star"
              color="#28A61D"
              isSelected={selectedCard === 1}
              handleCardClick={() => navigate("/specialdayplan")}
            />
          </div>
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Trigger Based"
              paratext="Create campaigns based on specific events trigger and engage with your target audiences"
              icon="fi fi-sr-condition-alt"
              color="#3523D1"
              isSelected={selectedCard === 2}
              handleCardClick={() => navigate("/triggerbasedplan")}
            />
          </div>
        </div>

        <div className="w-full flex justify-center gap-[24px]">
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Store Based"
              paratext="Create campaigns by selecting your desired location without any hassle and plan in express mode"
              icon="fi fi-sr-shop"
              color="#FF5252"
              isSelected={selectedCard === 3}
              handleCardClick={() => navigate("/storebasedplan")}
            />
          </div>
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="I Know It All"
              paratext="Create campaigns by using your experience and some little help from the prooh planner"
              icon="fi fi-sr-head-side-brain"
              color="#FF5E00"
              isSelected={selectedCard === 4}
              handleCardClick={() => navigate("/iknowitallplan")}
            />
          </div>
        </div> */}

      </div>
    </div>
  );
};
