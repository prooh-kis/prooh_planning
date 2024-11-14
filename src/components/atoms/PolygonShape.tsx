import React from "react";

export const PolygonShape: React.FC<{ data: any[] }> = ({ data }) => {
  // Ensure data is valid and contains at least one feature with coordinates
  if (
    !data.length ||
    !data[0]?.geometry?.coordinates?.[0]?.length
  ) {
    return (
      <div className="h-full w-full rounded-md bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No polygon data available</p>
      </div>
    );
  }

  // Extract coordinates
  const polygonCoordinates = data[0].geometry.coordinates[0];

  // Calculate bounding box
  const longitudes = polygonCoordinates.map(([lng]: any) => lng);
  const latitudes = polygonCoordinates.map(([, lat]: any) => lat);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);

  // Calculate width and height of the bounding box
  const width = maxLng - minLng;
  const height = maxLat - minLat;

  // Add padding for better visualization
  const padding = 0.05; // 5% padding
  const paddedWidth = width * (1 + padding * 2);
  const paddedHeight = height * (1 + padding * 2);

  // Adjust min and max for padding
  const paddedMinLng = minLng - width * padding;
  const paddedMaxLat = maxLat + height * padding;

  // Normalize coordinates to fit the bounding box
  const normalizedCoordinates = polygonCoordinates.map(([lng, lat]: any) => [
    ((lng - paddedMinLng) / paddedWidth) * 500, // Normalize longitude
    ((paddedMaxLat - lat) / paddedHeight) * 500, // Normalize latitude (invert for SVG Y-axis)
  ]);

  // Convert normalized coordinates to SVG points
  const svgPoints = normalizedCoordinates
    .map((point: any) => point.join(","))
    .join(" ");

  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg
        viewBox={`0 0 500 500`}
        className="w-full h-full"
      >
        <polygon
          points={svgPoints}
          fill="rgba(59, 130, 246, 0.5)" /* Tailwind's blue-500 with transparency */
          stroke="#3b82f6" /* Tailwind's blue-500 */
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
