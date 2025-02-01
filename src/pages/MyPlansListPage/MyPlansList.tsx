import { TabWithoutIcon } from "../../components/index";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";
import SearchInputField from "../../components/molecules/SearchInputField";
import { DropdownInput } from "../../components/atoms/DropdownInput";

export const MyPlansList = ({ loading, plansList }: any) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<any>("");
  return (
    <div className="w-full">
      <div className="flex justify-between border-b py-2">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-megaphone flex items-center text-[#129BFF]"></i>
          <h1 className="text-[18px] text-primaryText font-semibold">
            My Plans List
          </h1>
        </div>
      </div>
      <div className="w-full p-2 bg-[#D7D7D750]">
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-5">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Campaign by campaign name or brand"
            />
          </div>
          <div className="col-span-1">
            <DropdownInput />
          </div>
          <div className="col-span-1">
            <DropdownInput />
          </div>
          <div className="col-span-1">
            <DropdownInput />
          </div>
        </div>
        {loading ? (
          <div className="">
            <SkeletonLoader />
          </div>
        ) : (
          <div className="overflow-y-scroll no-scrollbar h-[80vh] my-1 rounded-[12px]">
            {plansList
              ?.filter(
              (campaign: any) =>
                campaign?.campaignName?.toLowerCase().includes(searchQuery) ||
                campaign?.brandName?.toLowerCase().includes(searchQuery) ||
                campaign?.campaignName?.toUpperCase().includes(searchQuery) ||
                campaign?.brandName?.toUpperCase().includes(searchQuery)
              )
              ?.map((data: any, i: any) => (
                <div key={i}
                  className="pointer-cursor"
                  onClick={() => navigate(`/${getCampaignPageNameFromCampaignType(
                    data?.campaignType
                  )}/${data._id}`)}
                >
                  <CampaignsListModel data={data} />
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
