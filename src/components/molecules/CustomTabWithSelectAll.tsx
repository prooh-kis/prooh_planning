import { Tooltip } from "antd";

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
  handleClick: any;
}

export function CustomTabWithSelectAll({
  trigger,
  tabData,
  currentTab,
  setCurrentTab,
  handleClick,
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
              ? `px-1 w-40 flex ${
                  trigger ? "gap-2" : "gap-4"
                } text-primaryButton items-center text-[14px] border-b-2 border-primaryButton py-2 justify-between`
              : `px-1 w-48 flex gap-2 text-gray-500 items-center text-[14px] py-2`
          }
        >
          <h1 className="text text-center flex items-center cursor-pointer">
            {tab.label}
          </h1>
          <div className="flex gap-4">
            <Tooltip title="Select All">
              <i
                onClick={() => handleClick(true, tab.id)}
                className={`fi fi-br-check text-[#358E0B] flex items-center text-[12px]`}
              ></i>
            </Tooltip>
            <Tooltip title="De select All">
              <i
                onClick={() => handleClick(false, tab.id)}
                className={`fi fi-br-cross text-[#FF0808] flex items-center text-[12px]`}
              ></i>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}
