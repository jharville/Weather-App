import "./ForcastBox.css";
import { getWeatherIcon, getWeatherLabel } from "../getWeatherStatus.jsx";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { useState, useRef } from "react";
import { FormattedDate } from "../FormattedDate.jsx";
import { LoadingIcon } from "../LoadingIcon.jsx";
// I have logic numbered in this file just incase you want to read the logic in order. 
// search 1H, 2H, 3H etc in this file to see them

export const ForcastBox = ({
  WeatherIcon,
  maxTemp,
  minTemp,
  forcastDate,
  isLoading,
}) => {
  const scrollContainerRef = useRef(null);
  const [selectedDaySpanOption, setSelectedDaySpanOption] = useState(daySpanOptions[7]);

  // 3H
  const handleSelectOption = (selectedOption) => {
    // since we're using the daySpanOptionsArr array, and it's values are numbers, we get to side-step
    // all of the type conversion logic here. We're just working with numbers, simple.
    // Since we simplified the logic & got rid of one of the useStates, we can just update the one state variable
    // & it will drive everything else.
    setSelectedDaySpanOption(selectedOption)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const forecastDaysClass = selectedDaySpanOption <= daySpanOptions[7] ? "hide-scrollbar" : "";

  const isValidForecast = forcastDate?.length;

  return (
    <div id="forcast-box-contents-container">
      <div id="contents-gap">
        <div id="forcast-text-and-day-selector-container">
          <p id="forcast-text">Forecast</p>
           {isValidForecast && (
             <div id="day-selector-container">
              {daySpanOptionsArr.map((option, index) => {
              // 4H
              // This is what I really like about .map() for options.
              // In here we can use the option that gets passed in to decide everything.
              // we also can get rid of the className variables that were in this file 
              // since we can just compare each option individually to the selected option.
                const isSelected = selectedDaySpanOption === option;
                const label = option === 1 ? `${option} Day` : `${option} Day`
                return (
              <button
              key={index}
                id="day-param-select"
                className={isSelected && "clicked"}
                onClick={() => handleSelectOption(option)}
              >
                <p>{label}</p>
              </button>
                )
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
                // 5H
                // renamed this to i instead of dateID since it's just an index
                .map((eachIndividualDate, i) => (
                  <div key={i} id="clickable-forcast-day">
                    <div id="icon-and-high-low-container">
                      <div id="weather-icon-styling">
                        {getWeatherIcon(getWeatherLabel(WeatherIcon[i]))}
                      </div>
                      <div id="temp-high-low-and-f-symbol">
                        <p id="temp-high-low-styling">
                          {Math.round(minTemp[i])} /{" "}
                          {Math.round(maxTemp[i])}
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

// 1H
// daySpanOptions easily controls all the options for this component. If you want additional options,
// you can add them here.
const daySpanOptions = {
  7: 7,
  14: 14,
}

// 2H
// daySpanOptionsArr is something that I find useful. This converts our daySpanOptions object into 
// an array of the values for each property. If our object was
// {
//   7: 'bar',
//   14: 14,
// }
// then this array would be ['bar', 14];
// we can also use Object.keys() to do the same but use the keys from each property instead.
// the reason I like doing this is because now instead of having to write out each individual button
// we can just map over the options. Makes it really quick and simple if any updates are needed.
const daySpanOptionsArr = Object.values(daySpanOptions);

// _________ORIGINAL BELOW_________

// import "./ForcastBox.css";
// import { getWeatherIcon, getWeatherLabel } from "../getWeatherStatus.jsx";
// import { TbTemperatureFahrenheit } from "react-icons/tb";
// import { useState, useRef } from "react";
// import { FormattedDate } from "../FormattedDate.jsx";
// import { LoadingIcon } from "../LoadingIcon.jsx";

// export const ForcastBox = ({
//   WeatherIcon,
//   maxTemp,
//   minTemp,
//   forcastDate,
//   isLoading,
// }) => {
//   const scrollContainerRef = useRef(null);
//   const [selectedDay, setSelectedDay] = useState(7);
//   const [buttonParam, setButtonParam] = useState(7);

//   const handleSelectDay = (param) => {
//     const paramSelect = Number(param);
//     setSelectedDay(paramSelect);
//     setButtonParam(paramSelect === 7 ? 7 : 14);
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollTop = 0;
//     }
//   };

//   const day7Class = selectedDay === 7 ? "clicked" : "";
//   const day14Class = selectedDay === 14 ? "clicked" : "";
//   const forecastDaysClass = selectedDay === 7 ? "hide-scrollbar" : "";

//   const isValidForecast = forcastDate?.length;

//   return (
//     <div id="forcast-box-contents-container">
//       <div id="contents-gap">
//         <div id="forcast-text-and-day-selector-container">
//           <p id="forcast-text">Forecast</p>
//           {isValidForecast && (
//             <div id="day-selector-container">
//               <button
//                 id="day-param-select"
//                 className={day7Class}
//                 onClick={() => handleSelectDay(7)}
//               >
//                 <p>7 Days</p>
//               </button>
//               <button
//                 id="day-param-select"
//                 className={day14Class}
//                 onClick={() => handleSelectDay(14)}
//               >
//                 <p>14 Days</p>
//               </button>
//             </div>
//           )}
//         </div>
//         <div
//           id="forcast-days-container"
//           className={forecastDaysClass}
//           ref={scrollContainerRef}
//         >
//           <div id="clickable-days-container">
//             {isLoading ? (
//               <div id="loading-icon-forcast-box">
//                 <LoadingIcon />
//               </div>
//             ) : isValidForecast ? (
//               forcastDate
//                 .slice(0, buttonParam)
//                 .map((eachIndividualDate, dateID) => (
//                   <div key={dateID} id="clickable-forcast-day">
//                     <div id="icon-and-high-low-container">
//                       <div id="weather-icon-styling">
//                         {getWeatherIcon(getWeatherLabel(WeatherIcon[dateID]))}
//                       </div>
//                       <div id="temp-high-low-and-f-symbol">
//                         <p id="temp-high-low-styling">
//                           {Math.round(minTemp[dateID])} /{" "}
//                           {Math.round(maxTemp[dateID])}
//                         </p>
//                         <div id="fahrenheit-symbol">
//                           <TbTemperatureFahrenheit />
//                         </div>
//                       </div>
//                     </div>
//                     <div id="year-month-day-container">
//                       <FormattedDate acceptedDate={eachIndividualDate} />
//                     </div>
//                   </div>
//                 ))
//             ) : (
//               <p id="error-message-forcast-box">No Data Available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
