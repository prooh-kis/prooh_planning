import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import React from "react";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors?: string[];
    centerText?: string;
  };
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors || [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: true }, // Disable tooltip
      legend: { display: false }, // Disable legend
    },
    cutout: "70%", // Adjusts the center hole size
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: any) => {
      const { width, height, ctx } = chart;
      ctx.restore();

      const text1 = data.centerText?.split(" ")[0] || "";
      const text2 = data.centerText?.split(" ")[1] || "";

      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const centerX = width / 2;
      const centerY = height / 2;

      ctx.fillText(text1, centerX, centerY - 10); // First line (number)
      ctx.font = "16px sans-serif";
      ctx.fillText(text2, centerX, centerY + 12); // Second line (label)

      ctx.save();
    },
  };

  return (
    <div className="w-full">
      <Doughnut
        data={chartData}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};
