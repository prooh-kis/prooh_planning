import ButtonInput from "../../components/atoms/ButtonInput"

export const NewSection1 = () => {
  return (
    <div className="z-10 flex flex-col justify-center items-center">
      <h1 className="font-custom text-gray-500 text-center pt-12 pb-4">END - TO - END CAMPAIGN MANAGEMENT PLATFORM</h1>
      <h1 className="pb-8 word inline-block z-10 font-custom font-semibold text-[24px] sm:text-[40px] md:text-[60px] lg:text-[90px] text-[#1E376E] 
      leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[90px] tracking-[-0.01rem] align-center text-center">
        experience the {<br/>} most <span className="font-cursive font-regular tracking-[-0.3rem] text-[#129BFF]">advanced</span> dooh <br/> advertising <span className="text-[#3B82F6] animate-pulse">...</span>
      </h1>
      <p
        className="pb-8 text-[20px] text-center sm:text-[14px] md:text-[16px] lg:text-[16px] text-[#4C6590] mt-12 md:mt-8 
        leading-[22px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] tracking-normal"
      >
        Prooh: India’s 1st {'Audience Guarantee'} DOOH Media Company, delivering data-driven planning, <br/> audience measurement, performance proof, and 100% cost transparency.
      </p>
      <div className="z-10 mt-8 md:mt-8 w-1/4 flex items-center justify-center gap-2">
        <ButtonInput
          // icon={<i className="fi fi-sr-megaphone flex items-center" />}
          rounded="medium"
          fullWidth={true}
        >
          Get Started
        </ButtonInput>
        <ButtonInput
          variant = "outline"
          // icon={<i className="fi fi-sr-megaphone flex items-center" />}
          rounded="medium"
        >
          Sales
        </ButtonInput>
      </div>
    </div>
  )
}
