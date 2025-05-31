import React, { useEffect, useState } from "react";

import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../../actions/userAction";
import { AUTH } from "../../routes/routes";
import {
  ALLY_USER_ROLE,
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
  MASTER_USER_ROLE,
  USER_SIGNUP_RESET,
} from "../../constants/userConstants";
import planner from "../../assets/icons/planner.svg";
import manager from "../../assets/icons/manager.svg";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [userType, setUserType] = useState<any>(null);

  const userSignup = useSelector((state: any) => state.userSignup);
  const { loading, error, success, userInfo } = userSignup;

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: USER_SIGNUP_RESET });
    }
    if (success) {
      reset();
      dispatch({ type: USER_SIGNUP_RESET });
      navigate("/");
    }
  }, [dispatch, error, success]);

  const validateSignUp = () => {
    if (password.length < 8) {
      alert("Password length must be at least 8");
      return false;
    } else if (password != confirmPassword) {
      alert("Password amd confirm password mismatch");
      setPassword("");
      setConfirmPassword("");
      return false;
    } else {
      return true;
    }
  };

  const onFinish = (values: any) => {
    if (validateSignUp()) {
      dispatch(
        signup({
          name,
          email,
          password,
          isBrand: true,
          isMaster: false,
          primaryUserId: "670fba3a115cf43aa2348849",
          primaryUserEmail: "vinciis2018@gmail.com",
          userRole: !userType ? CAMPAIGN_PLANNER : userType,
        })
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#D3D3D320] h-full">
      {userType === null ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex gap-12">
            <div
              onClick={() => setUserType(CAMPAIGN_PLANNER)}
              className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 w-100 flex flex-col items-center text-center 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* <i className="fi fi-br-plan-strategy text-[#50C878] text-[120px]" /> */}
              <img src={planner} alt={"PLANNER"} className="w-80 h-auto mb-4" />
              <h2 className="font-custom text-[24px] text-[#3B82F6] font-semibold">
                {"CAMPAIGN PLANNER"}
              </h2>
              <p className="font-custom text-gray-600 mt-2 text-[12px]">
                {
                  "Click here if you are a campaign planner and you want to plan a campaign"
                }
              </p>
            </div>
            <div
              onClick={() => setUserType(CAMPAIGN_MANAGER)}
              className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 w-100 flex flex-col items-center text-center 
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* <i className="fi fi-br-lead-management text-[#8B5CF6] text-[120px]" /> */}
              <img src={manager} alt={"MANAGER"} className="w-80 h-auto mb-4" />

              <h2 className="font-custom text-[24px] text-[#EF444490] font-semibold">
                {"CAMPAIGN MANAGER"}
              </h2>
              <p className="font-custom text-gray-600 mt-2 text-[12px]">
                {
                  "Click here if you are a campaign manager and you want to monitor your campaigns"
                }
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[90%] lg:w-[400px] rounded-[15px] bg-white px-5 lg:px-8 py-6 lg:py-10 shadow-lg">
          <div className="flex flex-col gap-4">
            <h1 className="flex items-center text-xl font-bold">
              Welcome Planner
            </h1>

            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <h1 className="items-center text-[16px] font-bold text-[#555555]">
                    Name
                  </h1>
                }
                name="name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  // addonBefore={<AiOutlineUser color="#555555" />}
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  size="large"
                  style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <h1 className="items-center text-[16px] font-bold text-[#555555]">
                    Email
                  </h1>
                }
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  // addonBefore={<AiOutlineUser color="#555555" />}
                  value={email}
                  placeholder="Enter username or email"
                  onChange={(e) => setEmail(e.target.value)}
                  size="large"
                  style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <h1 className="items-center text-[16px] font-bold text-[#555555]">
                    Password
                  </h1>
                }
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="large"
                  style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <h1 className="items-center text-[16px] font-bold text-[#555555]">
                    Confirm Password
                  </h1>
                }
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Confirm password"
                  value={password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="large"
                  style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: "0", paddingTop: "20px" }}>
                <div className="pt-2 flex flex-col gap-4">
                  <button
                    className="w-full rounded bg-[#129BFF] text-[#ffffff] text-xl py-2 "
                    type={"submit"}
                  >
                    {loading ? "Please wait..." : "Sign Up"}
                  </button>
                </div>
              </Form.Item>
              <div className="flex items-center justify-center gap-1 pt-4">
                <p className="text-sm text-black font-semibold">
                  Already have an account?
                </p>
                <p
                  className="text-sm font-semibold text-[#129BFF] cursor-pointer underline"
                  onClick={() => navigate(AUTH)}
                >
                  Login Now
                </p>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};
