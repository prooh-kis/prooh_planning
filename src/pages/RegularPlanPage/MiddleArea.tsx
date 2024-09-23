import { EnterCampaignBasicDetails } from "../../components/popup";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  return (
    <div className="py-2 w-full h-full pb-5 flex justify-center items-center">
      <EnterCampaignBasicDetails />
    </div>
  );
};
