interface TabInterface {
  icon: any;
  label: string;
  id: string;
}

interface Props {
  tabData: TabInterface[];
  currentTab: string;
  setCurrentTab: any;
}

export function TabWithIcon({ tabData, currentTab, setCurrentTab }: Props) {
  return (
    <div className="flex gap-4">
      {tabData?.map((tab: TabInterface, index: any) => (
        <div
          key={index}
          onClick={() => setCurrentTab(tab.id)}
          className={
            currentTab === tab.id
              ? "flex gap-4 text-blue-500 items-center text-lg  border-b-2 border-blue-500 py-2"
              : "flex gap-2 text-gray-500 items-center text-lg py-2"
          }
        >
          {tab.icon}
          <h1>{tab.label}</h1>
        </div>
      ))}
    </div>
  );
}
