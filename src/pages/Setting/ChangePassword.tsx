import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import ButtonInput from "../../components/atoms/ButtonInput";
import { changeUserPassword, signout } from "../../actions/userAction";
import { CHANGE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";

export function ChangePassword() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    loading,
    error: errorUpdateProfile,
    success,
  } = useSelector((state: any) => state.changePassword);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (success) {
      dispatch({ type: CHANGE_PASSWORD_RESET });
      message.success("New Password Added Successfully!");
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
      dispatch(signout());
      navigate(AUTH);
    }
    if (errorUpdateProfile) {
      message.error(errorUpdateProfile);
      dispatch({ type: CHANGE_PASSWORD_RESET });
    }
  }, [dispatch, errorUpdateProfile, success]);

  const handleSave = () => {
    if (!oldPassword) return message.error("Please Enter Your Old Password!");
    if (password !== confirmPassword)
      return message.error("Passwords do not match!");
    if (password.length < 8)
      return message.error("Password must be at least 8 characters long.");
    dispatch(
      changeUserPassword({
        oldPassword,
        newPassword: password,
        _id: userInfo?._id,
      })
    );
  };

  return (
    <div className="flex items-center  justify-center bg-[#FFFFFF] h-full">
      <div className="p-6  w-[50%] bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Change Password
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Current Password</label>
            <div className="flex items-center border rounded p-2">
              <i className="fi fi-br-lock mr-2 text-gray-500"></i>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">New Password</label>
            <div className="flex items-center border rounded p-2">
              <i className="fi fi-br-lock mr-2 text-gray-500"></i>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Confirm New Password</label>
            <div className="flex items-center border rounded p-2">
              <i className="fi fi-br-lock mr-2 text-gray-500"></i>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <ButtonInput onClick={handleSave}>Save</ButtonInput>
        </div>
      </div>
    </div>
  );
}
