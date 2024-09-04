import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./CustomAddressAutofill.css";

// We're retarded. We had this debounce logic defined inside the component. Move it inside and see the ESlint error.
// Also fuck this debounce logic. Shit looks like dick.

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const CustomAddressAutofill = ({
  onAcceptedSuggestion,
  onNotSuggestionSubmit,
  searchedCity,
  children,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchedCity.trim().length > 2) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${searchedCity}&format=json&limit=5`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error Fetching Suggestions:", error);
          setSuggestions([]); // hide suggestions on error
        }
      }
      if (searchedCity.trim().length < 2) {
        return setSuggestions([]);
      }
    };
    // wait 600 ms before suggestions are fetched
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 600);

    debouncedFetchSuggestions();
    return () => clearTimeout(timeoutId);
  }, [searchedCity]);

  const handleSuggestionClick = useCallback(
    (city) => {
      if (onAcceptedSuggestion) {
        onAcceptedSuggestion(city); // notifies parent component (SearchCity) and triggers search
        setSuggestions([]);
      }
    },
    [onAcceptedSuggestion]
  );

  useEffect(() => {
    if (onNotSuggestionSubmit) {
      setSuggestions([]);
    }
  }, [onNotSuggestionSubmit]);

  return (
    <div>
      {children}
      {!!suggestions.length && (
        <div id="custom-address-autofill-result">
          <ul>
            {suggestions.slice(0, 3).map((city) => (
              <li
                key={city.place_id}
                onClick={() => handleSuggestionClick(city)}
              >
                {city.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
