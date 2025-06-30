import { Tooltip } from "antd";
import { RadioInput } from "../../components/atoms/RadioInput";

interface WeatherSegmentProps {
  currentTab?: any;
  minVal?: any;
  setMinVal?: any;
  maxVal?: any;
  setMaxVal?: any;
  rainType?: any;
  setRainType?: any;
  aqi?: any;
  setAqi?: any;
  setTriggerSelected?: any;
}

export const WeatherSegment = ({
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
  rainType,
  setRainType,
  currentTab,
  aqi,
  setAqi,
  setTriggerSelected,
}: WeatherSegmentProps) => {
  return (
    <div className="">
      {currentTab === 1 ? (
        <div className="border-b p-2">
          <div className="flex gap-2 items-center">
            <h1 className="md:text-[16px] sm:text-[14px]">
              Play my ad when temperature turns
            </h1>
            <Tooltip title="Choose temperature range for adding contextual ads in your campaign for targetting your audience in context of temperature related events">
              <i className="fi fi-rs-info p-1 text-[12px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <div className="py-2">
            <div className="flex justify-between py-1">
              <RadioInput
                title="Less then 10&deg;"
                value="0-10"
                isChecked={maxVal === Number("10") ? true : false}
                onChange={() => {
                  setMinVal(0);
                  setMaxVal(10);
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#5BB8F7]">Freezing</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="10&deg; to 20&deg;"
                value="10-20"
                isChecked={maxVal === Number("20") ? true : false}
                onChange={() => {
                  setMinVal(10);
                  setMaxVal(20);
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#1D9EF7]">Cold</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="20&deg; to 30&deg;"
                value="20-30"
                isChecked={maxVal === Number("30") ? true : false}
                onChange={() => {
                  setMinVal(20);
                  setMaxVal(30);
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#348655]">Pleasant</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="30&deg; to 42&deg;"
                value="30-42"
                isChecked={maxVal === Number("42") ? true : false}
                onChange={() => {
                  setMinVal(30);
                  setMaxVal(42);
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#F79D5B]">Hot</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="More the 42&deg;"
                value="42-50"
                isChecked={minVal === Number("42") ? true : false}
                onChange={() => {
                  setMinVal(42);
                  setMaxVal(50);
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#C63A3A]">Burning</p>
            </div>
          </div>
        </div>
      ) : currentTab === 2 ? (
        <div className="border-b p-2">
          <div className="flex gap-2 items-center">
            <h1 className="md:text-[16px] sm:text-[14px]">
              Play my ad when rain forecast is
            </h1>
            <Tooltip title="Choose raining conditions for adding contextual ads in your campaign for targetting your audience in context of rain related events">
              <i className="fi fi-rs-info p-1 text-[12px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <div className="py-2">
            <div className="flex justify-between py-1">
              <RadioInput
                title="Cloudy"
                value="cloudy"
                isChecked={rainType === "cloudy" ? true : false}
                onChange={() => {
                  setRainType("cloudy");
                  setTriggerSelected(true);
                }}
              />
              <i className="fi fi-tr-smog text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Drizzle"
                value="drizzle"
                isChecked={rainType === "drizzle" ? true : false}
                onChange={() => {
                  setRainType("drizzle");
                  setTriggerSelected(true);
                }}
              />
              <i className="fi fi-tr-cloud-drizzle text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Heavy"
                value="heavy"
                isChecked={rainType === "heavy" ? true : false}
                onChange={() => {
                  setRainType("heavy");
                  setTriggerSelected(true);
                }}
              />
              <i className="fi fi-tr-cloud-showers-heavy text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Storm"
                value="storm"
                isChecked={rainType === "storm" ? true : false}
                onChange={() => {
                  setRainType("storm");
                  setTriggerSelected(true);
                }}
              />
              <i className="fi fi-tr-thunderstorm text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Stopped"
                value="stopped"
                isChecked={rainType === "stopped" ? true : false}
                onChange={() => {
                  setRainType("stopped");
                  setTriggerSelected(true);
                }}
              />
              <i className="fi fi-rr-cloud-disabled text-[14px] text-[#5BB8F7]"></i>
            </div>
          </div>
        </div>
      ) : currentTab === 3 ? (
        <div className="border-b p-2">
          <div className="flex gap-2 items-center">
            <h1 className="md:text-[16px] sm:text-[14px]">
              Play my ad when AQI is
            </h1>
            <Tooltip title="Choose AQI range for adding contextual ads in your campaign for targetting your audience in context of AQI related events">
              <i className="fi fi-rs-info p-1 text-[12px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <div className="py-2">
            <div className="flex justify-between py-1">
              <RadioInput
                title="Good"
                value="good"
                isChecked={aqi === "good" ? true : false}
                onChange={() => {
                  setMaxVal(0);
                  setMaxVal(50);
                  setAqi("good");
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#348655]">0-50</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Moderate"
                value="moderate"
                isChecked={aqi === "moderate" ? true : false}
                onChange={() => {
                  setMaxVal(51);
                  setMaxVal(100);
                  setAqi("moderate");
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#1D9EF7]">51-100</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Poor"
                value="poor"
                isChecked={aqi === "poor" ? true : false}
                onChange={() => {
                  setMaxVal(101);
                  setMaxVal(200);
                  setAqi("poor");
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#5BB8F7]">101-200</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Unhealthy"
                value="unhealthy"
                isChecked={aqi === "unhealthy" ? true : false}
                onChange={() => {
                  setMaxVal(201);
                  setMaxVal(350);
                  setAqi("unhealthy");
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#F79D5B]">201-350</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Hazardous"
                value="hazardous"
                isChecked={aqi === "hazardous" ? true : false}
                onChange={() => {
                  setMaxVal(351);
                  setMaxVal(500);
                  setAqi("hazardous");
                  setTriggerSelected(true);
                }}
              />
              <p className="text-[14px] text-[#C63A3A]">351-500</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
