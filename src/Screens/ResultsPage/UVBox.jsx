import "./UVBox.css";
import GaugeChart from "react-gauge-chart";
import { LoadingIcon } from "../LoadingIcon.jsx";

const precautionMessages = {
  low: "Minimal sun protection required.",
  moderate: "Wear sunscreen, hat, sunglasses, and seek shade during peak hours.",
  high: "Wear sun protective clothing. Apply sunscreen, and seek shade.",
  veryHigh: "Seek shade. Wear sun protective clothing and sunscreen.",
  extreme:
    "Unprotected skin can burn in minutes! Avoid sun during peak hours. Wear sunscreen and sun protective clothing.",
  noData: "N/A",
};

const minutesStyles = {
  low: { color: "lightgreen" },
  moderate: { color: "orange" },
  high: { color: "yellow" },
  veryHigh: { color: "red" },
  extreme: { color: "red" },
  noData: { color: "gray" },
};

const getUVSwitchResult = (uvValue) => {
  switch (uvValue) {
    case 1:
      return {
        gaugeChartValue: 0.04,
        conditionText: "Low",
        spfRecommendation: "15",
        minutesToBurn: "60",
        precautions: precautionMessages.low,
        minutesStyle: minutesStyles.low,
      };
    case 2:
      return {
        gaugeChartValue: 0.13635,
        conditionText: "Low",
        spfRecommendation: "15",
        minutesToBurn: "60",
        precautions: precautionMessages.low,
        minutesStyle: minutesStyles.low,
      };
    case 3:
      return {
        gaugeChartValue: 0.22725,
        conditionText: "Moderate",
        spfRecommendation: "30+",
        minutesToBurn: "45",
        precautions: precautionMessages.moderate,
        minutesStyle: minutesStyles.moderate,
      };
    case 4:
      return {
        gaugeChartValue: 0.31815,
        conditionText: "Moderate",
        spfRecommendation: "30+",
        minutesToBurn: "45",
        precautions: precautionMessages.moderate,
        minutesStyle: minutesStyles.moderate,
      };
    case 5:
      return {
        gaugeChartValue: 0.40905,
        conditionText: "Moderate",
        spfRecommendation: "30+",
        minutesToBurn: "45",
        precautions: precautionMessages.moderate,
        minutesStyle: minutesStyles.moderate,
      };
    case 6:
      return {
        gaugeChartValue: 0.5,
        conditionText: "High",
        spfRecommendation: "50",
        minutesToBurn: "30",
        precautions: precautionMessages.high,
        minutesStyle: minutesStyles.high,
      };
    case 7:
      return {
        gaugeChartValue: 0.59,
        conditionText: "High",
        spfRecommendation: "50",
        minutesToBurn: "30",
        precautions: precautionMessages.high,
        minutesStyle: minutesStyles.high,
      };
    case 8:
      return {
        gaugeChartValue: 0.7,
        conditionText: "Very High",
        spfRecommendation: "50",
        minutesToBurn: "15",
        precautions: precautionMessages.veryHigh,
        minutesStyle: minutesStyles.veryHigh,
      };
    case 9:
      return {
        gaugeChartValue: 0.788,
        conditionText: "Very High",
        spfRecommendation: "50",
        minutesToBurn: "15",
        precautions: precautionMessages.veryHigh,
        minutesStyle: minutesStyles.veryHigh,
      };
    case 10:
      return {
        gaugeChartValue: 0.87,
        conditionText: "Very High",
        spfRecommendation: "50",
        minutesToBurn: "15",
        precautions: precautionMessages.veryHigh,
        minutesStyle: minutesStyles.veryHigh,
      };
    case 11:
      return {
        gaugeChartValue: 0.965,
        conditionText: "Extreme!",
        spfRecommendation: "50+",
        minutesToBurn: "10",
        precautions: precautionMessages.extreme,
        minutesStyle: minutesStyles.extreme,
      };
    default:
      return {
        gaugeChartValue: null,
        conditionText: "No Data",
        minutesToBurn: "N/A",
        precautions: precautionMessages.noData,
        minutesStyle: minutesStyles.noData,
      };
  }
};

export const UVBox = ({ uvValue, sunDuration, isLoading }) => {
  const {
    gaugeChartValue,
    conditionText,
    spfRecommendation,
    minutesToBurn,
    precautions,
    minutesStyle,
  } = getUVSwitchResult(uvValue);

  return (
    <div id="uv-box-contents">
      <div id="uv-text-and-gauge-container">
        <div id="uv-index-text">
          <p>UV Index</p>
        </div>

        <GaugeChart
          style={{ width: "95%" }}
          id="gauge-chart2"
          needleColor={isLoading ? "transparent" : uvValue ? "teal" : "transparent"}
          animate={false}
          fontSize="2em"
          nrOfLevels={11}
          percent={gaugeChartValue}
          formatTextValue={() => (isLoading ? "" : uvValue || "N/A")}
        />
        <div id="risk-text">{!isLoading && uvValue ? <p>Risk: {conditionText}</p> : null}</div>
      </div>

      {isLoading ? (
        <div id="loading-icon-uv-box">
          <LoadingIcon />
        </div>
      ) : uvValue ? (
        <div id="condition-info-container">
          <p id="minutes-to-burn-text">
            Minutes to Sunburn:
            <span style={minutesStyle}> {minutesToBurn}</span>
          </p>
          <div id="spf-and-sun-container">
            <p id="sun-duration">Total Sun Hours: {sunDuration}</p>
            <p id="spf-text">Suggested SPF: {spfRecommendation}</p>
          </div>
          <div id="precautions">
            <p>{precautions}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
