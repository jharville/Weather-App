import "./ForecastBox.css";
import { getWeatherIcon, getWeatherLabel } from "../getWeatherStatus.jsx";
import { useState, useRef } from "react";
import { format, parseISO } from "date-fns";
import { LoadingIcon } from "../LoadingIcon.jsx";

const daySpanOptions = {
  7: 7,
  14: 14,
};

// this is just being turned into an array so we can map over it
const daySpanOptionsArr = Object.values(daySpanOptions);

export const ForecastBox = ({
  WeatherIcon,
  maxTemp,
  minTemp,
  forecastDates,
  isLoading,
  dayClicked,
}) => {
  const scrollContainerRef = useRef(null);
  const [selectedDaySpanOption, setSelectedDaySpanOption] = useState(daySpanOptions[7]);
  const [currentClickedDayIndex, setCurrentClickedDayIndex] = useState(0);

  const handleSelectOption = (selectedOption) => {
    setSelectedDaySpanOption(selectedOption);
    setCurrentClickedDayIndex(null);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleDayClick = (index) => {
    setCurrentClickedDayIndex(index);
    dayClicked(index);
  };

  const forecastDaysClass = selectedDaySpanOption <= daySpanOptions[7] ? "hide-scrollbar" : "";
  const isValidForecast = !!forecastDates?.length;

  return (
    <div id="forecast-box-contents-container">
      <div id="contents-gap">
        <div id="forecast-text-and-day-selector-container">
          <p id="forecast-text">Forecast</p>
          {isValidForecast && (
            <div id="day-selector-container">
              {daySpanOptionsArr.map((option, index) => {
                const isSelected = selectedDaySpanOption === option;
                const label = `${option} Day`;
                return (
                  <button
                    key={index}
                    id="day-param-select"
                    className={isSelected ? "clicked" : ""}
                    onClick={() => handleSelectOption(option)}
                  >
                    <p>{label}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div id="forecast-days-container" className={forecastDaysClass} ref={scrollContainerRef}>
          <div id="clickable-days-container">
            {isLoading ? (
              <div id="loading-icon-forecast-box">
                <LoadingIcon />
              </div>
            ) : isValidForecast ? (
              forecastDates.slice(0, selectedDaySpanOption).map((eachIndividualDate, index) => (
                <div
                  key={index}
                  id="clickable-forecast-day"
                  className={currentClickedDayIndex === index ? "dayClicked" : ""}
                  onClick={() => handleDayClick(index)}
                >
                  <div id="icon-and-high-low-container">
                    <div id="weather-icon-styling">
                      {getWeatherIcon(getWeatherLabel(WeatherIcon[index]))}
                    </div>
                    <div id="temp-high-low-and-f-symbol">
                      <p id="temp-high-low-styling">
                        {Math.round(minTemp[index])} / {Math.round(maxTemp[index]) + ` \u00B0F`}
                      </p>
                    </div>
                  </div>
                  <div id="year-month-day-container">
                    {format(parseISO(eachIndividualDate), "EEE, MMM do")}
                  </div>
                </div>
              ))
            ) : (
              <p id="error-message-forecast-box">No Data Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
