import { FaSun } from "react-icons/fa";
import { WiDayCloudy } from "react-icons/wi";
// import { WiDayCloudy } from "react-icons/wi";
// import { CiCloudSun } from "react-icons/ci";
// import { WiDegrees } from "react-icons/wi";
// import { IoIosCloudy } from "react-icons/io";

// for getWeatherIcon dont delete
export const weatherStatuses = {
  clear: "clear",
  partlyCloudy: "partly cloudy",
};

// Define WMOs and functions
export const WMOs = [
  { WMOCodes: [0], label: weatherStatuses.clear },
  { WMOCodes: [1, 2, 3], label: weatherStatuses.partlyCloudy },
];

export const getWeatherLabel = (weatherCode) => {
  const foundWMOObj = WMOs.find((wmoObj) =>
    wmoObj.WMOCodes.includes(weatherCode)
  );
  return foundWMOObj?.label || "";
};

export const getWeatherIcon = (status) => {
  const iconStyles = {
    position: "relative",
  };

  switch (status) {
    case weatherStatuses.clear:
      return <FaSun color="goldenrod" size={100} style={iconStyles} />;
    case weatherStatuses.partlyCloudy:
      return <WiDayCloudy color="white" size={90} style={iconStyles} />;
    default:
      return <FaSun color="goldenrod" size={100} style={iconStyles} />;
  }
};
