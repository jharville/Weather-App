import { useState, useEffect } from "react";
import axios from "axios";
import "./CustomAddressAutofill.css";

export const CustomAddressAutofill = ({
  onAcceptedSuggestion,
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
          setSuggestions([]); // hides suggestions on error
        }
      }
      if (!searchedCity.trim()) {
        return setSuggestions([]);
      }
    };
    // waits 500 ms before suggestions are fetched
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

    // invokes the debounced function
    debouncedFetchSuggestions(searchedCity);

    //cleans up the debounce
    return () => clearTimeout(timer);
  }, [searchedCity]);

  return (
    <div>
      {children}
      {!!suggestions.length && (
        <div id="custom-address-autofill-result">
          <ul>
            {suggestions.slice(0, 3).map((city) => (
              <li key={city.place_id} onClick={onAcceptedSuggestion}>
                {city.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Global variable to store timeout ID for the debounce function
let timer;
// Debounce function: delays the execution of a function by a specified time (delay)
const debounce = (callbackFunction, delay) => {
  return (searchedCity) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFunction(searchedCity);
    }, delay);
  };
};
