import ButtonInput from "../../components/atoms/ButtonInput";

export const NewSection2 = () => {
  const challenges = [
    {
      id: 1,
      icon: (
        <i className="fi fi-sr-screen flex items-center text-white text-[24px]" />
      ),
      color: "bg-[#FF6224]",
      heading: "Slot Transparency",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
    },
    {
      id: 2,
      icon: (
        <i className="fi fi-sr-screen flex items-center text-white text-[24px]" />
      ),
      color: "bg-[#09AC32]",
      heading: "Applies To Both Static & PDOOH",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
    },
    {
      id: 3,
      icon: (
        <i className="fi fi-sr-screen flex items-center text-white text-[24px]" />
      ),
      color: "bg-[#4F39DF]",
      heading: "Applies To Both Static & PDOOH",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
    },
    {
      id: 4,
      icon: (
        <i className="fi fi-sr-screen flex items-center text-white text-[24px]" />
      ),
      color: "bg-[#D186FF]",
      heading: "Applies To Both Static & PDOOH",
      para: "Unprecedented access to 800+ OOH &DOOH media units via multiple purchase agreements media owners & through programmatic SSP integrations.",
    },
  ];

  return (
    <div className="z-10 font-custom flex flex-col justify-center items-center pt-20">
      <h1 className="font-semibold text-[48px] text-[#1E376E]">
        Challenges We Help To{" "}
        <span className="font-cursive font-normal tracking-[-0.5rem] text-[#129BFF]">
          Solve
        </span>
      </h1>
      <p className="text-[20px] py-4 text-[#2D5087]">
        Our platform helps your business in managing expenses. These are some of
        the reasons why you
      </p>
      <div className="grid grid-cols-4 gap-4 pt-8 px-12">
        {challenges?.map((challenge: any) => (
          <div
            key={challenge.id}
            className="col-span-1 w-full rounded-[12px] shadow-lg border border-gray-100 p-8 hover:shadow-2xl"
          >
            <div
              className={`${challenge.color} h-[56px] w-[56px] rounded-full flex justify-center items-center`}
            >
              {challenge.icon}
            </div>
            <h1 className="my-4 text-[24px] text-[#2A3856] tracking-[-0.05em] font-semibold h-[64px]">
              {challenge.heading}
            </h1>
            <p className="my-4 text-[16px] text-[#2D5087]">{challenge.para}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
