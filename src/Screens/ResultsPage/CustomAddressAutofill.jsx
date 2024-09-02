import { useState, useEffect } from "react";
import axios from "axios";
import "./CustomAddressAutofill.css";

export const CustomAddressAutofill = ({
  onAcceptedSuggestion,
  searchedCity,
  children,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [, setfetchingSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchedCity.length > 2) {
        setfetchingSuggestions(true); // pinging Street Map for a valid city
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${searchedCity}&format=json&limit=5`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error Fetching Suggestions:", error);
          setSuggestions([]); // hide suggestions on error
        } finally {
          setfetchingSuggestions(false); // End loading
        }
      } else {
        setSuggestions([]); // Clear suggestions if input is too short
      }
    };

    fetchSuggestions();
  }, [searchedCity]);

  const handleSuggestionClick = (city) => {
    if (onAcceptedSuggestion) {
      onAcceptedSuggestion(city); // notifies parent component (SearchCity) and triggers search
      setSuggestions([]);
    }
  };

  return (
    <div>
      {children}
      {!!suggestions.length && (
        <div id="custom-address-autofill-result">
          <ul>
            {suggestions.map((city) => (
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
