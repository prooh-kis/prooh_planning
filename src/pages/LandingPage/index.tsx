import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MiddleArea } from './MiddleArea';
import { RightSidebar } from './RightSidebar';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-12 h-full">
        <MiddleArea />
      </div>
    </div>
  );
};
