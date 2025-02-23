import { useEffect, useRef, useState, useCallback } from "react";
import {APIProvider, Map, useMapsLibrary, AdvancedMarker, Marker, InfoWindow, useMap} from "@vis.gl/react-google-maps";
import { CustomAdvancedMarker } from "./CustomMarker";
import { Circle } from "./MapCircle";
import { Directions } from "./Direction";

const MapTypeId = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain'
};

export type MapConfig = {
  id: string;
  label: string;
  mapId?: string;
  mapTypeId?: string;
  styles?: google.maps.MapTypeStyle[];
};

const MAP_CONFIGS: MapConfig[] = [
  {
    id: 'light',
    label: 'Light',
    mapId: '4f1f238ed9607822',
    mapTypeId: MapTypeId.ROADMAP
  },
  // {
  //   id: 'styled2',
  //   label: 'Raster / "Vitamin C" (no mapId)',
  //   mapTypeId: MapTypeId.ROADMAP,
  //   styles: vitaminCStyles
  // },
];

export function GoogleMapWithGeometry(props: any) {
  const mapRef = useRef(null);

  const [mapConfig, setMapConfig] = useState<MapConfig>(MAP_CONFIGS[0]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [unSelectedMarkers, setUnselectedMarkers] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [screenData, setScreenData] = useState<any>(null);
  const [mapRoutes, setMapRoutes] = useState<any>([]);
  const [isSelectedData, setIsSelectedData] = useState(false);
  const brandCoor = props?.data?.["brand"]?.[0]?.map((c: any) => {
    return {
      lat: c[1],
      lng: c[0],
    }
  });

  const compCoor = props?.data?.["comp"]?.[0]?.map((c: any) => {
    return {
      lat: c[1],
      lng: c[0],
    }
  });

  const [viewState, setViewState] = useState({
    center: {
      lat: props?.geometry?.coordinates[0] || 28.495,
      lng: props?.geometry?.coordinates[1] || 77.0891,
    },
    zoom: props?.zoom || 10,
  });

  const getSingleScreenData = async (screenId: any) => {
    let data;
    data = props?.allScreens?.find((screen: any) => screen._id == screenId);

    setScreenData(data);
  };

  const updateSelectedMarkers = useCallback(
    (newPolygons: any) => {
      if (!mapRef.current) return [];

      const updatedPolygons = newPolygons?.map((polygon: any) => {
        const selectedScreens = props?.allScreens.filter((screen: any) => {
          const point = {
            images: screen.images,
            lat: screen?.location.geographicalLocation?.latitude,
            lng: screen?.location.geographicalLocation?.longitude,
            id: screen._id,
            details: screen.screenName
          };

          return google.maps.geometry.poly.containsLocation(point, new google.maps.Polygon({ paths: polygon.paths }));
        });

        return { ...polygon, screens: selectedScreens };
      });

      props?.setPolygons(updatedPolygons);

      const allSelectedScreens = updatedPolygons.flatMap((polygon: any) => polygon.screens || []);
      props?.onPolygonComplete(allSelectedScreens);

      setSelectedMarkers(
        allSelectedScreens?.map((screen: any) => ({
          images: screen.images,
          lat: screen.location.geographicalLocation.latitude,
          lng: screen.location.geographicalLocation.longitude,
          id: screen._id,
          details: screen.screenName
        }))
      );

      setUnselectedMarkers(
        props.allScreens
          ?.filter((screen: any) => !allSelectedScreens?.map((s: any) => s._id).includes(screen._id))
          ?.map((screen: any) => ({
            images: screen.images,
            lat: screen.location.geographicalLocation.latitude,
            lng: screen.location.geographicalLocation.longitude,
            id: screen._id,
            details: screen.screenName
          }))
      );

      return updatedPolygons;
    },
    [props]
  );

  const onPolygonComplete = useCallback(
    (polygon: any) => {
      if (polygons?.length < 3) {
        const paths = polygon?.getPath()?.getArray()?.map((latLng: any) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));

        setPolygons((prevPolygons) => updateSelectedMarkers([...prevPolygons, { paths }]));
      } else {
        alert("You can only create 3 polygons for selection.");
      }
    },
    [updateSelectedMarkers, polygons]
  );

  useEffect(() => {
    setMapRoutes(props?.routes)
    setSelectedMarkers(
      props?.filteredScreens?.map((m: any) => ({
        images: m.images,
        lng: m.location.geographicalLocation.longitude,
        lat: m.location.geographicalLocation.latitude,
        id: m._id,
        details: m.screenName
      }))
    );

    setUnselectedMarkers(
      props.allScreens
        ?.filter(
          (s: any) => !props?.filteredScreens?.map((f: any) => f._id).includes(s._id)
        )
        ?.map((m: any) => ({
          images: m.images,
          lng: m.location.geographicalLocation.longitude,
          lat: m.location.geographicalLocation.latitude,
          id: m._id,
          details: m.screenName
        }))
    );
  }, [props]);

  useEffect(() => {
    setMapRoutes(props?.routes);
  }, [props?.routes]);

  return (
    <div className="h-full w-full">
      <Map
        // mapContainerStyle={containerStyle}
        defaultCenter={viewState.center}
        defaultZoom={viewState.zoom}
        // onLoad={(map: any) => (mapRef.current = map)}
        mapId="4f1f238ed9607822"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* circle */}
        {brandCoor?.map((coor: any, i: any) => (
          <Circle
            key={i}
            radius={props?.circleRadius}
            center={coor}
            onRadiusChanged={props?.setCircleRadius}
            strokeColor={'#8B5CF6'}
            strokeOpacity={1}
            strokeWeight={3}
            fillColor={'#8B5CF650'}
            fillOpacity={0.3}
            // editable
            // draggable
          />
        ))}
        {compCoor?.map((coor: any, i: any) => (
          <Circle
            key={i}
            radius={props?.circleRadius}
            center={coor}
            onRadiusChanged={props?.setCircleRadius}
            strokeColor={'#8B5CF6'}
            strokeOpacity={1}
            strokeWeight={3}
            fillColor={'#8B5CF650'}
            fillOpacity={0.3}
            // editable
            // draggable
          />
        ))}
        
        {/* <Directions allRoutes={mapRoutes} /> */}
        {mapRoutes?.map((route: any) => (
          <Directions route={route} key={route.id} allRoutes={props?.routes} />
        ))}

        
        
        {/* {selectedMarkers.map((marker: any) => (
          // <AdvancedMarker
          //   key={marker.id}
          //   position={{ lat: marker.lat, lng: marker.lng}}
          //   // icon={blueMarker}
          //   className={clsx('real-estate-marker', {clicked, hovered})}
          //   onClick={(e: any) => {
          //     setIsSelectedData(false);
          //     getSingleScreenData(marker[2]);
          //   }}
          // />
          <CustomAdvancedMarker key={marker.id} marker={marker} />
        ))} */}

        {unSelectedMarkers.map((marker: any) => (
          <AdvancedMarker
            key={marker.id}
            position={{lat: marker?.lat, lng: marker?.lng}}
            // icon={redMarker}
          />
        ))}

        {screenData && (
          <InfoWindow
            position={{
              lat: screenData?.location?.geographicalLocation?.latitude || 28.495,
              lng: screenData?.location?.geographicalLocation?.longitude
            }}
            onCloseClick={() => {
              setScreenData(null);
            }}
          >
            <div>
              <h2>Marker </h2>
              <p>Some arbitrary html to be rendered into the InfoWindow.</p>
            </div>
          </InfoWindow>
        )}

      </Map>
    </div>
  );
}


