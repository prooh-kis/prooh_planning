import React from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  className = "",
  style = {},
}) => {
  // In a real implementation, you would use an icon library or SVG icons
  const getIcon = () => {
    switch (name) {
      case "close":
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
            style={style}
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        );
      case "chevron-down":
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
            style={style}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        );
      case "chevron-up":
        return (
          <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
            style={style}
          >
            <path d="M6 15l6-6 6 6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return getIcon();
};
