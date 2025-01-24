import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController, // Add this
  BarController, // Also include BarController
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController, // Register LineController
  BarController // Register BarController
);

ChartJS.register(ChartDataLabels);

interface BarChartProps {
  currentData: number[];
  targetData?: number[]; // Optional target data
  labels: string[];
  label?: string;
  total?: string;
  color?: string;
  bgColor?: string;
  percent?: boolean;
}

export const DashBoardSlotGraph: React.FC<BarChartProps> = ({
  currentData,
  targetData,
  labels,
  label,
  total,
  color = "rgba(138, 43, 226, 1)",
  bgColor = "rgba(138, 43, 226, 0.5)",
  percent = true,
}) => {
  // Calculate percentages if targetData is provided
  const percentageData = targetData
    ? currentData.map((value, index) =>
        targetData[index] ? (value / targetData[index]) * 100 : 0
      )
    : [];

  // Prepare chart data
  const chartData = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: `${label || "Current Value"}`,
        data: currentData,
        borderColor: color,
        borderWidth: 2,
        backgroundColor: "rgba(138, 43, 226, 0.5)",
        fill: false,
        // Only show data labels for the bar graph and in percentage
        datalabels: {
          color: color,
          anchor: "end" as const,
          align: "top" as const,
          formatter: (value: number, context: any) => {
            const percentage = percentageData[context.dataIndex] ?? 0;
            return `${percentage.toFixed(1)}%`; // Show percentage
          },
          font: {
            weight: "bold" as const, // Corrected here
          },
        },
      },
      {
        type: "line" as const,
        label: "Target Value",
        data: targetData,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        fill: false,
        datalabels: {
          color: "rgb(242, 8, 8)", // Line color
          anchor: "start" as const,
          align: "top" as const,
          formatter: (value: number) => formatNumber(value.toFixed(0)),
          font: {
            weight: "bold" as const,
          },
        },
      },
    ],
  };

  // Chart options for customization
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
            const value = context.raw ?? 0;
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
        stacked: false,
      },
    },
  };

  return (
    <div className="w-full h-[260px]">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};
