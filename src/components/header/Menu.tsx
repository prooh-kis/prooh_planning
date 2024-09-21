import "./index.css";
import userImage from "../../assets/userImage.png";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

export const Menu = (props: any) => {
  const { userInfo } = props;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const signOutHandler = () => {
    // dispatch(signout());

    // navigate(SIGNIN);
  };

  return (
    <div className="dropdown">
      <button className="w-full h-9 border border-solid px-2 py-2 bg-sky-500 rounded-md text-white hover:bg-sky-700">
        {/* <IoMenu /> */}
      </button>
      <div className="dropdown-content">
        <div
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
        </div>
        <div
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
        </div>
        <div
          // onClick={() => navigate(MY_SCREENS)}
          className="flex flex-row gap-4 border border-1 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <CgScreen className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">My Screens</h1>
        </div>
        <div
          // onClick={() => navigate(CAMPAIGNS)}
          className="flex flex-row gap-4 border border-1 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdCampaign className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">My Campaigns</h1>
        </div>
        <div
          // onClick={() => navigate(CART)}
          className="flex flex-row gap-4 border border-1 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <IoCartOutline className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">My Carts</h1>
        </div>
        <div
          // onClick={() => navigate(MY_CREATIVES)}
          className="flex flex-row gap-4 border border-1 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
        >
          <div>
            {/* <MdOutlinePermMedia className="w-6 h-6" /> */}
          </div>
          <h1 className="text-black-1000">My Creatives</h1>
        </div>

        <div
          onClick={signOutHandler}
          className="flex flex-row gap-4 border border-1 items-center py-2 px-2 hover:bg-sky-600 hover:text-white"
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
