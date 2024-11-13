import React, { useState } from "react";
import "./SummaryChart.css";
import { LoadingIcon } from "../LoadingIcon.jsx";
import { format, parseISO } from "date-fns";
import { getWeatherIcon, getWeatherLabel } from "../getWeatherStatus.jsx";
import {
  VictoryChart,
  VictoryAxis,
  VictoryArea,
  VictoryLabel,
  VictoryZoomContainer,
  VictoryScatter,
} from "victory";

// The standalone attribute is expected only by Victory components,
// such as VictoryChart or VictoryContainer. However, if it somehow gets passed down
// to a native SVG element (like defs, svg, or linearGradient), React will issue
// this warning because standalone is not a valid attribute for these elements.

const buttonOptions = {
  summary: "Summary",
  hourly: "Hourly",
};
const buttonOptionsArr = Object.values(buttonOptions);

export const SummaryChart = ({
  isLoading,
  loadingDone,
  isLoadingRejected,
  rain,
  temps,
  forecastDate,
  dayClickedIndex,
  weathercodes,
}) => {
  const [selectedOption, setSelectedOption] = useState(buttonOptions.summary);

  // Note: key-value pairs on tempArray, rainChanceArray
  // and weatherCodesArray must be synced, or else the graph will not display correctly.
  // You'll have missing or incorrectly displayed times, and variables.
  // console.log(dayClickedIndex);
  // For indexing array variables based on day clicked in forecast box
  console.log(weathercodes);
  const getSelectedDayWeatherIcon = () => {
    if (!weathercodes) {
      return null;
    }
    const weatherCode = weathercodes[dayClickedIndex];
    const weatherLabel = getWeatherLabel(weatherCode);
    return getWeatherIcon(weatherLabel);
  };

  const getSelectedDayWeatherLabel = () => {
    if (!weathercodes) {
      return null;
    }
    const weatherCode = weathercodes[dayClickedIndex];
    return getWeatherLabel(weatherCode);
  };

  const startHour = dayClickedIndex * 24;
  const endHour = startHour + 24;

  const formatIndex = (index) => {
    let formattedIndex;
    if (index === 0) {
      formattedIndex = "12 A.M.";
    } else if (index === 12) {
      formattedIndex = "12 P.M.";
    } else if (index < 12) {
      formattedIndex = `${index} A.M.`;
    } else {
      formattedIndex = `${index - 12} P.M.`;
    }
    return formattedIndex;
  };

  const dayTemps = (temps || []).slice(startHour, endHour).map((temp) => Math.round(temp));

  const returnEvenIndex = (index) => index % 2 === 0;

  const totalDayTemps = (dayTemps || []).slice(0, 24).map((temp, index) => {
    return { time: formatIndex(index), temp };
  });
  const evenDayTemps = (dayTemps || [])
    .slice(0, 24)
    .map((temp, index) => (returnEvenIndex(index) ? { time: formatIndex(index), temp } : null))
    .filter((item) => item != null);

  const summaryTempArray = [
    { time: "a", temp: evenDayTemps?.[0]?.temp },
    ...evenDayTemps,
    { time: "b", temp: evenDayTemps?.[evenDayTemps?.length - 1]?.temp },
  ];
  // This is to add a and b, both invisible entries to the array to prevent extreme sloping.

  const hourlyTempArray = [
    { time: "a", temp: totalDayTemps?.[0]?.temp },
    ...totalDayTemps,
    { time: "b", temp: totalDayTemps?.[totalDayTemps?.length - 1]?.temp },
  ];
  // This is to add a and b, both invisible entries to the array to prevent extreme sloping.

  const summaryBoxDate =
    !isLoading && forecastDate && forecastDate[dayClickedIndex]
      ? format(parseISO(forecastDate[dayClickedIndex]), "EEE, do")
      : "";

  const summaryBoxDateNext = () => {
    if (forecastDate && dayClickedIndex + 1 < forecastDate.length) {
      return format(parseISO(forecastDate[dayClickedIndex + 1]), "EEE, do");
    }
    return null;
  };

  const rainChance = (rain || []).slice(startHour, endHour).map((chance) => Math.round(chance));

  const totalRainChances = (rainChance || [])
    .slice(0, 24)
    .map((chance, index) => {
      return { time: formatIndex(index), chance: chance + " %" };
    })
    .filter((item) => item != null);

  const evenRainChances = (rainChance || [])
    .slice(0, 24)
    .map((chance, index) => {
      return returnEvenIndex(index)
        ? {
            time: formatIndex(index),
            chance: chance + " %",
          }
        : null;
    })
    .filter((item) => item != null);

  const summaryRainChanceArray = [
    { time: "a", chance: "" },
    { time: summaryBoxDate, chance: "Rain Chance" },
    ...evenRainChances,
    { time: summaryBoxDateNext(), chance: "NextDay" },
  ];
  // This is to add "a" (invisible), summaryDate, and Next Day, to the array.

  const hourlyRainChanceArray = [
    { time: "a", chance: "" },
    { time: summaryBoxDate, chance: "Rain Chance" },
    ...totalRainChances,
    { time: summaryBoxDateNext(), chance: "Next Day" },
  ];
  // This is to add "a" (invisible), summaryDate, and Next Day, to the array.

  const totalWeatherCodes = (weathercodes || [])
    .slice(0, 24)
    .map((code, index) => {
      return { time: formatIndex(index), code: code };
    })
    .filter((item) => item != null);

  const evenWeatherCodes = (weathercodes || [])
    .slice(0, 24)
    .map((code, index) => {
      return returnEvenIndex(index)
        ? {
            time: formatIndex(index),
            code: getWeatherIcon(getWeatherLabel(code)),
          }
        : null;
    })
    .filter((item) => item != null);

  const summaryWeatherCodesArray = [
    { time: "a", code: "" },
    { time: summaryBoxDate, code: "" },
    ...evenWeatherCodes,
    { time: "Next Day", code: "" },
    // This is to add "a" (invisible), summaryDate, and Next Day, to the array.
  ];

  // FOR DISPLAYING WEATHER ICONS. STILL IN PROGRESS DO NOT DELETE
  // const CustomIconLabel = () => {
  //   const summaryIcons = summaryWeatherCodesArray.map((icon) => icon.code);
  //   return (
  //     <foreignObject>
  //       <div>{summaryIcons}</div>
  //     </foreignObject>
  //   );
  // };

  const hourlyWeatherCodesArray = [
    { time: "a", code: "" },
    { time: summaryBoxDate, code: "" },
    ...totalWeatherCodes,
    { time: "Next Day", code: "" },
    // This is to add "a" (invisible), summaryDate, and Next Day, to the array.
  ];

  const handleButtonClick = (buttonKey) => {
    setSelectedOption(buttonKey);
  };

  // Calculates min/max temperatures to center the y-values
  const minTemp = Math.min(...totalDayTemps.map(({ temp }) => temp));
  const maxTemp = Math.max(...totalDayTemps.map(({ temp }) => temp));

  const tempRange = maxTemp - minTemp;
  const yAxisCenter = 260; // Midpoint for the VictoryChart y-axis

  // Dynamically adjusts the VictoryArea wave to be in the center of the y-axis
  const victoryAreaYAxis = ({ temp }) => {
    return yAxisCenter + (temp - (maxTemp + minTemp) / 2) * (150 / tempRange) + 110;
  };

  // Dynamically adjusts the Temps to be in the center of the y-axis
  const victoryScatterYAxis = ({ temp }) => {
    return yAxisCenter + (temp - (maxTemp + minTemp) / 2) * (150 / tempRange) - 50;
  };

  // Sets Horizontal Scroll container component based on which button clicked
  const getContainerComponent = (selectedOption) => {
    const getSummaryContainerComponent = () => {
      // PREVENT DEFAULT ERROR IS RELATED TO ZOOM CONTAINER.
      // Seems to be an issue with the package's source code.
      // https://github.com/FormidableLabs/victory/issues/2004

      return (
        <VictoryZoomContainer
          standalone={true}
          allowZoom={false}
          allowPan={true}
          zoomDimension="x"
          zoomDomain={{ x: [1, summaryTempArray.length - 3.5] }}
        />
      );
    };
    const getHourlyContainerComponent = () => {
      return (
        <VictoryZoomContainer
          standalone={true}
          allowZoom={false}
          allowPan={true}
          zoomDimension="x"
          zoomDomain={{ x: [1, hourlyTempArray.length - 14.5] }}
        />
      );
    };
    const getDetailsContainerComponent = () => {
      return (
        <VictoryZoomContainer
          standalone={true}
          allowZoom={false}
          allowPan={true}
          zoomDimension="x"
          zoomDomain={{ x: [1, hourlyTempArray.length - 13.5] }}
        />
      );
    };

    if (selectedOption === "Summary") {
      return getSummaryContainerComponent();
    } else if (selectedOption === "Hourly") {
      return getHourlyContainerComponent();
    } else {
      return getDetailsContainerComponent();
    }
  };

  const getSelectedTempData = (selectedOption) => {
    if (selectedOption === "Summary") {
      return summaryTempArray;
    } else if (selectedOption === "Hourly") {
      return hourlyTempArray;
    } else {
      return [];
    }
  };

  const getSelectedRainData = (selectedOption) => {
    if (selectedOption === "Summary") {
      return summaryRainChanceArray;
    } else if (selectedOption === "Hourly") {
      return hourlyRainChanceArray;
    } else {
      return [];
    }
  };

  const getSelectedWeatherCodes = (selectedOption) => {
    if (selectedOption === "Summary") {
      return summaryWeatherCodesArray;
    } else if (selectedOption === "Hourly") {
      return hourlyWeatherCodesArray;
    } else {
      return [];
    }
  };

  const selectedDayWeatherIcon = getSelectedDayWeatherIcon();
  const selectedDayWeatherLabel = getSelectedDayWeatherLabel();
  const showIconAndLabel = !!selectedDayWeatherIcon && !!selectedDayWeatherLabel && loadingDone;

  return (
    <div id="summary-container-total">
      <div id="victory-chart-container">
        <div id="text-icon-options-container">
          <div id="summary-and-icon-container">
            <p id="summary-text">Summary</p>
            {isLoading || isLoadingRejected ? null : showIconAndLabel ? (
              <div id="icon-and-label-container">
                <div id="selected-weather-icon">{selectedDayWeatherIcon}</div>
                <div id="selected-weather-label">{selectedDayWeatherLabel}</div>
                <div id="popup-menu">
                  This icon and label represent the most severe weather condition for this day.
                </div>
              </div>
            ) : null}
          </div>
          <div id="buttons-container-position">
            <div id="buttons-container">
              {buttonOptionsArr.map((buttonOption) => (
                <button
                  key={buttonOption}
                  id="button"
                  className={selectedOption === buttonOption ? "clicked" : undefined}
                  onClick={() => handleButtonClick(buttonOption)}
                >
                  {buttonOption}
                </button>
              ))}
            </div>
          </div>
        </div>
        {isLoading ? (
          <div id="loading-icon-summary-box">
            <LoadingIcon />
          </div>
        ) : (
          <div id="chart-hard-stop">
            <VictoryChart
              minDomain={{ y: 0 }}
              maxDomain={{ y: 520 }}
              containerComponent={getContainerComponent(selectedOption)}
              padding={{ top: 0, bottom: -2, left: -7.5, right: -50 }}
              width={1500}
            >
              {/* Area representing the temperature wave */}
              <VictoryArea
                data={getSelectedTempData(selectedOption).filter((item) => !isNaN(item?.temp))}
                x="time"
                y={victoryAreaYAxis}
                interpolation="natural"
                style={{
                  data: { fill: "url(#tempWaveGradient)" },
                }}
              />
              {/* This def being inside of victory is causing two errors, known by Victory's team. */}
              {/* https://github.com/FormidableLabs/victory/issues/2609 */}
              <defs>
                <linearGradient id="tempWaveGradient" x1="0%" y1="130%" x2="0%" y2="0%">
                  {/* <stop offset="50%" style={{ stopColor: "#2E3192", stopOpacity: 0.5 }} /> */}
                  <stop offset="50%" style={{ stopColor: "#2E3192", stopOpacity: 0.5 }} />
                  <stop offset="68%" style={{ stopColor: "#1BFFFF", stopOpacity: 0.6 }} />
                  <stop offset="95%" style={{ stopColor: "#ff8d00", stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: "red", stopOpacity: 0.8 }} />
                </linearGradient>
              </defs>
              {/* Scatter points showing temperature values */}
              <VictoryScatter
                data={getSelectedTempData(selectedOption).filter((item) => !isNaN(item?.temp))}
                x="time"
                y={victoryScatterYAxis}
                size={10}
                dataComponent={
                  <VictoryLabel
                    text={({ datum, index }) =>
                      index !== 0 ? `${datum.temp} \u00B0F` : `${datum.temp}`
                    }
                    style={{ fill: "white", fontSize: 30, fontFamily: "Roboto, sans-serif" }}
                    dy={-125}
                    dx={-35}
                  />
                }
              />

              {/* Top X-axis (Weather Icons) STILL IN PROGRESS DO NOT DELETE
              <VictoryAxis
                tickFormat={(t) => {
                  const weatherCodeData = getSelectedWeatherCodes(selectedOption).find(
                    (data) => data.time === t
                  );
                  return weatherCodeData?.code;
                }}
                tickLabelComponent={<VictoryLabel dy={-150} />}
                // style={{
                //   tickLabels: { fill: "#FFFFFF", fontSize: 27, fontFamily: "Roboto, sans-serif" },
                // }}
                tickValues={getSelectedWeatherCodes(selectedOption).map((data) => data.time)}
              />

              {/* Middle X-axis (rain chance) */}
              <VictoryAxis
                tickFormat={(t) => {
                  const rainData = getSelectedRainData(selectedOption).find(
                    (data) => data.time === t
                  );
                  return rainData?.chance;
                }}
                tickLabelComponent={<VictoryLabel dy={-100} />}
                style={{
                  tickLabels: { fill: "#FFFFFF", fontSize: 27, fontFamily: "Roboto, sans-serif" },
                }}
                tickValues={getSelectedRainData(selectedOption).map((data) => data.time)}
              />

              {/* Bottom X-axis (time) */}
              <VictoryAxis
                standalone={true}
                dependentAxis={false}
                tickFormat={(t) => t}
                tickLabelComponent={<VictoryLabel dy={-60} />}
                style={{
                  tickLabels: { fill: "#FFFFFF", fontSize: 27, fontFamily: "Roboto, sans-serif" },
                }}
              />
            </VictoryChart>
          </div>
        )}
      </div>
    </div>
  );
};

// DO NOT DELETE THESE COMMENTS
// The [object Object] issue occurs because the tickFormat function
// in VictoryAxis expects a string or number, not a JSX element.
// Instead of returning an IconComponent directly, you can update
// the approach to return the icon string itself in tickFormat.

// import React from "react";
// import { VictoryChart, VictoryAxis, VictoryBar, VictoryLabel } from "victory";
// import { FaSun, FaCloud, FaCloudRain, FaBolt, FaRainbow } from "react-icons/fa";
// import { BsFillCloudDrizzleFill, BsFillCloudHailFill } from "react-icons/bs";
// import { WiStrongWind } from "react-icons/wi";
// import { MdOutlineWbTwilight } from "react-icons/md";
// import { RiBuilding3Line } from "react-icons/ri";

// // Map of times to React icon components
// const timeIconData = {
//   "08:00 AM": <FaSun />,
//   "09:00 AM": <FaCloud />,
//   "10:00 AM": <FaCloudRain />,
//   "11:00 AM": <FaBolt />,
//   "12:00 PM": <FaRainbow />,
//   "01:00 PM": <BsFillCloudDrizzleFill />,
//   "02:00 PM": <WiStrongWind />,
//   "03:00 PM": <MdOutlineWbTwilight />,
//   "04:00 PM": <BsFillCloudHailFill />,
//   "05:00 PM": <RiBuilding3Line />,
// };

// const chartData = Object.keys(timeIconData).map((time, index) => ({
//   x: time,
//   y: index + 1,
// }));

// const IconLabel = (props) => {
//   const icon = timeIconData[props.text];
//   return (
//     <foreignObject x={props.x - 10} y={props.y - 10} width="20" height="20">
//       <div style={{ fontSize: "1.5em", display: "flex", justifyContent: "center" }}>{icon}</div>
//     </foreignObject>
//   );
// };

// export const ResultPage = () => {
//   return (
//     <VictoryChart domainPadding={20}>
//       <VictoryBar data={chartData} x="x" y="y" />
//       <VictoryAxis
//         tickValues={Object.keys(timeIconData)}
//         tickLabelComponent={<IconLabel />}
//       />
//     </VictoryChart>
//   );
// };

// export default ResultPage;
