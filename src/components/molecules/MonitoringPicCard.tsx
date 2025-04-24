import { format } from "date-fns";
import { FileTypeIcon } from "./FileTypeIcon";
import { useState } from "react";

interface MonitoringTypeConfig {
  label: string;
  value: string;
  iconType: string;
}

interface MonitoringPicCardProps {
  url: string;
  fileType: string;
  monitoringType: string;
  uploadedDate: string;
  colorCode: string;
}

const MONITORING_TYPE_CONFIGS: MonitoringTypeConfig[] = [
  { label: "Day Shots", value: "dayShot", iconType: "fi-rs-brightness" },
  {
    label: "With News paper",
    value: "withNewspaper",
    iconType: "fi-rr-newspaper",
  },
  {
    label: "With Geo Tag",
    value: "withGeoTag",
    iconType: "fi-ss-map-marker-check",
  },
  {
    label: "Loop Video",
    value: "loopVideo",
    iconType: "fi-sr-video-camera-alt",
  },
  { label: "Night Shots", value: "nightShot", iconType: "fi-ss-moon" },
];

const MONITORING_TYPE_LABELS: Record<string, string> = {
  dayShot: "Day Shot",
  withNewspaper: "With Newspaper",
  loopVideo: "Loop Video",
  nightShot: "Night Shot",
  withGeoTag: "With Geo Tag",
};

export const MonitoringPicCard = ({
  url,
  fileType,
  monitoringType,
  uploadedDate,
  colorCode,
}: MonitoringPicCardProps) => {
  const [typeConfigs] = useState(MONITORING_TYPE_CONFIGS);
  const isImage = fileType.startsWith("image/");
  const isVideo = fileType.startsWith("video/");
  const formattedDate = format(new Date(uploadedDate), "yyyy-MM-dd");
  const iconType = typeConfigs.find(
    (config) => config.value === monitoringType
  )?.iconType;
  const displayType = MONITORING_TYPE_LABELS[monitoringType] || monitoringType;

  const renderMedia = () => {
    if (isImage) {
      return (
        <img
          src={url}
          alt={displayType}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      );
    }

    if (isVideo) {
      return (
        <video
          src={url}
          controls
          className="w-full h-full object-cover"
          aria-label={displayType}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <div className="p-4 text-center">
        <FileTypeIcon
          fileType={fileType}
          monitoringType={monitoringType}
          className="w-12 h-12 mx-auto"
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Unsupported file type
        </p>
      </div>
    );
  };

  return (
    <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 h-[150px]">
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative">
        {renderMedia()}
      </div>

      <div className="px-2 py-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 item-center">
            {iconType && <i className={`fi ${colorCode} ${iconType} `} />}
            <span className=" gap-4 inline-block text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {displayType}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};
