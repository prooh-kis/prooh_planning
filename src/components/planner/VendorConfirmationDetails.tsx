import { VendorConfirmationAdvancedTable } from "../../components/tables/VendorConfirmationAdvancedTable";
import { MultiColorLinearBar } from "../../components/molecules/MultiColorLinearBar";
import { VendorConfirmationBasicTable } from "../../components/tables/VendorConfirmationBasicTable";
import { useState } from "react";
import { EmailSendBox } from "../../components/segments/EmailSendBox";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";

interface VendorConfirmationDetailsProps {
  setCurrentStep: any;
  step: any;
}

export const VendorConfirmationDetails = ({
  setCurrentStep,
  step,
}: VendorConfirmationDetailsProps) => {

  const [files, setFiles] = useState<any>([]);

  const handleAddNewFile = async (file: File) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);

      setFiles((pre: any) => [
        ...pre,
        {
          file: file,
          url: fileURL,
          fileType: file.type,
          fileSize: file.size,
          awsURL: "",
        },
      ]);
    }
  };

  const removeImage = (file: any) => {
    setFiles(files.filter((singleFile: any) => singleFile.url !== file.url));
  };

  return (
    <div className="w-full pt-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] text-primaryText font-semibold">
            Vendor Confirmation Status
          </h1>
          <p className="text-[14px] text-secondaryText">
            Check and confirm media availability for your campaign plan
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center justify-end text-red-500">
            <i className="fi fi-br-clock-three flex items-center"></i>
            <h1 className="text-[14px] font-semibold">00.30</h1>
          </div>
          <p className="text-[12px] text-gray-400">Time Remaining</p>

        </div>
      </div>
      
      <VendorConfirmationBasicTable />

      <div className="py-4 w-full">
        <div className="flex gap-4">
          <div className="flex">
            <h1 className="text-[14px]">Approved (08)</h1>
          </div>
          <div className="flex">
            <h1 className="text-[14px]">Pending (08)</h1>
          </div>
          <div className="flex">
            <h1 className="text-[14px]">Rejected (08)</h1>
          </div>
        </div>
        <div className="pb-4">
          <MultiColorLinearBar
            values={[2, 3, 4]}
            colors={[]}
            totalValue={9}
          />
        </div>
        <VendorConfirmationAdvancedTable />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 border rounded-[12px] p-2">
          <EmailSendBox />
        </div>
        <div className="col-span-1 border rounded-[12px] p-2">
          <EmailConfirmationImage
            files={files}
            handleAddNewFile={handleAddNewFile}
            removeImage={removeImage}
          />
        </div>
      </div>
      
    </div>
  )
}