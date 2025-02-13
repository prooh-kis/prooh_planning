import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
// import { ADD_SCREEN_CODE_RESET } from "../../../constants/screenDataConstant";
import userImage from "../../assets/userImage.png";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import {
  AUTH,
  ADVERTISERS_PAGE,
  MEDIA_OWNER_PAGE,
  SIGN_UP,
} from "../../routes/routes";

// import { getCreatives } from "../../../actions/creativeAction";
// import { USER_ROLE_PRIMARY } from "../../../constants/userConstants";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

  const data = [
    {
      title: "Home",
      path: `https://plan.prooh.ai/`,
    },
    {
      title: "Advertisers",
      path: `https://plan.prooh.ai/${ADVERTISERS_PAGE}`,
    },
    {
      title: "Media Owner",
      path: `https://plan.prooh.ai/${MEDIA_OWNER_PAGE}`,
    },
    {
      title: "Research",
      path: "https://prooh-dmp.vercel.app",
    },
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-16 bg-[#FFFFFF] flex items-center justify-between fixed z-50 sm:px-10 px-4 border-b">
      {/* Logo Section */}
      <div className="flex items-center">
        <div
          className="flex flex-col items-center justify-center cursor-pointer p-2"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-[-0.02em]">
            PROOH.AI
          </h1>
        </div>
      </div>

      {/* Navigation Links */}
      {!userInfo && (
        <div className="hidden md:block md:flex items-center gap-4">
          {data?.map((d1) => (
            <button
              key={d1.title}
              type="button"
              onClick={() => window.open(d1.path)}
              className={`${
                location.pathname === d1.path
                  ? "text-sm lg:text-base font-semibold text-[#0094FF] border-b-2 border-[#129BFF] py-5"
                  : "text-sm lg:text-base py-1"
              }`}
            >
              {d1.title}
            </button>
          ))}
        </div>
      )}

      {/* User Info or Auth Buttons */}
      {userInfo ? (
        <div className="flex items-center space-x-2 pr-4">
          <img
            src={userImage}
            alt="User"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <div className="truncate">
            <h3 className="text-md sm:text-lg font-semibold">
              {userInfo.name}
            </h3>
            <p className="text-xs font-semibold text-gray-700">
              {userInfo.userRole}
            </p>
          </div>
          <Menu userInfo={userInfo} />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(AUTH)}
            className="bg-[#129BFF] text-[#FFFFFF] rounded-full px-4 py-2 text-sm sm:text-base font-bold hover:bg-[#FFFFFF] hover:text-[#129BFF] border hover:border-[#129BFF] hidden md:block "
          >
            Login
          </button>
          <button
            onClick={() => navigate(SIGN_UP)}
            className="bg-[#FFFFFF] text-[#888888] border border-[#DBDBDB] rounded-full px-4 py-2 text-sm sm:text-base font-bold hover:bg-[#888888] hover:text-[#FFFFFF] hidden md:block"
          >
            Sign Up
          </button>
          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              title="dropdown"
              type="button"
              onClick={handleMenuToggle}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-16 right-4 bg-[#FFFFFF] shadow-md rounded-lg w-48 z-50"
            >
              <ul className="flex flex-col p-2">
                <li className="border-b">
                  <button
                    onClick={() => {
                      navigate("/");
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                  >
                    Home
                  </button>
                </li>
                <li className="border-b">
                  <button
                    onClick={() => {
                      navigate(ADVERTISERS_PAGE);
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                  >
                    Advertisers
                  </button>
                </li>
                <li className="border-b">
                  <button
                    onClick={() => {
                      navigate(MEDIA_OWNER_PAGE);
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                  >
                    Media Owners
                  </button>
                </li>
                <li className="border-b">
                  <a href="https://prooh-dmp.vercel.app/">
                    <button
                      onClick={() => {
                        // navigate(MEDIA_OWNER_PAGE);

                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                    >
                      Research
                    </button>
                  </a>
                </li>

                <li className="">
                  <button
                    onClick={() => {
                      navigate(AUTH);
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                  >
                    Get In
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
