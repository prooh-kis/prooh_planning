import { CostSummaryTable1 } from "../../components/tables";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import ButtonInput from "../../components/atoms/ButtonInput";

export function ScreenSummaryModel({
  pageName,
  loadingCost,
  totalScreensData,
}: any) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      <ButtonInput
        onClick={() => setOpen(true)}
        variant="outline"
        rounded="full"
      >
        Summary
      </ButtonInput>

      <Modal open={open} onCancel={handleCancel} footer={[]} width={1100}>
        <div className="p-2 mt-4">
          <h1 className="text-[12px] p-1 font-semibold">
            Campaign Cost Summary{" "}
          </h1>
          <CostSummaryTable1
            loading={loadingCost}
            totalData={totalScreensData}
            pageName={pageName}
          />
        </div>
      </Modal>
    </div>
  );
}
