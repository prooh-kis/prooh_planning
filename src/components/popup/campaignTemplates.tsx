import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { allPlansData } from "../../data";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  GET_CAMPAIGN_CREATIONS_DETAILS_RESET,
} from "../../constants/campaignConstants";
import { useDispatch, useSelector } from "react-redux";
import ButtonInput from "../../components/atoms/ButtonInput";
import { CLIENT_POC_USER } from "../../constants/userConstants";
import { MY_CAMPAIGNS_LIST } from "../../routes/routes";

interface Plan {
  id: number;
  label: string;
  icon: string;
  color: string;
  description: string;
  link: string;
}

interface CartProps {
  plan: Plan;
  selectedCard: number;
  handleCardClick: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ plan, handleCardClick, selectedCard }) => {
  const isSelected = selectedCard === plan.id;

  return (
    <div
      key={plan.id}
      onClick={() => handleCardClick(plan.id)}
      className={`row-span-1 flex items-center gap-4 border-b p-4 rounded-[12px] my-1 cursor-pointer transition-all duration-200 ease-in-out 
        ${
          isSelected
            ? "bg-primaryButton"
            : "hover:bg-gray-200 hover:scale-[1.02]"
        }`}
    >
      <span
        className="rounded-full h-8 w-8 flex items-center justify-center"
        style={{ backgroundColor: isSelected ? "#ffffff" : plan.color }}
      >
        <i
          className={`${
            plan.icon
          } text-[16px] flex items-center justify-center ${
            isSelected ? "text-primaryButton" : "text-white"
          }`}
        />
      </span>
      <h1
        className={`text-[16px] font-custom ${
          isSelected ? "text-white font-bold" : "font-semibold"
        }`}
      >
        {plan.label}
      </h1>
    </div>
  );
};

export const CampaignTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const dispatch = useDispatch<any>();

  const { userInfo } = useSelector((state: any) => state.auth);
  useEffect(() => {
    removeAllKeyFromLocalStorage();
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
    dispatch({ type: GET_CAMPAIGN_CREATIONS_DETAILS_RESET });
  }, [dispatch]);

  const handleCardClick = (id: number) => {
    setSelectedCard(id);
  };

  const toggle = () => {
    navigate(allPlansData[selectedCard]?.link || "/");
  };

  useEffect(() => {
    if (userInfo?.userRole === CLIENT_POC_USER) {
      navigate(MY_CAMPAIGNS_LIST);
    }
  }, [navigate, userInfo]);

  return (
    <div className="border border-transparent rounded-lg w-full h-full">
      <div className="flex flex-col items-start p-2 bg-[#FFFFFF]">
        <h1 className="font-custom text-[24px] font-bold text-primaryText">
          Select Your Campaign Type
        </h1>
        <p className="text-[12px] text-secondaryText py-2">
          Choose any one of the following and start planning your campaign
          instantly
        </p>
      </div>
      <div className="grid grid-cols-12 gap-8 py-8 bg-[#FFFFFF] mt-2 h-[80vh]">
        <div className="col-span-4 rounded-[16px] bg-white px-4 ">
          {allPlansData.map((plan: any) => (
            <Cart
              key={plan.id}
              plan={plan}
              selectedCard={selectedCard}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
        <div className="col-span-8 rounded-[16px] bg-white px-8">
          <div className="flex flex-col justify-between">
            <div>
              <span
                className={`bg-[${allPlansData[selectedCard].color}] rounded-full h-16 w-16 flex items-center justify-center`}
              >
                <i
                  className={`${allPlansData[selectedCard].icon} text-[28px] text-white flex items-center justify-center`}
                />
              </span>
              <h1 className="font-custom text-[28px] font-semibold py-4 border-b">
                {allPlansData[selectedCard].label}
              </h1>
              <p className="font-custom text-[14px] text-gray-500 my-4">
                {allPlansData[selectedCard].description}
              </p>
            </div>
            <div className="flex justify-start py-4">
              <ButtonInput rounded="full" onClick={toggle}>
                Start Planning
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
