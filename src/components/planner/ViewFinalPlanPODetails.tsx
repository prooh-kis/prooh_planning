import { useState } from "react";
import { FileUploadButton } from "../FileUploadButton";
import { ImageViewCloseButton } from "../molecules/ImageViewCloseButton";
import { Divider } from "antd";
import { Footer } from "../../components/footer";
import { EmailConfirmationImage } from "../../components/segments/EmailConfirmationImage";
import { EmailSendBox } from "../../components/segments/EmailSendBox";

interface ViewFinalPlanPODetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
}

function MyDiv({ left, right }: any) {
  return (
    <div className="flex font-normal text-[#2B2B2B]">
      <h1 className="text-left text-[14px] basis-1/2">{left}</h1>
      <h1 className="text-left text-[14px] basis-1/2">{right}</h1>
    </div>
  );
}

export const ViewFinalPlanPODetails = ({
  setCurrentStep,
  step,
}: ViewFinalPlanPODetailsProps) => {
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
    <div className="w-full py-3">
      <div>
        <h1 className="text-2xl font-semibold">View Final Plan & Share</h1>
        <h1 className="text-sm text-gray-500 ">
          Any specific route you want to cover in this campaign
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 mt-4 px-8 py-4 border border-1 border-#C3C3C3 rounded-2xl w-full">
          <h1 className="font-semibold py-2	">Client Information</h1>
          <MyDiv left={"Client Name"} right={"Surf excel"} />
          <MyDiv left={"Brand Name"} right={"Surf excel"} />
          <Divider />
          <h1 className="font-semibold py-2	">Client Details</h1>
          <MyDiv left={"Campaign Name"} right={"Surf excel"} />
          <MyDiv left={"Campaign Type"} right={"Surf excel"} />
          <MyDiv left={"Start Date"} right={"27 Aug, 2024, 08:00:00 AM"} />
          <MyDiv left={"End Date"} right={"31 Aug, 2024, 08:00:00 AM"} />
          <MyDiv left={"Duration"} right={"6 days"} />
          <Divider />
          <h1 className="font-semibold py-2	">Performance Metrics</h1>
          <MyDiv left={"audience impression"} right={"Surf excel"} />
          <MyDiv left={"Total screens"} right={"Surf excel"} />
          <MyDiv left={"Reach"} right={"27 Aug, 2024, 08:00:00 AM"} />
          <MyDiv left={"TG%"} right={"31 Aug, 2024, 08:00:00 AM"} />
          <MyDiv left={"CPM"} right={"6 days"} />
          <MyDiv left={"Selected Triggers"} right={"None"} />
          <Divider />
          <div className="flex font-semibold ">
            <h1 className="text-left basis-1/2">Total Cost</h1>
            <h1 className="text-left basis-1/2">INR 3 cr</h1>
          </div>
        </div>
        <div className="col-span-1 mt-4 p-8 border border-1 border-#C3C3C3 rounded-2xl w-full">
          <h1 className="font-semibold text-lg">
            1.Download or share your campaign plan{" "}
          </h1>
          <div className="flex gap-4 py-4">
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Approach</h1>
              <input title="approach" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Plan summary</h1>
              <input title="plan-summary" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Screen Picture</h1>
              <input title="screen-pictures" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <h1 className="text-[14px] truncate">Creative ratio</h1>
              <input title="creative-ratio" type="checkbox" />
            </div>
          </div>
          <button type="submit" className="px-8 py-2 border border-1 border-[#52ACFF] text-[#0094FF] rounded-full text-gray-500 text-sm">
            Download
          </button>
          <Divider />
          <EmailSendBox />
          <Divider />
          <EmailConfirmationImage
            files={files}
            handleAddNewFile={handleAddNewFile}
            removeImage={removeImage}
          />
        </div>
      </div>
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            setCurrentStep(step + 1);
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};
