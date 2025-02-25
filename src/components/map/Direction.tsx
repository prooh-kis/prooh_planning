import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";


export function Directions({ route, allRoutes }: any) {
  console.log("1 routes", allRoutes);

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderers, setDirectionsRenderers] = useState<google.maps.DirectionsRenderer[]>([]);
  const [bufferPolygons, setBufferPolygons] = useState<google.maps.Polygon[]>([]);
  const [routeMarkers, setRouteMarkers] = useState<google.maps.Marker[]>([]);

  const getColorForRoute = (id: string | number) => {
    const colors = ["#FF0000", "#0000FF", "#008000", "#FFA500", "#800080"];
    return colors[Math.abs((typeof id === "string" ? id.length : id) % colors.length)];
  };

  useEffect(() => {
    if (!routesLibrary || !map) return;

    if (!routesLibrary.DirectionsService || !routesLibrary.DirectionsRenderer) {
      console.error("Google Maps Routes library not fully loaded yet.");
      return;
    }

    setDirectionsService(new routesLibrary.DirectionsService());
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !map || !routesLibrary) return;
  
    // **Step 1: Clear Previous Routes, Buffers, and Markers**
    directionsRenderers.forEach((renderer) => renderer.setMap(null));
    bufferPolygons.forEach((polygon) => polygon.setMap(null));
    routeMarkers.forEach((marker) => marker.setMap(null));
  
    setDirectionsRenderers([]);
    setBufferPolygons([]);
    setRouteMarkers([]);
  
    // **Handle case when allRoutes is empty (remove everything)**
    if (allRoutes.length === 0) {
      return; // Ensures cleanup runs properly when allRoutes is empty
    }
  
    const newRenderers: google.maps.DirectionsRenderer[] = [];
    const newPolygons: google.maps.Polygon[] = [];
    const newMarkers: google.maps.Marker[] = [];
    const renderedRouteIds = new Set<string>();
  
    const routePromises = allRoutes.map((route: any) => {
      const origin = new google.maps.LatLng(route?.origin?.center?.[1], route?.origin?.center?.[0]);
      const destination = new google.maps.LatLng(route?.destination?.center?.[1], route?.destination?.center?.[0]);
  
      return directionsService
        .route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        })
        .then((response) => {
          console.log("response", route.id, response);
  
          response.routes.forEach((r, index) => {
            const routeId = `${route.id}-${index}`;
            if (renderedRouteIds.has(routeId)) return;
            renderedRouteIds.add(routeId);
  
            const renderer = new routesLibrary!.DirectionsRenderer({
              map,
              polylineOptions: {
                strokeColor: getColorForRoute(route.id),
                strokeOpacity: 0.8,
                strokeWeight: 5,
              },
              suppressMarkers: true,
            });
  
            renderer.setDirections(response);
            renderer.setRouteIndex(index);
            newRenderers.push(renderer);
  
            // **Draw Buffer Around Route**
            const mainRoute = r.overview_path.map((point: any) => ({
              lat: point.lat(),
              lng: point.lng(),
            }));
  
            if (mainRoute.length > 0) {
              const lineString = turf.lineString(mainRoute.map(({ lat, lng }: any) => [lng, lat]));
              const buffered = turf.buffer(lineString, 1, { units: "kilometers" });
  
              if (buffered?.geometry?.coordinates) {
                const bufferPolygonCoords = buffered.geometry.coordinates[0]?.map(
                  ([lng, lat]) => ({ lat, lng })
                );
  
                if (bufferPolygonCoords.length > 0) {
                  const bufferColor = `#${getColorForRoute(route.id)?.split("#")?.join("30")}`;
  
                  const newPolygon = new google.maps.Polygon({
                    paths: bufferPolygonCoords,
                    strokeColor: getColorForRoute(route.id),
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: bufferColor,
                    fillOpacity: 0.5,
                  });
  
                  newPolygon.setMap(map);
                  newPolygons.push(newPolygon);
                }
              }
            }
  
            // **Only add markers for rendered routes**
            const startMarker = new google.maps.Marker({
              position: origin,
              map,
              title: "Start Point",
              icon: "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
            });
  
            const endMarker = new google.maps.Marker({
              position: destination,
              map,
              title: "End Point",
              icon: "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
            });
  
            newMarkers.push(startMarker, endMarker);
          });
        });
    });
  
    // **Step 3: Update State After All Routes Processed**
    Promise.all(routePromises).then(() => {
      setDirectionsRenderers(newRenderers);
      setBufferPolygons(newPolygons);
      setRouteMarkers(newMarkers);
    });
  
    return () => {
      newRenderers.forEach((renderer) => renderer.setMap(null));
      newPolygons.forEach((polygon) => polygon.setMap(null));
      newMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [directionsService, allRoutes]);
  
  console.log("Unique renderers:", directionsRenderers.length);

  return null;
}
