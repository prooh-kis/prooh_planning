import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

export function LandingPageMap(props: any) {
  const landingMapRef = useRef<any>(null);

  const [markers, setMarkers] = useState<any>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [viewState, setViewState] = useState<any>({
    // longitude: 77.0891,
    // latitude: 28.495,
    // zoom: 5,
  });

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
    
    if (markers.length > 0 && landingMapRef.current) {
      const latitudes = markers.map((marker: any) => marker[0]);
      const longitudes = markers.map((marker: any) => marker[1]);

      const bounds = [
        [Math.min(...longitudes), Math.min(...latitudes)],
        [Math.max(...longitudes), Math.max(...latitudes)],
      ];

      const map = landingMapRef.current.getMap();
      map.fitBounds(bounds, { padding: 20, maxZoom: 15 });
    }
  }, [markers]);

  useEffect(() => {
    const newMarkers: any[] = [];
    if (markers?.length === 0) {
      props?.data?.locations?.forEach((s: any) => {
        const [screenId, details]: any = Object.entries(s)[0];
        const exists = newMarkers.some(
          (marker: any) => marker[0] === details.lat && marker[1] === details.lng && marker[2] === screenId
        );
  
        if (!exists) {
          newMarkers.push([details.lat, details.lng, screenId]);
        }
      });
      setMarkers(newMarkers);
    }

  },[props, markers]);


  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
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
                className="fi fi-ss-circle text-red-500 border border-[0.5px] border-black rounded-full text-[14px] flex items-center justify-center"
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
