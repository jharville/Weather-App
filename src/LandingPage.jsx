import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideoCompressed from "./assets/Weather_App_Background_Video_Compressed.mp4";
import axios from "axios";
import "./LandingPage.css";

const LandingPage = () => {
  useEffect(() => {
    document.title = "Weather App";
  }, []);
  //^ this names the the tab

  const [cityInput, setCityInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const geographicalCoordinatesResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${cityInput}&format=json&limit=1`
      );
      if (geographicalCoordinatesResponse.data.length === 0) {
        throw new Error();
      } else cityInput;
      navigate(`/ResultPage?city=${encodeURIComponent(cityInput)}`); //Determines the url navigated to along with city entered.
    } catch {
      setErrorMessage("Please Enter A Valid City");
    }
  };

  return (
    <>
      <div className="background-Landing">
        <video
          autoPlay
          loop
          muted
          className="video-Landing"
          src={BackgroundVideoCompressed}
          type="video/mp4"
        />
      </div>
      <div id="entire-landing-page">
        <div id="flex-box-Landing">
          <div className="weather-app-container-Landing">
            <div id="app-title">
              <h1>Weather Getter</h1>
            </div>
            <form id="form-and-boxes-container" onSubmit={handleSubmit}>
              <input
                id="enter-City-Name-Field"
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter City Name"
              />
              <button id="get-weather-button" type="submit">
                <p>Get Weather</p>
              </button>
            </form>
            <div>
              {errorMessage && (
                <h1 id="error-message-landing">{errorMessage}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
