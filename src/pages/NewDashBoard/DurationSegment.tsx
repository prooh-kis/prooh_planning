
import { SectionHeader } from "../../components/molecules/DashboardGrid";
import { CalenderScaleStepper } from "../../components/molecules/CalenderScale2";
import { DurationGraphPerDay } from "../../components/segments/DurationGraphPerDay";
import { Tooltip } from "antd";

export const DurationSegment = ({
  calendarData = [],
  screenLevelData,
  setCurrentDay,
  currentDay,
  setCurrentWeek,
  currentWeek,
  setCurrentDate,
  currentDate,
  allDates,
  openSiteMapView,
  loading,
  openInvoice,
}: any) => {

  return (
    <div className="relative grid grid-cols-12 gap-2">
      {calendarData && Object.keys(calendarData).length > 0 && (
        <div className="col-span-8 p-4 bg-[#FFFFFF] rounded-[12px] border border-gray-100 shadow-sm">
          <div className="border-b">
            <SectionHeader
              iconClass="fi-sr-calendar-clock"
              title="Campaign Duration"
              bgColor=" bg-[#DC6700]"
            />
          </div>
          <CalenderScaleStepper
            setCurrentDay={setCurrentDay}
            setCurrentWeek={setCurrentWeek}
            currentDay={currentDay}
            currentWeek={currentWeek}
            allDates={allDates}
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
            calendarData={calendarData}
            loading={loading}
            openSiteMapView={openSiteMapView}
            openInvoice={openInvoice}
          />
        </div>
      )}
      {screenLevelData && Object.keys(screenLevelData.slotDataHourWise).length > 0 && (
        <div className="col-span-4 bg-[#FFFFFF] rounded-[12px] border border-gray-100 h-full shadow-sm">
          <div className="flex items-center justify-between border-b mx-4">
            <div className="flex items-center gap-2 pt-4 pb-2 truncate">
              <div className={`rounded-full p-2 bg-[#DC6700]`}>
                <i
                  className={`fi fi-sr-calendar-clock text-[14px] text-white flex items-center justify-center`}
                ></i>
              </div>
              <h1 className="text-[14px] text-[#0E212E] leading-[16.94px] truncate ">
                {"Today"}
              </h1>
              <Tooltip title="">
                <i className="fi fi-br-info text-[14px] text-[#b2c1ca] flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <div className="flex items-center gap-4 pt-4 pb-2 truncate">
              <div className="flex items-center gap-2 truncate">
                <i className="fi fi-rr-calendar-lines text-[#DC6700] text-[12px] flex items-center" />
                <h1 className="text-[12px] truncate">{new Date().toLocaleDateString()}</h1>
              </div>
              <div className="flex items-center gap-2 truncate">
                <i className="fi fi-br-clock text-[#DC6700] text-[12px] flex items-center" />
                <h1 className="text-[12px] truncate">{new Date().toLocaleTimeString()}</h1>
              </div>
            </div>
          </div>
          <DurationGraphPerDay
            currentData={screenLevelData?.slotDataHourWise}
            additionalLegends={[
              { label: "Hourly Delivery", values: [1500], color: "rgba(16, 185, 129, 1)" },
              { label: "Extra Delivery", values: [1200], color: "rgba(245, 158, 11, 1)" },
            ]}
          />
        </div>
      )}
    </div>
  )
}