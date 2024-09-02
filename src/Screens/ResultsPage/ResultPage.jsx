import "./ResultPage.css";
import { getWeatherLabel } from "./getWeatherStatus.jsx";
import BackgroundVideo from "../../assets/AdobeStock_712855701_Video_HD_Preview.mov";
import { useNavigate } from "react-router-dom";
import { SearchCity } from "./SearchCity.jsx";
import { useEffect } from "react";
import { loadingStatuses, useWeatherFetch } from "./useWeatherFetch.js";
import { CurrentWeatherBox } from "./CurrentWeatherBox.jsx";
import { FaHome } from "react-icons/fa";

export const ResultPage = () => {
  const { weather, fetchWeather, loadingStatus, weatherFetchError } =
    useWeatherFetch();
  const isLoading = loadingStatus === loadingStatuses.loading;
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const searchedCity = new URLSearchParams(window.location.search).get("city");
  const [city, country] = (() => {
    const parts = searchedCity.split(",").map((part) => part.trim());

    if (parts.length === 1) {
      return [parts[0]]; // If there is only one part, it's assumed to be the city, with no country. "" prevents undefined.
    } else if (parts.length > 2) {
      return [parts[0], parts[2]]; // If there are more than two parts, the third part is considered the country.
    } else {
      return [parts[0], parts[1]]; // If there are exactly two parts, the second part is considered the country or state.
    }
  })();

  useEffect(() => {
    if (searchedCity) {
      fetchWeather(searchedCity);
    }
  }, [searchedCity, fetchWeather]);

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
                <SearchCity />
                <div id="map-uv-container-invisible" />
              </div>
              <div id="flex-grid-row">
                <div id="current-weather-box">
                  <CurrentWeatherBox
                    weatherFetchError={weatherFetchError}
                    newCity={`${city || ""} ${country || ""}`}
                    temperature={Math.round(weather?.current?.temperature_2m)}
                    generalWeatherCondition={getWeatherLabel(
                      weather?.current?.weather_code
                    )}
                    humidity={Math.round(
                      weather?.current?.relative_humidity_2m
                    )}
                    windSpeed={weather?.current?.wind_speed_10m}
                    rain={Math.round(weather?.current?.rain)}
                    isLoading={isLoading}
                  />
                </div>
                <div id="map-uv-container">
                  <div id="map-box">
                    <div>
                      <p>MAP: {}</p>
                    </div>
                  </div>
                  <div id="humidity-uv-box">
                    <div>
                      <div>
                        <p>
                          Humidity:{" "}
                          {/* {weather?.current?.relative_humidity_2m || "-"} */}
                        </p>
                        {/* <p>UV Index: {weather?.current?.uv_index_max || "-"}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="flex-grid-row">
                <div id="forcast-box">
                  <div>
                    <p>Forecast:</p>
                    {/* <p>Weekly: {weather?.daily?.temperature_2m_max || "-"}</p> */}
                  </div>
                </div>
                <div id="summary-box">
                  <div>
                    <p>Summary:</p>
                    <p>
                      Daily Forecast:{" "}
                      {/* {weather?.daily?.temperature_2m_min || "-"} */}
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
