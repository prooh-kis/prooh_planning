import { useEffect, useState } from "react";
import { TemplateCard } from "../atoms/TemplateCard";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { message } from "antd";

export const CampaignTemplates: React.FC = () => {
  const navigate = useNavigate();

  // Track the index of the selected card
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

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
    <div className="p-10 flex items-center justify-center w-full h-full">
      <div className="border border-transparent rounded-lg w-full h-full">
        <div className="flex flex-col items-center justify-center p-2">
          <h1 className="text-[24px] font-sans font-bold text-center text-primaryText">
            Create A Campaign
          </h1>
          <p className="text-[14px] font-sans text-secondaryText">
            Choose any one of the following and start planning your campaign
            instantly
          </p>
        </div>

        {/* First row with 3 cards */}
        <div className="py-[20px] w-full flex flex-wrap justify-center gap-[20px]">
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Regular Campaign"
              paratext="Plan a complete outdoor campaign based on your target audiences"
              icon="fi fi-sr-megaphone"
              color="#0091E3"
              isSelected={selectedCard === 0}
              handleCardClick={() => handleCardClick(0)}
              navigate={() => navigate("/regularplan")}
            />
          </div>
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Special Day"
              paratext="Create campaigns based for your special day and engage with your target audiences"
              icon="fi fi-sr-calendar-star"
              color="#28A61D"
              isSelected={selectedCard === 1}
              handleCardClick={() => handleCardClick(1)}
              navigate={() => navigate("/specialdayplan")}
            />
          </div>
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Trigger Based"
              paratext="Create campaigns based on specific events trigger and engage with your target audiences"
              icon="fi fi-sr-condition-alt"
              color="#3523D1"
              isSelected={selectedCard === 2}
              handleCardClick={() => handleCardClick(2)}
              navigate={() => navigate("/triggerbasedplan")}
            />
          </div>
        </div>

        {/* Second row with 2 centered cards */}
        <div className="w-full flex justify-center gap-[24px]">
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="Store Based"
              paratext="Create campaigns by selecting your desired location without any hassle and plan in express mode"
              icon="fi fi-sr-shop"
              color="#FF5252"
              isSelected={selectedCard === 3}
              handleCardClick={() => handleCardClick(3)}
              navigate={() => navigate("/storebasedplan")}
            />
          </div>
          <div className="flex w-1/4 justify-center items-center">
            <TemplateCard
              text="I Know It All"
              paratext="Create campaigns by using your experience and some little help from the prooh planner"
              icon="fi fi-sr-head-side-brain"
              color="#FF5E00"
              isSelected={selectedCard === 4}
              handleCardClick={() => handleCardClick(4)}
              navigate={() => navigate("/iknowitallplan")}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <PrimaryButton
            rounded="rounded-[30px]"
            title="Plan Campaign"
            action={handleNext}
          />
        </div>
      </div>
    </div>
  );
};
