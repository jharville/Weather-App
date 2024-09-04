import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchCity } from "../SearchCity";
import BackgroundVideoCompressed from "../../assets/Weather_App_Background_Video_Compressed.mp4";
import "./LandingPage.css";

export const LandingPage = () => {
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const navigateToResult = useNavigate();

  const handleSearchSubmit = async (cityInput) => {
    try {
      if (!cityInput.trim()) {
        throw new Error("No city was entered");
      }
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${cityInput}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Couldn't find a city");
      }
      // Navigate to the result page
      navigateToResult(`/ResultPage?city=${encodeURIComponent(cityInput)}`);
    } catch (error) {
      console.error("Error:", error.message);
      setUserErrorMessage("Please Enter A Valid City");
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
            <SearchCity
              onSearchSubmit={handleSearchSubmit}
              onError={setUserErrorMessage}
            />
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
