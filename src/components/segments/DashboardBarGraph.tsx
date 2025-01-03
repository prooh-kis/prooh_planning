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
  color="rgba(138, 43, 226, 1)",
  bgColor="rgba(138, 43, 226, 0.5)",
  percent=true
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
      },
      // Only include the target data if it's passed
      ...(targetData
        ? [
            {
              label: "Target Value",
              data: targetData.map(
                (target, index) => Math.max(0, target - currentData[index])
              ),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              borderRadius: 5,
              barThickness: "flex" as const,
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
            return `${label}: ${percent ? "" : "\u20B9"} ${value.toFixed(0)}`;
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
        // Check if the chart is a bar chart
        if (chart.config.type === "bar") {
          const ctx = chart.ctx;
          const { width, height } = chart;
    
          // Draw the dynamic total value in the bottom-right corner
          ctx.save();
          ctx.font = "12px Arial";
          ctx.fillStyle = "#666";
          ctx.textAlign = "right";
          ctx.clearRect(width - 100, height - 30, 100, 30); // Clear previous total
          const total = chart.data.datasets[0].data.reduce(
            (sum: number, value: number) => sum + value,
            0
          );
          ctx.fillText(`Total: ${percent ? "" : "\u20B9"} ${total}`, width - 10, height - 10);
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
