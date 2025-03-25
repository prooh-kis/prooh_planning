import React, { useEffect, useState } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";

export function MapSearchInput(props: any) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const placesLib = useMapsLibrary("places");

  // Get user's location using Geolocation API
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleSuggestionClick = async (suggestion: any) => {
    setQuery(suggestion.description);
    setSuggestions([]);

    if (!placesLib) return;
    const placesService = new placesLib.PlacesService(document.createElement("div"));

    placesService.getDetails(
      { placeId: suggestion.place_id },
      (place: any, status: any) => {
        if (status === placesLib.PlacesServiceStatus.OK) {
          props?.handleClick([
            {
              place_name: place.formatted_address,
              center: [place.geometry.location.lng(), place.geometry.location.lat()],
            },
          ]);
        }
      }
    );
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions[highlightedIndex]) {
      await handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setHighlightedIndex(-1);

    if (!value || !placesLib) {
      setSuggestions([]);
      return;
    }

    try {
      const autocompleteService = new placesLib.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input: value,
          types: ["geocode", "establishment"],
          componentRestrictions: { country: "IN" },
          ...(userLocation && {
            locationBias: {
              lat: userLocation.lat,
              lng: userLocation.lng,
              radius: 5000, // 5km radius from the user's location
            },
          }),
        },
        (predictions, status) => {
          if (status === placesLib.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    } catch (error) {
      console.error("Google Maps AutocompleteService Error:", error);
    }
  };

  const renderSuggestions = () => (
    <ul className="absolute z-10 w-full max-h-40 overflow-y-auto bg-[#FFFFFF] rounded-lg shadow-lg">
      {suggestions.map((suggestion: any, index: number) => (
        <li
          key={suggestion.place_id}
          onClick={() => handleSuggestionClick(suggestion)}
          onMouseEnter={() => {
            setHighlightedIndex(index);
            // setQuery(suggestion.description);
          }}
          onMouseDown={() => handleSuggestionClick(suggestion)}
          className={
            highlightedIndex === index
              ? "cursor-pointer p-4 bg-gray-200"
              : "cursor-pointer p-4 bg-[#FFFFFF]"
          }
        >
          <h1 className="text-[12px]">{suggestion.description}</h1>
        </li>
      ))}
    </ul>
  );

  // useEffect(() => {
  //   if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
  //     setQuery(suggestions[highlightedIndex].description);
  //   }
  // }, [highlightedIndex, suggestions]);

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
