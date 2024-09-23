import { useState } from "react";
import { TemplateCard } from "../atoms/TemplateCard";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const CampaignTemplates: React.FC = () => {
  const navigate = useNavigate();

  // Track the index of the selected card
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Handle card click, setting the clicked card's index
  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

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
        <div className="py-[21px] grid grid-cols-3 gap-[24px]">
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
              isSelected={selectedCard === 2} // Check if the card is selected
              handleCardClick={() => handleCardClick(2)} // Pass the card index
            />
          </div>
        </div>
        <PrimaryButton rounded="rounded-[30px]" title="Plan Campaign" action={() => {
            if (selectedCard === 0) {
              navigate("/regularplan");
            } else if (selectedCard === 1) {
              navigate("/specialdayplan");
            } else if (selectedCard === 2) {
              navigate("/triggerbasedplan");
            }
        }} />
      </div>
    </div>
  );
};
