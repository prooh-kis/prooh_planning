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
}

export function TabWithIcon({
  trigger,
  tabData,
  currentTab,
  setCurrentTab,
}: Props) {
  return (
    <div
      className={`flex ${
        trigger ? "justify-between" : "gap-2"
      } items-center border-b-2 border-gray-100`}
    >
      {tabData?.map((tab: TabInterface, index: any) => (
        <div
          key={index}
          onClick={() => setCurrentTab(tab.id)}
          className={
            currentTab === tab.id
              ? `px-1 w-48 flex ${
                  trigger ? "gap-2" : "gap-4"
                } text-primaryButton items-center text-[14px] border-b-2 border-primaryButton py-2`
              : `px-1 w-48 flex gap-2 text-gray-500 items-center text-[14px] py-2`
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
          <h1 className="text text-center flex items-center cursor-pointer">
            {tab.label}
          </h1>
        </div>
      ))}
    </div>
  );
}
