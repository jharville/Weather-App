import "./ResultPage.css";
import { getWeatherLabel } from "../getWeatherStatus.jsx";
import BackgroundVideo from "../../assets/AdobeStock_712855701_Video_HD_Preview.mov";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchCity } from "../SearchCity.jsx";
import { useEffect, useState } from "react";
import { loadingStatuses, useWeatherFetch } from "../useWeatherFetch.js";
import { CurrentWeatherBox } from "./CurrentWeatherBox.jsx";
import { FaHome } from "react-icons/fa";
import { MapDisplay } from "./MapDisplay.jsx";
import { ForecastBox } from "./ForecastBox.jsx";
import { UVBox } from "./UVBox.jsx";
import { SummaryChart } from "./SummaryChart.jsx";

export const ResultPage = () => {
  const [, setSearchParams] = useSearchParams();
  const userSearchedCity = new URLSearchParams(window.location.search).get("city");

  const [userTextInput, setUserTextInput] = useState("");
  const trimmedInput = userTextInput.trim();

  const { weather, fetchWeather, loadingStatus, weatherFetchError } = useWeatherFetch();
  const isLoading = loadingStatus === loadingStatuses.loading;

  // sets the initial highlighted forecast date
  const [dayClickedIndex, setDayClickedIndex] = useState(0);
  const handleDayClick = (index) => {
    setDayClickedIndex(index);
  };

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUserTextInput("");
    setSearchParams({ city: trimmedInput });
  };

  const handleEnterPressSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setUserTextInput("");
      setSearchParams({ city: trimmedInput });
      handleSearchSubmit(event);
    }
  };

  const handleSuggestionClick = (city) => {
    const cityName = city.display_name;
    setUserTextInput("");
    setSearchParams({ city: cityName });
  };

  //For displaying only the city and country/city returned from the autofill.
  const [city, country] = (() => {
    const parts = userSearchedCity.split(",").map((part) => part.trim());
    if (parts.length === 1) {
      return [parts[0]]; // If there is only one part, it's assumed to be the city, with no country.
    } else if (parts.length > 2) {
      return [parts[0], parts[2]]; // If there are more than two parts, the third part is considered the country.
    } else {
      return [parts[0], parts[1]]; // If there are exactly two parts, the second part is considered the country or state.
    }
  })();

  useEffect(() => {
    if (userSearchedCity) {
      fetchWeather(userSearchedCity);
    }
  }, [userSearchedCity, fetchWeather]);

  const formattedUV = Math.round(weather?.daily?.uv_index_max[0]);
  const formattedSunHours = Math.round(weather?.daily?.sunshine_duration[0] / 3600);

  return (
    <>
      <video autoPlay loop muted id="background-video">
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <div id="for-centering-contents">
        <div id="whole-page-contents-plus-sidebar">
          <div id="side-bar">
            <button id="side-bar-home-icon" onClick={handleHomeClick}>
              <FaHome />
            </button>
          </div>
          <div id="whole-page-contents-without-sidebar">
            <div id="parent-of-flex-grid-container">
              <div id="flex-grid-containers-total">
                <div id="grid-row-w-search-bar">
                  <SearchCity
                    handleEnterPressSubmit={handleEnterPressSubmit}
                    handleSearchSubmit={handleSearchSubmit}
                    handleSuggestionClick={handleSuggestionClick}
                    userTextInput={userTextInput}
                    setUserTextInput={setUserTextInput}
                  />
                  <div id="map-uv-container-invisible" />
                </div>
                <div id="grid-row">
                  <div id="current-weather-box">
                    <CurrentWeatherBox
                      weatherFetchError={weatherFetchError}
                      newCity={`${city || ""} ${country || ""}`}
                      temperature={Math.round(weather?.current?.temperature_2m)}
                      generalWeatherCondition={getWeatherLabel(weather?.current?.weather_code)}
                      humidity={Math.round(weather?.current?.relative_humidity_2m)}
                      windSpeed={weather?.current?.wind_speed_10m}
                      rain={Math.round(weather?.current?.rain)}
                      isLoading={isLoading}
                    />
                  </div>
                  <div id="map-and-uv-container">
                    <div id="mapbox-container">
                      <MapDisplay />
                    </div>
                    <div id="uv-box">
                      <UVBox
                        uvValue={formattedUV}
                        isLoading={isLoading}
                        sunDuration={formattedSunHours}
                      />
                    </div>
                  </div>
                </div>
                <div id="grid-row">
                  <div id="forecast-box">
                    <div>
                      <ForecastBox
                        WeatherIcon={weather?.daily?.weather_code}
                        minTemp={weather?.daily?.temperature_2m_min}
                        maxTemp={weather?.daily?.temperature_2m_max}
                        forecastDate={weather?.daily?.time}
                        isLoading={isLoading}
                        dayClicked={handleDayClick}
                      />
                    </div>
                  </div>
                  <div id="summary-box">
                    <SummaryChart
                      isLoading={isLoading}
                      temps={weather?.hourly?.temperature_2m}
                      rain={weather?.hourly?.precipitation_probability}
                      dayClickedIndex={dayClickedIndex}
                      forecastDate={weather?.daily?.time}
                    />
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

// const victoryAreaTempData = [
//   { time: "a", temp: 60 },
//   { time: "12 A.M.", temp: selectedDayTemps?.[0] },
//   { time: "2 A.M.", temp: selectedDayTemps?.[2] },
//   { time: "4 A.M.", temp: selectedDayTemps?.[4] },
//   { time: "6 A.M.", temp: selectedDayTemps?.[6] },
//   { time: "8 A.M.", temp: selectedDayTemps?.[8] },
//   { time: "10 A.M.", temp: selectedDayTemps?.[10] },
//   { time: "12 P.M.", temp: selectedDayTemps?.[12] },
//   { time: "2 P.M.", temp: selectedDayTemps?.[14] },
//   { time: "4 P.M.", temp: selectedDayTemps?.[16] },
//   { time: "6 P.M.", temp: selectedDayTemps?.[18] },
//   { time: "8 P.M.", temp: selectedDayTemps?.[20] },
//   { time: "10 P.M.", temp: selectedDayTemps?.[22] },
//   { time: "b", temp: 60 },
// ];

// const hourlyRainChanceData = [
//   { time: "a", chance: "" },
//   { time: summaryDate, chance: "Rain %" },
//   { time: "12 A.M.", chance: `${selectedDayRainChance?.[0]} %` },
//   { time: "2 A.M.", chance: `${selectedDayRainChance?.[2]} %` },
//   { time: "4 A.M.", chance: `${selectedDayRainChance?.[4]} %` },
//   { time: "6 A.M.", chance: `${selectedDayRainChance?.[6]} %` },
//   { time: "8 A.M.", chance: `${selectedDayRainChance?.[8]} %` },
//   { time: "10 A.M.", chance: `${selectedDayRainChance?.[10]} %` },
//   { time: "12 P.M.", chance: `${selectedDayRainChance?.[12]} %` },
//   { time: "2 P.M.", chance: `${selectedDayRainChance?.[14]} %` },
//   { time: "4 P.M.", chance: `${selectedDayRainChance?.[16]} %` },
//   { time: "6 P.M.", chance: `${selectedDayRainChance?.[18]} %` },
//   { time: "8 P.M.", chance: `${selectedDayRainChance?.[20]} %` },
//   { time: "10 P.M.", chance: `${selectedDayRainChance?.[22]} %` },
//   { time: "Next Day", chance: "" },
// ];

// // SummaryChart logic. Note: time elements on both victoryAreaTempData
// // and hourlyRainChanceData must be synchronous, or else the graph will not display correctly

// // For indexing temp variables
// const startHour = dayClickedIndex * 24;
// const endHour = startHour + 24;
// const formatIndex = (index) => {
//   let formattedIndex;
//   if (index === 0) {
//     formattedIndex = "12 A.M.";
//   } else if (index === 12) {
//     formattedIndex = "12 P.M.";
//   } else if (index < 12) {
//     formattedIndex = `${index} A.M.`;
//   } else {
//     formattedIndex = `${index - 12} P.M.`;
//   }
//   return formattedIndex;
// };

// const dayTemps = weather?.hourly?.temperature_2m
//   .slice(startHour, endHour)
//   .map((temp) => Math.round(temp));

// const returnEvenIndex = (index) => index % 2 === 0;

// // formerly mappedDayTemps
// const totalDayTemps = (dayTemps || []).slice(0, 24).map((temp, index) => {
//   return { time: formatIndex(index), temp };
// });
// const evenDayTemps = (dayTemps || [])
//   .slice(0, 24)
//   .map((temp, index) => (returnEvenIndex(index) ? { time: formatIndex(index), temp } : null))
//   .filter((item) => item !== null);

// const summaryTempArray = [{ time: "a", temp: 60 }, ...totalDayTemps, { time: "b", temp: 60 }];
// // This is to add a and b, both invisible entries to the array to prevent extreme sloping.

// const hourlyTempArray = [{ time: "a", temp: 60 }, ...evenDayTemps, { time: "b", temp: 60 }];
// // This is to add a and b, both invisible entries to the array to prevent extreme sloping.

// const summaryDate = weather?.daily?.time[dayClickedIndex]
//   ? format(parseISO(weather.daily.time[dayClickedIndex]), "EEE, do")
//   : "";

// const rainChance = weather?.hourly?.precipitation_probability
//   .slice(startHour, endHour)
//   .map((chance) => Math.round(chance));

// // formerly mappedRainChance
// const totalRainChances = (rainChance || [])
//   .slice(0, 24)
//   .map((chance, index) => {
//     return { time: formatIndex(index), chance: chance + " %" };
//   })
//   .filter((item) => item !== null);

// const evenRainChances = (rainChance || [])
//   .slice(0, 24)
//   .map((chance, index) => {
//     return returnEvenIndex(index)
//       ? {
//           time: formatIndex(index),
//           chance: chance + " %",
//         }
//       : null;
//   })
//   .filter((item) => item !== null);

// const summaryRainChanceArray = [
//   { time: "a", chance: "" },
//   { time: summaryDate, chance: "Rain Chance" },
//   ...totalRainChances,
//   { time: "Next Day", chance: "" },
//   // This is to add "a" (invisible), summaryDate, and Next Day, to the array.
// ];

// const hourlyRainChanceArray = [
//   { time: "a", chance: "" },
//   { time: summaryDate, chance: "Rain Chance" },
//   ...evenRainChances,
//   { time: "Next Day", chance: "" },
//   // This is to add "a" (invisible), summaryDate, and Next Day, to the array.
// ];
