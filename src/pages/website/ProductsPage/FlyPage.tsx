import ButtonInput from '../../../components/atoms/ButtonInput';
import { Fly } from '../../../assets';
import React from 'react';

interface FlyPageProps {
  products: {
    name: string;
    icon: JSX.Element;
    textColor: string;
    borderColor?: any;
  }[];
  selected?: any;
  setSelected?: any;
}

export const FlyPage: React.FC<FlyPageProps> = ({products, selected, setSelected}) => {

  const secondSection = [{
    name: "Instant Campaign Deployment",
    icon: <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>,
    bg: "bg-[#129BFF]",
  }, {
    name: "Third Party Campaigns",
    icon: <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>,
    bg: "bg-[#FF0707]",
  }, {
    name: "Multiple Creative Optimization",
    icon: <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>,
    bg: "bg-[#129BFF]"
  }, {
    name: "Campaign Monitoring",
    icon: <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>,
    bg: "bg-[#FF960C]"
  }, {
    name: "Inventory Management",
    icon: <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>,
    bg: "bg-[#4418A4]"
  }, {
    name: "Proof Of Play",
    icon: <i className="text-white text-[24px] fi fi-sr-camera-cctv flex items-center justify-center"></i>,
    bg: "bg-[#B408BD]"
  }];

  return (
    <div className="w-full h-full pt-4">
      <div className="w-full grid grid-cols-12 bg-gradient-to-b from-[#F3F5FF] to-[#FFFFFF] p-12">
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
                powerfull cms solutions {<br/>}for digital out-of- <br/>home <span className="font-cursive font-regular tracking-[-0.3rem] text-[#4E64EE]">advertising</span>
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
              className={"bg-[#4E64EE]"}
              // icon={<i className="fi fi-sr-megaphone flex items-center" />}
              rounded="small"
              fullWidth={true}
            >
              Request Demo
            </ButtonInput>
          </div>
          
         
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <div className="bg-[#F2F5FF] rounded-full h-[360px] w-[360px] flex justify-center items-center">
            <img src={Fly} className="h-1/2 w-1/2" alt="fly" />
          </div>
        </div>
        
      </div>

      <div className="py-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12px] text-[#2D5087] tracking-[0.5rem] px-1 pb-2">TYPES OF DATA SOURCES</p>
          <h1 className="py-4 text-center font-custom font-semibold text-[36px] md:text-[48px] leading-[42px] md:leading-[54.72px] tracking-normal">End To End Solution <br/>For <span className="font-cursive font-regular tracking-[-0.2rem] text-[#4E64EE]">Media Owner</span></h1>
          <p className="text-[20px] py-4 text-[#2D5087] text-center">  Respondents input their real-world demographics, interests, and behaviours <br/>directly into your system.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 px-20 py-8">
          {secondSection?.map((content: any, i: any) => (
            <div key={i} className="col-span-4 rounded-[12px] border border-gray-100 p-4 flex items-center gap-2 h-[120px]">
              <div className={`${content.bg} rounded-full p-4`}>
                {content.icon}
              </div>
              <h1 className="text-[24px] text-[#2A3856] font-semibold">
                {content.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};