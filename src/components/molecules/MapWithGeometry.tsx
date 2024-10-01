import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import mapboxgl from "mapbox-gl";
// import { FaMapMarkerAlt } from "react-icons/fa";

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX ||
  "pk.eyJ1Ijoic2FjaGlucmFpbmEiLCJhIjoiY2x3N242M2thMDB0MDJsczR2eGF4dXJsZSJ9.ocBaZJ9rPSUhmS4zGRi7vQ";

export function MapWithGeometry(props: any) {
  const mapRef = useRef<any>(null);
  const [routeData, setRouteData] = useState<any>([]);
  const [markers, setMarkers] = useState<any>(null);
  const [unSelectedMarkers, setUnselectedMarkers] = useState<any>(null);
  const [screenData, setScreenData] = useState<any>(null);

  const [query, SetQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const coordinates =
    Object.keys(props?.data).length > 0
      ? props?.data?.["brand"]?.concat(props?.data?.["compt"])
      : [];
  const [viewState, setViewState] = useState<any>({
    longitude: props?.geometry?.coordinates[1] || 84.6702799,
    latitude: props?.geometry?.coordinates[0] || 25.5540252,
    zoom: props?.zoom || 5,
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
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const createGeoJSONCircle = (
    center: [number, number],
    radiusInKm: number,
    points: number = 64
  ): FeatureCollection<Geometry, GeoJsonProperties> => {
    const coords = {
      latitude: center[0],
      longitude: center[1],
    };

    const km = radiusInKm;

    const ret: GeoJSON.Position[] = [];
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

  const circlesData: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    // features: props?.coords.map((coord: any) => ({
    //   type: "Feature",
    //   geometry: createGeoJSONCircle(coord, 30).features[0].geometry,
    //   properties: {},
    // })),
    features: coordinates?.map((coord: any) => {
      // Example condition for coloring based on coordinate longitude
      let color = "red";
      if (props?.data?.["brand"].includes(coord)) {
        color = "blue";
      } else if (props?.data?.["compt"].includes(coord)) {
        color = "red";
      }

      return {
        type: "Feature",
        geometry: createGeoJSONCircle(coord, props?.circleRadius).features[0]
          .geometry,
        properties: { color: color },
      };
    }),
  };

  const getRoute = async (route: any) => {
    try {
      const start = route?.origin?.center || [-122.414, 37.776]; // Starting point
      const end = route?.destination?.center || [-122.14, 37.3]; // Ending point

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${
        start[0]
      },${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${
        process.env.REACT_APP_MAPBOX ||
        "pk.eyJ1Ijoic2FjaGlucmFpbmEiLCJhIjoiY2x3N242M2thMDB0MDJsczR2eGF4dXJsZSJ9.ocBaZJ9rPSUhmS4zGRi7vQ"
      }`;
      const response = await fetch(url);

      const data = await response.json();
      setRouteData((pre: any) => [data.routes[0].geometry, ...pre]);
      props?.handleRouteData(data.routes[0].geometry, route?.id);
    } catch (error) {
      console.log("error in  finding routes : ", error);
    }
  };
  // console.log("props?.screenMarkers : ", props?.screenMarkers);
  // console.log("props.unSelectedScreens : ", props.unSelectedScreens);

  const getSingleScreenData = async (
    e: any,
    screenId: any,
    pinData: any,
    isFromSelectedScreens: boolean
  ) => {
    let data;
    if (isFromSelectedScreens) {
      data = props?.screenMarkers?.find(
        (screen: any) => screen.screenId == screenId
      );
    } else {
      data = props.unSelectedScreens?.find(
        (screen: any) => screen.screenId == screenId
      );
    }
    setScreenData(data);
  };

  function randomColor(index: number) {
    const colors = ["#540b0e", "#e09f3e", "#073b4c", "#0f4c5c", "#ef476f"];
    return colors[index % 5];
  }

  const getScreens = useEffect(() => {
    setRouteData([]);
    props?.routes?.map((route: any) => {
      getRoute(route);
    });
  }, [props?.routes]);

  useEffect(() => {
    setMarkers(
      props?.screenMarkers?.map((m: any) => [
        m.longitude,
        m.latitude,
        m.screenId,
      ])
    );
    setUnselectedMarkers(
      props.unSelectedScreens?.map((m: any) => [
        m.longitude,
        m.latitude,
        m.screenId,
      ])
    );
  }, [props?.screenMarkers, props.unSelectedScreens]);

  useEffect(() => {
    if (markers?.length > 0) {
      const validMarkers = markers.filter(
        (marker: any) =>
          marker[1] !== undefined &&
          marker[0] !== undefined &&
          !isNaN(marker[1]) &&
          !isNaN(marker[0])
      );

      if (validMarkers?.length > 0) {
        const bounds = validMarkers.reduce((bounds: any, marker: any) => {
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
  }, [markers]);

  // console.log(markers);
  return (
    <div className="h-full w-full">
      <div className="flex w-full h-full border">
        <ReactMapGL
          ref={mapRef}
          initialViewState={viewState}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={
            process.env.REACT_APP_MAPBOX ||
            "pk.eyJ1Ijoic2FjaGlucmFpbmEiLCJhIjoiY2x3N242M2thMDB0MDJsczR2eGF4dXJsZSJ9.ocBaZJ9rPSUhmS4zGRi7vQ"
          }
          onMove={(e: any) => setViewState(e.viewState)}
        >
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

          {routeData?.length > 0 &&
            routeData.map((route: any, index: number) => (
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
                    "line-width": 12,
                  }}
                />
              </Source>
            ))}

          {markers &&
            markers.map((marker: any, i: any) => (
              <Marker
                key={i}
                latitude={marker[1]}
                longitude={marker[0]}
                onClick={(e: any) => {
                  getSingleScreenData(e, marker[2], marker, true);
                }}
              >
                <div title={`Selected screens ${props?.screenMarkers?.length}`}>
                  <i className="fi fi-rs-marker text-[#F94623] text-[16px]"></i>
                </div>
              </Marker>
            ))}
          {unSelectedMarkers &&
            unSelectedMarkers.map((marker: any, i: any) => (
              <Marker key={i} latitude={marker[1]} longitude={marker[0]}>
                <div
                  title={`UnSeleced screens ${props?.screenMarkers?.length}`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    getSingleScreenData(e, marker[2], marker, true);
                  }}
                >
                  <i 
                    className="fi fi-rs-marker text-[#1D62F6] text-[12px]"
                    onClick={(e) => {
                      getSingleScreenData(e, marker.screenId, marker, false);
                    }}
 
                  ></i>
                </div>
              </Marker>
            ))}

          {screenData && (
            <Popup
              latitude={screenData?.latitude}
              longitude={screenData?.longitude}
              // onClose={() => {
              //   setScreenData(null);
              // }}
              // anchor="left"
              // closeButton={false}
              // focusAfterOpen={true}
            >
              <div className="border boder-1 rounded-10 border- #2BB3E0 p-3 ">
                <div className="flex flex-row gap-2">
                  {/* <img src={screenData?.images[0]} alt="screen Image" /> */}
                  <div>
                    <h1 className="text-#000000">{screenData?.screenName}</h1>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
}
