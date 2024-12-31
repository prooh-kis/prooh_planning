import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { LANDING_PAGE_DATA } from "../../constants/localStorageConstants";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

export function LandingPageMap(props: any) {
  const landingMapRef = useRef<any>(null);

  const [markers, setMarkers] = useState<any>(null);
  const [touchPoints, setTouchPoints] = useState<any>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [viewState, setViewState] = useState<any>({
    // longitude: 77.0891,
    // latitude: 28.495,
    // zoom: 5,
  });

  const colors = [
    "violet",
    "indigo",
    "blue",
    "cyan",
    "green",
    "yellow",
    "amber",
    "red",
  ]
  const colorsbg = [
    "violetbg",
    "indigobg",
    "bluebg",
    "cyanbg",
    "greenbg",
    "yellowbg",
    "amberbg",
    "redbg",
  ]

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setViewState({
          ...viewState,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 5,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Add markers from props data
  useEffect(() => {
    
    if (markers && markers?.length > 0 && landingMapRef?.current) {
      const latitudes = markers?.map((marker: any) => marker[0]);
      const longitudes = markers?.map((marker: any) => marker[1]);

      const bounds = [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)],
      ];

      const map = landingMapRef?.current?.getMap();
      map.fitBounds(bounds, { padding: 20, maxZoom: 15 });
    }
  }, [markers]);

  useEffect(() => {
    const newMarkers: any[] = [];
    const tpColors: any[] = []
    if (props?.data?.location) {
      props?.data?.locations?.forEach((s: any) => {
        const [screenId, details]: any = Object.entries(s)[0];
        const exists = newMarkers?.some(
          (marker: any) => marker?.[0] === details?.lat && marker[1] === details?.lng && marker[2] === screenId
        );
  
        if (!exists) {
          newMarkers?.push([details?.lat, details?.lng, screenId, details.touchpoint]);
        }
      })
      setMarkers(newMarkers);

      props?.data?.touchPoints?.forEach((t: any, j: any) => {
        tpColors.push({
          tp: t,
          color: colors[j]
        });
      });
      setTouchPoints(tpColors);
      console.log(tpColors, "1");

    } else {
      getDataFromLocalStorage(LANDING_PAGE_DATA)?.locations?.forEach((s: any) => {
        const [screenId, details]: any = Object.entries(s)[0];
        const exists = newMarkers?.some(
          (marker: any) => marker?.[0] === details?.lat && marker[1] === details?.lng && marker[2] === screenId
        );
  
        if (!exists) {
          newMarkers?.push([details?.lat, details?.lng, screenId, details.touchpoint]);
          
        }
      })
      setMarkers(newMarkers);

      getDataFromLocalStorage(LANDING_PAGE_DATA)?.touchPoints?.forEach((t: any, j: any) => {
        tpColors.push({
          tp: t,
          color: colors[j]
        });
      });
      setTouchPoints(tpColors)
      console.log(tpColors, "2");

    }
  }, [props?.data]);
  console.log(markers);
  console.log(touchPoints);


  return (
    <div className="h-full w-full flex flex-col items-start">
      <div className="flex flex-col items-end gap-2 right-2 pt-20 pr-2 absolute z-10">
        {touchPoints?.map((tp: any, i: any) => (
          <div key={i} className="flex items-center gap-2 group">
            <h1 className={`text-[10px] group-hover:opacity-100 group-hover:bg-${colorsbg[i]} group-hover:p-1 group-hover:rounded opacity-0 transition-opacity duration-300`}>{tp?.tp}</h1>
            <div className={`h-4 w-4 bg-${colors[i]} rounded-full`}></div>
          </div>
        ))}

        
      </div>
      <ReactMapGL
        ref={landingMapRef}
        // {...viewState}
        initialViewState={viewState}
        style={{ borderRadius: "10px", zIndex: 0 }}
        mapStyle="mapbox://styles/vviicckkyy55/cm4l7klx300fx01sf61uthrog"
        mapboxAccessToken={
          process.env.REACT_APP_MAPBOX ||
          "pk.eyJ1Ijoic2FjaGlucmFpbmEiLCJhIjoiY2x3N242M2thMDB0MDJsczR2eGF4dXJsZSJ9.ocBaZJ9rPSUhmS4zGRi7vQ"
        }
        onMove={(e: any) => {
          // setViewState(e.viewState);
        }}
      >
        {markers?.map((marker: any, i: any) => (
          <Marker key={i} latitude={marker[0]} longitude={marker[1]}>
            <div title={`${marker[2]}`} className="cursor-pointer">
              <i
              className={`fi fi-ss-circle text-${touchPoints?.filter((c: any) => c.tp === marker[3])[0]?.color}-500 border border-[0.5px] border-${touchPoints?.filter((c: any) => c.tp === marker[3])[0]?.color}-500 rounded-full text-[14px] flex items-center justify-center`}
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
