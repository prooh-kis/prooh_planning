import React from 'react';

interface VerticalLineProps {
  height?: string; // height of the line
  color?: string;  // color of the line
  thickness?: string; // thickness of the line
}

export const VerticalLine = ({ height, color, thickness }: VerticalLineProps) => {
  return (
    <div
      style={{
        width: thickness,
        height: height,
        backgroundColor: color,
        margin: '0 auto',
      }}
    />
  );
};

