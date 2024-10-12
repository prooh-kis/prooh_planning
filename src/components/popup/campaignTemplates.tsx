import { useEffect, useState } from "react";
import { TemplateCard } from "../atoms/TemplateCard";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";

export const CampaignTemplates: React.FC = () => {
  const navigate = useNavigate();

  // Track the index of the selected card
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [campaignType, setCampaignType] = useState<string>("Regular");

  // Handle card click, setting the clicked card's index
  const handleCardClick = (index: number) => {
    setSelectedCard(index);
    if (index === 1) {
      setCampaignType("Special");
    } else if (index === 2) {
      setCampaignType("Trigger");
    } else {
      setCampaignType("Regular");
    }

  };
  useEffect(() => {
    removeAllKeyFromLocalStorage();
  },[]);
  return (
    <div className="p-20 flex items-center justify-center w-full h-full">
      <div className="border border-transparent rounded-lg w-full h-full">
        <div className="grid justify-center p-2">
          <h1 className="text-[24px] font-sans font-bold text-center text-primaryText">
            Create A Campaign
          </h1>
          <p className="text-[14px] font-sans text-secondaryText">
            Choose any one of the following and start planning your campaign instantly
          </p>
        </div>
        <div className="py-[21px] grid grid-cols-4 gap-[24px]">
          <div className="col-span-1 flex justify-center items-center">
            <TemplateCard
              text="Regular Campaign"
              paratext="Create campaigns based on specific events trigger and engage with your target audiences"
              icon="megaphone"
              color="#0091E3"
              isSelected={selectedCard === 0} // Check if the card is selected
              handleCardClick={() => handleCardClick(0)} // Pass the card index
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <TemplateCard
              text="Special Day"
              paratext="Create campaigns based on specific events trigger and engage with your target audiences"
              icon="calendar-star"
              color="#28A61D"
              isSelected={selectedCard === 1} // Check if the card is selected
              handleCardClick={() => handleCardClick(1)} // Pass the card index
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <TemplateCard
              text="Trigger Based"
              paratext="Create campaigns based on specific events trigger and engage with your target audiences"
              icon="condition-alt"
              color="#3523D1"
              isSelected={selectedCard === 3} // Check if the card is selected
              handleCardClick={() => handleCardClick(3)} // Pass the card index
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <TemplateCard
              text="I Know It All"
              paratext="Create campaigns by selecting your desired location without any hassle and plan in express mode"
              icon="shop"
              color="#FF5252"
              isSelected={selectedCard === 2} // Check if the card is selected
              handleCardClick={() => handleCardClick(2)} // Pass the card index
            />
          </div>
        </div>
        <PrimaryButton rounded="rounded-[30px]" title="Plan Campaign" action={() => {
            if (selectedCard === 0) {
              navigate("/regularplan", { state: { campaignType: campaignType }});
            } else if (selectedCard === 1) {
              navigate("/specialdayplan");
            } else if (selectedCard === 2) {
              navigate("/triggerbasedplan");
            } else if (selectedCard === 3) {
              navigate("iknowitall");
            }
        }} />
      </div>
    </div>
  );
};
