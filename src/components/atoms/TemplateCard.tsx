import clsx from "clsx";

interface TemplateCardProps {
  text: string;
  paratext: string;
  icon: string;
  color: string;
  isSelected: boolean;
  handleCardClick: () => void;
}


export const TemplateCard = ({text, paratext, icon, color, isSelected, handleCardClick}: TemplateCardProps): JSX.Element => {
  
  return (
    <div 
      onClick={handleCardClick}
      className={clsx(
        "border rounded-[20px] p-2 h-[272px] w-[360px] flex justify-center items-center transition-colors cursor-pointer",
        {
          [`hover:border-primaryButton`]: !isSelected,  // Apply hover color if not clicked
          [`border-primaryButton`]: isSelected,         // Apply border color if clicked
        }
      )}
    >
      <div className="py-[48px] ">
        <div className="w-full flex justify-center">
          <div className={`bg-[${color}10] rounded-[40px] w-[65px] h-[65px] flex justify-center items-center`}>
            <i className={`fi fi-sr-${icon} flex items-center justify-center h-[30px] h-[30px] text-[${color}]`}></i>
          </div>
        </div>
        <div className="flex justify-center pt-5">
          <div className="px-1 truncate">
            <div className="flex justify-center items-center">
              <h1 className="text font-[16px] font-semibold">
                {text}
              </h1>
            </div>
            <div className="flex justify-center items-center truncate">
              <p className="text text-[14px] text-secondaryText text-center text-wrap">
                {paratext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
