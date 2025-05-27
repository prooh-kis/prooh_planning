import ButtonInput from "../atoms/ButtonInput";
import { Fly, Planner, Layer } from "../../assets";
import { useNavigate } from "react-router-dom";

export const NewSection3 = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      icon: <img src={Layer} alt="layer" />,
      textColor: "text-[#438061]",
      bgColor: "bg-[#F0FFEB]",
      buttonBg: "bg-[#438061]",
      hoverText: "hover:text-[#F0FFEB]",
      hoverBg: "hover:bg-[#438061]",
      heading: "Layer",
      subHeading: "DATA MANAGEMENT PLATFORM",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: "/products/Layer",
    },
    {
      id: 2,
      icon: <img src={Fly} alt="fly" />,
      textColor: "text-[#4E64EE]",
      bgColor: "bg-[#F2F4FF]",
      hoverText: "hover:text-[#F2F4FF]",
      hoverBg: "hover:bg-[#4E64EE]",
      heading: "Fly",
      subHeading: "CONTENT MANAGEMENT SYSTEM",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: "/products/Fly",
    },
    {
      id: 3,
      icon: <img src={Planner} alt="planner" />,
      textColor: "text-[#129BFF]",
      bgColor: "bg-[#EEFAFF]",
      hoverText: "hover:text-[#EEFAFF]",
      hoverBg: "hover:bg-[#129BFF]",
      heading: "Planner",
      subHeading: "DOOH PLANNING TOOL",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
      redirect: "/products/Planner",
    },
  ];

  return (
    <div className="z-10 font-custom flex flex-col justify-center items-center pt-20">
      <p className="leading-[18px] tracking-[0.24em] font-medium text-center text-[12px] text-[#2D5087]">
        OUR SERVICES
      </p>
      <p className="text-[32px] text-[#2D5087] italic">
        OUR <span className="text-[#129BFF] font-bold">DOOH</span> Lineup
      </p>
      <h1 className="font-medium text-[48px] text-[#1E376E]">
        Built For Modern Advertising
      </h1>
      <div className="grid grid-cols-3 gap-4 pt-8 px-36">
        {products?.map((product: any) => (
          <div
            key={product.id}
            onClick={() => navigate(product.redirect)}
            className={`${product.bgColor} col-span-1 w-full rounded-[32px] shadow-sm border border-gray-100 p-8 hover:shadow-xl`}
          >
            {product.icon}
            <h1 className="text-[40px] text-[#2A3856] font-bold leading-[64px] tracking-[-.02em]">
              {product.heading}
            </h1>
            <h1 className="text-[16px] text-[#2A3856] font-normal leading-[42px] tracking-normal">
              {product.subHeading}
            </h1>
            <p className="text-[16px] text-[#2D5087] font-normal tracking-[-.02em]">
              {product.para}
            </p>
            <div className={`pt-4 `}>
              <button
                onClick={() => navigate(product.redirect)}
                className={`${product.textColor} bg-[#FFFFFF] ${product.hoverBg} ${product.hoverText} py-2 w-[50%] rounded-full flex justify-center font-semibold text-[16px]`}
              >
                <div className="flex gap-2 items-center">
                  <p>Know More</p>
                  <i className={`fi fi-br-arrow-up-right flex items-center`} />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
