import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import mapboxgl from "mapbox-gl";
import { MapboxScreen } from "../../components/popup";
// import { FaMapMarkerAlt } from "react-icons/fa";

mapboxgl.accessToken =
  // process.env.REACT_APP_MAPBOX ||
  "pk.eyJ1IjoidnZpaWNja2t5eTU1IiwiYSI6ImNsMzJwODk5ajBvNnMzaW1wcnR0cnpkYTAifQ.qIKhSIKdM9EDKULRBahZ-A";
export function MapWithGeometry(props: any) {
  // console.log(props)
  const mapRef = useRef<any>(null);
  const [routeData, setRouteData] = useState<any>([]);
  const [selectedMarkers, setSelectedMarkers] = useState<any>(null);
  const [unSelectedMarkers, setUnselectedMarkers] = useState<any>(null);
  const [screenData, setScreenData] = useState<any>(null);
  const [isSelectedData, setIsSelectedData] = useState<boolean>(false);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // console.log(props?.data["brand"][0]?.concat(props?.data["comp"][0]))
  const coordinates =
    Object.keys(props?.data).length > 0
      ? props?.data["brand"][0].concat(props?.data["comp"][0])
      : [];

  const [viewState, setViewState] = useState<any>({
    longitude: props?.geometry?.coordinates[1] || 77.0891,
    latitude: props?.geometry?.coordinates[0] || 28.495,
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

  const findCoordinates = (arrays: any, target: any) => {
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
    center: [number, number],
    radiusInKm: number,
    points: number = 64
  ): FeatureCollection<Geometry, GeoJsonProperties> => {
    const coords = {
      latitude: center[1],
      longitude: center[0],
    };

    const km = radiusInKm;
    // const km = 10;

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
      if (findCoordinates(props?.data["brand"], coord)) {
        color = "green";
      } else if (findCoordinates(props?.data["comp"], coord)) {
        color = "brown";
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
        // process.env.REACT_APP_MAPBOX ||
        "pk.eyJ1IjoidnZpaWNja2t5eTU1IiwiYSI6ImNsMzJwODk5ajBvNnMzaW1wcnR0cnpkYTAifQ.qIKhSIKdM9EDKULRBahZ-A"
      }`;
      const response = await fetch(url);

      const data = await response.json();

      setRouteData((pre: any) => [data.routes[0].geometry, ...pre]);
      props?.handleRouteData(data.routes[0].geometry, route?.id);
    } catch (error) {
      console.log("error in  finding routes : ", error);
    }
  };
  // console.log("props?.filteredScreens : ", props?.filteredScreens);
  // console.log("props.unSelectedScreens : ", props.unSelectedScreens);

  const getSingleScreenData = async (screenId: any) => {
    let data;
    data = props?.allScreens?.find((screen: any) => screen._id == screenId);

    setScreenData(data);
  };

  function randomColor(index: number) {
    const colors = ["#540b0e", "#e09f3e", "#073b4c", "#0f4c5c", "#ef476f"];
    return colors[index % 5];
  }

  useEffect(() => {
    setRouteData([]);
    props?.routes?.map((route: any) => {
      getRoute(route);
    });
  }, [props?.routes]);

  useEffect(() => {
    setSelectedMarkers(
      props?.filteredScreens?.map((m: any) => [
        m.location.geographicalLocation.longitude,
        m.location.geographicalLocation.latitude,
        m._id,
      ])
    );

    setUnselectedMarkers(
      props.allScreens
        ?.filter(
          (s: any) =>
            !props?.filteredScreens?.map((f: any) => f._id).includes(s._id)
        )
        ?.map((m: any) => [
          m.location.geographicalLocation.longitude,
          m.location.geographicalLocation.latitude,
          m._id,
        ])
    );
  }, [props?.filteredScreens]);

  useEffect(() => {
    if (selectedMarkers?.length > 0) {
      const validMarkers = selectedMarkers.filter(
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
  }, [selectedMarkers]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactMapGL
        ref={mapRef}
        initialViewState={viewState}
        style={{ borderRadius: "10px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={
          process.env.REACT_APP_MAPBOX ||
          "pk.eyJ1Ijoic2FjaGlucmFpbmEiLCJhIjoiY2x3N242M2thMDB0MDJsczR2eGF4dXJsZSJ9.ocBaZJ9rPSUhmS4zGRi7vQ"
        }
        onMove={(e: any) => setViewState(e.viewState)}
      >
        {selectedMarkers &&
          selectedMarkers.map((marker: any, i: any) => (
            <Marker key={i} latitude={marker[1]} longitude={marker[0]}>
              <div
                title={`Selected screens ${props?.filteredScreens?.length}`}
                className="cursor-pointer"
              >
                <i
                  className="fi fi-ss-circle text-primaryButton text-[14px]"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setIsSelectedData(true);
                    getSingleScreenData(marker[2]);
                  }}
                ></i>
              </div>
            </Marker>
          ))}
        {unSelectedMarkers?.length !== selectedMarkers?.length &&
          unSelectedMarkers &&
          unSelectedMarkers.map((marker: any, i: any) => (
            <Marker key={i} latitude={marker[1]} longitude={marker[0]}>
              <div
                title={`UnSeletced screens ${
                  props.allScreens?.filter((s: any) =>
                    props?.filteredScreens
                      ?.map((f: any) => f._id)
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
              screenData={screenData}
              setSelectedScreensFromMap={props.setSelectedScreensFromMap}
              isSelectedData = {isSelectedData}
            />
          </Popup>
        )}
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
                  "line-width": 4,
                }}
              />
            </Source>
          ))}
      </ReactMapGL>
    </div>
  );
}
