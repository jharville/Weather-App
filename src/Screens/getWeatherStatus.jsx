import { FaSun } from "react-icons/fa";
import { CiCloudSun } from "react-icons/ci";
import { BsClouds } from "react-icons/bs";
import { BsCloudFog2 } from "react-icons/bs";
import { WiDayCloudy } from "react-icons/wi";
import { PiCloudRain } from "react-icons/pi";
import { PiCloudRainBold } from "react-icons/pi";
import { BsCloudLightningRain } from "react-icons/bs";
import { BsCloudRainHeavyFill } from "react-icons/bs";
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
import { BsCloudLightningRainFill } from "react-icons/bs";
import { BsCloudSnow } from "react-icons/bs";
import { FaRegSnowflake } from "react-icons/fa";

export const weatherStatuses = {
  clear: "Clear",
  mainlyClear: "Mainly Clear",
  partlyCloudy: "partly cloudy",
  overcast: "Cloudy",
  foggy: "Foggy",
  drizzlingLightly: "Light Drizzle",
  drizzlingModeratly: "Moderate Drizzle",
  drizzlingDense: "Dense Drizzle",
  drizzlingFreezingLight: "Light Freezing Drizzle",
  drizzlingFreezingDense: "Dense Freezing Drizzle",
  rainingLight: "Light Rain",
  rainingModerate: "Moderate Rain",
  rainingHeavy: "Heavy Rain",
  freezingRainLight: "Light Freezing Rain",
  freezingRainHeavy: "Heavy Freezing Rain",
  snowFallLight: "Light Snowing Fall",
  snowFallModerate: "Moderate Snow Fall",
  snowFallHeavy: "Heavy Snow Fall",
  snowShowersLight: "Light Snow Showers",
  snowShowersHeavy: "Heavy Snow Showers",
  snowGrains: "Snow Grains",
  rainShowersLight: "Slight Rain Showers",
  rainShowersModerate: "Moderate Rain Showers",
  rainShowersViolent: "Violent Rain Showers",
  thunderstorms: "Thunderstorms",
  thunderstormsLightHail: "Thunderstorms with Light Hail",
  thunderstormsHeavyHail: "Thunderstorms with Heavy Hail",
};

// Weather Codes pulled from Open Mateo
export const WMOs = [
  { WMOCodes: [0], label: weatherStatuses.clear },
  { WMOCodes: [1], label: weatherStatuses.mainlyClear },
  { WMOCodes: [2], label: weatherStatuses.partlyCloudy },
  { WMOCodes: [3], label: weatherStatuses.overcast },
  { WMOCodes: [45, 48], label: weatherStatuses.foggy },
  { WMOCodes: [51], label: weatherStatuses.drizzlingLightly },
  { WMOCodes: [53], label: weatherStatuses.drizzlingModeratly },
  { WMOCodes: [55], label: weatherStatuses.drizzlingDense },
  { WMOCodes: [56], label: weatherStatuses.drizzlingFreezingLight },
  { WMOCodes: [57], label: weatherStatuses.drizzlingFreezingDense },
  { WMOCodes: [61], label: weatherStatuses.rainingLight },
  { WMOCodes: [63], label: weatherStatuses.rainingModerate },
  { WMOCodes: [65], label: weatherStatuses.rainingHeavy },
  { WMOCodes: [66], label: weatherStatuses.freezingRainLight },
  { WMOCodes: [67], label: weatherStatuses.freezingRainHeavy },
  { WMOCodes: [71], label: weatherStatuses.snowFallLight },
  { WMOCodes: [73], label: weatherStatuses.snowFallModerate },
  { WMOCodes: [75], label: weatherStatuses.snowFallHeavy },
  { WMOCodes: [85], label: weatherStatuses.snowShowersLight },
  { WMOCodes: [86], label: weatherStatuses.snowShowersHeavy },
  { WMOCodes: [77], label: weatherStatuses.snowGrains },
  { WMOCodes: [80], label: weatherStatuses.rainShowersLight },
  { WMOCodes: [81], label: weatherStatuses.rainShowersModerate },
  { WMOCodes: [82], label: weatherStatuses.rainShowersViolent },
  { WMOCodes: [95], label: weatherStatuses.thunderstorms },
  { WMOCodes: [96], label: weatherStatuses.thunderstormsLightHail },
  { WMOCodes: [99], label: weatherStatuses.thunderstormsHeavyHail },
];

// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 85, 86	Snow showers slight and heavy
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail

/**
 * Stored in getWeatherSatus file.
 * Retrieves the general weather conditions corresponding to the given weather code based on the city entered.
 *
 * This function searches through a list of WMO (World Meteorological Organization) codes to find
 * the label associated with the provided weather code. If no match is found, it returns an empty string.
 */
export const getWeatherLabel = (weatherCode) => {
  const foundWMOObj = WMOs.find((wmoObj) =>
    wmoObj.WMOCodes.includes(weatherCode)
  );
  return foundWMOObj?.label || "";
};

/**
 * * Stored in getWeatherSatus file.
 * Retrieves the weather icon corresponding to the given weather status.
 *
 * This function returns a React component for the weather icon based on the provided weather status.
 * If the status does not match any predefined conditions, a default sun icon is returned.
 */
export const getWeatherIcon = (status) => {
  const iconStyles = {
    position: "relative",
  };

  switch (status) {
    case weatherStatuses.clear:
      return <FaSun color="goldenrod" size={79} style={iconStyles} />;
    case weatherStatuses.mainlyClear:
      return <FaSun color="goldenrod" size={79} style={iconStyles} />;
    case weatherStatuses.partlyCloudy:
      return <CiCloudSun color="white" size={80} style={iconStyles} />;
    case weatherStatuses.overcast:
      return <BsClouds color="white" size={80} style={iconStyles} />;
    case weatherStatuses.foggy:
      return <BsCloudFog2 color="goldenrod" size={79} style={iconStyles} />;
    case weatherStatuses.drizzlingLightly:
      return <PiCloudRain color="white" size={80} style={iconStyles} />;
    case weatherStatuses.drizzlingModeratly:
      return <PiCloudRain color="white" size={80} style={iconStyles} />;
    case weatherStatuses.drizzlingDense:
      return <PiCloudRainBold color="white" size={90} style={iconStyles} />;
    case weatherStatuses.drizzlingFreezingLight:
      return <WiDayCloudy color="white" size={90} style={iconStyles} />;
    case weatherStatuses.drizzlingFreezingDense:
      return <WiDayCloudy color="white" size={90} style={iconStyles} />;
    case weatherStatuses.rainingLight:
      return (
        <BsFillCloudRainHeavyFill color="white" size={75} style={iconStyles} />
      );
    case weatherStatuses.rainingModerate:
      return (
        <BsFillCloudRainHeavyFill color="white" size={75} style={iconStyles} />
      );
    case weatherStatuses.rainingHeavy:
      return (
        <BsFillCloudRainHeavyFill color="black" size={75} style={iconStyles} />
      );
    case weatherStatuses.freezingRainLight:
      return <BsCloudRainHeavyFill size={90} style={iconStyles} />;
    case weatherStatuses.freezingRainHeavy:
      return <BsCloudRainHeavyFill size={90} style={iconStyles} />;
    case weatherStatuses.snowFallLight:
      return <BsCloudSnow color="white" size={90} style={iconStyles} />;
    case weatherStatuses.snowFallModerate:
      return <BsCloudSnow color="white" size={90} style={iconStyles} />;
    case weatherStatuses.snowFallHeavy:
      return <BsCloudSnow color="white" size={90} style={iconStyles} />;
    case weatherStatuses.snowGrains:
      return <FaRegSnowflake color="white" size={90} style={iconStyles} />;
    case weatherStatuses.rainShowersLight:
      return (
        <BsFillCloudRainHeavyFill color="white" size={90} style={iconStyles} />
      );
    case weatherStatuses.rainShowersModerate:
      return (
        <BsFillCloudRainHeavyFill color="white" size={90} style={iconStyles} />
      );
    case weatherStatuses.rainShowersViolent:
      return (
        <BsFillCloudRainHeavyFill color="black" size={90} style={iconStyles} />
      );
    case weatherStatuses.snowShowersLight:
      return <BsCloudSnow color="white" size={90} style={iconStyles} />;
    case weatherStatuses.snowShowersHeavy:
      return <BsCloudSnow color="black" size={90} style={iconStyles} />;
    case weatherStatuses.thunderstorms:
      return (
        <BsCloudLightningRain color="white" size={90} style={iconStyles} />
      );
    case weatherStatuses.thunderstormsLightHail:
      return (
        <BsCloudLightningRainFill color="white" size={90} style={iconStyles} />
      );
    case weatherStatuses.thunderstormsHeavyHail:
      return (
        <BsCloudLightningRainFill color="black" size={90} style={iconStyles} />
      );
    default:
      return <FaSun color="goldenrod" size={79} style={iconStyles} />;
  }
};
