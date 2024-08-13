import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResultPage.css";
import { WiDayCloudy } from "react-icons/wi";
import BackgroundVideo from "../../assets/AdobeStock_712855701_Video_HD_Preview.mov";
import { FaSearch, FaHome, FaSun } from "react-icons/fa";
import "./ResultPageContents.css";
import { FaWind } from "react-icons/fa6";
import { WiRaindrop } from "react-icons/wi";
import { CiCloudSun } from "react-icons/ci";
import { WiDegrees } from "react-icons/wi";
import { IoIosCloudy } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
const ResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [newCity, setNewCity] = useState(searchParams.get("city") || ""); //sets initial state of newCity as the city entered on landingPage
  const [userTextInput, setUserTextInput] = useState(""); // State for the user input from the search field
  const [weather, setWeather] = useState(null); // State for storing the weather data fetched from the API
  const [error, setError] = useState(null); // State for managing error messages

  const navigate = useNavigate();

  // Disables search button if input is empty or whitespace
  const isSearchDisabled = !userTextInput.trim();

  // Fetches weather data whenever newCity changes
  useEffect(() => {
    document.title = "Weather App";
    if (newCity) {
      fetchWeather(newCity);
    }
  }, [newCity]);

  // Handles input changes and update userTextInput state
  const handleInputChange = useCallback((e) => {
    setUserTextInput(e.target.value);
  }, []);

  // Weather Fetch
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
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m&daily=weather_code,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`
      );
      console.log("WEATHER", weatherResponse.data);
      setWeather(weatherResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Handles form submission to fetch weather data
  const handleSubmit = (e) => {
    console.log(newCity);
    e.preventDefault();
    setSearchParams({ city: userTextInput });
    setNewCity(userTextInput); // Updates newCity state with input value
    setUserTextInput(""); // Clears the input field
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const date = new Date(Date.now());

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = `${hours}:${minutesFormatted} ${ampm}`;

  const weatherStatusLabel = getWeatherLabel(weather?.current?.weather_code);
  // const weatherStatusLabel = getWeatherLabel(0);

  return (
    <>
      <div id="entire-page">
        <video autoPlay loop muted id="background-video">
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
        <div id="whole-page-contents-plus-sidebar">
          <div id="side-bar">
            <button id="side-bar-home-icon" onClick={handleHomeClick}>
              <FaHome />
            </button>
            <p id="side-bar-icon">Today</p>
            <p id="side-bar-icon">Hourly</p>
            <p id="side-bar-icon">Weekly</p>
            <p id="side-bar-icon">Monthly</p>
          </div>
          <div id="whole-page-contents-without-sidebar">
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
                    <div id="current-weather-top-row-container">
                      <p id="current-weather-header">{newCity}</p>
                      <p id="current-time">{formattedTime}</p>
                    </div>
                    <div id="current-weather-middle-row-container">
                      {getWeatherIcon(weatherStatusLabel)}
                      <div id="current-weather-temp-container">
                        <div>
                          <h1 id="temp">
                            {weather?.current?.temperature_2m?.toFixed(0)}
                          </h1>
                          <p id="current-weather-condition">
                            {weatherStatusLabel}
                          </p>
                        </div>
                        <div id="fern-row">
                          <div id="fern-outer">
                            <div id="fern-inner" />
                          </div>
                          <p id="fern-f">F</p>
                        </div>
                      </div>
                    </div>
                    <div id="current-weather-bottom-row-container">
                      <div id="bottom-current-box">
                        <WiRaindrop size={30} color="white" />
                        <p id="bottom-label">{weather?.current?.rain}</p>
                      </div>
                      <div id="bottom-current-box">
                        <FaWind size={30} color="white" />
                        <p id="bottom-label">
                          {weather?.current?.wind_speed_10m} mph
                        </p>
                      </div>
                      <div id="bottom-current-box">
                        <WiHumidity size={30} color="white" />
                        <p id="bottom-label">
                          {weather?.current?.relative_humidity_2m}%
                        </p>
                      </div>
                    </div>
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
      </div>
    </>
  );
};

export default ResultPage;

const weatherStatuses = {
  clear: "clear",
  partlyCloudy: "partly cloudy",
};

const WMOs = [
  { WMOCodes: [0], label: weatherStatuses.clear },
  { WMOCodes: [1, 2, 3], label: weatherStatuses.partlyCloudy },
];

const getWeatherLabel = (weatherCode) => {
  const foundWMOObj = WMOs.find((wmoObj) =>
    wmoObj.WMOCodes.includes(weatherCode)
  );
  return foundWMOObj?.label || "";
};

const getWeatherIcon = (status) => {
  switch (status) {
    case weatherStatuses.clear:
      return <FaSun color="goldenrod" size={120} />;
    case weatherStatuses.partlyCloudy:
      return <WiDayCloudy color="white" size={90} />;
    default:
      return <FaSun color="goldenrod" size={120} />; // or return a default component if needed
  }
};
