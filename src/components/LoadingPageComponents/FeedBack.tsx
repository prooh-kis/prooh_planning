import React, { useEffect, useRef, useState } from "react";
import quotes from "../../assets/icons/quotes.png";
import { testimonials } from "./../../data/LandingPageData";
// eslint-disable-next-line import/no-named-as-default
import ScrollTrigger from "gsap/ScrollTrigger";
// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
interface Testimonial {
  image: string;
  quote: string;
  author: string;
  position: string;
}

interface FeedBackProps {
  title?: string;
  sectionDescription?: string;
  testimonialsData?: Testimonial[];
}

const data = [
  { label: "All(16)", value: "All" },
  { label: "Media Owner", value: "Media Owner" },
  { label: "Advertiser", value: "Advertiser" },
  { label: "Data Heroes", value: "Data Heroes" },
];

export const FeedBack: React.FC<FeedBackProps> = (props) => {
  const feedbackRef = useRef<any>();
  const [testi, setTesti] = useState<any>(testimonials);
  const [option, setOption] = useState<string>("All");

  const handleClick = (value: string) => {
    setOption(value);
    if (value == "All") {
      setTesti(() => {
        return testimonials;
      });
    } else if (value == "Media Owner") {
      setTesti(() => {
        return testimonials?.filter((te: any) => te.type === "Media Owner");
      });
    } else if (value == "Advertiser") {
      setTesti(() => {
        return testimonials?.filter((te: any) => te.type === "Advertiser");
      });
    } else if (value == "Data Heroes") {
      setTesti(() => {
        return testimonials?.filter((te: any) => te.type === "Data Heroes");
      });
    }
  };

  useGSAP(() => {
    gsap.to("#feedback", {
      y: -10,
      opacity: 1,
      duration: 1,
      stagger: {
        // implemeting the stagger effect
        amount: 2,
        from: "start",
      },
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: feedbackRef.current,
        start: "top 90%",
        end: "bottom 60%",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="font-custom py-16 px-12 sm:px-8 lg:px-16">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#1E376E] text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">
          Public <span className="font-cursive font-regular tracking-[-0.2rem] text-[#129BFF]">Cheers</span> For Us
        </h1>
        <p className="text-[20px] py-4 text-[#2D5087]">find out how our user are spreading the word</p>

      </div>
      <div className="flex items-center justify-center">
        <div className="m-4 w-1/2 flex justify-around items-center cursor-pointer">
          {data?.map((singleData: any, i: any) => (
            <div
              key={i}
              // type="button"
              onClick={() => {
                handleClick(singleData.value);
                // setCurrentAdvertiserTab("0");
                // setCurrentMediaOwnerTab("0");
                // setCurrentDataHeroTab("0");
              }}
              className={`${
                singleData.value === option
                  ? "bg-primaryButton text-white font-semibold"
                  : "bg-[#F6F6F6] text-gray-700"
              } truncate w-full py-2 px-8 ${i == 0 ? "clip-trapezium-right" : i == data.length-1 ? "clip-trapezium-left" : "clip-trapezium-both"}`}
            >
              <span className="text-[12px]">{singleData?.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-left pt-8 px-4">
        {testi.slice(0, 8).map((testimonial: any) => (
          <div
            ref={feedbackRef}
            id="feedback"
            key={testimonial.id}
            className="box bg-white rounded-xl p-6 shadow-lg"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className="fi fi-sr-star w-5 h-5 text-primaryButton"
                  ></i>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {testimonial.date}
              </span>
            </div>

            {/* Content */}
            <h4 className="font-semibold text-gray-900 mb-2">
              {testimonial.comment}
            </h4>
            <p className="text-gray-600 mb-4">{testimonial.description}</p>

            {/* Experience Date */}
            <p className="text-sm text-gray-400">
              Date of experience: {testimonial.experienceDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
