import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatNumber } from "../../utils/formatValue";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: { [key: string]: { promised?: number; delivered?: number } };
  type?: string;
  total?: number;
}

export const DashboardPieChart: React.FC<DoughnutChartProps> = ({
  total,
  type,
  data,
}) => {
  // Extract labels (keys of the data object)
  const labels = Object.keys(data);

  // Extract values for promised and delivered
  const promisedValues = labels.map((key) => data[key].promised || 0);
  const deliveredValues = labels.map((key) => data[key].delivered || 0);

  // Define colors for promised and delivered
  const backgroundColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#FF99A4",
    "#6CB9F4",
    "#FFD87E",
    "#76D2D2",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Promised",
        data: promisedValues,
        backgroundColor: labels.map(
          (_, index) => backgroundColors[index % backgroundColors.length]
        ),
        hoverBackgroundColor: labels.map(
          (_, index) => backgroundColors[index % backgroundColors.length] + "70"
        ),
      },
      {
        label: "Delivered",
        data: deliveredValues,
        backgroundColor: labels.map(
          (_, index) =>
            backgroundColors[(index + labels.length) % backgroundColors.length]
        ),
        hoverBackgroundColor: labels.map(
          (_, index) =>
            backgroundColors[
              (index + labels.length) % backgroundColors.length
            ] + "70"
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.dataset.label}: ${formatNumber(
              tooltipItem.raw?.toFixed(2)
            )}`;
          },
        },
      },
      datalabels: {
        display: false, // 👈 This completely hides data labels
      },
    },
    cutout: "50%", // Adjust inner circle size
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="relative w-full flex items-center justify-center">
        <h1 className="text-[12px]">{type}</h1>
        <h1 className="text-[14px] ml-2">{total}</h1>
      </div>
    </div>
  );
};
