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
}) => {
  // Dynamically calculate the total value

  const chartData = {
    labels,
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
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
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
              value
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

  // Register a dynamic custom plugin
  useEffect(() => {
    const dynamicTotalPlugin = {
      id: "totalValue",
      afterDraw(chart: any) {
        if (chart.config.type === "bar") {
          const ctx = chart.ctx;
          const { width, height } = chart;
          ctx.save();
          ctx.font = "bold 14px Arial"; // Make the font bold and larger
          ctx.fillStyle = "#333"; // Darker text color for better visibility
          ctx.textAlign = "right";

          const total = chart.data.datasets[0].data.reduce(
            (sum: number, value: number) => sum + value,
            0
          );
          const average = total / currentData?.length;

          // Combine both total and average in one line
          const text = `Total: ${percent ? "" : "\u20B9"} ${formatNumber(
            total
          )}, Average: ${percent ? "" : "\u20B9"} ${formatNumber(average)}`;

          // Clear previous text and draw the new one
          ctx.clearRect(0, height - 30, width, 30);
          ctx.fillText(text, width - 20, height - 10);
          ctx.restore();
        }
      },
    };

    ChartJS.register(dynamicTotalPlugin);
    return () => {
      ChartJS.unregister(dynamicTotalPlugin);
    };
  }, [total]);

  return (
    <div className="w-full h-[260px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};
