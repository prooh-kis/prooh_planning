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

export function MapBoxSearchInput(props: any) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleSuggestionClick = async (suggestion: any) => {
    // Set the query to the place_name of the clicked suggestion
    setQuery(suggestion.place_name);

    const response = await geocoder
      .forwardGeocode({
        query: suggestion.place_name, // Use the place_name of the clicked suggestion
        countries: ["ind"], // Restrict to India
        proximity: props?.userLocation
          ? [props?.userLocation.longitude, props?.userLocation.latitude]
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
    const normalizeQuery = (input: string): string =>
      input
        .toLowerCase()
        .replace(/[\s-]+/g, " ") // Normalize whitespace and dashes
        .trim();

    const normalizedQuery = normalizeQuery(value);
    setQuery(value);
    setHighlightedIndex(-1);
    let nearbySuggestions: any[] = [];
    if (props?.userLocation) {
      const proximityResponse = await geocoder
        .reverseGeocode({
          query: [props?.userLocation.longitude, props?.userLocation.latitude],
          // limit: 5,
        })
        .send();

      nearbySuggestions = proximityResponse.body.features.filter(
        (feature: any) =>
          feature.place_type.includes("poi") ||
          feature.place_type.includes("address")
      );
    }
    if (value) {
      const response = await geocoder
        .forwardGeocode({
          query: normalizedQuery,
          autocomplete: true,
          countries: ["IN"],
          proximity: props?.userLocation
            ? [props.userLocation.longitude, props.userLocation.latitude]
            : [77.891, 28.95],
          types: ["poi", "address", "locality"],
          bbox: [76.84, 28.1, 77.83, 28.95], // get city limit of the user dynamically in future updates
          limit: 10,
        })
        .send();

      const mapBoxSuggestions = response.body.features.filter(
        (feature: any) =>
          feature.place_type.includes("poi") ||
          feature.place_type.includes("address")
      );

      const filteredCustomSuggestions = nearbySuggestions?.filter(
        (suggestion: any) =>
          suggestion.place_name.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions([...filteredCustomSuggestions, ...mapBoxSuggestions]);
    } else {
      setSuggestions([]);
    }
  };

  const renderSuggestions = () => (
    <ul className="absolute z-10 w-full max-h-40 overflow-y-auto scrollbar-minimal bg-[#FFFFFF] rounded-lg shadow-lg">
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
