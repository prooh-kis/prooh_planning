import React, { useEffect, useState } from "react";

import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signin } from "../../actions/userAction";
import { FORGET_PASSWORD, SIGN_UP } from "../../routes/routes";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  // localStorage.getItem("myapp-email") ||
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading, error: errorSignIn, success, userInfo } = userSignin;

  useEffect(() => {
    if (success) {
      navigate("/");
    }
    if (errorSignIn) {
      message.error(errorSignIn);
    }
  }, [errorSignIn, success, navigate]);

  const onFinish = (values: any) => {
    dispatch(signin(email, password));
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100">
      <div className="w-[90%] lg:w-[400px] rounded-[15px] bg-white px-5 lg:px-8 py-6 lg:py-10 shadow-lg">
        <div className="flex flex-col gap-4">
          <h1 className="items-center text-xl font-bold"> Welcome Back</h1>
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="on" // Changed to "on"
          >
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
                name="email" // Standard name
                type="email" // Proper type
                autoComplete="username" // Standard autocomplete value
                value={email}
                placeholder="Enter your email"
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
                name="password" // Standard name
                type="password" // Proper type
                autoComplete="current-password" // Standard autocomplete value
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
                style={{ borderColor: "#DDDDDD", padding: "6px 12px" }}
              />
            </Form.Item>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-1">
                <input
                  title="q"
                  type="checkbox"
                  id="rememberMe"
                  defaultChecked
                />
                <label className="text-sm" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <h1
                className="text-sm text-[#129BFF] cursor-pointer"
                onClick={() => navigate(FORGET_PASSWORD)}
              >
                Forget Password
              </h1>
            </div>

            <Form.Item style={{ marginBottom: "0", paddingTop: "20px" }}>
              <div className="pt-2 flex flex-col gap-4">
                <button
                  className="w-full bg-[#129BFF] hover:bg-[#107ACC] rounded text-[#ffffff] text-xl py-2 "
                  type={"submit"}
                >
                  {loading ? "Please wait..." : "Sign In"}
                </button>

                <div className="flex gap-4 justify-center">
                  <h1 className="items-center text-sm font-bold text-[#555555]">
                    {`Don't have an account?`}
                  </h1>
                  <h1
                    className=" cursor-pointer items-center text-sm text-[#129BFF] underline underline-offset-2  font-bold"
                    onClick={() => navigate(SIGN_UP)} //add contact form todo
                  >
                    Register Now
                  </h1>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
