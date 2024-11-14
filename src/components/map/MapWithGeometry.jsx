import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMapGL, { Source, Layer, Marker, Popup, useControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { MapboxScreen } from "../popup";
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

mapboxgl.accessToken =
  // process.env.REACT_APP_MAPBOX ||
  "pk.eyJ1IjoidnZpaWNja2t5eTU1IiwiYSI6ImNsMzJwODk5ajBvNnMzaW1wcnR0cnpkYTAifQ.qIKhSIKdM9EDKULRBahZ-A";


  
export function MapWithGeometry(props) {
  const mapRef = useRef(null);
  const [routeData, setRouteData] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState(null);
  const [unSelectedMarkers, setUnselectedMarkers] = useState(null);
  const [screenData, setScreenData] = useState(null);
  const [isSelectedData, setIsSelectedData] = useState(false);

  const [userLocation, setUserLocation] = useState(null);

  
  // console.log(props?.data["brand"][0]?.concat(props?.data["comp"][0]))
  const coordinates =
    Object.keys(props?.data).length > 0
      ? props?.data["brand"][0].concat(props?.data["comp"][0])
      : [];

  const [viewState, setViewState] = useState({
    longitude: props?.geometry?.coordinates[1] || 77.0891,
    latitude: props?.geometry?.coordinates[0] || 28.495,
    zoom: props?.zoom || 5,
  });



function MapDrawControl({
  onCreate = () => {},
  onUpdate = () => {},
  onDelete = () => {},
  position,
}) {
  useControl(
    () => new MapboxDraw({
      displayControlsDefault: false, // Hide default controls
      controls: {
        polygon: true, // Enable polygon drawing
        trash: true, // Enable delete control
        direct_select: true, // Allow direct selection of drawn features
      },
      defaultMode: "draw_polygon", // Set default mode to polygon drawing
    }),
    ({ map }) => {
      map.on("draw.create", onCreate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position,
    }
  );

  return null;
}

  const updateSelectedMarkers = (polygons) => {
    const selected = props?.allScreens.filter((screen) => {
      const point = [
        screen?.location.geographicalLocation?.longitude,
        screen?.location?.geographicalLocation?.latitude,
      ];
      // Check if the point is inside any of the polygons
      return polygons.some((polygon) => booleanPointInPolygon(point, polygon));
    });
    props?.onPolygonComplete(selected);
    setSelectedMarkers(selected?.map((m) => [
        m.location.geographicalLocation.longitude,
        m.location.geographicalLocation.latitude,
        m._id,
      ]));

    setUnselectedMarkers(
      props.allScreens
        ?.filter(
          (s) =>
            !selected?.map((f) => f._id).includes(s._id)
        )
        ?.map((m) => [
          m.location.geographicalLocation.longitude,
          m.location.geographicalLocation.latitude,
          m._id,
        ])
    );
  };

  const onCreatePolygon = useCallback((e) => {
    const newPolygon = e.features[0];
    console.log(newPolygon);

    props?.setPolygons((prevPolygons) => {
      const updatedPolygons = [...prevPolygons, newPolygon];
      updateSelectedMarkers(updatedPolygons); // Update markers with all polygons
      return updatedPolygons;
    });
  }, [props]);

  const onUpdatePolygon = useCallback((e) => {
    const updatedPolygon = e.features[0];
    props?.setPolygons((prevPolygons) =>
      prevPolygons.map((polygon) =>
        polygon.id === updatedPolygon.id ? updatedPolygon : polygon
      )
    );
    updateSelectedMarkers(props.polygons);
  }, [props]);

  const onDeletePolygon = useCallback((e) => {
    const deletedPolygonIds = e.features.map((feature) => feature.id);
    console.log(deletedPolygonIds);
    props?.setPolygons((prevPolygons) =>
      prevPolygons.filter((polygon) => !deletedPolygonIds.includes(polygon.id))
    );
    updateSelectedMarkers();

  }, [props]);


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
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const findCoordinates = (arrays, target) => {
    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < arrays[i].length; j++) {
        for (let k = 0; k < arrays[i][j].length; k++) {
          if (arrays[i][j][k] === target[k] && arrays[i][j][k] === target[k]) {
            // console.log(`Coordinates [${target}] belong to array at index [${i}][${j}][${k}]`)
            return true;
          }
        }
      }
    }
    // console.log(`Coordinates [${target}] not found in any array.`)
    return false;
  };

  const createGeoJSONCircle = (
    center,
    radiusInKm,
    points = 64
  ) => {
    const coords = {
      latitude: center[1],
      longitude: center[0],
    };

    const km = radiusInKm;
    // const km = 10;

    const ret = [];
    const distanceX =
      km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    for (let i = 0; i < points; i++) {
      const theta = (i / points) * (2 * Math.PI);
      const x = distanceX * Math.cos(theta);
      const y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [ret],
          },
          properties: {},
        },
      ],
    };
  };

  const circlesData = {
    type: "FeatureCollection",
    // features: props?.coords.map((coord) => ({
    //   type: "Feature",
    //   geometry: createGeoJSONCircle(coord, 30).features[0].geometry,
    //   properties: {},
    // })),
    features: coordinates?.map((coord) => {
      // Example condition for coloring based on coordinate longitude
      let color = "red";
      if (findCoordinates(props?.data["brand"], coord)) {
        color = "green";
      } else if (findCoordinates(props?.data["comp"], coord)) {
        color = "orange";
      }

      return {
        type: "Feature",
        geometry: createGeoJSONCircle(coord, props?.circleRadius).features[0]
          .geometry,
        properties: { color: color },
      };
    }),
  };

  const getRoute = async (route) => {
    try {
      const start = route?.origin?.center || [-122.414, 37.776]; // Starting point
      const end = route?.destination?.center || [-122.14, 37.3]; // Ending point

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${
        start[0]
      },${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${
        // process.env.REACT_APP_MAPBOX ||
        "pk.eyJ1IjoidnZpaWNja2t5eTU1IiwiYSI6ImNsMzJwODk5ajBvNnMzaW1wcnR0cnpkYTAifQ.qIKhSIKdM9EDKULRBahZ-A"
      }`;
      const response = await fetch(url);

      const data = await response.json();

      setRouteData((pre) => [data.routes[0].geometry, ...pre]);
      props?.handleRouteData(data.routes[0].geometry, route?.id);
    } catch (error) {
      console.log("error in  finding routes : ", error);
    }
  };
  // console.log("props?.filteredScreens : ", props?.filteredScreens);
  // console.log("props.unSelectedScreens : ", props.unSelectedScreens);

  const getSingleScreenData = async (screenId) => {
    let data;
    data = props?.allScreens?.find((screen) => screen._id == screenId);

    setScreenData(data);
  };

  function randomColor(index) {
    const colors = ["#540b0e", "#e09f3e", "#073b4c", "#0f4c5c", "#ef476f"];
    return colors[index % 5];
  }

  useEffect(() => {
    setRouteData([]);
    props?.routes?.map((route) => {
      getRoute(route);
    });
  }, [props?.routes]);

  useEffect(() => {
    setSelectedMarkers(
      props?.filteredScreens?.map((m) => [
        m.location.geographicalLocation.longitude,
        m.location.geographicalLocation.latitude,
        m._id,
      ])
    );

    setUnselectedMarkers(
      props.allScreens
        ?.filter(
          (s) =>
            !props?.filteredScreens?.map((f) => f._id).includes(s._id)
        )
        ?.map((m) => [
          m.location.geographicalLocation.longitude,
          m.location.geographicalLocation.latitude,
          m._id,
        ])
    );
  }, [props]);

  useEffect(() => {
    if (selectedMarkers?.length > 0) {
      const validMarkers = selectedMarkers.filter(
        (marker) =>
          marker[1] !== undefined &&
          marker[0] !== undefined &&
          !isNaN(marker[1]) &&
          !isNaN(marker[0])
      );

      if (validMarkers?.length > 0) {
        const bounds = validMarkers.reduce((bounds, marker) => {
          return bounds.extend(marker);
        }, new mapboxgl.LngLatBounds(validMarkers[0], validMarkers[0]));

        if (mapRef?.current) {
          mapRef?.current?.fitBounds(bounds, {
            padding: 120,
          });
        } else {
          console.error("Map reference is null.");
        }
      } else {
        console.error("No valid markers to display.");
      }
    }
  }, [selectedMarkers]);

  return (
    <div className="h-full w-full items-top">
      <div className="flex flex-col items-end gap-2 right-12 pt-2 absolute z-10">
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] group-hover:opacity-100 opacity-0 transition-opacity duration-300">Brand Store</h1>
          <div className="h-4 w-4 bg-green-700 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 group">
          <h1 className="text-[10px] group-hover:opacity-100 opacity-0 transition-opacity duration-300">Competitor Store</h1>
          <div className="h-4 w-4 bg-orange-300 rounded-full"></div>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center ">
        <ReactMapGL
          ref={mapRef}
          initialViewState={viewState}
          style={{ borderRadius: "10px" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={
            process.env.REACT_APP_MAPBOX ||
            "pk.eyJ1Ijoic2FjaGlucmFpbmEiLCJhIjoiY2x3N242M2thMDB0MDJsczR2eGF4dXJsZSJ9.ocBaZJ9rPSUhmS4zGRi7vQ"
          }
          onMove={(e) => setViewState(e.viewState)}
        >
          {/* {selectedMarkers && ( */}
            <MapDrawControl
              position="top-left"
              onCreate={onCreatePolygon}
              onUpdate={onUpdatePolygon}
              onDelete={onDeletePolygon}
            />
          {/* )} */}

          {selectedMarkers && selectedMarkers.length > 0 && selectedMarkers.map((marker, i) => (
            <Marker key={i} latitude={marker[1]} longitude={marker[0]}>
              <div title={`Selected screens ${props?.filteredScreens?.length}`} className="cursor-pointer">
                <i className="fi fi-ss-circle text-primaryButton text-[14px]" onClick={(e) => {
                  e.stopPropagation();
                  setIsSelectedData(true);
                  getSingleScreenData(marker[2]);
                }}></i>
              </div>
            </Marker>
          ))}
          {unSelectedMarkers?.length !== selectedMarkers?.length &&
            unSelectedMarkers &&
            unSelectedMarkers.map((marker, i) => (
              <Marker key={i} latitude={marker[1]} longitude={marker[0]}>
                <div
                  title={`UnSeletced screens ${
                    props.allScreens?.filter((s) =>
                      props?.filteredScreens
                        ?.map((f) => f._id)
                        .includes(s._id)
                    )?.length
                  }`}
                  className="cursor-pointer"
                >
                  <i
                    // [#F94623]
                    className="fi-ss-circle text-[#F94623] text-[12px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSelectedData(false);
                      getSingleScreenData(marker[2]);
                    }}
                  ></i>
                </div>
              </Marker>
            ))}

          {screenData && (
            <Popup
              key={screenData._id}
              latitude={screenData?.location?.geographicalLocation?.latitude}
              longitude={screenData?.location?.geographicalLocation?.longitude}
              onClose={() => {
                setScreenData(null);
              }}
              anchor="left"
            >
              <MapboxScreen
                handleAddManualSelection={props?.handleAddManualSelection}
                screenData={screenData}
                handleSelectFromMap={props.handleSelectFromMap}
                isSelectedData={isSelectedData}
              />
            </Popup>
          
          )}

          {routeData?.length > 0 &&
            routeData.map((route, index) => (
              <Source
                key={index}
                id={`${index}`}
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: route.coordinates,
                  },
                }}
              >
                <Layer
                  id={`layer-${index}`}
                  type="line"
                  paint={{
                    "line-color": `${randomColor(index)}`,
                    "line-width": 4,
                  }}
                />
              </Source>
            ))}
          
          <Source id="circle-data" type="geojson" data={circlesData}>
            <Layer
              id="circle-layer"
              type="fill"
              paint={{
                // "fill-color": "red",
                "fill-color": ["get", "color"],
                "fill-opacity": 0.5,
              }}
            />
          </Source>

          <Source id="polygon-data" type="geojson" data={{
              type: "FeatureCollection",
              features: props?.polygons
          }}>
            <Layer
              id="polygon-layer"
              type="fill"
              paint={{
                "fill-color": "#088",
                "fill-opacity": 0.2,
              }}
            />
          </Source>
        </ReactMapGL>
      </div>
    </div>
  );
}
