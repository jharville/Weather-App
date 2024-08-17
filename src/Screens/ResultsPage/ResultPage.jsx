import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../../assets/AdobeStock_712855701_Video_HD_Preview.mov";
import "./ResultPage.css";
import "./ResultPageContents.css";
// import { validateInput } from "../validateInput.js";
import { useWeatherFetch } from "./WeatherFetch.jsx";
import { CurrentTime } from "./CurrentTime.jsx";
import { getWeatherLabel, getWeatherIcon } from "./getWeatherStatus.jsx";
import { FaSearch, FaHome } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { GiHeavyRain } from "react-icons/gi";

const ResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newCity, setNewCity] = useState(searchParams.get("city") || ""); //sets initial state of newCity as the city entered on landingPage
  const [userTextInput, setUserTextInput] = useState(""); // State for the user input from the search field
  const { weather, fetchWeather, fetchError } = useWeatherFetch();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  // Disables search button if input is empty or whitespace
  const isSearchDisabled = !userTextInput.trim();

  // Fetches weather data whenever newCity changes
  useEffect(() => {
    document.title = "Weather App";
    if (newCity) {
      fetchWeather(newCity);
    }
  }, [newCity, fetchWeather]);

  // Handles input changes and update userTextInput state
  const handleInputChange = useCallback((e) => {
    setUserTextInput(e.target.value);
  }, []);

  // Handles form submission to fetch weather data
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ city: userTextInput });
    setNewCity(userTextInput); // Updates newCity state with input value
    setUserTextInput("");
  };

  //For displaying general status of weather conditions based off getWeatherStatus file
  const weatherStatus = getWeatherLabel(weather?.current?.weather_code);

  return (
    <>
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
                  <div id="current-weather-box-contents">
                    {fetchError ? (
                      <div id="error-message-result">
                        <p>{fetchError}</p>
                      </div>
                    ) : (
                      <>
                        <div id="current-weather-top-row-container">
                          <p id="current-weather-header">{newCity}</p>
                          <div id="current-time">
                            <CurrentTime />
                          </div>
                        </div>
                        <div id="current-weather-middle-row-container">
                          {getWeatherIcon()}
                          <div id="current-weather-temp-container">
                            <div>
                              <h1 id="temp">
                                {weather?.current?.temperature_2m?.toFixed(0)}
                              </h1>
                              <p id="current-weather-condition-text">
                                {weatherStatus}
                              </p>
                            </div>
                            <div id="fern-row">
                              <div id="fern-outer">
                                <div id="fern-inner" />
                              </div>
                              <p id="fern-F">F</p>
                            </div>
                          </div>
                        </div>
                        <div id="current-weather-bottom-row-container">
                          <div id="bottom-current-box">
                            <p id="humidity-value">
                              {weather?.current?.relative_humidity_2m !==
                                undefined &&
                              weather.current.relative_humidity_2m !== null
                                ? `${weather.current.relative_humidity_2m}%`
                                : "-"}
                            </p>
                            <div id="humidity-icon">
                              <WiHumidity />
                            </div>
                          </div>
                          <div id="bottom-current-box">
                            <p id="wind-value">
                              {weather?.current?.wind_speed_10m !== undefined &&
                              weather.current.wind_speed_10m !== null
                                ? `${weather.current.wind_speed_10m} mph`
                                : "-"}
                            </p>

                            <div id="wind-icon-message">
                              <div id="wind-icon">
                                <FaWind />
                              </div>
                            </div>
                          </div>
                          <div id="bottom-current-box">
                            <p id="rain-value">
                              {weather?.current?.rain !== undefined &&
                              weather.current.rain !== null
                                ? `${weather.current.rain}%`
                                : "-"}
                            </p>
                            <div id="rain-icon">
                              <GiHeavyRain />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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
    </>
  );
};

export default ResultPage;
