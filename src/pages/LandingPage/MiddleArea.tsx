import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Landing } from "./Landing";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
  SCREEN_OWNER,
} from "../../constants/userConstants";
import { CampaignTemplates } from "../../components/popup";
import nothing_here from "../../assets/icons/nothing_here.svg";
import { signout } from "../../actions/userAction";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    let newTab: Window | null = null;

    if (userInfo && userInfo?.userRole === SCREEN_OWNER) {
      // Open a new tab
      newTab = window.open("https://prooh-cms.vercel.app", "_blank");
      // Close the current window after opening the new one
      window.close();
    }

    return () => {
      // Cleanup: Ensure the newly opened tab is closed when the component unmounts
      if (newTab) {
        newTab.close();
      }
    };
  }, [userInfo]);

  console.log("userInfo?.userRole : ", userInfo?.userRole);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {userInfo &&
      (userInfo?.userRole === CAMPAIGN_PLANNER ||
        userInfo?.userRole === CAMPAIGN_MANAGER) ? (
        <CampaignTemplates />
      ) : userInfo && userInfo?.userRole === SCREEN_OWNER ? (
        <div
          className="p-8"
          onClick={() => {
            dispatch(signout());
          }}
        >
          <div>
            <img
              src={nothing_here}
              alt="nothing_here"
              className="h-full w-full max-w-[40vw]"
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <a
              className="font-custom text-[24px] text-center"
              href={"https://prooh-cms.vercel.app/"}
            >
              {"You don't have access to use Prooh Planning Tool,"}
            </a>
            <a
              className="font-custom text-[32px] text-center"
              href={"https://prooh-cms.vercel.app/"}
            >
              {"click to visit Prooh CMS for managing you screens..."}
            </a>
          </div>
        </div>
      ) : (
        <Landing />
      )}
    </div>
  );
};
