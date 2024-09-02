import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useWeatherFetch } from "./useWeatherFetch";
import { CustomAddressAutofill } from "./CustomAddressAutofill";
import "./SearchCity.css";

export const SearchCity = () => {
  const [, setSearchParams] = useSearchParams();
  const { fetchWeather } = useWeatherFetch();
  const [userTextInput, setUserTextInput] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedInput = userTextInput.trim();
    if (trimmedInput) {
      setSearchParams({ city: trimmedInput });
      fetchWeather(trimmedInput);
      setUserTextInput("");
    }
  };

  const handleSuggestionClick = async (city) => {
    setSearchParams({ city: city.display_name });
    await fetchWeather(city.display_name);
    setUserTextInput("");
  };

  return (
    <div id="search-bar-container">
      <div id="search-city-text-field-container">
        <CustomAddressAutofill
          onAcceptedSuggestion={handleSuggestionClick}
          searchedCity={userTextInput}
          clearSuggestions={handleSearchSubmit}
        >
          <input
            autoComplete="off"
            id="search-city-text-field"
            type="text"
            value={userTextInput}
            onChange={(event) => setUserTextInput(event.target.value)}
            spellCheck="true"
            placeholder="Search City"
          />
        </CustomAddressAutofill>
        <button
          onClick={handleSearchSubmit}
          id="search-icon-button"
          disabled={!userTextInput.trim()}
        >
          <FaSearch id="search-icon-button-sizing" />
        </button>
      </div>
    </div>
  );
};
