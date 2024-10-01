import { useEffect, useState } from "react";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";

interface CreativeUploadDetails {
  setCurrentStep: (step: number) => void;
  step: number;
}


export const CreativeUploadDetails = ({ setCurrentStep, step }: CreativeUploadDetails) => {
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [citiesCreative, setCitiesCreative] = useState<any>([
    {
      id: "1",
      label: "Delhi",
      params: [10, 40]
    },
    {
      id: "2",
      label: "Gurgaon",
      params: [0, 40]
    },{
      id: "3",
      label: "Noida",
      params: [20, 10]
    },
  ])

  const creativeUploadTabs = ({ cities }: any) => {
    console.log(cities)
    // setCitiesCreative(cities.map((city: any, index: any) => {
    //   return {
    //     params: [],
    //     label: city.label,
    //     id: `${index + 1}`
    //   }
    // }));
  };

  useEffect(() => {
    creativeUploadTabs({citiesCreative})
  },[citiesCreative]);

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-2xl font-semibold">Upload Creative</h1>
        <h1 className="text-sm text-gray-500 ">
          Upload your creatives for the campaigns for your selected screens
        </h1>
      </div>
      <div className="flex gap-4">
        <TabWithoutIcon tabData={citiesCreative} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div>
        
      </div>
    </div>
  )
}