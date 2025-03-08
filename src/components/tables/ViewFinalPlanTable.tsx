import { Divider, message, Tooltip } from "antd";
import { formatNumber } from "../../utils/formatValue";
import { convertDateIntoDateMonthYear } from "../../utils/dateAndTimeUtils";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { removeCouponForCampaign } from "../../actions/couponAction";
import { useDispatch } from "react-redux";

function MyDiv({ left, right }: any) {
  return (
    <div className="flex font-normal text-[#2B2B2B]">
      <h1 className="text-left text-[14px] basis-1/2">{left}</h1>
      <h1 className="text-left text-[14px] basis-1/2">{right}</h1>
    </div>
  );
}

export const ViewFinalPlanTable = ({
  poTableData,
  currentCoupon,
  setCurrentCoupon,
  handleApplyCoupon,
  handleRemoveCoupon,
  coupons,
  campaignId,
}: any) => {
  const dispatch = useDispatch<any>();
  return (
    <div>
      <h1 className="font-semibold py-2	">Client Information</h1>
      <MyDiv left={"Client Name"} right={poTableData?.clientName} />
      <MyDiv left={"Brand Name"} right={poTableData?.brandName} />
      <Divider />
      <h1 className="font-semibold py-2	">Campaign Details</h1>
      <MyDiv left={"Campaign Name"} right={poTableData?.name} />
      <MyDiv
        left={"Campaign Type"}
        right={`${poTableData?.campaignType} Campaign`}
      />
      <MyDiv
        left={"Start Date"}
        right={convertDateIntoDateMonthYear(poTableData?.startDate)}
      />
      <MyDiv
        left={"End Date"}
        right={convertDateIntoDateMonthYear(poTableData?.endDate)}
      />
      <MyDiv left={"Duration"} right={`${poTableData?.duration} Days`} />
      <Divider />
      <h1 className="font-semibold py-2	">Performance Metrics</h1>
      <MyDiv
        left={"Audience Impression"}
        right={Number(poTableData?.totalImpression).toFixed(0)}
      />
      <MyDiv left={"Total screens"} right={poTableData?.screens} />
      <MyDiv
        left={"Reach"}
        right={Number(poTableData?.totalReach).toFixed(0)}
      />
      <MyDiv
        left={"TG%"}
        right={`${Number(poTableData?.tgPercent).toFixed(1)} %`}
      />
      <MyDiv
        left={"CPM"}
        right={`\u20B9 ${Number(poTableData?.totalCpm).toFixed(2)}`}
      />
      <MyDiv
        left={"Selected Triggers"}
        right={
          poTableData?.trigger === "weatherTriggers"
            ? "Weather Trigger"
            : poTableData?.trigger === "sportsTriggers"
            ? "Sports Trigger"
            : poTableData?.trigger === "vacantSlots"
            ? "Fill Vacancy"
            : "None"
        }
      />
      <div className="flex font-normal text-[#2B2B2B] mt-4">
        <h1 className="text-left text-[14px] basis-1/2">Apply Discount%</h1>
        <div className="flex gap-4">
          <DropdownInput
            border="border-gray-100"
            height="h-8"
            width="w-auto"
            placeHolder="-----Select coupon-----"
            selectedOption={currentCoupon}
            setSelectedOption={(e: any) => {
              setCurrentCoupon(e);
              handleApplyCoupon(e);
            }}
            options={coupons?.map((coupon: any) => {
              return {
                label: `${coupon?.couponCode} ${coupon?.discountPercent}% discount`,
                value: coupon?._id,
              };
            })}
          />
        </div>
      </div>
      <Divider />
      dispatch
      <div className="flex font-semibold ">
        <div className="basis-1/2 flex items-center justify-start gap-2">
          <h1 className="text-left">Total Cost</h1>
          <Tooltip
            title={`${
              poTableData?.trigger !== "None"
                ? "*Additional trigger cost also included in the total campaign budget"
                : "Total expected campaign budget."
            }`}
          >
            <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
        </div>
        <div className="flex  basis-1/2 gap-8">
          {poTableData?.couponId && poTableData?.couponId !== "NA" && (
            <h1 className="text-left ">
              &#8377;{" "}
              {formatNumber(
                Number(poTableData?.finalCampaignBudget)?.toFixed(2)
              )}
              *
            </h1>
          )}
          <h1
            className={`text-left  ${
              poTableData?.couponId && poTableData?.couponId !== "NA"
                ? "line-through text-gray-400 "
                : ""
            }`}
          >
            &#8377;{" "}
            {formatNumber(Number(poTableData?.totalCampaignBudget)?.toFixed(2))}
            *
          </h1>

          {poTableData?.couponId && poTableData?.couponId !== "NA" && (
            <h1 className="text-left text-[#388e3c]">
              {
                coupons?.find((c: any) => c._id == poTableData?.couponId)
                  ?.discountPercent
              }
              % off
            </h1>
          )}
        </div>
      </div>
      {poTableData?.couponId && poTableData?.couponId !== "NA" && (
        <>
          <div className="flex font-semibold ">
            <h1 className="text-left text-[#388e3c] text-sm">
              You saved &#8377;{" "}
              {formatNumber(Number(poTableData?.totalDiscount))}*
            </h1>
          </div>
          <div className="flex font-semibold items-center gap-4">
            <h1 className="text-left text-sm">
              Discount Applied:{" "}
              <span className="text-[#129BFF]">
                {
                  coupons?.find((c: any) => c._id == poTableData?.couponId)
                    ?.couponCode
                }
              </span>
            </h1>
            <i
              className="fi fi-sr-trash flex items-center lg:text-[14px] text-[12px] text-[#EF4444]"
              onClick={() => {
                if (window.confirm("Do u want to remove applied coupon?"))
                  handleRemoveCoupon();
              }}
            ></i>
          </div>
        </>
      )}
    </div>
  );
};
