import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import "react-toastify/dist/ReactToastify.css";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import userImage from "../../assets/userImage.png";
import {
  AUTH,
  ADVERTISERS_PAGE,
  MEDIA_OWNER_PAGE,
  SIGN_UP,
  PRODUCTS,
  DATA_HERO,
} from "../../routes/routes";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
} from "../../constants/userConstants";
import ButtonInput from "../../components/atoms/ButtonInput";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

  const BASE_URL = `${window.location.origin}`;

  const navLink = [
    { title: "Home", path: "/" },
    { title: "Products", path: `/products/Fly` },
    { title: "Advertisers", path: `${ADVERTISERS_PAGE}` },
    { title: "Media Owner", path: `${MEDIA_OWNER_PAGE}` },
    { title: "Data Hero", path: `${DATA_HERO}` },
  ];

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  return (
    <header className="top-0 w-full h-16 flex items-center border-b border-gray-50 justify-between px-4 sm:px-10 bg-[#FFFFFF] z-50 font-custom">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="cursor-pointer p-2" onClick={handleClick}>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            PROOH.AI
          </h1>
        </div>
      </div>

      {/* User Info or Auth Buttons */}
      {userInfo ? (
        <div className="flex items-center space-x-2 pr-4">
          <img src={userImage} alt="User" className="w-10 h-10 rounded-full" />
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
          <Menu userInfo={userInfo} />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ButtonInput onClick={() => navigate(AUTH)} rounded="full">
            Login
          </ButtonInput>
          <ButtonInput
            onClick={() => navigate(SIGN_UP)}
            variant="outline"
            rounded="full"
          >
            SignUp
          </ButtonInput>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              title="toggl"
              type="submit"
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
              className="absolute top-16 right-4 bg-white shadow-md rounded-lg w-48 z-50"
            >
              <ul className="flex flex-col p-2">
                {navLink.map((item) => (
                  <li key={item.title} className="border-b">
                    <button
                      onClick={() => {
                        if (item.title === "Research") {
                          window.open(`${item.path}`);
                        } else {
                          navigate(`${item.path}`);
                        }
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
                <li>
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
    </header>
  );
};
