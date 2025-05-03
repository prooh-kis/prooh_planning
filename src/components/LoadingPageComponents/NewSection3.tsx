import ButtonInput from "../atoms/ButtonInput"
import { Fly, Planner, Layer } from "../../assets";

export const NewSection3 = () => {
  const products = [{
    id: 1,
    icon: <img src={Layer} alt="fly" />,
    textColor: "text-[#438061]",
    bgColor: "bg-[#F0FFEB]",
    heading: "Layer",
    subHeading: "DATA MANAGEMENT PLATFORM",
    para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
    redirect: "",
  },{
    id: 2,
    icon: <img src={Fly} alt="fly" />,
    textColor: "text-[#4E64EE]",
    bgColor: "bg-[#F2F4FF]",
    heading: "Fly",
    subHeading: "CONTENT MANAGEMENT SYSTEM",
    para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
    redirect: "",
  },{
    id: 3,
    icon: <img src={Planner} alt="fly" />,
    textColor: "text-[#129BFF]",
    bgColor: "bg-[#EEFAFF]",
    heading: "Planner",
    subHeading: "DOOH PLANNING TOOL",
    para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
    redirect: "",
  }];

  return (
    <div className="z-10 font-custom flex flex-col justify-center items-center pt-20">
      <p className="text-[12px] text-[#2D5087]">OUR SERVICES</p>
      <p className="text-[32px] text-[#2D5087] italic">OUR <span className="text-[#129BFF]">DOOH</span> Lineup</p>
      <h1 className="font-semibold text-[48px] text-[#1E376E]">Built For Modern Advertising</h1>
      <div className="grid grid-cols-3 gap-4 pt-8 px-36">
        {products?.map((product: any) => (
          <div key={product.id} className={`${product.bgColor} col-span-1 w-full rounded-[12px] shadow-sm border border-gray-100 p-8`}>
            {product.icon}
            <h1 className="my-4 text-[24px] text-[#2A3856] font-semibold">{product.heading}</h1>
            <h1 className="my-4 text-[16px] text-[#2A3856]">{product.subHeading}</h1>
            <p className="my-2 text-[16px] text-[#2D5087]">{product.para}</p>
            <div className="w-1/2 pt-4">
              <ButtonInput
                variant="knowMore"
                icon={<i className="fi fi-br-arrow-up-right flex items-center" />}
                iconPosition="right"
                rounded="full"
                size="small"
                textColor={product.textColor}
              >
                <span className={`${product.textColor} py-1`}>
                  Know More
                </span>
              </ButtonInput>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
