import { useState, useCallback } from "react";
import axios from "axios";

export const loadingStatuses = {
  idle: "idle",
  loading: "loading",
  fulfilled: "fulfilled",
};

/**
 * useWeatherFetch is a hook for fetching weather variables from the Open Mateo API.
 * This destructured hook returns the following values:
 * 
weather:
Type: Object or Null.
Description: Contains the weather data retrieved from the API. Initially, it's null before any data is fetched. 
Once data is fetched successfully, it holds the weather data structure returned from the Open Meteo API.

fetchWeather:
Type: Function.
Description: A function that takes a cityName as an argument and initiates the process of fetching weather data for that city. 
This function performs the API requests to retrieve geographical coordinates and weather data, handles errors, and updates the states accordingly.

weatherFetchError:
Type: String or Null.
Description: Contains an error message if an error occurs during the fetch operation.
It is null if no errors occur or if the weather data is successfully fetched.

loadingStatus:
Type: String.
Description: Indicates the current status of the fetching operation. It can be one of the following:
Idle: No fetch operation is currently in progress.
Loading: The fetch operation is in progress.
Fulfilled: The fetch operation has completed, either successfully or with an error.
 */
export const useWeatherFetch = () => {
  const [weather, setWeather] = useState(null);
  const [weatherFetchError, setWeatherFetchError] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(loadingStatuses.idle);

  const fetchWeather = useCallback(async (cityName) => {
    setWeatherFetchError(null);
    try {
      setLoadingStatus(loadingStatuses.loading);
      const geographicalCoordinatesResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`
      );
      if (geographicalCoordinatesResponse.data.length === 0) {
        setWeatherFetchError("City not found. Please check the city name.");
      }
      const { lat, lon } = geographicalCoordinatesResponse.data[0];
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=14&timezone=auto`
      );
      console.log("City entered:", cityName);
      console.log("Here's the Weather Data Retrieved", weatherResponse.data);
      setWeather(weatherResponse.data);
    } catch (Error1) {
      console.log(Error1, "City name entered:", cityName);
      setWeather(null);
    } finally {
      setLoadingStatus(loadingStatuses.fulfilled);
    }
  }, []);
  return { weather, fetchWeather, weatherFetchError, loadingStatus };
};
