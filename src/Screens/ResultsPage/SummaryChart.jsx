import React, { useState } from "react";
import "./SummaryChart.css";
import { LoadingIcon } from "../LoadingIcon.jsx";
import { format, parseISO } from "date-fns";
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryArea,
  VictoryLabel,
  VictoryZoomContainer,
} from "victory";

const buttonOptions = {
  summary: "Summary",
  hourly: "Hourly",
  details: "Details",
};
const buttonOptionsArr = Object.values(buttonOptions);

export const SummaryChart = ({ rain, temps, forecastDate, dayClickedIndex, isLoading }) => {
  const [selectedOption, setSelectedOption] = useState(buttonOptions.summary);

  // SummaryChart logic. Note: time elements on both victoryAreaTempData
  // and hourlyRainChanceData must be synced, or else the graph will not display correctly

  // For indexing temp variables
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

  // formerly mappedDayTemps
  const totalDayTemps = (dayTemps || []).slice(0, 24).map((temp, index) => {
    return { time: formatIndex(index), temp };
  });
  const evenDayTemps = (dayTemps || [])
    .slice(0, 24)
    .map((temp, index) => (returnEvenIndex(index) ? { time: formatIndex(index), temp } : null))
    .filter((item) => item !== null);

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

  const summaryDate =
    !isLoading && forecastDate && forecastDate[dayClickedIndex]
      ? format(parseISO(forecastDate[dayClickedIndex]), "EEE, do")
      : "";

  const rainChance = (rain || []).slice(startHour, endHour).map((chance) => Math.round(chance));

  // formerly mappedRainChance
  const totalRainChances = (rainChance || [])
    .slice(0, 24)
    .map((chance, index) => {
      return { time: formatIndex(index), chance: chance + " %" };
    })
    .filter((item) => item !== null);

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
    .filter((item) => item !== null);

  const summaryRainChanceArray = [
    { time: "a", chance: "" },
    { time: summaryDate, chance: "Rain Chance" },
    ...evenRainChances,
    { time: "Next Day", chance: "" },
    // This is to add "a" (invisible), summaryDate, and Next Day, to the array.
  ];

  const hourlyRainChanceArray = [
    { time: "a", chance: "" },
    { time: summaryDate, chance: "Rain Chance" },
    ...totalRainChances,
    { time: "Next Day", chance: "" },
    // This is to add "a" (invisible), summaryDate, and Next Day, to the array.
  ];

  const handleButtonClick = (buttonKey) => {
    setSelectedOption(buttonKey);
  };

  // const getRainChanceValue = (time) => {
  //   const rainChanceData = hourlyRainChanceData.find((data) => data.time === time);
  //   return rainChanceData.chance;
  // };

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

  // Sets Horizontal Scroll container component based on button clicked
  const getContainerComponent = (selectedOption) => {
    const getSummaryContainerComponent = () => {
      return (
        <VictoryZoomContainer
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
    } else if (selectedOption === "Details") {
      return getDetailsContainerComponent();
    }
  };

  const getSelectedTempData = (selectedOption) => {
    if (selectedOption === "Summary") {
      return summaryTempArray;
    } else if (selectedOption === "Hourly") {
      return hourlyTempArray;
    } else if (selectedOption === "Details") {
      return [];
    }
  };

  const getSelectedRainData = (selectedOption) => {
    if (selectedOption === "Summary") {
      return summaryRainChanceArray;
    } else if (selectedOption === "Hourly") {
      return hourlyRainChanceArray;
    } else if (selectedOption === "Details") {
      return [];
    }
  };

  return (
    <div id="summary-container-total">
      <div id="victory-chart-container">
        <div id="text-and-options-container">
          <p id="summary-text">Summary</p>
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
          <VictoryChart
            minDomain={{ y: 0 }}
            maxDomain={{ y: 520 }}
            containerComponent={getContainerComponent(selectedOption)}
            padding={{ top: 0, bottom: 0, left: -7.5, right: -50 }}
            width={1500}
          >
            <defs>
              <linearGradient id="customGradient" x1="0%" y1="130%" x2="0%" y2="0%">
                <stop offset="50%" style={{ stopColor: "#2E3192", stopOpacity: 0.5 }} />
                <stop offset="68%" style={{ stopColor: "#1BFFFF", stopOpacity: 0.6 }} />
                <stop offset="95%" style={{ stopColor: "#ff8d00", stopOpacity: 0.7 }} />
                <stop offset="100%" style={{ stopColor: "red", stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>

            {/* Area representing the temperature wave */}
            <VictoryArea
              data={getSelectedTempData(selectedOption)}
              x="time"
              y={victoryAreaYAxis}
              interpolation="natural"
              style={{
                data: { fill: "url(#customGradient)" },
              }}
            />

            {/* Scatter points showing temperature values */}
            <VictoryScatter
              data={getSelectedTempData(selectedOption)}
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

            {/* Top X-axis (rain chance) */}
            <VictoryAxis
              tickFormat={(t) => {
                const rainData = getSelectedRainData(selectedOption).find(
                  (data) => data.time === t
                );
                return rainData.chance;
              }}
              tickLabelComponent={<VictoryLabel dy={-130} />}
              style={{
                tickLabels: { fill: "#FFFFFF", fontSize: 27, fontFamily: "Roboto, sans-serif" },
              }}
              tickValues={getSelectedRainData(selectedOption).map((data) => data.time)}
            />

            {/* Bottom X-axis (time) */}
            <VictoryAxis
              dependentAxis={false}
              tickFormat={(t) => t}
              tickLabelComponent={<VictoryLabel dy={-90} />}
              style={{
                tickLabels: { fill: "#FFFFFF", fontSize: 27, fontFamily: "Roboto, sans-serif" },
              }}
            />
          </VictoryChart>
        )}
      </div>
    </div>
  );
};
