import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CustomAddressAutofill } from "./ResultsPage/CustomAddressAutofill";
import "./SearchCity.css";

/**
 * SearchCity is a search bar component that sets the URL Search Parameters to the user's searched city.
 * It is not responsible for the weather fetch itself.
 * It also is responsible for the autofill suggestions
 */
export const SearchCity = ({ onSearchSubmit, onError }) => {
  const [, setSearchParams] = useSearchParams();
  const [userTextInput, setUserTextInput] = useState("");

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const trimmedInput = userTextInput.trim();
    if (trimmedInput) {
      try {
        setSearchParams({ city: trimmedInput });
        await onSearchSubmit(trimmedInput);
        setUserTextInput("");
      } catch (error) {
        console.error("Error during search:", error);
        if (onError) onError(error.message);
      }
    }
  };

  const handleSuggestionClick = async (city) => {
    const cityName = city.display_name;
    setSearchParams({ city: cityName });
    try {
      await onSearchSubmit(cityName);
      setUserTextInput("");
    } catch (error) {
      console.error("Error during suggestion click:", error);
      if (onError) onError(error.message);
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit(event);
    }
  };

  return (
    <div id="search-Bar-Container">
      <div id="search-City-Text-Field-Container">
        <CustomAddressAutofill
          onAcceptedSuggestion={handleSuggestionClick}
          onNotSuggestionSubmit={handleSearchSubmit}
          searchedCity={userTextInput}
          clearSuggestions={handleSearchSubmit}
        >
          <input
            autoComplete="off"
            id="search-City-Text-Field"
            type="text"
            value={userTextInput}
            onChange={(event) => setUserTextInput(event.target.value)}
            spellCheck="true"
            onKeyDown={handleEnterPress}
            placeholder="Search City"
          />
        </CustomAddressAutofill>
      </div>
      <button
        onClick={handleSearchSubmit}
        id="search-Icon-Button"
        disabled={!userTextInput.trim()}
      >
        <FaSearch id="search-Icon-Button-Sizing" />
      </button>
    </div>
  );
};
