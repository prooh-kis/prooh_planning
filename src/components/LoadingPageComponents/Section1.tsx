import { useNavigate } from "react-router-dom";
import ButtonInput from "../../components/atoms/ButtonInput";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const Section1 = () => {

  const words = ["advertiser.", "media owner.", "researcher."];
  const containerRef = useRef<any>(null);
  const wordIndex = useRef(0);
  const [currentWord, setCurrentWord] = useState(words[0]);

  useGSAP(() => {
    const animateWord = () => {
      const el = containerRef.current.querySelector(".word");
      if (!el) return;

      const nextWord = words[(wordIndex.current + 1) % words.length];

      // Animate current word out (up + fade)
      gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Update word content
          setCurrentWord(nextWord);

          // Instantly position below for next animation
          gsap.set(el, { y: 20, opacity: 0 });

          // Animate word in (slide up + fade in)
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
          });

          wordIndex.current = (wordIndex.current + 1) % words.length;
        },
      });
    };

    const interval = setInterval(animateWord, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 md:px-16 pt-20 md:pt-32 lg:pt-32 flex justify-center">

      {/* Text Content */}
      <div className="relative w-full flex flex-col justify-center items-center text-center">
       
        {/* Small Heading */}
        <h1
          className="z-10 mb-[-24px] text-[10px] text-[#0094FF] sm:text-[12px] md:text-[14px] lg:text-[20px] tracking-[0.10em] 
          leading-[14px] sm:leading-[16px] md:leading-[20px] lg:leading-[20px]"
        >
          DOOH PLATFORM
        </h1>

        {/* Main Title */}
        <h1
          className="z-10 font-custom font-semibold text-[24px] sm:text-[40px] md:text-[60px] lg:text-[90px] text-[#20272C] 
          leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[120px] tracking-[-0.01em] align-center text-center"
        >
          become a prooh
        </h1>
        <div ref={containerRef} className="mt-[-24px]">
          <h1
            className="word inline-block z-10 font-custom font-semibold text-[24px] sm:text-[40px] md:text-[60px] lg:text-[90px] text-[#20272C] 
            leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[120px] tracking-[-0.01em] align-center text-center"
          >
            <span className={`text-[#0094FF] `}>{currentWord}</span><span className="text-[#0094FF70]">.</span><span className="text-[#0094FF30]">.</span>
          </h1>
        </div>
        

        {/* Description */}
        <p
          className="z-10 w-4/5 text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] text-[#4C6590] mt-0 md:mt-0 
          leading-[22px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] tracking-normal"
        >
          {`Prooh: India’s 1st 'Audience Guarantee' DOOH Media Company, delivering data-driven planning, audience measurement, performance proof, and 100% cost transparency.`}
        </p>

        {/* CTA Button - Centered */}
        <div className="z-10 mt-8 md:mt-8 w-full flex items-center justify-center gap-2">
          <ButtonInput
            // icon={<i className="fi fi-sr-megaphone flex items-center" />}
            rounded="small"
          >
            Create
          </ButtonInput>
          <ButtonInput
            variant = "outline"
            // icon={<i className="fi fi-sr-megaphone flex items-center" />}
            rounded="small"
          >
            Sales
          </ButtonInput>
        </div>
      </div>
    </div>
  );
};
