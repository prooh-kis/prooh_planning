import { Chart, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
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
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.register(ChartDataLabels);

interface BarChartProps {
  currentData: any[];
  labels: string[];
  percent?: boolean;
}

export const DashBoardCostGraph: React.FC<BarChartProps> = ({
  currentData,
  labels,
  percent = true,
}) => {
  const requiredToPlayed: number[] = currentData?.map(
    (played: any) =>
      played.costPromised - played.costConsumed > 0 ? played.costPromised - played.costConsumed : 0
  );
  requiredToPlayed[requiredToPlayed.length - 1] = 0;

 
  const dailyPlayedSlots: number[] = currentData?.map(
    (played: any) =>
      played.costConsumed
  );

  const currentDayRemaining: number [] = currentData?.map(
    (played: any) =>
      played.costPromised - played.costConsumed > 0 ? played.costPromised - played.costConsumed : 0
  ).map((value, index) => index === currentData?.map(
    (played: any) =>
      played.costPromised - played.costConsumed > 0 ? played.costPromised - played.costConsumed : 0
  ).length - 1 ? value : 0);
  
  const newLabel = labels?.map((date: string) => formatDate(date));

  const chartData = {
    labels: newLabel,
    datasets: [
      {
        label: "Consumed Cost",
        data: dailyPlayedSlots,
        backgroundColor: "#64AB42",
        // borderColor: "#64AB4250",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 1000 ? formatNumber(value.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Current Day",
        data: currentDayRemaining,
        backgroundColor: "#FFE896",
        // borderColor: "#FFE89650",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#00000050",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 10 ? formatNumber(value.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Unconsumed Cost",
        data: requiredToPlayed,
        backgroundColor: "#E1FFD3",
        // borderColor: "#E1FFD350",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#00000050",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 1000 ? formatNumber(value.toFixed(0)) : "", // Hide
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
        labels: {
          color: "#6B7280",
          font: {
            size: 10,
          },
          padding: 12,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            let value = context.raw;
            if (label == "Current Day" && value == 0) {
              return null;
            }
            return `${label}: INR ${value.toFixed(0)}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          color: "#6B728050",
          font: {
            size: 10,
          },
          maxTicksLimit: 6, // Maximum number of ticks to show
          autoSkip: true, // Automatically skip labels to avoid overlap
          autoSkipPadding: 0, // Padding between labels when auto-skipping
          maxRotation: 0, // Prevent rotation
          minRotation: 0, // Prevent rotation
        }
      },
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          // color: "#E5E7EB50",
          // drawBorder: true,
          // borderDash: [12, 20], // Add dashed lines (5px dash, 5px gap)
          // drawTicks: false, // Hide tick marks on y-axis
          color: function(context: any) {
            // Create dashed effect by returning transparent color for some pixels
            return context.tick.value % 2 === 0 ? '#E5E7EB50' : 'transparent';
          },
          lineWidth: function(context: any) {
            return context.tick.value % 2 === 0 ? 1 : 0;
          },
          drawBorder: false,
        },
        ticks: {
          color: "#6B728050",
          font: {
            size: 10,
            // weight: "500",
          },
          maxTicksLimit: 6, // Maximum number of ticks to show
          autoSkip: true, // Automatically skip labels to avoid overlap
          autoSkipPadding: 20, // Padding between labels when auto-skipping
          maxRotation: 0, // Prevent rotation
          minRotation: 0, // Prevent rotation
          padding: 1,
          callback: function(value: number | string) {
            return formatNumber(value);
          },
        },
        
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    }
  };

  return (
    <div className="w-full h-[200px]">
      <Chart type="bar" data={chartData} options={options as any} />
    </div>
  );
};
