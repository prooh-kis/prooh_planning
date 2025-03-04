import { TabWithoutIcon } from '../../components/index';
import React, { useState } from 'react';
import { SkeletonLoader } from '../../components/molecules/SkeletonLoader';
import { CampaignsListModel } from '../../components/molecules/CampaignsListModel';
import SearchInputField from '../../components/molecules/SearchInputField';
import { DropdownInput } from '../../components/atoms/DropdownInput';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { NoDataView } from '../../components/molecules/NoDataView';

const allTabs = [{
  id: "1",
  label: "Active"
},{
  id: "2",
  label: "Completed"
}];


export const MyCampaignsList = ({ loading, campaignsList, currentTab, setCurrentTab }: any) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<any>("");
  return (
    <div className="w-full">
      <div className="flex justify-between border-b py-2">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-megaphone flex items-center text-[#129BFF]"></i>
          <h1 className="text-[18px] text-primaryText font-semibold">
            My Campaign Plans
          </h1>
        </div>
      </div>
      <div className="px-2">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={allTabs}
        />
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
          {/* <div className="col-span-1">
            <DropdownInput />
          </div>
          <div className="col-span-1">
            <DropdownInput />
          </div>
          <div className="col-span-1">
            <DropdownInput />
          </div> */}
        </div>
        {loading ? (
          <div className="">
            <Loading />
          </div>
        ) : (
          <div className="overflow-y-scroll no-scrollbar h-[80vh] my-1 rounded-[12px]">
            {campaignsList
              ?.filter(
              (campaign: any) =>
                campaign?.name?.toLowerCase().includes(searchQuery) ||
                campaign?.brandName?.toLowerCase().includes(searchQuery) ||
                campaign?.name?.toUpperCase().includes(searchQuery) ||
                campaign?.brandName?.toUpperCase().includes(searchQuery)
              )
              ?.map((data: any, i: any) => (
                <div key={i}
                  className="pointer-cursor"
                  onClick={() => navigate(`/campaignDetails/${data._id}`)}
                >
                  <CampaignsListModel data={data} />
                </div>
            ))}
            {campaignsList?.length === 0 && (
              <NoDataView />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
