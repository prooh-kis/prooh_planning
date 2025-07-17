import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import { message } from "antd";
import { CampaignAnalysisProps } from "./types";
import { TeamHierarchy } from "./TeamHierarchy";
import { GroupWiseCampaigns } from "./GroupWiseCampaigns";
import { VendorWiseCampaigns } from "./VendorWiseCampaigns";
import { UserWiseCampaigns } from "./UserWiseCampaigns";
import { CampaignWise } from "./CampaignWise";
import { ScreenWiseCampaigns } from "./ScreenWiseCampaigns";

export const CampaignAnalysis: React.FC<CampaignAnalysisProps> = ({
  userInfo,
  myOrg,
  loadingOrgLevelCampaignStatus,
  errorOrgLevelCampaignStatus,
  orgLevelCampaignStatus,
  filters,
  handleFilters,
  initialFilters,
}) => {
  const dispatch = useDispatch<any>();

  const userOrgRole: string = myOrg?.officialMembers.find((member: any) => member.userId === userInfo._id)?.role || ""


  useEffect(() => {
    if (errorOrgLevelCampaignStatus) {
      message.error("Error in getting campaign status on organization level");
    }
  }, [errorOrgLevelCampaignStatus]);

  const officialMembers = myOrg?.officialMembers || [];

  if (loadingOrgLevelCampaignStatus) {
    return (
      <div className="flex justify-center py-8">
        <Loading />
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${["MANAGER", "COORDINATOR"].includes(userOrgRole) ? "md:grid-cols-5" : "md:grid-cols-6"} gap-1`}>
      {["ADMIN"].includes(userOrgRole)&& (
        <div className="md:col-span-1 ">
          <TeamHierarchy
            title="By Managers"
            members={officialMembers}
            leaderRole="HOM"
            memberRole="MANAGER"
            orgLevelCampaignStatus={orgLevelCampaignStatus}
            selectionType="radio"
            filters={filters}
            handleFilters={handleFilters}
            initialFilters={initialFilters}
          />
        </div>
      )}
      {["HOM", "COORDINATOR"].includes(userOrgRole) && (
        <div className="md:col-span-1">
          <UserWiseCampaigns
            title="By Managers"
            userWiseCampaigns={orgLevelCampaignStatus?.data?.managers}
            orgMembers={myOrg?.officialMembers}
            filters={filters}
            handleFilters={handleFilters}
            initialFilters={initialFilters}
            orgUser="manager"
          />
        </div>
      )}

      {["HOM", "MANAGER", "ADMIN"].includes(userOrgRole) && (
        <div className="md:col-span-1">
          <UserWiseCampaigns
            title="By Coordinators"
            userWiseCampaigns={orgLevelCampaignStatus?.data?.coordinators}
            orgMembers={myOrg?.officialMembers}
            filters={filters}
            handleFilters={handleFilters}
            initialFilters={initialFilters}
            orgUser="coordinator"

          />
        </div>
      )}
      <div className="md:col-span-1">
        <GroupWiseCampaigns
          title="By Groups"
          groupWiseCampaigns={orgLevelCampaignStatus?.data?.agencies}
          filters={filters}
          handleFilters={handleFilters}
          initialFilters={initialFilters}
        />
      </div>
      <div className="md:col-span-1">
        <CampaignWise
          title="By Campaigns"
          nameWiseCampaigns={orgLevelCampaignStatus?.data?.campaignCreations}
          filters={filters}
          handleFilters={handleFilters}
          initialFilters={initialFilters}
        />
      </div>
      <div className="md:col-span-1">
        <VendorWiseCampaigns
          title="By Vendors"
          vendorWiseCampaigns={orgLevelCampaignStatus?.data?.vendors}
          filters={filters}
          handleFilters={handleFilters}
          initialFilters={initialFilters}
        />
      </div>
      <div>
        <ScreenWiseCampaigns
        title="By Sites"
        screenWiseCampaigns={orgLevelCampaignStatus?.data?.screens}
        filters={filters}
        handleFilters={handleFilters}
        initialFilters={initialFilters}
        />
      </div>

    </div>
  );
};