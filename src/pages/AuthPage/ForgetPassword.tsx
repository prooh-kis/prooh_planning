import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailToResetPassword } from "../../actions/userAction";
import { SEND_EMAIL_TO_RESET_PASSWORD_RESET } from "../../constants/userConstants";
import { AUTH, SIGN_UP } from "../../routes/routes";
import { Form, Input } from "antd";

export function ForgetPassword(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<any>("");

  const userSendEmailToResetPassword = useSelector(
    (state: any) => state.userSendEmailToResetPassword
  );
  const { loading, error, success, data } = userSendEmailToResetPassword;

  useEffect(() => {
    if (success) {
      alert(data);
      dispatch({ type: SEND_EMAIL_TO_RESET_PASSWORD_RESET });
    }
    if (error) {
      alert(error);
      setEmail("");
      dispatch({ type: SEND_EMAIL_TO_RESET_PASSWORD_RESET });
    }
  }, [success, error, dispatch]);

  const handleSendEmail = () => {
    if (email) dispatch(sendEmailToResetPassword(email));
    else alert("Please enter email");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full bg-gray-100">
      <div className="w-[90%] lg:w-[400px] rounded-[15px] bg-white px-5 lg:px-8 py-6 lg:py-10 shadow-lg">
        <div className="flex flex-col gap-4">
          <h1 className="items-center text-xl font-bold">Forget Password</h1>
          {true && (
            <a
              className="text-sm text-[#129BFF] cursor-pointer"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                )
              }
            >
              click hear to inbox
            </a>
          )}
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSendEmail}
            autoComplete="off"
            fields={[
              {
                name: ["email"],
                value: email,
              },
            ]}
          >
            <Form.Item
              label={
                <h1 className="items-center text-[16px] font-bold text-[#555555]">
                  Enter Email
                </h1>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <button
                className="w-full rounded border-2 border-[#129BFF]  bg-[#129BFF] text-[#ffffff] text-xl py-2  hover:bg-[#107ACC]"
                type={"submit"}
              >
                {loading ? "Please wait" : "Send Email"}
              </button>
            </Form.Item>
          </Form>

          <div className="pt-2">
            <button
              className="w-full py-3 font-semibold border border-gray-300  hover:bg-[#2C2C2C] bg-[#2C2C2C90] text-white rounded-md"
              onClick={() => navigate(SIGN_UP)}
            >
              Create a new account
            </button>
          </div>

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
        </div>
      </div>
    </div>
  );
}
