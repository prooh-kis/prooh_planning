import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";
import { formatDate } from "../../utils/dateAndTimeUtils";

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BarChartProps {
  currentData: number[];
  targetData?: number[]; // Make targetData optional
  labels: string[];
  label?: string;
  total?: any;
  color?: any;
  bgColor?: any;
  percent?: any;
  color2?: any;
  bgColor2?: any;
}

export const DashboardBarChart: React.FC<BarChartProps> = ({
  currentData,
  targetData,
  labels,
  label,
  total,
  color = "rgba(138, 43, 226, 1)",
  bgColor = "rgba(138, 43, 226, 0.5)",
  percent = true,
  color2,
  bgColor2,
}) => {
  // Dynamically calculate the total value

  const newLabel = labels?.map((date: string) => formatDate(date));

  const chartData = {
    labels: newLabel,
    datasets: [
      {
        label: `${label || "Current Value"}`,
        data: currentData,
        backgroundColor: bgColor,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 5,
        barThickness: "flex" as const,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { weight: "bold" as const },
          formatter: (value: number) => formatNumber(value.toFixed(0)), // Hide zero values
        },
      },
      // Only include the target data if it's passed
      ...(targetData
        ? [
            {
              label: "Target Value",
              data: targetData.map((target, index) =>
                Math.max(0, target - currentData[index])
              ),
              backgroundColor: color2,
              borderColor: bgColor2,
              borderWidth: 1,
              borderRadius: 5,
              barThickness: "flex" as const,
              datalabels: {
                color: "#fff",
                anchor: "center" as const,
                align: "center" as const,
                font: { weight: "bold" as const },
                formatter: (value: number) => formatNumber(value.toFixed(0)), // Hide zero values
              },
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "start" as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${percent ? "" : "\u20B9"} ${formatNumber(
              Number(value?.toFixed(0))
            )}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
  };

  return (
    <div className="w-full h-[260px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};
