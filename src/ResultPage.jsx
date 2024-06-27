import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ResultPage.css";
import BackgroundVideo from "./assets/AdobeStock_712855701_Video_HD_Preview.mov";

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
      const geographicalCoordinatesResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`
      );
      if (geographicalCoordinatesResponse.data.length === 0) {
        throw new Error("City Not Found");
      }
      const { lat, lon } = geographicalCoordinatesResponse.data[0];
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit`
      );
      console.log(weatherResponse.data);
      setWeather(weatherResponse.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching Data", err);
      setError("City Not Found");
      setWeather(null);
    }
  };

  const capitalizeCityName = (cityName) => {
    return cityName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fetching weather for", cityInput);
    fetchWeather(cityInput);
  };

  return (
    <>
      <div id="background" />
      <video autoPlay loop muted id="background-video">
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <div id="flex-total-container">
        <div id="flex-top-container">
          <div id="temp-city-conditon-box-container">
            <div id="temp-city-conditon-box">
              <form id="form" onSubmit={handleSubmit}>
                <input
                  id="input-City"
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="Enter city name"
                />
                <button id="get-weather-button" type="submit">
                  <p>Get</p>
                  <p>Weather</p>
                </button>
              </form>
              {error && <p>{error}</p>}
              {weather && (
                <div>
                  <p>Condition:</p>
                  <p>City: {capitalizeCityName(city)}</p>
                  <p>Temperature: {weather.hourly.temperature_2m[0]} °F </p>
                </div>
              )}
            </div>
          </div>
          <div id="humidity-uv-box-container">
            <div id="humidity-uv-box">
              {error && <p>{error}</p>}
              {weather && (
                <div>
                  <p>UV:{} </p>
                  <p>Humidity: {} </p>
                </div>
              )}
            </div>
          </div>
          <div id="map-box-container">
            <div id="map-box">
              <div id="form-container"></div>
              {error && <p>{error}</p>}
              {weather && (
                <div>
                  <p>City: {capitalizeCityName(city)}</p>
                  <p>MAP</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="flex-bottom-container">
          <div id="forcast-box">
            {error && <p>{error}</p>}
            {weather && (
              <div>
                <p>Forcast: {} </p>
              </div>
            )}
          </div>
          <div id="summary-box-container">
            <div id="summary-box">
              {error && <p>{error}</p>}
              {weather && (
                <div>
                  <p>Summary: {} </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
