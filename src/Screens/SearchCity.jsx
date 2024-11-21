import { FaSearch } from "react-icons/fa";
import { CustomAddressAutofill } from "./CustomAddressAutofill";
import "./SearchCity.css";
import { useState } from "react";

/**
 * SearchCity is a search bar component that has props for handling 3 different submits and setting user input.
 * It is responsible for the autofill suggestions.
 * It is not responsible for the weather fetch itself.
 */
export const SearchCity = ({
  handleEnterPressSubmit,
  handleSearchSubmit,
  handleSuggestionClick,
  userTextInput,
  setUserTextInput,
}) => {
  const [placeholder, setPlaceholder] = useState("Search");
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
            onKeyDown={handleEnterPressSubmit}
            placeholder={placeholder}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Search")}
          />
        </CustomAddressAutofill>
      </div>
      <button onClick={handleSearchSubmit} id="search-Icon-Button" disabled={!userTextInput.trim()}>
        <FaSearch id="search-Icon-Button-Sizing" />
      </button>
    </div>
  );
};
