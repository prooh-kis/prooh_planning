import { Line } from "react-chartjs-2";
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

interface LineChartProps {
  currentData?: Record<string, { promised: number }>;
  color?: string;
  bgColor?: string;
}

export const DurationGraphPerDay: React.FC<LineChartProps> = ({
  currentData,
  color = "#DC6700",
  bgColor = "#DC670050",
}) => {
  const requiredToPlayed = Object.values(currentData || {}).map(
    (data: any) => data.total
  );

  // Calculate the maximum value in the data
  const maxValue = Math.max(...requiredToPlayed, 0);
  // Set y-axis max to 1.5 times the maximum data value (with minimum of 1 if all values are 0)
  const yAxisMax = Math.max(maxValue * 1.2, 1).toFixed(0);

  const newLabel = Object.keys(currentData || {});

  const chartData = {
    labels: newLabel,
    datasets: [
      {
        label: "Total Slots",
        data: requiredToPlayed,
        borderColor: color,
        backgroundColor: bgColor,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 7,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointBorderWidth: 0,
        tension: 0.2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            let value = context.raw;
            return `${label}: ${formatNumber(value.toFixed(0))}`;
          },
        },
      },
      datalabels: {
        display: false
        // display: (context: any) => {
        //   return context.dataset.data[context.dataIndex] !== 0 && 
        //          context.dataIndex !== 0 && 
        //          context.dataIndex !== context.dataset.data.length - 1;
        // }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#6B728050",
          font: {
            // weight: "500",
          },
        },
      },
      y: {
        beginAtZero: true,
        max: yAxisMax, // Set the calculated maximum value
        grid: {
          color: "#E5E7EB50",
          drawBorder: false,
        },
        ticks: {
          color: "#6B728050",
          font: {
            // weight: "500",
          },
          padding: 10,
          callback: (value: number) => formatNumber(value),
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options as any} />
    </div>
  );
};