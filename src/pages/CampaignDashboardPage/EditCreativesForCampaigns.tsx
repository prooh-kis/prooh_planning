import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getScreenDataUploadCreativeData } from "../../actions/screenAction";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { TabWithoutIcon } from "../../components";
import { DropdownInput } from "../../components/atoms/DropdownInput";

const creativeTabs = [{
  id: "1",
  label: "Regular Creatives",
  value: "regular_creatives",
}, {
  id: "2",
  label: "Trigger Creatives",
  value: "trigger_creatives",
}];

const creativeTypes = [{
  id: "1",
  label: "jpeg",
  value: "image/jpeg",
}, {
  id: "2",
  label: "jpg",
  value: "image/jpg",
}, {
  id: "3",
  label: "png",
  value: "image/png",
}, {
  id: "4",
  label: "mp4",
  value: "video/mp4",
}];

export const EditCreativesForCampaigns = (props: any) => {
  const dispatch = useDispatch<any>();
  const { campaignCreation } = props;

  const [creativeTab, setCreativeTab] = useState<any>("1");
  const [selectedCreativeType, setSelectedCreativeType] = useState<any>(null);


  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedRatio, setSelectedRatio] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>("day");

  const screenDataUploadCreative = useSelector(
    (state: any) => state.screenDataUploadCreative
  );
  const {
    loading: loadingScreenData,
    error: errorScreenData,
    data: screenData,
  } = screenDataUploadCreative;

  useEffect(() => {
    if (screenData) {
      setSelectedCity(Object.keys(screenData)[0]);
      setSelectedRatio(screenData[Object.keys(screenData)[0]][0].screenResolution);
    }
  },[screenData]);
  useEffect(() => {
    if (campaignCreation) {
      dispatch(getScreenDataUploadCreativeData({ id: campaignCreation?._id }));
    }
  },[dispatch, campaignCreation]);

  useEffect(() => {
    if (props?.open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.open]);

  if (!props?.open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-full overflow-auto max-h-auto "
        style={{ height: "90vh", width: "90vw" }}
      >
        {loadingScreenData ? (
          <div>
            <SkeletonLoader />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center">
                <h1 className="text-[14px] font-bold">Update Campaign</h1>
              </div>
              <div className="flex items-center gap-4">
                <PrimaryButton
                  title="Publish"
                  action={() => {}}
                  height="h-8"
                  width="w-20"
                  textSize="text-[12px]"
                  rounded="rounded"                  
                />
                <i className="fi fi-br-circle-xmark" onClick={() => props?.setOpenEdit(false)}></i>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 p-2">
              <div className="col-span-8 rounded border border-gray-100 grid grid-cols-12">
                <div className="col-span-4 p-2">
                  <h1 className="text-[14px] font-semibold">
                    Filters
                  </h1>
                  <div className="p-1">
                    <h1 className="text-[12px] font-semibold">City</h1>
                    {Object.keys(screenData)?.map((city: any, i: any) => (
                      <div key={i} className="p-1 border-b">
                        <CheckboxInput
                          label={city}
                          textSize="12px"
                          small={true}
                          checked={selectedCity === city}
                          onChange={() => {setSelectedCity(city)}}
                        />
                        {screenData[city]?.map((screen: any, j: any) => (
                          <div key={j} className="p-1">
                            <CheckboxInput
                              label={screen.screenResolution}
                              textSize="12px"
                              checked={selectedRatio === screen.screenResolution}
                              onChange={() => {setSelectedRatio(screen.screenResolution)}}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-8 p-2 border-l border-gray-100">
                  <div className="flex items-center justify-between">
                    <h1 className="text-[14px] font-semibold truncate">
                      {campaignCreation?.name}
                    </h1>
                    <h1 className="text-[12px] text-gray-400 truncate">
                      Creative Ratio: {selectedRatio ? selectedRatio : "None selected"}
                    </h1>
                  </div>
                  <div className="py-2">
                    <TabWithoutIcon
                      tabData={creativeTabs}
                      currentTab={creativeTab}
                      setCurrentTab={setCreativeTab}
                    />
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <PrimaryButton
                          title="Day"
                          height="h-8"
                          width="w-20"
                          rounded="rounded-full"
                          textSize="text-[12px]"
                          reverse={selectedTime !== "day" ? true : false}
                          action={() => {
                            setSelectedTime("day");
                          }}
                        />
                         <PrimaryButton
                          title="Night"
                          height="h-8"
                          width="w-20"
                          rounded="rounded-full"
                          textSize="text-[12px]"
                          reverse={selectedTime !== "night" ? true : false}
                          action={() => {
                            setSelectedTime("night");
                          }}
                        />
                      </div>
                      <div>
                        <DropdownInput
                          height="8"
                          width="20"
                          placeHolder={"Creative Type"}
                          selectedOption={selectedCreativeType}
                          setSelectedOption={setSelectedCreativeType}
                          options={creativeTypes}
                          border = "border-gray-200"
                          rounded={true}
                        />
                      </div>
                    </div>
                    <div className="border border-dashed rounded flex items-center justify-center my-2">
                      <h1 className="p-2 text-[14px]">Upload Creatives</h1>
                    </div>
                    
                  </div>
                </div>

              </div>
              <div className="col-span-4 p-2 rounded border border-gray-100">
                <h1 className="text-[14px] font-semibold">Uploaded Creatives</h1>
                {screenData[selectedCity]?.filter((cr: any) => cr.screenResolution === selectedRatio)?.map((creative: any, i: any) => (
                  <div key={i}>
                    <h1>{i}</h1>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
