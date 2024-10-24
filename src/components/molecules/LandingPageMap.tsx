import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  // process.env.REACT_APP_MAPBOX ||
  "pk.eyJ1IjoidnZpaWNja2t5eTU1IiwiYSI6ImNsMzJwODk5ajBvNnMzaW1wcnR0cnpkYTAifQ.qIKhSIKdM9EDKULRBahZ-A";
export function LandingPageMap(props: any) {
  console.log(props)
  // const mapRef = useRef<any>(null);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);


  const [viewState, setViewState] = useState<any>({
    longitude: props?.geometry?.coordinates[1] || 77.0891,
    latitude: props?.geometry?.coordinates[0] || 28.495,
    zoom: props?.zoom || 5,
  });

  // Get user's current location
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setUserLocation({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //     setViewState({
    //       ...viewState,
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //   },
    //   (error) => {
    //     console.error("Error getting user location:", error);
    //   },
    //   { enableHighAccuracy: true }
    // );
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <ReactMapGL
        // ref={mapRef}
        initialViewState={viewState}
        style={{ borderRadius: "10px", zIndex: 0 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={
          process.env.REACT_APP_MAPBOX ||
          "pk.eyJ1Ijoic2FjaGlucmFpbmEiLCJhIjoiY2x3N242M2thMDB0MDJsczR2eGF4dXJsZSJ9.ocBaZJ9rPSUhmS4zGRi7vQ"
        }
        // onMove={(e: any) => setViewState(e.viewState)}
      >
       

      </ReactMapGL>
    </div>
  );
}
