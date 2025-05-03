import React, { useState } from 'react';
import { FlyPage } from './FlyPage';
import { LayerPage } from './LayerPage';
import { PlannerPage } from './PlannerPage';
import { Fly, Planner, Layer } from '../../../assets';

export const ProductsPage: React.FC = () => {
  const [selected, setSelected] = useState<any>("Fly");
  const products: any = [
    {
      name: "Fly",
      icon: <img src={Fly} className="h-full w-full" alt="fly" />,
      textColor: "#4E64EE",
      borderColor: "border-[#4E64EE50]"
    }, {
      name: "Planner",
      icon: <img src={Planner} className="h-full w-full" alt="fly" />,
      textColor: "#0051FF",
      borderColor: "border-[#0051FF]"
    }, {
      name: "Layer",
      icon: <img src={Layer} className="h-full w-full" alt="fly" />,
      textColor: "#2A9860",
      borderColor: "border-[#2A9860]"
    }
  ]


   return (
     <div className="w-full h-full pt-12">
       {selected === "Fly" && (
         <FlyPage products={products} selected={selected} setSelected={setSelected} />
       )}
       {selected === "Layer" && (
         <LayerPage products={products} selected={selected} setSelected={setSelected} />
       )}
       {selected === "Planner" && (
         <PlannerPage products={products} selected={selected} setSelected={setSelected} />
       )}
     </div>
   )
};
