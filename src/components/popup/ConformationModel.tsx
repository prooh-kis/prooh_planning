import { CarouselImageView } from "../molecules/CarouselImageView";
import { Modal } from "antd";
import React, { useCallback, useState } from "react";

interface Props {
  handleConfirm: (value: boolean) => void;
}

export function ConformationModel({ handleConfirm }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const confirm = (value: boolean) => {
    handleConfirm(value);
    handleCancel();
  };

  return (
    <div className="truncate">
      <button
        className="border border-1 py-2 w-full rounded-md bg-gray-200 mt-4 hover:bg-gray-500 hover:text-white font-semibold"
        onClick={handleOpen}
      >
        Save creative
      </button>
      <Modal
        closable={false}
        open={open}
        onCancel={handleCancel}
        footer={[]}
        width={300}
        maskClosable={false}
      >
        <div>
          <div className="flex flex-col justify-center items-center  p-2">
            <i className="fi fi-sr-disk text-green-500 text-[24px]"></i>
            <h1 className="text-center font-semibold text-lg">
              Do you want save this
            </h1>
            <h1 className="text-center font-semibold text-lg">
              creative for same resolution?
            </h1>
            <h1 className="text-sm text-[#717171] text-center pt-2">
              you can also upload multiple creatives for
            </h1>
            <h1 className="text-sm text-[#717171] text-center">
              this campaign. you can also upload
            </h1>
            <h1 className="text-sm text-[#717171] text-center">
              different creative for day
            </h1>
          </div>
          <div className="flex justify-between pt-4">
            <button
              className="border border-1 py-1 px-8 rounded-md"
              onClick={() => {
                confirm(false);
              }}
            >
              No
            </button>
            <button
              className="border border-1 py-1 px-8 bg-[#129BFF] text-white rounded-md"
              onClick={() => {
                confirm(true);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
