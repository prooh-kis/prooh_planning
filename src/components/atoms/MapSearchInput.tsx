import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-sdk/services/geocoding";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX ||
  "pk.eyJ1IjoidnZpaWNja2t5eTU1IiwiYSI6ImNsMzJwODk5ajBvNnMzaW1wcnR0cnpkYTAifQ.qIKhSIKdM9EDKULRBahZ-A";

const geocoder = MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
});

const customSuggestions = [
  {
    id: "custom-1",
    place_name: "New Delhi Railway Station",
    center: [77.514, 29.54],
  },
  {
    id: "custom-2",
    place_name: "New Delhi Public School",
    center: [28.54, 77.451],
  },
];

export function MapSearchInput(props: any) {
  // console.log(props);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
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

  const handleSuggestionClick = async (suggestion: any) => {
    // Set the query to the place_name of the clicked suggestion
    setQuery(suggestion.place_name);

    const response = await geocoder
      .forwardGeocode({
        query: suggestion.place_name, // Use the place_name of the clicked suggestion
        countries: ["ind"], // Restrict to India
        proximity: userLocation
          ? [userLocation.longitude, userLocation.latitude]
          : undefined,
        limit: 2,
      })
      .send();

    if (response.body.features.length > 0) {
      setSuggestions([]);
      props?.handleClick(response.body.features);
    }
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === "ArrowDown") {
      // setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
      setHighlightedIndex((prevIndex) => prevIndex + 1);
      // setQuery(e.target.value);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setHighlightedIndex(-1);
    if (userLocation) {
      const proximityResponse = await geocoder
        .reverseGeocode({
          query: [userLocation.longitude, userLocation.latitude],
          // limit: 5,
        })
        .send();

      const nearbySuggestions = proximityResponse.body.features;
      // console.log(proximityResponse)
    }
    if (value) {
      const response = await geocoder
        .forwardGeocode({
          query: value,
          countries: ["ind"],
          proximity: [77.891, 28.95],
          limit: 5,
        })
        .send();

      const mapBoxSuggestions = response.body.features;

      const filteredCustomSuggestions = customSuggestions.filter((suggestion) =>
        suggestion.place_name.toLowerCase().includes(value.toLowerCase())
      );

      // console.log(response);
      setSuggestions([...filteredCustomSuggestions, ...mapBoxSuggestions]);
    } else {
      setSuggestions([]);
    }
  };

  const renderSuggestions = () => (
    <ul className="absolute z-10 w-full max-h-40 overflow-y-auto bg-[#FFFFFF] rounded-lg shadow-lg">
      {suggestions.map((suggestion: any, index: number) => (
        <li
          key={suggestion.id}
          onClick={() => {
            handleSuggestionClick(suggestion);
          }}
          onMouseEnter={(e: any) => {
            setHighlightedIndex(index);
            setQuery(suggestion?.place_name);
          }}
          onMouseDown={() => {
            handleSuggestionClick(suggestion);
          }}
          className={
            highlightedIndex === index
              ? "cursor-pointer p-4 bg-gray-200"
              : "cursor-pointer p-4 bg-[#FFFFFF]"
          }
        >
          <h1 className="text-[12px]">{suggestion.place_name}</h1>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
      setQuery(suggestions[highlightedIndex].place_name);
    }
  }, [highlightedIndex, suggestions]);

  useEffect(() => {
    if (props?.reset) {
      setQuery("");
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  }, [props?.reset]);

  return (
    <div className="relative w-full">
      {props?.prefix}
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleSearch}
        placeholder={props?.placeholder}
        className="h-[48px] w-full border rounded-lg pl-10 py-2 pr-4 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-[#F4F9FF] transition-colors"
      />
      <div className="h-auto">{renderSuggestions()}</div>
    </div>
  );
}
