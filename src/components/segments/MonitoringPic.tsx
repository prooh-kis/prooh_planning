import { useMemo, useState } from "react";
import ButtonInput from "../../components/atoms/ButtonInput";
import {
  MonitoringData,
  MonitoringTypeWiseData,
} from "../../types/monitoringTypes";
import { MonitoringPicCard } from "../../components/molecules/MonitoringPicCard";
import { NoDataView } from "../../components/molecules/NoDataView";

interface TransformedData {
  startDate: Array<{
    url: string;
    uploadedDate: string;
    fileType: string;
    monitoringType: string;
  }>;
  endDate: Array<{
    url: string;
    uploadedDate: string;
    fileType: string;
    monitoringType: string;
  }>;
  midDate: Array<{
    url: string;
    uploadedDate: string;
    fileType: string;
    monitoringType: string;
  }>;
}

interface MonitoringPicProps {
  result?: MonitoringData[];
}

export const MonitoringPic = ({ result = [] }: MonitoringPicProps) => {
  const [currentTab, setCurrentTab] =
    useState<keyof TransformedData>("startDate");

  // Define the order of tabs and their labels
  const tabOrder = ["startDate", "midDate", "endDate"] as const;
  const tabLabels = {
    startDate: "Start Date",
    midDate: "Mid Monitoring",
    endDate: "End Date",
  } as const;

  // Get available date types from the result
  const availableDateTypes = result
    .map((d) => d.dateType)
    .filter((value): value is keyof TransformedData =>
      ["startDate", "midDate", "endDate"].includes(value)
    );

  // Filter and map tabs based on available data
  const getTabData = () => {
    return tabOrder
      .filter((key) => availableDateTypes.includes(key))
      .map((key) => ({
        label: tabLabels[key],
        id: key,
      }));
  };

  // Transform the data into the desired format
  const transformData = (): TransformedData => {
    const output: TransformedData = {
      startDate: [],
      endDate: [],
      midDate: [],
    };

    result.forEach((item) => {
      const dateType = item.dateType as keyof TransformedData;
      if (!output.hasOwnProperty(dateType)) return;

      item.monitoringTypeWiseData.forEach(
        (monitoringTypeData: MonitoringTypeWiseData) => {
          monitoringTypeData.monitoringUrls.forEach((urlData) => {
            output[dateType].push({
              url: urlData.awsUrl || "",
              uploadedDate: urlData.uploadedDate,
              fileType: urlData.fileType,
              monitoringType: monitoringTypeData.monitoringType,
            });
          });
        }
      );
    });

    return output;
  };

  const transformedData = transformData();
  const currentTabData = transformedData[currentTab] || [];
  const colorCode = useMemo(() => {
    return currentTab === "startDate"
      ? "text-[#5AAF69]"
      : currentTab === "midDate"
      ? "text-[#FF8D22]"
      : "text-[#E43535]";
  }, [currentTab]);

  return (
    <div className="overflow-auto">
      <div className="flex gap-4">
        {getTabData().map((data) => (
          <ButtonInput
            variant={currentTab === data.id ? "primary" : "outline"}
            rounded="full"
            size="small"
            onClick={() => setCurrentTab(data.id)}
            key={data.id}
          >
            {data.label}
          </ButtonInput>
        ))}
      </div>
      {currentTabData?.length === 0 ? (
        <NoDataView />
      ) : (
        <div className="grid grid-cols-2 gap-4  h-[38vh] overflow-auto mt-4">
          {currentTabData.map((data, index) => (
            <MonitoringPicCard
              key={`${data.monitoringType}-${index}`}
              url={data.url || ""}
              fileType={data.fileType}
              monitoringType={data.monitoringType}
              uploadedDate={data.uploadedDate}
              colorCode={colorCode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
