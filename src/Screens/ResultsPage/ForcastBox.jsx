import "./ForcastBox.css";
import { getWeatherIcon, getWeatherLabel } from "../getWeatherStatus.jsx";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { useState, useRef } from "react";
import { FormattedDate } from "../FormattedDate.jsx";
import { LoadingIcon } from "../LoadingIcon.jsx";

export const ForcastBox = ({ WeatherIcon, maxTemp, minTemp, forcastDate, isLoading }) => {
  const scrollContainerRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(7);
  const [buttonParam, setButtonParam] = useState(7);

  const handleSelectDay = (param) => {
    const paramSelect = Number(param);
    setSelectedDay(paramSelect);
    setButtonParam(paramSelect === 7 ? 7 : 14);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const day7Class = selectedDay === 7 ? "clicked" : "";
  const day14Class = selectedDay === 14 ? "clicked" : "";
  const forecastDaysClass = selectedDay === 7 ? "hide-scrollbar" : "";

  const isValidForecast = forcastDate?.length;

  return (
    <div id="forcast-box-contents-container">
      <div id="contents-gap">
        <div id="forcast-text-and-day-selector-container">
          <p id="forcast-text">Forecast</p>
          {isValidForecast && (
            <div id="day-selector-container">
              <button
                id="day-param-select"
                className={day7Class}
                onClick={() => handleSelectDay(7)}
              >
                <p>7 Days</p>
              </button>
              <button
                id="day-param-select"
                className={day14Class}
                onClick={() => handleSelectDay(14)}
              >
                <p>14 Days</p>
              </button>
            </div>
          )}
        </div>
        <div id="forcast-days-container" className={forecastDaysClass} ref={scrollContainerRef}>
          <div id="clickable-days-container">
            {isLoading ? (
              <div id="loading-icon-forcast-box">
                <LoadingIcon />
              </div>
            ) : isValidForecast ? (
              forcastDate.slice(0, buttonParam).map((eachIndividualDate, dateID) => (
                <div key={dateID} id="clickable-forcast-day">
                  <div id="icon-and-high-low-container">
                    <div id="weather-icon-styling">
                      {getWeatherIcon(getWeatherLabel(WeatherIcon[dateID]))}
                    </div>
                    <div id="temp-high-low-and-f-symbol">
                      <p id="temp-high-low-styling">
                        {Math.round(minTemp[dateID])} / {Math.round(maxTemp[dateID])}
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
              ))
            ) : (
              <p id="error-message-forcast-box">No Data Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
