import React, { useState } from "react";

interface SuggestionInputProps {
  suggestions: string[];
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  size?: "small" | "medium" | "large";
}

export const SuggestionInput: React.FC<SuggestionInputProps> = ({
  suggestions,
  onChange,
  placeholder,
  value,
  size = "medium",
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  // Size configuration
  const sizeClasses = {
    small: {
      input: "h-8 text-sm",
      suggestion: "text-sm py-1",
    },
    medium: {
      input: "h-10 text-base",
      suggestion: "text-base py-2",
    },
    large: {
      input: "h-12 text-lg",
      suggestion: "text-lg py-3",
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.trim() !== "") {
      // Sort suggestions: matches starting with input first, then others
      const filtered = suggestions
        ?.filter((suggestion) =>
          suggestion?.toLowerCase()?.includes(inputValue?.toLowerCase())
        )
        .sort((a, b) => {
          const aStartsWith = a
            .toLowerCase()
            .startsWith(inputValue.toLowerCase());
          const bStartsWith = b
            .toLowerCase()
            .startsWith(inputValue.toLowerCase());

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          return 0;
        });

      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(filteredSuggestions[highlightedIndex]);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => value && setShowSuggestions(true)}
        placeholder={placeholder}
        className={`w-full px-4 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-[#F4F9FF] ${sizeClasses[size].input}`}
      />
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <ul
          className={`absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-md mt-1 max-h-36 overflow-y-auto scrollbar-minimal z-50 ${sizeClasses[size].suggestion}`}
        >
          {filteredSuggestions?.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 cursor-pointer border-b last:border-b-0 ${
                index === highlightedIndex
                  ? "bg-[#129BFF10]"
                  : "hover:bg-[#129BFF10]"
              } ${
                suggestion.toLowerCase().startsWith(value.toLowerCase())
                  ? "font-semibold"
                  : ""
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
