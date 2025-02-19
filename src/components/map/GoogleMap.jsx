import { useEffect, useRef, useState, useCallback } from "react";
import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export function GoogleMapWithGeometry(props) {
  const mapRef = useRef(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [unSelectedMarkers, setUnselectedMarkers] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [viewState, setViewState] = useState({
    center: {
      lat: props?.geometry?.coordinates[0] || 28.495,
      lng: props?.geometry?.coordinates[1] || 77.0891,
    },
    zoom: props?.zoom || 5,
  });

  const coordinates =
    Object.keys(props?.data).length > 0
      ? props?.data["brand"][0].concat(props?.data["comp"][0])
      : [];

  useEffect(() => {
    if (!mapRef.current) return;
    console.log("Google Map has been loaded");
  }, []);

  const updateSelectedMarkers = useCallback(
    (polygons) => {
      const updatedPolygons = polygons.map((polygon) => {
        const selectedScreens = props?.allScreens.filter((screen) => {
          const point = {
            lat: screen?.location.geographicalLocation?.latitude,
            lng: screen?.location.geographicalLocation?.longitude,
          };
          return google.maps.geometry.poly.containsLocation(point, polygon);
        });
        return { ...polygon, screens: selectedScreens };
      });

      props?.setPolygons(updatedPolygons);
      const allSelectedScreens = updatedPolygons.flatMap((polygon) => polygon.screens || []);
      props?.onPolygonComplete(allSelectedScreens);
      setSelectedMarkers(
        allSelectedScreens.map((screen) => ({
          lat: screen.location.geographicalLocation.latitude,
          lng: screen.location.geographicalLocation.longitude,
          id: screen._id,
        }))
      );
      setUnselectedMarkers(
        props.allScreens
          ?.filter((screen) => !allSelectedScreens.map((s) => s._id).includes(screen._id))
          ?.map((screen) => ({
            lat: screen.location.geographicalLocation.latitude,
            lng: screen.location.geographicalLocation.longitude,
            id: screen._id,
          }))
      );
      return updatedPolygons;
    },
    [props]
  );

  const onPolygonComplete = useCallback(
    (polygon) => {
      if (polygons.length < 3) {
        setPolygons((prevPolygons) => updateSelectedMarkers([...prevPolygons, polygon]));
      } else {
        alert("You can only create 3 polygons for selection...");
      }
    },
    [updateSelectedMarkers, polygons]
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyAtq5k13iEUZWrdT4wrwWmxRWh4Cw8t_i8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={viewState.center}
        zoom={viewState.zoom}
        onLoad={(map) => (mapRef.current = map)}
      >
        {selectedMarkers.map((marker) => (
          <Marker key={marker.id} position={marker} icon={{ fillColor: "blue" }} />
        ))}
        {unSelectedMarkers.map((marker) => (
          <Marker key={marker.id} position={marker} icon={{ fillColor: "red" }} />
        ))}
        {polygons.map((polygon, index) => (
          <Polygon key={index} paths={polygon} editable onEdit={() => updateSelectedMarkers(polygons)} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
