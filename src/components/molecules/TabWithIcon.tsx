interface TabInterface {
  icon: any;
  label: string;
  id: any;
}

interface Props {
  tabData: TabInterface[];
  currentTab: string;
  setCurrentTab: any;
  trigger?: any;
  justify?: any;
}

export function TabWithIcon({
  trigger,
  tabData,
  currentTab,
  setCurrentTab,
  justify,
}: Props) {
  return (
    <div
      className={`flex ${
        justify ? "justify-start" : "justify-around"
      } items-center border-b-2 border-gray-100 gap-8`}
    >
      {tabData?.map((tab: TabInterface, index: any) => (
        <div
          key={index}
          onClick={() => setCurrentTab(tab.id)}
          className={
            currentTab === tab.id
              ? `px-1  flex gap-2 text-primaryButton font-semibold items-center text-[16px] border-b-2 border-primaryButton py-2`
              : `px-1 flex gap-2 text-gray-500 items-center text-[14px] py-2`
          }
        >
          {trigger && (
            <input
              title="inputRadioTrigger"
              type="radio"
              checked={currentTab === tab.id}
              onChange={() => setCurrentTab(tab.id)}
            />
          )}
          {tab.icon}
          <h1 className="text text-center flex items-center cursor-pointer truncate">
            {tab.label}
          </h1>
        </div>
      ))}
    </div>
  );
}
