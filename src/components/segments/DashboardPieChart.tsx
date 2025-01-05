import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";

// Register required components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: { [city: string]: number }; // Audience data as an object
  type?: string;
  total?: number;
}

export const DashboardPieChart: React.FC<DoughnutChartProps> = ({ total, type, data }) => {
  // Extract labels (cities) and values (audience numbers) from the object
  const labels = Object.keys(data);
  const values = Object.values(data);

  // Define colors for each segment
  const backgroundColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#FF99A4", "#6CB9F4", "#FFD87E", "#76D2D2",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors.slice(0, labels.length),
        hoverBackgroundColor: backgroundColors
          .slice(0, labels.length)
          .map((color) => color + "70"), // Transparent hover effect
        borderWidth: 1,
        spacing: 2, // Adds spacing between each segment
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
            const value = values[tooltipItem.dataIndex];
            return `${label}: ${formatNumber(value.toFixed(0))}`;
          },
        },
      },
    },
    cutout: "30%", // Adjust the size of the inner circle (doughnut size)
    radius: "95%", // Adjusts the outer radius of the doughnut
    hoverOffset: 20, // "Explode" effect on hover
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-4"
      style={{
        position: "relative",
        padding: "10px", // Add padding around the chart
        boxSizing: "border-box", // Ensure padding does not affect dimensions
        overflow: "visible", // Allow hover effect to show fully
      }}
    >
      {/* Chart container */}
      <div
        className="relative py-10"
        style={{
          // width: "300px",
          // height: "300px", // Control chart size
          margin: "0 auto", // Center the chart
        }}
      >
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="w-full flex items-center justify-center">
        <h1 className="text-[14px]">{type === "city" ? "City wise" : "Touchpoints wise" }</h1>
        <h1 className="text-[14px]">{total}</h1>
      </div>
    </div>
  );
};
