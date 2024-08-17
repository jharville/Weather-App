import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackgroundVideoCompressed from "../../assets/Weather_App_Background_Video_Compressed.mp4";
import "./LandingPage.css";

const LandingPage = () => {
  const [cityInput, setCityInput] = useState("");
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!cityInput.trim()) {
        throw new Error("No city was entered");
      }
      const geographicalCoordinatesResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${cityInput}&format=json&limit=1`
      );
      if (geographicalCoordinatesResponse.data.length === 0) {
        throw new Error("Couldn't find a city");
      }
      console.log("No errors, proceeding to navigate...");
      navigate(`/ResultPage?city=${encodeURIComponent(cityInput)}`);
    } catch (error) {
      console.error("Error:", error.message);
      setUserErrorMessage(
        error.message === "No city was entered"
          ? "No City Was Entered"
          : "Please Enter A Valid City"
      );
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
              {userErrorMessage && (
                <h1 id="error-message-landing">{userErrorMessage}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
