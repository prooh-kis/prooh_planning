import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";


export function Directions({ routeDataCache, setRouteDataCache, allRoutes, setAllRoutes, allScreens, routeRadius, setRouteFilteredScreens }: any) {

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const mapElementsRef = useRef({
    renderers: [] as google.maps.DirectionsRenderer[],
    polygons: [] as google.maps.Polygon[],
    markers: [] as google.maps.marker.AdvancedMarkerElement[]
  });

  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderers, setDirectionsRenderers] = useState<google.maps.DirectionsRenderer[]>([]);
  const [routeMarkers, setRouteMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [routeBufferPolygons, setRouteBufferPolygons] = useState<google.maps.Polygon[]>([]);

  useEffect(() => {
    if (!routesLibrary || !map) return;

    if (!routesLibrary.DirectionsService || !routesLibrary.DirectionsRenderer) {
      console.error("Google Maps Routes library not fully loaded yet.");
      return;
    }

    setDirectionsService(new routesLibrary.DirectionsService());
  }, [routesLibrary, map]);

  // Function to clear all map elements
  const clearMapElements = useCallback(() => {

    mapElementsRef.current.renderers.forEach(r => r.setMap(null));
    mapElementsRef.current.polygons.forEach(p => p.setMap(null));
    mapElementsRef.current.markers.forEach(m => m.map = null);
    mapElementsRef.current = { renderers: [], polygons: [], markers: [] };

    directionsRenderers.forEach(renderer => {
      if (renderer) renderer.setMap(null);
    });
    routeBufferPolygons.forEach(polygon => {
      if (polygon) polygon.setMap(null);
    });
    routeMarkers.forEach(marker => {
      if (marker) marker.map = null;
    });
    
    setDirectionsRenderers([]);
    setRouteBufferPolygons([]);
    setRouteMarkers([]);
  }, [directionsRenderers, routeBufferPolygons, routeMarkers]);

  useEffect(() => {
    if (!directionsService || !map || !routesLibrary) return;

    // Store references to the current renderers and polygons for cleanup
    const currentRenderers = [...directionsRenderers];
    const currentPolygons = [...routeBufferPolygons];
    const currentMarkers = [...routeMarkers];
    
    // Clear all existing map elements
    clearMapElements();
    
    // Handle case when allRoutes is empty (remove everything)
    if (allRoutes?.length === 0) {
      return;
    }
  
    const getColorForRoute = (id: string | number) => {
      const colors = ["#006064", "#795548", "#37474F", "#9E9D24", "#D84315"];
      return colors[Math.abs((typeof id === "string" ? id?.length : id) % colors?.length)];
    };

    const newRenderers: google.maps.DirectionsRenderer[] = [];
    const newPolygons: google.maps.Polygon[] = [];
    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
    const renderedRouteIds = new Set<string>();
    let cachedRoute = routeDataCache;

    if (directionsService) {
      const routePromises = allRoutes?.map(async (route: any) => {
        const origin = new google.maps.LatLng(route?.origin?.center?.[1], route?.origin?.center?.[0]);
        const destination = new google.maps.LatLng(route?.destination?.center?.[1], route?.destination?.center?.[0]);
    
        newRenderers.forEach((renderer) => renderer.setMap(null));
        newPolygons.forEach((polygon) => polygon.setMap(null));
        newMarkers.forEach((marker) => marker.map = null);
        return directionsService
          .route({
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            drivingOptions: {
              departureTime: new Date(0),  // This disables traffic-based routing
              trafficModel: "pessimistic" as google.maps.TrafficModel,
            }
          })
          .then((response) => {
            response.routes.forEach((r, index) => {
              const routeId = `${route.id}-${index}`;
 
              if (renderedRouteIds.has(routeId)) return;
              renderedRouteIds.add(routeId);

              currentRenderers.forEach((renderer) => renderer.setMap(null));
    
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
              mapElementsRef.current.renderers.push(renderer);
    
              // **Draw Buffer Around Route**
              const mainRoute = r.overview_path.map((point: any) => ({
                lat: point.lat(),
                lng: point.lng(),
              }));
              if (mainRoute?.length > 0) {
                // Clear any existing buffer polygons first
                routeBufferPolygons.forEach(polygon => {
                  if (polygon) polygon.setMap(null);
                });
                
                const lineString = turf.lineString(mainRoute?.map(({ lat, lng }: any) => [lng, lat]));
                const buffered: any = turf.buffer(lineString, routeRadius/1000, { units: "kilometers" });
                let filteredScreenRecords: any[] = [];

                if (buffered?.geometry?.coordinates) {
                  const bufferPolygonCoords = buffered.geometry.coordinates[0]?.map(
                    ([lng, lat]: any) => ({ lat, lng })
                  );
    
                  if (bufferPolygonCoords?.length > 0) {
                    const bufferColor = `#${getColorForRoute(route.id)?.split("#")?.join("30")}`;
    
                    currentPolygons.forEach((polygon) => polygon.setMap(null));
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
                    mapElementsRef.current.polygons.push(newPolygon);

                    // get number of screens in current route buffer
                    filteredScreenRecords = allScreens?.filter((point: any) => {
                      const screenPoint = turf.point([
                        point.location.geographicalLocation.longitude,
                        point.location.geographicalLocation.latitude,
                      ]);
                      return turf.booleanPointInPolygon(screenPoint, buffered);
                    });
                    const oldScreens = allRoutes?.find((route: any) => Number(route.id) === Number(route.id))?.selectedScreens;
                    const screensToRemove = oldScreens?.filter((screen: any) => !filteredScreenRecords?.map((s: any) => s._id).includes(screen._id));

                    setAllRoutes((prev: any) => {
                      for (let oldRoute of prev) {
                        if (Number(oldRoute.id) === Number(route.id)){
                          const updatedScreens = oldRoute.selectedScreens.filter((scr: any) => !screensToRemove?.map((s: any) => s._id).includes(scr._id));
                          const oldRouteScreenIds = updatedScreens?.map((sn: any) => sn._id);
                          const newScreens = filteredScreenRecords?.filter((screen: any) => !oldRouteScreenIds?.includes(screen._id));
                          oldRoute.selectedScreens = [...updatedScreens, ...newScreens];
                        }
                      }
                      return prev;
                    });

                    setRouteFilteredScreens((prev: any) => {
                      const updatedScreens = prev.filter((scr: any) => !screensToRemove?.map((s: any) => s._id).includes(scr._id));
                      
                      const routeFilteredScreensIds = updatedScreens?.map((sn: any) => sn._id);
                      const newScreens = filteredScreenRecords?.filter((screen: any) => !routeFilteredScreensIds?.includes(screen._id));
                      return [...updatedScreens, ...newScreens];
                    })

                    
                  }
                }
                cachedRoute = {...cachedRoute, [routeId]: {route, screens: filteredScreenRecords}};
              }

              const iconStart = document.createElement("i");
              iconStart.className = "fi fi-sr-marker"; // className of the custom icon
              iconStart.style.fontSize = "40px"; // Set the size of the icon
              iconStart.style.color = "#8B5CF6"; // Set the color of the icon 8B5CF6

              const iconEnd = document.createElement("i");
              iconEnd.className = "fi fi-sr-marker"; // className of the custom icon
              iconEnd.style.fontSize = "40px"; // Set the size of the icon
              iconEnd.style.color = "#FF77E9"; // Set the color of the icon 8B5CF6

              currentMarkers.forEach((marker) => marker.map = null );

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
              mapElementsRef.current.markers.push(startMarker, endMarker);
              setRouteDataCache(cachedRoute);
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

      // Clean up any new renderers and polygons created in this effect
      newRenderers.forEach((renderer) => renderer.setMap(null));
      newPolygons.forEach((polygon) => polygon.setMap(null));
      newMarkers.forEach((marker) => marker.map = null );

      // Also clean up any remaining old renderers and polygons
      currentRenderers.forEach(renderer => {
        if (renderer) renderer.setMap(null);
      });
      currentPolygons.forEach(polygon => {
        if (polygon) polygon.setMap(null);
      });
      currentMarkers.forEach(marker => {
        if (marker) marker.map = null;
      });

    };
  }, [
    directionsService,
    allRoutes,
    routeRadius,
    map,
    routesLibrary,
    // directionsRenderers,
    // routeBufferPolygons,
    // routeMarkers,
    // clearMapElements,
    allScreens,
  ]);

  return null;
}