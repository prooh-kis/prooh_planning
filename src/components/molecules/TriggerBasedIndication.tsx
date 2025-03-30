const triggerText = [
  "When it's freezing outside",
  "When it's cold outside",
  "When it's pleasant outside",
  "When it's hot outside",
  "When it's burning outside",
  "When it's cloudy outside",
  "When it's drizzling outside",
  "When it's raining heavily outside",
  "When it's stormy outside",
  "When rain is stopped",
  "When AQI is good",
  "When AQI is Moderate",
  "When AQI is Poor",
  "When AQI is Unhealthy",
  "When AQI is Hazardous",
];

export const TriggerBasedIndication = ({ triggerData, triggerType }: any) => {
  return (
    <div className="">
      <h1 className="py-2">
        Upload creative for <span className="font-semibold">{triggerType}</span>{" "}
      </h1>

      {triggerType === "Weather Trigger" && (
        <div className="text-[14px] pb-2">
          <h1 className="font-semibold">
            {triggerData?.type === "rain"
              ? "Rain Based Trigger"
              : triggerData?.type === "temperature"
              ? "Temperature Based Trigger"
              : triggerData?.type === "aqi"
              ? "AQI Based Trigger"
              : "None"}{" "}
          </h1>
          <h1>
            {triggerData?.type === "temperature" && triggerData?.maxVal === 10
              ? triggerText[0]
              : triggerData?.type === "temperature" &&
                triggerData?.maxVal === 20
              ? triggerText[1]
              : triggerData?.type === "temperature" &&
                triggerData?.maxVal === 30
              ? triggerText[2]
              : triggerData?.type === "temperature" &&
                triggerData?.maxVal === 42
              ? triggerText[3]
              : triggerData?.type === "temperature" &&
                triggerData?.minVal === 42
              ? triggerText[4]
              : triggerData?.type === "rain" &&
                triggerData?.rainType === "cloudy"
              ? triggerText[5]
              : triggerData?.type === "rain" &&
                triggerData?.rainType === "drizzel"
              ? triggerText[6]
              : triggerData?.type === "rain" &&
                triggerData?.rainType === "heavy"
              ? triggerText[7]
              : triggerData?.type === "rain" &&
                triggerData?.rainType === "storm"
              ? triggerText[8]
              : triggerData?.type === "rain" &&
                triggerData?.rainType === "stopped"
              ? triggerText[9]
              : triggerData?.type === "aqi" && triggerData?.aqi === "good"
              ? triggerText[10]
              : triggerData?.type === "aqi" && triggerData?.aqi === "bad"
              ? triggerText[11]
              : triggerData?.type === "aqi" && triggerData?.aqi === "poor"
              ? triggerText[12]
              : triggerData?.type === "aqi" && triggerData?.aqi === "unhealthy"
              ? triggerText[13]
              : triggerData?.type === "aqi" && triggerData?.aqi === "hazardous"
              ? triggerText[14]
              : ""}
          </h1>
        </div>
      )}
    </div>
  );
};
