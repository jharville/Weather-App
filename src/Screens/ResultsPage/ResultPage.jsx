import "./ResultPage.css";
import { getWeatherLabel } from "../getWeatherStatus.jsx";
import BackgroundVideo from "../../assets/AdobeStock_712855701_Video_HD_Preview.mov";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchCity } from "../SearchCity.jsx";
import { useEffect, useState } from "react";
import { loadingStatuses, useWeatherFetch } from "../useWeatherFetch.js";
import { CurrentWeatherBox } from "./CurrentWeatherBox.jsx";
import { FaHome } from "react-icons/fa";
import { MapDisplay } from "./MapDisplay.jsx";
import { ForecastBox } from "./ForecastBox.jsx";
import { UVBox } from "./UVBox.jsx";
import { FormattedDate } from "../FormattedDate";

export const ResultPage = () => {
  const [, setSearchParams] = useSearchParams();
  const userSearchedCity = new URLSearchParams(window.location.search).get("city");

  const [userTextInput, setUserTextInput] = useState("");
  const trimmedInput = userTextInput.trim();

  const { weather, fetchWeather, loadingStatus, weatherFetchError } = useWeatherFetch();
  const isLoading = loadingStatus === loadingStatuses.loading;

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUserTextInput("");
    setSearchParams({ city: trimmedInput });
  };

  const handleEnterPressSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setUserTextInput("");
      setSearchParams({ city: trimmedInput });
      handleSearchSubmit(event);
    }
  };

  const handleSuggestionClick = (city) => {
    const cityName = city.display_name;
    setUserTextInput("");
    setSearchParams({ city: cityName });
  };

  //For displaying only the city and country/city returned from the autofill.
  const [city, country] = (() => {
    const parts = userSearchedCity.split(",").map((part) => part.trim());
    if (parts.length === 1) {
      return [parts[0]]; // If there is only one part, it's assumed to be the city, with no country.
    } else if (parts.length > 2) {
      return [parts[0], parts[2]]; // If there are more than two parts, the third part is considered the country.
    } else {
      return [parts[0], parts[1]]; // If there are exactly two parts, the second part is considered the country or state.
    }
  })();

  useEffect(() => {
    if (userSearchedCity) {
      fetchWeather(userSearchedCity);
    }
  }, [userSearchedCity, fetchWeather]);

  const formattedUV = Math.round(weather?.daily?.uv_index_max[0]);
  const formattedSunHours = Math.round(weather?.daily?.sunshine_duration[0] / 3600);

  console.log(weather?.daily?.sunshine_duration[0]);
  return (
    <>
      <video autoPlay loop muted id="background-video">
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <div id="for-centering-contents">
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
                <div id="grid-row-w-search-bar">
                  <SearchCity
                    handleEnterPressSubmit={handleEnterPressSubmit}
                    handleSearchSubmit={handleSearchSubmit}
                    handleSuggestionClick={handleSuggestionClick}
                    userTextInput={userTextInput}
                    setUserTextInput={setUserTextInput}
                  />
                  <div id="map-uv-container-invisible" />
                </div>
                <div id="grid-row">
                  <div id="current-weather-box">
                    <CurrentWeatherBox
                      weatherFetchError={weatherFetchError}
                      newCity={`${city || ""} ${country || ""}`}
                      temperature={Math.round(weather?.current?.temperature_2m)}
                      generalWeatherCondition={getWeatherLabel(weather?.current?.weather_code)}
                      humidity={Math.round(weather?.current?.relative_humidity_2m)}
                      windSpeed={weather?.current?.wind_speed_10m}
                      rain={Math.round(weather?.current?.rain)}
                      isLoading={isLoading}
                    />
                  </div>
                  <div id="map-and-uv-container">
                    <div id="mapbox-container">
                      <MapDisplay />
                    </div>
                    <div id="uv-box">
                      <UVBox
                        uvValue={formattedUV}
                        isLoading={isLoading}
                        sunDuration={formattedSunHours}
                      />
                    </div>
                  </div>
                </div>
                <div id="grid-row">
                  <div id="forecast-box">
                    <div>
                      <ForecastBox
                        WeatherIcon={weather?.daily?.weather_code}
                        minTemp={weather?.daily?.temperature_2m_min}
                        maxTemp={weather?.daily?.temperature_2m_max}
                        forecastDate={weather?.daily?.time}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                  <div id="summary-box">
                    <div></div>
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
