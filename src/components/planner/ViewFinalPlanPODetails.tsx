import { useState } from "react";
import { FileUploadButton } from "../FileUploadButton";
import { ImageViewCloseButton } from "../molecules/ImageViewCloseButton";

interface ViewFinalPlanPODetails {
  setCurrentStep: (step: number) => void;
  step: number;
}

export const ViewFinalPlanPODetails = ({ setCurrentStep, step }: ViewFinalPlanPODetails) => {
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

  console.log("file : ", files);
  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-2xl font-semibold">View Final Plan & Share</h1>
        <h1 className="text-sm text-gray-500 ">
          Any specific route you want to cover in this campaign
        </h1>
      </div>
      <div className="flex gap-4 items-center py-4">
        <h1>Location:</h1>
        <div className="flex gap-2">
          <div className="border border-1 border-#C3C3C3 rounded-2xl py-1 px-4">
            Delhi
          </div>
          <div className="border border-1 border-#C3C3C3 rounded-2xl py-1 px-4">
            Gurgawan
          </div>
        </div>
      </div>
      <div className="flex  gap-8">
        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Campaign Name
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Total cost
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Brand Name
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Client Name
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Start Date
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              End Date
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Duration
            </h1>
          </div>
          <div className="flex flex-col w-full">
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">
              Filpkart
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">3 cr</h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">Ecard </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">Vishal</h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">
              27 Aug, 2024, 08:00:00 AM
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">
              31 Aug, 2024, 08:00:00 AM
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">4</h1>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-full">
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Campaign Type
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Trigger
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Total screens
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Estimated total audience impression
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              TG%
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              Reach
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3 bg-gray-50">
              CPM
            </h1>
          </div>
          <div className="flex flex-col w-full">
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">
              Reguler
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">3 cr</h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">None </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">34 </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">
              456000000
            </h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">64%</h1>
            <h1 className="py-1 px-4 border border-1 border-#C3C3C3">324.5</h1>
          </div>
        </div>
      </div>
      <div className="mt-4 p-8 border border-1 border-#C3C3C3 rounded-lg">
        <h1 className="font-semibold text-lg">
          1.Download or share your campaign plan{" "}
        </h1>
        <div className="flex gap-4 mt-2 justify-between">
          <div className="flex gap-1">
            <input
              placeholder="Enter email"
              type="email"
              className="px-4 py-2 border border-1 border-#C3C3C3 rounded-md"
            />
            <button className="px-4 py-2 border border-1 border-#C3C3C3 rounded-md bg-blue-400 text-white hover:bg-blue-600 text-md">
              Send
            </button>
            <button className="px-8 py-2 border border-1 border-#C3C3C3 rounded-md text-gray-500 text-sm">
              Download
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <i className="fi fi-br-screen"></i>
              <h1>Approach</h1>
              <input title="approach" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <i className="fi fi-br-screen"></i>
              <h1>Plan summary</h1>
              <input title="plan-summary" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <i className="fi fi-br-screen"></i>
              <h1>Screen Picture</h1>
              <input title="screen-pictures" type="checkbox" />
            </div>
            <div className="flex items-center gap-1">
              <i className="fi fi-br-screen"></i>
              <h1>Creative ratio</h1>
              <input title="creative-ratio" type="checkbox" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-8 border border-1 border-#C3C3C3 rounded-lg flex  justify-between">
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg">
            2.upload client approval screenshot
          </h1>
          <FileUploadButton handleFile={handleAddNewFile} />
        </div>
        <div className="flex gap-4">
          {files?.map((file: any, index: number) => (
            <ImageViewCloseButton file={file} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
