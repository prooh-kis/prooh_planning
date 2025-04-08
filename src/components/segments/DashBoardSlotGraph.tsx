import { Chart, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";
import { formatDate } from "../../utils/dateAndTimeUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
  color2?: string;
  bgColor2?: string;
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
  color2,
  bgColor2,
  percent = true,
}) => {
  const requiredToPlayed: number[] = currentData?.map(
    (played: number, index: number) =>
      played >= targetData[index] ? targetData[index] : played
  );

  // const requiredToPlayed: number[] = currentData;
  const extraSlots: number[] = currentData?.map(
    (played: number, index: number) =>
      played > targetData[index] ? played - targetData[index] : 0
  );

  const remainingSlots: number[] = currentData?.map(
    (played: number, index: number) =>
      played < targetData[index] ? targetData[index] - played : 0
  );

  const newLabel = labels?.map((date: string) => formatDate(date));

  const chartData = {
    labels: newLabel,
    datasets: [
      {
        label: "Required",
        data: requiredToPlayed,
        backgroundColor: color,
        borderColor: bgColor,
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
        backgroundColor: color2,
        borderColor: bgColor2,
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
            return `${label}: ${formatNumber(value.toFixed(0))}`;
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
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};
