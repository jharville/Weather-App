import { FaSearch } from "react-icons/fa";
import { CustomAddressAutofill } from "./CustomAddressAutofill";
import "./SearchCity.css";
import { useCallback, useState } from "react";

/**
 * SearchCity is a search bar component that has props for handling 3 different submits and setting user input.
 * It is responsible for the autofill suggestions.
 * It is not responsible for the weather fetch itself.
 */
export const SearchCity = ({
  handleSearch,
  userTextInput,
  setUserTextInput,
}) => {
  const [isFocused, setIsFocused] = useState("");
  const searchBarHasInput = !!userTextInput?.trim();
  let placeholder;
  if (!isFocused) {
    placeholder = "Search";
  }

  const handleInput = useCallback(
    (e) => setUserTextInput(e.target.value),
    [setUserTextInput]
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <div id="search-Bar-Container">
      <div id="search-City-Text-Field-Container">
        <CustomAddressAutofill
          onAcceptedSuggestion={handleSearch}
          searchedCity={userTextInput}
        >
          <input
            autoComplete="off"
            id="search-City-Text-Field"
            type="text"
            value={userTextInput}
            onChange={handleInput}
            spellCheck="true"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </CustomAddressAutofill>
      </div>
      <button
        onClick={handleSearch}
        id="search-Icon-Button"
        disabled={!searchBarHasInput}
      >
        <FaSearch id="search-Icon-Button-Sizing" />
      </button>
    </div>
  );
};
