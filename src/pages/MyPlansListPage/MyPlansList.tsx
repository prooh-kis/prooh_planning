import { TabWithoutIcon } from '../../components/index';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { PrimaryInput } from '../../components/atoms/PrimaryInput';
import React, { useState } from 'react';
import { MyPlansListTable } from '../../components/tables';

const allTabs = [{
  id: "1",
  label: "Active"
},{
  id: "2",
  label: "Upcoming"
},{
  id: "3",
  label: "Deleted"
},{
  id: "4",
  label: "History"
}];


export const MyPlansList = ({plansList}: any) => {
  const [currentTab, setCurrentTab] = useState<any>("1");
  return (
    <div className="w-full">
      <div className="flex justify-between border-b py-2">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-megaphone flex items-center text-[#129BFF]"></i>
          <h1 className="text-[18px] text-primaryText font-semibold">
            My Plans List
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <PrimaryInput
            height="h-10"
            inputType="text"
            rounded="rounded-[12px]"
            placeholder="Type to search"
            value={""}
            action={() => {}}
          />
          <PrimaryButton
            reverse={true}
            height="h-10"
            width="w-[120px]"
            rounded="rounded-full"
            title="Search"
            action={() => {}}
          />
        </div>
      </div>
      <div className="py-2">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={allTabs}
        />
      </div>
      <div className="w-full bg-gray-50">
        <MyPlansListTable plansList={plansList} />
      </div>
    </div>
  );
};
