import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./CustomAddressAutofill.css";

// Global variable to store timeout ID for the debounce function
let timer;

// Debounce function: delays the execution of a function by a specified time (delay)
const debounce = (callbackFunction, delay) => {
  return (searchedCity) => {
    // Clear any previously set timeout to reset the delay countdown
    if (timer) clearTimeout(timer);
    // Set a new timeout to execute the callback after the delay
    timer = setTimeout(() => {
      callbackFunction(searchedCity); // Call the provided callback function with the searchedCity
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
      if (searchedCity.trim()) {
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
      if (!searchedCity.trim()) {
        return setSuggestions([]);
      }
    };
    // wait 600 ms before suggestions are fetched
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

    // invoking the debounced function
    debouncedFetchSuggestions(searchedCity);

    //clean up the debounce
    return () => clearTimeout(timer);
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

  // console.log(suggestions);
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
