import { RadioInput } from "../../components/atoms/RadioInput";

interface WeatherSegmentProps {
  currentTab?: any;
}

export const WeatherSegment = ({ currentTab }: WeatherSegmentProps) => {
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
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#5BB8F7]">Freezing</p>  
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="10&deg; to 20&deg;"
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#1D9EF7]">Cold</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="20&deg; to 30&deg;"
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#348655]">Pleasant</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="30&deg; to 42&deg;"
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#F79D5B]">Hot</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="More the 42&deg;"
                onChange={() => {}}
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
                onChange={() => {}}
              />
              <i className="fi fi-tr-smog text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Drizzle"
                onChange={() => {}}
              />
              <i className="fi fi-tr-cloud-drizzle text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Heavy"
                onChange={() => {}}
              />
              <i className="fi fi-tr-cloud-showers-heavy text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Storm"
                onChange={() => {}}
              />
              <i className="fi fi-tr-thunderstorm text-[14px] text-[#5BB8F7]"></i>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Stopped"
                onChange={() => {}}
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
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#348655]">0-50</p>  
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="moderate"
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#1D9EF7]">51-100</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Poor"
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#5BB8F7]">101-200</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Unhealthy"
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#F79D5B]">201-350</p>
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Hazardous"
                onChange={() => {}}
              />
              <p className="text-[14px] text-[#C63A3A]">351-500</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}