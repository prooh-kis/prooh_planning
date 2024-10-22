import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import { CostSummaryTable1 } from "../../components/tables";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useState } from "react";

export function ScreenSummaryModel({ totalScreensData }: any) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      <button
        type="submit"
        onClick={() => setOpen(true)}
        className="w-[160px] border border-1 rounded-full py-2 px-4 text-[14px] hover:bg-blue-500 hover:text-white"
      >
        Screen Summary
      </button>
      <Modal open={open} onCancel={handleCancel} footer={[]} width={1100}>
        <div className="p-2">
          {/* <CostSummaryTable1
            totalData={totalScreensData}
            selectedData={totalScreensData}
          /> */}
        </div>
      </Modal>
    </div>
  );
}
