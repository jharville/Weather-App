import { useState, useCallback } from "react";
import axios from "axios";

export const useWeatherFetch = () => {
  const [weather, setWeather] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fetchWeather = useCallback(async (cityName) => {
    try {
      setFetchError(null);
      const geographicalCoordinatesResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`
      );
      if (geographicalCoordinatesResponse.data.length === 0) {
        throw new Error("City Not Found");
      }
      const { lat, lon } = geographicalCoordinatesResponse.data[0];
      if (lat === 0 && lon === 0) {
        throw new Error("City Not Found");
      }
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m&daily=weather_code,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`
      );
      console.log("City Entered:", cityName);
      console.log("Here's the Weather Data Retrieved", weatherResponse.data);
      setWeather(weatherResponse.data);
    } catch (err) {
      setFetchError(err.message);
      setWeather(null);
    }
  }, []);

  return { weather, fetchWeather, fetchError };
};
