import {
  ViewMediaForUploadCreatives2,
  ViewMediaForUploadCreatives3,
} from "../../components/molecules/ViewMediaForUploadCreatives";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { NoDataView } from "../../components/molecules/NoDataView";

export const ShowUploadedCreativePopup = ({
  open,
  onClose,
  screenData,
  tabData,
  removeFile,
}: any) => {
  const [currentTab, setCurrentTab] = useState<string>(
    "standardDayTimeCreatives"
  );

  return (
    <Modal
      title="Preview Uploaded creative"
      closable={true}
      open={open}
      onCancel={onClose}
      footer={[]}
      width={800}
      maskClosable={false}
    >
      <h1 className="text-[14px] font-semibold">
        Screen: {screenData?.screenName}
      </h1>
      {tabData && (
        <TabWithoutIcon
          tabData={tabData}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      {screenData?.[currentTab]?.length > 0 ? (
        <ViewMediaForUploadCreatives2
          files={screenData?.[currentTab]}
          removeFile={removeFile}
          viewCreativeType="1"
        />
      ) : (
        <NoDataView title="Creative Not Uploaded yet" />
      )}
    </Modal>
  );
};

export const ShowSelectedCreativePopup = ({
  open,
  onClose,
  files,
  handleSubmit,
  setFiles,
  loading,
  screensName,
}: any) => {
  const updatedFiles: any = files?.map((file: File) => {
    return {
      file: file,
      type: file.type,
      url: URL.createObjectURL(file),
    };
  });

  const removeFile = (url: string) => {
    const dd = updatedFiles
      ?.filter((file: any) => file.url !== url)
      ?.map((file: any) => file.file);
    setFiles(dd);
  };

  return (
    <Modal
      title={`Preview Selected files`}
      closable={true}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} className="mr-2" loading={loading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className="bg-[#3A9868]"
          loading={loading}
        >
          Save Files
        </Button>,
      ]}
      width={800}
      maskClosable={false}
    >
      <div className="border-t">
        <h1 className="text-[14px] font-medium py-2">
          Total Screens Selected:{" "}
          <span className="font-semibold">{screensName?.length} </span>
          Total Media Selected:{" "}
          <span className="font-semibold">{files?.length}</span>
        </h1>

        <div className="h-[60vh] overflow-scroll scrollbar-minimal border-t">
          {updatedFiles?.length > 0 ? (
            <ViewMediaForUploadCreatives3
              files={updatedFiles}
              removeFile={removeFile}
              viewCreativeType="1"
            />
          ) : (
            <NoDataView title="Creative Not Uploaded yet" />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ShowUploadedCreativePopup;
