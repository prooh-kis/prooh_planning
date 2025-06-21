import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController,
} from "chart.js";
import { formatNumber } from "../../utils/formatValue";

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController
);

interface BarChartProps {
  currentData: any[];
  labels: any[];
  label?: string;
  color?: string;
  bgColor?: string;
  percent?: boolean;
  additionalData?: any;
}

export const CostSheetHorizontalBarChartSegment: React.FC<BarChartProps> = ({
  currentData,
  labels,
  label,
  color = "#D6EEFF",
  bgColor = "#D6EEFF",
  percent = false,
  additionalData,
}) => {

  // Calculate heights and dimensions
  const barHeight = 25; // height of each bar in pixels
  const visibleBars = 5;
  const containerHeight = barHeight * visibleBars + 60; // 80px for padding and x-axis
  const totalBars = labels?.length || 0;
  const showScroll = totalBars > visibleBars;
  const scrollableHeight = barHeight * totalBars + 60;

  // Sort data by percentage in descending order
  const sortedData = labels?.map((label, index) => ({
    vendor: additionalData?.[index] || '',
    label: `${label.percentage}%`,
    cost: currentData?.[index]?.cost || 0,
    percentage: label.percentage
  })).sort((a, b) => b.percentage - a.percentage);

  // Prepare chart data with sorted values
  const chartData: any = {
    labels: sortedData?.map(item => item.label) || [],
    datasets: [
      {
        label: label || "Current Value",
        data: sortedData?.map(item => item.cost) || [],
        backgroundColor: bgColor,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 5,
        barThickness: barHeight * 0.8, // 80% of barHeight
        datalabels: {
          color: "#000000",
          anchor: "end" as const,
          align: "end" as const,
          font: { 
            weight: "semibold" as const,
            size: 10
          },
          formatter: (value: number) => `₹ ${formatNumber(Number(value?.toFixed(0)))}`,
        },
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0 // Disable animations for better performance
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${sortedData[context.dataIndex].vendor} : ${percent ? "" : "\u20B9"} ${formatNumber(
              Number(value)?.toFixed(0)
            )}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: "#D7D7D720"
        },
        ticks: {
          display: false,
          maxTicksLimit: 5,
          callback: function(value: any) {
            return `₹ ${formatNumber(Number(value?.toFixed(0)))}`;
          }
        },
        position: 'bottom' as const,
      },
      y: {
        display: true,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          crossAlign: 'far' as const,
          mirror: false,
          padding: 5,
          font: {
            size: 10
          },
          callback: function(value: any, index: number) {
            // @ts-ignore - value is a string from the label
            const percentage = parseFloat(this.getLabelForValue(value).replace('%', ''));
            if (percentage > 0) {
              return `${percentage}%`;
            } else if (percentage < 0) {
              return `${percentage}%`;
            }
            return `${percentage}%`;
          },
          color: (context: any) => {
            const label = context.tick.label;
            if (label) {
              const percentage = parseFloat(label.replace('%', ''));
              if (percentage > 0) return '#3A9868'; // green
              if (percentage < 0) return '#FF0000'; // red
            }
            return '#6B7280'; // gray-500
          }
        },
        border: {
          display: false
        }
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 30, // Extra space for labels
        top: 5,
        bottom: 5
      }
    }
  };

  return (
    <div className="w-full relative overflow-hidden" style={{ height: `${containerHeight}px` }}>
      <div 
        className="w-full" 
        style={{
          height: '85%',
          overflowY: showScroll ? 'auto' : 'hidden',
          paddingRight: showScroll ? '8px' : '0',
          scrollbarWidth: 'thin',
          scrollbarColor: '#D7D7D7 transparent'
        }}
      >
        <div className="" style={{ 
          width: '100%',
          minHeight: showScroll ? `${scrollableHeight}px` : '100%',
          position: 'relative'
        }}>
          <Bar 
            data={chartData} 
            options={{
              ...options,
              scales: {
                ...options.scales,
                y: {
                  ...options.scales.y,
                  afterFit: (scale: any) => {
                    // Ensure consistent bar height
                    scale.barThickness = barHeight;
                  }
                }
              }
            }}
            height={scrollableHeight}
          />
        </div>
      </div>
      <div className={""}>
        <div className="flex justify-between ml-8 mr-4 border-t">
          {[0, 1].map((tick, i) => {
            const maxValue = Math.max(...currentData.map(d => d.cost), 0);
            const value = Math.round(maxValue * tick);
            return (
              <div key={i} className="text-xs text-gray-500">
                ₹ {formatNumber(Number(value?.toFixed(0)))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
