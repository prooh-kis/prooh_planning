import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { useDispatch, useSelector } from "react-redux";


interface SpecialDayProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  pathname?: string;
  campaignId?: any;
}

export const SpecialDay = ({
  setCurrentStep,
  step,
  userInfo,
  pathname,
  campaignId,
}: SpecialDayProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  
  return (
    <div className="w-full py-3">
      
    </div>
  );
};
