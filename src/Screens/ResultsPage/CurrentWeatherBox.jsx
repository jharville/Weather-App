import "./CurrentWeatherBox.css";
import { getWeatherIcon } from "../getWeatherStatus.jsx";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { CurrentTime } from "./CurrentTime";

// "-" is given to props as a default value to ensure a fallback
export const CurrentWeatherBox = ({
  isLoading,
  isLoadingDone,
  isLoadingRejected,
  temperature,
  humidity = "-",
  rain = "-",
  windSpeed = "-",
  newCity,
  weatherFetchError,
  generalWeatherCondition,
}) => {
  const formattedHumidity = humidity === 0 ? humidity : humidity || null;
  const formattedWindSpeed = windSpeed === 0 ? windSpeed : windSpeed || null;
  const formattedRain = rain === 0 ? rain : rain || null;
  const formattedTemperature = temperature === 0 ? temperature : temperature || null;
  const generalWeatherIcon =
    isLoadingDone && !isLoadingRejected ? getWeatherIcon(generalWeatherCondition) : null;

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
        {generalWeatherIcon}
        <div id="current-weather-temp-container">
          <div>
            <h1 id="temp">
              {isLoading ? (
                <p id="temp-loading-text">Loading...</p>
              ) : (
                <div id="temp-and-fahrenheit-box">
                  {formattedTemperature}
                  <p id="fahrenheit-symbol">{`\u00B0F`}</p>
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
          <div id="rain-value-and-percent-container">
            {formattedRain}
            <p id="rain-percent-sign">%</p>
          </div>
          <div id="rain-icon">
            <SiRainmeter />
          </div>
        </div>
      </div>
    </div>
  );
};
