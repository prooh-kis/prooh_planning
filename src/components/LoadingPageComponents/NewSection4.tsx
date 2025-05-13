import ButtonInput from "../atoms/ButtonInput"
import { Carousel1, Carousel2, Carousel3, Carousel4, Carousel5, Carousel6, Carousel7, Fly, Layer, Planner } from "../../assets";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const NewSection4 = () => {
  const [ctab, setCtab] = useState<any>(0);

  // Refs for each card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const main = useRef<any>();

  const productIcons = [Layer, Fly, Planner]
  const steps = [{
    id: 0,
    icon: <img src={Carousel1} alt="Carousel1" />,
    textColor: "text-[#438061]",
    bgColor: "bg-[#F0FFEB]",
    heading: "Supply Side Platform",
    bulletPoints: ["Inventory Listing & Mapping", "Technical Integration With Ad Server"],
    products: [Fly],
  },{
    id: 1,
    icon: <img src={Carousel2} alt="Carousel2" />,
    textColor: "text-[#4E64EE]",
    bgColor: "bg-[#F2F4FF]",
    heading: "Audience Intelligence Data",
    bulletPoints: ["Audience Footfall, Profile And Visit Pattern Data Captured in Data Management Platform By Industry Expert"],
    products: [Layer],
  },{
    id: 2,
    icon: <img src={Carousel3} alt="Carousel3" />,
    textColor: "text-[#129BFF]",
    bgColor: "bg-[#EEFAFF]",
    heading: "Instant Campaign Planning With PROOH",
    bulletPoints: ["Audience Targetting Through Proximity To POI And Visit Patterns", "Easy Client Approval Process", "Reduce Wastage Through Advance Filters"],
    products: [Fly, Planner],
  },{
    id: 3,
    icon: <img src={Carousel4} alt="Carousel4" />,
    textColor: "text-[#129BFF]",
    bgColor: "bg-[#EEFAFF]",
    heading: "Hassle Free Pre-Deployment Approvals",
    bulletPoints: ["Bulk Creative Uploads", "Easy Vendor Approval Process On Creative And Media Cost"],
    products: [Fly],
  },{
    id: 4,
    icon: <img src={Carousel5} alt="Carousel5" />,
    textColor: "text-[#129BFF]",
    bgColor: "bg-[#EEFAFF]",
    heading: "Real Time Campaign Deployment",
    bulletPoints: ["Ads Served Through Fly:- Our Robust Content Management System", "Each Ad Spot Deployed Programmatically In Real Time Through PROOH Ad Server"],
    products: [Fly],
  },{
    id: 5,
    icon: <img src={Carousel6} alt="Carousel6" />,
    textColor: "text-[#129BFF]",
    bgColor: "bg-[#EEFAFF]",
    heading: "Real-Time Campaign Reporting And Impression Adjustment",
    bulletPoints: ["View Live Performance Through Dedicated Dashboard", "Easy Access To Log Reports And Monitoring Pictures/Videos", "Auto Fulfilment Of Undelivered Slots Through Fly", "Seamless Extension/Termination Of Active Campaigns"],
    products: [Layer],
  },{
    id: 6,
    icon: <img src={Carousel7} alt="Carousel7" />,
    textColor: "text-[#129BFF]",
    bgColor: "bg-[#EEFAFF]",
    heading: "Auto Invoicing And Archiving",
    bulletPoints: ["Invoice Generation For Client With Campaign Performance History On A Single Click", "Archiving Campaigns For Future References", "Purchase Order Generation For Publisher With Campaign Performance History On A Single Click"],
    products: [Planner],
  }];

   // Scroll to center when ctab changes
   const handleTabClick = (n: number) => {
    setCtab(n);
    const selectedCard = cardRefs.current[n];
    if (selectedCard) {
      selectedCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };


  useGSAP(() => {
    let boxes = gsap.utils.toArray(".box");
    let totalWidth = boxes.length * 300;

    gsap.to(".boxes", {
      x: () => -(totalWidth - window.innerWidth)
    })
    
  },{scope: main});

  return (
    <div className="z-10 font-custom flex flex-col justify-center items-center pt-20">
      <p className="leading-[18px] tracking-[0.24em] font-normal text-center text-[12px] text-[#667D8C]">PRODUCT WORKFLOW</p>
      <h1 className="font-semibold text-[48px] text-[#1E376E]">The Framework That<br />Shapes <span className="font-cursive font-regular tracking-[-0.3rem] text-[#129BFF]">Innovation</span></h1>
      <div className="p-1 flex items-center justify-center rounded-full border border-gray-100 mt-4">
        {steps?.map((step: any) => (
          <div key={step.id} className={`cursor-pointer p-2 w-8 h-8 flex items-center justify-center ${step.id === ctab ? "text-white font-semibold bg-primaryButton rounded-full" : ""}`} onClick={() => handleTabClick(step.id)}>
            {step.id + 1}
          </div>
        ))}
      </div>
      <div ref={main} className="flex flex-row gap-4 py-8 px-36 w-full h-full overflow-x-scroll no-scrollbar scroll-smooth">
        {steps?.map((step: any, index: number) => (
          <div
            key={step.id}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseEnter={() => handleTabClick(step.id)}
            className={`basis-1/2 w-full rounded-[12px] border ${ctab === step.id ? "border-[#129BFF] border-2 scale-105" : " border-[#DADADA50]"} p-2 shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105`}
          >
            <div className="flex justify-between items-center p-1 border-b border-[#DADADA50]">
              <h1 className="text-[#ABDCFF]">{step.id + 1}</h1>
              <div className="flex items-center gap-1 px-2">
                {productIcons?.map((icon: any, i: number) => (
                  <div key={i} className="h-4 w-4">
                    <img src={icon} alt="icon" className={`${step.products.includes(icon) ? "" : "grayscale"}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 h-60 w-80 flex items-center justify-center">
              {step.icon}
            </div>
            <div className="px-8">
              <h1 className="text-[20px] font-bold">{step.heading}</h1>
              <ul className="px-4 py-1 list-outside list-disc">
                {step.bulletPoints?.map((bullet: any, k: any) => (
                  <li className="text-[12px]" key={k}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};