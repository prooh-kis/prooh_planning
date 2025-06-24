import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatNumber } from "../../utils/formatValue";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: { [key: string]: { promised?: number; delivered?: number } };
}

export const CostSheetPieChartSegment: React.FC<DoughnutChartProps> = ({
  data,
}) => {
  // Extract labels (keys of the data object)
  const {all, ...restData}: any = data;
  const labels = Object.keys(restData);

  // Extract values for promised and delivered
  const values = labels.map((key) => restData[key]?.cost || 0);

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
        label: "Cost",
        data: values,
        backgroundColor: labels.map(
          (_, index) => backgroundColors[index % backgroundColors.length]
        ),
        hoverBackgroundColor: labels.map(
          (_, index) => backgroundColors[index % backgroundColors.length] + "80"
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

  // Calculate total value for the center text
  const totalValue = values.reduce((sum, value) => {
    // Handle both number and { promised?: number, delivered?: number } types
    const numValue = typeof value === 'number' ? value : (value?.promised || 0);
    return sum + (numValue || 0);
  }, 0);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative flex items-center justify-center">
        <div className="relative">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[14px] font-bold">
              ₹ {formatNumber(totalValue.toFixed(2))}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 bottom-0">
        <h1 className="text-[12px]">Total Vendors Available - {values.length}</h1>
      </div>
    </div>
  );
};
