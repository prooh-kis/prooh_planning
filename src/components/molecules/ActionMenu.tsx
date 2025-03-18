import "../header/index.css";
// import userImage from "../../assets/userImage.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH, MY_CAMPAIGNS_LIST, MY_REQUESTS_LIST } from "../../routes/routes";
import { changeCampaignStatusAfterVendorApproval } from "../../actions/campaignAction";
import {
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_ACCEPTED,
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_REJECTED,
} from "../../constants/campaignConstants";

export const ActionMenu = ({ ids }: any) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <i className="fi fi-bs-menu-dots text-[20px] flex justify-center"></i>
      <div className="dropdown-content">
        <div
          onClick={() => {
            // dispatch(changeCampaignStatusAfterVendorApproval({ ids: ids }));
          }}
          className="flex flex-row gap-4 items-center py-2 px-4 hover:bg-[#129BFF] hover:text-[#FFFFFF]"
        >
          <i
            className={`fi fi-br-check flex items-center text-[#358E0B] text-[12px]`}
          ></i>
          <p className="text-[14px]">Accept Campaign</p>
        </div>
        <div
          onClick={() => {
            // dispatch(changeCampaignStatusAfterVendorApproval({ ids: ids }));
          }}
          className="flex flex-row gap-4 items-center py-2 px-4 hover:bg-[#129BFF] hover:text-[#FFFFFF]"
        >
          <i
            className={`fi fi-br-cross flex items-center text-[#FF0808] text-[10px]`}
          ></i>
          <p className="text-[14px]">Reject Campaign</p>
        </div>
      </div>
    </div>
  );
};
