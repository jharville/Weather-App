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
import { SummaryChart } from "./SummaryChart.jsx";
import { useCallback } from "react";

export const ResultPage = () => {
  const { weather, fetchWeather, loadingStatus, weatherFetchError } =
    useWeatherFetch();
  const isLoading = loadingStatus === loadingStatuses.loading;
  const isLoadingDone = loadingStatus === loadingStatuses.fulfilled;
  const isLoadingRejected = loadingStatus === loadingStatuses.rejected;
  const [, setSearchParams] = useSearchParams();
  const userSearchedCity = new URLSearchParams(window.location.search).get(
    "city"
  );

  const [userTextInput, setUserTextInput] = useState("");
  const trimmedInput = userTextInput.trim();

  // sets the initial highlighted forecast date
  const [dayClickedIndex, setDayClickedIndex] = useState(0);
  const handleDayClick = (index) => {
    setDayClickedIndex(index);
  };

  const navigate = useNavigate();
  const handleHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setUserTextInput("");
      setSearchParams({ city: trimmedInput });
    },
    [setSearchParams, trimmedInput]
  );

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
  const formattedSunHours = Math.round(
    weather?.daily?.sunshine_duration[0] / 3600
  );

  const weatherLabel = getWeatherLabel(weather?.current?.weather_code);

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
          </div>
          <div id="whole-page-contents-without-sidebar">
            <div id="parent-of-flex-grid-container">
              <div id="flex-grid-containers-total">
                <form onSubmit={handleSearchSubmit} id="grid-row-w-search-bar">
                  <SearchCity
                    handleSearch={handleSearchSubmit}
                    userTextInput={userTextInput}
                    setUserTextInput={setUserTextInput}
                  />
                  <div id="map-uv-container-invisible" />
                </form>
                <div id="grid-row">
                  <div id="current-weather-box">
                    <CurrentWeatherBox
                      isLoading={isLoading}
                      isLoadingDone={isLoadingDone}
                      isLoadingRejected={isLoadingRejected}
                      weather={weather}
                      weatherFetchError={weatherFetchError}
                      newCity={`${city || ""} ${country || ""}`}
                      temperature={Math.round(weather?.current?.temperature_2m)}
                      generalWeatherCondition={weatherLabel}
                      humidity={Math.round(
                        weather?.current?.relative_humidity_2m
                      )}
                      windSpeed={Math.round(weather?.current?.wind_speed_10m)}
                      rain={Math.round(weather?.current?.rain)}
                    />
                  </div>
                  <div id="map-and-uv-container">
                    <div id="mapbox-container">
                      <MapDisplay
                        userSearchedCity={userSearchedCity}
                        isLoadingDone={isLoadingDone}
                      />
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
                        forecastDates={weather?.daily?.time}
                        isLoading={isLoading}
                        dayClicked={handleDayClick}
                      />
                    </div>
                  </div>
                  <div id="summary-box">
                    <SummaryChart
                      isLoading={isLoading}
                      isLoadingDone={isLoadingDone}
                      isLoadingRejected={isLoadingRejected}
                      temps={weather?.hourly?.temperature_2m}
                      rain={weather?.hourly?.precipitation_probability}
                      dayClickedIndex={dayClickedIndex}
                      forecastDate={weather?.daily?.time}
                      weathercodes={weather?.daily?.weather_code}
                      generalWeatherCondition={weatherLabel}
                    />
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
