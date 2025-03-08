import { TabWithoutIcon } from "../../components/index";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import React, { useState } from "react";
import { MyRequestsListTable } from "../../components/tables";

const allTabs = [
  {
    id: "1",
    label: "All",
  },
  {
    id: "2",
    label: "Approved",
  },
  {
    id: "3",
    label: "Pending",
  },
  {
    id: "4",
    label: "Rejected",
  },
];

export const ClientsRequestsList = ({ requestsList }: any) => {
  const [currentTab, setCurrentTab] = useState<any>("1");
  return (
    <div className="w-full">
      <div className="py-2">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={allTabs}
        />
      </div>
      <div className="w-full bg-gray-50">
        <MyRequestsListTable requestsList={requestsList} />
      </div>
    </div>
  );
};
