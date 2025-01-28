import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../actions/userAction";
import { Header } from "../../components/header";
import {
  AUTH,
  MY_CAMPAIGNS_LIST,
  MY_PLANS_LIST,
  USERS,
} from "../../routes/routes";

interface AppDashBoardLayoutProps {
  children: React.ReactNode;
  value: string;
}

export const AppDashBoardLayout: React.FC<AppDashBoardLayoutProps> = ({
  children,
  value,
}) => {
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string>(value);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  console.log("userrrrrrrrrr : ", userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate(AUTH);
    }
  }, [userInfo, navigate]);

  const menuItems = [
    {
      value: "Campaigns",
      path: MY_CAMPAIGNS_LIST,
      icon: "fi fi-sr-megaphone ",
      option: "Campaigns",
    },
    {
      value: "Plan List",
      path: MY_PLANS_LIST,
      icon: "fi fi-sr-photo-video ",
      option: "Plan List",
    },

    {
      value: "Users",
      path: USERS,
      icon: "fi fi-sr-users-alt ",
      option: "Users",
    },
  ];

  const handleMenuClick = (index: number) => {
    setCurrent(menuItems[index].option);
    navigate(menuItems[index].path);
  };

  const handleSignOut = () => {
    if (window.confirm("Do you want to log out?")) {
      dispatch(signout());
      navigate(AUTH);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 overflow-y-scroll no-scrollbar ">
      <Header />
      <div className="flex mt-1 gap-1">
        {/* Sidebar */}
        <div className="h-[99vh] w-[15vw] bg-white overflow-y-auto flex flex-col">
          <div className="flex flex-col justify-between h-full pt-2 px-2">
            {/* Menu Items */}
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuClick(index)}
                  className={`flex items-center gap-2 px-2 rounded-lg text-md  py-2 cursor-pointer ${
                    current === item.option
                      ? "text-[#129BFF] font-bold bg-[#ECF7FF]"
                      : "text-[#8D9DA7] font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`h-6 w-[3px] ${
                        current === item.option ? "bg-[#129BFF]" : ""
                      }`}
                    ></div>
                    <i className={item.icon}></i>
                  </div>
                  <span>{item.option}</span>
                </div>
              ))}
            </div>
            {/* Logout */}
            <div
              onClick={handleSignOut}
              className={`flex items-center gap-4 px-2 py-1 rounded-lg text-md cursor-pointer ${
                current === "Log out"
                  ? "text-[#129BFF] font-bold bg-[#ECF7FF]"
                  : "text-[#8D9DA7] font-semibold"
              }`}
            >
              <div className="flex items-center gap-6">
                <div
                  className={`h-6 w-[3px] ${
                    current === "Log out" ? "bg-[#129BFF]" : ""
                  }`}
                ></div>
                <i className="fi fi-br-power"></i>
              </div>
              <span>Log out</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="h-[99vh] w-full overflow-y-scroll no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
