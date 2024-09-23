import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MiddleArea } from './MiddleArea';
import { RightSidebar } from './RightSidebar';
import { StepperSlider } from '../../components/molecules/StepperSlider';
import { Footer } from '../../components/footer';

export const RegularPlanPage: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider steps={9}/>
      </div>
      <div className="w-full h-full grid grid-cols-10">
        <div className="col-span-1 flex justify-start ml-2">
          <LeftSidebar />
        </div>
        <div className="col-span-8 h-full">
          <MiddleArea />
        </div>
        <div className="col-span-1 flex justify-end pr-2">
          <RightSidebar />
        </div>
      </div>
    </div>
   
  );
};
