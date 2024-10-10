import { RadioInput } from "../../components/atoms/RadioInput";

interface WeatherSegmentProps {
  currentTab?: any;
  condition?: any;
  setCondition?: any;
}

export const WeatherSegment = ({ condition, setCondition, currentTab }: WeatherSegmentProps) => {
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
                isChecked={condition === "0-10" ? true : false}
                onChange={() => setCondition("0-10")}
              />
              <p className="text-[14px] text-[#5BB8F7]">Freezing</p>  
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="10&deg; to 20&deg;"
                value="10-20"
                isChecked={condition === "10-20" ? true : false}
                onChange={() => setCondition("10-20")}
              />
              <p className="text-[14px] text-[#1D9EF7]">Cold</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="20&deg; to 30&deg;"
                value="20-30"
                isChecked={condition === "20-30" ? true : false}
                onChange={() => setCondition("20-30")}
              />
              <p className="text-[14px] text-[#348655]">Pleasant</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="30&deg; to 42&deg;"
                value="30-42"
                isChecked={condition === "30-42" ? true : false}
                onChange={() => setCondition("30-42")}
              />
              <p className="text-[14px] text-[#F79D5B]">Hot</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="More the 42&deg;"
                value="42-50"
                isChecked={condition === "42-50" ? true : false}
                onChange={() => setCondition("42-50")}
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
                isChecked={condition === "cloudy" ? true : false}
                onChange={() => setCondition("cloudy")}
              />
              <i className="fi fi-tr-smog text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Drizzle"
                value="drizzle"
                isChecked={condition === "drizzel" ? true : false}
                onChange={() => setCondition("drizzel")}
              />
              <i className="fi fi-tr-cloud-drizzle text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Heavy"
                value="heavy"
                isChecked={condition === "heavy" ? true : false}
                onChange={() => setCondition("heavy")}
              />
              <i className="fi fi-tr-cloud-showers-heavy text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Storm"
                value="storm"
                isChecked={condition === "storm" ? true : false}
                onChange={() => setCondition("storm")}
              />
              <i className="fi fi-tr-thunderstorm text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Stopped"
                value="stopped"
                isChecked={condition === "stopped" ? true : false}
                onChange={() => setCondition("stopped")}
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
                isChecked={condition === "good" ? true : false}
                onChange={() => setCondition("good")}
              />
              <p className="text-[14px] text-[#348655]">0-50</p>  
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Moderate"
                value="moderate"
                isChecked={condition === "moderate" ? true : false}
                onChange={() => setCondition("moderate")}
              />
              <p className="text-[14px] text-[#1D9EF7]">51-100</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Poor"
                value="poor"
                isChecked={condition === "poor" ? true : false}
                onChange={() => setCondition("poor")}
              />
              <p className="text-[14px] text-[#5BB8F7]">101-200</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Unhealthy"
                value="unhealthy"
                isChecked={condition === "unhealthy" ? true : false}
                onChange={() => setCondition("unhealthy")}
              />
              <p className="text-[14px] text-[#F79D5B]">201-350</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Hazardous"
                value="hazardous"
                isChecked={condition === "hazardous" ? true : false}
                onChange={() => setCondition("hazardous")}
              />
              <p className="text-[14px] text-[#C63A3A]">351-500</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}