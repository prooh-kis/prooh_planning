import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import "react-toastify/dist/ReactToastify.css";
import userImage from "../../assets/userImage.png";
import { AUTH } from "../../routes/routes";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
} from "../../constants/userConstants";
import ButtonInput from "../../components/atoms/ButtonInput";
import { Planner } from "../../assets";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const handleClick = () => {
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  return (
    <header className="sticky top-0 w-full h-16 flex items-center border-b border-gray-50 justify-between px-4 sm:px-10 bg-[#FFFFFF] z-50 font-custom">
      {/* Logo Section */}
      <div className="flex items-center gap-2" onClick={handleClick}>
        {/* <h1 className="text-xl font-black">PROOH.AI</h1> */}
        <img src={Planner} className="h-8 w-8" alt="Planner" />
        <div className="">
          <h1 className="text-[16px] text-[#1E376E] font-black">Planner</h1>
          <p className="text-[10px] text-[#6F7F8E]">
            powered by <span className="italic">PROOH.AI</span>
          </p>
        </div>
      </div>

      {/* User Info or Auth Buttons */}
      {userInfo ? (
        <div className="flex items-center space-x-2 pr-4 relative">
          <img
            src={userInfo?.avatar || userImage}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="truncate">
            <h3 className="font-custom text-lg font-semibold">
              {userInfo.name}
            </h3>
            <p className="font-custom text-xs font-bold text-gray-700">
              {userInfo.userRole === CAMPAIGN_PLANNER
                ? "PLANNER"
                : userInfo.userRole === CAMPAIGN_MANAGER
                ? "MANAGER"
                : userInfo?.userRole}
            </p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <Menu userInfo={userInfo} />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ButtonInput onClick={() => navigate(AUTH)} rounded="full">
            Sign In
          </ButtonInput>
        </div>
      )}
    </header>
  );
};
