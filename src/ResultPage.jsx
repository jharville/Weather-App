import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ResultPage.css";
import BackgroundVideo from "./assets/AdobeStock_712855701_Video_HD_Preview.mov";
import searchIcon from "./assets/WeatherIcons/searchIcon.png";

const ResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  useEffect(() => {
    document.title = "Weather App";
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  // #region UseStates
  const [cityInput, setCityInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  // #endregion

  const fetchWeather = async (city) => {
    console.log("City", city);
    try {
      if (!city.trim()) {
        setError("Please Enter a City");
        setWeather(null);
        return;
      }
      const geographicalCoordinatesResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
      );
      if (geographicalCoordinatesResponse.data.length === 0) {
        throw new Error("City Not Found");
      }
      const { lat, lon } = geographicalCoordinatesResponse.data[0];
      if (lat === 0 && lon === 0) {
        throw new Error("City Not Found");
      }
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit`
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
    console.log("Fetching weather for", cityInput);
    fetchWeather(cityInput);
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
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      placeholder="Search City"
                    />
                    <button id="search-icon-button" type="submit">
                      <img
                        src={searchIcon}
                        alt="Search"
                        style={{ height: "20px", width: "20px" }}
                      />
                    </button>
                  </form>
                </div>
                <div id="map-uv-container">
                  <div id="map-box-invisible"></div>
                  <div id="humidity-uv-box-invisible"></div>
                </div>
              </div>
              <div id="flex-grid-row">
                <div id="current-weather-box">
                  {error && <p>{error}</p>}
                  {weather && (
                    <div>
                      <p>Current Weather:</p>
                      <p className="capitalize-text">City: {city}</p>
                      <p>Temperature: {weather.hourly.temperature_2m[0]} °F </p>
                    </div>
                  )}
                </div>
                <div id="map-uv-container">
                  <div id="map-box">
                    {weather && (
                      <div>
                        <p>MAP</p>
                      </div>
                    )}
                  </div>
                  <div id="humidity-uv-box">
                    {weather && (
                      <div>
                        <p className="capitalize-text">Humidity: {city} </p>
                        <p>UV:{} </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div id="flex-grid-row">
                <div id="forcast-box">
                  {weather && (
                    <div>
                      <p>Forcast</p>
                    </div>
                  )}
                </div>
                <div id="summary-box">
                  {weather && (
                    <div>
                      <p>Summary</p>
                    </div>
                  )}
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
