import { useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import {
  CAMPAIGN_MANAGER,
  USER_DELETE_RESET,
  USERS_DELETE_PLANNING_PAGE,
  USERS_GET_PLANNING_PAGE,
} from "../../constants/userConstants";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { deleteUser, getUserList } from "../../actions/userAction";
import { message } from "antd";
import { AddUserDetails } from "../../components/popup/AddUserDetails";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import ButtonInput from "../../components/atoms/ButtonInput";
import {
  NoDataView,
  ReloadButton,
  SearchInputField,
} from "../../components/index";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const MyUsers = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState<any>("");
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
      dispatch(
        getUserList({
          event: USERS_GET_PLANNING_PAGE,
        })
      );
    }
    if (errorUserDelete) {
      alert(errorUserDelete);
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [errorUserDelete, errorUserDelete]);

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Do you really want to delete this user?"))
      dispatch(deleteUser({ userId, event: USERS_DELETE_PLANNING_PAGE }));
  };

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const toggleOpen = useCallback(() => {
    setOpen((pre: boolean) => !pre);
  }, [open]);

  useEffect(() => {
    if (!userInfo) {
      navigate(AUTH, {
        state: {
          path: pathname,
        },
      });
    } else {
      if (userInfo?.userRole !== CAMPAIGN_MANAGER) {
        message.warning("You have no access to this page");
        navigate(-1);
      } else {
        dispatch(
          getUserList({
            event: USERS_GET_PLANNING_PAGE,
          })
        );
      }
    }
    removeAllKeyFromLocalStorage();
  }, [userInfo]);

  const reset = () => {
    dispatch(
      getUserList({
        event: USERS_GET_PLANNING_PAGE,
      })
    );
  };

  const filterUsers = users
    ?.filter((u: any) => u._id != userInfo?._id)
    ?.filter((user: any) => user.name.toLowerCase().includes(searchQuery));

  return (
    <div className="w-full">
      {open && <AddUserDetails open={open} onClose={toggleOpen} />}

      <div className="bg-white rounded-[4px] mr-2 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
          {/* Left section - Title and controls */}
          <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <i className="fi fi-sr-users-alt text-[#8B5CF6] flex items-center text-lg flex-shrink-0"></i>
              <h1 className="text-base font-semibold text-gray-900">
                Users
                <span className="text-md font-normal text-gray-500 ml-1">
                  ({filterUsers?.length || 0})
                </span>
              </h1>
            </div>
            <ReloadButton
              onClick={reset}
              aria-label="Refresh users list"
              className="hover:bg-gray-100 rounded-full p-1"
            />
          </div>

          {/* Right section - Search and Add button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-[40%]">
            <div className="flex-grow">
              <SearchInputField
                value={searchQuery}
                onChange={(value: string) =>
                  setSearchQuery(value?.toLowerCase())
                }
                placeholder="Search by name"
                aria-label="Search users by name"
                className="w-full"
              />
            </div>
            <ButtonInput
              onClick={toggleOpen}
              className="whitespace-nowrap"
              aria-label="Add new user"
            >
              + Add User
            </ButtonInput>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {loading ? (
          <LoadingScreen />
        ) : filterUsers?.length === 0 ? (
          <NoDataView />
        ) : (
          <div className="w-full h-[80vh] overflow-auto mt-1 rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-[#EBF6FF] sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 text-left text-md font-semibold text-[#129BFF] uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      Sl No.
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-[#129BFF] uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-[#129BFF] uppercase tracking-wider">
                    User Role
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-[#129BFF] uppercase tracking-wider">
                    User Email
                  </th>
                  {userInfo?.userRole !== CAMPAIGN_MANAGER ? null : (
                    <th className="py-3 px-4 text-left text-md font-semibold text-[#129BFF] uppercase tracking-wider">
                      <div className="flex items-center justify-center">
                        Actions
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users
                  ?.filter((u: any) => u._id !== userInfo?._id)
                  ?.map((user: any, index: number) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 whitespace-nowrap text-md text-center text-gray-500">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-md font-medium text-gray-900">
                        <div className="flex items-center">
                          {user.avatar && (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                          )}
                          {user.name}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-md text-gray-500">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.userRole === "ADMIN"
                              ? "bg-[#E9D5FF] text-[#5B21B6]" // ADMIN - Light purple/dark purple
                              : user.userRole === "MANAGER"
                              ? "bg-[#EFF6FF] text-[#1D4ED8]" // MANAGER - Light blue/dark blue
                              : "bg-[#ECFDF5] text-[#047857]" // Others - Light green/dark green
                          }`}
                        >
                          {user.userRole}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-md text-gray-500">
                        {user.email}
                      </td>
                      {userInfo?._id !== user._id &&
                        userInfo?.userRole === CAMPAIGN_MANAGER && (
                          <td className="py-3 px-4 whitespace-nowrap text-md text-center text-gray-500">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-150"
                              aria-label={`Delete user ${user.name}`}
                              title="Delete user"
                            >
                              <i className="fi fi-rs-trash text-lg"></i>
                            </button>
                          </td>
                        )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
