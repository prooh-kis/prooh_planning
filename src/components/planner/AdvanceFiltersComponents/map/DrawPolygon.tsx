import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface DrawPolygonProps {
  polygons: any;
  setPolygons: any;
  allScreens: Screen[];
  setPolygonFilteredScreens: any;
  // handleFinalSelectedScreens?: any;
  drawingMode?: any;
}

export function DrawPolygon({ polygons, setPolygons, allScreens, setPolygonFilteredScreens }: DrawPolygonProps) {
  const map = useMap(); // ✅ Get map instance
  const [selectedPolygon, setSelectedPolygon] = useState<google.maps.Polygon | null>(null);
  // Function to check if a screen is inside a polygon
  const isScreenInsidePolygon = (screen: any, polygon: google.maps.Polygon) => {
    const screenLocation = new google.maps.LatLng(screen?.location?.geographicalLocation?.latitude, screen?.location?.geographicalLocation?.longitude);
    return google.maps.geometry.poly.containsLocation(screenLocation, polygon);
  };

  // Function to get all screens inside all polygons
  const getScreensInsidePolygons = (polygons: google.maps.Polygon[]) => {
    const screensInsidePolygons = allScreens.filter((screen) =>
      polygons?.some((polygon) => isScreenInsidePolygon(screen, polygon))
    );
    return screensInsidePolygons;
  };


  const attachPolygonListeners = (polygon: google.maps.Polygon) => {
    const path = polygon.getPath();

    const updatePolygons = () => {
      setPolygons((prevPolygons: any) =>
        prevPolygons.map((p: any) => (p === polygon ? polygon : p))
      );
      const screensInsidePolygons = getScreensInsidePolygons(polygons);
      // handleFinalSelectedScreens({ screens: screensInsidePolygons, type: "add" });
      setPolygonFilteredScreens(screensInsidePolygons);
    };

    google.maps.event.addListener(path, "set_at", updatePolygons); // When a vertex is moved
    google.maps.event.addListener(path, "insert_at", updatePolygons); // When a new vertex is added
    google.maps.event.addListener(path, "remove_at", updatePolygons); // When a vertex is deleted
  };

  // Effect to handle drawing and updating polygons
  useEffect(() => {
    if (!map || !window.google) return;

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      // drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        fillColor: "#00FF00",
        fillOpacity: 0.3,
        strokeColor: "#00AA00",
        strokeWeight: 2,
        editable: true,
      },
    });

    drawingManager.setMap(map);

    // Listen for polygon completion
    google.maps.event.addListener(drawingManager, "polygoncomplete", (polygon: google.maps.Polygon) => {
      // Add the new polygon to the polygons array
      setPolygons([...polygons, polygon]);
      attachPolygonListeners(polygon);

      // Click to select the polygon
      google.maps.event.addListener(polygon, "click", () => {
        polygons?.forEach((p: any) => p.setOptions({ strokeWeight: 2 })); // Reset all stroke weights
        polygon.setOptions({ strokeWeight: 5, strokeColor: "#FF0000" }); // Highlight selection
        setSelectedPolygon(polygon);
      });
    });


    if (!map || !window.google) return;
    polygons?.forEach((polygon: any) => {
      polygon.setMap(map);
      attachPolygonListeners(polygon);
    });
    // Clear existing polygons from the map
    polygons?.forEach((polygon: any) => polygon.setMap(null));

    // Re-render polygons
    polygons?.forEach((polygon: any) => {
      polygon.setMap(map);

      // Reattach click listeners for selection
      google.maps.event.addListener(polygon, "click", () => {
        polygons?.forEach((p: any) => p.setOptions({ strokeWeight: 2 })); // Reset all stroke weights
        polygon?.setOptions({ strokeWeight: 5, strokeColor: "#FF0000" }); // Highlight selection
        setSelectedPolygon(polygon);
      });
    });

    // Cleanup drawing manager
    return () => {
      drawingManager.setMap(null);
    };
  }, [map, polygons, setPolygons]);

  // Effect to update polygon screens when polygons change
  useEffect(() => {
    if (!window.google || !window.google.maps.geometry) return;
    const screensInsidePolygons = getScreensInsidePolygons(polygons);
    setPolygonFilteredScreens((prev: any) => {
      if (prev.map((screen: any) => screen.id) === screensInsidePolygons.map((sc: any) => sc._id)) {
        return prev;
      }
      // handleFinalSelectedScreens({ screens: screensInsidePolygons, type: "add" });
      return screensInsidePolygons;
    });
  }, [polygons, allScreens, setPolygonFilteredScreens]);


  const handleDeleteSelected = () => {
    if (!selectedPolygon) return;
    // Remove from map
    selectedPolygon.setMap(null);
    
    // Update polygons state by filtering out the selected polygon
    const updatedPolygons = polygons.filter((p: any) => p !== selectedPolygon);
    setPolygons(updatedPolygons);
    
    // Get screens inside the deleted polygon and remove them from final selection
    const screensToRemove = getScreensInsidePolygons([selectedPolygon]);
    setPolygonFilteredScreens((prev: any) => {
      return prev.filter((screen: any) => !screensToRemove.map((sc: any) => sc._id).includes(screen._id));
    });
    // handleFinalSelectedScreens({ 
    //   screens: screensToRemove, 
    //   type: "remove" 
    // });
  
    // Clear the selected polygon
    setSelectedPolygon(null);
  };

  return (
    <>
      {/* Delete Button near the Google Maps Controls */}
      <div className="absolute top-1 left-4 transform -translate-x-1/2 z-10">
        <button
          id="delete"
          type="button"
          title="delete"
          onClick={handleDeleteSelected}
          className={`p-1 rounded-md shadow-md transition ${selectedPolygon ? "bg-gray-100 text-white hover:bg-white" : "bg-white cursor-not-allowed"
            }`}
          disabled={!selectedPolygon}
        >
          <i className="fi fi-ss-trash text-gray-700 flex items-center justify-center"></i>
        </button>
      </div>
    </>
  );
}