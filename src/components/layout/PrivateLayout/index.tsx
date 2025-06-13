import { useSelector } from "react-redux";
import { Header } from "../../header";
import { useNavigate } from "react-router-dom";
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
  const { userInfo } = useSelector((state: any) => state.auth);
  const padding = props.padding || "pt-16";

  useEffect(() => {
    if (!userInfo) {
      navigate(AUTH);
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
    <div className="h-[100vh] w-full overflow-y-auto no-scrollbar">
      <Header />
      <div
        className={`h-[92vh] overflow-y-auto no-scrollbar px-8 border-t ${padding}`}
      >
        {children}
      </div>
    </div>
  );
};
