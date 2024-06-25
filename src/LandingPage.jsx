import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import BackgroundVideo from "./assets/AdobeStock_506762823.mov";
import axios from "axios";
import "./LandingPage.css";
//  For Learning Git. Delete Later
const LandingPage = () => {
  useEffect(() => {
    document.title = "Weather App";
  }, []);

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
      navigate(`/ResultPage?city=${encodeURIComponent(cityInput)}`);
    } catch {
      setErrorMessage("Please Enter A Valid City");
    }
  };

  return (
    <div className="background-Landing">
      <video autoPlay loop muted className="video-Landing">
        {/* <source src={BackgroundVideo} type="video/mp4" /> */}
      </video>
      <div id="flex-box-Landing">
        <div className="weather-app-container-Landing">
          <h1>Weather App</h1>
          <form className="form-and-boxes-container" onSubmit={handleSubmit}>
            <input
              className="enter-City-Landing"
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter City Name"
            />
            <button className="get-weather-button-Landing" type="submit">
              Get Weather
            </button>
          </form>
          <div>
            {errorMessage && <h1 id="error-message">{errorMessage}</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
