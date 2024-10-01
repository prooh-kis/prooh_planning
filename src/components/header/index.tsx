import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
// import { ADD_SCREEN_CODE_RESET } from "../../../constants/screenDataConstant";
import userImage from "../../assets/userImage.png";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { AUTH } from "../../routes/routes";

// import { getCreatives } from "../../../actions/creativeAction";
// import { USER_ROLE_PRIMARY } from "../../../constants/userConstants";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const [isPopupOpen1, setIsPopupOpen1] = useState<boolean>(false);
  const [isPopupOpenScreenCode, setIsPopupOpenScreenCode] =
    useState<boolean>(false);

  const [isOpenSaveCreatives, setIsOpenSaveCreatives] =
    useState<boolean>(false);
  const [screenOptions, setScreenOptions] = useState<any>([]);

  const handleCloseModel = () => {
    setIsOpenSaveCreatives(false);
  };

  const handleCloseModelScreenCode = () => {
    setIsPopupOpenScreenCode(false);
  };

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const openErrorToast = (message: string) => {
    toast.error(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  const openSuccessToast = (message: string) => {
    toast.success(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  const closePopup1 = () => {
    setIsPopupOpen1(false);
  };
  const handleGoToPlanCampaign = () => {
    removeAllKeyFromLocalStorage();
    navigate("/create-campaign");
  };

  const handleSetOpenModel = () => {
    // if (userInfo?.userRole == USER_ROLE_PRIMARY) {
    //   setIsPopupOpen1(true);
    // } else {
    //   openErrorToast("You have no access");
    // }
  };

  const handleSetOpenScreenCodeModel = () => {
    // if (userInfo?.userRole == USER_ROLE_PRIMARY) {
    //   setIsPopupOpenScreenCode(true);
    // } else {
    //   openErrorToast("You have no access");
    // }
  };

  useEffect(() => {
    // console.log("useEffect render");
    // if (userInfo) dispatch(getCreatives());
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.isMaster) {
      // dispatch(getAllScreensByUserId());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="w-full h-16 bg-white border border-b flex items-center justify-between fixed z-50">
      <div className="col-span-2 flex items-center mx-10">
        <ToastContainer />
        <div
          className="flex flex-col mb-2 -space-y-1 pt-2"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-black">Prooh.Ai</h1>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-end">
        {userInfo ? (
          <div className="h-10 w-auto flex items-center space-x-2 pr-10">
            <div className="h-10 flex items-center gap-2">
              <img src={userImage} alt="userImage" className="h-10" />
              <div className="justify-center w-30 truncate">
                <h3 className="text-lg">
                  {userInfo.name}
                </h3>
                <p className="text-xs font-semibold text-gray-700">
                  {userInfo.isBrand && "Campaign Planner"}
                </p>
              </div>
              <div>
                <Menu userInfo={userInfo} />
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4">
            <PrimaryButton 
              title={"Get In"}
              rounded={"rounded-md"}
              width={"w-[80px]"}
              height={"h-[32px]"}
              action={() => navigate(AUTH)}
            />
          </div>
        )}
        
      </div>
    </div>
  );
};
