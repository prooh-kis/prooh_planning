import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { ChangePassword } from "./ChangePassword";
import { TabWithoutIcon } from "../../components/index";
import { AUTH } from "../../routes/routes";

export function Setting() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (!userInfo) {
      navigate(AUTH, { state: { path: "/setting" } });
    }
  }, [userInfo]);

  return (
    <div className="w-full bg-gray-100 m-0">
      <div className="bg-white w-auto rounded-[4px] mr-2">
        <div className="flex justify-between pr-8 border-b">
          <div className="flex gap-4 items-center p-4 ">
            <i className="fi fi-sr-user-pen flex items-center justify-center text-[#8B5CF680]"></i>
            <h1 className="text-[16px] font-semibold">Setting</h1>
          </div>
        </div>
      </div>

      <div className="border-gray-200 bg-[#FFFFFF] px-4  border-t">
        <TabWithoutIcon
          currentTab={selectedTab}
          setCurrentTab={setSelectedTab}
          tabData={[
            { id: "1", label: "Profile" },
            { id: "2", label: "Security" },
          ]}
        />
      </div>
      <div className="h-[75vh] w-full mt-2">
        {selectedTab === "1" ? (
          <UserProfile />
        ) : selectedTab === "2" ? (
          <ChangePassword />
        ) : null}
      </div>
    </div>
  );
}
