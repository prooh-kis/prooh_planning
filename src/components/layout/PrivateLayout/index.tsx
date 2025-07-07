import { useSelector } from "react-redux";
import { Header } from "../../header";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "../../../routes/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
} from "../../../constants/userConstants";
import { signout } from "../../../actions/userAction";

export const PrivateLayout = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { children } = props;
  const { pathname } = useLocation();

  const { userInfo } = useSelector((state: any) => state.auth);
  const padding = props.padding || "py-2";

  useEffect(() => {
    if (!userInfo) {
      navigate(AUTH, {
        state: {
          path: pathname,
        },
      });
      return;
    }
    switch (userInfo?.userRole) {
      case CAMPAIGN_MANAGER:
        break;
      case CAMPAIGN_PLANNER:
        break;
      default:
        notification.error({
          message: "Error",
          description: "You have no access for planner",
        });
        dispatch(signout());
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <div className="flex-none">
        <Header />
      </div>
      <div className={`flex-1 overflow-y-auto px-6 ${padding}`}>{children}</div>
    </div>
  );
};
