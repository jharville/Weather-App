import "./CurrentWeatherBox.css";
import { getWeatherIcon } from "../getWeatherStatus.jsx";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { CurrentTime } from "./CurrentTime";
import { TbTemperatureFahrenheit } from "react-icons/tb";

export const CurrentWeatherBox = ({
  temperature,
  humidity = "-",
  rain = "-",
  windSpeed = "-",
  newCity,
  weatherFetchError,
  generalWeatherCondition,
  isLoading,
}) => {
  const formattedHumidity = humidity === 0 ? humidity : humidity || "-";
  const formattedWindSpeed = windSpeed === 0 ? windSpeed : windSpeed || "-";
  const formattedRain = rain === 0 ? rain : rain || "-";

  return weatherFetchError ? (
    <div id="error-message-current-box">{weatherFetchError}</div>
  ) : (
    <div id="current-weather-box-contents">
      <div id="current-weather-top-row-container">
        <p id="current-weather-in-text">Current Weather in:</p>
        <p id="current-weather-city-name">{newCity}</p>
        <div id="current-time">
          <CurrentTime />
        </div>
      </div>
      <div id="current-weather-middle-row-container">
        {getWeatherIcon(generalWeatherCondition)}
        <div id="current-weather-temp-container">
          <div>
            <h1 id="temp">
              {isLoading ? (
                <p id="temp-loading-text">Loading...</p>
              ) : (
                <div id="temp-and-fahrenheit-box">
                  {temperature}
                  <div id="fahrenheit-symbol">
                    <TbTemperatureFahrenheit />
                  </div>
                </div>
              )}
            </h1>
            <p id="current-weather-condition-text">{generalWeatherCondition}</p>
          </div>
        </div>
      </div>
      <div id="current-weather-bottom-row-container">
        <div id="bottom-current-box">
          <div id="humidity-value-and-percent-container">
            <p id="humidity-value">{formattedHumidity}</p>
            <p id="humidity-percent-sign">%</p>
          </div>

          <div id="humidity-icon">
            <WiHumidity />
          </div>
        </div>
        <div id="bottom-current-box">
          <div id="wind-value-mph-container">
            {formattedWindSpeed}
            <p id="wind-mph">mph</p>
          </div>
          <div id="wind-icon-message">
            <div id="wind-icon">
              <FaWind />
            </div>
          </div>
        </div>
        <div id="bottom-current-box">
          <div id="rain-value">
            <div id="rain-value-and-percent-container">
              {formattedRain}
              <p id="rain-percent-sign">%</p>
            </div>
          </div>
          <div id="rain-icon">
            <SiRainmeter />
          </div>
        </div>
      </div>
    </div>
  );
};
