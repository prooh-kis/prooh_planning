import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  Filler,
  ArcElement,
} from 'chart.js';

// Register the required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  Filler
);

interface BarChartProps {
  data: number[];
  labels: string[];
  label?: string;
}

export const DashboardBarChart: React.FC<BarChartProps> = ({ data, labels, label }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: label,
        data,
        // borderColor: '#129BFF',
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 'flex' as const, // Cast "flex" as a valid type
        barPercentage: 0.9,
        categoryPercentage: 0.8,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(0, "rgba(153, 102, 255, 1)");
          gradient.addColorStop(0.5, "rgba(153, 102, 255, 0.7)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.5");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const, // Explicitly cast "top" as a valid value
        display: false,
      },
      title: {
        display: false,
        text: "Screens Summary",
      },
    },
    scales: {
      x: {
        categoryPercentage: 1, // Adjust category spacing to 100%
        stacked: true,
        ticks: {
          callback: function (_: any, val: any) {
            const newthis = this as any;
            return newthis.getLabelForValue(val).substring(0, 5);
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          text: "Total Campaigns",
          display: false,
        },
        stacked: true,
      },
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};
