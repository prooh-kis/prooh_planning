
import { CampaignDashboardTable } from '../../components/tables/CampaignDashboardTable';
import { DropdownInput } from '../../components/atoms/DropdownInput';
import React from 'react';

export const CampaignDetails = ({campaignsList}: any) => {
  return (
    <div className="w-full h-full pt-10 flex flex-col gap-2">
      <div className="bg-white p-2 rounded-[12px] flex justify-between">
        <div className="flex gap-2">
          <div className="h-12 w-20">
            <img 
              alt=""
              src=""
            />
          </div>
          <div className="flex items-center">
            <div>
              <h1 className="text-[14px] font-semibold">Campaign India</h1>
              <p className="text-[12px]">Brand Name</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 py-2">
          <DropdownInput
            height="h-8"
            width="w-20"
            placeHolder="All"
            selectedOption={""}
            setSelectedOption={""}
            options={[{
              label: "All",
              value: "",
            }]}
          />
          <DropdownInput
            height="h-8"
            width="w-20"
            placeHolder="Gurgaon"
            selectedOption={""}
            setSelectedOption={""}
            options={[{
              label: "All",
              value: "",
            }]}
          />
          <DropdownInput
            height="h-8"
            width="w-20"
            placeHolder="QSR"
            selectedOption={""}
            setSelectedOption={""}
            options={[{
              label: "QSR",
              value: "",
            }]}
          />
          <DropdownInput
            height="h-8"
            width="w-20"
            placeHolder="Premium"
            selectedOption={""}
            setSelectedOption={""}
            options={[{
              label: "Premium",
              value: "",
            }]}
          />
          <DropdownInput
            height="h-8"
            width="w-20"
            placeHolder="Regular"
            selectedOption={""}
            setSelectedOption={""}
            options={[{
              label: "Regular",
              value: "",
            }]}
          />
        </div>
      </div>
      <div className="bg-white p-2 rounded-[12px] flex justify-between">
            
      </div>
      <div className="bg-white p-2 rounded-[12px] flex justify-between">
        <div className="px-2">
          {/* ICON */}
          <h1 className="text-[16px] font-semibold">Site Level Performance</h1>
          <CampaignDashboardTable />
        </div>
      </div>
    </div>
  );
};
