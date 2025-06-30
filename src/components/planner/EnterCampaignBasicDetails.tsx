import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Tooltip,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  addClientAgencyDetails,
  getAllClientAgencyNames,
} from "../../actions/clientAgencyAction";
import { SuggestionInput } from "../../components/atoms/SuggestionInput";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  ORDERED_SOV,
} from "../../constants/campaignConstants";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_BRAND_LIST } from "../../constants/localStorageConstants";
import { getAllBrandAndNetworkAction } from "../../actions/creativeAction";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";
import { getAllPlannerIdsAndEmail } from "../../actions/screenAction";
import { format } from "date-fns";
import { monitoringTypes } from "../../constants/helperConstants";
import dayjs from "dayjs";

const calculateDuration = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  return end.diff(start, "day") + 1; // +1 to include both start and end dates
};

const calculateEndDate = (start: dayjs.Dayjs, duration: number) => {
  return start
    .add(duration - 1, "day") // -1 because duration includes start date
    .hour(23)
    .minute(59)
    .second(0)
    .millisecond(0);
};

const { Option } = Select;

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  campaignId?: any;
  path: string;
  campaignDetails?: any;
  campaignType?: any;
}

const allIndex = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
].map((value) => ({
  label: value.toString(),
  value: value,
}));

const allIndexOrderedSov = [1, 2, 3, 6, 18].map((value) => ({
  label: value.toString(),
  value: value,
}));

const sovTypeOptions = [
  { label: "Ordered", value: "ordered" },
  { label: "Continuous", value: "continuous" },
  { label: "Random", value: "random" },
];

export const EnterCampaignBasicDetails = ({
  setCurrentStep,
  step,
  userInfo,
  campaignId,
  campaignDetails,
  campaignType,
  path,
}: EnterCampaignBasicDetailsProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [allPlannerData, setAllPlannerData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // Redux selectors
  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const allPlannerIdsAndEmail = useSelector(
    (state: any) => state.allPlannerIdsAndEmail
  );
  const allClientAgencyNamesListGet = useSelector(
    (state: any) => state.allClientAgencyNamesListGet
  );

  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
    data: addDetails,
  } = detailsToCreateCampaignAdd;

  const { data: clientAgencyNamesList } = allClientAgencyNamesListGet;
  const { data: AllPlanner } = allPlannerIdsAndEmail;

  // Handle adding new client/agency
  const handleAddNewClient = useCallback(
    (value: string) => {
      if (
        !clientAgencyNamesList?.find(
          (data: any) => data.clientAgencyName === value
        )
      ) {
        dispatch(
          addClientAgencyDetails({ clientAgencyName: value?.toUpperCase() })
        );
      }
    },
    [dispatch, clientAgencyNamesList]
  );

  // Form submission handler
  const onFinish = async (values: any) => {
    setLoading(true);
    if (!pathname.split("/").includes("view")) {
      try {
        const payload = {
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
          id: campaignId,
          pageName: "Basic Details Page",
          name: values.campaignName,
          brandName: values.brandName,
          campaignType: campaignType,
          clientName: values.clientName,
          industry: values.industry,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
          duration: values.duration,
          campaignPlannerId: userInfo?._id,
          campaignPlannerName: userInfo?.name,
          campaignPlannerEmail: userInfo?.email,
          campaignManagerId: values.managerId,
          campaignManagerEmail:
            allPlannerData?.find((data: any) => data._id === values.managerId)
              ?.email || "",
          sov: values.sov,
          sovType: values.sovType,
          monitoringSelection: {
            startDate: {
              dates: [format(values.startDate.toDate(), "yyyy-MM-dd")],
              monitoringType: monitoringTypes.map((type: any) => type.value),
            },
            endDate: {
              dates: [format(values.endDate.toDate(), "yyyy-MM-dd")],
              monitoringType: monitoringTypes.map((type: any) => type.value),
            },
            midDate: {
              dates: [format(values.midDate.toDate(), "yyyy-MM-dd")],
              monitoringType: monitoringTypes.map((type: any) => type.value),
            },
          },
        };

        handleAddNewClient(values.clientName);

        await dispatch(addDetailsToCreateCampaign(payload));
        console.log("ddddddddddddddd : ", {
          startDate: {
            dates: [format(values.startDate.toDate(), "yyyy-MM-dd")],
            monitoringType: monitoringTypes.map((type: any) => type.value),
          },
          endDate: {
            dates: [format(values.endDate.toDate(), "yyyy-MM-dd")],
            monitoringType: monitoringTypes.map((type: any) => type.value),
          },
          midDate: {
            dates: [format(values.midDate.toDate(), "yyyy-MM-dd")],
            monitoringType: monitoringTypes.map((type: any) => type.value),
          },
        });
      } catch (error) {
        message.error("Failed to save campaign details");
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(step + 1);
    }
  };

  // Date validation

  const validateMidDate = (_: any, value: dayjs.Dayjs) => {
    const startDate = form.getFieldValue("startDate");
    const endDate = form.getFieldValue("endDate");

    if (startDate && endDate && value) {
      if (value.isBefore(startDate)) {
        return Promise.reject("Mid date must be after start date");
      }
      if (value.isAfter(endDate)) {
        return Promise.reject("Mid date must be before end date");
      }
    }
    return Promise.resolve();
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // Load initial data
  useEffect(() => {
    dispatch(getAllClientAgencyNames());
    dispatch(getAllBrandAndNetworkAction());
    dispatch(getAllPlannerIdsAndEmail({ id: userInfo?._id }));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (AllPlanner) {
      setAllPlannerData(AllPlanner);
    }
  }, [AllPlanner]);

  useEffect(() => {
    if (errorAddDetails) {
      message.error(errorAddDetails);
    }

    if (
      successAddDetails &&
      !pathname.split("/").includes("view") &&
      !pathname.split("/").includes("edit")
    ) {
      navigate(`/${path}/${addDetails?._id}`);
      setCurrentStep(step + 1);
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
    }
  }, [
    addDetails?._id,
    dispatch,
    errorAddDetails,
    navigate,
    path,
    pathname,
    setCurrentStep,
    step,
    successAddDetails,
  ]);

  useEffect(() => {
    if (campaignDetails) {
      console.log(
        "campaignDetails?.monitoringSelectionerrewrewrw",
        campaignDetails?.monitoringSelection
      );
      form.setFieldsValue({
        campaignName: campaignDetails?.name,
        brandName: campaignDetails?.brandName,
        clientName: campaignDetails?.clientName,
        industry: campaignDetails?.industry,
        startDate: dayjs(campaignDetails?.startDate),
        endDate: dayjs(campaignDetails?.endDate),
        sov: campaignDetails?.sov,
        sovType: campaignDetails?.sovType,
        managerId: campaignDetails?.campaignManagerId.toString(),
        duration: campaignDetails?.duration,
        midDate: dayjs(campaignDetails?.monitoringSelection?.midDate?.dates[0]),
      });
    }
  }, [campaignDetails, form]);

  const formItemStyles = `
  .compact-form .ant-form-item-label {
    padding-bottom: 2px;
    line-height: 1.2;
  }
  .compact-form .ant-form-item {
    margin-bottom: 12px;
  }
  .compact-form .ant-form-item-label > label {
    font-size: 13px;
  }
`;

  return (
    <div className="w-full">
      <div className="pt-8 px-1">
        <h1 className="text-[24px] text-primaryText font-semibold">
          Add Basic Details
        </h1>
        <p className="text-[14px] text-primaryText">
          Enter your basic details for the campaigns to proceed further
        </p>
      </div>
      <style>{formItemStyles}</style>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className=""
        initialValues={{
          sovType: "continuous",
          sov: 1,
        }}
      >
        <div className="max-h-[65vh] overflow-y-auto scrollbar-minimal px-1 grid grid-cols-3  mt-4">
          {" "}
          {/* Campaign Name */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="campaignName"
            label={
              <div className="flex items-center gap-2">
                <span>Campaign Name</span>
                <Tooltip title="Enter a unique name for your campaign">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please enter campaign name" }]}
          >
            <Input placeholder="Campaign Name" size="large" />
          </Form.Item>
          {/* Brand Name */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="brandName"
            label={
              <div className="flex items-center gap-2">
                <span>Brand Name</span>
                <Tooltip title="Enter campaign's brand name">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <SuggestionInput
              suggestions={getDataFromLocalStorage(ALL_BRAND_LIST)}
              placeholder="Brand Name"
              onChange={(value) => form.setFieldsValue({ brandName: value })}
              value={form.getFieldValue("brandName") || ""}
            />
          </Form.Item>
          {/* Client/Agency Name */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="clientName"
            label={
              <div className="flex items-center gap-2">
                <span>Agency / Client</span>
                <Tooltip title="Enter Agency's name or client's name who is managing the campaign">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[
              {
                required: true,
                message: "Please enter client/agency name",
              },
            ]}
          >
            <SuggestionInput
              suggestions={clientAgencyNamesList?.map(
                (value: any) => value.clientAgencyName
              )}
              placeholder="Client/Agency Name"
              onChange={(value: any) =>
                form.setFieldsValue({ clientName: value.toUpperCase() })
              }
              value={form.getFieldValue("clientName") || ""}
            />
          </Form.Item>
          {/* Industry Type */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="industry"
            label={
              <div className="flex items-center gap-2">
                <span>Industry Type</span>
                <Tooltip title="Enter industry name your brand belongs to">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please enter industry type" }]}
          >
            <Input placeholder="Industry Type" size="large" />
          </Form.Item>
          {/* Start Date */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="startDate"
            label={
              <div className="flex items-center gap-2">
                <span>Start Date & Time</span>
                <Tooltip title="Select date and time when the campaign should start">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[
              {
                required: true,
                message: "Please select start date and time",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              className="w-full"
              size="large"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              disabledTime={(current) => {
                if (current && current.isSame(dayjs(), "day")) {
                  return {
                    disabledHours: () => range(0, dayjs().hour()),
                    disabledMinutes: (selectedHour) => {
                      if (selectedHour === dayjs().hour()) {
                        return range(0, dayjs().minute());
                      }
                      return [];
                    },
                  };
                }
                return {};
              }}
            />
          </Form.Item>
          {/* End Date */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="endDate"
            label={
              <div className="flex items-center gap-2">
                <span>End Date & Time</span>
                <Tooltip title="Select date and time when the campaign should end">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[
              {
                required: true,
                message: "Please select end date and time",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startDate = getFieldValue("startDate");
                  if (!value) {
                    return Promise.reject("Please select end date/time");
                  }
                  if (startDate && value.isBefore(startDate)) {
                    return Promise.reject(
                      "End date/time must be after start date/time"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              className="w-full"
              size="large"
              disabledDate={(current) => {
                const startDate = form.getFieldValue("startDate");
                return (
                  current &&
                  (current < dayjs().startOf("day") ||
                    (startDate && current < startDate.startOf("day")))
                );
              }}
              disabledTime={(current) => {
                const startDate = form.getFieldValue("startDate");
                if (current && startDate && current.isSame(startDate, "day")) {
                  return {
                    disabledHours: () => range(0, startDate.hour()),
                    disabledMinutes: (selectedHour) => {
                      if (selectedHour === startDate.hour()) {
                        return range(0, startDate.minute());
                      }
                      return [];
                    },
                  };
                }
                return {};
              }}
              onChange={(date) => {
                if (date) {
                  const startDate = form.getFieldValue("startDate");
                  if (startDate) {
                    form.setFieldsValue({
                      duration: calculateDuration(startDate, date),
                    });
                  }
                }
              }}
            />
          </Form.Item>
          {/* Duration */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="duration"
            label={
              <div className="flex items-center gap-2">
                <span>Duration (Days)</span>
                <Tooltip title="Enter total duration of campaigns in days">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input
              type="number"
              placeholder="30"
              min={1}
              size="large"
              onChange={(e) => {
                const duration = parseInt(e.target.value);
                if (!isNaN(duration) && duration > 0) {
                  const startDate = form.getFieldValue("startDate");
                  if (startDate) {
                    form.setFieldsValue({
                      endDate: calculateEndDate(startDate, duration),
                    });
                  }
                }
              }}
            />
          </Form.Item>
          {/* Manager */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="managerId"
            label={
              <div className="flex items-center gap-2">
                <span>Select Manager</span>
                <Tooltip title="Select the manager for this campaign">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please select manager" }]}
          >
            <Select
              placeholder="Select Manager"
              size="large"
              loading={!allPlannerData.length}
              showSearch
              optionFilterProp="label"
              options={allPlannerData?.map((data: any) => {
                return {
                  label: data?.name,
                  value: data?._id,
                };
              })}
            ></Select>
          </Form.Item>
          {/* SOV Type */}
          <Form.Item
            name="sovType"
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            label={
              <div className="flex items-center gap-2">
                <span>SOV Type</span>
                <Tooltip title="Continuous -> One After another , Ordered-> Ordered , Random -> At any place ">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please select SOV type" }]}
          >
            <Select placeholder="Select SOV Type" size="large">
              {sovTypeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* SOV */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="sov"
            label={
              <div className="flex items-center gap-2">
                <span>SOV</span>
                <Tooltip title="SOV: How many times you want to play your creatives in 3 minutes (one loop)">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[{ required: true, message: "Please select SOV" }]}
          >
            <Select placeholder="Select SOV" size="large">
              {(form.getFieldValue("sovType") === ORDERED_SOV
                ? allIndexOrderedSov
                : allIndex
              ).map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Mid Date */}
          <Form.Item
            style={{ marginRight: 16 }} /* Reduced from default 24px */
            name="midDate"
            label={
              <div className="flex items-center gap-2">
                <span>Select Mid Monitoring Date</span>
                <Tooltip title="Monitoring start and end data will always be your campaign start and end date">
                  <i className="fi fi-rs-info text-[10px] text-gray-400" />
                </Tooltip>
              </div>
            }
            rules={[
              {
                required: false,
                message: "Please select mid monitoring date",
              },
              { validator: validateMidDate },
            ]}
            dependencies={["startDate", "endDate"]}
          >
            <DatePicker
              className="w-full"
              size="large"
              disabledDate={(current) => {
                const startDate = form.getFieldValue("startDate");
                const endDate = form.getFieldValue("endDate");
                return (
                  current &&
                  ((startDate && current < startDate.startOf("day")) ||
                    (endDate && current > endDate.endOf("day")))
                );
              }}
            />
          </Form.Item>
        </div>

        <div className="flex justify-start">
          {/* Submit Button */}
          <Form.Item className="col-span-3">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="mt-8 h-11 w-44 text-[18px]"
            >
              {!campaignId ? "Create" : "Continue"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
