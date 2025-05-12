import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { signout } from "../../actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { advertisersSteps, dataHeroSteps, mediaOwnersSteps } from "../../data/LandingPageData";

interface StepSliderHomePageProps {
  steps: number;
  step: number;
  setStep?: any;
  campaignId?: any;
}

export const BillAndInvoiceSteppers = ({ setStep, steps, step }: StepSliderHomePageProps) => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const handleStepClick = (value: number) => {
    setStep(value);
  };

  const stepLabels = ["Bill Invoice", "Confirmation Proof", "Campaign Performance", "Monitoring Pics & Logs"];

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between my-6">
        <div className="flex-1 h-1 bg-gray-200 relative mx-4">
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-primaryButton transition-all duration-500"
              style={{ width: `${Number(step) / (steps - 1) * 100}%` }}
            />
            {[...Array(steps)].map((_, i) => (
              <div className="-mt-2.5 relative cursor-pointer" key={i} onClick={() => handleStepClick(i)}>
                <div
                  className={`relative w-6 h-6 rounded-full flex flex-col items-center justify-center
                    ${i <= step ? 'bg-primaryButton' : 'bg-gray-200'}
                  `}
                >
                  <Tooltip title={stepLabels[i]}>
                    <div className="w-full">
                      <div className="mt-[1px] flex items-center justify-center">
                        {i < step ? (
                          <i className="fi fi-br-check text-[12px] flex items-center justify-center text-white" />
                        ) : (
                          <h1 className={`text-[12px] font-semibold ${i > step ? "text-gray-500" : "text-white"} text-center`}>{i+1}</h1>
                        )}
                      </div>
                    </div>
                  </Tooltip>
                </div>

                {/* Label rendering */}
                {/* {i === step && ( */}
                  <div
                    className={`absolute
                      ${
                        // i === steps - 1
                        //   ? "right-0 translate-x-1/4" : 
                          i === 0 ? "flex justify-start" :
                          "left-1/2 -translate-x-1/2"
                      }
                      whitespace-wrap mt-2 truncate
                    `}
                  >
                    <h1 className={`truncate text-[12px] ${i == 0 ? "text-start" : "text-center"} ${i == step ? "text-primaryButton" : "text-gray-500"} w-[240px]`}>
                      {stepLabels[i]}
                    </h1>
                  </div>
                {/* )} */}

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
