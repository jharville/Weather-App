import { useState, useEffect } from "react";
import "./CurrentWeatherBox.css";
import { getWeatherIcon } from "../getWeatherStatus.jsx";
import { WiHumidity } from "react-icons/wi";
import ReactAnimatedWeather from "react-animated-weather";
import { LoadingIcon } from "../LoadingIcon.jsx";
import { format, parseISO, addMinutes } from "date-fns";
import { SunPositionTracker } from "./SunPositionTracker";

const windIcon = {
  icon: "WIND",
  color: "white",
  size: 52,
  animate: true,
};

export const CurrentWeatherBox = ({
  isLoading,
  isLoadingDone,
  weather,
  temperature,
  humidity,
  windSpeed,
  newCity,
  weatherFetchError,
  generalWeatherCondition,
}) => {
  // Per chat, and my experience, the time returned from open-mateo is not always updated in real time.
  // The hour is always correct and the local times around the world are correct, but the minutes are up to 10 minutes off.
  // In addition, it seems like the results of the time are being cached. I'm not sure how, because the weather fetch is setup to prevent that.
  // This is frustrating because if you log the time via weather?.current?.time, you'll see that other variables
  // update but time doesn't. I may need to use another package for time. I'd like your opinion here.

  const [incrementedTime, setIncrementedTime] = useState(null);
  const rawTime = weather?.current?.time;
  useEffect(() => {
    if (rawTime) {
      const initialTime = parseISO(rawTime);
      setIncrementedTime(initialTime);
      const interval = setInterval(() => {
        setIncrementedTime((previousTime) => addMinutes(previousTime, 1));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [rawTime]);

  const formattedTime = incrementedTime
    ? format(incrementedTime, "h:mm a")
    : null;

  const formattedHumidity = humidity || null;
  const formattedWindSpeed = windSpeed || null;
  const formattedTemperature = temperature || null;
  const generalWeatherIcon = isLoadingDone
    ? getWeatherIcon(generalWeatherCondition)
    : null;

  return weatherFetchError ? (
    <div id="error-message-current-box">{weatherFetchError}</div>
  ) : isLoading ? (
    <div id="loading-text-and-icon">
      <p id="loading-text">Loading</p>
      <LoadingIcon />
    </div>
  ) : (
    <div id="current-weather-box-contents">
      <div id="current-weather-top-row-container">
        <p id="current-weather-in-text">Current Weather in:</p>
        <p id="current-weather-city-name">{newCity}</p>
        <div id="current-time">{formattedTime}</div>
      </div>

      <div id="current-weather-middle-row-container">
        <div id="current-icon-status-container">{generalWeatherIcon}</div>
        <div id="current-weather-temp-container">
          <div>
            <h1 id="temp">
              <div id="temp-and-fahrenheit-box">
                <span id="minus-symbol">
                  {formattedTemperature < 0 ? "-" : ""}
                </span>
                {Math.abs(formattedTemperature)}
                <p id="fahrenheit-symbol">{`\u00B0F`}</p>
              </div>
            </h1>
            <p id="current-weather-condition-text">{generalWeatherCondition}</p>
          </div>
        </div>
      </div>

      <div id="current-weather-bottom-row-container">
        <div id="sun-tracker-message">
          <div id="bottom-element-box">
            <SunPositionTracker
              sunriseTime={weather?.daily?.sunrise[0]}
              sunsetTime={weather?.daily?.sunset[0]}
              currentTime={weather?.current?.time}
            />
          </div>
        </div>
        <div id="bottom-element-box">
          <div id="wind-value-mph-container">
            {formattedWindSpeed}
            <p id="wind-mph">mph</p>
          </div>
          <div id="wind-icon-message">
            <div id="wind-icon">
              <ReactAnimatedWeather
                icon={windIcon.icon}
                color={windIcon.color}
                size={windIcon.size}
                animate={windIcon.animate}
              />
            </div>
          </div>
        </div>
        <div id="bottom-element-box">
          <div id="humidity-value-and-percent-container">
            <p id="humidity-value">{formattedHumidity}</p>
            <p id="humidity-percent-sign">%</p>
          </div>
          <div id="humidity-icon">
            <WiHumidity />
          </div>
        </div>
      </div>
    </div>
  );
};
