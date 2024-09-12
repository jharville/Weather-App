import "./ForcastBox.css";
import { getWeatherIcon, getWeatherLabel } from "../getWeatherStatus";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import LoadingIcons from "react-loading-icons";
import { useState, useEffect, useRef } from "react";
import { FormattedDate } from "./FormattedDate.jsx";

export const ForcastBox = ({
  WeatherIcon,
  maxTemp,
  minTemp,
  forcastDate,
  isLoading,
  weatherFetchError,
}) => {
  const scrollContainerRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState("7");
  const [daysParam, setDaysParam] = useState(7);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setDaysParam(day === "7" ? 7 : 14);
  };

  const day7Class = selectedDay === "7" ? "clicked" : "";
  const day14Class = selectedDay === "14" ? "clicked" : "";
  const forecastDaysClass = selectedDay === "7" ? "hide-scrollbar" : "";

  const isValidForecast = forcastDate?.length > 0;

  const loadingIcon = (
    <LoadingIcons.ThreeDots style={{ width: "50px", height: "50px" }} />
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [daysParam]);

  return weatherFetchError ? (
    <div id="error-message-current-box">{weatherFetchError}</div>
  ) : isLoading ? (
    <div>{loadingIcon}</div>
  ) : isValidForecast ? (
    <div id="forcast-box-contents-container">
      <div id="contents-gap">
        <div id="forcast-text-and-day-selector-container">
          <p id="forcast-text">Forecast</p>
          <div id="day-selector-container">
            <button
              id="day-param-select"
              className={day7Class}
              onClick={() => handleDaySelect("7")}
            >
              <p>7 Days</p>
            </button>
            <button
              id="day-param-select"
              className={day14Class}
              onClick={() => handleDaySelect("14")}
            >
              <p>14 Days</p>
            </button>
          </div>
        </div>
        <div
          id="forcast-days-container"
          className={forecastDaysClass}
          ref={scrollContainerRef}
        >
          <div id="clickable-days-container">
            {forcastDate
              .slice(0, daysParam)
              .map((eachIndividualDate, dateID) => (
                <div key={dateID} id="clickable-forcast-day">
                  <div id="icon-and-high-low-container">
                    <div id="weather-icon-styling">
                      {getWeatherIcon(getWeatherLabel(WeatherIcon[dateID]))}
                    </div>
                    <div id="temp-high-low-and-f-symbol">
                      <p id="temp-high-low-styling">
                        {Math.round(minTemp[dateID])} /{" "}
                        {Math.round(maxTemp[dateID])}
                      </p>
                      <div id="fahrenheit-symbol">
                        <TbTemperatureFahrenheit />
                      </div>
                    </div>
                  </div>
                  <div id="year-month-day-container">
                    <FormattedDate acceptedDate={eachIndividualDate} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
