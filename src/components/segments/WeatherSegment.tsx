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
}: WeatherSegmentProps) => {
  return (
    <div className="pt-4">
      {currentTab === 1 ? (
        <div className="border-b p-2">
          <div className="flex gap-2">
            <i className="fi fi-tr-summer flex items-center"></i>
            <h1>Play my ad when temperature turns</h1>
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
                }}
              />
              <p className="text-[14px] text-[#C63A3A]">Burning</p>
            </div>
          </div>
        </div>
      ) : currentTab === 2 ? (
        <div className="border-b p-2">
          <div className="flex gap-2">
            <i className="fi fi-tr-summer flex items-center"></i>
            <h1>Play my ad when rain forecast is</h1>
          </div>
          <div className="py-2">
            <div className="flex justify-between py-1">
              <RadioInput
                title="Cloudy"
                value="cloudy"
                isChecked={rainType === "cloudy" ? true : false}
                onChange={() => setRainType("cloudy")}
              />
              <i className="fi fi-tr-smog text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Drizzle"
                value="drizzle"
                isChecked={rainType === "drizzel" ? true : false}
                onChange={() => setRainType("drizzel")}
              />
              <i className="fi fi-tr-cloud-drizzle text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Heavy"
                value="heavy"
                isChecked={rainType === "heavy" ? true : false}
                onChange={() => setRainType("heavy")}
              />
              <i className="fi fi-tr-cloud-showers-heavy text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Storm"
                value="storm"
                isChecked={rainType === "storm" ? true : false}
                onChange={() => setRainType("storm")}
              />
              <i className="fi fi-tr-thunderstorm text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Stopped"
                value="stopped"
                isChecked={rainType === "stopped" ? true : false}
                onChange={() => setRainType("stopped")}
              />
              <i className="fi fi-rr-cloud-disabled text-[14px] text-[#5BB8F7]"></i>
            </div>
          </div>
        </div>
      ) : currentTab === 3 ? (
        <div className="border-b p-2">
          <div className="flex gap-2">
            <i className="fi fi-tr-summer flex items-center"></i>
            <h1>Play my ad when AQI is</h1>
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
                }}
              />
              <p className="text-[14px] text-[#C63A3A]">351-500</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}