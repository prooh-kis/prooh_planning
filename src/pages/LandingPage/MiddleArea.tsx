import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Landing } from "./Landing";
import { useNavigate } from "react-router-dom";

export const MiddleArea: React.FC = () => {
  const navigate = useNavigate();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Landing />
    </div>
  );
};
