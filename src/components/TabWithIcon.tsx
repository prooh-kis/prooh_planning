interface TabInterface {
  icon: any;
  label: string;
  id: any;
}

interface Props {
  tabData: TabInterface[];
  currentTab: string;
  setCurrentTab: any;
}

export function TabWithIcon({ tabData, currentTab, setCurrentTab }: Props) {
  return (
    <div className="flex items-center border-b-2 border-gray-100">
      {tabData?.map((tab: TabInterface, index: any) => (
        <div
          key={index}
          onClick={() => setCurrentTab(tab.id)}
          className={
            currentTab === tab.id
              ? "w-48 flex gap-4 text-blue-500 items-center text-lg border-b-2 border-blue-500 py-2"
              : "w-48 flex gap-2 text-gray-500 items-center text-lg py-2"
          }
        >
          {tab.icon}
          <h1 className="text text-center flex items-center">{tab.label}</h1>
        </div>
      ))}
    </div>
  );
}
