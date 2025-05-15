import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { ALL_MARKET_SITES } from "../../../data/sampleData";

const { TextArea } = Input;

interface Location {
  city: string;
  touchPoint: string;
  location: string;
}

type MarketSiteKey = keyof typeof ALL_MARKET_SITES;

export const LocationEntryPopup = ({ open, setOpen, handleSave }: any) => {
  const [form] = Form.useForm<Location>();
  const [selectedTp, setSelectedTp] = useState<MarketSiteKey>();

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setSelectedTp(undefined);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!selectedTp) {
        console.error("No touch point selected");
        return;
      }

      const formData = {
        market: values.city,
        touchPoints: [
          { touchPoint: selectedTp, marketSites: [values.location] },
        ],
      };

      console.log("Form data:", formData);
      handleSave(formData);
      handleCancel();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title=""
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      width={700}
      footer={[
        <Button key="back" onClick={handleCancel} className="mr-2">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className="bg-[#3A9868]"
        >
          Send Me Data Form Link
        </Button>,
      ]}
    >
      <div className="">
        <h1 className="text-[#12334B] text-[36px] font-semibold leading-2 tracking-normal font-inter ">
          We are currently looking for data at
        </h1>
        <h1 className="text-[#4F718A] text-[16px] font-normal leading-7 tracking-normal font-inter ">
          Post application and the research paper shall be completed in 48 hours{" "}
        </h1>
        <div className="border w-full mt-4" />
      </div>
      <Form form={form} layout="vertical" className="mt-6">
        <div className="grid grid-cols-1 gap-4">
          <Form.Item
            name="city"
            label="Select City"
            rules={[{ required: true, message: "Please select city" }]}
          >
            <Select options={[{ label: "Delhi NCR", value: "Delhi NCR" }]} />
          </Form.Item>

          <Form.Item label="Select Touch Point" required>
            <Select
              placeholder="Select a touch point"
              options={Object.keys(ALL_MARKET_SITES).map((tp) => ({
                label: tp,
                value: tp,
              }))}
              onChange={(value: MarketSiteKey) => {
                setSelectedTp(value);
                form.setFieldsValue({ touchPoint: value, location: undefined });
              }}
              value={selectedTp}
            />
          </Form.Item>

          {selectedTp && (
            <Form.Item
              name="location"
              label="Select Location"
              rules={[{ required: true, message: "Please select location" }]}
            >
              <Select
                placeholder="Select a location"
                options={ALL_MARKET_SITES[selectedTp]?.map(
                  (location: string) => ({
                    label: location,
                    value: location,
                  })
                )}
              />
            </Form.Item>
          )}
        </div>
        <p className="text-[#4F718A] text-[14px] font-normal leading-0 tracking-normal font-inter w-[90%] ">
          Approval shall be granted in <span className="font-bold">24 </span>
          hours post application and the research paper shall be completed in 48
          hours window thereafter.
        </p>
      </Form>
    </Modal>
  );
};
