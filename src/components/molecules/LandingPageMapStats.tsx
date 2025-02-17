import { useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { YearRangeSlider } from "./YearRangeSlider";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export function LandingPageMapStats({ data }: any) {
  const [year, setYear] = useState<any>("All");

    // Extract labels (cities) and values (audience numbers) from the object
    const labels = ["Small", "Big", "Spectacular"]
    const values = [3, 4, 9]
  
    const totalValue = [3,4,9].reduce((sum, value) => sum + value, 0);
    // console.log("data : ", data);
  
    // Define colors for each segment
    const backgroundColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#FF99A4",
      "#6CB9F4",
      "#FFD87E",
      "#76D2D2",
    ];
  
    const chartData = {
      // ["Small", "Big", "Spectacular"],
      datasets: [
        {
          data: [3, 4, 9],
          backgroundColor: backgroundColors.slice(0, labels.length),
          hoverBackgroundColor: backgroundColors
            .slice(0, labels.length)
            .map((color) => color + "70"), // Transparent hover effect
          borderWidth: 1,
          spacing: 1, // Adds spacing between each segment
          datalabels: {
            color: "#fff",
            anchor: "center" as const,
            align: "center" as const,
            font: { weight: "bold" as const },
            // formatter: (value: number) => formatNumber(value.toFixed(0)), // Hide zero values
            formatter: (value: number) => {
              const percentage = ((value / totalValue) * 100).toFixed(1);
              return `${percentage}%`;
            },
          },
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1, // Keep the chart square
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem: any) {
              const label = labels[tooltipItem.dataIndex];
              const value = [3,4,9][tooltipItem.dataIndex];
              return `${label}: ${formatNumber(value.toFixed(0))}`;
            },
          },
        },
      },
      cutout: "40%", // Adjust the size of the inner circle (doughnut size)
      radius: "50%", // Adjusts the outer radius of the doughnut
      hoverOffset: 10, // "Explode" effect on hover
    };
  
  return (
    <div className="w-full rounded-[12px]">
      <div className="grid grid-cols-3 w-full gap-y-2">
        {[
          {
            label: "Countries",
            value: ("0" + data?.countries).slice(-2),
          },
          { label: "Cities", value: ("0" + data?.cities).slice(-2) },
          {
            label: "Touchpoints",
            value: ("0" + data?.touchPoints?.length).slice(-2),
          },
          { label: "Venues", value: data?.venues },
          {
            label: "Screens",
            value: data?.screens?.length,
          },
          {},
          {
            label: "Campaigns",
            value: data?.campaigns,
          },
          {
            label: "Reach",
            value: formatNumber(Number(data?.reach)),
          },
          {
            label: "CPM",
            value: `${data?.averagePricePerSlot?.toFixed(0)}`,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`truncate h-40 lg:py-6 py-4 px-8 col-span-1 border border-x-2 border-white flex flex-col items-center text-[#20272C] justify-center bg-[#F8FCFF] rounded-[12px]`}
          >
            {index === 5 ? (
              <div className="">
                <Doughnut data={chartData} options={options} />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h1 className="lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] font-bold text-[#2076B5] lg:leading-[42.77px] md:leading-[36px] sm:leading-[32px] leading-[28px] tracking-[0.01em]">
                  {item.value ? item.value : 0}
                </h1>
                <p className="lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px] lg:leading-[21.39px] md:leading-[18px] sm:leading-[16px] leading-[14px] text-[#2076B5] tracking-[0.01em]">
                  {item.label}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
