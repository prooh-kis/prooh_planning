import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { getAWSUrlToUploadFile, saveFileOnAWS } from "../../../utils/awsUtils";

const { TextArea } = Input;

interface UserProfileFormValues {
  profilePicture: UploadFile[];
  firstName: string;
  lastName: string;
  whoIAm: string;
  experience: number;
  aboutYourself: string;
  linkedin: string;
  email: string;
  phone: string;
  upiId: string;
}

export const IdentificationFormForDataHeroPopup = ({
  open,
  setOpen,
  handleSave,
}: any) => {
  const [form] = Form.useForm<UserProfileFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => {
    setOpen(false);
  };

  const getAWSUrl = async (file: any) => {
    try {
      // Get pre-signed URL from your backend
      const awsResponse = await getAWSUrlToUploadFile(
        file.type,
        file.name.split(".")[0]
      );

      // Upload the file using the pre-signed URL
      await saveFileOnAWS(awsResponse.url, file);

      // Return the public accessible URL
      return awsResponse.awsURL;
    } catch (error: any) {
      message.error(error.message);
      throw error; // Re-throw to handle in the calling function
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Received values:", values);
      // Check if profile picture exists
      if (values.profilePicture && values.profilePicture.length > 0) {
        const file = values.profilePicture[0].originFileObj;

        // Upload to AWS and get public URL
        const awsUrl = await getAWSUrl(file);

        // Now you can use awsUrl in your form submission
        const formData = {
          ...values,
          name: values.firstName + " " + values.lastName,
          avatar: awsUrl, // Store the AWS URL
        };
        handleSave(formData);
        console.log("Form data with AWS URL:", formData);
        message.success("Profile submitted successfully!");
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
          Next
        </Button>,
      ]}
    >
      <div className="">
        <h1 className="text-[#12334B] text-[36px] font-semibold leading-2 tracking-normal font-inter ">
          Identify Yourself
        </h1>
        <h1 className="text-[#4F718A] text-[16px] font-normal leading-7 tracking-normal font-inter ">
          Post application and the research paper shall be completed in 48 hours{" "}
        </h1>
        <div className="border w-full mt-4" />
      </div>
      <Form form={form} layout="vertical" className="mt-6">
        <Form.Item
          name="profilePicture"
          label="Profile Picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Please upload your profile picture" },
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => true}
            onChange={({ fileList }) => setFileList(fileList)}
            fileList={fileList}
            accept="image/*"
            maxCount={1}
            className="avatar-uploader"
            showUploadList={true}
          >
            {fileList.length > 0 ? (
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={URL.createObjectURL(fileList[0].originFileObj as Blob)}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <UploadOutlined className="text-2xl text-gray-500" />
                </div>
                <span className="mt-2 text-sm text-gray-500">
                  Upload Profile
                </span>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name" },
            ]}
          >
            <Input placeholder="John" className="w-full" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input placeholder="Doe" className="w-full" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Who I Am?"
            rules={[{ required: true, message: "Please describe who you are" }]}
          >
            <Input placeholder="e.g., Software Developer" className="w-full" />
          </Form.Item>

          <Form.Item
            name="experience"
            label="Experience (in years)"
            rules={[
              { required: true, message: "Please input your experience" },
            ]}
          >
            <InputNumber min={0} max={50} className="w-full" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email ID"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="john.doe@example.com" className="w-full" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input placeholder="9876543210" className="w-full" />
          </Form.Item>

          <Form.Item
            name="upiId"
            label="UPI ID"
            rules={[{ required: false, message: "Please input your UPI ID" }]}
          >
            <Input placeholder="john.doe@upi" className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          name="aboutYourself"
          label="About Yourself"
          rules={[{ required: true, message: "Please tell us about yourself" }]}
        >
          <TextArea
            rows={4}
            placeholder="Describe yourself in a few words..."
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="linkedin"
          label="LinkedIn Profile"
          rules={[
            {
              required: true,
              message: "Please input your LinkedIn profile URL",
            },
          ]}
        >
          <Input
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full"
          />
        </Form.Item>
        <p className="text-[#4F718A] text-[14px] font-normal leading-0 tracking-normal font-inter w-[90%] ">
          Approval shall be granted in <span className="font-bold">24 </span>
          hours post application and the research paper shall be completed in 48
          hours window thereafter.
        </p>
      </Form>
    </Modal>
  );
};
