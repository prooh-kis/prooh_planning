import { Planner } from '../../../assets';
import ButtonInput from '../../../components/atoms/ButtonInput';
import React from 'react';


interface PlannerPageProps {
  products: {
    name: string;
    icon: JSX.Element;
    textColor: string;
    borderColor?: any;
  }[];
  selected?: any;
  setSelected?: any;
}

export const PlannerPage: React.FC<PlannerPageProps> = ({products, selected, setSelected}) => {
  return (
<div className="w-full h-full pt-4">
      <div className="w-full grid grid-cols-12 bg-gradient-to-b from-[#F0F9FF] to-[#FFFFFF] p-12">
        <div className="w-full col-span-8">
          <div className="flex items-center justify-start gap-4">
            {products?.map((product, i) => (
              <div key={i}>
                <ButtonInput
                  onClick={() => {
                    setSelected(product.name)
                  }}
                  variant="custom"
                  custom={`border ${product.borderColor}`}
                  icon={product.icon}
                  iconPosition="left"
                  rounded="full"
                  size="small"
                  textColor={product.textColor}
                  className={`pr-6 `}
                >
                  <span className={`${product.textColor} font-regular py-1`}>
                    {product.name}
                  </span>
                </ButtonInput>
              </div>
            ))}
          </div>
          <div>
            <h1 className="pb-2 word inline-block z-10 font-custom font-semibold text-[24px] sm:text-[20px] md:text-[40px] lg:text-[60px] text-[#1E376E] 
              leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[90px] tracking-[-0.01rem] align-center text-start">
                transform your outdoor<br/>advertising with data-<br />driven <span className="font-cursive font-regular tracking-[-0.3rem] text-[#129BFF]">intelligence</span>
            </h1>
            <p
              className="pb-8 text-[20px] text-start sm:text-[14px] md:text-[16px] lg:text-[16px] text-[#4C6590] mt-12 md:mt-8 
              leading-[22px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] tracking-normal"
            >
               Our Data Management Platform helps you collect, organize, and activate high-quality <br/>audience data directly from real respondents—no guesswork, just insights that drive results.
            </p>
          </div>
          <div className="w-1/4">
            <ButtonInput
              className={"bg-[#129BFF]"}
              // icon={<i className="fi fi-sr-megaphone flex items-center" />}
              rounded="small"
              fullWidth={true}
            >
              Request Demo
            </ButtonInput>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <div className="bg-[#EEF7FF] rounded-full h-[360px] w-[360px] flex justify-center items-center">
            <img src={Planner} className="h-1/2 w-1/2 -rotate-[0.542rad]" alt="fly" />
          </div>
        </div>
        
      </div>
    </div>
  );
};