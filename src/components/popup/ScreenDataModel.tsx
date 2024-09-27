import { CarouselImageView } from "../CarouselImageView";
import { Modal } from "antd";
import React, { useCallback, useState } from "react";

interface Props {
  screenName: string;
}

const screen = {
  _id: {
    $oid: "66b0eb8ae6a4c4f2d02dc7a5",
  },
  screenId: "66b0eb8ae6a4c4f2d02dc7a5",
  screenName: "Zeus_Testing-1",
  images: [
    "https://proohimage.s3.ap-south-1.amazonaws.com/Screen+images/NGC+T++point+1+Dummy.jpg",
    "https://proohimage.s3.ap-south-1.amazonaws.com/Screen+images/NGC+T++point+1+Dummy.jpg",
    "https://proohimage.s3.ap-south-1.amazonaws.com/Screen+images/NGC+T++point+1+Dummy.jpg",
    "https://proohimage.s3.ap-south-1.amazonaws.com/Screen+images/NGC+T++point+1+Dummy.jpg",
  ],
  integrationStatus: false,
  screenCode: "DL1cTd",
  orientation: "",
  hardwarePitch: "P13",
  brightness: 5000,
  operationalDuration: {
    totalDuration: 18.000000000000004,
    onTime: "08:00:00",
    offTime: "02:00:00",
    _id: {
      $oid: "66b11ea59bdf8fd6b7ab9771",
    },
  },
  screenResolution: "1000x2000",
  specification: "1x2",
  screenLength: 5.7,
  screenWidth: 11.3,
  screenStatus: "active",
  networkType: "",
  totalUnitsAvailable: 1,
  loopLengthSeconds: 180,
  slotLengthSeconds: 10,
  totalSlotForOneBrand: 8640.000000000002,
  rateForOneDay: 3333.3333333333335,
  dwellTime: "",
  screenType: "LED Screen",
  totalImpression: 700,
  cpm: 0.27006172839506165,
  asPerMOP: 0,
  creativeType: [""],
  sound: false,
  masterMediaPlayer: "",
  location: {
    locationId: "",
    address: "M3M, IFC - Walking entrance, Unipole Left",
    country: "India",
    state: "Haryana",
    city: "Gurgaon",
    pincode: 122002,
    locationLevel: 0,
    zoneOrRegion: "",
    locationPin: "",
    geographicalLocation: {
      latitude: 28.406015,
      longitude: 77.0587,
    },
    kmlPolygon: {},
    entryPoint: {
      latitude: 0,
      longitude: 0,
    },
    screenPlacement: {
      angle: 0,
      altitude: 0,
      viewingDistance: 0,
    },
    touchPoints: ["CBD- Corporate offices"],
    pointOfInterest: [
      " CBD- Corporate offices, Premium F&B Cluster, Premium High Street",
    ],
    highlights: "",
    _id: {
      $oid: "66b11ea59bdf8fd6b7ab9776",
    },
  },
  campaigns: [
    {
      campaignId: "66b11ea59bdf8fd6b7ab9798",
      campaignType: ["morning", "afternoon", "evening", "night"],
      _id: {
        $oid: "66b11ea59bdf8fd6b7ab979a",
      },
    },
  ],
  highlights: [],
  master: {
    $oid: "6687a6d79052da08eb07ba3b",
  },
  masterEmail: "prooh.aiaws@gmail.com",
  lastActive: "Mon Sep 23 2024 11:59:49 GMT+0000 (Coordinated Universal Time)",
  unitsConnected: [],
  __v: 59,
  locationPins: [],
  syncStatus: "active",
  defaultVideoUrl:
    "https://store-files-in-s3.s3.ap-south-1.amazonaws.com/66c44138a8937cdfda5992bc.mp4",
  defaultVideo: {
    screenId: "",
    campaignId: "",
    mediaId: "",
    url: "https://store-files-in-s3.s3.ap-south-1.amazonaws.com/66c44138a8937cdfda5992bc.mp4",
    name: "66c44138a8937cdfda5992bc.mp4",
    duration: "10.026667",
    fileType: "video",
    fileSize: 2654461,
    atIndex: [],
    _id: {
      $oid: "66c895c2396a6d16926d978d",
    },
  },
};

const h1css = "text-sm font-semiBold";
const h2css = "";

export function ScreenDataModel({ screenName }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  return (
    <div>
      <h1 onClick={handleOpen}>{screenName}</h1>
      <Modal open={open} onCancel={handleCancel} footer={[]} width={1100}>
        <div className="flex gap-8">
          <div className="w-96">
            <CarouselImageView images={screen.images} />
          </div>
          <div className="w-100%">
            <h1 className="text-xl font-semibold pb-4">Screen Detail</h1>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2 font-semibold">
                <h1 className="">Placement area</h1>
                <h1>Integration status</h1>
                <h1>Hardware pitch</h1>
                <h1>Gio location</h1>
                <h1>Pine code</h1>
                <h1>Operational hours</h1>
                <h1>Operational time</h1>
                <h1>Resolution</h1>
                <h1>Size</h1>
                <h1>Network type</h1>
                <h1>Total units available loop length in sec.</h1>
                <h1>Slot length in sec.</h1>
                <h1>slots taken</h1>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 font-normal">
                  <h1>{screen?.location?.address}</h1>
                  <h1>{screen?.integrationStatus ? "Yes" : "No"}</h1>
                  <h1>{screen?.hardwarePitch}</h1>
                  <h1>
                    {screen?.location?.geographicalLocation?.latitude}x
                    {screen?.location?.geographicalLocation?.longitude}
                  </h1>
                  <h1>{screen?.location?.pincode}</h1>
                  <h1>{screen?.operationalDuration?.totalDuration}</h1>
                  <h1>
                    {screen?.operationalDuration?.onTime}AM -{" "}
                    {screen?.operationalDuration?.offTime}AM
                  </h1>
                  <h1>{screen?.screenResolution}</h1>
                  <h1>
                    {screen?.screenLength}'' x {screen?.screenWidth}''
                  </h1>
                  <h1>{screen?.networkType || "N/A"}</h1>
                  <h1>240</h1>
                  <h1>10</h1>
                  <h1>2</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <h1 className="py-2 text-xl font-semibold">
            Your selected cohort time
          </h1>
          <div className="flex justify-between items-end">
            <div className="flex gap-4 text-gray-500">
              <div className="border border-1 py-2 px-4 flex flex-col items-center">
                <h1>Morning - Afternoon</h1>
                <h1>8 am - 11 am</h1>
              </div>
              <div className="border border-1 py-2 px-4 flex flex-col items-center">
                <h1>Afternoon - Evening</h1>
                <h1>3 pm - 5 pm</h1>
              </div>
              <div className="border border-1 py-2 px-4 flex flex-col items-center">
                <h1>Evening - Night</h1>
                <h1>8 pm - 11 pm</h1>
              </div>
            </div>
            <div className="flex  items-center gap-4 ">
              <button
                className="border border-1 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
                title="Go back"
              >
                Remove screen
              </button>
              <button
                className="border border-1 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                title="Save and go next"
              >
                Next screen
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
