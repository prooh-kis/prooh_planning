import { Chart, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

ChartJS.register(ChartDataLabels);

interface BarChartProps {
  currentData: number[];
  targetData: number[]; // Optional target data
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
  // Calculate Extra Slots and Remaining Slots dynamically

  // const requiredToPlayed: number[] = currentData?.map(
  //   (played: number, index: number) =>
  //     played >= targetData[index] ? targetData[index] : played
  // );

  const requiredToPlayed: number[] = currentData;
  const extraSlots: number[] = currentData?.map(
    (played: number, index: number) =>
      played > targetData[index] ? played - targetData[index] : 0
  );

  const remainingSlots: number[] = currentData?.map(
    (played: number, index: number) =>
      played < targetData[index] ? targetData[index] - played : 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Delivered",
        data: requiredToPlayed,
        backgroundColor: "#06B6D480",
        borderColor: "#06B6D4",
        borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { weight: "bold" as const },
          formatter: (value: number) =>
            value !== 0 ? formatNumber(value.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Remaining",
        data: remainingSlots,
        backgroundColor: "#EF444480",
        borderColor: "#EF4444",
        borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { weight: "bold" as const },
          formatter: (value: number) => "", // Hide zero values
        },
      },
      {
        label: "Extra Played",
        data: extraSlots,
        backgroundColor: "#6366F180",
        borderColor: "#6366F1",
        borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { weight: "bold" as const },
          formatter: (value: number) => "", // Hide zero values
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            let value = context.raw;
            return `${label}: ${value}`;
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
    <div className="w-full h-[300px]">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};
