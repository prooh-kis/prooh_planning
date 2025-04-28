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
  targetData?: number[]; // Optional target data
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
  labels,
  percent = true,
}) => {

  // Find the first index where slotsDelivered = 0
  const zeroIndex = currentData?.findIndex((item) => item.slotsDelivered === 0);

  // requiredToPlayed calculation
  const requiredToPlayed: number[] = currentData.map((item, index) => {
    // Apply special handling for last index (100) as in your original code
    const delivered = index === currentData.length - 1 ? 100 : item.slotsDelivered;
    const promised = item.slotsPromised;
    
    // Calculate the original value
    const originalValue = Math.max(promised - delivered, 0);
    
    // If before zeroIndex, keep original value, else set to 0
    return (zeroIndex === -1 || index < zeroIndex) ? originalValue : 0;
  });

  // If zeroIndex is found and not the first element (i-1 exists), set the previous index to 0
  if (zeroIndex !== -1 && zeroIndex > 0) {
    requiredToPlayed[zeroIndex - 1] = 0;
  }
  

  const extraSlots: number[] = currentData?.map(
    (played: any) =>
      played.extraSlotsDelivered
  );

  const dailyPlayedSlots: number[] = currentData?.map(
    (played: any) =>
      played.slotsDelivered
  );

  const currentDayRemaining: number[] = currentData?.map((played, index) => 
    index === zeroIndex - 1 ? Math.max(played.slotsPromised - played.slotsDelivered, 0) : 0
  );

  const futurePerformanceData: number[] = currentData.map((item, index) => 
    (zeroIndex !== -1 && index < zeroIndex) ? 0 : item.slotsPromised
  );

  const newLabel = labels?.map((date: string) => formatDate(date));

  const chartData = {
    labels: newLabel,
    datasets: [
      {
        label: "Daily Delivery",
        data: dailyPlayedSlots,
        backgroundColor: "#77BFEF",
        // borderColor: "#77BFEF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Daily Remaining",
        data: requiredToPlayed,
        backgroundColor: "#E5F4FF",
        // borderColor: "#E5F4FF50",
        // borderWidth: 1,
        borderRadius: 5,
        datalabels: {
          color: "#00000050",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
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
            value > 10 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Adjustment Delivery",
        data: extraSlots,
        backgroundColor: "#CDC5FF",
        // borderColor: "#CDC5FF50",
        borderWidth: 0,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
        },
      },
      {
        label: "Still To Come",
        data: futurePerformanceData,
        backgroundColor: "#D7D7D750",
        // borderColor: "#CDC5FF50",
        borderWidth: 0,
        borderRadius: 5,
        datalabels: {
          color: "#fff",
          anchor: "center" as const,
          align: "center" as const,
          font: { size: 8 },
          formatter: (value: number) =>
            value > 75 ? formatNumber(value?.toFixed(0)) : "", // Hide
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
            return `${label}: ${value?.toFixed(0) || 0}`;
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
