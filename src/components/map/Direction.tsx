import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";


export function Directions({ allRoutes, setAllRoutes, allScreens, routeRadius, setRouteFilteredScreens, handleFinalSelectedScreens }: any) {

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderers, setDirectionsRenderers] = useState<google.maps.DirectionsRenderer[]>([]);
  const [routeMarkers, setRouteMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [routeBufferPolygons, setRouteBufferPolygons] = useState<google.maps.Polygon[]>([]);

  const getColorForRoute = (id: string | number) => {
    const colors = ["#540b0e", "#e09f3e", "#073b4c", "#0f4c5c", "#ef476f"];
    return colors[Math.abs((typeof id === "string" ? id.length : id) % colors.length)];
  };

  const handleRouteData = (routeDataArray: any[], id: any, buffered: any) => {

    let arr = [...allRoutes]; // Clone state to avoid direct mutation
    let existingScreens: any[] = [];

    // Find the existing route by id
    for (let data of arr) {
        if (data?.id === id) {
            existingScreens = data.selectedScreens || [];
            break;
        }
    }

    const filteredRecords = allScreens?.filter((point: any) => {
        const screenPoint = turf.point([
            point.location.geographicalLocation.longitude,
            point.location.geographicalLocation.latitude,
        ]);
        return turf.booleanPointInPolygon(screenPoint, buffered);
    });

    // Merge unique screens
    const combinedFilteredRecords = [...existingScreens];

    filteredRecords.forEach((record: any) => {
        if (!combinedFilteredRecords.some((existing: any) => existing._id === record._id)) {
            combinedFilteredRecords.push(record);
        }
    });

    // Only update state if new screens are added
    if (combinedFilteredRecords.length !== existingScreens.length) {
        for (let data of arr) {
            if (data?.id === id) {
                data.selectedScreens = combinedFilteredRecords;
            }
        }
        setAllRoutes(arr);
    }

    // Prevent redundant state updates for routeFilteredScreens
    setRouteFilteredScreens((prevScreens: any[]) => {
        const newScreens = combinedFilteredRecords.filter(
            (record: any) => !prevScreens.some((existing: any) => existing._id === record._id)
        );

        if (newScreens.length === 0) return prevScreens; // Avoid unnecessary re-renders
        return [...prevScreens, ...newScreens];
    });

    handleFinalSelectedScreens({
        type: "add",
        screens: combinedFilteredRecords,
    });
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
    routeBufferPolygons.forEach((polygon: any) => polygon.setMap(null));
    routeMarkers.forEach((marker) => marker.map = null);
  
    setDirectionsRenderers([]);
    setRouteBufferPolygons([]);
    setRouteMarkers([]);
  
    // **Handle case when allRoutes is empty (remove everything)**
    if (allRoutes.length === 0) {
      return; // Ensures cleanup runs properly when allRoutes is empty
    }
  
    const newRenderers: google.maps.DirectionsRenderer[] = [];
    const newPolygons: google.maps.Polygon[] = [];
    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
    const renderedRouteIds = new Set<string>();
  
    if (directionsService) {
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
            // console.log("response", route.id, response);
    
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
              // console.log("renderer", renderer);
              newRenderers.push(renderer);
    
              // **Draw Buffer Around Route**
              const mainRoute = r.overview_path.map((point: any) => ({
                lat: point.lat(),
                lng: point.lng(),
              }));
    
              if (mainRoute.length > 0) {
                const lineString = turf.lineString(mainRoute.map(({ lat, lng }: any) => [lng, lat]));
                const buffered = turf.buffer(lineString, routeRadius/1000, { units: "kilometers" });
    
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
                handleRouteData(mainRoute, route.id, buffered);
              }
    
              const iconStart = document.createElement("i");
              iconStart.className = "fi fi-sr-marker"; // className of the custom icon
              iconStart.style.fontSize = "40px"; // Set the size of the icon
              iconStart.style.color = "#8B5CF6"; // Set the color of the icon 8B5CF6

              const iconEnd = document.createElement("i");
              iconEnd.className = "fi fi-sr-marker"; // className of the custom icon
              iconEnd.style.fontSize = "40px"; // Set the size of the icon
              iconEnd.style.color = "#FF77E9"; // Set the color of the icon 8B5CF6

              // **Only add markers for rendered routes**
              const startMarker = new google.maps.marker.AdvancedMarkerElement({
                position: origin,
                map,
                title: "Start Point",
                content: iconStart,
              });
    
              const endMarker = new google.maps.marker.AdvancedMarkerElement({
                position: destination,
                map,
                title: "End Point",
                content: iconEnd,
              });
              
              newMarkers.push(startMarker, endMarker);
            });
          });
      });

      Promise.all(routePromises).then(() => {
        setDirectionsRenderers(newRenderers);
        setRouteBufferPolygons(newPolygons);
        setRouteMarkers(newMarkers);
      });
    }

  
    // **Step 3: Update State After All Routes Processed**

  
    return () => {
      newRenderers.forEach((renderer) => renderer.setMap(null));
      newPolygons.forEach((polygon) => polygon.setMap(null));
      newMarkers.forEach((marker) => marker.map = null );
    };
  }, [directionsService, allRoutes]);
  
  // console.log("Unique renderers:", directionsRenderers.length);

  return null;
}
