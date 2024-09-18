import "./ForcastBox.css";
import { getWeatherIcon, getWeatherLabel } from "../getWeatherStatus.jsx";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { useState, useRef } from "react";
import { FormattedDate } from "../FormattedDate.jsx";
import { LoadingIcon } from "../LoadingIcon.jsx";

const daySpanOptions = {
  7: 7,
  14: 14,
};

const daySpanOptionsArr = Object.values(daySpanOptions);

export const ForcastBox = ({
  WeatherIcon,
  maxTemp,
  minTemp,
  forcastDate,
  isLoading,
}) => {
  const scrollContainerRef = useRef(null);
  const [selectedDaySpanOption, setSelectedDaySpanOption] = useState(
    daySpanOptions[7]
  );

  const handleSelectOption = (selectedOption) => {
    setSelectedDaySpanOption(selectedOption);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const forecastDaysClass =
    selectedDaySpanOption <= daySpanOptions[7] ? "hide-scrollbar" : "";

  const isValidForecast = forcastDate?.length;

  return (
    <div id="forcast-box-contents-container">
      <div id="contents-gap">
        <div id="forcast-text-and-day-selector-container">
          <p id="forcast-text">Forecast</p>
          {isValidForecast && (
            <div id="day-selector-container">
              {daySpanOptionsArr.map((option, index) => {
                const isSelected = selectedDaySpanOption === option;
                const label = option === 1 ? `${option} Day` : `${option} Day`;
                return (
                  <button
                    key={index}
                    id="day-param-select"
                    className={isSelected && "clicked"}
                    onClick={() => handleSelectOption(option)}
                  >
                    <p>{label}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div
          id="forcast-days-container"
          className={forecastDaysClass}
          ref={scrollContainerRef}
        >
          <div id="clickable-days-container">
            {isLoading ? (
              <div id="loading-icon-forcast-box">
                <LoadingIcon />
              </div>
            ) : isValidForecast ? (
              forcastDate
                .slice(0, selectedDaySpanOption)
                .map((eachIndividualDate, index) => (
                  <div key={index} id="clickable-forcast-day">
                    <div id="icon-and-high-low-container">
                      <div id="weather-icon-styling">
                        {getWeatherIcon(getWeatherLabel(WeatherIcon[index]))}
                      </div>
                      <div id="temp-high-low-and-f-symbol">
                        <p id="temp-high-low-styling">
                          {Math.round(minTemp[index])} /{" "}
                          {Math.round(maxTemp[index])}
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
