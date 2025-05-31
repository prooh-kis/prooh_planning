import { useSelector } from "react-redux";
import { Header } from "../../header";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../../routes/routes";

export const PrivateLayout = (props: any) => {
  const navigate = useNavigate();
  const { children } = props;
  const { userInfo } = useSelector((state: any) => state.auth);
  const padding = props.padding || "pt-16";

  if (!userInfo) navigate(AUTH);

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
