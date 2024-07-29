import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ResultPage.css";
import BackgroundVideo from "./assets/AdobeStock_712855701_Video_HD_Preview.mov";
import { FaSearch } from "react-icons/fa";

const ResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Manages URL query parameters
  const landingCityValue = searchParams.get("city"); // Retrieves the 'city' value from URL params

  const [newCity, setNewCity] = useState(landingCityValue || ""); // State for the city name to fetch weather for
  const [userTextInput, setUserTextInput] = useState(""); // State for the user input from the search field
  const [weather, setWeather] = useState(null); // State for storing the weather data fetched from the API
  const [error, setError] = useState(null); // Self explanatory

  useEffect(() => {
    document.title = "Weather App";
    if (newCity) {
      fetchWeather(newCity);
    }
  }, [newCity]);

  const fetchWeather = async (cityName) => {
    //Should make a custom hook for this logic
    console.log("City", cityName);
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
      console.log(weatherResponse.data);
      setWeather(weatherResponse.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching Data", err);
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fetching weather for", userTextInput);
    setSearchParams({ city: userTextInput });
    setNewCity(userTextInput); // Updates city state with input value
    setUserTextInput(""); // this Clears the input field
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
                      id="search-city-text-field" //FUCK YOU
                      type="text"
                      value={userTextInput}
                      onChange={(e) => setUserTextInput(e.target.value)}
                      placeholder="Search City"
                    />
                    <button
                      id="search-icon-button"
                      type="submit"
                      disabled={!userTextInput.trim()}
                    >
                      <FaSearch
                        alt="Search"
                        style={{ height: "20px", width: "20px" }}
                      />
                    </button>
                  </form>
                </div>
                <div id="map-uv-container-invisible"></div>
              </div>
              <div id="flex-grid-row">
                <div id="current-weather-box">
                  {error && <p id="error-message-result">{error}</p>}
                  {!error && (
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
