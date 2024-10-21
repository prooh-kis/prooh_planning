import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { AddCampaignDetails } from "../popup/AddCampaignDetails";
import { EventCalender } from "../../components/popup/EventCalender";

function SingleCalenderData() {
  return (
    <div className="flex justify-between hover:border hover:border-1 hover:border-blue-500 hover:text-blue-500 py-4 px-4 rounded-lg">
      <div className="flex gap-2">
        <div className="rounded-[100%] h-8 w-8 p-2 bg-gray-100 i justify-center">
          <i className="fi fi-ss-cake-birthday text-[#28A61D] "></i>
        </div>
        <div>
          <h1>Vivekananda Jayanti</h1>
          <h1 className="text-[#737373] text-[13px] ">
            your final bill will include the cost of all
          </h1>
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <h1 className="text-[24px]">02</h1>
          <h1 className="text-[#737373] text-[13px] ">Feb</h1>
        </div>
        <input title="month" type="checkbox" className="text-[24px]" />
      </div>
    </div>
  );
}

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
  const [dummay, setDummat] = useState<any>([1, 2, 3, 4, 5, 6]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [data, setData] = useState<any>({
    "Campaign Duration": "1 Day",
    "Total Cities": "03",
    "Total Touchpoints": "40",
    "Total Sites": "70",
    "Avg Impression Per Day": "100k",
    "Total Slots": "2000",
    "Slot Duration": "10 sec in 3 mins",
    "per slot price": "₹200",
    CPM: "₹0.2",
    "Total Budget": "₹2,80,000",
  });

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleOpenModel = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  return (
    <div className="w-full py-3">
      <AddCampaignDetails
        handleCancel={handleCancel}
        open={isOpen}
        userInfo={userInfo}
        setCurrentStep={setCurrentStep}
        step={step}
        router="specialdayplan"
      />
      <h1 className="text-[24px] text-primaryText font-semibold">
        Select Topical Day
      </h1>
      <div className="flex  justify-between">
        <div className="flex gap-4">
          <Select
            options={[]}
            placeholder="Select your category"
            size="large"
            style={{ width: "456px" }}
          />
          <button className="border border-1 px-4 py-2 rounded-md">
            Reset
          </button>
        </div>
        <EventCalender />
      </div>
      <h1 className="py-2">Months</h1>
      <div className="flex gap-8">
        <div className="w-full border border-1 rounded-xl p-8">
          <h1>Topical days in feb </h1>
          <h1 className="text-[#888888]">
            You have found 08 events according to your category{" "}
          </h1>
          <div className="flex flex-col gap-4 mt-4 overflow-auto">
            {dummay?.map((value: any, index: any) => (
              <div key={index}>
                <SingleCalenderData />
                <div className="border border-1"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border border-1 rounded-xl p-8">
          <div className="flex justify-between">
            <h1>your selection - Vivekananda Jayanti</h1>
            <h1 className="text-blue-500">2 Feb 2024</h1>
          </div>
          <h1 className="text-[#888888] text-[14px] py-2">
            your final bill will include the cost of all the additional slots,{" "}
          </h1>
          <div className="flex flex-col gap-4 mt-4 overflow-auto">
            {Object.keys(data)?.map((key: string, index: any) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h1 className="py-2">{key}</h1>
                  <h1
                    className={
                      key === "Total Budget"
                        ? "text-[#1297E2] text-[20px]"
                        : "text-[#CC1C1C]"
                    }
                  >
                    {data[key]}
                  </h1>
                </div>
                <div className="border border-1"></div>
              </div>
            ))}
          </div>
          <h1 className="text-[#E90707] text-[14px] mt-4">
            Note - these fields are subject to change when you <br /> proceed
            for optimising this plan
          </h1>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-8 py-2 bg-[#1297E2] text-white rounded-md"
          onClick={handleOpenModel}
        >
          Proceed To Cost Optimization
        </button>
      </div>
    </div>
  );
};
