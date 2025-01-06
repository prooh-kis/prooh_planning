import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { LANDING_PAGE_DATA } from "../../constants/localStorageConstants";
import clsx from "clsx";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const colors = [
  "violet", "red", "green", "blue", "ecebff", "ff77e9", "78dcca", "emerald",
];
const colorsbg = [
  "purple", "121063", "565584", "3ab7bf", "ecebff", "ff77e9", "78dcca", "emerald",
];

export function LandingPageMap(props: any) {
  const landingMapRef = useRef<any>(null);

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [viewState, setViewState] = useState<any>({});

  // Memoize markers and touchPoints to avoid recalculating on each render
  const markers = useMemo(() => {
    const newMarkers: any[] = [];
    const tpColors: any[] = [];
    
    const locations = props?.data?.location ? props?.data?.locations : getDataFromLocalStorage(LANDING_PAGE_DATA)?.locations;
    const touchPoints = props?.data?.touchPoints || getDataFromLocalStorage(LANDING_PAGE_DATA)?.touchPoints;

    locations?.forEach((s: any) => {
      const [screenId, details]: any = Object.entries(s)[0];
      const exists = newMarkers.some((marker: any) => marker[0] === details?.lat && marker[1] === details?.lng && marker[2] === screenId);

      if (!exists) {
        newMarkers.push([details?.lat, details?.lng, screenId, details.touchpoint]);
      }
    });

    touchPoints?.forEach((t: any, j: any) => {
      tpColors.push({ tp: t, color: colors[j] });
    });

    return { markers: newMarkers, touchPoints: tpColors };
  }, [props?.data]);

  const { markers: memoizedMarkers, touchPoints: memoizedTouchPoints } = markers;

  // Get user's current location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setViewState((prevState: any) => ({
          ...prevState,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 5,
        }));
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Adjust map bounds based on markers
  useEffect(() => {
    if (memoizedMarkers?.length > 0 && landingMapRef.current) {
      const latitudes = memoizedMarkers.map((marker: any) => marker[0]);
      const longitudes = memoizedMarkers.map((marker: any) => marker[1]);
      const bounds = [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)],
      ];

      const map = landingMapRef.current?.getMap();
      map.fitBounds(bounds, { padding: 20, maxZoom: 15 });
    }
  }, [memoizedMarkers]);

  return (
    <div className="h-full w-full flex flex-col items-start">
      <div className="flex flex-col items-end gap-2 right-2 pt-20 pr-2 absolute z-10">
        {memoizedTouchPoints?.map((tp: any, i: any) => (
          <div key={i} className="flex items-center gap-2 group">
            <h1 className={clsx(`text-[10px] group-hover:opacity-100 group-hover:bg-${colorsbg[i]} group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300`)}>{tp?.tp}</h1>
            <div className={clsx(`h-4 w-4 bg-[#${colors[i]}] rounded-full`)}></div>
          </div>
        ))}
      </div>
      <ReactMapGL
        ref={landingMapRef}
        initialViewState={viewState}
        style={{ borderRadius: "10px", zIndex: 0 }}
        mapStyle="mapbox://styles/vviicckkyy55/cm4l7klx300fx01sf61uthrog"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX || "YOUR_MAPBOX_ACCESS_TOKEN"}
        onMove={(e: any) => setViewState(e.viewState)}
      >
        {memoizedMarkers?.map((marker: any, i: any) => (
          <Marker key={i} latitude={marker[0]} longitude={marker[1]}>
            <div title={`${marker[2]}`} className="cursor-pointer">
              <i
                className={clsx(
                  `fi fi-ss-circle text-${memoizedTouchPoints?.find((c: any) => c.tp === marker[3])?.color} border border-[0.5px] border-${memoizedTouchPoints?.find((c: any) => c.tp === marker[3])?.color}-500 rounded-full text-[14px] flex items-center justify-center`
                )}
                onClick={(e: any) => {
                  e.stopPropagation();
                  // Handle marker click, if needed
                }}
              ></i>
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}
