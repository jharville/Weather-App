import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./ResultPage.css";
import BackgroundVideo from "./assets/AdobeStock_712855701_Video_HD_Preview.mov";
import { FaSearch } from "react-icons/fa";

const ResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [newCity, setNewCity] = useState(searchParams.get("city") || ""); //sets initial state of newCity as the city entered on landingPage
  const [userTextInput, setUserTextInput] = useState(""); // State for the user input from the search field
  const [weather, setWeather] = useState(null); // State for storing the weather data fetched from the API
  const [error, setError] = useState(null); // State for managing error messages

  // Disable search button if input is empty or whitespace
  const isSearchDisabled = !userTextInput.trim();

  // Fetch weather data whenever newCity changes
  useEffect(() => {
    document.title = "Weather App";
    if (newCity) {
      fetchWeather(newCity);
    }
  }, [newCity]);

  // Handle input changes and update userTextInput state
  const handleInputChange = useCallback((e) => {
    setUserTextInput(e.target.value);
  }, []);

  // Fetch weather data for a given city
  const fetchWeather = async (cityName) => {
    try {
      if (!cityName.trim()) {
        setError("Please Enter a City");
        setWeather(null);
        return;
      }
      const geographicalCoordinatesResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`
      );
      if (geographicalCoordinatesResponse.data.length === 0) {
        throw new Error("City Not Found");
      }
      const { lat, lon } = geographicalCoordinatesResponse.data[0];
      if (lat === 0 && lon === 0) {
        throw new Error("City Not Found");
      }
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=fahrenheit`
      );
      setWeather(weatherResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Handle form submission to fetch weather data
  const handleSubmit = (e) => {
    console.log(newCity);
    e.preventDefault();
    setSearchParams({ city: userTextInput });
    setNewCity(userTextInput); // Update newCity state with input value
    setUserTextInput(""); // Clear the input field
  };

  return (
    <>
      <video autoPlay loop muted id="background-video">
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <div id="whole-page-container-plus-sidebar">
        <div id="side-bar">
          <p id="side-bar-icon">Today</p>
          <p id="side-bar-icon">Hourly</p>
          <p id="side-bar-icon">Weekly</p>
          <p id="side-bar-icon">Monthly</p>
        </div>
        <div id="whole-page-container-without-sidebar">
          <div id="parent-of-flex-grid-container">
            <div id="flex-grid-containers-total">
              <div id="flex-grid-row-w-search-bar">
                <div id="search-bar-container">
                  <form
                    id="search-city-text-field-container"
                    onSubmit={handleSubmit}
                  >
                    <input
                      id="search-city-text-field"
                      type="text"
                      value={userTextInput}
                      onChange={handleInputChange}
                      placeholder="Search City"
                    />
                    <button
                      id="search-icon-button"
                      type="submit"
                      disabled={isSearchDisabled}
                    >
                      <FaSearch id="search-icon-button-sizing" alt="Search" />
                    </button>
                  </form>
                </div>
                <div id="map-uv-container-invisible"></div>
              </div>
              <div id="flex-grid-row">
                <div id="current-weather-box">
                  {error ? (
                    <p id="error-message-result">{error}</p>
                  ) : (
                    <div>
                      <p>Current Weather:</p>
                      <p className="capitalize-text">City: {newCity || "-"}</p>
                      <p>
                        Temperature: {weather?.current?.temperature_2m || "-"}{" "}
                        °F
                      </p>
                    </div>
                  )}
                </div>
                <div id="map-uv-container">
                  <div id="map-box">
                    <div>
                      <p>
                        MAP: {}
                        {weather?.current?.temperature_2m || "-"}
                      </p>
                    </div>
                  </div>
                  <div id="humidity-uv-box">
                    <div>
                      <div>
                        <p>Humidity: {}</p>
                        <p>
                          UV Index: {weather?.current?.temperature_2m || "-"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="flex-grid-row">
                <div id="forcast-box">
                  <div>
                    <p>Forcast:</p>
                    <p>Weekly: {weather?.current?.temperature_2m || "-"}</p>
                  </div>
                </div>
                <div id="summary-box">
                  <div>
                    <p>Summary:</p>
                    <p>
                      Daily Forcast: {weather?.current?.temperature_2m || "-"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
