import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  Statistic,
  message,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import ButtonInput from "../../components/atoms/ButtonInput";

dayjs.extend(durationPlugin);

const { RangePicker } = DatePicker;

interface CampaignFormValues {
  name: string;
  dateRange: [Dayjs, Dayjs];
}

interface CampaignCreationModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: {
    name: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const CampaignCreationModal: React.FC<CampaignCreationModalProps> = ({
  visible,
  onCancel,
  onCreate,
}) => {
  const [form] = Form.useForm<CampaignFormValues>();
  const [duration, setDuration] = useState<number | null>(null);

  const handleDateChange = (
    _: any,
    dateStrings: [string | null, string | null]
  ) => {
    if (dateStrings[0] && dateStrings[1]) {
      const start = dayjs(dateStrings[0]);
      const end = dayjs(dateStrings[1]);
      const diff = end.diff(start, "days") + 1; // +1 to include both start and end days
      setDuration(diff);
    } else {
      setDuration(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        name: values.name,
        // startDate: values.dateRange[0].format("YYYY-MM-DD"),
        // endDate: values.dateRange[1].format("YYYY-MM-DD"),
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      };
      onCreate(formattedValues);
      form.resetFields();
      setDuration(null);
    } catch (error) {
      message.error("Please fill all required fields");
    }
  };

  return (
    <Modal
      title="Create New Campaign From Template"
      open={visible}
      onCancel={() => {
        form.resetFields();
        setDuration(null);
        onCancel();
      }}
      footer={[
        <ButtonInput key="cancel" onClick={onCancel} variant="danger">
          Cancel
        </ButtonInput>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Create Campaign
        </Button>,
      ]}
    >
      <Form<CampaignFormValues> form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Campaign Name"
          rules={[{ required: true, message: "Please input campaign name!" }]}
        >
          <Input placeholder="Enter campaign name" />
        </Form.Item>

        <Form.Item
          name="dateRange"
          label="Campaign Duration"
          rules={[{ required: true, message: "Please select date range!" }]}
        >
          <RangePicker
            style={{ width: "100%" }}
            onChange={handleDateChange}
            disabledDate={(current) =>
              current ? current < dayjs().startOf("day") : false
            }
          />
        </Form.Item>

        {duration !== null && (
          <div style={{ marginBottom: 24 }}>
            <Statistic
              title="Campaign Duration"
              value={duration}
              suffix="days"
              valueStyle={{ color: "#1890ff" }}
            />
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default CampaignCreationModal;
