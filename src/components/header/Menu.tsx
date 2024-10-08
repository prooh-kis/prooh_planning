import "./index.css";
// import userImage from "../../assets/userImage.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../actions/userAction";
import { AUTH } from "../../routes/routes";

export const Menu = (props: any) => {
  const { userInfo } = props;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const signOutHandler = () => {
    dispatch(signout());

    navigate(AUTH);
  };

  return (
    <div className="dropdown">
      <i className="fi fi-ss-angle-down"></i>
      <div className="dropdown-content">
        {/* <div
          // onClick={() => navigate(USER_PROFILE)}
          className="flex flex-row gap-4 border border-1 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            <img
              src={userImage}
              alt="profile"
              className="w-6 h-6"
              title="profile"
            />
          </div>
          <h1 className="text-black-1000">Profile</h1>
        </div> */}
        {/* <div
          // onClick={() => navigate(USERS)}
          className="flex flex-row gap-4 border border-1 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            <img
              src={userImage}
              alt="profile"
              className="w-6 h-6"
              title="profile"
            />
          </div>
          <h1 className="text-black-1000">My User</h1>
        </div> */}
     
        <div
          // onClick={() => navigate(CAMPAIGNS)}
          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdCampaign className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">My Campaigns</h1>
        </div>
        <div
          // onClick={() => navigate(MY_CREATIVES)}
          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdOutlinePermMedia className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">My Creatives</h1>
        </div>
        <div
          onClick={signOutHandler}
          className="flex flex-row gap-4 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <IoMdPower className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">Log out</h1>
        </div>
      </div>
    </div>
  );
};
