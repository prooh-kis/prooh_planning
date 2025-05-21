import React, { useState } from "react";

// Updated types to match the actual data structure
type FilterOptionItem = {
  lable: string; // Note: Using "lable" to match your API response
  total: number;
  uploaded: number;
};

type FilterOptions = {
  cities: FilterOptionItem[];
  touchPoints: FilterOptionItem[];
  screenTypes: FilterOptionItem[];
  screenRatio: FilterOptionItem[];
};

type SelectedFilters = {
  cities: string[];
  touchPoints: string[];
  screenTypes: string[];
  screenRatio: string[];
};

type Props = {
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
  filterOptions: FilterOptions;
};

const FilterUI: React.FC<Props> = ({
  selectedFilters,
  setSelectedFilters,
  filterOptions,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    cities: true,
    touchPoints: true,
    screenTypes: true,
    screenRatio: true,
  });

  const handleFilterChange = (
    category: keyof SelectedFilters,
    value: string,
    isChecked: boolean,
    inputType: string
  ) => {
    setSelectedFilters((prev) => {
      // Handle radio buttons differently from checkboxes
      if (inputType === "radio") {
        return {
          ...prev,
          [category]: [value],
        };
      }

      // If "All" is selected
      if (value === "All") {
        const allValues = filterOptions[category].map((item) => item.lable);
        return {
          ...prev,
          [category]: isChecked ? allValues : [],
        };
      }

      // If selecting a specific option when "All" is currently selected
      if (prev[category].includes("All")) {
        if (isChecked) {
          // Start with all options except "All" and the one being selected
          const newSelection = filterOptions[category]
            .map((item) => item.lable)
            .filter((item) => item !== "All" && item !== value);
          return {
            ...prev,
            [category]: newSelection,
          };
        } else {
          // When deselecting from "All", keep all except the deselected one
          const newSelection = filterOptions[category]
            .map((item) => item.lable)
            .filter((item) => item !== "All" && item !== value);
          return {
            ...prev,
            [category]: newSelection,
          };
        }
      }

      // Normal case - no "All" selected
      let newSelection;
      if (isChecked) {
        newSelection = [...prev[category], value];
        // If all options except "All" are selected, select "All" instead
        if (newSelection.length === filterOptions[category].length - 1) {
          return {
            ...prev,
            [category]: filterOptions[category].map((item) => item.lable),
          };
        }
      } else {
        newSelection = prev[category].filter((item) => item !== value);
      }

      // If no options are selected, default to empty array
      if (newSelection.length === 0) {
        return {
          ...prev,
          [category]: [],
        };
      }

      return {
        ...prev,
        [category]: newSelection,
      };
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isAllSelected = (category: keyof SelectedFilters) => {
    return (
      selectedFilters[category].length === filterOptions[category].length ||
      (selectedFilters[category].includes("All") &&
        selectedFilters[category].length === 1)
    );
  };

  const renderFilterGroup = (
    category: keyof SelectedFilters,
    title: string,
    options: FilterOptionItem[],
    inputType: "checkbox" | "radio"
  ) => {
    const allSelected = isAllSelected(category);

    return (
      <div className="mb-6 pb-2">
        {expandedSections[category] && (
          <div className="mt-2 space-y-2">
            {/* "All" option with count */}
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center truncate">
                <input
                  id={`${category}-All`}
                  name={`${category}[]`}
                  type={inputType}
                  checked={allSelected}
                  onChange={(e) =>
                    handleFilterChange(
                      category,
                      "All",
                      e.target.checked,
                      inputType
                    )
                  }
                  className={`h-4 w-4 ${
                    inputType === "radio" ? "rounded-full" : "rounded"
                  } border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                />
                <label
                  htmlFor={`${category}-All`}
                  className="ml-3 text-[14px] text-[#0E212E] font-bold truncate"
                >
                  All {title}
                </label>
              </div>
              <span className="text-[14px] text-gray-500">
                <span className="font-medium text-[#0E212E]">
                  {options.find((o) => o.lable === "All")?.uploaded || 0}
                </span>
                /{options.find((o) => o.lable === "All")?.total || 0}
              </span>
            </div>

            {/* Other options */}
            {options
              .filter((option) => option.lable !== "All")
              .map((option) => (
                <div
                  className="flex justify-between items-center border-b pb-2"
                  key={option.lable}
                >
                  <div className="flex items-center truncate">
                    <input
                      id={`${category}-${option.lable}`}
                      name={`${category}`}
                      type={inputType}
                      checked={
                        inputType === "radio"
                          ? selectedFilters[category][0] === option.lable
                          : selectedFilters[category].includes(option.lable) ||
                            allSelected
                      }
                      onChange={(e) =>
                        handleFilterChange(
                          category,
                          option.lable,
                          e.target.checked,
                          inputType
                        )
                      }
                      className={`h-4 w-4 ${
                        inputType === "radio" ? "rounded-full" : "rounded"
                      } border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                    />
                    <label
                      htmlFor={`${category}-${option.lable}`}
                      className="ml-3 text-[14px] text-[#0E212E] font-normal truncate"
                    >
                      {option.lable}
                    </label>
                  </div>
                  <span className="text-[14px] text-gray-500">
                    <span className="font-medium text-[#0E212E]">
                      {option.uploaded}
                    </span>
                    /{option.total}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="bg-white rounded-lg border">
      <div className="flex justify-between mb-6 items-center border-b pb-4 p-4">
        <h2 className="text-[16px] font-bold text-gray-800">Filters</h2>
        <button
          onClick={() => {
            setSelectedFilters({
              cities: ["All"],
              touchPoints: ["All"],
              screenTypes: ["All"],
              screenRatio: ["All"],
            });
          }}
          className="text-gray-800 font-medium transition duration-150 hover:text-[#129BFF]"
        >
          Clear All
        </button>
      </div>
      {filterOptions && Object.keys(filterOptions || {}).length > 0 && (
        <div className="h-[48vh] overflow-y-auto scrollbar-minimal pr-2 px-4">
          {renderFilterGroup(
            "cities",
            "Cities",
            filterOptions?.cities,
            "checkbox"
          )}
          {renderFilterGroup(
            "touchPoints",
            "Touch Points",
            filterOptions?.touchPoints,
            "checkbox"
          )}
          {renderFilterGroup(
            "screenTypes",
            "Screen Types",
            filterOptions?.screenTypes,
            "checkbox"
          )}
          {renderFilterGroup(
            "screenRatio",
            "Screen Ratio",
            filterOptions?.screenRatio,
            "radio"
          )}
        </div>
      )}
    </div>
  );
};

export default FilterUI;
