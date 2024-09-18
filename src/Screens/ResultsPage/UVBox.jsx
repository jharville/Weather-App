import "./UVBox.css";
import GaugeChart from "react-gauge-chart";
import { LoadingIcon } from "../LoadingIcon.jsx";

export const UVBox = ({ uvValue }) => {
  if (!uvValue) {
    return (
      <div id="loading-icon">
        <LoadingIcon />
      </div>
    );
  }

  if (uvValue === undefined) {
    return "null";
  }

  let gaugeChartValue;
  let conditionText;
  let spfRecommendation;
  let minutesToBurn;
  let precautions;
  let minutesStyle;

  switch (uvValue) {
    case 1:
      gaugeChartValue = 0.1;
      conditionText = "Low";
      spfRecommendation = "15";
      minutesToBurn = "60";
      precautions = "Minimal sun protection required.";
      minutesStyle = { color: "blue" };
      break;
    case 2:
      gaugeChartValue = 0.2;
      conditionText = "Low";
      spfRecommendation = "15";
      minutesToBurn = "60";
      precautions = "Minimal sun protection required.";
      minutesStyle = { color: "blue" };
      break;
    case 3:
      gaugeChartValue = 0.3;
      conditionText = "Moderate";
      spfRecommendation = "30+";
      minutesToBurn = "45";
      precautions =
        "Wear sunscreen, hat, sunglasses, and seek shade during peak hours.";
      minutesStyle = { color: "orange" };
      break;
    case 4:
      gaugeChartValue = 0.4;
      conditionText = "Moderate";
      spfRecommendation = "30+";
      minutesToBurn = "45";
      precautions =
        "Wear sunscreen, hat, sunglasses, and seek shade during peak hours.";
      minutesStyle = { color: "orange" };
      break;
    case 5:
      gaugeChartValue = 0.5;
      conditionText = "Moderate";
      spfRecommendation = "30+";
      minutesToBurn = "45";
      precautions =
        "Wear sunscreen, hat, sunglasses, and seek shade during peak hours.";
      minutesStyle = { color: "orange" };
      break;
    case 6:
      gaugeChartValue = 0.6;
      conditionText = "High";
      spfRecommendation = "50";
      minutesToBurn = "30";
      precautions = "Wear sun protective clothing, sunscreen, and seek shade.";
      minutesStyle = { color: "yellow" };
      break;
    case 7:
      gaugeChartValue = 0.7;
      conditionText = "High";
      spfRecommendation = "50";
      minutesToBurn = "30";
      precautions = "Wear sun protective clothing, sunscreen, and seek shade.";
      minutesStyle = { color: "yellow" };
      break;
    case 8:
      gaugeChartValue = 0.8;
      conditionText = "Very High";
      spfRecommendation = "50";
      minutesToBurn = "15";
      precautions =
        "Seek shade. Wear sun protective clothing and sunscreen. White sand doubles UV exposure.";
      minutesStyle = { color: "red" };
      break;
    case 9:
      gaugeChartValue = 0.9;
      conditionText = "Very High";
      spfRecommendation = "50";
      minutesToBurn = "15";
      precautions =
        "Seek shade. Wear sun protective clothing and sunscreen. White sand doubles UV exposure.";
      minutesStyle = { color: "red" };
      break;
    case 10:
      gaugeChartValue = 1;
      conditionText = "Very High";
      spfRecommendation = "50";
      minutesToBurn = "15";
      precautions =
        "Seek shade. Wear sun protective clothing and sunscreen. White sand doubles UV exposure.";
      minutesStyle = { color: "maroon" };
      break;
    case 11:
      gaugeChartValue = 1.1;
      conditionText = "Extreme!";
      spfRecommendation = "50+";
      minutesToBurn = "10";
      precautions =
        "Full precautions! Unprotected skin can burn in minutes. Avoid sun during peak hours. Wear sunscreen and sun protective clothing.";
      minutesStyle = { color: "darkred" };
      break;
    default:
      gaugeChartValue = null;
      conditionText = "No Data :(";
      minutesToBurn = "N/A";
      minutesStyle = { color: "gray" };
  }

  console.log("switch case results:", gaugeChartValue);

  return (
    <div id="uv-box-contents">
      <div id="uv-text-and-gauge-container">
        <div id="uv-index-text">
          <p>UV Index</p>
        </div>
        <GaugeChart
          style={{ width: "95%" }}
          id="gauge-chart2"
          needleColor="teal"
          animate={false}
          fontSize="2em"
          nrOfLevels={11}
          percent={gaugeChartValue}
          formatTextValue={(value) => value / 10}
        />
        <div id="risk-text">
          <p>Risk: {conditionText}</p>
        </div>
      </div>
      <div id="condition-info-container">
        <div id="minutes-and-spf-container">
          <p id="minutes-to-burn-text">
            Minutes to Sunburn:
            <span style={minutesStyle}> {minutesToBurn}</span>
          </p>
          <p id="spf-text">Recommended SPF: {spfRecommendation}</p>
        </div>
        <div id="precautions">
          <p>{precautions}</p>
        </div>
      </div>
    </div>
  );
};
