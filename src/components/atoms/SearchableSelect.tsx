import React, { useState, useEffect, useRef } from "react";

export const SearchableSelect: React.FC<{
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}> = ({ options, onChange, placeholder, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(value);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const filteredOptions =
    searchTerm?.length === 0
      ? []
      : options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    onChange(value);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        Math.min(prev + 1, filteredOptions?.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleOptionClick(filteredOptions[focusedIndex].value);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={
            selectedOption
              ? options.find((o) => o.value === selectedOption)?.label || ""
              : searchTerm
          }
          onChange={(e) => {
            setSearchTerm(e.target.value.toUpperCase());
            setSelectedOption(null);
            if (!isOpen) setIsOpen(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="border rounded-[8px] h-[48px] w-full pl-9 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-gray-100 active:bg-blue-100 transition-colors"
        />
        <div className="absolute inset-y-0 left-0 flex items-center ml-3 pointer-events-none">
          <i className="fi fi-bs-search text-gray-400 text-lg flex items-center"></i>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
          <i className="fi fi-br-angle-small-down text-gray-400 text-lg flex items-center"></i>
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 w-full bg-white  shadow-md max-h-60 overflow-y-auto mt-1 rounded-[8px]"
          role="listbox"
        >
          {filteredOptions?.length > 0 ? (
            filteredOptions?.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`px-4 py-2 cursor-pointer ${
                  focusedIndex === index ? "bg-[#D7D7D7]" : "hover:bg-[#D7D7D7]"
                }`}
                role="option"
              >
                {option.label}
              </div>
            ))
          ) : searchTerm?.length > 0 ? (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

import { Input } from "./Input"; // Your custom input component
import { Icon } from "./Icon"; // Your custom icon component

interface Option {
  value: string | number;
  label: string;
  [key: string]: any;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number, option?: Option) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SearchableSelectV2: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  loading = false,
  allowClear = false,
  showSearch = true,
  className = "",
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter options based on search input
  const filteredOptions = showSearch
    ? options?.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : options;

  // Set initial selected option
  useEffect(() => {
    if (value) {
      const option = options?.find((opt) => opt.value === value);
      if (option) setSelectedOption(option);
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange?.(option.value, option);
    setIsOpen(false);
    setSearchValue("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    onChange?.("");
    setSearchValue("");
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`} style={style}>
      <div
        className={`flex items-center justify-between p-2 border rounded cursor-pointer ${
          disabled
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-white hover:border-blue-500"
        } ${
          isOpen ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <span className="truncate">{selectedOption.label}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}

        <div className="flex items-center ml-2">
          {allowClear && selectedOption && (
            <span
              className="mr-1 text-gray-400 hover:text-gray-600"
              onClick={handleClear}
            >
              <Icon name="close" size={14} />
            </span>
          )}
          <Icon
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            className="text-gray-400"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {showSearch && (
            <div className="p-2 border-b">
              <Input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-full"
              />
            </div>
          )}

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-2 text-center text-gray-500">Loading...</div>
            ) : filteredOptions?.length === 0 ? (
              <div className="p-2 text-center text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions?.map((option) => (
                <div
                  key={option.value}
                  className={`m-2  p-2 rounded-md cursor-pointer hover:bg-gray-200 hover:font-semibold truncate ${
                    selectedOption?.value === option.value
                      ? "bg-[#129BFF] text-[#FFFFFF] font-semibold"
                      : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
