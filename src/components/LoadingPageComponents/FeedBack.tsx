import React, { useEffect, useRef, useState } from "react";
import quotes from "../../assets/icons/quotes.png";
import { testimonials } from "./../../data/LandingPageData";
// eslint-disable-next-line import/no-named-as-default
import ScrollTrigger from "gsap/ScrollTrigger";
// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

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
    gsap.to('#feedback', {
      y: -10,
      opacity: 1,
      duration: 1,
      stagger: { // implemeting the stagger effect
        amount: 2,
        from: "start",
      },
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: feedbackRef.current,
        start: "top 90%",
        end: "bottom 60%",
        scrub: true,
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center">
          <div className="text-center mb-16 max-w-[777px] ">
            <div className="flex justify-center items-center gap-2 mb-4">
              <i className="fi fi-sr-heart w-5 h-5 text-primaryButton"></i>
              <span className="text-gray-600">Wall of love</span>
            </div>
            <h2 className="font-custom text-3xl sm:text-4xl md:text-5xl font-semibold text-[#183246] mb-4 leading-tight sm:leading-[54.24px] tracking-normal">
              Feedback From Those {"We've"}
              Shared Experiences With
            </h2>
            <p className="font-custom text-[12px] sm:text-[14px] md:text-[16px] font-normal text-[#254354] mb-4 leading-[24px] sm:leading-[28px] tracking-[-0.02em]">
              Our platform helps your business in managing expenses. These are
              some of the reasons why you
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {data?.map((singleData: any, index: number) => (
                <button
                  id=""
                  key={index}
                  type="button"
                  onClick={() => {
                    handleClick(singleData.value);
                  }}
                  className={`px-6 py-2 rounded-[12px] ${
                    singleData.value === option
                      ? `bg-[#129BFF] text-[#FFFFFF]`
                      : "bg-[#F6F6F6] text-[#667D8C]"
                  }`}
                >
                  {singleData?.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-left px-4">
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
    </div>
  );
};
