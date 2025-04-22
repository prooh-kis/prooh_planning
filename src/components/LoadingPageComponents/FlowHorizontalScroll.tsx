import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// Define type for card data
type CardData = {
  title: string;
  icon: JSX.Element;
  bgColor: string;
  description: string;
};

// Sample card data with Flaticons
const cardData: CardData[] = [
  {
    title: "Event-based ad triggering",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#ffeeee]",
    description:
      "We enable contextual targeting in DOOH and OOH, ensuring ads reach the right audience by aligning messaging with relevant events and locations.",
  },
  {
    title: "Real-time optimization",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#e8f5ff]",
    description:
      "Optimize your ad campaigns in real-time based on performance metrics and audience engagement.",
  },
  {
    title: "Advanced targeting",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#f1eeff]",
    description:
      "Leverage advanced targeting capabilities to reach your ideal audience with precision.",
  },
  {
    title: "Cross-channel integration",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#f1ffaf]",
    description:
      "Seamlessly integrate your DOOH and OOH campaigns with other digital marketing channels.",
  },
  {
    title: "Analytics and reporting",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#e8f5ff]",
    description:
      "Get comprehensive insights into your campaign performance with detailed analytics and reporting.",
  },
  {
    title: "Intelligent ad placement",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#ffeeee]",
    description:
      "Automatically place your ads in the most effective locations based on audience behavior.",
  },
  {
    title: "Dynamic content delivery",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#e8f5ff]",
    description:
      "Deliver different content based on time of day, weather, or other contextual factors.",
  },
  {
    title: "Audience measurement",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#f1ffaf]",
    description:
      "Measure audience engagement and demographics to refine your targeting strategy.",
  },
  {
    title: "Programmatic buying",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#e8f5ff]",
    description:
      "Automate your media buying process for efficiency and better ROI.",
  },
  {
    title: "Creative management",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#f1ffaf]",
    description:
      "Manage and rotate creatives across multiple locations from a single platform.",
  },
  {
    title: "Performance benchmarking",
    icon: <i className="fi fi-rr-calendar-lines" />,
    bgColor: "bg-[#f1ffaf]",
    description:
      "Compare your campaign performance against industry standards and competitors.",
  },
];

type CardProps = {
  title: string;
  description: string;
  bgColor: string;
  icon: JSX.Element;
};

function Card({ title, description, bgColor, icon }: CardProps) {
  return (
    <div
      style={{
        width: "min(453px, 90%)",
      }}
      className={`flex-shrink-0 relative overflow-visible h-[412px] ${bgColor} rounded-[14px]`}
    >
      <div className='space-y-4 px-8 py-16'>
        <h3 className='text-[#252525] text-[32px] font-bold font-bricolage lowercase leading-[38px]'>
          {title}
        </h3>
        <p className='text-black text-xl pt-3 font-normal font-inter leading-[30px]'>
          {description}
        </p>
        <div className='flex absolute bottom-10 inset-x-0 px-8 items-center justify-between'>
          <button className='text-black text-xl font-normal font-inter leading-[30px]'>
            Know more
          </button>
          <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
            <i className='size-6 text-primary' />
          </div>
        </div>
      </div>
      <div
        className={`absolute flex justify-center items-center rounded-full size-[84px] left-8 -top-10 z-50 ${bgColor} border-4 border-white`}
      >
        {icon}
      </div>
    </div>
  );
}

export default function HorizontalScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const contextualRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   const container = containerRef.current;
  //   const trigger = triggerRef.current;

  //   if (!container || !trigger) return;
  //   gsap.registerPlugin(ScrollTrigger);

  //   ScrollTrigger.defaults({
  //     scroller: document.documentElement,
  //   });

  //   ScrollTrigger.config({
  //     limitCallbacks: true,
  //     ignoreMobileResize: true,
  //   });

  //   gsap.from(contextualRef.current, {
  //     y: 50,
  //     opacity: 0,
  //     duration: 0.8,
  //     stagger: 0.4,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //       trigger: ".contextual-targeting",
  //       start: "top 70%",
  //       toggleActions: "play none none reset",
  //     },
  //   });

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: trigger,
  //       pin: true,
  //       scrub: 1,
  //       invalidateOnRefresh: true,
  //       onUpdate: (self) => {
  //         const progress = self.progress;
  //         if (container) {
  //           container.scrollTo(
  //             (container.scrollWidth - window.innerWidth) * progress,
  //             0
  //           );
  //         }
  //       },
  //       start: "top 30vh",
  //       end: () => `+=${container.scrollWidth - window.innerWidth}`,
  //     },
  //   });

  //   return () => {
  //     tl.kill();
  //     const triggers = ScrollTrigger.getAll();
  //     triggers.forEach((trigger: any) => trigger.kill());
  //   };
  // }, []);

  return (
    <section
      ref={triggerRef}
      data-bg='white'
      data-color='black'
      className='min-h-svh border border-transparent relative z-20 flex items-center text-black bg-white'
    >
      <div
        data-bg='white'
        data-color='black'
        className='mx-auto py-12 w-full overflow-x-hidden'
      >
        <div
          ref={containerRef}
          data-bg='white'
          data-color='black'
          className='flex overflow-x-hidden pt-10 items-center bg-white text-black space-x-6 pb-6'
        >
          <div
            ref={contextualRef}
            className='space-y-6 min-w-[90%] sm:min-w-[606px] ml-[10%] mr-6 font-bricolage'
          >
            <h2 className='text-[#252525] contextual-targeting text-[46px] sm:text-[56px] md:text-[64px] font-bold leading-[68px]'>
              Contextual targeting in{" "}
              <span className='text-muted-foreground text-[#a0a0a0] lowercase'>
                dooh & ooh
              </span>
            </h2>
            <p className='text-[#8a8a8a] contextual-targeting text-xl font-normal font-inter leading-[30px]'>
              We enable contextual targeting in DOOH and OOH, ensuring ads reach
              the right audience by aligning messaging with relevant events and
              locations.
            </p>
            <button className='w-[151px] contextual-targeting text-nowrap h-[61px] px-[58px] text-black text-xl font-semibold font-inter capitalize py-5 rounded-[54px] border-2 border-[#c9c9c9] justify-center items-center gap-2.5 inline-flex'>
              plan now
            </button>
          </div>

          <div className='w-[37px] h-[37px] relative mt-7 flex-shrink-0 justify-start items-start inline-flex'>
            <i className="fi fi-sr-arrow-circle-right" />
          </div>
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              bgColor={card.bgColor}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
