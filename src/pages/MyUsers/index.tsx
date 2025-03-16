import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
  MASTER_USER_ROLE,
  USER_DELETE_RESET,
  USER_ROLE_PRIMARY,
  USER_ROLE_SECONDARY,
  USERS_DELETE_PLANNING_PAGE,
  USERS_GET_PLANNING_PAGE,
} from "../../constants/userConstants";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getUserList } from "../../actions/userAction";
import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { AddUserDetails } from "../../components/popup/AddUserDetails";

export const MyUsers = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [open, setOpen] = useState<boolean>(false);
  const userList = useSelector((state: any) => state.userList);
  const { loading, error, data: users } = userList;

  const userDelete = useSelector((state: any) => state.userDelete);
  const {
    loading: loadingUserDelete,
    error: errorUserDelete,
    success,
    data: userDeleteMessage,
  } = userDelete;

  useEffect(() => {
    if (success) {
      alert(userDeleteMessage);
      dispatch({ type: USER_DELETE_RESET });
      dispatch(getUserList({
        event : USERS_GET_PLANNING_PAGE
      }));
    }
    if (errorUserDelete) {
      alert(errorUserDelete);
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [errorUserDelete, errorUserDelete]);

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser({userId , event : USERS_DELETE_PLANNING_PAGE}));
  };

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const toggleOpen = useCallback(() => {
    setOpen((pre: boolean) => !pre);
  }, [open]);

  useEffect(() => {
    if (!userInfo) {
      navigate(AUTH);
    } else {
      if (userInfo?.userRole !== CAMPAIGN_MANAGER) {
        message.warning("You have no access to this page");
        navigate(-1);
      } else {
        dispatch(getUserList({
          event : USERS_GET_PLANNING_PAGE
        }));
      }
    }
  }, [userInfo]);

  return (
    <div className="w-full h-full">
      {open && <AddUserDetails open={open} onClose={toggleOpen}/>}
      <div className="flex flex-row justify-between border rounded p-4 w-full bg-white">
        <h1 className="text-[16px] font-semibold">Users</h1>
        <div className="flex items-center w-50">
          <PrimaryButton
            action={toggleOpen}
            title="Add user"
            rounded="rounded-lg"
            height="h-8"
            width="w-32"
            textSize="text-[16px] font-semibold"
          />
        </div>
      </div>

      <div className="w-full h-[85vh] overflow-scroll mt-1">
        <table className="w-full ">
          <thead className="bg-[#EBF6FF]">
            <tr>
              <th className="py-2 px-1">
                <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                  Sl No.
                </div>
              </th>
              <th className="py-2 px-1">
                <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                  User Name
                </div>
              </th>
              <th className="py-2 px-1">
                <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                  User Role
                </div>
              </th>
              <th className="py-2 px-1">
                <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                  User Email
                </div>
              </th>
              {userInfo?.userRole != CAMPAIGN_MANAGER ? null : 
                <th className="py-2 px-1">
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                    Action
                  </div>
                </th>
              }
            </tr>
          </thead>
          <tbody className="bg-white">
            {users?.filter((u: any) => u._id != userInfo?._id)
              ?.map((s: any, i: number) => (
                <tr key={i} className="border-b hover:bg-gray-200">
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                      {i+1}
                    </div>
                  </td>
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                      {s.name}
                    </div>
                  </td>
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                      {s.userRole}
                    </div>
                  </td>
                  <td className="py-2 px-1">
                    <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                      {s.email}
                    </div>
                  </td>
                  {userInfo?._id == s._id && userInfo?.userRole == CAMPAIGN_MANAGER ? null : 
                    <td className="py-2 px-1">
                      <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                        <i
                          className="fi fi-rs-trash text-red-500"
                          title="delete user"
                          onClick={() => handleDeleteUser(s?._id)}
                        ></i>
                      </div>
                    </td>
                  }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
