import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import { CostSummaryTable1 } from "../../components/tables";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useState } from "react";

export function ScreenSummaryModel({ loadingCost, totalScreensData}: any) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      <button
        type="submit"
        onClick={() => setOpen(true)}
        className="w-[140px] border border-1 rounded-full py-2 px-4 text-[14px] hover:bg-[#00A0FA] hover:text-white"
      >
        Plan Summary
      </button>
      <Modal open={open} onCancel={handleCancel} footer={[]} width={1100}>
        <div className="p-2">
          <CostSummaryTable1
            loading={loadingCost}
            totalData={totalScreensData}
            // selectedData={selectedScreensData}
          />
        </div>
      </Modal>
    </div>
  );
}
