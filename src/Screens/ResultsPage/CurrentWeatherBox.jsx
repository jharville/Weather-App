import "./CurrentWeatherBox.css";
import { getWeatherIcon } from "./getWeatherStatus.jsx";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { CurrentTime } from "./CurrentTime";
import { TbTemperatureFahrenheit } from "react-icons/tb";

const tempLoadingStyle = {
  fontSize: "0.5em",
  color: "#27FF00",
  paddingRight: "20px",
  paddingBottom: "10px",
};

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
  return weatherFetchError ? (
    <div id="error-message-current-box">{weatherFetchError}</div>
  ) : (
    <div id="current-weather-box-contents">
      <div id="current-weather-top-row-container">
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
                <p style={tempLoadingStyle}>Loading...</p>
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
          {humidity != null ? (
            <div id="humidity-value-and-percent-container">
              <p id="humidity-value">{humidity}</p>
              <p id="humidity-percent-sign">%</p>
            </div>
          ) : null}
          <div id="humidity-icon">
            <WiHumidity />
          </div>
        </div>
        <div id="bottom-current-box">
          {windSpeed != null ? (
            <div id="wind-value-mph-container">
              {windSpeed}
              <p id="wind-mph">mph</p>
            </div>
          ) : null}
          <div id="wind-icon-message">
            <div id="wind-icon">
              <FaWind />
            </div>
          </div>
        </div>
        <div id="bottom-current-box">
          <p id="rain-value">
            {rain != null ? (
              <div id="rain-value-and-percent-container">
                {rain}
                <p id="rain-percent-sign">%</p>
              </div>
            ) : null}
          </p>
          <div id="rain-icon">
            <SiRainmeter />
          </div>
        </div>
      </div>
    </div>
  );
};
